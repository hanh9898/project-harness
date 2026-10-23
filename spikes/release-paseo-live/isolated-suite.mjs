// Real daemon stop/start only in the explicitly prepared disposable home.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, symlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = dirname(fileURLToPath(import.meta.url));
const read = async p => JSON.parse(await readFile(p, 'utf8'));
const save = async (p, value) => writeFile(p, JSON.stringify(value, null, 2));
const { home, host } = await read(join(root, '.suite/isolated-daemon.json'));
assert.match(home, /harness-paseo-/);
assert.notEqual(host, '127.0.0.1:6767');
const runRoot = join(root, '.suite', `run-${Date.now()}`);
const pluginRoot = join(runRoot, 'plugin');
const pluginId = 'harness-isolated-recovery-suite';
await mkdir(pluginRoot, { recursive: true });
const executable = spawnSync('/usr/bin/which', ['paseo'], { encoding: 'utf8' }).stdout.trim();
const cli = (...args) => spawnSync(executable, [...args, '--host', host, '--json'], { encoding: 'utf8', timeout: 20000 });
const local = (...args) => spawnSync(executable, ['daemon', ...args, '--home', home, '--json'], { encoding: 'utf8', timeout: 40000 });
const ok = result => { assert.equal(result.status, 0, result.stdout + result.stderr); return result; };
const plugins = () => JSON.parse(ok(cli('plugin', 'ls')).stdout);
const status = () => JSON.parse(ok(cli('status')).stdout);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFile(path) {
  const deadline = Date.now() + 55000;
  while (Date.now() < deadline) {
    try { return await read(path); } catch (e) { if (e.code !== 'ENOENT') throw e; }
    await delay(200);
  }
  throw new Error(`Missing result: ${path}`);
}
assert.deepEqual(plugins(), [], 'Disposable daemon must start without plugins');
assert.equal(status().daemonVersion, '0.12.0');
await save(join(pluginRoot, 'paseo-plugin.json'), {
  id: pluginId, requirements: { paseo: '>=0.12.0 <0.13.0' },
});
await save(join(pluginRoot, 'package.json'), { name: 'isolated-recovery-test', private: true, type: 'module' });
await symlink(join(root, '../paseo-contract/node_modules'), join(pluginRoot, 'node_modules'));
const dataPath = join(runRoot, 'data.json');
const bootsPath = join(runRoot, 'boots.jsonl');
await save(dataPath, { schema: 1, work: ['preserve-after-restart'], counter: 43 });
const originalData = await readFile(dataPath);
const good = `import type {PluginServerContext} from '@getpaseo/plugin/server';
import {appendFileSync,readFileSync} from 'node:fs';
export default function contribute(_ctx:PluginServerContext){
const data=JSON.parse(readFileSync(${JSON.stringify(dataPath)},'utf8'));
if(data.schema!==1)throw new Error('schema incompatible');
appendFileSync(${JSON.stringify(bootsPath)},JSON.stringify({pid:process.pid,at:new Date().toISOString()})+String.fromCharCode(10));
return ()=>{};}
`;
const bad = `import type {PluginServerContext} from '@getpaseo/plugin/server';
export default function contribute(_ctx:PluginServerContext){throw new Error('ISOLATED_SUITE_INTENTIONAL_FAILURE');}`;
const entry = join(pluginRoot, 'index.server.ts');
async function setSource(source) {
  await writeFile(entry, source);
  const checked = spawnSync(process.execPath, [join(root, '../paseo-contract/node_modules/typescript/bin/tsc'),
    '--noEmit', '--strict', '--skipLibCheck', '--target', 'ES2020', '--module', 'ESNext',
    '--moduleResolution', 'Bundler', entry], { cwd: pluginRoot, encoding: 'utf8' });
  ok(checked);
}
async function watcher(name, fallbackSource = good) {
  const state = join(runRoot, name); await mkdir(state);
  await writeFile(join(state, 'good.ts.txt'), fallbackSource);
  await save(join(state, 'data.json'), { schema: 1 });
  await save(join(state, 'activation.json'), {
    phase: 'prepared', autoDetect: true, cli: executable, host, pluginId,
    candidateDigest: hash(bad), fallbackDigest: hash(good),
  });
  const launched = ok(spawnSync(process.execPath, [join(root, 'recovery.mjs'), 'launch', pluginRoot, state], { encoding: 'utf8' }));
  const pids = JSON.parse(launched.stdout);
  await waitFile(join(state, 'watch-ready.json'));
  assert.throws(() => process.kill(pids.launcherPid, 0), { code: 'ESRCH' });
  return { state, ...pids };
}
const evidence = { at: new Date().toISOString(), host, daemonVersion: '0.12.0', cases: [] };
let installed = false;
try {
  await setSource(good);
  ok(cli('plugin', 'install', pluginRoot, '--id', pluginId)); installed = true;
  assert.equal(plugins().find(p => p.id === pluginId)?.status, 'running');
  const beforeRestart = status();
  const initialBoots = (await readFile(bootsPath, 'utf8')).trim().split('\n').map(JSON.parse);
  ok(local('restart', '--timeout', '30'));
  const afterRestart = status();
  assert.notEqual(beforeRestart.workerPid, afterRestart.workerPid);
  assert.equal(plugins().find(p => p.id === pluginId)?.status, 'running');
  const restartedBoots = (await readFile(bootsPath, 'utf8')).trim().split('\n').map(JSON.parse);
  assert.notEqual(initialBoots.at(-1).pid, restartedBoots.at(-1).pid);
  assert.equal(hash(await readFile(dataPath)), hash(originalData));
  evidence.cases.push({ name: 'worker-restart', outcome: 'passed', beforePid: beforeRestart.workerPid, afterPid: afterRestart.workerPid });

  const watch = await watcher('restart-recovery');
  ok(local('stop'));
  await setSource(bad);
  await delay(1800); // A deliberate outage window, not an assertion based on duration.
  ok(local('start', '--timeout', '30'));
  const recovered = await waitFile(join(watch.state, 'recovery-result.json'));
  assert.equal(recovered.outcome, 'recovered', JSON.stringify(recovered));
  assert.ok(recovered.unavailableObservations > 0);
  assert.equal(plugins().find(p => p.id === pluginId)?.status, 'running');
  assert.equal(hash(await readFile(dataPath)), hash(originalData));
  evidence.cases.push({ name: 'full-daemon-stop-start-auto-recovery', outcome: 'passed', ...watch, recovery: recovered });

  const invalidFallback = await watcher('invalid-fallback', good + '\n// modified after registration');
  await setSource(bad);
  const failedReload = cli('plugin', 'reload', pluginId);
  assert.notEqual(failedReload.status, 0);
  const blocked = await waitFile(join(invalidFallback.state, 'recovery-result.json'));
  assert.equal(blocked.outcome, 'blocked'); assert.match(blocked.error, /Fallback artifact drift/);
  assert.equal(hash(await readFile(entry)), hash(bad));
  assert.equal(hash(await readFile(dataPath)), hash(originalData));
  evidence.cases.push({ name: 'invalid-fallback-blocks-without-overwrite', outcome: 'passed', recovery: blocked });
  // Repair source, then a new independent operation can retry successfully.
  const retry = await watcher('retry-valid-fallback');
  const retried = await waitFile(join(retry.state, 'recovery-result.json'));
  assert.equal(retried.outcome, 'recovered', JSON.stringify(retried));
  assert.equal(plugins().find(p => p.id === pluginId)?.status, 'running');
  evidence.cases.push({ name: 'fresh-operation-retries-after-blocked-recovery', outcome: 'passed', recovery: retried });
} finally {
  if (installed) ok(cli('plugin', 'remove', pluginId));
  assert.deepEqual(plugins(), []);
  ok(local('stop'));
  evidence.cleanup = { pluginRemoved: true, isolatedDaemonStopped: true };
  await mkdir(join(root, 'evidence'), { recursive: true });
  await save(join(root, 'evidence/isolated-suite.json'), evidence);
  console.log(JSON.stringify(evidence, null, 2));
}
