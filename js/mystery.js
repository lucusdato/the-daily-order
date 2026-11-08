/* The Daily Order: Mystery format. One defining move, five tries, Wordle-style feedback.
   Pick a toy, pick a place on the board, commit. Wrong tries play out on the board and unlock a new clue. */
PGD.mysQ = {};
PGD.mystery = function(n,m){ if(this.byN[n]) this.byN[n].m=m; else this.mysQ[n]=m; };
const MAXTRY = 5;
const MS = { sel:{u:null,z:null}, busy:false, dirty:false, newClue:-1 };
const SQ = {g:'🟩',y:'🟨',w:'⬜'};
const mKey = () => D.preview ? 'p'+D.n : D.n;
function mres(){ const k=mKey(); RES[k]=RES[k]||{tries:[],done:false}; RES[k].tries=RES[k].tries||[]; return RES[k]; }
const mz = id => D.sc.m.zones.find(z=>z[0]===id);
const mToyLabel = u => (D.sc.m.toys.find(t=>t[0]===u)||[u,u])[1];
const mUnit = id => D.sc.units.find(u=>u.id===id);
function mSquares(t){ const m=D.sc.m, a=m.ans;
  const su = t.u===a.u?'g':(m.near.u||[]).includes(t.u)?'y':'w';
  const sz = t.z===a.z?'g':(m.near.z||[]).includes(t.z)?'y':'w';
  return [su,sz]; }
function mGrid(tries){ return tries.map(t=>mSquares(t).map(s=>SQ[s]).join('')).join('\n'); }
function mScoreTxt(r){ return r.won ? `${r.tries.length}/${MAXTRY}` : `X/${MAXTRY}`; }
const MRANK = ['','Marshal of the board','General','Colonel','Captain','Cadet'];

/* ---------- board ---------- */
const startCur = extra => ({i:0,ph:0,alt:{u:Object.assign({},D.sc.m.start||{},extra||{})}});
function mBoardStart(anim){ MS.dirty=false; hideBanner(); display(startCur(),anim,[]); state.phase=0; drawZones(); }
function drawZones(){
  const f=$('#field'); if(!f) return;
  const old=$('#mzones'); if(old) old.remove();
  if(mres().done) return;
  const g=document.createElementNS(NS,'g'); g.id='mzones';
  g.innerHTML=D.sc.m.zones.map(([id,lab,x,y,r],k)=>`<g class="mz${MS.sel.z===id?' sel':''}" data-z="${id}" role="button" aria-label="${lab}"><circle cx="${x}" cy="${y}" r="${r}"/><g transform="translate(${x} ${y-r})"><circle r="8.5"/><text y="3.4" text-anchor="middle">${k+1}</text></g></g>`).join('');
  f.insertBefore(g,$('#fx'));
  g.addEventListener('click',e=>{ const z=e.target.closest('.mz'); if(z){ e.stopPropagation(); mPickZone(z.dataset.z); } });
}
function mPreview(){
  const {u,z}=MS.sel;
  if(u&&z){ const Z=mz(z); display(startCur({[u]:[Z[2],Z[3]]}),true,[]); }
  else display(startCur(),true,[]);
  figs.forEach(f=>f.g.classList.toggle('sel',f.u.id===u));
  drawZones();
}

/* ---------- open ---------- */
function openMystery(){
  if(window.scStop) scStop();
  MS.sel={u:null,z:null}; MS.busy=false; MS.newClue=-1;
  const r=mres(), K=D.sc.states.length-1;
  if(r.done){ display({i:K,ph:K},false,[]); state.phase=K; }
  else mBoardStart(false);
  mRender();
}
function mRender(){
  const r=mres();
  if(!r.done) mCardPlay();
  else if(!r.seen) mCardResult();
  else mCardDebrief();
  renderMCtrl();
}
function renderMCtrl(){
  const r=mres(), t=r.tries;
  let h=''; for(let i=0;i<MAXTRY;i++){ const s=t[i]?mSquares(t[i]):null; h+=`<span class="pip${s?(s[0]==='g'&&s[1]==='g'?' win':' miss'):''}">${s?s.map(x=>SQ[x]).join(''):i+1}</span>`; }
  $('#dots').innerHTML=`<div class="pips" aria-label="${t.length} of ${MAXTRY} tries used">${h}</div>`;
  $('#prev').disabled=true; $('#next').disabled=false;
  $('#next').innerHTML = SC.active ? (SC.i<SC.list.length-1?'Next ›':SC.endLabel+' ›') : !r.done ? (MS.sel.u&&MS.sel.z?'Place it ›':'Choose ›') : !r.seen ? 'Watch ›' : 'Home ›';
}
function mNext(){
  if(SC.active){ scNext(); return; }
  const r=mres();
  if(!r.done){ if(MS.sel.u&&MS.sel.z) mCommit(); else showOptions(); return; }
  if(!r.seen){ mReveal(); return; }
  location.hash='';
}

