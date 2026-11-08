/* The Daily Order: Mystery format. One defining move, five tries, Wordle-style feedback.
   The map fills the screen. The order controls live in a dock at the top of the sheet; the brief scrolls below it.
   Pick a toy, tap a circle on the map, send the order. Wrong tries play out scene by scene and unlock a new intel report. */
PGD.mysQ = {};
PGD.mystery = function(n,m){ if(this.byN[n]) applyMystery(this.byN[n],m); else this.mysQ[n]=m; };
/* A mystery can use a tall board (m.H, e.g. 600) with its own terrain. Positions in the scenario and the
   mystery are written for a 400 square board and stretched vertically here, once. */
function applyMystery(sc,m){
  sc.m=m; if(!m.H || sc._tall) return; sc._tall=true;
  const k=m.H/400, Y=y=>Math.round(y*k*10)/10;
  const pt=p=>p&&[p[0],Y(p[1])].concat(p.slice(2));
  const arr=a=>a.map(r=>{ const o=r.slice(); for(let i=1;i+1<o.length;i+=2){ o[i+1]=Y(o[i+1]); } return o; });
  const um=o=>{ const r={}; Object.keys(o||{}).forEach(id=>r[id]=pt(o[id])); return r; };
  sc.H=m.H; if(m.terrain) sc.terrain=m.terrain; if(m.over) sc.over=m.over; if(m.features) sc.features=m.features;
  sc.units.forEach(u=>{ Object.keys(u.p).forEach(i=>u.p[i]=pt(u.p[i])); });
  sc.states.forEach(s=>{ if(s.a) s.a=arr(s.a); });
  m.start=um(m.start);
  m.zones=m.zones.map(z=>[z[0],z[1],z[2],Y(z[3]),z[4]]);
  Object.values(m.fail||{}).forEach(f=>{ if(f.u) f.u=um(f.u); if(f.a) f.a=arr(f.a); });
  (m.scenes||[]).forEach(s=>{ if(s.u) s.u=um(s.u); if(s.a) s.a=arr(s.a); });
  (m.ground||[]).forEach(g=>{ if(g[2]) g[2]=[g[2][0],Y(g[2][1]),g[2][2]]; });
}
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
const refit = () => { if(window.sheetTo) sheetTo(SHEET.pos,false); };

