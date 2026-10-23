"""Temporary SQLite and executable-version fault tests; no production data."""
import hashlib
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
import time
import unittest


def create_database(path):
    with sqlite3.connect(path) as db:
        db.execute('PRAGMA journal_mode=WAL')
        db.execute('CREATE TABLE work(id INTEGER PRIMARY KEY, intent TEXT NOT NULL)')
        db.execute("INSERT INTO work VALUES(1, 'committed-before-update')")
        db.execute('CREATE TABLE release_meta(generation INTEGER NOT NULL)')
        db.execute('INSERT INTO release_meta VALUES(1)')
        for event in ['INSERT', 'UPDATE', 'DELETE']:
            db.execute(f'CREATE TRIGGER track_{event.lower()} AFTER {event} ON work '
                       'BEGIN UPDATE release_meta SET generation=generation+1; END')
        db.execute('PRAGMA user_version=1')


def migrate_expand(path):
    with sqlite3.connect(path) as db:
        if db.execute('PRAGMA user_version').fetchone()[0] == 2:
            return
        db.execute('BEGIN IMMEDIATE')
        db.execute('ALTER TABLE work ADD COLUMN result TEXT')
        db.execute('PRAGMA user_version=2')


def backup_database(source, target):
    with sqlite3.connect(source) as db, sqlite3.connect(target) as backup:
        db.backup(backup)
        if backup.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
            raise ValueError('Invalid backup')
        return backup.execute('SELECT generation FROM release_meta').fetchone()[0]


def restore_if_unchanged(source, backup, watermark):
    # Offline restore model only. Production must also hold ownership across this check.
    with sqlite3.connect(backup) as saved:
        if saved.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
            raise ValueError('Invalid backup')
        with sqlite3.connect(source) as current:
            if current.execute('SELECT generation FROM release_meta').fetchone()[0] != watermark:
                raise ValueError('Restore would erase committed work')
            saved.backup(current)


class StorageTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='harness-sqlite-test-')
        self.root = Path(self.tmp.name)
        self.db = self.root / 'state.sqlite'
        create_database(self.db)

    def tearDown(self):
        self.tmp.cleanup()

    def test_expand_migration_keeps_old_reader_and_new_writes(self):
        migrate_expand(self.db)
        migrate_expand(self.db)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('SELECT intent FROM work WHERE id=1').fetchone()[0], 'committed-before-update')
            db.execute("INSERT INTO work(id,intent,result) VALUES(2,'new-work','done')")
            self.assertEqual(db.execute('SELECT count(*) FROM work').fetchone()[0], 2)

    def test_process_death_mid_migration_rolls_back_transaction(self):
        result = subprocess.run([sys.executable, __file__, '--crash-migration', str(self.db)])
        self.assertEqual(result.returncode, 9)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('PRAGMA user_version').fetchone()[0], 1)
            self.assertEqual([c[1] for c in db.execute('PRAGMA table_info(work)')], ['id', 'intent'])
            self.assertEqual(db.execute('SELECT count(*) FROM work').fetchone()[0], 1)

    def test_backup_is_readable_and_restorable_before_new_effects(self):
        backup = self.root / 'backup.sqlite'
        watermark = backup_database(self.db, backup)
        migrate_expand(self.db)
        restore_if_unchanged(self.db, backup, watermark)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('PRAGMA user_version').fetchone()[0], 1)
            self.assertEqual(db.execute('SELECT intent FROM work').fetchone()[0], 'committed-before-update')

    def test_restore_refuses_to_erase_work_committed_after_backup(self):
        backup = self.root / 'backup.sqlite'
        watermark = backup_database(self.db, backup)
        with sqlite3.connect(self.db) as db:
            db.execute("INSERT INTO work VALUES(2,'committed-after-backup')")
        with self.assertRaisesRegex(ValueError, 'erase committed work'):
            restore_if_unchanged(self.db, backup, watermark)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('SELECT count(*) FROM work').fetchone()[0], 2)

    def test_corrupt_backup_is_rejected_without_replacing_current_database(self):
        backup = self.root / 'corrupt.sqlite'
        backup.write_bytes(b'not a database')
        with self.assertRaises(sqlite3.DatabaseError):
            restore_if_unchanged(self.db, backup, 1)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('PRAGMA integrity_check').fetchone()[0], 'ok')

    def test_restore_refuses_to_erase_update_after_backup(self):
        backup = self.root / 'backup.sqlite'
        watermark = backup_database(self.db, backup)
        with sqlite3.connect(self.db) as db:
            db.execute("UPDATE work SET intent='updated-after-backup' WHERE id=1")
        with self.assertRaisesRegex(ValueError, 'erase committed work'):
            restore_if_unchanged(self.db, backup, watermark)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('SELECT intent FROM work').fetchone()[0], 'updated-after-backup')

    def test_restore_refuses_to_resurrect_work_deleted_after_backup(self):
        backup = self.root / 'backup.sqlite'
        watermark = backup_database(self.db, backup)
        with sqlite3.connect(self.db) as db:
            db.execute('DELETE FROM work WHERE id=1')
        with self.assertRaisesRegex(ValueError, 'erase committed work'):
            restore_if_unchanged(self.db, backup, watermark)
        with sqlite3.connect(self.db) as db:
            self.assertEqual(db.execute('SELECT count(*) FROM work').fetchone()[0], 0)

    def test_incompatible_schema_blocks_old_code_instead_of_restoring_backup(self):
        with sqlite3.connect(self.db) as db:
            db.execute('ALTER TABLE work RENAME COLUMN intent TO description')
            db.execute('PRAGMA user_version=3')
        with sqlite3.connect(self.db) as db:
            version = db.execute('PRAGMA user_version').fetchone()[0]
            compatible = version in [1, 2]
            self.assertFalse(compatible)
            self.assertEqual(db.execute('SELECT description FROM work').fetchone()[0], 'committed-before-update')


