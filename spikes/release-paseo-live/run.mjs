// Explicitly mutates ONLY the disposable plugin ID below. Does not restart daemon.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, symlink, access, rename } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const state = join(root, '.spike');
const pluginId = 'harness-release-recovery-spike-20261022';
const host = '127.0.0.1:6767';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const read = async path => JSON.parse(await readFile(path, 'utf8'));
const save = async (path, value) => {
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2)); await rename(tmp, path);
};
const executable = spawnSync('/usr/bin/which', ['paseo'], { encoding: 'utf8' }).stdout.trim();
assert.ok(executable);
const cli = (...args) => {
  const result = spawnSync(executable, [...args, '--host', host, '--json'], { encoding: 'utf8', timeout: 25000 });
  return { exit: result.status, stdout: result.stdout, stderr: result.stderr };
};
const list = () => {
  const result = cli('plugin', 'ls'); assert.equal(result.exit, 0, result.stderr);
  return JSON.parse(result.stdout);
};
async function waitFile(path) {
  for (let attempt = 0; attempt < 100; attempt++) {
    try { return await read(path); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    await delay(250);
  }
  throw new Error(`Timeout waiting for ${path}`);
}

await mkdir(state, { recursive: true });
// One-shot directory: stale ready/result files must never count as fresh evidence.
for (const name of ['watch-ready.json', 'recovery-result.json']) {
  try {
    await access(join(state, name));
    throw new Error('Previous run exists. Inspect .spike and confirm its watcher exited before using a fresh directory.');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
await mkdir(join(root, 'evidence'), { recursive: true });
try { await access(join(root, 'node_modules')); }
catch { await symlink(join(root, '../paseo-contract/node_modules'), join(root, 'node_modules')); }
const before = list();
assert.ok(!before.some(item => item.id === pluginId), 'Disposable ID already installed; refusing overwrite');
const status = cli('status'); assert.equal(status.exit, 0, status.stderr);
const daemon = JSON.parse(status.stdout);
assert.equal(daemon.daemonVersion, '0.11.1', 'This spike is scoped to verified daemon version');
const dataPath = join(state, 'data.json');
await save(dataPath, { schema: 1, committedWork: ['preserve-this-work'], counter: 42 });
const initialData = await readFile(dataPath);
const good = `import type { PluginServerContext } from '@getpaseo/plugin/server';
import { appendFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
export default function contribute(_server: PluginServerContext) {
 const data = readFileSync(${JSON.stringify(dataPath)});
 appendFileSync(${JSON.stringify(join(state, 'boots.jsonl'))}, JSON.stringify({at:new Date().toISOString(),pid:process.pid,release:'good',dataDigest:createHash('sha256').update(data).digest('hex')})+String.fromCharCode(10));
 console.log('RELEASE_SPIKE_READY', process.pid);
 return () => {};
}
`;
const bad = `import type { PluginServerContext } from '@getpaseo/plugin/server';
export default function contribute(_server: PluginServerContext) {
 throw new Error('INTENTIONAL_DISPOSABLE_RELEASE_SPIKE_FAILURE');
}
`;
await writeFile(join(state, 'good.ts.txt'), good);
await writeFile(join(root, 'index.server.ts'), good);
const compiler = join(root, 'node_modules/typescript/bin/tsc');
const typecheck = () => {
  const result = spawnSync(process.execPath, [compiler, '--noEmit', '-p', join(root, 'tsconfig.json')], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
};
typecheck();
let installed = false;
let summary;
try {
  const install = cli('plugin', 'install', root, '--id', pluginId);
  installed = list().some(item => item.id === pluginId);
  assert.equal(install.exit, 0, install.stderr);
  assert.equal(list().find(item => item.id === pluginId)?.status, 'running');
  const bootsBefore = (await readFile(join(state, 'boots.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
  const bootBefore = bootsBefore.at(-1);
  await save(join(state, 'activation.json'), {
    phase: 'prepared', host, cli: executable, pluginId,
    candidateDigest: hash(bad), fallbackDigest: hash(good),
  });
  const launch = spawnSync(process.execPath, [join(root, 'recovery.mjs'), 'launch', root], { encoding: 'utf8' });
  assert.equal(launch.status, 0, launch.stderr);
  const pids = JSON.parse(launch.stdout);
  const ready = await waitFile(join(state, 'watch-ready.json'));
  assert.equal(ready.pid, pids.recoveryPid);
  assert.throws(() => process.kill(pids.launcherPid, 0), { code: 'ESRCH' });
  await writeFile(join(root, 'index.server.ts'), bad);
  typecheck();
  const faultyReload = cli('plugin', 'reload', pluginId);
  const failedPlugin = list().find(item => item.id === pluginId);
  assert.equal(failedPlugin?.status, 'failed', JSON.stringify(faultyReload));
  const journal = await read(join(state, 'activation.json'));
  journal.phase = 'fault-observed'; await save(join(state, 'activation.json'), journal);
  const recovered = await waitFile(join(state, 'recovery-result.json'));
  assert.equal(recovered.outcome, 'recovered', JSON.stringify(recovered));
  assert.equal(list().find(item => item.id === pluginId)?.status, 'running');
  assert.equal(hash(await readFile(dataPath)), hash(initialData));
  assert.equal(hash(await readFile(join(root, 'index.server.ts'))), hash(good));
  const bootAfter = (await readFile(join(state, 'boots.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse).at(-1);
  assert.notEqual(bootBefore.pid, bootAfter.pid);
  assert.equal(bootAfter.dataDigest, hash(initialData));
  summary = {
    at: new Date().toISOString(), host, daemonVersion: daemon.daemonVersion, pluginId,
    outcome: 'recovered', watchReady: ready, ...pids, launcherExitedBeforeFault: true,
    faultyReloadExit: faultyReload.exit, failedStatus: failedPlugin.status,
    failure: failedPlugin.error ?? null, bootBefore, bootAfter, recovery: recovered,
    applicationDataPreserved: true, fallbackSourceDigest: hash(good),
    limits: ['One actor; no fencing', 'No daemon/host restart', 'No migration or backup restore', 'No UI/agent continuation test', 'Recovery executable self-update untested'],
  };
} finally {
  // Failsafe touches only this experiment's journal/plugin.
  try {
    const journal = await read(join(state, 'activation.json'));
    if (journal.phase === 'prepared') { journal.phase = 'abort'; await save(join(state, 'activation.json'), journal); }
  } catch {}
  if (installed) {
    const removed = cli('plugin', 'remove', pluginId);
    assert.equal(removed.exit, 0, removed.stderr);
  }
  const after = list();
  assert.ok(!after.some(item => item.id === pluginId));
  for (const old of before) {
    const current = after.find(item => item.id === old.id);
    assert.ok(current, `Existing plugin disappeared: ${old.id}`);
    assert.equal(current.status, old.status);
    assert.equal(current.path, old.path);
    assert.equal(current.enabled, old.enabled);
  }
  if (summary) {
    summary.cleanup = { disposableRemoved: true, existingPluginsUnchanged: true };
    await save(join(root, 'evidence/live-summary.json'), summary);
    console.log(JSON.stringify(summary, null, 2));
  }
}
