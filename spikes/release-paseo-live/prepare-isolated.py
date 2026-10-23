"""Prepare and start only a disposable local Paseo home for isolated-suite.mjs."""
import json
from pathlib import Path
import socket
import subprocess
import tempfile

root = Path(__file__).resolve().parent
metadata = root / '.suite' / 'isolated-daemon.json'
if metadata.exists():
    old = json.loads(metadata.read_text())
    if Path(old['home']).exists():
        raise SystemExit('Previous disposable home exists; inspect/stop it before preparing another.')
metadata.parent.mkdir(exist_ok=True)
home = Path(tempfile.mkdtemp(prefix='harness-paseo-'))
with socket.socket() as listener:
    listener.bind(('127.0.0.1', 0))
    port = listener.getsockname()[1]
host = f'127.0.0.1:{port}'
(home / 'config.json').write_text(json.dumps({
    'pluginsEnabled': True,
    'daemon': {'listen': host, 'relay': {'enabled': False},
               'mcp': {'enabled': False, 'injectIntoAgents': False}},
}))
metadata.write_text(json.dumps({'home': str(home), 'host': host}))
result = subprocess.run(['paseo', 'daemon', 'start', '--home', str(home), '--timeout', '30', '--json'],
                        capture_output=True, text=True, timeout=40)
print(result.stdout)
if result.returncode:
    print(result.stderr)
    raise SystemExit(result.returncode)