WORKER = r"""
import {writeFileSync,existsSync} from 'node:fs';
const version = VERSION;
if(process.argv[2]==='--probe'){console.log(JSON.stringify({ready:true,version}));}
else {
 const root=process.argv[2];
 writeFileSync(root+'/ready.json',JSON.stringify({version,pid:process.pid}));
 const deadline=Date.now()+8000;
 while(!existsSync(root+'/continue')) {
  if(Date.now()>deadline)throw new Error('gate timeout');
  await new Promise(r=>setTimeout(r,25));
 }
 writeFileSync(root+'/result.json',JSON.stringify({version,pid:process.pid}));
}
"""


def promote_executable(path, pointer):
    probe = subprocess.run(['node', str(path), '--probe'], capture_output=True, text=True, timeout=10)
    if probe.returncode != 0 or json.loads(probe.stdout).get('ready') is not True:
        raise ValueError('Recovery executable probe failed')
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    temporary = pointer.with_suffix('.tmp')
    temporary.write_text(json.dumps({'path': str(path), 'digest': digest}))
    os.replace(temporary, pointer)


class ExecutableTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='harness-executable-test-')
        self.root = Path(self.tmp.name)
        self.pointer = self.root / 'active.json'
        self.v1 = self.root / 'recovery-v1.mjs'
        self.v2 = self.root / 'recovery-v2.mjs'
        self.v1.write_text(WORKER.replace('VERSION', '1'))
        self.v2.write_text(WORKER.replace('VERSION', '2'))
        promote_executable(self.v1, self.pointer)

    def tearDown(self):
        self.tmp.cleanup()

    def test_update_preserves_running_recovery_and_new_operation_uses_new_version(self):
        operation = self.root / 'operation'; operation.mkdir()
        old_bytes = self.v1.read_bytes()
        child = subprocess.Popen(['node', json.loads(self.pointer.read_text())['path'], str(operation)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            deadline = time.monotonic() + 5
            while not (operation / 'ready.json').exists():
                if time.monotonic() > deadline:
                    self.fail('Old executable did not become ready')
                time.sleep(0.02)
            promote_executable(self.v2, self.pointer)
            (operation / 'continue').touch()
            output, error = child.communicate(timeout=8)
            self.assertEqual(child.returncode, 0, error)
            self.assertEqual(json.loads((operation / 'result.json').read_text())['version'], 1)
            new_path = json.loads(self.pointer.read_text())['path']
            new = subprocess.run(['node', new_path, '--probe'], text=True, capture_output=True, check=True)
            self.assertEqual(json.loads(new.stdout)['version'], 2)
            self.assertEqual(self.v1.read_bytes(), old_bytes)
        finally:
            if child.poll() is None:
                child.kill(); child.communicate()

    def test_runtime_broken_update_does_not_replace_working_recovery(self):
        broken = self.root / 'recovery-broken.mjs'
        broken.write_text("throw new Error('broken executable');")
        self.assertEqual(subprocess.run(['node', '--check', str(broken)], capture_output=True).returncode, 0)
        before = self.pointer.read_bytes()
        with self.assertRaisesRegex(ValueError, 'probe failed'):
            promote_executable(broken, self.pointer)
        self.assertEqual(self.pointer.read_bytes(), before)


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--crash-migration':
        db = sqlite3.connect(sys.argv[2])
        db.execute('BEGIN IMMEDIATE')
        db.execute('ALTER TABLE work ADD COLUMN result TEXT')
        db.execute('PRAGMA user_version=2')
        os._exit(9)
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    evidence = Path(__file__).parent / 'evidence'
    evidence.mkdir(exist_ok=True)
    (evidence / 'storage-executable-summary.json').write_text(json.dumps({
        'testsRun': result.testsRun, 'failures': len(result.failures), 'errors': len(result.errors),
        'sqliteVersion': sqlite3.sqlite_version, 'success': result.wasSuccessful(),
        'limits': ['Temporary fixture schemas', 'No host reboot', 'Offline restore assumes exclusive ownership',
                   'Generation triggers track only fixture work table; not untracked tables or external effects',
                   'Executable version switch model; not production executable packaging'],
    }, indent=2))
    sys.exit(0 if result.wasSuccessful() else 1)
