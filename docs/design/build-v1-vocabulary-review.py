#!/usr/bin/env python3
"""Build the vocabulary review/acceptance record without changing its decision."""
import collections
import hashlib
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
review = json.loads((HERE / "v1-vocabulary-review.json").read_text())
raw = (HERE / "v1-concept-register.json").read_bytes()
model = json.loads(raw)
concepts = {c["id"]: c for c in model["concepts"]}
sources = {s["id"]: s for s in model["sources"]}
entries = review["entries"]
accepted = review["status"] == "accepted"
confirmation = review.get("acceptance", {}).get("explicitConfirmation")
pending = {
    c["id"] for c in model["concepts"]
    if c["status"] != "approved" or c["nameStatus"] != "approved"
    or c["definitionLocation"] is None
}
assert len(entries) == len({e["conceptId"] for e in entries})
if accepted:
    assert {e["conceptId"] for e in entries} == set(review["coverage"]["pendingConceptIds"])
    for e in entries:
        c = concepts[e["conceptId"]]
        assert c["status"] == c["nameStatus"] == "approved"
        assert c["name"] == e["recommendedName"]
        assert c["definition"] == e["definitionEnglish"]
        assert c["definitionLocation"]
else:
    assert {e["conceptId"] for e in entries} == pending
for e in entries:
    assert e["ownerGlossary"] == concepts[e["conceptId"]]["ownerGlossary"]
    assert set(e["existingSourceRefs"]) <= sources.keys()
    assert set(e["relatedConceptIds"]) <= concepts.keys()
    assert 0 < len(e["definitionEnglish"].split()) <= 90
    assert e["unresolvedQuestion"] is None

owner_order = [
    "GLOSSARY.md", "docs/domain/execution/GLOSSARY.md",
    "docs/domain/automation/GLOSSARY.md", "docs/domain/evolution/GLOSSARY.md",
    "docs/domain/analytics/GLOSSARY.md", "docs/engineering/GLOSSARY.md",
]
owner_names = dict(zip(owner_order, ["Common", "Execution", "Automation",
                                   "Evolution", "Analytics", "Engineering"]))
classes = collections.Counter(e["reviewClass"] for e in entries)
sha = hashlib.sha256(raw).hexdigest()

lines = [
    "# Project Harness V1 — English vocabulary review",
    "",
    ("Accepted on " + review["acceptedOn"] + ". This record preserves the original "
     "96-entry review scope. Definitions now live in their owning glossaries; graph "
     "types/cardinalities, new UI translations and runtime proof are separate."
     if accepted else
     "Draft for grouped D01 acceptance. All 96 pending concept IDs are included; "
     "this does not approve the vocabulary, UI translations, storage types or runtime."),
    "",
    "English names and definitions come first. Existing Vietnamese names/anchors "
    "remain aliases; no new Vietnamese UI translations are proposed here.",
    "",
    "The 23 external/general terms receive contextual reference notes at their "
    "documented owner, rather than automatically becoming domain entities or "
    "independent glossary records.",
    "",
    "[Interactive review](v1-vocabulary-review.html) · "
    "[Source manifest](v1-vocabulary-review.json) · "
    "[Source audit](v1-vocabulary-audit-r2.md) · "
    "[Current concept graph](v1-concept-graph.html)",
    "",
    "## Naming changes",
    "",
    ("| Earlier draft name | Canonical English name |" if accepted else
     "| Current draft name | Proposed canonical English name |"),
    "| --- | --- |",
]
for e in entries:
    if e["currentName"] != e["recommendedName"]:
        lines.append("| " + e["currentName"] + " | " + e["recommendedName"] + " |")
for owner in owner_order:
    group = [e for e in entries if e["ownerGlossary"] == owner]
    lines += ["", "## " + owner_names[owner],
              "", ("Owner: [" if accepted else "Proposed owner: [") + owner + "](../../" + owner + ")."]
    for e in group:
        lines += [
            "", '<a id="' + e["conceptId"].replace(".", "-") + '"></a>',
            "", "### " + e["recommendedName"], "", e["definitionEnglish"], "",
            "- Concept ID: " + e["conceptId"],
            "- Review class: " + e["reviewClass"],
            "- Aliases to preserve: " + (", ".join(e["aliasesToPreserve"]) or "none"),
            ("- Review-time scope note: " if accepted else "- Scope: ") + e.get("scopeNotes", e["rationale"]),
            "- Sources: " + ", ".join(
                "[" + sid + ": " + sources[sid]["path"] + ":"
                + str(sources[sid]["startLine"]) + "](../../"
                + sources[sid]["path"] + ")" for sid in e["existingSourceRefs"]),
        ]
