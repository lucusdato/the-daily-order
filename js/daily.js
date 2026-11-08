/* The Daily Order: the Daily Battle */
const PGD = { list:[], byN:{}, ready:false, quickQ:{},
  add(sc){ sc.phases=sc.states; this.list.push(sc); this.byN[sc.n]=sc; if(sc.quick) applyQuick(sc,sc.quick); },
  quick(n,q){ if(this.byN[n]) applyQuick(this.byN[n],q); else this.quickQ[n]=q; } };
function applyQuick(sc,q){
  sc.q=q;
  if(q.hook) sc.brief.hook=q.hook;
  if(q.name) sc.name=q.name;
}
const DSTART = new Date(2026,10,8);          // Daily #1 is Sunday 8 November 2026
const DKEY = 'pg-daily-v1';
const D = { sc:null, n:0, step:0 };          // step: 0 = brief, 1..k = decisions, k+1 = debrief

/* ---------- dates and storage ---------- */
const midnight = d => new Date(d.getFullYear(),d.getMonth(),d.getDate());
function todayN(){ return Math.round((midnight(new Date())-DSTART)/864e5)+1; }
function dateOfN(n){ const d=new Date(DSTART); d.setDate(d.getDate()+n-1); return d; }
const ymd = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmtDate = d => d.toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'});
function scFor(n){ if(PGD.byN[n]) return PGD.byN[n]; const L=PGD.list.slice().sort((a,b)=>a.n-b.n); return L.length?L[(n-1)%L.length]:null; }
function loadRes(){ try{ return JSON.parse(localStorage.getItem(DKEY)||'{}'); }catch(e){ return {}; } }
function saveRes(r){ try{ localStorage.setItem(DKEY,JSON.stringify(r)); }catch(e){} }
let RES = loadRes();
function resFor(n){ const r = RES[n] || (RES[n]={picks:[],done:false}); r.hints=r.hints||[]; return r; }
function streak(){
  let s=0, n=todayN();
  const ok=k=>{ const f=RES[k]&&RES[k].first, s=scFor(k); return f && f.playedOn===ymd(dateOfN(k)) && (!(s&&s.m) || f.won); };
  if(!ok(n)) n--;
  while(n>=1 && ok(n)){ s++; n--; }
  return s;
}
function untilTomorrow(){
  const now=new Date(), t=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1), m=Math.max(0,Math.round((t-now)/6e4));
  return `${Math.floor(m/60)}h ${m%60}m`;
}

/* ---------- scoring: 3 best, 2 best with a staff hint, 1 workable, 0 loses ---------- */
const maxScore = sc => sc.decisions.length*3;
const ptsOf = (sc,r,k) => { const p=r.picks[k]; if(p==null) return 0; const s=sc.decisions[k].opts[p].s; return s===3 && r.hints && r.hints[k] ? 2 : s; };
const scoreOf = (sc,r) => r.picks.reduce((t,p,k)=>t+ptsOf(sc,r,k),0);
const firstScore = (sc,r) => r.first ? scoreOf(sc,r.first) : null;
function rank(p){ return p>=1?'Marshal of the board':p>=.75?'General':p>=.5?'Colonel':p>=.25?'Captain':'Cadet'; }
const stars = s => ['☆☆☆','★☆☆','★★☆','★★★'][s];
const SQUARE = s => ['🟥','🟧','🟨','🟩'][s];
const STAMP = {3:['Brilliant','s3'],2:['Sharp, with help','s2'],1:['Costly','s1'],0:['Disaster','s0']};
const SCORE_LBL = {3:'Best move',2:'Best move, with a staff hint',1:'Workable, but costly',0:'This one loses the fight'};

