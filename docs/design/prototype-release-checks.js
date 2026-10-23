// Browser-only fixture assertions. No Paseo calls. Run after prototype's script.
function checkReleasePrototype() {
  const passed=[];
  const check=(value,label)=>{if(!value)throw new Error(label);passed.push(label);};
  const click=action=>{const el=document.querySelector('[data-action="'+action+'"]');if(!el)throw new Error('Missing control '+action);el.click();};
  const start=(scope='ui',impact='none')=>{
    setScenario('operational');nav('releases');
    document.querySelector('[name=release-scope]').value=scope;
    document.querySelector('[name=release-impact]').value=impact;
    click('v1-release-create');return S.v1.releaseOperation;
  };
  let r=start();const oldRelease=activeReleaseVersion();
  check(r.path==='Fast path'&&!r.backupRequired,'UI selects Fast path without mandatory backup');
  click('v1-release-check');click('v1-release-start');
  check(r.state==='prepared'&&!S.v1.admissionPaused,'Unaffected Run skips global checkpoint');
  click('v1-release-reload');
  check(activeReleaseVersion()!==oldRelease&&r.state==='reloaded','Reload alone does not mark release passed');
  check(!r.backup.startsWith('backup-'),'UI update did not create mandatory full backup');
  click('v1-release-health');
  check(r.state==='retained'&&r.resume==='không cần','Required post-checks finish release without monitoring gate');
  const current=activeReleaseVersion();click('v1-release-health-fail');
  check(r.state==='needs-fix'&&activeReleaseVersion()===current&&S.plugin==='healthy','Late contained failure keeps current code for fix-forward');
  const serial=S.v1.releaseOperationSerial;click('v1-release-create');
  check(S.v1.releaseOperationSerial===serial,'Unrelated candidate activation waits during repair');
  click('v1-release-fix');
  check(r.state==='retained'&&activeReleaseVersion().endsWith('-fix'),'Related fix can complete with checks');

  r=start('runtime','project');const project=S.workflowRuns.find(a=>a.owner==='project'&&a.status==='running');
  const harness=S.workflowRuns.find(a=>a.owner==='harness'&&a.status==='running');
  check(r.path==='Deep path','Runtime change selects Deep path');
  check(document.querySelector('[name=release-scope]').value==='runtime'&&document.querySelector('[name=release-impact]').value==='project','Scenario controls retain the current candidate scope');
  click('v1-release-check');click('v1-release-start');click('v1-release-checkpoint');
  check(project.status==='paused'&&harness.status==='running','Only affected project work reaches checkpoint');
  check(v1AdmissionBlocked('project')&&!v1AdmissionBlocked('harness'),'Admission gates project without blocking harness');
  const step=project.step;stepWork(project);
  check(project.step===step,'Paused affected Run cannot advance');
  click('v1-release-reload');click('v1-release-health-fail');
  check(r.state==='needs-fix'&&harness.status==='running','Contained failure keeps unrelated work running');
  click('v1-release-boot-fail');
  check(S.plugin==='failed'&&S.route==='recovery'&&S.v1.admissionPaused,'Unbootable plugin uses external recovery surface');
  S.compatible=false;render();click('v1-release-restore');
  check(r.state==='recovery-failed'&&S.plugin==='failed','Incompatible schema blocks recovery');
  const migration=r.migration;S.compatible=true;render();click('v1-release-restore');
  check(r.state==='restored'&&S.plugin==='healthy'&&r.migration===migration,'Compatible recovery preserves current data metadata');
  check(project.status==='running'&&harness.status==='running','Reconcile restores original work states');

  r=start('schema','all');click('v1-release-check');click('v1-release-start');click('v1-release-checkpoint');click('v1-release-backup-fail');
  check(r.state==='blocked'&&activeReleaseVersion()===r.base&&!S.v1.admissionPaused,'Required backup failure prevents migration and clears pre-activation pause');
  r=start('ui','unknown');click('v1-release-check');click('v1-release-start');
  check(r.state==='deferred'&&activeReleaseVersion()===r.base,'Unknown impact defers activation');
  document.querySelector('[name=release-impact]').value='none';click('v1-release-recheck');click('v1-release-check');click('v1-release-start');
  check(r.state==='prepared','Reclassified impact can be checked and activated');
  S.config.active['actions:4']='deny';click('v1-release-reload');
  check(r.state==='blocked'&&activeReleaseVersion()===r.base,'Revoked authority blocks reload');

  r=start();click('v1-release-check');S.config.active['actions:4']='ask';click('v1-release-start');
  check(r.state==='awaiting-decision'&&activeReleaseVersion()===r.base,'Ask requires explicit activation decision');
  click('v1-release-start');click('v1-release-reload');click('v1-release-unknown-fail');
  check(S.v1.admissionPaused&&r.state==='needs-fix','Unclassified post-activation error pauses all admission');
  click('v1-release-fix');check(r.state==='needs-fix','Fix-forward also respects ask');
  S.config.active['actions:4']='deny';click('v1-release-fix');check(r.state==='needs-fix','Revoking repair authority keeps failed checks unresolved');

  r=start();click('v1-release-check');S.host=false;click('v1-release-start');
  check(r.state==='validated','Offline cannot activate');
  r=start();click('v1-release-check');activateFixtureVersion('external-change');click('v1-release-start');
  check(r.state==='blocked'&&activeReleaseVersion()==='external-change','Baseline drift cannot be overwritten');
  r=start();click('v1-release-check');click('v1-release-start');S.compatible=false;click('v1-release-reload');
  check(r.state==='blocked'&&activeReleaseVersion()===r.base,'Compatibility is revalidated before reload');

  setScenario('operational');newTeamCandidate();const i=S.improvements[0];
  click('improvement-pass');check(i.status==='retained','Catalog activation completes required fixture checks without fixed monitoring');
  const teamRevision=S.team.revision,release=activeReleaseVersion();click('improvement-regress');
  check(i.status==='needs-fix'&&S.team.revision===teamRevision&&activeReleaseVersion()===release,'Catalog regression requests fix-forward without implicit rollback');
  click('improvement-fix');check(i.status==='retained','Catalog repair can finish without an implicit rollback');

  const routes=['overview','releases','work-items','assignments','config','team','resources','schedules','analytics','improvements','history','recovery'];
  setScenario('operational');
  for(const route of routes){nav(route);check(document.querySelector('h1,h2')&&!document.body.innerText.includes('Không tìm thấy'),'Render '+route);check(document.documentElement.scrollWidth<=window.innerWidth+1,'No overflow '+route);}
  start('runtime','project');click('v1-release-check');click('v1-release-start');click('v1-release-checkpoint');
  check(document.documentElement.scrollWidth<=window.innerWidth+1,'No horizontal overflow on release detail');
  const result={status:'passed',assertions:passed.length,checks:passed,width:window.innerWidth};
  console.log('RELEASE_CHECKS',JSON.stringify(result));return result;
}