/* ---------- board ---------- */
const startCur = extra => ({i:0,ph:0,alt:{u:Object.assign({},D.sc.m.start||{},extra||{})}});
function mBoardStart(anim){ MS.dirty=false; hideBanner(); display(startCur(),anim,[]); state.phase=0; drawZones(); }
function drawZones(){
  const f=$('#field'); if(!f) return;
  const old=$('#mzones'); if(old) old.remove();
  if(mres().done || SC.active) return;
  const g=document.createElementNS(NS,'g'); g.id='mzones';
  g.innerHTML=D.sc.m.zones.map(([id,lab,x,y,r],k)=>`<g class="mz${MS.sel.z===id?' sel':''}" data-z="${id}" role="button" aria-label="${lab}"><circle cx="${x}" cy="${y}" r="${r}"/><g transform="translate(${x} ${y-r})"><circle r="8.5"/><text y="3.4" text-anchor="middle">${k+1}</text></g><text class="mzl" x="${x}" y="${y+r+11}" text-anchor="middle">${lab}</text></g>`).join('');
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
/* point at a piece of ground named in the brief */
function pulseAt(x,y,r,label){
  const fx=$('#fx'); if(!fx) return;
  fx.querySelectorAll('.pulse').forEach(e=>e.remove());
  const g=document.createElementNS(NS,'g'); g.setAttribute('class','pulse');
  g.innerHTML=`<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(154,47,29,.12)" stroke="#9a2f1d" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#9a2f1d" stroke-width="1.2"/>${label?`<text class="lbl" x="${x}" y="${y-r-6}" text-anchor="middle" font-size="12">${label}</text>`:''}`;
  fx.appendChild(g);
  const rings=g.querySelectorAll('circle');
  addTw({keep:true,dur:2600,step:p=>{ const k=(p*3)%1; rings[1].setAttribute('r',(r+k*16).toFixed(1)); rings[1].style.opacity=(1-k).toFixed(2); g.style.opacity=p>.85?((1-p)/.15).toFixed(2):'1'; },end:()=>g.remove()});
}

/* ---------- open ---------- */
function openMystery(){
  if(window.scStop) scStop();
  MS.sel={u:null,z:null}; MS.busy=false; MS.newClue=-1;
  const r=mres(), K=D.sc.states.length-1;
  if(r.done){ display({i:K,ph:K},false,[]); state.phase=K; }
  else mBoardStart(false);
  mRender();
  requestAnimationFrame(()=>{ if(window.sheetTo) sheetTo(r.done?'mid':'mid',false); });
}
function mRender(){
  const r=mres();
  if(!r.done) mCardPlay();
  else if(!r.seen) mCardResult();
  else mCardDebrief();
  renderDock(); renderMCtrl();
}
function renderMCtrl(){
  const r=mres();
  $('#dots').innerHTML=''; $('#prev').disabled=true; $('#next').disabled=false;
  $('#next').innerHTML = SC.active ? 'Next ›' : !r.done ? 'Choose ›' : !r.seen ? 'Watch ›' : 'Home ›';
}
function mNext(){
  if(SC.active){ scNext(); return; }
  const r=mres();
  if(!r.done){ if(MS.sel.u&&MS.sel.z) mCommit(); return; }
  if(!r.seen){ mReveal(); return; }
  location.hash='';
}

/* ---------- the dock: always-visible order controls ---------- */
function pipsHtml(r){
  let h=''; for(let i=0;i<MAXTRY;i++){ const t=r.tries[i]; h+= t ? (([a,b])=>`<span class="pip2" data-pu="${a}" data-pz="${b}">${SQ[a]}${SQ[b]}</span>`)(mSquares(t)) : `<span class="pip2 empty"></span>`; }
  return `<span class="pips2" aria-label="${r.tries.length} of ${MAXTRY} tries used">${h}</span>`;
}
function commitLabel(){
  const {u,z}=MS.sel;
  if(u&&z) return `Order: ${mToyLabel(u)} → ${mz(z)[1]} ›`;
  if(u) return 'Now tap a circle on the map';
  if(z) return 'Now pick a toy';
  return 'Pick a toy, then a circle on the map';
}
function renderDock(){
  if(SC.active) return;
  const d=$('#dock'); if(!d) return;
  const sc=D.sc, m=sc.m, r=mres();
  d.hidden=false;
  if(!r.done){
    d.className='dock dk-play';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${m.qs||'Your order'}</b>${pipsHtml(r)}</div>
      <div class="dk-tray">${m.toys.map(([u,lab])=>{ const U=mUnit(u); return `<div class="toyw"><button type="button" class="toy${MS.sel.u===u?' sel':''}" data-mt="${u}">${toySvg({t:sprOf(U),side:U.s},40)}<b>${lab}</b></button>${m.cards[u]?`<button type="button" class="toyi" data-card="${m.cards[u]}" aria-label="${lab} troop card">i</button>`:''}</div>`; }).join('')}</div>
      <button type="button" class="commit"${MS.sel.u&&MS.sel.z?'':' disabled'}>${commitLabel()}</button>`;
  } else if(!r.seen){
    d.className='dock dk-res';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${r.won?(r.tries.length===1?'First try!':`Solved in ${r.tries.length}`):'Defeated'}</b>${pipsHtml(r)}</div>
      <button type="button" class="commit mreveal">Watch the real battle ›</button>`;
  } else {
    const F=r.first||r;
    d.className='dock dk-done';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${F.won?`${F.tries.length}/5 · ${MRANK[F.tries.length]}`:'X/5 · Defeated'}</b>${pipsHtml(F)}</div>
      <div class="dk-nav"><button type="button" class="dk-ghost mreveal">Watch again</button><button type="button" class="commit mshare">Share result</button></div>`;
  }
  refit();
}
function mSyncSel(){
  document.querySelectorAll('#dock [data-mt]').forEach(b=>b.classList.toggle('sel',b.dataset.mt===MS.sel.u));
  const c=$('#dock .commit'); if(c){ c.disabled=!(MS.sel.u&&MS.sel.z); c.textContent=commitLabel(); }
}
function mPickToy(u){ if(MS.busy||mres().done||SC.active) return; MS.sel.u = MS.sel.u===u?null:u; mPreview(); mSyncSel(); }
function mPickZone(z){ if(MS.busy||mres().done||SC.active) return; MS.sel.z = MS.sel.z===z?null:z; mPreview(); mSyncSel(); if(window.sheetTo&&sheetOn()&&SHEET.pos!=='peek') sheetTo('peek'); }

/* ---------- brief styles: three looks to compare ---------- */
const BSTYLES=[['dispatch','Dispatch'],['board','Plotting board'],['notebook','Field notebook']];
function bsGet(){ try{ const v=localStorage.getItem('pg-bs'); if(BSTYLES.some(b=>b[0]===v)) return v; }catch(e){} return 'dispatch'; }
function bsApply(v){ v=v||bsGet(); BSTYLES.forEach(([k])=>document.body.classList.toggle('bs-'+k,k===v)); if(D.sc) document.body.dataset.side=D.sc.side||'g'; }
function bsSwitch(){ const v=bsGet(); return `<div class="bsw" role="group" aria-label="Brief style"><span>Look</span>${BSTYLES.map(([k,l])=>`<button type="button" data-bs="${k}" aria-pressed="${k===v}">${l}</button>`).join('')}</div>`; }
bsApply();

/* ---------- the brief: METT-T, short ---------- */
const METT=[['m','M','Mission'],['e','E','Enemy'],['t','T','Terrain'],['tr','T','Troops'],['ti','T','Time']];
function intelHtml(c,i){
  const nw=i===MS.newClue?' new':'';
  if(c.card){ const C=CARDBY[c.card]; return `<button type="button" class="intel ccard ${C.side}${nw}" data-card="${c.card}">${toySvg(C,30)}<span><b>${C.name}</b><em>Troop card · tap to study</em></span></button>`; }
  return `<div class="intel${nw}"><span class="it">Intel</span><b>${c.t}.</b> ${c.b}</div>`;
}
function mettHtml(vis){
  const m=D.sc.m, left=m.clues.length-vis;
  return `<div class="mett">
    ${METT.map(([k,L,label])=>`<div class="mrow mr-${k}"><span class="ml">${L}</span><div class="mb"><p><b class="mk">${label}</b> ${m.mett[k]}</p>
      ${k==='t'?(m.ground||[]).map(([tag,tx,at],i)=>at?`<button type="button" class="og" data-gi="${i}"><span class="ogt">${tag}</span><span>${tx} <i>Show me</i></span></button>`:`<p class="og"><span class="ogt">${tag}</span>${tx}</p>`).join(''):''}
      ${m.clues.map((c,i)=>i<vis&&c.cat===k?intelHtml(c,i):'').join('')}</div></div>`).join('')}
    ${left>0?`<p class="mlock">${left} more intel ${left===1?'report unlocks':'reports unlock'} with each miss.</p>`:''}
    <button type="button" class="mett-q">Why METT-T?</button>
    <p class="mett-x" hidden>US Army and Marine officers size up every situation with five questions, <b>METT-T</b>: Mission, Enemy, Terrain and weather, Troops available, Time. They read the ground with <b>OAKOC</b>: Observation, Avenues of approach, Key terrain, Obstacles, Cover and concealment.</p>
  </div>`;
}
function mCardPlay(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), misses=r.tries.length, vis=Math.min(m.clues.length,2+misses);
  const last=r.tries[misses-1];
  let fbHtml='';
  if(last){ const [su,sz]=mSquares(last);
    fbHtml=`<div class="mfb"><div class="mfb-h"><span class="sq">${SQ[su]}${SQ[sz]}</span><b>Try ${misses}: ${mToyLabel(last.u)} → ${mz(last.z)[1]}</b></div><p>${su==='g'?'<b>Right toy.</b> ':m.fbU[last.u]+' '}${sz==='g'?'<b>Right place.</b>':m.fbZ[last.z]}</p></div>`;
  }
  const b=sc.brief; bsApply();
  card.innerHTML=`<div class="card-in mys">
    ${bsSwitch()}
    ${fbHtml}
    <div class="kicker">${D.preview?'Preview':'Order #'+D.n} · ${sc.place} · ${sc.year}</div>
    <h2>${sc.name}</h2>
    <p class="who"><span class="sw ${sc.side}"></span>You are ${sc.you}</p>
    <p class="sit">${m.sit}</p>
    <p class="theq"><span>Your order</span>${m.q}</p>
    ${mettHtml(vis)}
    <details class="more sm"><summary>Full history</summary><div class="more-in">${sec('The situation',b.situation)}${sec('Your forces',b.forces)}${sec('The enemy',b.enemy)}${sec('The ground',b.ground)}${sec('What you know',b.intel)}</div></details>
  </div>`;
  if(MS.newClue<0) card.scrollTop=0;
}

/* ---------- sending the order ---------- */
function mCommit(){
  const r=mres(), m=D.sc.m, {u,z}=MS.sel; if(!u||!z||MS.busy||r.done) return;
  MS.busy=true; r.tries.push({u,z});
  const win = u===m.ans.u && z===m.ans.z, out = !win && r.tries.length>=MAXTRY;
  if(win||out){ r.done=true; r.won=win; if(!r.first) r.first={tries:r.tries.slice(),won:win,playedOn:ymd(new Date())}; r.newCards=unlockCards([...new Set(Object.values(m.cards))]); }
  saveRes(RES);
  buzz(win?3:0);
  const t={u,z}, Z=mz(z), placed={[u]:[Z[2],Z[3]]}, lab=`${mToyLabel(u)} → ${Z[1]}.`;
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
           fire:(F.fire||[]).map(f=>f.map(sub)),ko:[...new Set((F.ko||['$']).map(sub))],banner:'What if'}];
  }
  scenesPlay(list,{endLabel:win?'See result':out?'See the answer':'Try again',onEnd:()=>{
    MS.busy=false; MS.sel={u:null,z:null};
    MS.newClue = (win||out)?-1:Math.min(m.clues.length-1,1+r.tries.length);
    if(!r.done) mBoardStart(true);
    mRender();
    if(win && r.tries.length===1 && window.confetti) confetti();
  }});
}

function mCardResult(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), A=m.ans;
  card.innerHTML=`<div class="card-in mys"><div class="kicker">${sc.name} · ${sc.year}</div>
    <div class="mres ${r.won?'won':'lost'}"><div class="stamp ${r.won?'s3':'s0'}">${r.won?(r.tries.length===1?'First try!':`Solved in ${r.tries.length}`):'Defeated'}</div>
      <pre class="grid">${mGrid(r.tries)}</pre><div class="rank">${r.won?MRANK[r.tries.length]:'Out of tries'}</div></div>
    <div class="lesson"><b>The winning order: ${mToyLabel(A.u)} → ${mz(A.z)[1]}.</b><br>${m.fbU[A.u].replace(/^Right toy\.\s*/,'')} ${m.fbZ[A.z].replace(/^Right place\.\s*/,'')}</div>
    <button type="button" class="dlink2 mskip">Skip to the debrief</button>
  </div>`;
  card.scrollTop=0;
}

/* ---------- the real battle, play by play ---------- */
function mReveal(){
  const sc=D.sc, m=sc.m;
  const old=$('#mzones'); if(old) old.remove(); hideBanner(); selectUnit(null);
  figs.forEach(f=>f.g.classList.remove('sel'));
  card.innerHTML=`<div class="card-in mys"><div class="kicker">${sc.name} · what really happened</div>
    <ol class="revl">${m.scenes.map((x,k)=>`<li data-rk="${k}"><b>${x.t}.</b> ${x.b}</li>`).join('')}</ol>
    <button type="button" class="dlink2 mdone">Skip to the debrief</button></div>`;
  card.scrollTop=0;
  display({i:0,ph:0},true,[]); state.phase=0;
  const list=m.scenes.map(x=>({t:x.t,b:x.b,cur:{i:x.s,ph:x.s,alt:x.u?{u:x.u}:undefined},a:x.a||[],fire:x.fire||[],ko:x.ko||[]}));
  setTimeout(()=>scenesPlay(list,{endLabel:'Debrief',onStep:k=>{
      card.querySelectorAll('.revl li').forEach(li=>{ const n=+li.dataset.rk; li.classList.toggle('on',n===k); li.classList.toggle('past',n<k); });
      state.phase=list[k].cur.i;
    },onEnd:mFinishReveal}),400);
}
function mFinishReveal(){
  if(SC.active) scStop();
  const r=mres(), K=D.sc.states.length-1; r.seen=true; saveRes(RES);
  display({i:K,ph:K},false,[]); state.phase=K;
  mRender();
  if(window.sheetTo && sheetOn()) sheetTo('mid');
}

function mCardDebrief(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), db=sc.debrief, F=r.first||r;
  const pr=(db.principles||[]).map(id=>PRINCIPLES.find(p=>p.id===id)).filter(Boolean);
  const [oHead,oRest]=firstSentences(db.outcome,2);
  const cards=[...new Set(Object.values(m.cards))], nw=new Set(r.newCards||[]);
  card.innerHTML=`<div class="card-in mys"><div class="kicker">Debrief · ${D.preview?'Preview':'Order #'+D.n}</div>
    <h2>${db.title}</h2>
    <p class="now">${oHead}</p>
    ${m.deduce?`<div class="sec est"><h3>What the winning commander read</h3>${m.deduce.map(([f,d])=>`<div class="ded"><p class="df">${f}</p><p class="dd"><span>So</span>${d}</p></div>`).join('')}</div>`:''}
    <aside class="boardroom"><div class="br-k">In the boardroom</div><h4>${db.board.h}</h4><p>${db.board.b}</p><p class="try"><b>Try this:</b> ${db.board.try}</p></aside>
    <div class="sec"><h3>Troop cards from this battle</h3><div class="cgrid sm">${cards.map(id=>{const C=CARDBY[id]; return `<button type="button" class="cmini ${C.side}" data-card="${id}">${nw.has(id)?'<i class="newb">New</i>':''}${toySvg(C,46)}<b>${C.name}</b></button>`;}).join('')}</div></div>
    ${pr.length?`<div class="sec"><h3>Principles in play</h3><div class="chips">${pr.map(p=>`<button type="button" class="chip-p" data-pr="${p.id}">${p.name}</button>`).join('')}</div></div>`:''}
    <details class="more sm"><summary>The full story</summary><div class="more-in">${oRest?`<p>${oRest}</p>`:''}${sec('Why it worked',db.why)}<div class="other"><h3>${sc.t.eyes}</h3><p>${db.them}</p></div></div></details>
    <div class="drow2"><a class="dlink2" href="#archive">Past orders</a><button type="button" class="dreplay mreplay">Play again</button></div>
    <p class="hint">${r.first&&(r.first.won!==r.won||r.first.tries.length!==r.tries.length)?'Your first attempt is the score that counts. ':''}${D.preview?'This was a preview. ':''}Next order in ${untilTomorrow()}.</p>
  </div>`;
  card.scrollTop=0;
}
function mShare(){
  const r=mres(), F=r.first||r, s=streak();
  return `The Daily Order ${D.preview?'preview':'#'+D.n} · ${D.sc.name} ${mScoreTxt(F)}\n${mGrid(F.tries)}${!D.preview&&s>1?`\n🔥 ${s} day streak`:''}`;
}

/* ---------- events ---------- */
function mClick(e){
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return;
  const bs=e.target.closest('[data-bs]'); if(bs){ try{localStorage.setItem('pg-bs',bs.dataset.bs);}catch(err){} bsApply(bs.dataset.bs); card.querySelectorAll('[data-bs]').forEach(x=>x.setAttribute('aria-pressed',x===bs)); return; }
  const cb=e.target.closest('[data-card]'); if(cb){ showCard(cb.dataset.card); return; }
  const t=e.target.closest('[data-mt]'); if(t){ mPickToy(t.dataset.mt); return; }
  const og=e.target.closest('[data-gi]'); if(og){ const g=D.sc.m.ground[+og.dataset.gi]; if(window.sheetTo&&sheetOn()) sheetTo('peek'); setTimeout(()=>pulseAt(g[2][0],g[2][1],g[2][2],g[0]),250); return; }
  if(e.target.closest('.commit:not(.mreveal):not(.mshare)')){ mCommit(); return; }
  if(e.target.closest('.mreveal')){ mReveal(); return; }
  if(e.target.closest('.mskip')||e.target.closest('.mdone')){ mFinishReveal(); return; }
  const rk=e.target.closest('.revl li'); if(rk && SC.active){ SC.auto=false; scGo(+rk.dataset.rk); return; }
  if(e.target.closest('.mett-q')){ const x=card.querySelector('.mett-x'); if(x) x.hidden=!x.hidden; return; }
  if(e.target.closest('.mshare')){
    const tx=mShare(), btn=e.target.closest('.mshare');
    try{ if(navigator.share && matchMedia('(pointer:coarse)').matches) navigator.share({text:tx}).catch(()=>{}); else navigator.clipboard.writeText(tx).then(()=>{btn.textContent='Copied';},()=>{btn.textContent='Could not copy';}); }catch(err){ btn.textContent='Could not copy'; }
    return;
  }
  if(e.target.closest('.mreplay')){ const r=mres(); r.tries=[]; r.done=false; r.won=false; r.seen=false; saveRes(RES); openMystery(); return; }
}
card.addEventListener('click',mClick);
$('#dock').addEventListener('click',e=>{ if(SC.active) return; mClick(e); });
/* tapping a toy on the board: candidates get picked, everything else shows its card */
function mUnitTap(id){
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return false;
  const m=D.sc.m, r=mres();
  if(!r.done && !SC.active && m.toys.some(t=>t[0]===id)){ mPickToy(id); return true; }
  if(m.cards[id]){ showCard(m.cards[id]); return true; }
  return false;
}
/* leaving the mystery hides the dock */
addEventListener('hashchange',()=>{ if(!document.body.classList.contains('mys')){ const d=$('#dock'); if(d) d.hidden=true; } });
