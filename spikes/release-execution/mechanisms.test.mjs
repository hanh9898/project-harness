import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { digest, pinResource, resourceStatus, CheckQueue } from './mechanisms.mjs';

async function temporary(t) {
  const root = await mkdtemp(join(tmpdir(), 'harness-release-spike-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

const check = {
  candidate: 'candidate-a', check: { command: 'focused', revision: 'v1' },
  environment: { node: process.version }, inputs: { lockfile: 'lock-a' },
  kind: 'focused', cacheable: true, heavy: true,
};

test('Resource change or removal blocks using its original pin', async t => {
  const root = await temporary(t);
  const path = join(root, 'SKILL.md');
  await writeFile(path, 'original');
  const pin = await pinResource(path);
  assert.equal(await resourceStatus(pin), 'unchanged');
  await writeFile(path, 'changed');
  assert.equal(await resourceStatus(pin), 'changed');
  await rm(path);
  assert.equal(await resourceStatus(pin), 'missing');
});

test('Duplicate concurrent checks coalesce, then reuse success', async () => {
  const queue = new CheckQueue();
  let calls = 0;
  const execute = async () => { calls++; return { status: 'passed' }; };
  await Promise.all([queue.run(check, execute), queue.run(check, execute)]);
  await queue.run(check, execute);
  assert.equal(calls, 1);
});

test('Candidate, check, input or environment changes invalidate reuse', async () => {
  const queue = new CheckQueue();
  let calls = 0;
  const execute = async () => { calls++; return { status: 'passed' }; };
  await queue.run(check, execute);
  for (const change of [
    { candidate: 'candidate-b' }, { check: { command: 'focused', revision: 'v2' } },
    { inputs: { lockfile: 'lock-b' } }, { environment: { node: 'different' } },
  ]) await queue.run({ ...check, ...change }, execute);
  assert.equal(calls, 5);
});

test('Failures, timeouts and thrown errors are not reusable success', async () => {
  const queue = new CheckQueue();
  let calls = 0;
  for (const status of ['failed', 'timeout']) {
    await queue.run(check, async () => { calls++; return { status }; });
  }
  await assert.rejects(queue.run(check, async () => { calls++; throw new Error('crash'); }));
  await queue.run(check, async () => { calls++; return { status: 'passed' }; });
  assert.equal(calls, 4);
});

test('Health and non-cacheable checks always execute', async () => {
  const queue = new CheckQueue();
  let calls = 0;
  const execute = async () => { calls++; return { status: 'passed' }; };
  for (const spec of [{ ...check, kind: 'health' }, { ...check, cacheable: false }]) {
    await Promise.all([queue.run(spec, execute), queue.run(spec, execute)]);
  }
  assert.equal(calls, 4);
});

test('Heavy checks serialize without relying on elapsed-time thresholds', async () => {
  const queue = new CheckQueue();
  let release;
  let started;
  const began = new Promise(resolve => { started = resolve; });
  const barrier = new Promise(resolve => { release = resolve; });
  const events = [];
  const first = queue.run(check, async () => {
    events.push('first:start'); started(); await barrier;
    events.push('first:end'); return { status: 'passed' };
  });
  await began;
  const second = queue.run({ ...check, candidate: 'b' }, async () => {
    events.push('second:start'); return { status: 'passed' };
  });
  await Promise.resolve();
  assert.deepEqual(events, ['first:start']);
  release(); await Promise.all([first, second]);
  assert.deepEqual(events, ['first:start', 'first:end', 'second:start']);
});

async function fixture(t, schema = 1) {
  const root = await temporary(t);
  const good = join(root, 'good.mjs');
  const bad = join(root, 'bad.mjs');
  await writeFile(good, 'process.stdout.write("ready");');
  await writeFile(bad, 'throw new Error("broken plugin");');
  const fallback = { path: good, digest: digest(await readFile(good)), readsSchemas: [1] };
  const candidateDigest = digest(await readFile(bad));
  await writeFile(join(root, 'active.json'), JSON.stringify({ path: bad, digest: candidateDigest }));
  await writeFile(join(root, 'state.json'), JSON.stringify({ schema, committedWork: ['keep-me'] }));
  await writeFile(join(root, 'journal.json'), JSON.stringify({ phase: 'activation', candidateDigest, fallback }));
  return { root, good, bad };
}
const runRecovery = root => spawnSync(process.execPath, [fileURLToPath(new URL('./mechanisms.mjs', import.meta.url)), 'recover', root], { encoding: 'utf8' });

test('Separate recovery executable restores runnable code after simulated plugin crashes, preserving data', async t => {
  const { root, bad } = await fixture(t);
  const before = await readFile(join(root, 'state.json'), 'utf8');
  assert.notEqual(spawnSync(process.execPath, [bad]).status, 0);
  assert.equal(runRecovery(root).status, 0);
  const active = JSON.parse(await readFile(join(root, 'active.json'), 'utf8'));
  const boot = spawnSync(process.execPath, [active.path], { encoding: 'utf8' });
  assert.equal(boot.status, 0); assert.equal(boot.stdout, 'ready');
  assert.equal(await readFile(join(root, 'state.json'), 'utf8'), before);
  assert.equal(runRecovery(root).status, 0);
});

test('Recovery refuses incompatible schema and leaves active pointer/data unchanged', async t => {
  const { root } = await fixture(t, 2);
  const before = await readFile(join(root, 'active.json'), 'utf8');
  const data = await readFile(join(root, 'state.json'), 'utf8');
  const result = runRecovery(root);
  assert.notEqual(result.status, 0); assert.match(result.stderr, /Incompatible recovery/);
  assert.equal(await readFile(join(root, 'active.json'), 'utf8'), before);
  assert.equal(await readFile(join(root, 'state.json'), 'utf8'), data);
});

test('Recovery refuses a fallback artifact modified after its identity was recorded', async t => {
  const { root, good } = await fixture(t);
  await writeFile(good, 'throw new Error("modified");');
  const before = await readFile(join(root, 'active.json'), 'utf8');
  const result = runRecovery(root);
  assert.notEqual(result.status, 0); assert.match(result.stderr, /Artifact drift/);
  assert.equal(await readFile(join(root, 'active.json'), 'utf8'), before);
});

test('Recovery reconciles interrupted operation after pointer switch without restoring application data', async t => {
  const { root } = await fixture(t);
  const journalPath = join(root, 'journal.json');
  const journal = JSON.parse(await readFile(journalPath, 'utf8'));
  journal.phase = 'recovering';
  await writeFile(journalPath, JSON.stringify(journal));
  await writeFile(join(root, 'active.json'), JSON.stringify(journal.fallback));
  const before = await readFile(join(root, 'state.json'), 'utf8');
  const result = runRecovery(root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(await readFile(journalPath, 'utf8')).phase, 'recovered');
  assert.equal(await readFile(join(root, 'state.json'), 'utf8'), before);
});

test('Stale recovery refuses to overwrite a different active release', async t => {
  const { root } = await fixture(t);
  const activePath = join(root, 'active.json');
  const active = JSON.stringify({ digest: 'unrelated-active-release', path: '/unused' });
  await writeFile(activePath, active);
  const result = runRecovery(root);
  assert.notEqual(result.status, 0); assert.match(result.stderr, /Active release drift/);
  assert.equal(await readFile(activePath, 'utf8'), active);
});
