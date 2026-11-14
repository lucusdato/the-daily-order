/* The Daily Order: Mystery format. One defining move, five tries, Wordle-style feedback.
   The map fills the screen. The order controls live in a dock at the top of the sheet; the brief scrolls below it.
   Pick a toy, tap a circle on the map, send the order. Wrong tries play out scene by scene and unlock a new intel report. */
PGD.mysQ = {};
PGD.mystery = function(n,m){ if(this.byN[n]) applyMystery(this.byN[n],m); else this.mysQ[n]=m; };
/* A mystery can use a tall board (m.H, e.g. 600) with its own terrain. Positions in the scenario and the
   mystery are written for a 400 square board and stretched vertically here, once. */
/* The tall board is for phones, where the screen is tall too. On a wide screen it would leave much of the table empty, so
   there the battle stays on the square board it was written for, with the scenario's own terrain: the map is about half
   as big again. ?board=tall brings the tall board back on a wide screen, for comparing. */
const WIDE_BOARD = !/[?&]board=tall\b/.test(location.search) && matchMedia('(min-width:900px) and (min-height:520px)').matches;
function applyMystery(sc,m){
  sc.m=m; if(!m.H || sc._tall) return; sc._tall=true;
  if(WIDE_BOARD){ const last=(m.scenes||[]).slice(-1)[0], K=sc.states.length-1;
    if(last&&last.u) sc.units.forEach(u=>{ if(last.u[u.id]) u.p[K]=last.u[u.id].slice(); });
    return; }
  const k=m.H/400, Y=y=>Math.round(y*k*10)/10;
  const pt=p=>p&&[p[0],Y(p[1])].concat(p.slice(2));
  const arr=a=>a.map(r=>{ const o=r.slice(); for(let i=1;i+1<o.length;i+=2){ o[i+1]=Y(o[i+1]); } return o; });
  const um=o=>{ const r={}; Object.keys(o||{}).forEach(id=>r[id]=pt(o[id])); return r; };
  sc.H=m.H; if(m.terrain) sc.terrain=m.terrain; if(m.over) sc.over=m.over; if(m.features) sc.features=m.features;
  sc.units.forEach(u=>{ Object.keys(u.p).forEach(i=>u.p[i]=pt(u.p[i])); });
  sc.states.forEach(s=>{ if(s.a) s.a=arr(s.a); });
  m.start=um(m.start);
  m.zones=m.zones.map(z=>[z[0],z[1],z[2],Y(z[3]),z[4]].concat(z.slice(5)));
  Object.values(m.fail||{}).forEach(f=>{ if(f.u) f.u=um(f.u); if(f.a) f.a=arr(f.a); });
  (m.steps||[]).forEach(s=>{ if(s.start) s.start=um(s.start); if(s.zones) s.zones=s.zones.map(z=>[z[0],z[1],z[2],Y(z[3]),z[4]].concat(z.slice(5)));
    Object.values(s.fail||{}).forEach(f=>{ if(f.u) f.u=um(f.u); if(f.a) f.a=arr(f.a); }); });
  (m.scenes||[]).forEach(s=>{ if(s.u) s.u=um(s.u); if(s.a) s.a=arr(s.a); });
  (m.ground||[]).forEach(g=>{ if(g[2]) g[2]=[g[2][0],Y(g[2][1]),g[2][2]]; });
  /* the board left after the reveal matches the last scene of the real battle */
  const last=(m.scenes||[]).slice(-1)[0], K=sc.states.length-1;
  if(last&&last.u) sc.units.forEach(u=>{ if(last.u[u.id]) u.p[K]=last.u[u.id].slice(); });
}
const MAXTRY = 5;
const MS = { sel:{u:null,z:null}, busy:false, dirty:false, newClue:-1, phase:'brief' };
const SQ = {g:'🟩',y:'🟨',w:'🟥'};
const mKey = () => D.steps ? 's'+D.n : D.preview ? 'p'+D.n : D.n;
/* Trial format (open with #steps-N): a battle played as a few decisions in a row. Each decision has its own short
   situation, two tries, and then the real battle plays on to the next one, so the story is told as you go.
   m.steps[i] overrides the puzzle fields of m (qs, sit, q, intel, toys, zones, ans, fbU, fbZ, fail) for that decision.
   hint: {u,z}, shown after a miss for whichever part was wrong.
   from: the scene whose positions the decision starts from (start: overrides on top). after: scenes to play once it is settled. */
const STRY = 2;
const mSt = () => (D.steps && D.sc && D.sc.m && D.sc.m.steps) || null;
const mSi = () => Math.min(mres().si||0, mSt().length-1);
function mP(i){
  const m=D.sc.m, S=mSt(); if(!S) return m;
  const s=S[i==null?mSi():i];
  return s._p || (s._p=Object.assign({},m,s,{start: s.from==null ? (s.start||m.start) : Object.assign({},m.scenes[s.from].u,s.start||{})}));
}
const sTries = (r,i) => r.tries.filter(t=>t.s===i).length;
const sHits = r => (r.sres||[]).filter(x=>x>0).length;
const SRANK = ['Cadet','Captain','General','Marshal of the board'];
/* the order as a phrase inside a sentence: "the cavalry into the chasing dragoons". A toy's third entry and a zone's sixth
   give the wording; without them the labels are used in lower case. */
