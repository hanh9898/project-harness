// Browser-only interaction checks for separate domain identities. No Paseo calls.
function checkModelPrototype(){
 const checks=[],check=(v,name)=>{if(!v)throw new Error(name);checks.push(name);};
 const click=(action,key='')=>{const b=[...document.querySelectorAll('[data-action="'+action+'"]')].find(x=>(x.dataset.id||'')===key);if(!b)throw new Error('Missing '+action);b.click();};
 setScenario('fresh');S.permissions.write=true;S.permissions.test=true;
 nav('work-items');click('model-submit');
 const item=S.workItems[0];check(S.workflowRuns.length===0,'A request can be received without spawning a Run');
 check(S.route==='work-item/'+item.id,'Request detail has its own route');
 click('model-run',item.id);const a=S.workflowRuns[0],assignment=S.assignments[0],session=S.agentSessions.find(s=>s.id===assignment.sessionId);
 check(a.workItemId===item.id&&a.id!==item.id,'Run has separate identity and parent request');
 check(assignment.runId===a.id&&assignment.id!==session.id,'Assignment has separate identity and references Session');
 stepWork(a);stepWork(a);stepWork(a);render();
 check(a.status==='completed'&&assignment.status==='completed'&&session.status==='idle','Run completion updates Assignment and releases Session');
 check(item.status==='open','Completed Run does not automatically resolve its Work Item');
 check(assignment.outcome?.status==='completed','Completed Assignment keeps its own Outcome');
 nav('run/'+a.id);click('model-reuse',a.id);const b=S.workflowRuns[0],next=S.assignments[0];
 check(b.id!==a.id&&b.workItemId===item.id,'One Work Item has multiple Runs');
 check(next.id!==assignment.id&&next.sessionId===session.id&&S.agentSessions.length===1,'One Session receives multiple sequential Assignments');
 check(assignment.outcome.status==='completed'&&next.outcome===null,'New assignment preserves old outcome and keeps a separate pending outcome');
 nav('work-item/'+item.id);click('model-resolve',item.id);check(item.status==='open','Request cannot resolve while a Run is still pending');
 stepWork(b);stepWork(b);stepWork(b);render();click('model-resolve',item.id);
 check(item.status==='resolved'&&item.resolution.verdict==='passed','Separate request evaluation resolves Work Item');
 check(S.evidence.some(e=>e.scope==='work-item'&&e.workItemId===item.id),'Request resolution links its own scoped evidence');
 nav('session/'+session.id);check(document.body.innerText.includes(assignment.id)&&document.body.innerText.includes(next.id),'Session detail retains all assignment history');
 nav('assignments');check(!document.body.innerText.includes('giới hạn fixture: danh sách còn gộp'),'Assignment screen no longer claims its rows are Sessions');
 setScenario('operational');nav('releases');click('v1-release-create');const op=S.v1.releaseOperation,baseline=S.activeReleaseRef;
 check(S.activationTargetRef===op.targetReleaseRef&&S.activeReleaseRef===baseline,'Selecting Activation Target leaves actual Active Release unchanged');
 click('v1-release-check');click('v1-release-start');click('v1-release-reload');
 check(S.activeReleaseRef===op.targetReleaseRef&&prototypeModel().release(S.activeReleaseRef).verification==='unknown','Loaded release is active before required checks pass');
 click('v1-release-boot-fail');check(S.activeReleaseRef===null&&S.activationTargetRef===op.targetReleaseRef,'Unbootable target is not active and stopped old runtime is not active');
 check(S.recoverySelection?.operationId===op.operationId&&S.recoverySelection.releaseId===baseline,'Recovery Release is selected and checked for this operation');
 const workIds=S.workItems.map(x=>x.id).join(),runIds=S.workflowRuns.map(x=>x.id).join(),assignmentIds=S.assignments.map(x=>x.id).join(),sessionIds=S.agentSessions.map(x=>x.id).join();
 click('v1-release-restore');check(S.activeReleaseRef===baseline&&S.activationTargetRef===op.targetReleaseRef,'Recovery restores actual release while preserving failed activation target');
 check(workIds===S.workItems.map(x=>x.id).join()&&runIds===S.workflowRuns.map(x=>x.id).join()&&assignmentIds===S.assignments.map(x=>x.id).join()&&sessionIds===S.agentSessions.map(x=>x.id).join(),'Recovery preserves separate request/Run/Assignment/Session identities');
 save();const stored=JSON.parse(localStorage.getItem(STORE_KEY));check(stored.version===9&&stored.workItems&&stored.workflowRuns&&stored.assignments&&stored.agentSessions&&!('activities' in stored)&&!('agents' in stored),'Serialized model has separate arrays without legacy aliases');
 for(const route of ['work-items','work-item/'+S.workItems[0].id,'run/'+S.workflowRuns[0].id,'assignments','session/'+S.agentSessions[0].id,'releases','recovery']){nav(route);check(document.documentElement.scrollWidth<=innerWidth+1,'No overflow '+route.split('/')[0]);}
 const result={passed:checks.length,width:innerWidth,checks};console.log('MODEL_CHECKS',JSON.stringify(result));return result;
}