/* ---------- the brief: METT-T ---------- */
const METT=[['m','M','Mission'],['e','E','Enemy'],['t','T','Terrain and weather'],['tr','T','Troops available'],['ti','T','Time']];
function intelHtml(c,i){
  const nw=i===MS.newClue?' new':'';
  if(c.card){ const C=CARDBY[c.card]; return `<button type="button" class="intel ccard ${C.side}${nw}" data-card="${c.card}">${toySvg(C,34)}<span><b>${C.name}</b><em>Troop card · tap to study</em></span></button>`; }
  return `<div class="intel${nw}"><span class="it">Intel</span><b>${c.t}.</b> ${c.b}</div>`;
}
function mettHtml(vis){
  const m=D.sc.m, left=m.clues.length-vis;
  return `<div class="mett"><div class="mett-h"><b>Commander's estimate</b><button type="button" class="mett-q">What is this?</button></div>
    <p class="mett-x" hidden>Before deciding, US Army and Marine officers size up a situation with five mission variables, <b>METT-T</b>: Mission, Enemy, Terrain and weather, Troops available, Time. They read the ground with <b>OAKOC</b>: Observation, Avenues of approach, Key terrain, Obstacles, Cover and concealment. Your intel lands in the row it belongs to.</p>
    ${METT.map(([k,L,label])=>`<div class="mrow mr-${k}"><span class="ml">${L}</span><div class="mb"><b class="mk">${label}</b><p>${m.mett[k]}</p>
      ${k==='t'?(m.ground||[]).map(([tag,tx])=>`<p class="og"><span class="ogt">${tag}</span>${tx}</p>`).join(''):''}
      ${m.clues.map((c,i)=>i<vis&&c.cat===k?intelHtml(c,i):'').join('')}</div></div>`).join('')}
    ${left>0?`<div class="mlock"><b>?</b><span>${left} more intel ${left===1?'report unlocks':'reports unlock'} as you miss</span></div>`:''}
  </div>`;
}
function mCardPlay(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), misses=r.tries.length, vis=Math.min(m.clues.length,2+misses), left=MAXTRY-misses;
  const last=r.tries[misses-1];
  let fbHtml='';
  if(last){ const [su,sz]=mSquares(last);
    fbHtml=`<div class="mfb"><div class="mfb-h"><span class="sq">${SQ[su]}${SQ[sz]}</span><b>${mToyLabel(last.u)} → ${mz(last.z)[1]}</b></div><p>${su==='g'?'<b>Right toy.</b>':m.fbU[last.u]}</p><p>${sz==='g'?'<b>Right place.</b>':m.fbZ[last.z]}</p></div>`;
    if(misses>1) fbHtml+=`<details class="more sm"><summary>Earlier tries</summary><div class="more-in">${r.tries.slice(0,-1).map(t=>`<p><span class="sq">${mSquares(t).map(s=>SQ[s]).join('')}</span> ${mToyLabel(t.u)} → ${mz(t.z)[1]}</p>`).join('')}</div></details>`;
  }
  const b=sc.brief;
  card.innerHTML=`<div class="card-in mys">
    <div class="kicker">${D.preview?'Preview':'Order #'+D.n} · ${sc.place} · ${sc.year}</div>
    <h2>${sc.name}</h2>
    <div class="you"><span class="sw ${sc.side}"></span><div><b>You are ${sc.you}</b></div></div>
    <p class="sit">${m.sit}</p>
    ${mettHtml(vis)}
    <div class="call ${sc.side} mq">
      ${fbHtml}
      <div class="ck">Your order · ${left} ${left===1?'try':'tries'} left</div><h3>${m.q}</h3>
      <div class="mstep">1 · Pick a toy</div>
      <div class="tray">${m.toys.map(([u,lab])=>{ const U=mUnit(u); return `<div class="toyw"><button type="button" class="toy${MS.sel.u===u?' sel':''}" data-mt="${u}">${toySvg({t:sprOf(U),side:U.s},40)}<b>${lab}</b></button>${m.cards[u]?`<button type="button" class="toyi" data-card="${m.cards[u]}" aria-label="${lab} troop card">i</button>`:''}</div>`; }).join('')}</div>
      <div class="mstep">2 · Pick a place <span>or tap a circle on the board</span></div>
      <div class="zchips">${m.zones.map(([id,lab],k)=>`<button type="button" class="zc${MS.sel.z===id?' sel':''}" data-mz="${id}"><span>${k+1}</span>${lab}</button>`).join('')}</div>
      <button type="button" class="commit"${MS.sel.u&&MS.sel.z?'':' disabled'}>${MS.sel.u&&MS.sel.z?`Send ${mToyLabel(MS.sel.u)} to ${mz(MS.sel.z)[1].toLowerCase()} ›`:'Pick a toy and a place'}</button>
    </div>
    <p class="tip2">Tap any toy on the board for its troop card. <span class="ul">Dotted words</span> explain themselves.</p>
    <details class="more"><summary>The full history <span>optional</span></summary><div class="more-in">${sec('The situation',b.situation)}${sec('Your forces',b.forces)}${sec('The enemy',b.enemy)}${sec('The ground',b.ground)}${sec('What you know',b.intel)}</div></details>
  </div>`;
  if(MS.newClue<0) card.scrollTop=0;
}
function mSyncSel(){
  card.querySelectorAll('[data-mt]').forEach(b=>b.classList.toggle('sel',b.dataset.mt===MS.sel.u));
  card.querySelectorAll('[data-mz]').forEach(b=>b.classList.toggle('sel',b.dataset.mz===MS.sel.z));
  const c=card.querySelector('.commit'); const ok=MS.sel.u&&MS.sel.z;
  if(c){ c.disabled=!ok; c.textContent= ok?`Send ${mToyLabel(MS.sel.u)} to ${mz(MS.sel.z)[1].toLowerCase()} ›`:'Pick a toy and a place'; }
  renderMCtrl();
}
function mPickToy(u){ if(MS.busy||mres().done) return; MS.sel.u = MS.sel.u===u?null:u; mPreview(); mSyncSel(); }
function mPickZone(z){ if(MS.busy||mres().done) return; MS.sel.z = MS.sel.z===z?null:z; mPreview(); mSyncSel(); }