lines += [
    "", "## Parent review and validation", "",
    "The review manifest preserves its original register snapshot "
    + review["registerSha256"] + ". Parent validation also checked "
    + ("accepted names/definitions and references" if accepted else "exact pending-ID coverage and references")
    + " against the current register " + sha + ".",
    "",
    "Source-backed editorial corrections narrowed R024/R070/R099/R132/R143/"
    "R180/R181. R164/R165/R222/R223 remain explicitly optional modeling proposals. "
    "These corrections do not introduce a new product decision or approve all "
    "inferred relations, types or cardinalities.",
    "",
    ("D01–D05 are accepted within their recorded vocabulary/policy scopes. "
     "Contextual references do not create new domain entities; native APIs, schemas "
     "and runtime evidence remain separate." if accepted else
     "D02–D05 and confirmed UI names remain accepted. D01 remains open pending "
     "grouped vocabulary acceptance. No new material meaning decision was found "
     "in this audit; native APIs, schemas and runtime evidence remain separate."),
]
if confirmation:
    evidence = confirmation["evidencePath"]
    lines += [
        "", "## Explicit current confirmation — G01", "",
        "The user explicitly confirmed the 96-entry names/definitions/owners scope "
        + "at T3 P" + str(confirmation["answerPosition"])
        + " after Q1 at P" + str(confirmation["questionPosition"]) + ". "
        + "This new confirmation preserves the earlier approval-scope ambiguity in history; "
        + "it does not approve all graph cardinalities, schemas, runtime capabilities or session closure.",
        "", "[Original Q/A and frozen review](../../" + evidence + ") · "
        + "[Resumed design tree](glossary-v1-grill.md)",
    ]
(HERE / "v1-vocabulary-review.md").write_text("\n".join(lines) + "\n")

