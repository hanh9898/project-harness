// One-operation, single-actor live spike. Not a production supervisor.
import { readFile, writeFile, rename } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = process.argv[3];
const state = process.argv[4] ?? `${root}/.spike`;
const read = async path => JSON.parse(await readFile(path, 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const save = async (path, value) => {
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2)); await rename(tmp, path);
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

if (process.argv[2] === 'launch') {
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), 'watch', root, state], {
    detached: true, stdio: 'ignore',
  });
  child.unref();
  process.stdout.write(JSON.stringify({ launcherPid: process.pid, recoveryPid: child.pid }));
} else if (process.argv[2] === 'watch') {
  const journalPath = `${state}/activation.json`;
  let journal = await read(journalPath);
  let unavailableObservations = 0;
  const record = async event => save(`${state}/recovery-result.json`, {
    at: new Date().toISOString(), recoveryPid: process.pid, unavailableObservations, ...event,
  });
  const cli = (...args) => {
    const result = spawnSync(journal.cli, [...args, '--host', journal.host, '--json'], {
      encoding: 'utf8', timeout: journal.autoDetect ? 2500 : 20000,
    });
    return { exit: result.status, stdout: result.stdout, stderr: result.stderr };
  };
  try {
    await save(`${state}/watch-ready.json`, { pid: process.pid, at: new Date().toISOString() });
    let triggered = false;
    const deadline = Date.now() + 45000;
    while (Date.now() < deadline) {
      journal = await read(journalPath);
      if (journal.phase === 'abort') returnAfterAbort();
      if (journal.phase === 'fault-observed') { triggered = true; break; }
      if (journal.autoDetect) {
        const result = cli('plugin', 'ls', journal.pluginId);
        if (result.exit !== 0) unavailableObservations++;
        else {
          const plugin = JSON.parse(result.stdout).find(value => value.id === journal.pluginId);
          if (plugin?.status === 'failed') {
            journal.phase = 'fault-observed'; await save(journalPath, journal);
            triggered = true; break;
          }
        }
      }
      await delay(300);
    }
    if (!triggered) throw new Error('Timed out waiting for fault; no source changed');
    const observed = cli('plugin', 'ls', journal.pluginId);
    const list = JSON.parse(observed.stdout);
    const plugin = list.find(value => value.id === journal.pluginId);
    if (observed.exit !== 0 || plugin?.status !== 'failed') throw new Error('Expected failed disposable plugin');
    const data = await read(`${state}/data.json`);
    if (data.schema !== 1) throw new Error('Incompatible data schema');
    if (hash(await readFile(`${root}/index.server.ts`)) !== journal.candidateDigest) throw new Error('Candidate drift');
    const good = await readFile(`${state}/good.ts.txt`);
    if (hash(good) !== journal.fallbackDigest) throw new Error('Fallback artifact drift');
    journal.phase = 'recovering'; await save(journalPath, journal);
    const temp = `${root}/index.server.ts.recovering`;
    await writeFile(temp, good); await rename(temp, `${root}/index.server.ts`);
    const reload = cli('plugin', 'reload', journal.pluginId);
    let running;
    for (let attempt = 0; attempt < 20; attempt++) {
      const result = cli('plugin', 'ls', journal.pluginId);
      const item = JSON.parse(result.stdout).find(value => value.id === journal.pluginId);
      if (item?.status === 'running') { running = item; break; }
      await delay(250);
    }
    if (!running) throw new Error('Recovery reload did not reach running');
    journal.phase = 'recovered'; await save(journalPath, journal);
    await record({ outcome: 'recovered', pluginStatus: running.status, reloadExit: reload.exit });
  } catch (error) {
    await record({ outcome: 'blocked', error: String(error) });
    process.exitCode = 1;
  }
}

function returnAfterAbort() { process.exit(0); }