function mCommit(){
  const r=mres(), m=D.sc.m, {u,z}=MS.sel; if(!u||!z||MS.busy||r.done) return;
  MS.busy=true; r.tries.push({u,z});
  const win = u===m.ans.u && z===m.ans.z, out = !win && r.tries.length>=MAXTRY;
  if(win||out){ r.done=true; r.won=win; if(!r.first) r.first={tries:r.tries.slice(),won:win,playedOn:ymd(new Date())}; r.newCards=unlockCards([...new Set(Object.values(m.cards))]); }
  saveRes(RES);
  buzz(win?3:0);
  const t={u,z}, Z=mz(z), placed={[u]:[Z[2],Z[3]]}, lab=`${mToyLabel(u)} to ${Z[1].toLowerCase()}.`;
  const old=$('#mzones'); if(old) old.remove();
  figs.forEach(f=>f.g.classList.remove('sel'));
  let list;
  if(win){
    list=[{t:'Your order',b:lab,cur:startCur(placed)},
          {t:'Right call',b:`${m.fbU[u].replace(/^Right toy\.\s*/,'')} ${m.fbZ[z].replace(/^Right place\.\s*/,'')}`,cur:startCur(placed),fire:(m.win&&m.win.fire)||[]}];
  } else {
    const F=(m.fail&&m.fail[z])||{}, [su,sz]=mSquares(t), sub=x=>x==='$'?u:x;
    list=[{t:'Your order',b:lab,cur:startCur(placed)},
          {t:out?'Defeated':'What happens',b:sz!=='g'?m.fbZ[z]:m.fbU[u],cur:startCur(Object.assign({},F.u||{},placed)),a:F.a||[],
           fire:(F.fire||[]).map(f=>f.map(sub)),ko:[...new Set((F.ko||['$']).map(sub))],banner:'What if · informed speculation'}];
  }
  scenesPlay(list,{endLabel:win?'See your result':out?'See the answer':'Try again',onEnd:()=>{
    MS.busy=false; MS.sel={u:null,z:null};
    MS.newClue = (win||out)?-1:Math.min(m.clues.length-1,1+r.tries.length);
    mRender(); if(!r.done) drawZones();
    if(win && r.tries.length===1 && window.confetti) confetti();
    const c=card.querySelector('.mett .new'); if(c && !r.done) setTimeout(()=>card.scrollTo({top:Math.max(0,c.offsetTop-80),behavior:'smooth'}),80);
  }});
}

