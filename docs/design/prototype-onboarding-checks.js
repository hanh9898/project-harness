// Browser fixture checks only. No Paseo mutation or MCP call.
function checkOnboardingPrototype(){
 const passed=[],check=(ok,name)=>{if(!ok)throw new Error(name);passed.push(name);};
 const click=(action,role='')=>{const b=[...document.querySelectorAll('[data-action="lc-'+action+'"]')].find(x=>(x.dataset.id||'')===role);if(!b)throw new Error('Missing '+action+':'+role);b.click();};
 setScenario('fresh');let l=lifecycleEnsure();
 check(!l.sessions.onboarding&&!l.sessions.harness&&!l.sessions.project,'Fresh does not spawn any agent');
 check(!document.querySelector('aside [data-id="project"]')&&!document.querySelector('aside [data-id="harness"]'),'No mandatory project/harness chat navigation');
 lifecycleAction('spawn','project');check(!l.sessions.project,'Project cannot spawn before build');
 lifecycleAction('spawn','harness');check(!l.sessions.harness,'Harness cannot spawn before onboarding');
 click('spawn','onboarding');const first=l.sessions.onboarding;
 check(S.route==='lifecycle/onboarding'&&!!first,'Onboarding opens native Session handoff fixture');
 check(!document.querySelector('[data-form="chat"]'),'Native Session handoff has no plugin chat composer');
 click('configure');click('check','harness-build');
 check(l.report.pass,'Minimum configuration passes without external integrations');
 click('complete');check(l.onboardingComplete&&!!l.handover,'Completion saves handover before enabling harness');
 const counter=S.counter;lifecycleAction('spawn','onboarding');check(l.sessions.onboarding===first&&S.counter===counter,'Repeated launch opens existing Session');
 nav('lifecycle');click('profile');lifecycleAction('spawn','harness');check(!l.sessions.harness,'Missing profile blocks dispatch after prior readiness');
 click('profile');click('check','harness-build');lifecycleAction('drift');lifecycleAction('complete');check(!l.onboardingComplete,'Stale report cannot complete onboarding');
 nav('lifecycle/onboarding');click('check','harness-build');click('complete');
 S.host=false;lifecycleAction('spawn','harness');check(!l.sessions.harness,'Offline blocks native spawn');S.host=true;
 nav('lifecycle');click('spawn','harness');check(l.build==='running'&&!!l.sessions.harness&&!l.sessions.project,'Harness starts without auto-spawning project');
 click('build');check(l.build==='ready'&&l.report.pass&&!!l.handover,'Build stores handover and checks launch readiness');
 check(!S.verified,'Build readiness does not mark real task capability verified');
 click('tool');lifecycleAction('spawn','project');check(!l.sessions.project,'Missing required tool blocks project launch');click('tool');
 click('spawn','project');check(!!l.sessions.project&&S.route==='lifecycle/project','User explicitly spawns project');
 nav('project');check(!document.querySelector('[data-form=chat]'),'Legacy project link opens native handoff without composer');
 check(S.agentSessions.some(g=>g.id===l.sessions.project),'Spawned Session appears in monitor fixture');
 nav('lifecycle');const old=l.sessions.project,workCount=S.workflowRuns.length;
 click('replace','project');check(!!l.replacement&&l.sessions.project===old,'Replace waits for reconciliation before transfer');
 const state=JSON.parse(localStorage.getItem(STORE_KEY));check(state.lifecycle.replacement.old===old,'Pending handover persisted for reload');
 click('handover');check(l.sessions.project!==old&&l.history.some(x=>x.includes(old)),'Transfer preserves previous Session history');
 check(S.workflowRuns.length===workCount,'Replacing Session does not cancel or duplicate work');
 check(S.agentSessions.some(g=>g.id===old&&g.status==='handed-over'),'Previous Session remains in monitor history');
 save();const saved=JSON.parse(localStorage.getItem(STORE_KEY));check(saved.version===9&&saved.lifecycle.sessions.project===l.sessions.project,'Current lifecycle survives serialization');
 const lc=JSON.stringify(S.lifecycle);render();check(JSON.stringify(S.lifecycle)===lc,'Render does not spawn or change lifecycle state');
 check(document.documentElement.scrollWidth<=innerWidth,'Lifecycle menu does not overflow viewport');
 console.log('ONBOARDING_CHECKS '+JSON.stringify({width:innerWidth,passed:passed.length,checks:passed}));
 return {width:innerWidth,passed:passed.length,checks:passed};
}
