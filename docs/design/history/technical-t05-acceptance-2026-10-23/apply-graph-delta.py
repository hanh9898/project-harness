"""One-shot documentation delta for the scoped T05 acceptance; no runtime operations."""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[4]
H = Path(__file__).resolve().parent
D = ROOT / 'docs/design'
model_path = D / 'v1-concept-register.json'
audit_path = D / 'v1-concept-graph-audit.json'
before = json.loads((H / 'baseline.json').read_text())
old_hash = next(x['sha256'] for x in before['snapshots'] if x['path'] == 'docs/design/v1-concept-register.json')
assert hashlib.sha256(model_path.read_bytes()).hexdigest() == old_hash, 'Unexpected model revision; do not rerun'
m = json.loads(model_path.read_text())
a = json.loads(audit_path.read_text())
assert not any(x['id'] in {'SRC514', 'R249', 'K75'} for key in ['sources', 'relations', 'constraints'] for x in m[key])

# Preserve the old exact excerpt instead of changing its historical meaning.
source = next(x for x in m['sources'] if x['id'] == 'SRC188')
assert source['path'] == 'docs/design/paseo-boundary.md'
snapshot = 'docs/design/history/technical-t05-acceptance-2026-10-23/before/docs/design/paseo-boundary.md'
old_excerpt = '\n'.join((ROOT / snapshot).read_text().splitlines()[source['startLine']-1:source['endLine']])
assert old_excerpt == source['excerpt']
source.update(path=snapshot, originalPath='docs/design/paseo-boundary.md', historical=True)

acceptance = H / 'acceptance-t05.json'
lines = acceptance.read_text().splitlines()
line = next(i for i, value in enumerate(lines, 1) if '"meaning":' in value)
m['sources'].append({
    'id': 'SRC514',
    'path': str(acceptance.relative_to(ROOT)),
    'startLine': line, 'endLine': line,
    'excerpt': lines[line-1],
    'kind': 'accepted-technical-followup',
})
constraint = {
    'id': 'K75',
    'text': 'When native scheduling cannot meet the required contract, Triggers may own a harness Schedule targeting code, agent work or a workflow. Work retains authority/resource/Pause admission; adequate native schedules remain Paseo-owned. Every Schedule has one owner, without a second engine replaying that cadence; no automatic native migration or Job-to-Schedule cardinality is implied.',
    'concepts': ['common.project-harness', 'automation.schedule', 'automation.job', 'automation.native-cadence', 'engineering.admission'],
    'status': 'approved', 'sourceRefs': ['SRC514'],
}
relation = {
    'id': 'R249', 'source': 'common.project-harness',
    'predicate': 'may own a schedule when native contracts are insufficient',
    'target': 'automation.schedule', 'kind': 'owns-data',
    'targetsPerSource': 'unknown', 'sourcesPerTarget': 'unknown',
    'status': 'inferred', 'sourceRefs': ['SRC514'],
    'scope': 'Conditional harness ownership through Triggers, for code/agent/workflow Jobs; adequate native source cadence retains its native owner. The relation is a mapping inference, not an approved multiplicity or runtime proof.',
}
ids = {c['id'] for c in m['concepts']}
assert set(constraint['concepts']) <= ids
assert {relation['source'], relation['target']} <= ids
m['constraints'].append(constraint)
m['relations'].append(relation)
for group, value in [('constraintReviews', constraint), ('relationReviews', relation)]:
    a[group].append({
        'id': value['id'], 'disposition': 'accepted-technical-followup-added' if group == 'constraintReviews' else 'technical-followup-inference-added',
        'reason': 'Scoped T05 ownership decision; no native migration, multiplicity acceptance, glossary rename or runtime evidence upgrade.',
        'sourceRefs': ['SRC514'], 'before': None, 'after': value,
    })
q = next(q for q in m['questions'] if q['id'] == 'CQ17')
for key, values in [('concepts', constraint['concepts']), ('relations', ['R249']), ('constraints', ['K75']), ('sourceRefs', ['SRC514'])]:
    for value in values:
        if value not in q[key]: q[key].append(value)
q['answer'] += ' T05 explicitly permits Triggers-owned schedules targeting agent/workflow work when native cannot meet the contract, while Work keeps authority/resources/Pause and each Schedule retains one owner. Target type alone does not determine ownership; existing native sources are not automatically migrated.'
assert all(isinstance(x, str) for x in m['modelNotes'])
m['modelNotes'].append('T05 scoped acceptance adds conditional schedule ownership (K75); native cadence meaning and all existing vocabulary remain. R249 is an inferred product-to-schedule mapping with unknown multiplicities. SRC188 is preserved at its pre-amendment snapshot; runtime evidence is unchanged.')
followup = {
    'round': 'T05', 'acceptance': str(acceptance.relative_to(ROOT)),
    'sourceRefs': ['SRC514'], 'constraints': ['K75'], 'relations': ['R249'],
    'questions': ['CQ17'], 'runtimeEvidenceChanged': False, 'vocabularyChanged': False,
}
m.setdefault('technicalFollowups', []).append(followup)
a.setdefault('technicalFollowups', []).append(followup)
model_text = json.dumps(m, ensure_ascii=False, indent=2) + '\n'
new_hash = hashlib.sha256(model_text.encode()).hexdigest()
a['reviewedRegisterSha256'] = new_hash
model_path.write_text(model_text)
audit_path.write_text(json.dumps(a, ensure_ascii=False, indent=2) + '\n')
(H / 'graph-delta.json').write_text(json.dumps({
    'beforeSha256': old_hash, 'afterSha256': new_hash,
    'added': {'sources': ['SRC514'], 'constraints': ['K75'], 'relations': ['R249']},
    'changedQuestion': 'CQ17', 'frozenSource': 'SRC188',
    'vocabularyChanged': False, 'runtimeEvidenceChanged': False,
}, indent=2) + '\n')
print(json.dumps({'sha256': new_hash, 'sources': len(m['sources']), 'constraints': len(m['constraints']), 'relations': len(m['relations'])}))