function mCardResult(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), A=m.ans;
  const stamp = r.won ? (r.tries.length===1?'First try!':`Solved in ${r.tries.length}`) : 'Defeated';
  card.innerHTML=`<div class="card-in mys"><div class="kicker">${sc.name} · ${sc.year}</div>
    <div class="mres ${r.won?'won':'lost'}"><div class="stamp ${r.won?'s3':'s0'}">${stamp}</div>
      <pre class="grid">${mGrid(r.tries)}</pre>
      <div class="rank">${r.won?MRANK[r.tries.length]:'Out of tries'}</div></div>
    <div class="lesson"><b>The winning move: ${mToyLabel(A.u)} → ${mz(A.z)[1]}.</b><br>${m.fbU[A.u].replace(/^Right toy\.\s*/,'')} ${m.fbZ[A.z].replace(/^Right place\.\s*/,'')}</div>
    <button type="button" class="nextbig mreveal">Watch the real battle ›</button>
    <button type="button" class="dlink2 mskip">Skip to the debrief</button>
  </div>`;
  card.scrollTop=0;
}

/* ---------- the real battle, play by play ---------- */
function mReveal(){
  const sc=D.sc, m=sc.m;
  const old=$('#mzones'); if(old) old.remove(); hideBanner(); selectUnit(null);
  figs.forEach(f=>f.g.classList.remove('sel'));
  card.innerHTML=`<div class="card-in mys"><div class="kicker">${sc.name} · what really happened</div><h2>Play by play</h2>
    <p class="tip2">Tap <b>Next</b> on the board to move scene by scene, or tap a scene below.</p>
    <ol class="revl">${m.scenes.map((x,k)=>`<li data-rk="${k}"><b>${x.t}.</b> ${x.b}</li>`).join('')}</ol>
    <button type="button" class="dlink2 mdone">Skip to the debrief</button></div>`;
  card.scrollTop=0;
  display({i:0,ph:0},true,[]); state.phase=0;
  const list=m.scenes.map(x=>({t:x.t,b:x.b,cur:{i:x.s,ph:x.s,alt:x.u?{u:x.u}:undefined},a:x.a||[],fire:x.fire||[],ko:x.ko||[]}));
  setTimeout(()=>scenesPlay(list,{endLabel:'Debrief',onStep:k=>{
      card.querySelectorAll('.revl li').forEach(li=>{ const n=+li.dataset.rk; li.classList.toggle('on',n===k); li.classList.toggle('past',n<k); });
      const on=card.querySelector('.revl li.on'); if(on) card.scrollTo({top:Math.max(0,on.offsetTop-60),behavior:'smooth'});
      state.phase=list[k].cur.i; renderTools();
    },onEnd:mFinishReveal}),400);
}
function mFinishReveal(){
  if(SC.active) scStop();
  const r=mres(), K=D.sc.states.length-1; r.seen=true; saveRes(RES);
  display({i:K,ph:K},false,[]); state.phase=K;
  mRender();
}