function mSay(u,z){ const t=mP().toys.find(x=>x[0]===u)||[u,u], Z=mz(z); return `${t[2]||'the '+t[1].toLowerCase()} ${Z[5]||Z[1].charAt(0).toLowerCase()+Z[1].slice(1)}`; }
const strack = n => { if(!D.preview && window.track) track(n); };
function mres(){ const k=mKey(); RES[k]=RES[k]||{tries:[],done:false}; RES[k].tries=RES[k].tries||[]; return RES[k]; }
const mz = id => mP().zones.find(z=>z[0]===id);
const mToyLabel = u => (mP().toys.find(t=>t[0]===u)||[u,u])[1];
const mUnit = id => D.sc.units.find(u=>u.id===id);
function mSquares(t){ const a=(mSt()&&t.s!=null?mP(t.s):mP()).ans;
  const su = t.u===a.u?'g':'w';
  const sz = t.z===a.z?'g':'w';
  return [su,sz]; }
function mGrid(tries){ return tries.map(t=>mSquares(t).map(s=>SQ[s]).join('')).join('\n'); }
const mGeneral = () => (D.sc.m.general || D.sc.you);
function siteUrl(){ if(!/^https?:/.test(location.protocol)) return ''; return location.origin+location.pathname.replace(/index\.html$/,''); }
function mScoreTxt(r){ return r.won ? `${r.tries.length}/${MAXTRY}` : `X/${MAXTRY}`; }
const MRANK = ['','Marshal of the board','General','Colonel','Captain','Cadet'];
const refit = () => { if(window.sheetTo) sheetTo(SHEET.pos,false); };

/* ---------- board ---------- */
const startCur = extra => ({i:0,ph:0,alt:{u:Object.assign({},mP().start||{},extra||{})}});
function mBoardStart(anim){ MS.dirty=false; hideBanner(); display(startCur(),anim,[]); state.phase=0; drawZones(); }
/* The name of an order circle. On a phone it sits under the circle. On a wide screen the map shows only the numbers: the
   names are listed in the order panel, and a circle's own name appears beside it when it is picked or pointed at, on two
   lines if it is long. It stays by its own circle, on whichever side is clear, so it can never be read as a neighbour's. */
function mzLabel(lab,x,y,r){
  if(!WIDE_BOARD) return `<text class="mzl" x="${x}" y="${y+r+11}" text-anchor="middle">${lab}</text>`;
  const w=lab.split(' '), left=x>262, tx=left?x-r-6:x+r+6, anc=left?'end':'start';
  if(lab.length<=16 || w.length<2) return `<text class="mzl" data-zc="${x},${y},${r}" x="${tx}" y="${y+4}" text-anchor="${anc}">${lab}</text>`;
  let cut=1, best=1e9;
  for(let i=1;i<w.length;i++){ const d=Math.abs(w.slice(0,i).join(' ').length-w.slice(i).join(' ').length); if(d<best){ best=d; cut=i; } }
  return `<text class="mzl" data-zc="${x},${y},${r}" x="${tx}" y="${y-2}" text-anchor="${anc}"><tspan x="${tx}">${w.slice(0,cut).join(' ')}</tspan><tspan x="${tx}" dy="12">${w.slice(cut).join(' ')}</tspan></text>`;
}
/* the same choices as buttons in the order panel (wide screens) */
function zoneListHtml(){ return `<div class="dk-zl">${mP().zones.map(([id,lab],k)=>`<button type="button" class="zb${MS.sel.z===id?' on':''}" data-mz="${id}"><i>${k+1}</i><span>${lab}</span></button>`).join('')}</div>`; }
function drawZones(){
  const f=$('#field'); if(!f) return;
  const old=$('#mzones'); if(old) old.remove(); const oh=$('#mzhit'); if(oh) oh.remove();
  if(mres().done || SC.active) return;
  const g=document.createElementNS(NS,'g'); g.id='mzones';
  g.innerHTML=mP().zones.map(([id,lab,x,y,r],k)=>`<g class="mz${MS.sel.z===id?' sel':''}" data-z="${id}" role="button" aria-label="${lab}"><circle cx="${x}" cy="${y}" r="${r}"/><g transform="translate(${x} ${y-r})"><circle r="8.5"/><text y="3.4" text-anchor="middle">${k+1}</text></g>${mzLabel(lab,x,y,r)}</g>`).join('');
  /* the circles, numbers and names sit under the troops; an invisible copy of each circle on top keeps them easy to tap */
  g.setAttribute('pointer-events','none'); f.insertBefore(g,$('#units'));
  const old2=$('#mzhit'); if(old2) old2.remove();
  const h=document.createElementNS(NS,'g'); h.id='mzhit';
  h.innerHTML=mP().zones.map(([id,lab,x,y,r])=>`<circle data-z="${id}" cx="${x}" cy="${y}" r="${Math.max(r,18)}" fill="transparent" role="button" aria-label="${lab}" style="cursor:pointer"/>`).join('');
  f.insertBefore(h,$('#fx')); if(window.refitLabels) refitLabels();
  h.addEventListener('click',e=>{ const z=e.target.closest('[data-z]'); if(z){ e.stopPropagation(); mPickZone(z.dataset.z); } });
  const hov=(e,on)=>{ const z=e.target.closest&&e.target.closest('[data-z]'); if(z) g.querySelectorAll('.mz').forEach(m=>m.classList.toggle('hov',on&&m.dataset.z===z.dataset.z)); };
  h.addEventListener('mouseover',e=>hov(e,true)); h.addEventListener('mouseout',e=>hov(e,false));
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
  if(mSt()) strack('s-open');
  else if(!D.preview && window.track){ track('open-order'); if(!mres().first) track('o'+D.n+'-open'); }   /* per order: first play only */
  if(window.scStop) scStop();
  MS.sel={u:null,z:null}; MS.busy=false; MS.newClue=-1;
  const r=mres(), K=D.sc.states.length-1;
  MS.phase = r.done ? 'done' : r.tries.length ? 'play' : 'brief';
  if(r.done){ display({i:K,ph:K},false,[]); state.phase=K; }
  else mBoardStart(false);
  mRender();
  requestAnimationFrame(()=>{ if(window.sheetTo) sheetTo(MS.phase==='brief'?'full':MS.phase==='play'?'peek':'mid',false); });
}
function mRender(){
  const r=mres();
  document.body.classList.toggle('mbrief', MS.phase==='brief' && !r.done);
  if(!r.done) (mSt()?stepCard:mCardPlay)();
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
  location.hash='home';
}

