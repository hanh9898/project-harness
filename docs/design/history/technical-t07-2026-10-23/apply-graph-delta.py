"""One-shot T07 documentation delta; no install, runtime or native operations."""
from pathlib import Path
import json
import hashlib

ROOT = Path(__file__).resolve().parents[4]
H = Path(__file__).resolve().parent
D = ROOT / 'docs/design'
baseline = json.loads((H / 'baseline.json').read_text())
p = D / 'v1-concept-register.json'
old_hash = next(x['sha256'] for x in baseline['snapshots'] if x['path'] == 'docs/design/v1-concept-register.json')
assert hashlib.sha256(p.read_bytes()).hexdigest() == old_hash, 'Unexpected graph revision; do not rerun'
m = json.loads(p.read_text())
audit_path = D / 'v1-concept-graph-audit.json'
audit = json.loads(audit_path.read_text())
assert not any(x['id'] == 'SRC515' for x in m['sources'])
assert not any(x['id'] == 'K76' for x in m['constraints'])
acceptance = H / 'acceptance-t07.json'
lines = acceptance.read_text().splitlines()
line = next(i for i, x in enumerate(lines, 1) if '"meaning":' in x)
m['sources'].append({'id':'SRC515','path':str(acceptance.relative_to(ROOT)), 'startLine':line,'endLine':line,'excerpt':lines[line-1],'kind':'accepted-technical-followup'})
k = {
 'id':'K76',
 'text':'V1 self-update uses a prepared local Paseo-plugin directory with stable runtime ID/path. Fork source and checked patch publication are distinct; Releases coordinates publication/native reload. SQLite, credentials and the operation-pinned independent Recovery Executable stay outside replaced source. Authorized patches retain Fast/Deep without an extra per-patch manual approval; no live install, automatic managed-source conversion or filesystem/native compatibility proof is implied.',
 'concepts':['common.project-harness','common.paseo-plugin','execution.artifact','evolution.activation','engineering.recovery-executable'],
 'status':'approved','sourceRefs':['SRC515'],
}
assert set(k['concepts']) <= {x['id'] for x in m['concepts']}
m['constraints'].append(k)
audit['constraintReviews'].append({'id':k['id'],'disposition':'accepted-technical-followup-added','reason':'Scoped T07 install/update decision; no new vocabulary, native operation, filesystem algorithm or runtime evidence approval.','sourceRefs':['SRC515'],'before':None,'after':k})
q = next(x for x in m['questions'] if x['id']=='CQ24')
for key, values in [('concepts',k['concepts']),('constraints',['K76']),('sourceRefs',['SRC515'])]:
 for value in values:
  if value not in q[key]:q[key].append(value)
q['answer'] += ' T07 selects a prepared local installation with stable ID/path and Releases-controlled publication/native reload; mutable data, credentials and operation-pinned recovery stay outside replaced source. This selects deployment, not a proven atomic filesystem/native update or a whole-plugin/UI pass.'
assert all(isinstance(x,str) for x in m['modelNotes'])
m['modelNotes'].append('T07 acceptance adds K76 and CQ24 provenance for selected local deployment. Glossary definitions, prior constraints/relations and runtime evidence remain unchanged; implementation/proof is separate.')
f={'round':'T07','acceptance':str(acceptance.relative_to(ROOT)),'sourceRefs':['SRC515'],'constraints':['K76'],'questions':['CQ24'],'runtimeEvidenceChanged':False,'vocabularyChanged':False}
m.setdefault('technicalFollowups',[]).append(f)
audit.setdefault('technicalFollowups',[]).append(f)
raw=json.dumps(m,ensure_ascii=False,indent=2)+'\n'
new_hash=hashlib.sha256(raw.encode()).hexdigest()
audit['reviewedRegisterSha256']=new_hash
p.write_text(raw)
audit_path.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
(H/'graph-delta.json').write_text(json.dumps({'beforeSha256':old_hash,'afterSha256':new_hash,'added':{'sources':['SRC515'],'constraints':['K76']},'changedQuestion':'CQ24','vocabularyChanged':False,'runtimeEvidenceChanged':False},indent=2)+'\n')
print(json.dumps({'sha256':new_hash,'constraints':len(m['constraints']),'sources':len(m['sources'])}))
