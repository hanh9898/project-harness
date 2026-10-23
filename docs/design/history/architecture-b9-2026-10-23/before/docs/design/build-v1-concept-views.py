#!/usr/bin/env python3
"""Compile views and audit the authoritative documentation register (stdlib only)."""
import collections, hashlib, json, pathlib, re, sys
ROOT=pathlib.Path(__file__).resolve().parents[2]; D=ROOT/'docs/design'
path=D/'v1-concept-register.json'; raw=path.read_text(); m=json.loads(raw)
ids={}; errors=[]; groups={} 
for group in ['sources','contexts','concepts','relations','constraints','requirements','questions','mappings','conflicts','decisions']:
 for x in m[group]:
  if x['id'] in ids: errors.append('duplicate '+x['id'])
  ids[x['id']]=x; groups[x['id']]=group
statuses={'approved','inferred','proposed','open'}
for group in ['concepts','relations','constraints','requirements','mappings','conflicts','decisions']:
 for x in m[group]:
  if x.get('status') not in statuses:errors.append('bad status '+x['id'])
  if not x.get('sourceRefs'):errors.append('no provenance '+x['id'])
for group in ['concepts','relations','constraints','requirements','questions','mappings','conflicts','decisions']:
 for x in m[group]:
  for key in ['sourceRefs','concepts','relations','constraints','requirements','questions','mappings','decisions','dependencies']:
   for ref in x.get(key,[]):
    if ref not in ids:errors.append(x['id']+' dangling '+ref)
    elif groups[ref]!=({'sourceRefs':'sources','dependencies':'decisions'}.get(key,key)):errors.append(x['id']+' wrong reference type '+ref)
for c in m['concepts']:
 if c['nameStatus'] not in statuses or c['context'] not in ids:errors.append('bad concept metadata '+c['id'])
 if not (ROOT/c['ownerGlossary']).is_file():errors.append('missing glossary '+c['id'])
 if not c['definition']:errors.append('empty definition '+c['id'])
for r in m['relations']:
 for key in ['source','target']:
  if r[key] not in ids or groups.get(r[key])!='concepts':errors.append('bad endpoint '+r['id'])
 for key in ['targetsPerSource','sourcesPerTarget']:
  if not re.fullmatch(r'unknown|\d+|\d+\.\.(?:\d+|\*)',r[key]):errors.append('bad cardinality '+r['id'])
  if '..' in r[key] and not r[key].endswith('*') and int(r[key].split('..')[0])>int(r[key].split('..')[1]):errors.append('reversed range '+r['id'])
 if r['kind']=='is-a' and (ids[r['source']]['type']=='role' or ids[r['target']]['type']=='role'):errors.append('role subtype '+r['id'])
 if r.get('supersededBy'):
  target=ids.get(r['supersededBy'])
  if not target or groups.get(r['supersededBy'])!='relations' or target is r or target.get('supersededBy'):errors.append('bad relation supersession '+r['id'])
  if any(r['id'] in q['relations'] for q in m['questions']):errors.append('CQ uses superseded relation '+r['id'])
for s in m['sources']:
 p=ROOT/s['path']
 if not p.is_file():errors.append('missing source '+s['id']);continue
 actual='\n'.join(p.read_text().splitlines()[s['startLine']-1:s['endLine']])
 if actual!=s['excerpt']:errors.append('stale source excerpt '+s['id'])
for mp in m['mappings']:
 source=ids[mp['sourceRefs'][0]]
 owner=source.get('originalPath',source['path'])
 for link in mp.get('targetLinks',[]):
  if link.startswith(('http:','https:','mailto:')):continue
  p,_,a=link.partition('#'); target=(ROOT/owner).parent/p
  if not target.is_file():errors.append('broken mapping link '+mp['id']+' '+link)
  elif a and not ('id="'+a+'"' in target.read_text() or re.search(r'^#+ .*'+re.escape(a.replace('-',' ')),target.read_text(),re.M|re.I)):
   # explicit glossary anchors are mandatory; normal Markdown headings are checked only for file existence.
   if target.name=='GLOSSARY.md':errors.append('bad glossary anchor '+mp['id']+' '+a)
for c in m['concepts']:
 if not any(c['id'] in [r['source'],r['target']] for r in m['relations']):errors.append('orphan '+c['id'])
 if c['critical'] and not any(c['id'] in q['concepts'] for q in m['questions']):errors.append('critical without CQ '+c['id'])
for q in m['questions']:
 if not all(q.get(k) for k in ['requirements','concepts','relations','constraints','answer','sourceRefs','runtimeEvidence']):errors.append('incomplete CQ trace '+q['id'])
 if not {endpoint for rid in q['relations'] for endpoint in [ids[rid]['source'],ids[rid]['target']]}<=set(q['concepts']):errors.append('CQ omits relation endpoint '+q['id'])