function mCardDebrief(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), db=sc.debrief, F=r.first||r;
  const pr=(db.principles||[]).map(id=>PRINCIPLES.find(p=>p.id===id)).filter(Boolean);
  const [oHead,oRest]=firstSentences(db.outcome,2);
  const cards=[...new Set(Object.values(m.cards))], nw=new Set(r.newCards||[]);
  card.innerHTML=`<div class="card-in mys"><div class="kicker">Debrief · ${D.preview?'Preview':'Order #'+D.n}</div>
    <div class="score"><div class="sbig">${F.won?F.tries.length:'X'}<span>/${MAXTRY}</span></div><div><div class="rank">${F.won?MRANK[F.tries.length]:'Defeated'}</div><pre class="grid sm">${mGrid(F.tries)}</pre>${!D.preview&&streak()?`<span class="dstreak">🔥 ${streak()} day streak</span>`:''}</div></div>
    ${db.title!==db.board.h?`<h2>${db.title}</h2>`:''}
    <p class="now">${oHead}</p>
    ${m.deduce?`<div class="sec est"><h3>The commander's estimate</h3><p class="tip2">What the winning commander read from the situation.</p>${m.deduce.map(([f,d])=>`<div class="ded"><p class="df">${f}</p><p class="dd"><span>So</span>${d}</p></div>`).join('')}</div>`:''}
    <div class="sec"><h3>Troop cards from this battle</h3><div class="cgrid sm">${cards.map(id=>{const C=CARDBY[id]; return `<button type="button" class="cmini ${C.side}" data-card="${id}">${nw.has(id)?'<i class="newb">New</i>':''}${toySvg(C,46)}<b>${C.name}</b></button>`;}).join('')}</div></div>
    <aside class="boardroom"><div class="br-k">In the boardroom</div><h4>${db.board.h}</h4><p>${db.board.b}</p><p class="try"><b>Try this:</b> ${db.board.try}</p></aside>
    ${pr.length?`<div class="sec"><h3>Principles in play</h3><div class="chips">${pr.map(p=>`<button type="button" class="chip-p" data-pr="${p.id}">${p.name}</button>`).join('')}</div></div>`:''}
    <details class="more sm"><summary>The full story</summary><div class="more-in">${oRest?`<p>${oRest}</p>`:''}${sec('Why it worked',db.why)}<div class="other"><h3>${sc.t.eyes}</h3><p>${db.them}</p></div></div></details>
    <div class="sharebox"><pre id="shareTxt">${mShare()}</pre><button type="button" class="mshare">Copy and share</button></div>
    <div class="drow2"><button type="button" class="dlink2 mreveal">Watch the battle again</button><button type="button" class="dreplay mreplay">Play again</button></div>
    <p class="hint">${r.first&&(r.first.won!==r.won||r.first.tries.length!==r.tries.length)?`Your first attempt is the score that counts. `:''}${D.preview?'This was a preview. ':''}Next battle in ${untilTomorrow()}.</p>
  </div>`;
  card.scrollTop=0;
}
function mShare(){
  const r=mres(), F=r.first||r, s=streak();
  return `The Daily Order ${D.preview?'preview':'#'+D.n} · ${D.sc.name} ${mScoreTxt(F)}\n${mGrid(F.tries)}${!D.preview&&s>1?`\n🔥 ${s} day streak`:''}`;
}

/* ---------- events ---------- */
card.addEventListener('click',e=>{
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return;
  const cb=e.target.closest('[data-card]'); if(cb){ showCard(cb.dataset.card); return; }
  const t=e.target.closest('[data-mt]'); if(t){ mPickToy(t.dataset.mt); return; }
  const z=e.target.closest('[data-mz]'); if(z){ mPickZone(z.dataset.mz); return; }
  if(e.target.closest('.commit')){ mCommit(); return; }
  if(e.target.closest('.mreveal')){ mReveal(); return; }
  if(e.target.closest('.mskip')||e.target.closest('.mdone')){ mFinishReveal(); return; }
  const rk=e.target.closest('.revl li'); if(rk && SC.active){ SC.auto=false; scGo(+rk.dataset.rk); return; }
  if(e.target.closest('.mett-q')){ const x=card.querySelector('.mett-x'); if(x) x.hidden=!x.hidden; return; }
  if(e.target.closest('.mshare')){
    const tx=mShare(), btn=e.target.closest('.mshare');
    try{ if(navigator.share && matchMedia('(pointer:coarse)').matches) navigator.share({text:tx}).catch(()=>{}); else navigator.clipboard.writeText(tx).then(()=>{btn.textContent='Copied';},()=>{btn.textContent='Select the text above to copy';}); }catch(err){ btn.textContent='Select the text above to copy'; }
    return;
  }
  if(e.target.closest('.mreplay')){ const r=mres(); r.tries=[]; r.done=false; r.won=false; r.seen=false; saveRes(RES); openMystery(); return; }
});
/* tapping a toy on the board: candidates get picked, everything else shows its card */
function mUnitTap(id){
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return false;
  const m=D.sc.m, r=mres();
  if(!r.done && m.toys.some(t=>t[0]===id)){ mPickToy(id); return true; }
  if(m.cards[id]){ showCard(m.cards[id]); return true; }
  return false;
}