payload = {
    "entries": entries,
    "ownerNames": owner_names,
    "sources": {sid: sources[sid] for e in entries for sid in e["existingSourceRefs"]},
    "baseSha": review["registerSha256"], "currentSha": sha,
    "status": review["status"], "acceptedOn": review.get("acceptedOn"),
}
data = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
page = """<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Project Harness · English vocabulary review</title>
<style>
:root{color-scheme:light dark;font-family:var(--font-sans,system-ui);color:var(--foreground,#243447);--line:var(--border,#9ba8b5);--panel:var(--card,#edf2f7)}
*{box-sizing:border-box}body{margin:0;background:transparent}h1{font-size:1.3rem;margin:8px 0}h2{font-size:1.12rem;margin:0 0 10px}p,li{line-height:1.55}.muted,small{color:var(--muted-foreground,#657487)}a{color:var(--accent-foreground,#176a9a);overflow-wrap:anywhere}
.controls{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}input,select,button{font:inherit;color:inherit;border:1px solid var(--line);background:var(--panel);border-radius:7px;padding:9px}input{min-width:160px;flex:1}button{cursor:pointer;overflow-wrap:anywhere;text-align:left}button[aria-pressed=true]{border-color:var(--ring,#267baf);background:var(--accent-surface,#dfeef9)}
.stats{display:flex;gap:8px;flex-wrap:wrap}.tag{display:inline-block;border:1px solid var(--line);border-radius:6px;padding:4px 7px;font-size:.78rem;margin:2px}.layout{display:grid;grid-template-columns:minmax(180px,.9fr) minmax(0,1.6fr);gap:14px;align-items:start}.panel{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius,10px);padding:16px;min-width:0}
#list{max-height:600px;overflow:auto}#list button{display:block;width:100%;margin-bottom:7px;background:transparent}#list small{display:block;margin-top:4px}.definition{font-size:1.05rem}.record{overflow-wrap:anywhere}.sources{max-height:240px;overflow:auto}.sources details{margin:8px 0}pre{white-space:pre-wrap;font:inherit;font-size:.86rem;line-height:1.5}
summary{cursor:pointer;line-height:1.5}.sr{position:absolute;left:-10000px}.foot{margin:16px 0}.badge{font-weight:600}.decision{margin:14px 0}
@media(max-width:600px){.layout{grid-template-columns:minmax(0,1fr)}#list{max-height:280px}.panel{padding:16px}h1{font-size:1.16rem}select{max-width:100%}}
</style>
<body>
<h1>English vocabulary · D01 review</h1>
<p>Proposed names and definitions for the remaining V1 vocabulary. Existing meanings and UI labels stay in place until acceptance.</p>
<div class="stats"><span class="tag">96 pending IDs · exact coverage</span><span class="tag">73 local vocabulary entries</span><span class="tag">23 contextual references</span><span class="tag">Draft · not runtime proof</span></div>
<details class="decision"><summary>What grouped acceptance covers</summary><p>English names, concise definitions, documented owners and preserved aliases. General technical terms stay contextual references. This does not approve every graph type/cardinality, add product screens or change implementation. D02–D05 remain accepted.</p></details>
<details><summary>10 proposed naming changes</summary><div id="renames"></div></details>
<div class="controls">
<label class="sr" for="q">Search</label><input id="q" placeholder="Search name, ID, meaning or alias">
<label class="sr" for="owner">Owner</label><select id="owner"><option value="">All document owners</option></select>
<label class="sr" for="cls">Review class</label><select id="cls"><option value="">All review classes</option><option value="source-backed-normalization">Source-backed wording</option><option value="naming-choice">Names to confirm</option><option value="external-general-term">Contextual references</option></select>
<button id="reset">Reset</button></div>
<p id="count" class="muted" aria-live="polite"></p>
<div class="layout"><nav id="list" class="panel" aria-label="Vocabulary entries"></nav><article id="detail" class="panel" aria-live="polite"></article></div>
<p class="muted foot">Source audit found no new material product decision. A contextual definition does not require a separate entity, service, storage record or glossary header.</p>
<details><summary>Provenance and complete documents</summary><p><a href="v1-vocabulary-review.md">Complete English review</a> · <a href="v1-vocabulary-review.json">Manifest</a> · <a href="v1-vocabulary-audit-r2.md">Audit</a> · <a href="v1-concept-graph.html">Concept graph</a></p><p id="provenance" class="record muted"></p></details>
<script>
const D=__DATA__, by=Object.fromEntries(D.entries.map(e=>[e.conceptId,e]));
const $=id=>document.getElementById(id), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected='execution.role-binding';
for(const [path,name] of Object.entries(D.ownerNames))$('owner').add(new Option(name,path));
$('renames').innerHTML=D.entries.filter(e=>e.currentName!==e.recommendedName).map(e=>'<p><button data-id="'+e.conceptId+'">'+esc(e.currentName)+' → '+esc(e.recommendedName)+'</button></p>').join('');
$('renames').onclick=ev=>{const b=ev.target.closest('button[data-id]');if(b){selected=b.dataset.id;render();}};
$('provenance').textContent='Manifest snapshot: '+D.baseSha+'. Parent validated against register: '+D.currentSha+'. Pending IDs and existing source references match; glossary acceptance remains pending.';
function filtered(){const q=$('q').value.toLowerCase(),o=$('owner').value,c=$('cls').value;return D.entries.filter(e=>(!o||e.ownerGlossary===o)&&(!c||e.reviewClass===c)&&(!q||JSON.stringify(e).toLowerCase().includes(q)));}
function inspect(id){const e=by[id];selected=id;$('detail').innerHTML='<h2>'+esc(e.recommendedName)+'</h2><span class="tag">'+esc(e.reviewClass==='external-general-term'?'Contextual reference':'Proposed local vocabulary')+'</span><p class="definition">'+esc(e.definitionEnglish)+'</p><p class="record muted">'+esc(e.conceptId)+'</p>'+(e.currentName!==e.recommendedName?'<p><b>Current draft name:</b> '+esc(e.currentName)+'</p>':'')+'<p><b>Owner:</b> '+esc(D.ownerNames[e.ownerGlossary])+'<br><a href="../../'+esc(e.ownerGlossary)+'">'+esc(e.ownerGlossary)+'</a></p><p><b>Aliases to preserve:</b> '+esc(e.aliasesToPreserve.join(', ')||'none')+'</p><p><b>Scope:</b> '+esc(e.scopeNotes||e.rationale)+'</p><details><summary>Rationale and related concepts</summary><p>'+esc(e.rationale)+'</p><p class="record">'+esc(e.relatedConceptIds.join(', '))+'</p></details><div class="sources"><h3>Source excerpts</h3>'+e.existingSourceRefs.map(id=>{const s=D.sources[id];return '<details><summary>'+esc(id+' · '+s.path+':'+s.startLine)+'</summary><pre>'+esc(s.excerpt)+'</pre></details>';}).join('')+'</div>';document.querySelectorAll('#list button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));}
function render(){const rows=filtered();$('count').textContent=rows.length+' / '+D.entries.length+' review entries · inventory, not a completion score';$('list').innerHTML=rows.map(e=>'<button data-id="'+e.conceptId+'">'+esc(e.recommendedName)+'<small>'+esc(D.ownerNames[e.ownerGlossary])+' · '+esc(e.reviewClass==='external-general-term'?'contextual reference':e.reviewClass==='naming-choice'?'name review':'source-backed wording')+'</small></button>').join('');if(rows.length){if(!rows.some(e=>e.conceptId===selected))selected=rows[0].conceptId;inspect(selected);}else $('detail').innerHTML='<p>No matching review entries.</p>';}
$('list').onclick=ev=>{const b=ev.target.closest('button[data-id]');if(b)inspect(b.dataset.id);};
$('q').oninput=render;$('owner').onchange=render;$('cls').onchange=render;$('reset').onclick=()=>{$('q').value='';$('owner').value='';$('cls').value='';selected='execution.role-binding';render();};
render();
const must=(c,m)=>{if(!c)throw Error(m);};
must(D.entries.length===new Set(D.entries.map(e=>e.conceptId)).size,'unique review IDs');
$('q').value='Orchestrator Session Binding';render();must(filtered().some(e=>e.conceptId==='execution.role-binding'),'search');
$('q').value='';$('cls').value='external-general-term';render();must(filtered().length>0&&filtered().every(e=>e.reviewClass==='external-general-term'),'context references');
$('cls').value='';$('owner').value='docs/domain/automation/GLOSSARY.md';render();must(filtered().length>0&&filtered().every(e=>e.ownerGlossary==='docs/domain/automation/GLOSSARY.md'),'automation owner');
$('reset').click();must($('detail').textContent.includes('revisioned association'),'name detail');
must(document.documentElement.scrollWidth<=window.innerWidth+1,'page overflow');
console.log('VOCABULARY_REVIEW_SMOKE_PASS: search, class, owner, detail, reset; '+D.entries.length+' entries');
</script></body></html>"""
if accepted:
    page = (page
        .replace("English vocabulary · D01 review", "English vocabulary · D01 accepted")
        .replace("Proposed names and definitions for the remaining V1 vocabulary. Existing meanings and UI labels stay in place until acceptance.",
                 "Names, definitions and documented owners accepted on " + review["acceptedOn"] + ". This record preserves the 96-entry review; owning glossaries contain the full V1 vocabulary.")
        .replace("96 pending IDs · exact coverage", "96 accepted review IDs")
        .replace("Draft · not runtime proof", "Accepted vocabulary · runtime proof separate")
        .replace("What grouped acceptance covers", "What acceptance covers")
        .replace("D02–D05 remain accepted.", "D01–D05 are accepted within their recorded scopes.")
        .replace("10 proposed naming changes", "10 accepted naming changes")
        .replace("Names to confirm", "Naming history")
        .replace("'Proposed local vocabulary'", "'Accepted local vocabulary'")
        .replace("<b>Current draft name:</b>", "<b>Earlier draft name:</b>")
        .replace("<b>Scope:</b>", "<b>Review-time scope note:</b>")
        .replace("Pending IDs and existing source references match; glossary acceptance remains pending.",
                 "The reviewed names and definitions match the accepted register; source snapshots preserve earlier evidence."))
if confirmation:
    evidence_href = "../../" + confirmation["evidencePath"]
    page = page.replace(
        '<p class="muted foot">Source audit found no new material product decision.',
        '<p class="record muted">Explicit D01 confirmation: Q1 P'
        + str(confirmation["questionPosition"]) + ' → user P'
        + str(confirmation["answerPosition"]) + '. <a href="'
        + evidence_href + '">Original Q/A and frozen review</a>.</p>\n'
        + '<p class="muted foot">Source audit found no new material product decision.'
    )
page = page.replace("__DATA__", data)
(HERE / "v1-vocabulary-review.html").write_text(page)
print(json.dumps({"entries": len(entries), "classes": dict(classes),
                  "currentRegisterSha256": sha, "materialMeaningQuestions": 0}))