original=re.findall(r'^\| (CQ\d+) / [^|]+\| ([^|]+)\|',(D/'glossary-concept-model.md').read_text(),re.M)
for qid,wording in original:
 if ids[qid]['question']!=wording.strip():errors.append('changed original question '+qid)
for r in m['requirements']:
 if not r['questions']:errors.append('uncovered requirement '+r['id'])
audit_path=D/'v1-concept-graph-audit.json'
if m.get('relationAudit'):
 if not audit_path.is_file():errors.append('missing relation audit')
 else:
  audit=json.loads(audit_path.read_text())
  for group,review_key in [('relations','relationReviews'),('constraints','constraintReviews')]:
   rows=audit[review_key]
   if len(rows)!=len({r['id'] for r in rows}) or {r['id'] for r in rows}!={r['id'] for r in m[group]}:errors.append('audit coverage '+group)
   for row in rows:
    if row['after']!=ids.get(row['id']):errors.append('stale audit record '+row['id'])
    if not row.get('reason') or not row.get('sourceRefs'):errors.append('audit rationale '+row['id'])
  if set(audit['conceptTypeReview']['reviewedIds'])!={c['id'] for c in m['concepts']}:errors.append('type review coverage')
  frontiers={f['id']:f for f in audit['frontiers']}
  for q in m['questions']:
   for fid in q.get('modelingFrontiers',[]):
    if fid not in frontiers or frontiers[fid]['status']=='approved':errors.append('unknown or closed modeling frontier '+q['id'])
   for fid in q.get('resolvedModelingFrontiers',[]):
    if fid not in frontiers or frontiers[fid]['status']!='approved' or ids.get(fid,{}).get('status')!='approved':errors.append('unresolved modeling decision '+q['id'])
  if not (D/'v1-concept-graph-audit.md').is_file():errors.append('missing readable relation audit')
if errors:
 print('\n'.join(errors));sys.exit(1)
sha=hashlib.sha256(raw.encode()).hexdigest()
pre='# V1 competency traceability and answer ledger\n\nGenerated from [v1-concept-register.json](v1-concept-register.json). Register SHA-256: `'+sha+'`.\n\nĐây là coverage ngữ nghĩa của bản draft, không phải pass runtime. `approved-sources` mô tả căn cứ của đáp án, không duyệt các proposed names/relations đi kèm. Mỗi câu có definition gaps và relation gaps độc lập; không dùng tỷ lệ phần trăm hoàn thành.\n\n'
if m.get('relationAudit'):pre+='[Source audit](v1-concept-graph-audit.md) đã rà các cạnh theo nguồn. `relationGaps` liệt kê quan hệ inferred/proposed, không đồng nghĩa mỗi cạnh cần một quyết định người dùng mới; modeling frontiers được ghi riêng.\n\n'
lines=[pre,'## Requirement → scenarios/CQs\n','| Requirement | Accepted scope / source | CQs |','| --- | --- | --- |']
def source_link(sid):
 s=ids[sid];label=s.get('originalPath',s['path']);suffix=' · snapshot' if s.get('historical') else ''
 return f"[{sid}: {label}:{s['startLine']}{suffix}](../../{s['path']})"
for r in m['requirements']:lines.append(f"| {r['id']} | {r['name']} · {source_link(r['sourceRefs'][0])} | {', '.join(r['questions'])} |")
lines+=['\n## Answer / mapping ledger\n','Definitions below are register drafts unless their owning glossary already approves the name and meaning. Absence of a code/UI mapping is explicit, not a missing invented implementation. The JSON stores every mapping record verbatim with scope and source.\n']
for q in m['questions']:
 lines+=['<a id="'+q['id'].lower()+'"></a>\n',f"### {q['id']} · {q['scenario']}\n",q['question']+'\n',q['answer']+'\n',f"- Requirements: {', '.join(q['requirements'])}. Semantic answer: **{q['semanticCoverage']}**; runtime: **{q['runtimeEvidence']['level']}** — {q['runtimeEvidence']['note']}",'- Concepts / definition mapping: '+ '; '.join(f"`{c}` → [{ids[c]['name']}](../../{ids[c]['ownerGlossary']}) ({ids[c]['status']}; name {ids[c]['nameStatus']})" for c in q['concepts']),'- Directed relations: '+ '; '.join(f"`{r}` {ids[ids[r]['source']]['name']} → {ids[r]['predicate']} → {ids[ids[r]['target']]['name']}" for r in q['relations']),'- Constraints: '+', '.join(q['constraints']),'- Definition/name gaps: '+(', '.join(q['definitionGaps']) or 'none within this question scope'),'- Inferred/proposed relations (source audit separate): '+(', '.join(q['relationGaps']) or 'none'),'- UI mappings: '+(', '.join(x for x in q['mappings'] if x.startswith('UI.')) or 'No existing scoped UI mapping; do not create a label merely for this node.'),'- Code mappings: '+(', '.join(x for x in q['mappings'] if not x.startswith('UI.')) or 'No observed identifier mapping; design-only.'),'- Sources: '+', '.join(source_link(s) for s in q['sourceRefs']),'- Decision records: '+(', '.join(d+' ('+ids[d]['status']+')' for d in q['decisions']) or 'No additional product decision recorded for this question; source/model/protocol status remains separately scoped.'),'']
 if q.get('modelingFrontiers'):lines+=['- Open design frontier: [GA01](v1-concept-graph-audit.md#ga01). Identity/cardinality must be resolved before the execution model; accepted vocabulary/policy is unchanged.','']
 if q.get('resolvedModelingFrontiers'):lines+=['- Accepted design decision: [GA01](v1-glossary-completion-plan.md#ga01-assignment-identity-acceptance). Redispatch creates a new Assignment; uncertain response or continued Turns retains identity. This is design acceptance, not runtime proof.','']