/* ---------- quick-play helpers ---------- */
const Q = () => D.sc.q || {};
function optLabel(j,i){ const d=Q().d&&Q().d[j]; return (d&&d.o&&d.o[i]) || D.sc.decisions[j].opts[i].t; }
function optOrder(j){ // same shuffled order for everyone on a given day
  const n=D.sc.decisions[j].opts.length, r=rng(D.n*97+j*13+7);
  return Array.from({length:n},(_,i)=>[r(),i]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
}
const firstSentences = (t,k=2) => { const p=t.split(/(?<=[.!?])\s+(?=[A-Z"'])/); return [p.slice(0,k).join(' '), p.slice(k).join(' ')]; };
const safe = () => state.mode==='daily' && D.sc && !resFor(D.n).done;
function dailyUnit(u){
  if(!safe()) return {name:u.name, why:u.why};
  const un=Q().un||{}; return {name:un[u.id]||u.name, why:''};
}
function dailyFeat(f,k){
  if(!safe()) return {name:f.name, why:f.why};
  const fx=Q().fx&&Q().fx[k]; if(fx) return {name:fx[0], why:fx[1]};
  return {name:f.name, why:firstSentences(f.why,1)[0]};
}

/* ---------- loading scenario files ---------- */
function loadDaily(){
  const FILES=(typeof PGD_FILES!=='undefined')?PGD_FILES:[]; let left=FILES.length;
  const done=()=>{ Object.keys(PGD.quickQ).forEach(n=>{ if(PGD.byN[n]) applyQuick(PGD.byN[n],PGD.quickQ[n]); }); Object.keys(PGD.mysQ||{}).forEach(n=>{ if(PGD.byN[n]) applyMystery(PGD.byN[n],PGD.mysQ[n]); }); PGD.ready=true;
    if(window.renderDailySlot) renderDailySlot(); const h=location.hash.replace('#',''); if(/^daily|^archive|^cards/.test(h)) route(); };
  if(!left){ done(); return; }
  FILES.forEach(f=>{
    const s=document.createElement('script'); s.src='daily/'+f; s.async=false;
    s.onload=s.onerror=()=>{ if(--left===0) done(); };
    document.head.appendChild(s);
  });
}

/* ---------- home card ---------- */
function renderDailySlot(){
  const el=$('#dailySlot'); if(!el) return;
  if(!PGD.ready){ el.innerHTML=`<div class="dcard"><span class="dk">Today's order</span><p class="dmeta">Loading today's briefing…</p></div>`; return; }
  const n=todayN(), sc=scFor(n);
  if(!sc){ el.innerHTML=''; return; }
  const r=RES[n], st=streak(), d=dateOfN(n);
  const done=r&&r.first, mys=!!sc.m;
  const status = mys ? (done?`${r.first.won?'Solved':'Defeated'} ${r.first.won?r.first.tries.length:'X'}/5 · Next in ${untilTomorrow()}`:(r&&r.tries&&r.tries.length?'Continue ›':'Open today\'s order ›')) : null;
  const owned=CARDS.filter(c=>OWNED.has(c.id)).length;
  const prev=Object.values(PGD.byN).filter(s=>s.m&&s.n>n).sort((a,b)=>a.n-b.n);
  el.innerHTML=`<a class="dcard" href="#daily"><div class="dthumb">${thumb(sc,true)}</div><div class="dbody"><span class="dk">Order #${n} · ${fmtDate(d)}</span><h2>${sc.name}, ${sc.year}</h2><p>${sc.brief.hook}</p><p class="dmeta">${mys?`Mystery · one move · 5 tries · you are ${sc.you}`:`You command: ${sc.you} · ${sc.decisions.length} calls · about ${Math.max(3,sc.minutes-2)} min`}</p><div class="drow"><span class="dbtn">${mys?status:done?`Done: ${firstScore(sc,r)}/${maxScore(sc)} · Next in ${untilTomorrow()}`:(r&&r.picks.length?'Continue ›':'Open today\'s order ›')}</span><span class="dstreak">${st?`🔥 ${st} day streak`:'Start a streak'}</span></div></div></a>${prev.length?`<div class="mprev"><b>Preview the new format:</b> ${prev.map(s=>`<a href="#daily-${s.n}">${s.name}</a>`).join(' · ')}</div>`:''}<div class="dlinks"><a class="dlink" href="#archive">Past orders ›</a><a class="dlink" href="#cards">Troop cards ${owned}/${CARDS.length} ›</a></div>`;
}

/* ---------- archive ---------- */
function renderArchive(){
  const n=todayN();
  let h=`<div class="pb-head"><header class="bar"><button class="back" type="button" data-home>‹ Home</button><div class="bt"><div class="bt-name">Past orders</div><div class="bt-sub">Every daily battle so far. Your scores stay on this device.</div></div></header></div><div class="pb-inner">`;
  for(let k=n;k>=1;k--){
    const sc=scFor(k); if(!sc) continue;
    const r=RES[k], d=dateOfN(k);
    const sc_= sc.m ? (r&&r.first?`${r.first.won?r.first.tries.length:'X'}/5`:(r&&r.tries&&r.tries.length?'In progress':'Not played'))
      : r&&r.first?`${r.first.picks.map((p,j)=>SQUARE(ptsOf(sc,r.first,j))).join('')} ${firstScore(sc,r)}/${maxScore(sc)}`:(r&&r.picks&&r.picks.length?'In progress':'Not played');
    h+=`<a class="arow" href="#daily-${k}"><span class="an">#${k}</span><span class="at"><b>${sc.name}, ${sc.year}</b><br>${fmtDate(d)} · ${sc.place}</span><span class="as${r&&r.first?' done':''}">${sc_}</span></a>`;
  }
  h+=`</div>`;
  const el=$('#archive'); el.innerHTML=h; el.scrollTop=0;
}
$('#archive').addEventListener('click',e=>{ if(e.target.closest('[data-home]')) location.hash=''; });

/* ---------- routing ---------- */
function dailyRoute(h){
  if(h==='archive'){ if(!PGD.ready){ show('archive'); $('#archive').innerHTML='<p class="pb-intro" style="padding:20px">Loading…</p>'; return true; } show('archive'); renderArchive(); return true; }
  if(h==='cards'){ show('cards'); renderCards(); return true; }
  const m=/^daily(?:-(\d+))?$/.exec(h);
  if(!m) return false;
  if(!PGD.ready){ show('battle'); card.innerHTML='<div class="card-in"><p class="hint">Loading today\'s briefing…</p></div>'; return true; }
  let n=m[1]?+m[1]:todayN(), preview=false;
  if(n>todayN()){ const s=PGD.byN[n]; if(s&&s.m) preview=true; else n=todayN(); }
  if(n<1) n=todayN();
  openDaily(n,preview);
  return true;
}

/* ---------- daily flow ---------- */
function openDaily(n,preview=false){
  const sc=scFor(n); if(!sc) return; D.preview=preview;
  show('battle'); state.mode='daily'; document.body.classList.toggle('mys',!!sc.m);
  B=sc; D.sc=sc; D.n=n; tweens=[]; state.cur={i:-1}; state.curArrows=[]; state.pov=sc.side; state.lens=false; state.phase=0;
  $('#bName').textContent=sc.name;
  $('#bSub').innerHTML=`<span>Order #${n} · ${fmtDate(dateOfN(n))} · ${sc.year}</span> <span class="sw ${sc.side}"></span><span>${sc[sc.side].short}</span>`;
  $('#povG').textContent=sc.g.tab||sc.g.short; $('#povT').textContent=sc.t.tab||sc.t.short;
  buildBoard(sc); selectUnit(null); hideBanner();
  if(sc.m){ openMystery(); return; }
  $('#dock').hidden=true;
  const r=resFor(n), k=sc.decisions.length;
  D.step = r.done ? k+1 : Math.min(r.picks.length,k);
  dailyShow(false);
}
function boardIndexForStep(s,answered){
  const k=D.sc.decisions.length;
  if(s===0) return 0;
  if(s>k) return k;
  return answered ? s : s-1;
}
function dailyShow(animate){
  const sc=D.sc, k=sc.decisions.length, r=resFor(D.n), s=D.step;
  selectUnit(null); hideBanner();
  const answered = s>=1 && s<=k && r.picks[s-1]!=null;
  const bi=boardIndexForStep(s,answered);
  if(state.cur.i!==bi || state.cur.alt) display({i:bi,ph:bi},animate,(s===0||(!answered&&s<=k))?[]:sc.states[bi].a);
  state.phase=Math.max(0,bi);
  renderDailyCtrl(); renderTools(); renderLens();
  if(s===0) cardBrief();
  else if(s<=k) answered ? cardResult(s-1) : cardAsk(s-1,null);
  else cardDebrief();
}
function renderDailyCtrl(){
  const sc=D.sc, k=sc.decisions.length, r=resFor(D.n), s=D.step;
  const reach = j => j===0 || j<=r.picks.length+1 && (j<=k ? true : r.picks.length===k);
  let h=`<button type="button" class="dot map${s===0?' on':''}" data-k="0">Brief</button>`;
  for(let j=1;j<=k;j++){ const p=r.picks[j-1]; const lv=p!=null?ptsOf(sc,r,j-1):null;
    h+=`<button type="button" class="dot hascall${s===j?' on':''}${lv!=null?' lv'+lv:''}" data-k="${j}"${reach(j)?'':' disabled'} aria-label="Decision ${j}">${j}</button>`; }
  h+=`<button type="button" class="dot map${s===k+1?' on':''}" data-k="${k+1}"${reach(k+1)?'':' disabled'}>Result</button>`;
  $('#dots').innerHTML=h;
  $('#prev').disabled = s===0;
  const answered = s>=1 && s<=k && r.picks[s-1]!=null;
  $('#next').innerHTML = s===0 ? 'Decide ›' : s<=k ? (answered?(s<k?'Next ›':'Result ›'):'Choose ›') : 'Home ›';
  $('#next').disabled = false;
}
function dailyNext(){
  if(D.sc&&D.sc.m) return mNext();
  const k=D.sc.decisions.length, r=resFor(D.n);
  if(D.step===0){ D.step=1; dailyShow(true); return; }
  if(D.step<=k){ if(r.picks[D.step-1]==null){ showOptions(); return; }
    const pb=card.querySelector('.dplay'); if(pb){ pb.click(); return; } D.step++; dailyShow(true); return; }
  location.hash='';
}
function showOptions(){ // bring the answer buttons into view
  if(window.sheetTo && sheetOn()) sheetTo('full');
  const c=card.querySelector('.call'); if(c) setTimeout(()=>card.scrollTo({top:c.offsetTop-12,behavior:'smooth'}),60);
}
function dailyPrev(){ if(D.sc&&D.sc.m) return; if(D.step>0){ D.step--; dailyShow(true); } }
function dailyDot(j){
  if(D.sc&&D.sc.m) return;
  const k=D.sc.decisions.length, r=resFor(D.n);
  if(j>r.picks.length+1) return;
  if(j===k+1 && r.picks.length<k) return;
  D.step=j; dailyShow(true);
}

/* ---------- daily cards ---------- */
function glanceRows(){
  const sc=D.sc, g=Q().g; if(!g) return '';
  const L=[['You','g'],['Enemy','t'],['Ground','ground'],['To win','win']];
  return `<div class="glance">${g.map((t,i)=>`<div class="gl gl-${L[i][1]}"><span class="gk">${L[i][0]}</span><span class="gv">${t}</span></div>`).join('')}</div>`;
}
function cardBrief(){
  state.cardMode='daily';
  const sc=D.sc, b=sc.brief, side=sc[sc.side], quick=!!Q().g;
  const words=[b.situation,b.forces,b.enemy,b.ground,b.supply,b.intel,b.objective].join(' ').split(/\s+/).length;
  const full=`${sec('The situation',b.situation)}${sec('Your forces',b.forces)}${sec('The enemy',b.enemy)}${sec('The ground',b.ground)}${sec('Supply and time',b.supply)}${sec('What you know',b.intel)}${sec('Your objective',b.objective)}`;
  card.innerHTML=`<div class="card-in">
    <div class="kicker">Order #${D.n} · ${sc.place} · ${sc.year}</div>
    <h2>${sc.name}</h2>
    <p class="hook">${b.hook}</p>
    <div class="you"><span class="sw ${sc.side}"></span><div><b>You are ${sc.you}</b><br>${side.name}</div></div>
    ${quick?glanceRows():full}
    <button type="button" class="nextbig dgo">Make your first call ›</button>
    <p class="tip2">Tap any toy to see who it is. Turn on <b>Terrain</b> to scout the ground. <span class="ul">Dotted words</span> explain themselves.</p>
    ${quick?`<details class="more"><summary>The full history <span>${Math.max(1,Math.round(words/220))} min read</span></summary><div class="more-in">${full}</div></details>`:''}
    ${featList()}${roster()}
  </div>`;
  card.scrollTop=0;
}
function cardAsk(j,chosen){
  state.cardMode='daily';
  const sc=D.sc, d=sc.decisions[j], k=sc.decisions.length, r=resFor(D.n), qd=(Q().d||[])[j]||{};
  const hinted=!!r.hints[j], best=d.opts.findIndex(o=>o.s===3);
  let h=`<div class="card-in"><div class="kicker">Call ${j+1} of ${k} · ${d.when}</div><h2>${d.title}</h2>`;
  h+= qd.s ? `<p class="now">${qd.s}</p><details class="more sm"><summary>More context</summary><div class="more-in"><p>${d.ctx}</p></div></details>` : sec('The situation now',d.ctx);
  h+=`<div class="call ${sc.side}"><div class="ck">Your call</div><h3>${d.q}</h3><div class="opts">`;
  optOrder(j).forEach((i,pos)=>{ let cls='opt'; if(chosen!==null){ if(i===best) cls+=' right'; else if(i===chosen) cls+=' wrong'; else cls+=' dim'; }
    h+=`<button type="button" class="${cls}" data-dopt="${i}"${chosen!==null?' disabled':''}><span class="ol">${'ABC'[pos]||''}</span><span>${optLabel(j,i)}</span></button>`; });
  h+=`</div>`;
  if(chosen===null){
    if(qd.h) h+= hinted ? `<div class="staff"><span class="sk">Your staff says</span>${qd.h}</div>` : `<button type="button" class="askstaff">Ask your staff for a hint <span>best move scores ★★ instead of ★★★</span></button>`;
  } else {
    const o=d.opts[chosen], pts=ptsOf(sc,r,j), st=STAMP[pts];
    h+=`<div class="verdict"><div class="stamp ${st[1]}">${st[0]}</div><span class="pill s${pts}">${stars(pts)} ${SCORE_LBL[pts]}</span><p>${o.fb}</p></div>`;
    if(chosen!==best) h+=`<div class="fb"><b>Best move: ${optLabel(j,best)}.</b> ${d.opts[best].fb}</div>`;
    if(chosen!==best && o.alt) h+=`<p class="fb muted">The board is playing out your choice. This is informed speculation, not history.</p>`;
    h+=`<button type="button" class="play dplay">See what really happened ›</button>`;
  }
  h+=`</div></div>`;
  card.innerHTML=h; card.scrollTop=0;
}
function cardResult(j){
  state.cardMode='daily';
  const sc=D.sc, d=sc.decisions[j], k=sc.decisions.length, r=resFor(D.n), p=r.picks[j], pts=ptsOf(sc,r,j);
  const [head,rest]=firstSentences(d.result,2);
  card.innerHTML=`<div class="card-in"><div class="kicker">Call ${j+1} of ${k} · what really happened</div><h2>${d.title}</h2>
    <div class="recap ${pts>=2?'ok':'no'}"><span class="pill s${pts}">${stars(pts)} ${SCORE_LBL[pts]}</span><br><b>You chose:</b> ${optLabel(j,p)}.</div>
    <p class="now">${head}</p>
    ${d.why?`<p class="lesson"><b>Why it worked.</b> ${d.why}</p>`:''}
    ${(rest||d.tv)?`<details class="more sm"><summary>The full story</summary><div class="more-in">${rest?`<p>${rest}</p>`:''}${d.tv?`<div class="other"><h3>${sc.t.eyes}</h3><p>${d.tv}</p></div>`:''}</div></details>`:''}
    <button type="button" class="nextbig dgo">${j<k-1?`Next: call ${j+2} ›`:'See your score ›'}</button></div>`;
  card.scrollTop=0;
}
function cardDebrief(){
  state.cardMode='daily';
  const sc=D.sc, r=resFor(D.n), db=sc.debrief, max=maxScore(sc);
  const fresh=!r.done;
  if(!r.done){ r.done=true; if(!r.first) r.first={picks:r.picks.slice(),hints:r.hints.slice(),playedOn:ymd(new Date())}; saveRes(RES); }
  const tot=scoreOf(sc,r);
  const pr=(db.principles||[]).map(id=>PRINCIPLES.find(p=>p.id===id)).filter(Boolean);
  const [oHead,oRest]=firstSentences(db.outcome,2);
  card.innerHTML=`<div class="card-in"><div class="kicker">Debrief · Order #${D.n}</div>
    <div class="score"><div class="sbig">${tot}<span>/${max}</span></div><div><div class="rank">${rank(tot/max)}</div><div class="sq">${sc.decisions.map((d,k)=>`<span title="${d.title}">${SQUARE(ptsOf(sc,r,k))}</span>`).join('')}</div>${streak()?`<span class="dstreak">🔥 ${streak()} day streak</span>`:''}</div></div>
    ${db.title!==db.board.h?`<h2>${db.title}</h2>`:''}
    <p class="now">${oHead}</p>
    <aside class="boardroom"><div class="br-k">In the boardroom</div><h4>${db.board.h}</h4><p>${db.board.b}</p><p class="try"><b>Try this:</b> ${db.board.try}</p></aside>
    ${pr.length?`<div class="sec"><h3>Principles in play</h3><div class="chips">${pr.map(p=>`<button type="button" class="chip-p" data-pr="${p.id}">${p.name}</button>`).join('')}</div></div>`:''}
    <details class="more sm"><summary>The full story</summary><div class="more-in">${oRest?`<p>${oRest}</p>`:''}${sec('Why it worked',db.why)}<div class="other"><h3>${sc.t.eyes}</h3><p>${db.them}</p></div></div></details>
    <div class="sharebox"><pre id="shareTxt">${shareText()}</pre><button type="button" class="dshare">Copy and share</button></div>
    <div class="drow2"><a class="dlink2" href="#archive">Past orders</a><button type="button" class="dreplay">Replay</button></div>
    <p class="hint">${r.first&&scoreOf(sc,r.first)!==tot?`Your first attempt scored ${scoreOf(sc,r.first)}/${max}, and that is the score that counts. `:''}Next battle in ${untilTomorrow()}.</p>
  </div>`;
  card.scrollTop=0;
  if(fresh && tot===max) confetti();
}
function shareText(){
  const sc=D.sc, r=resFor(D.n), t=scoreOf(sc,r), m=maxScore(sc);
  return `The Daily Order #${D.n} · ${sc.name}\n${sc.decisions.map((d,k)=>SQUARE(ptsOf(sc,r,k))).join('')} ${t}/${m} · ${rank(t/m)}${streak()>1?`\n🔥 ${streak()} day streak`:''}`;
}

/* ---------- fun bits ---------- */
function confetti(){
  const box=document.createElement('div'); box.className='confetti'; box.setAttribute('aria-hidden','true');
  const r=rng(Date.now()%9973);
  for(let i=0;i<26;i++){
    const t=['inf','cav','spr','hvy','arch','cmd'][i%6], g=r()<.6, x=r()*100, d=1.6+r()*1.4, del=r()*.6, rot=(r()*720-360)|0, sz=22+r()*16;
    box.insertAdjacentHTML('beforeend',`<svg viewBox="-12 -28 24 32" style="left:${x}%;width:${sz}px;height:${sz*1.3}px;animation-duration:${d}s;animation-delay:${del}s;--rot:${rot}deg"><use href="#u-${t}" ${fillAttr({s:g?'g':'t'})}/></svg>`);
  }
  document.body.appendChild(box); setTimeout(()=>box.remove(),3800);
}
function buzz(p){ try{ if(navigator.vibrate) navigator.vibrate(p===3?[20,40,20]:p===0?[60]:[25]); }catch(e){} }

/* ---------- daily events ---------- */
card.addEventListener('click',e=>{
  if(state.mode!=='daily' || (D.sc&&D.sc.m)) return;
  const op=e.target.closest('[data-dopt]');
  if(op && !op.disabled){
    const j=D.step-1, i=+op.dataset.dopt, d=D.sc.decisions[j], o=d.opts[i], r=resFor(D.n);
    if(r.picks[j]==null){ r.picks[j]=i; saveRes(RES); }
    cardAsk(j,i); buzz(ptsOf(D.sc,r,j));
    if(o.s<3 && o.alt){ display({i:j,ph:j+1,alt:o.alt},true,o.alt.a||[]); showBanner('What if · informed speculation'); }
    renderDailyCtrl(); $('#next').innerHTML='Play it out ›';
    return;
  }
  if(e.target.closest('.askstaff')){ const r=resFor(D.n); r.hints[D.step-1]=true; saveRes(RES); cardAsk(D.step-1,null); return; }
  if(e.target.closest('.dplay')){
    const j=D.step-1; hideBanner();
    display({i:j+1,ph:j+1},true,D.sc.states[j+1].a);
    state.phase=j+1; renderDailyCtrl(); renderTools(); cardResult(j); return;
  }
  if(e.target.closest('.dgo')){ dailyNext(); return; }
  if(e.target.closest('.dshare')){
    const t=shareText(), btn=e.target.closest('.dshare');
    const ok=()=>{btn.textContent='Copied';}, no=()=>{btn.textContent='Select the text above to copy';};
    try{ if(navigator.share && matchMedia('(pointer:coarse)').matches) navigator.share({text:t}).catch(()=>{}); else navigator.clipboard.writeText(t).then(ok,no); }catch(err){ no(); }
    return;
  }
  if(e.target.closest('.dreplay')){
    const r=resFor(D.n); r.picks=[]; r.hints=[]; r.done=false; saveRes(RES);
    D.step=0; state.cur={i:-1}; dailyShow(false); return;
  }
});

loadDaily();