/* ---------- the dock: always-visible order controls ---------- */
function pipsHtml(r){
  let h=''; for(let i=0;i<MAXTRY;i++){ const t=r.tries[i]; h+= t ? (([a,b])=>`<span class="pip2" data-pu="${a}" data-pz="${b}">${SQ[a]}${SQ[b]}</span>`)(mSquares(t)) : `<span class="pip2 empty"></span>`; }
  return `<span class="pips2" aria-label="${r.tries.length} of ${MAXTRY} tries used">${h}</span>`;
}
function commitLabel(){
  const {u,z}=MS.sel;
  if(u&&z) return `Send ${mToyLabel(u)} to ${mP().zones.findIndex(x=>x[0]===z)+1} ›`;
  if(u) return 'Now tap a circle on the map';
  if(z) return 'Now pick a toy';
  return 'Pick a toy, then a circle on the map';
}
const SQC={g:'Right',w:'Wrong'};
const mClean = t => String(t||'').replace(/^(Close|Right toy|Right place|Right toy, right place)\.\s*/,'');
/* intel is earned: the first clue is free, each miss unlocks one more; troop cards only open once a clue reveals them */
const mVis = () => { const m=D.sc.m, r=mres(); return r.done ? m.clues.length : Math.min(m.clues.length, 1+r.tries.length); };
const mCardOpen = id => { const m=D.sc.m, r=mres(); return !!id && (r.done || !!mSt() || m.clues.slice(0,mVis()).some(c=>c.card===id)); };
function mFailText(u,z){ const m=mP(), F=(m.fail&&(m.fail[u+'@'+z]||m.fail[z]))||{}; const [su,sz]=mSquares({u,z}); return F.b||(sz!=='g'?m.fbZ[z]:m.fbU[u]); }
function sqHtml(k){ return `<i class="sq2 s-${k}" aria-label="${SQC[k]}"></i>`; }
function renderDock(){
  if(SC.active) return;
  const d=$('#dock'); if(!d) return;
  const sc=D.sc, m=sc.m, r=mres();
  if(MS.phase==='brief' && !r.done){ d.hidden=true; d.innerHTML=''; refit(); return; }
  d.hidden=false;
  if(mSt()){ stepDock(d,r); refit(); return; }
  if(!r.done && MS.phase==='clue'){
    const n=r.tries.length, last=r.tries[n-1], [su,sz]=mSquares(last), c=m.clues[MS.newClue];
    const mark=(k,lab,txt)=>`<p class="mk-${k}">${sqHtml(k)}<span><b>${lab} · ${k==='g'?'right':'wrong'}.</b> ${k==='g'?'':mClean(txt)}</span></p>`;
    d.className='dock dk-clue';
    d.innerHTML=`<div class="dk-row"><b class="dk-q dk-bad"><i aria-hidden="true">✕</i> Wrong move</b>${pipsHtml(r)}</div>
      <p class="dk-what">${mFailText(last.u,last.z)}</p>
      <div class="dk-fb">${mark(su,'Toy',m.fbU[last.u])}${mark(sz,'Place',m.fbZ[last.z])}</div>
      ${c&&MS.newClue>=0?`<div class="dk-new"><span class="msl">New intel unlocked${c.cat?` · ${METT.find(x=>x[0]===c.cat)[2]}`:''}</span>${c.card?`<button type="button" class="mcard" data-card="${c.card}">${toySvg(CARDBY[c.card],26)}<span><b>${CARDBY[c.card].name}</b><em>Troop card · tap to study</em></span></button>`:`<p><b>${c.t}.</b> ${c.b}</p>`}</div>`:''}
      <button type="button" class="commit mnext">Try again · round ${n+1} of ${MAXTRY} ›</button>`;
  } else if(!r.done){
    d.className='dock dk-play';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${m.qs||'Your order'}</b>${pipsHtml(r)}</div>
      <div class="dk-tray">${m.toys.map(([u,lab])=>{ const U=mUnit(u); return `<div class="toyw"><button type="button" class="toy${MS.sel.u===u?' sel':''}" data-mt="${u}"><span class="band ${U.s}"></span>${toySvg({t:sprOf(U),side:U.s},40)}<b>${lab}</b></button>${mCardOpen(m.cards[u])?`<button type="button" class="toyi" data-card="${m.cards[u]}" aria-label="${lab}: troop card">i</button>`:''}</div>`; }).join('')}</div>
      ${zoneListHtml()}
      <button type="button" class="commit"${MS.sel.u&&MS.sel.z?'':' disabled'}>${commitLabel()}</button>`;
  } else if(!r.seen){
    d.className='dock dk-res';
    d.className='dock dk-res '+(r.won?'won':'lost');
    d.innerHTML=`<div class="dk-row"><b class="dk-q ${r.won?'dk-good':'dk-bad'}"><i aria-hidden="true">${r.won?'✓':'✕'}</i> ${r.won?(r.tries.length===1?'First try!':`Solved in ${r.tries.length}`):'Out of orders'}</b>${pipsHtml(r)}</div>
      <p class="dk-what">${r.won?`Rank: ${MRANK[r.tries.length]}. You matched ${mGeneral()} in ${r.tries.length===1?'one try':r.tries.length+' tries'}.`:`${mGeneral()} out-thought you this time. Here is what really happened.`}</p>
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
  document.querySelectorAll('#dock [data-mz]').forEach(b=>b.classList.toggle('on',b.dataset.mz===MS.sel.z));
  const c=$('#dock .commit'); if(c){ c.disabled=!(MS.sel.u&&MS.sel.z); c.textContent=commitLabel(); }
}
function mPickToy(u){ if(MS.busy||mres().done||SC.active) return; MS.sel.u = MS.sel.u===u?null:u; mPreview(); mSyncSel(); }
function mPickZone(z){ if(MS.busy||mres().done||SC.active) return; MS.sel.z = MS.sel.z===z?null:z; mPreview(); mSyncSel(); if(window.sheetTo&&sheetOn()&&SHEET.pos!=='peek') sheetTo('peek'); }

/* ---------- the order: who you are, how you got here, METT-T, then the question ---------- */
const METT=[['m','M','Mission'],['e','E','Enemy'],['t','T','Terrain'],['tr','T','Troops'],['ti','T','Time']];
function intelHtml(c,i){
  const nw=i===MS.newClue?' new':'';
  if(c.card){ const C=CARDBY[c.card]; return `<button type="button" class="msub mcard${nw}" data-card="${c.card}">${toySvg(C,26)}<span><b>${C.name}</b><em>Troop card · tap to study</em></span></button>`; }
  return `<div class="msub${nw}"><span class="msl">Intel · ${c.t}</span><p>${c.b}</p></div>`;
}
function mettHtml(vis){
  const m=D.sc.m;
  return `<div class="mett">${METT.map(([k,L,label])=>`<section class="mrow mr-${k}"><span class="ml" aria-hidden="true">${L}</span><div class="mb">
      <div class="mtop"><h3 class="mk">${label}</h3><p>${m.mett[k]}</p></div>
      ${k==='t'?(m.ground||[]).map(([tag,tx,at],i)=>`<div class="msub"><span class="msl">${tag}</span><p>${tx}${at?` <button type="button" class="og" data-gi="${i}">Show on map</button>`:''}</p></div>`).join(''):''}
      ${m.clues.map((c,i)=>i<vis&&c.cat===k?intelHtml(c,i):'').join('')}</div></section>`).join('')}</div>`;
}
function mLead(){ const sc=D.sc, m=sc.m; return m.lead || firstSentences(sc.brief.situation,2)[0]; }
function mCardPlay(){
  state.cardMode='daily';
  const sc=D.sc, m=sc.m, r=mres(), vis=mVis();
  card.innerHTML=`<div class="card-in mys morder">
    <header class="ohead">
      <div class="kicker">${D.preview?'Preview':'Order #'+D.n} · ${sc.place} · ${sc.year}</div>
      <h2>${sc.name}</h2>
      <p class="who"><span class="sw ${sc.side}"></span>You are ${mGeneral()}</p>
    </header>
    <p class="lead">${mLead()}</p>
    <p class="sit">${m.sit}</p>
    ${mettHtml(vis)}
    <div class="theq"><span>Your order</span><p>${m.q}</p></div>
    ${MS.phase==='brief'?'<button type="button" class="commit mgo">View the map ›</button>':''}
  </div>`;
  if(MS.newClue<0) card.scrollTop=0;
}
function mGo(){ if(mSt()) strack('s-map'); else window.track&&track('to-map'); MS.phase='play'; mRender(); if(window.sheetTo) sheetTo('peek'); }

/* ---------- what a wrong order plays out as ----------
   m.fail['toy@zone'] is the specific outcome for that combination; m.fail[zone] is the fallback.
   Each can carry its own text (b). '$' stands for the toy you placed. */
function mFailList(u,z,out){
  const m=mP(), Z=mz(z), placed={[u]:[Z[2],Z[3]]}, sub=x=>x==='$'?u:x;
  const F=(m.fail&&(m.fail[u+'@'+z]||m.fail[z]))||{};
  return [{t:out?'Out of orders':'Wrong move',b:mFailText(u,z),verdict:'bad',cur:startCur(Object.assign({},F.u||{},placed)),a:F.a||[],
           fire:(F.fire||[]).map(f=>f.map(sub)),ko:[...new Set((F.ko||['$']).map(sub))].filter(Boolean),idle:(F.idle||[]).map(sub)}];
}
function mRevealList(){
  return D.sc.m.scenes.map(x=>({t:x.t,b:x.b,cur:{i:x.s,ph:x.s,alt:x.u?{u:x.u}:undefined},a:x.a||[],fire:x.fire||[],ko:x.ko||[],idle:x.idle||[]}));
}

/* ---------- sending the order ---------- */
function mCommit(){
  if(mSt()) return stepCommit();
  const r=mres(), m=D.sc.m, {u,z}=MS.sel; if(!u||!z||MS.busy||r.done) return;
  MS.busy=true; r.tries.push({u,z});
  if(!D.preview && window.markPlayed) markPlayed();
  const win = u===m.ans.u && z===m.ans.z, out = !win && r.tries.length>=MAXTRY;
  if(r.tries.length===1) window.track&&track('first-move');
  if((win||out) && window.track){ track(win?'won':'lost'); if(win) track('won-'+r.tries.length); if(!D.preview && !r.first) track('o'+D.n+(win?'-won':'-lost')); }
  if(win||out){ if(window.keepData) keepData(); r.done=true; r.won=win; if(!r.first) r.first={tries:r.tries.slice(),won:win,playedOn:ymd(gameNow())}; r.newCards=unlockCards([...new Set(Object.values(m.cards))]); }
  saveRes(RES);
  const Z=mz(z), placed={[u]:[Z[2],Z[3]]};
  const old=$('#mzones'); if(old) old.remove(); const oh=$('#mzhit'); if(oh) oh.remove();
  figs.forEach(f=>f.g.classList.remove('sel'));
  const list = win
    ? [{t:r.tries.length===1?'First try!':'Order carried out',b:`${mClean(m.fbU[u])} ${mClean(m.fbZ[z])}`,verdict:'good',cur:startCur(placed),fire:(m.win&&m.win.fire)||[]}]
    : mFailList(u,z,out);
  mVerdict(win, win?(r.tries.length===1?'First try!':'Order carried out'):(out?'Out of orders':'Wrong move'), win?`${r.tries.length===1?'Solved first time':`Solved in ${r.tries.length}`} · ${MRANK[r.tries.length]}`:(out?`${mGeneral()} wins this one`:`Round ${r.tries.length} of ${MAXTRY}`), Z);
  /* a miss: the stamp shows on its own first, then clears before the "what would have happened" scene plays */
  const play=()=>scenesPlay(list,{autoEnd:win?2400:1700,onEnd:()=>{
    MS.busy=false; MS.sel={u:null,z:null};
    const k=r.tries.length; MS.newClue = (win||out||k>=m.clues.length)?-1:k;
    MS.phase = r.done ? 'done' : 'clue';
    mVerdictOff();
    mRender();
    const c=MS.newClue>=0 && m.clues[MS.newClue];
    if(c && c.card) setTimeout(()=>showCard(c.card,'<p class="tc-new">New intel unlocked</p>'),380);
  }});
  if(win) play();
  else setTimeout(()=>{ mVerdictOff(); document.querySelectorAll('#fx .vcross').forEach(g=>g.remove()); play(); },1300);
}
/* the verdict: an unmissable stamp over the board the moment the order goes out */
function mVerdict(win,title,sub,Z){
  const w=$('.board-wrap'); if(!w) return;
  mVerdictOff();
  const v=document.createElement('div'); v.id='verdict'; v.className='verdict '+(win?'v-good':'v-bad'); v.setAttribute('role','status');
  v.innerHTML=`<span class="v-ico" aria-hidden="true">${win?'✓':'✕'}</span><span class="v-tx"><b>${title}</b>${sub?`<i>${sub}</i>`:''}</span>`;
  w.appendChild(v);
  w.classList.remove('v-shake','v-glow'); void w.offsetWidth; w.classList.add(win?'v-glow':'v-shake');
  buzz(win?3:0);
  if(win){ if(window.confetti) setTimeout(confetti,150); mBurst(Z[2],Z[3]); }
  else mCross(Z[2],Z[3]);
}
function mVerdictOff(){ const v=$('#verdict'); if(v) v.remove(); const w=$('.board-wrap'); if(w) w.classList.remove('v-shake','v-glow'); }
function mBurst(x,y){
  const fx=$('#fx'); if(!fx) return;
  const g=document.createElementNS(NS,'g'); g.setAttribute('class','vburst'); g.setAttribute('pointer-events','none');
  g.innerHTML=[0,1,2].map(k=>`<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${k===1?'#f4c430':'#3f8f3a'}" stroke-width="${4-k}"/>`).join('')+
    Array.from({length:10},(_,k)=>{ const a=k/10*Math.PI*2; return `<path d="M${x+Math.cos(a)*16} ${y+Math.sin(a)*16} L${x+Math.cos(a)*30} ${y+Math.sin(a)*30}" stroke="#f4c430" stroke-width="3" stroke-linecap="round"/>`; }).join('');
  fx.appendChild(g);
  const cs=g.querySelectorAll('circle'), ps=g.querySelectorAll('path');
  addTw({keep:true,dur:1500,step:p=>{ cs.forEach((c,k)=>{ const q=Math.max(0,Math.min(1,p*1.4-k*.15)); c.setAttribute('r',(10+q*58).toFixed(1)); c.style.opacity=(1-q).toFixed(2); });
    ps.forEach(e=>{ e.style.opacity=(p<.5?1:(1-p)*2).toFixed(2); e.setAttribute('transform',`translate(${x} ${y}) scale(${(1+p*1.2).toFixed(2)}) translate(${-x} ${-y})`); }); },end:()=>g.remove()});
}
function mCross(x,y){
  const fx=$('#fx'); if(!fx) return;
  const g=document.createElementNS(NS,'g'); g.setAttribute('class','vcross'); g.setAttribute('pointer-events','none');
  g.innerHTML=`<circle cx="${x}" cy="${y}" r="26" fill="rgba(195,49,29,.18)" stroke="#c3311d" stroke-width="3"/><path d="M${x-12} ${y-12} L${x+12} ${y+12} M${x+12} ${y-12} L${x-12} ${y+12}" stroke="#c3311d" stroke-width="5" stroke-linecap="round"/>`;
  fx.appendChild(g);
  addTw({keep:true,dur:1700,step:p=>{ g.style.opacity=(p<.7?1:(1-p)/.3).toFixed(2); },end:()=>g.remove()});
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
  const old=$('#mzones'); if(old) old.remove(); const oh=$('#mzhit'); if(oh) oh.remove(); hideBanner(); selectUnit(null);
  figs.forEach(f=>f.g.classList.remove('sel'));
  card.innerHTML=`<div class="card-in mys"><div class="kicker">${sc.name} · what really happened</div>
    <ol class="revl">${m.scenes.map((x,k)=>`<li data-rk="${k}"><b>${x.t}.</b> ${x.b}</li>`).join('')}</ol>
    <button type="button" class="dlink2 mdone">Skip to the debrief</button></div>`;
  card.scrollTop=0;
  display({i:0,ph:0},true,[]); state.phase=0;
  const list=mRevealList();
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
    <div class="sharebox"><span class="msl">Your result</span><pre>${mShare().replace(/&/g,'&amp;').replace(/</g,'&lt;')}</pre><button type="button" class="commit mshare">Share result</button></div>
    ${(!D.preview && D.n===todayN() && window.teaserHtml) ? teaserHtml(D.n) : ''}
    ${window.homeNudgeHtml ? homeNudgeHtml() : ''}
    <p class="now">${oHead}</p>
    ${m.deduce?`<div class="sec est"><h3>What the winning commander read</h3>${m.deduce.map(([f,d])=>`<div class="ded"><p class="df">${f}</p><p class="dd"><span>So</span>${d}</p></div>`).join('')}</div>`:''}
    ${cards.length?`<div class="sec"><h3>Troop cards from this battle</h3><div class="cgrid sm">${cards.filter(id=>CARDBY[id]).map(id=>{const C=CARDBY[id]; return `<button type="button" class="cmini ${C.side}" data-card="${id}">${nw.has(id)?'<i class="newb">New</i>':''}${toySvg(C,46)}<b>${C.name}</b></button>`;}).join('')}</div></div>`:''}
    ${pr.length?`<div class="sec"><h3>Principles in play</h3><div class="chips">${pr.map(p=>`<button type="button" class="chip-p" data-pr="${p.id}">${p.name}</button>`).join('')}</div></div>`:''}
    <details class="more sm"><summary>Want the full story?</summary><div class="more-in">${sec('How it came to this',sc.brief.situation)}${sec('Your forces',sc.brief.forces)}${sec('The enemy',sc.brief.enemy)}${sec('The ground',sc.brief.ground)}${oRest?sec('How it ended',oRest):''}${sec('Why it worked',db.why)}<div class="other"><h3>${sc.t.eyes}</h3><p>${db.them}</p></div></div></details>
    ${m.video?mVideoHtml(m.video):''}
    ${m.sources?`<details class="more sm srcs"><summary>Sources</summary><div class="more-in"><ul>${m.sources.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}${m.video?`<li><a href="https://www.youtube.com/watch?v=${m.video.id}" target="_blank" rel="noopener">Video: ${m.video.t} (${m.video.ch})</a></li>`:''}</ul></div></details>`:''}
    <div class="drow2"><a class="dlink2" href="#archive">Past orders</a><button type="button" class="dreplay mreplay">Play again</button></div>
    <p class="hint">${r.first&&(r.first.won!==r.won||r.first.tries.length!==r.tries.length)?'Your first attempt is the score that counts. ':''}${D.preview?'This was a preview. ':''}Next order in ${untilTomorrow()}.</p>
  </div>`;
  card.scrollTop=0;
}
/* the most watched video on the battle, for anyone who wants the whole story */
const mViews = v => v>=1e6 ? (v/1e6).toFixed(v>=1e7?0:1).replace(/\.0$/,'')+'M' : v>=1e3 ? Math.round(v/1e3)+'K' : String(v);
function mVideoHtml(v){
  return `<a class="mvid" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">
    <span class="mv-th"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()"><i aria-hidden="true">▶</i></span>
    <span class="mv-tx"><span class="msl">Go deeper · the most watched video on this battle</span><b>${v.t}</b><em>${v.ch} · ${mViews(v.v)} views on YouTube</em></span></a>`;
}
/* the share text: score and who you matched, one row per try (toy square, place square), streak, a dare and the link */
function mShare(){
  const sc=D.sc, r=mres(), F=r.first||r, s=streak(), g=mGeneral(), n=F.tries.length, url=siteUrl().replace(/\/$/,'');
  if(mSt()) return stepShare();
  const line = F.won ? `🎖️ ${n}/${MAXTRY} · ${n===1?`Matched ${g} on the first try`:`Matched ${g}`}` : `❌ X/${MAXTRY} · ${g} out-thought me`;
  return [`The Daily Order ${D.preview?'(preview)':'#'+D.n} · ${sc.name}, ${sc.year}`, line, '', mGrid(F.tries), '',
    ...(!D.preview&&s>1?[`🔥 ${s}-day streak`]:[]), `Think you're smarter than history's greatest generals?`, ...(url?[url]:[])].join('\n');
}
function mShareDo(btn){
  if(mSt()) strack('s-share'); else window.track&&track('share');
  const tx=mShare(), done=t=>{ btn.textContent=t; setTimeout(()=>{ btn.textContent='Share result'; },2400); };
  try{
    if(navigator.share && matchMedia('(pointer:coarse)').matches){ navigator.share({text:tx}).catch(()=>{}); return; }
    navigator.clipboard.writeText(tx).then(()=>done('Copied ✓'),()=>done('Could not copy'));
  }catch(err){ done('Could not copy'); }
}

/* ---------- trial format: the card, the dock, sending an order, the share text ---------- */
const SPIP = {1:['g','g'],2:['g','w'],0:['w','w']};   /* matched first time, on the second try, not at all */
function stepPips(r){
  const S=mSt(), sr=r.sres||[];
  return `<span class="pips2" aria-label="${sHits(r)} of ${S.length} decisions matched">${S.map((_,i)=>sr[i]==null?'<span class="pip2 empty"></span>':`<span class="pip2" data-pu="${SPIP[sr[i]][0]}" data-pz="${SPIP[sr[i]][1]}"></span>`).join('')}</span>`;
}
function stepCard(){
  state.cardMode='daily';
  const sc=D.sc, S=mSt(), i=mSi(), P=mP();
  card.innerHTML=`<div class="card-in mys morder">
    <header class="ohead">
      <div class="kicker">Order #${D.n} · ${S.length} decisions · ${sc.place} · ${sc.year}</div>
      <h2>${sc.name}</h2>
      <p class="who"><span class="sw ${sc.side}"></span>You are ${mGeneral()}</p>
    </header>
    ${i===0?`<p class="lead">${mLead()}</p>`:''}
    <p class="sit">${P.sit}</p>
    ${(P.intel||[]).map(([t,b])=>`<div class="msub sint"><span class="msl">Intel · ${t}</span><p>${b}</p></div>`).join('')}
    <div class="theq"><span>Decision ${i+1} of ${S.length}</span><p>${P.q}</p></div>
    ${MS.phase==='brief'?'<button type="button" class="commit mgo">View the map ›</button>':''}
  </div>`;
  card.scrollTop=0;
}
function stepDock(d,r){
  const S=mSt(), i=mSi(), P=mP();
  if(!r.done){
    d.className='dock dk-play';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${P.qs||'Your order'}</b>${stepPips(r)}</div>
      <div class="dk-tray">${P.toys.map(([u,lab])=>{ const U=mUnit(u); return `<div class="toyw"><button type="button" class="toy${MS.sel.u===u?' sel':''}" data-mt="${u}"><span class="band ${U.s}"></span>${toySvg({t:sprOf(U),side:U.s},40)}<b>${lab}</b></button>${P.cards[u]&&CARDBY[P.cards[u]]?`<button type="button" class="toyi" data-card="${P.cards[u]}" aria-label="${lab}: troop card">i</button>`:''}</div>`; }).join('')}</div>
      ${zoneListHtml()}
      <button type="button" class="commit"${MS.sel.u&&MS.sel.z?'':' disabled'}>${commitLabel()}</button>`;
  } else {
    const F=r.first||r, k=sHits(F);
    d.className='dock dk-done';
    d.innerHTML=`<div class="dk-row"><b class="dk-q">${k}/${S.length} · ${SRANK[k]}</b>${stepPips(F)}</div>
      <div class="dk-nav"><button type="button" class="dk-ghost mreveal">Watch again</button><button type="button" class="commit mshare">Share result</button></div>`;
  }
  d.scrollTop=0;
}
function stepCommit(){
  const r=mres(), m=D.sc.m, S=mSt(), i=mSi(), P=mP(i), {u,z}=MS.sel; if(!u||!z||MS.busy||r.done) return;
  MS.busy=true; r.tries.push({u,z,s:i});
  if(!D.preview && window.markPlayed) markPlayed();
  const n=sTries(r,i), win=u===P.ans.u&&z===P.ans.z, out=!win&&n>=STRY, last=i===S.length-1, g=mGeneral();
  const Z=mz(z), AZ=mz(P.ans.z), placed={[u]:[Z[2],Z[3]]};
  /* everything that reads the current decision is built here, before the save below moves on to the next one.
     The verdict stays on screen until the player taps: what was right or wrong and why, a hint if a try is left, one button on. */
  const [su,sz]=mSquares({u,z,s:i}), F=(P.fail&&(P.fail[u+'@'+z]||P.fail[z]))||{}, H=P.hint||{};
  const mark=(k,what,txt)=>`<p class="mk-${k}">${sqHtml(k)}<span><b>${k==='g'?'Right':'Wrong'} ${what}.</b> ${k==='g'?'':mClean(txt).replace(/^Not this toy\.\s*/,'')}</span></p>`;
  const hint=[su!=='g'&&H.u, sz!=='g'&&H.z].filter(Boolean).join(' '), said=mSay(u,z);   /* worded now: the dock is drawn after the save */
  const btn=t=>`<button type="button" class="commit cb-next">${t} ›</button>`;
  const dock = win
    ? {cls:'dock dk-scene dk-v dk-fbk won', html:()=>`<div class="dk-row"><b class="dk-q dk-good"><i aria-hidden="true">✓</i> ${n===1?'First try!':'Order carried out'}</b>${stepPips(r)}</div>
        <p class="cb-b">You sent ${said}. ${mClean(P.fbU[u])} ${mClean(P.fbZ[z])}</p>${btn('Watch what happens')}`}
    : {cls:'dock dk-clue dk-fbk', html:()=>`<div class="dk-row"><b class="dk-q dk-bad"><i aria-hidden="true">✕</i> Wrong move</b>${stepPips(r)}</div>
        <p class="dk-what">You sent ${said}.${F.b?' '+F.b:''}</p>
        <div class="dk-fb">${mark(su,'toy',P.fbU[u])}${mark(sz,'place',P.fbZ[z])}</div>
        ${!out&&hint?`<div class="dk-new"><span class="msl">Hint</span><p>${hint}</p></div>`:''}
        ${btn(out?`See what ${g} did`:'Try again · last try')}`, pos:'mid'};
  const head = win
    ? [{t:'',b:'',verdict:'good',cur:startCur(placed),fire:[],dock}]
    : mFailList(u,z,false).map(x=>Object.assign(x,{dock}));
  const real=mRevealList(), tail=(out?[{t:`What ${g} did`,b:`${g} sent ${mSay(P.ans.u,P.ans.z)}. ${mClean(P.fbU[P.ans.u])} ${mClean(P.fbZ[P.ans.z])}`,cur:startCur({[P.ans.u]:[AZ[2],AZ[3]]}),a:[],fire:[],ko:[],idle:[]}]:[]).concat((P.after||[]).map(k=>real[k]));
  if(win||out){
    r.sres=r.sres||[]; r.sres[i]=win?n:0; strack(`s-d${i+1}-${win?'hit':'miss'}`);
    if(last){ r.done=true; r.seen=true; r.won=sHits(r)*2>S.length; strack('s-done');
      if(!r.first) r.first={tries:r.tries.slice(),sres:r.sres.slice(),won:r.won,playedOn:ymd(gameNow())};
      r.newCards=unlockCards([...new Set(Object.values(m.cards))]); if(window.keepData) keepData(); }
    else r.si=i+1;
  }
  saveRes(RES);
  const old=$('#mzones'); if(old) old.remove(); const oh=$('#mzhit'); if(oh) oh.remove();
  figs.forEach(f=>f.g.classList.remove('sel'));
  mVerdict(win, win?(n===1?'First try!':'Order carried out'):'Wrong move', win?`You matched ${g}`:(out?`Here is what ${g} did`:'One try left'), Z);
  const next=()=>{ MS.busy=false; MS.sel={u:null,z:null}; mVerdictOff();
    if(r.done){ MS.phase='done'; mFinishReveal(); return; }
    MS.phase='play'; mBoardStart(true); mRender(); if(window.sheetTo&&sheetOn()) sheetTo('peek'); };
  const play=()=>scenesPlay(head,{hold:true,onEnd:()=>{
    mVerdictOff();
    if(!(win||out)){ MS.busy=false; MS.sel={u:null,z:null}; MS.phase='play'; mBoardStart(true); mRender(); if(window.sheetTo&&sheetOn()) sheetTo('peek'); return; }
    if(!tail.length) return next();
    scenesPlay(tail,{label:'What happened',endLabel:last?'Debrief':`Decision ${i+2}`,onEnd:next});
  }});
  if(win) play();
  else setTimeout(()=>{ mVerdictOff(); document.querySelectorAll('#fx .vcross').forEach(e=>e.remove()); play(); },1300);
}
function stepShare(){
  const sc=D.sc, r=mres(), F=r.first||r, S=mSt(), k=sHits(F), g=mGeneral(), url=siteUrl().replace(/\/$/,'');
  const E={1:'🟩',2:'🟨',0:'🟥'};
  return [`The Daily Order #${D.n} · ${sc.name}, ${sc.year}`, `${k===S.length?'🎖️':k?'⚔️':'❌'} Matched ${g} on ${k} of ${S.length} decisions`, '',
    (F.sres||[]).map(x=>E[x]).join(''), '', `Think you're smarter than history's greatest generals?`, ...(url?[url]:[])].join('\n');
}

