// Local fault spike, not a production release runtime. No Paseo calls.
import { createHash } from 'node:crypto';
import { readFile, writeFile, rename } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const canonical = (value) => {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
  }
  return value;
};
export const digest = value => createHash('sha256').update(value).digest('hex');
export const identity = value => digest(JSON.stringify(canonical(value)));

export async function pinResource(path) {
  return { path, digest: digest(await readFile(path)) };
}

export async function resourceStatus(pin) {
  try {
    return digest(await readFile(pin.path)) === pin.digest ? 'unchanged' : 'changed';
  } catch (error) {
    if (error.code === 'ENOENT') return 'missing';
    throw error;
  }
}

// In-memory same-process queue only: durability/restart ownership is NOT proven.
export class CheckQueue {
  pending = new Map();
  passed = new Map();
  heavyTail = Promise.resolve();

  async run(spec, execute) {
    if (!spec.candidate || !spec.check || !spec.environment || !spec.inputs) {
      throw new Error('Incomplete check identity');
    }
    const reusable = spec.kind !== 'health' && spec.cacheable === true;
    const key = identity(spec);
    if (reusable && this.passed.has(key)) return this.passed.get(key);
    if (reusable && this.pending.has(key)) return this.pending.get(key);
    const operation = async () => {
      const result = await execute();
      if (reusable && result.status === 'passed') this.passed.set(key, result);
      return result;
    };
    const work = spec.heavy ? this.heavyTail.then(operation) : Promise.resolve().then(operation);
    if (spec.heavy) this.heavyTail = work.catch(() => {});
    if (reusable) this.pending.set(key, work);
    try { return await work; }
    finally { if (reusable) this.pending.delete(key); }
  }
}

const json = async path => JSON.parse(await readFile(path, 'utf8'));
async function atomicJson(path, data) {
  const temporary = `${path}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(data));
  await rename(temporary, path);
}

// Simulator: state.json stands for current application data; it is never restored.
// Assumes one recovery actor and no competing activation. No fsync durability claim.
export async function recover(root) {
  const journalPath = `${root}/journal.json`;
  const journal = await json(journalPath);
  const current = await json(`${root}/active.json`);
  if (journal.phase === 'recovered') {
    if (current.digest !== journal.fallback.digest) throw new Error('Active release drift');
    return;
  }
  const alreadySwitched = journal.phase === 'recovering'
    && current.digest === journal.fallback.digest;
  if (current.digest !== journal.candidateDigest && !alreadySwitched) {
    throw new Error('Active release drift');
  }
  const state = await json(`${root}/state.json`);
  const fallback = journal.fallback;
  if (!fallback.readsSchemas.includes(state.schema)) throw new Error('Incompatible recovery');
  if (digest(await readFile(fallback.path)) !== fallback.digest) throw new Error('Artifact drift');
  // Persist intent before switching simulated source. Repeated call can reconcile it.
  journal.phase = 'recovering';
  await atomicJson(journalPath, journal);
  if (!alreadySwitched) await atomicJson(`${root}/active.json`, fallback);
  journal.phase = 'recovered';
  await atomicJson(journalPath, journal);
}

if (process.argv[2] === 'recover' && import.meta.url === pathToFileURL(process.argv[1]).href) {
  recover(process.argv[3]).catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
