// Pure local fixture model. No provider, storage, scheduling or production guarantees.
function createPrototypeModel(state, nextId) {
  const copy=value=>JSON.parse(JSON.stringify(value));
  const terminal=status=>['completed','failed','cancelled'].includes(status);
  const requireItem=id=>{const item=state.workItems.find(x=>x.id===id);if(!item)throw new Error('WORK_ITEM_NOT_FOUND');return item;};
  const requireRun=id=>{const run=state.workflowRuns.find(x=>x.id===id);if(!run)throw new Error('RUN_NOT_FOUND');return run;};
  const requireSession=id=>{const session=state.agentSessions.find(x=>x.id===id);if(!session)throw new Error('SESSION_NOT_FOUND');return session;};
  const release=id=>state.releaseCatalog.find(x=>x.id===id)||null;
  function submit({title,owner,origin='chat',criteriaRevision='criteria-1',requestKey=''}) {
    if(requestKey){const old=state.workItems.find(x=>x.owner===owner&&x.requestKey===requestKey);if(old){if(old.title!==title)throw new Error('REQUEST_KEY_CONFLICT');return old;}}
    const item={id:nextId('request'),title,owner,origin,criteriaRevision,requestKey,status:'open',revision:1,resolution:null};
    state.workItems.unshift(item);return item;
  }
  function startRun(workItemId, input) {
    const item=requireItem(workItemId);if(item.status==='resolved')throw new Error('WORK_ITEM_ALREADY_RESOLVED');
    if(input.owner&&input.owner!==item.owner)throw new Error('RUN_OWNER_MISMATCH');
    if(input.occurrence){const old=state.workflowRuns.find(x=>x.occurrence===input.occurrence);if(old){if(old.workItemId!==item.id)throw new Error('OCCURRENCE_CONFLICT');return old;}}
    const run={...copy(input),id:nextId('run'),workItemId:item.id,owner:item.owner,outcome:null};
    state.workflowRuns.unshift(run);return run;
  }
  function assign(runId,sessionId,bundle) {
    const run=requireRun(runId),session=requireSession(sessionId);
    if(terminal(run.status))throw new Error('RUN_TERMINAL');
    if(session.status==='handed-over'||session.owner!==run.owner)throw new Error('SESSION_NOT_ELIGIBLE');
    if(state.assignments.some(a=>a.sessionId===sessionId&&!terminal(a.status)))throw new Error('SESSION_BUSY');
    const assignment={id:nextId('assignment'),runId,sessionId,owner:run.owner,role:bundle?.role||'worker',status:run.status,bundle:bundle?copy(bundle):null,configRevision:run.configRevision,criteriaRevision:run.criteriaRevision,outcome:null};
    state.assignments.unshift(assignment);session.status='busy';return assignment;
  }
  function syncRun(runId) {
    const run=requireRun(runId);
    if(terminal(run.status)&&!run.outcome)run.outcome={status:run.status,evidenceIds:[...run.evidence],remainingIssues:run.status==='completed'?[]:[run.reason||run.status]};
    for(const a of state.assignments.filter(x=>x.runId===runId)){
      if(!terminal(a.status))a.status=run.status;if(terminal(run.status)&&!a.outcome)a.outcome={...copy(run.outcome),source:'fixture-run-propagation'};
      const session=requireSession(a.sessionId);
      if(session.status!=='handed-over')session.status=state.assignments.some(x=>x.sessionId===session.id&&!terminal(x.status))?'busy':'idle';
    }
  }
  function recordAssignmentOutcome(assignmentId,outcome) {
    const a=state.assignments.find(x=>x.id===assignmentId);if(!a)throw new Error('ASSIGNMENT_NOT_FOUND');
    if(a.outcome)throw new Error('ASSIGNMENT_ALREADY_FINISHED');
    if(!terminal(outcome.status))throw new Error('ASSIGNMENT_TERMINAL_OUTCOME_REQUIRED');
    a.outcome=copy(outcome);a.status=outcome.status;
    const session=requireSession(a.sessionId);if(session.status!=='handed-over')session.status=state.assignments.some(x=>x.sessionId===session.id&&!terminal(x.status))?'busy':'idle';
    return a;
  }
  function finishRun(runId,status,evidenceIds=[]) {
    const run=requireRun(runId);if(terminal(run.status))throw new Error('RUN_TERMINAL');
    if(!terminal(status))throw new Error('INVALID_TERMINAL_STATE');
    if(evidenceIds.some(id=>!state.evidence.some(e=>e.id===id&&e.runId===runId)))throw new Error('RUN_EVIDENCE_MISMATCH');
    if(status==='completed'&&!evidenceIds.length)throw new Error('RUN_EVIDENCE_REQUIRED');
    run.evidence=[...new Set([...run.evidence,...evidenceIds])];run.status=status;syncRun(runId);return run;
  }
  function resolve(workItemId,report) {
    const item=requireItem(workItemId);
    if(item.status==='resolved')throw new Error('WORK_ITEM_ALREADY_RESOLVED');
    if(state.workflowRuns.some(r=>r.workItemId===item.id&&!terminal(r.status)))throw new Error('REQUEST_HAS_OPEN_RUNS');
    if(report.workItemId!==item.id||report.criteriaRevision!==item.criteriaRevision||report.verdict!=='passed'||!report.evidenceIds?.length)throw new Error('REQUEST_EVALUATION_REQUIRED');
    if(report.evidenceIds.some(id=>!state.evidence.some(e=>e.id===id&&e.scope==='work-item'&&e.workItemId===item.id&&e.criteriaRevision===item.criteriaRevision)))throw new Error('REQUEST_EVIDENCE_MISMATCH');
    item.status='resolved';item.revision++;item.resolution=copy(report);return item;
  }
  function registerRelease(version) {
    let record=state.releaseCatalog.find(x=>x.version===version);
    if(!record){record={id:nextId('release'),version,boot:'unknown',verification:'unknown'};state.releaseCatalog.push(record);}return record;
  }
  function selectActivation(version){const r=registerRelease(version);state.activationTargetRef=r.id;return r;}
  function activateTarget(){const r=release(state.activationTargetRef);if(!r)throw new Error('ACTIVATION_TARGET_REQUIRED');r.boot='passed';state.activeReleaseRef=r.id;return r;}
  function bootFailed(){const target=release(state.activationTargetRef);if(target)target.boot='failed';state.activeReleaseRef=null;}
  function markVerified(){const r=release(state.activeReleaseRef);if(!r)throw new Error('NO_ACTIVE_RELEASE');r.verification='passed';state.lastVerifiedReleaseRef=r.id;}
  function selectRecovery(operationId,releaseId,{boot,compatible}) {
    if(!operationId)throw new Error('RECOVERY_OPERATION_REQUIRED');
    state.recoverySelection=null;
    const r=release(releaseId);if(!r||!boot||!compatible)throw new Error('RECOVERY_NOT_COMPATIBLE');
    state.recoverySelection={operationId,releaseId,schemaRevision:state.dataSchemaRevision,boot:'passed',compatibility:'passed'};return state.recoverySelection;
  }
  function recover(operationId,{compatible}) {
    const selected=state.recoverySelection;
    if(!selected||selected.operationId!==operationId||selected.schemaRevision!==state.dataSchemaRevision||!compatible)throw new Error('RECOVERY_SELECTION_STALE');
    const r=release(selected.releaseId);if(!r)throw new Error('RECOVERY_RELEASE_MISSING');r.boot='passed';state.activeReleaseRef=r.id;return r;
  }
  function view(workItemId){const item=requireItem(workItemId);return {item,runs:state.workflowRuns.filter(r=>r.workItemId===item.id)};}
  function assignmentsForSession(sessionId){requireSession(sessionId);return state.assignments.filter(a=>a.sessionId===sessionId);}
  return {submit,startRun,assign,syncRun,recordAssignmentOutcome,finishRun,resolve,view,assignmentsForSession,selectActivation,activateTarget,bootFailed,markVerified,selectRecovery,recover,release};
}
if(typeof module!=='undefined'&&module.exports)module.exports={createPrototypeModel};