/* ---------- events ---------- */
function mClick(e){
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return;
  const cb=e.target.closest('[data-card]'); if(cb){ showCard(cb.dataset.card); return; }
  const t=e.target.closest('[data-mt]'); if(t){ mPickToy(t.dataset.mt); return; }
  const zb=e.target.closest('[data-mz]'); if(zb){ mPickZone(zb.dataset.mz); return; }
  const og=e.target.closest('[data-gi]'); if(og){ const g=D.sc.m.ground[+og.dataset.gi]; if(window.sheetTo&&sheetOn()) sheetTo('peek'); setTimeout(()=>pulseAt(g[2][0],g[2][1],g[2][2],g[0]),250); return; }
  if(e.target.closest('.mgo')){ mGo(); return; }
  if(e.target.closest('.mnext')){ MS.phase='play'; mBoardStart(true); mRender(); if(window.sheetTo) sheetTo('peek'); return; }
  if(e.target.closest('.commit:not(.mreveal):not(.mshare)')){ mCommit(); return; }
  if(e.target.closest('.mreveal')){ mReveal(); return; }
  if(e.target.closest('.mskip')||e.target.closest('.mdone')){ mFinishReveal(); return; }
  const rk=e.target.closest('.revl li'); if(rk && SC.active){ SC.auto=false; scGo(+rk.dataset.rk); return; }
  if(e.target.closest('.mshare')){ mShareDo(e.target.closest('.mshare')); return; }
  if(e.target.closest('.mreplay')){ const r=mres(); r.tries=[]; r.done=false; r.won=false; r.seen=false; r.si=0; r.sres=[]; saveRes(RES); openMystery(); return; }
}
card.addEventListener('click',mClick);
$('#dock').addEventListener('click',e=>{ if(SC.active) return; mClick(e); });
/* tapping a toy on the board: candidates get picked, everything else shows its card */
function mUnitTap(id){
  if(state.mode!=='daily' || !D.sc || !D.sc.m) return false;
  const m=D.sc.m, r=mres();
  if(!r.done && !SC.active && mP().toys.some(t=>t[0]===id)){ mPickToy(id); return true; }
  if(m.cards[id] && mCardOpen(m.cards[id])){ showCard(m.cards[id]); return true; }
  const U=mUnit(id); if(U) mToast(r.done?U.name:`${U.name}. Its troop card unlocks with a clue.`);
  return true;
}
function mToast(t){ const e=$('#utag'); if(!e) return; e.textContent=t; e.hidden=false; e.classList.add('show'); clearTimeout(mToast.t); mToast.t=setTimeout(()=>{ e.hidden=true; e.classList.remove('show'); },2200); }
/* in the opening order, pulling the sheet down to the map starts the game */
function sheetUserMove(to){ if(document.body.classList.contains('mys') && MS.phase==='brief' && to!=='full' && D.sc && D.sc.m && !SC.active && !mres().done){ MS.phase='play'; mRender(); } }
/* leaving the mystery hides the dock */
addEventListener('hashchange',()=>{ if(!document.body.classList.contains('mys')){ const d=$('#dock'); if(d) d.hidden=true; } });