(D/'v1-competency-ledger.md').write_text('\n'.join(lines)+'\n')
template=(D/'v1-concept-browser.template.html').read_text()
# Share repeated long strings so the complete model fits the inline preview limit.
# The browser reconstructs the original register synchronously, without dropping fields.
strings=collections.Counter()
keys=collections.Counter()
def count_strings(x):
 if isinstance(x,str):strings[x]+=1
 elif isinstance(x,list):
  for value in x:count_strings(value)
 elif isinstance(x,dict):
  for key,value in x.items():
   keys[key]+=1
   count_strings(value)
count_strings(m)
table=[s for s,n in strings.items() if len(s)>35 and n>1]
indices={s:i for i,s in enumerate(table)}
key_tokens={k:'$k'+str(i) for i,k in enumerate(k for k,n in keys.items() if (len(k)>6 and n>1) or (len(k)==6 and n>8))}
def pack(x):
 if isinstance(x,str):return {'$s':indices[x]} if x in indices else x
 if isinstance(x,list):return [pack(v) for v in x]
 if isinstance(x,dict):
  assert '$s' not in x and not any(k.startswith('$k') for k in x), 'reserved payload key'
  return {key_tokens.get(k,k):pack(v) for k,v in x.items()}
 return x
payload=json.dumps({'strings':table,'keys':{v:k for k,v in key_tokens.items()},'model':pack(m)},ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
expression="((p)=>{const decode=x=>Array.isArray(x)?x.map(decode):x&&typeof x==='object'?(Object.keys(x).length===1&&Object.prototype.hasOwnProperty.call(x,'$s')?p.strings[x.$s]:Object.fromEntries(Object.entries(x).map(([k,v])=>[Object.prototype.hasOwnProperty.call(p.keys,k)?p.keys[k]:k,decode(v)]))):x;return decode(p.model)})("+payload+")"
html=template.replace('__REGISTER__',expression).replace('__SHA__',sha)
if '--check' in sys.argv:
 if (D/'v1-concept-graph.html').read_text()!=html:raise SystemExit('stale HTML')
else:(D/'v1-concept-graph.html').write_text(html)
stats={g:len(m[g]) for g in ['concepts','relations','constraints','requirements','questions','mappings','sources']}
report=f'''# V1 concept model validation

Register SHA-256: `{sha}`.

Command: `python3 docs/design/build-v1-concept-views.py --check`

Structural checks passed: unique IDs; typed reference targets; status/provenance; cardinality syntax and range; source excerpt/line consistency; owning files and explicit glossary anchors; mapping links; no role inheritance; no orphan critical concepts; each critical concept traced to at least one CQ; each required area has CQs; each CQ has concepts, directed relations, constraints, answer, mappings or explicit gap, and separate runtime evidence scope. All original CQ01–CQ30 retained; later CQs expand failure/reload/authority/update and accepted follow-up scenarios.

Counts (inventory, not completion): {json.dumps(stats)}.

Answer classifications: {dict(collections.Counter(q['semanticCoverage'] for q in m['questions']))}.
Runtime evidence classifications: {dict(collections.Counter(q['runtimeEvidence']['level'] for q in m['questions']))}.

`unknown` cardinalities remain explicit. Most relations are inferred draft synthesis, not newly accepted behavior. Validation checks consistency and traceability, not truth of every synthesis, formal logical completeness, or production implementation. Source excerpts are local citations, not proof native APIs enforce policy. The register and browser do not execute product workflows.

Source audit: [report](v1-concept-graph-audit.md) and [per-record before/after](v1-concept-graph-audit.json). Audit covers all relation/constraint records and concept type IDs; current CQ paths include their relation endpoints and exclude superseded relations. Historical relation IDs stay inspectable but do not add active graph edges. Source review does not promote inferred/proposed records to approved or establish runtime evidence.

Browser preview results are recorded separately in the completion plan; generated HTML uses inline data/script/style and no dependencies.
'''
(D/'v1-concept-validation.md').write_text(report)
print('VALID',json.dumps(stats),'SHA',sha)
