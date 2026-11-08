/* The Daily Order: play-by-play scenes. Each scene: toys move, then fire, then casualties fall.
   A caption on the board says what happened. Scenes wait for a tap; autoplay is optional.
   Scene: {t:title, b:blurb, cur:{i,ph,alt}, a:[arrows], fire:[[from,to,kind?]], ko:[ids], banner:'...'} */
const SC = { active:false, list:[], i:-1, tok:0, auto:false, busy:false, onEnd:null, onStep:null, endLabel:'Continue', timers:[] };
function scTimer(fn,ms){ const t=setTimeout(fn,ms); SC.timers.push(t); return t; }
function scClear(){ SC.timers.forEach(clearTimeout); SC.timers=[]; }

function scenesPlay(list,{onEnd,onStep,endLabel='Continue',auto=false}={}){
  scClear(); SC.list=list; SC.i=-1; SC.onEnd=onEnd; SC.onStep=onStep; SC.endLabel=endLabel; SC.active=true; SC.auto=auto;
  if(window.sheetTo && sheetOn() && SHEET.pos==='full') sheetTo('mid');
  scGo(0);
}
function scStop(){ SC.tok++; scClear(); SC.active=false; SC.busy=false; const c=$('#capbar'); if(c) c.hidden=true; }

function withKo(cur,ids,ko){
  const alt={u:Object.assign({},(cur.alt&&cur.alt.u)||{})};
  ids.forEach(id=>{ const u=B.units.find(x=>x.id===id); if(!u) return; const p=posFor(u,cur); alt.u[id]= ko ? [p[0],p[1],'ko'] : [p[0],p[1]]; });
  return Object.assign({},cur,{alt});
}
function scGo(i){
  scClear();
  const sc=SC.list[i]; if(!sc) return;
  SC.i=i; const tok=++SC.tok; SC.busy=true;
  // casualties: units that end this scene knocked over but are standing now
  const fallen=new Set(sc.ko||[]);
  figs.forEach(f=>{ if(tgt(f,sc.cur).st==='ko' && Math.abs(f.rot)<1) fallen.add(f.u.id); });
  const ids=[...fallen];
  const cur0=withKo(sc.cur,ids,false), curEnd=withKo(sc.cur,ids,true);
  let far=0; figs.forEach(f=>{ const t=tgt(f,cur0); far=Math.max(far,Math.hypot(t.x-f.x,t.y-f.y)); });
  hideBanner();
  display(cur0,true,sc.a||[]);
  renderCap(); if(SC.onStep) SC.onStep(i);
  const moveT = far<1 ? 150 : Math.min(2800, 420+far/18*250);
  scTimer(()=>{
    if(tok!==SC.tok) return;
    let t=0; (sc.fire||[]).forEach((f,k)=>{ const d=k*420; t=Math.max(t, d+fire(f[0],f[1],f[2],d)); });
    scTimer(()=>{
      if(tok!==SC.tok) return;
      if(ids.length) knockDown(ids);
      state.cur=curEnd;
      scTimer(()=>{ if(tok!==SC.tok) return; SC.busy=false; renderCap();
        if(SC.auto) scTimer(()=>{ if(tok===SC.tok && SC.auto) scNext(); },2200); }, ids.length?650:50);
    }, (sc.fire&&sc.fire.length) ? t+100 : 0);
  }, moveT);
}
function scNext(){ if(!SC.active) return; if(SC.i<SC.list.length-1) scGo(SC.i+1); else scFinish(); }
function scBack(){ if(SC.active && SC.i>0){ SC.auto=false; scGo(SC.i-1); } }
function scFinish(){ const fn=SC.onEnd; scStop(); hideBanner(); if(fn) fn(); }
function scToggleAuto(){ SC.auto=!SC.auto; renderCap(); if(SC.auto && !SC.busy) scNext(); }

function renderCap(){
  let c=$('#capbar');
  if(!c){ c=document.createElement('div'); c.id='capbar'; c.className='capbar'; c.setAttribute('aria-live','polite'); $('.board-wrap').appendChild(c);
    c.addEventListener('click',e=>{ e.stopPropagation();
      if(e.target.closest('.cb-back')) return scBack();
      if(e.target.closest('.cb-auto')) return scToggleAuto();
      scNext(); }); }
  const sc=SC.list[SC.i]; if(!sc){ c.hidden=true; return; }
  const last=SC.i===SC.list.length-1, n=SC.list.length;
  const ids=[...new Set((sc.fire||[]).flat().filter(x=>typeof x==='string'&&B.units.some(u=>u.id===x)))];
  const ys=ids.map(id=>{const p=posFor(B.units.find(u=>u.id===id),sc.cur); return p[1];});
  const avg=ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:300;
  c.classList.toggle('top',avg>215);
  c.hidden=false;
  c.innerHTML=`<div class="cb-top"><span class="cb-n">${n>1?`Scene ${SC.i+1} of ${n}`:''}${sc.banner?`${n>1?' · ':''}<i>${sc.banner}</i>`:''}</span>${n>2?`<button type="button" class="cb-auto" aria-label="${SC.auto?'Pause':'Autoplay'}">${SC.auto?'❚❚':'▶'} ${SC.auto?'Pause':'Auto'}</button>`:''}</div>
    <div class="cb-main"><div class="cb-txt"><b class="cb-t">${sc.t}</b><p class="cb-b">${sc.b}</p></div>
    <div class="cb-btns">${SC.i>0?'<button type="button" class="cb-back" aria-label="Previous scene">‹</button>':''}<button type="button" class="cb-next${SC.busy?' wait':''}">${last?SC.endLabel:'Next'} ›</button></div></div>`;
  if(window.renderMCtrl && state.mode==='daily' && D.sc && D.sc.m) renderMCtrl();
}
