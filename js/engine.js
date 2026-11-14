/* The Daily Order: engine */
const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = s => document.querySelector(s);
const BATTLES = PG.list;
const BMAP = Object.fromEntries(BATTLES.map(b=>[b.id,b]));
const PR_AT = {};
PRINCIPLES.forEach(p=>p.refs.forEach(([b,i])=>{(PR_AT[b+':'+i]=PR_AT[b+':'+i]||[]).push(p);}));
const teaches = b => [...new Set(PRINCIPLES.filter(p=>p.refs.some(r=>r[0]===b.id)).map(p=>p.name))].slice(0,3);
const TYPE = {inf:'Infantry',spr:'Infantry',hvy:'Heavy infantry',cav:'Cavalry',arch:'Ranged troops',art:'Artillery',arm:'Armor',ship:'Naval',gal:'Naval',para:'Airborne',cmd:'Commander',truck:'Supply',crate:'Logistics',stake:'Field defences',plane:'Aircraft'};
const OFF = {1:[[0,0]],2:[[-7,1],[7,-1]],3:[[-10,2],[0,-2],[10,2]]};
const fillAttr = u => TOON ? (u.s==='g' ? 'fill="#5fb84a" stroke="#1c1a17" stroke-width=".95" stroke-linejoin="round"' : 'fill="#e6b86c" stroke="#1c1a17" stroke-width=".95" stroke-linejoin="round"') : u.s==='g' ? 'fill="url(#pg)" stroke="#23420f" stroke-width=".7"' : 'fill="url(#pt)" stroke="#6e4f22" stroke-width=".7"';
const card = $('#card');
/* era-accurate toy shapes: the same unit type looks different in 480 BC, 1781, 1940 and 1991 */
function yearOf(b){ if(!b) return 1900; if(b._yr!=null) return b._yr; const y=String(b.year||''); const n=parseInt(y.replace(/[^0-9]/g,''),10)||1900; return b._yr=/BC/.test(y)?-n:n; }
function SPR(t,yr,name=''){
  const e = yr<500?'anc':yr<1640?'med':yr<1866?'blk':yr<1946?'ww':'mod', old=e==='anc'||e==='med';
  switch(t){
    case 'inf': return e==='anc'?'spr':e==='med'?'inf-med':e==='blk'?'inf-blk':e==='ww'?'inf':'inf-mod';
    case 'spr': return old?'spr':e==='blk'?'inf-blk':e==='ww'?'inf':'inf-mod';
    case 'arch': return old?'arch':e==='blk'?'inf-blk':'inf';
    case 'hvy': return old?'hvy':e==='blk'?'hvy-blk':e==='ww'?'inf':'inf-mod';
    case 'cav': return old?'cav':'cav-blk';
    case 'cmd': return old?'cmd-anc':e==='blk'?'cmd-blk':'cmd';
    case 'art': return /bunker/i.test(name)?'bunker':e==='anc'?'art-anc':(e==='ww'||e==='mod')?'art-ww':'art';
    case 'arm': return yr>=1960?'arm-mod':'arm';
    case 'ship': if(/carrier|akagi|kaga|soryu|hiryu|enterprise|yorktown|hornet/i.test(name)) return 'carrier'; return e==='anc'?'gal':e==='med'?'ship-med':e==='blk'?'ship':'ship-ww';
    case 'plane': if(/stuka|dive bomber/i.test(name)&&yr<1946&&yr>1935&&!/dauntless|american|us /i.test(name)) return 'stuka'; if(/bomber|heinkel|dornier|b-17|b-29/i.test(name)) return 'bomber'; return yr>=1955?'jet':'plane';
    case 'truck': return (e==='ww'||e==='mod')?'truck':'wagon';
    default: return t;
  }
}
const sprOf = u => SPR(u.t, yearOf(B), u.name);

const state = {phase:-1, cur:{i:-1}, curArrows:[], answered:{}, pending:null, pbFocus:null, pov:'g', fog:false, lens:false, cardMode:'', callChoice:null};
let B=null, figs=[], tfigs=[], tweens=[], raf=0, vb=[0,0,400,400];

/* ---------- easing and tween loop ---------- */
const easeOut = p => 1-Math.pow(1-p,3);
const easeInOut = p => p<.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
const easeBack = p => { const c=1.9; return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2); };
function kick(){ if(!raf) raf=requestAnimationFrame(loop); }
function loop(now){
  raf=0;
  for(const o of tweens.slice()){
    if(o.done || now<o.t0) continue;
    const p=Math.min(1,(now-o.t0)/o.dur);
    o.step(p);
    if(p>=1){ o.done=true; if(o.end) o.end(); }
  }
  tweens=tweens.filter(o=>!o.done);
  figs.forEach(draw); tfigs.forEach(draw);
  if(tweens.length) kick();
}
function addTw(o){ o.t0=performance.now()+(o.delay||0); tweens.push(o); kick(); return o; }
function later(ms,fn,keep=false){ return addTw({dur:1,delay:ms,keep,step(){},end:fn}); }
function tw(f,props,dur,delay,ease,end){
  return addTw({dur,delay,end,step:p=>{const e=(ease||easeOut)(p); for(const k in props){const v=props[k]; f[k]=v[0]+(v[1]-v[0])*e;}}});
}
function clearFigTweens(){ tweens=tweens.filter(o=>o.keep); document.querySelectorAll('#fx .hand').forEach(h=>{ if(!h.dataset.lifting) h.remove(); }); }

/* ---------- figures ---------- */
function makeFig(u,o,fi,ui,face,parent){
  const g=document.createElementNS(NS,'g');
  g.setAttribute('class','fig');
  const naval=u.t==='ship'||u.t==='gal';
  g.innerHTML=`<ellipse class="ring" rx="13" ry="4.6"/><ellipse class="sh" rx="${naval||u.t==='plane'?13:8.5}" ry="2.8"/><g class="lift"><g class="body"><g${naval?' class="bob"':''}><use href="#u-${sprOf(u)}" ${fillAttr(u)}/></g></g></g><circle class="hit" r="15" cy="-10"/>`;
  parent.appendChild(g);
  return {u,ui,fi,ox:o[0],oy:o[1],x:0,y:0,h:0,base:u.t==='plane'?15:0,rot:0,op:1,fv:1,sy:1,dir:0,face,g,lift:g.querySelector('.lift'),body:g.querySelector('.body'),sh:g.querySelector('.sh')};
}
function draw(f){
  const lift=f.h+f.base;
  f.g.setAttribute('transform',`translate(${(f.x+(f.jx||0)).toFixed(1)} ${f.y.toFixed(1)})`);
  f.lift.setAttribute('transform',`translate(0 ${(-lift).toFixed(1)})`);
  const fc=f.dir||f.face;
  f.body.setAttribute('transform',`scale(${fc} ${f.sy.toFixed(3)}) rotate(${f.rot.toFixed(1)})`);
  f.sh.setAttribute('transform',`scale(${Math.max(.35,1-lift/40).toFixed(3)})`);
  const o=f.op*f.fv;
  f.g.style.opacity=o.toFixed(3);
  f.g.style.pointerEvents=o<.05?'none':'';
}
function posAt(u,i){ for(let j=i;j>=0;j--){ if(u.p[j]) return u.p[j]; } return u.p[0]||[200,200]; }
function posFor(u,cur){ if(cur.alt && cur.alt.u && cur.alt.u[u.id]) return cur.alt.u[u.id]; return posAt(u,cur.i); }
function tgt(f,cur){ const p=posFor(f.u,cur); return {x:p[0]+f.ox, y:p[1]+f.oy, st:p[2]||''}; }
const stOp = st => (st==='off'||st==='exit') ? 0 : st==='hide' ? .42 : st==='ko' ? .78 : 1;
const stRot = (f,st) => st==='ko' ? (f.fi%2 ? 84 : -84) : 0;
function setDecoy(f,t){ f.g.classList.toggle('decoy', t.st==='decoy' && !(state.fog && state.pov!==f.u.s)); }
function sortFigs(cur){ const ug=$('#units'); if(!ug) return; figs.slice().sort((a,b)=>tgt(a,cur).y-tgt(b,cur).y).forEach(f=>ug.appendChild(f.g)); }

function hop(f,tx,ty,delay,end){
  const x0=f.x,y0=f.y,d=Math.hypot(tx-x0,ty-y0);
  if(d<.6){ f.x=tx; f.y=ty; if(end) later(delay,end); return 0; }
  const hops=Math.min(10,Math.max(1,Math.round(d/18)));
  const step=d/hops, per=Math.max(200,Math.min(300,step*11));
  const H=(f.base?3:6)+Math.min(10,step*.35);
  const dir=Math.abs(tx-x0)>2?Math.sign(tx-x0):0;
  addTw({dur:hops*per,delay,step:p=>{
    const t=p*hops, k=Math.min(hops-1,Math.floor(t)), u=t-k;
    const prog=(k+easeInOut(u))/hops;
    f.x=x0+(tx-x0)*prog; f.y=y0+(ty-y0)*prog;
    f.h=H*4*u*(1-u);
    f.sy=f.base?1:(u<.12?.86+u:(u>.9?1-(u-.9):1.04));
    f.dir=dir;
  },end:()=>{f.x=tx;f.y=ty;f.h=0;f.sy=1;f.dir=0; if(end) end();}});
  return hops*per;
}

/* ---------- effects: dust puffs and the toy hand ---------- */
function puff(x,y,s=1){
  const fx=$('#fx'); if(!fx||RM.matches) return;
  const g=document.createElementNS(NS,'g');
  let h=''; for(let k=0;k<7;k++){const a=k/7*Math.PI*2; h+=`<circle cx="${(Math.cos(a)*6).toFixed(1)}" cy="${(Math.sin(a)*2.6-4).toFixed(1)}" r="${(3.4+k%3).toFixed(1)}" fill="${k%2?'#eee5d2':'#cbbfa6'}"/>`;}
  g.innerHTML=h; g.style.opacity='0'; fx.appendChild(g);
  addTw({keep:true,dur:760,step:p=>{const e=easeOut(p); g.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(s*(.5+e*1.5)).toFixed(2)})`); g.style.opacity=(p<.15?p/.15:(1-p)/.85).toFixed(2);}, end:()=>g.remove()});
}
function makeHand(){ const fx=$('#fx'); const g=document.createElementNS(NS,'g'); g.setAttribute('class','hand'); g.innerHTML='<use href="#hand"/>'; g.style.opacity='0'; fx.appendChild(g); return g; }
function dropIn(f,endOp,delay){
  const hand = null; /* the hand graphic is retired: pieces just hop */
  f.op=0; f.h=70;
  addTw({dur:640,delay,step:p=>{
    const e=easeOut(p); f.h=70*(1-e); f.op=endOp*Math.min(1,p*4);
    if(hand){ hand.style.opacity=f.fv>.5?'1':'0'; hand.setAttribute('transform',`translate(${f.x.toFixed(1)} ${(f.y-f.h-f.base-14).toFixed(1)})`); }
  },end:()=>{
    f.h=0; f.op=endOp; if(f.fv>.5) puff(f.x,f.y,.55);
    if(hand){ hand.dataset.lifting='1'; const y0=f.y-f.base-14; addTw({keep:true,dur:460,step:p=>{const e=easeOut(p); hand.setAttribute('transform',`translate(${f.x.toFixed(1)} ${(y0-e*60).toFixed(1)})`); hand.style.opacity=(1-p).toFixed(2);},end:()=>hand.remove()}); }
  }});
}

/* ---------- fog of war ---------- */
function sightR(cur){ const ph=B.phases[cur.ph]; return 105*((ph&&ph.vis)||1); }
function eyesOf(cur){
  return B.units.filter(u=>u.s===state.pov).map(u=>posFor(u,cur)).filter(p=>p[2]!=='off'&&p[2]!=='exit');
}
function visMap(cur){
  const m=new Map();
  if(!state.fog||cur.i<0){ figs.forEach(f=>m.set(f,1)); return m; }
  const R=sightR(cur), eyes=eyesOf(cur);
  figs.forEach(f=>{
    if(f.u.s===state.pov){ m.set(f,1); return; }
    const t=tgt(f,cur), r=t.st==='hide'?R*.45:R;
    m.set(f, eyes.some(e=>Math.hypot(e[0]-t.x,e[1]-t.y)<r)?1:0);
  });
  return m;
}
function updateFog(cur){
  const L=$('#fogL'); if(!L) return;
  const on=state.fog && cur.i>=0;
  L.classList.toggle('on',on);
  if(!on) return;
  const R=sightR(cur);
  $('#fogHoles').innerHTML=eyesOf(cur).map(p=>`<circle r="${R.toFixed(0)}" cx="${p[0]}" cy="${p[1]}" fill="black"/>`).join('');
}
function refreshVis(){
  if(state.cur.i<0) return;
  const vis=visMap(state.cur);
  updateFog(state.cur);
  figs.forEach(f=>{ setDecoy(f,tgt(f,state.cur)); tw(f,{fv:[f.fv,vis.get(f)]},380,0); });
  drawArrows(state.curArrows);
}
const visibleArrows = arrs => (state.fog ? arrs.filter(a=>a[0][0]===state.pov) : arrs);

/* ---------- moving the board ---------- */
function snapTo(cur){
  clearFigTweens();
  const vis=visMap(cur);
  figs.forEach(f=>{const t=tgt(f,cur); f.x=t.x; f.y=t.y; f.h=0; f.sy=1; f.dir=0; f.rot=stRot(f,t.st); f.op=stOp(t.st); f.fv=vis.get(f); setDecoy(f,t); draw(f);});
  sortFigs(cur);
}
function moveTo(cur){
  if(RM.matches){ snapTo(cur); return 0; }
  clearFigTweens();
  const vis=visMap(cur); let maxT=0;
  figs.forEach(f=>{
    f.h=0; f.sy=1; f.dir=0;
    const t=tgt(f,cur), delay=f.ui*55+f.fi*80;
    const endOp=stOp(t.st), endRot=stRot(f,t.st), endFv=vis.get(f), hidden=f.op<.05;
    setDecoy(f,t);
    if(t.st==='off'){
      if(hidden){ f.x=t.x; f.y=t.y; f.fv=endFv; return; }
      tw(f,{op:[f.op,0]},260,delay,null,()=>{f.x=t.x; f.y=t.y;});
      return;
    }
    if(hidden){
      f.x=t.x; f.y=t.y; f.rot=endRot; f.fv=endFv;
      if(endOp===0) return;
      dropIn(f,endOp,delay+150); maxT=Math.max(maxT,delay+800);
      return;
    }
    const wasRot=f.rot;
    const d=hop(f,t.x,t.y,delay,()=>{
      tw(f,{rot:[f.rot,endRot],op:[f.op,endOp],fv:[f.fv,endFv]},440,0,endOp===0?easeOut:easeBack);
      if(endRot!==0 && Math.abs(wasRot)<1 && f.fi===0 && endFv>.5) puff(t.x,t.y,1);
    });
    maxT=Math.max(maxT,delay+d+440);
  });
  sortFigs(cur);
  kick();
  return maxT;
}
function drawArrows(arrs){
  const g=$('#arrows'); if(!g) return;
  let s='';
  visibleArrows(arrs||[]).forEach((a,k)=>{
    const side=a[0][0], dashed=a[0].length>1;
    const d = a.length===5 ? `M${a[1]} ${a[2]} L${a[3]} ${a[4]}` : `M${a[1]} ${a[2]} Q${a[3]} ${a[4]} ${a[5]} ${a[6]}`;
    const col = side==='g' ? '#21531a' : '#b5381f';
    s+=`<g class="arw" style="animation-delay:${(RM.matches?0:.35+k*.12).toFixed(2)}s"><path d="${d}" fill="none" stroke="#f6eedb" stroke-width="6.5" stroke-linecap="round" opacity=".5"/><path d="${d}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round"${dashed?' stroke-dasharray="6 5"':''} marker-end="url(#m${side})"/></g>`;
  });
  g.innerHTML=s;
}
function impacts(arrs){
  visibleArrows(arrs||[]).forEach((a,k)=>{ if(a[0].length>1) return; const x=a[a.length-2], y=a[a.length-1]; later(1100+k*170,()=>puff(x,y,.8)); });
}
function showPh(i){ $('#board').querySelectorAll('.ph').forEach(e=>e.classList.toggle('on',e.dataset.show.split(' ').includes(String(i)))); }

/* ---------- camera ---------- */
const WH = () => (B&&B.H)||400;
const FULL = () => [0,0,400,WH()];
function setVB(v){ vb=v; $('#board').setAttribute('viewBox', v.map(n=>n.toFixed(1)).join(' ')); }
function camTo(to,dur,delay){ let from=null; addTw({keep:true,cam:true,dur,delay,step:p=>{ if(!from) from=vb.slice(); const e=easeInOut(p); setVB(from.map((v,k)=>v+(to[k]-v)*e)); }}); }
function camera(arrs,hold){
  tweens=tweens.filter(o=>!o.cam);
  if(RM.matches||state.lens||WH()!==400||document.body.classList.contains('mys')){ tweens=tweens.filter(o=>!o.cam); setVB(FULL()); return; }
  const pts=[]; visibleArrows(arrs).forEach(a=>{ for(let k=1;k<a.length;k+=2) pts.push([a[k],a[k+1]]); });
  if(!pts.length){ camTo([0,0,400,400],600,0); return; }
  const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
  const x0=Math.min(...xs)-40, x1=Math.max(...xs)+40, y0=Math.min(...ys)-50, y1=Math.max(...ys)+34;
  const w=Math.max(x1-x0,y1-y0,210);
  if(w>320){ camTo([0,0,400,400],600,0); return; }
  const x=Math.min(Math.max((x0+x1)/2-w/2,0),400-w), y=Math.min(Math.max((y0+y1)/2-w/2,0),400-w);
  camTo([x,y,w,w],750,0);
  camTo([0,0,400,400],900,750+hold);
}

function display(cur,animate,arrs){
  state.cur=cur; state.curArrows=arrs||[];
  showPh(cur.ph);
  updateFog(cur);
  let maxT=0;
  if(animate) maxT=moveTo(cur); else snapTo(cur);
  drawArrows(state.curArrows);
  if(animate){ camera(state.curArrows,Math.min(3000,Math.max(700,maxT-650))); impacts(state.curArrows); }
  else { tweens=tweens.filter(o=>!o.cam); setVB(FULL()); }
}

/* ---------- theater (campaign map) ---------- */
function theaterZoom(dir,animate){
  tweens=tweens.filter(o=>!o.cam && !o.zoom);
  setVB([0,0,400,400]);
  const th=$('#theater'), fd=$('#field');
  const [bx,by,bw]=B.prologue.box, k=400/bw, c=[bx+bw/2,by+bw/2];
  th.style.display=''; fd.style.display='';
  const apply=e=>{
    const s=Math.pow(k,e), C=[200+(c[0]-200)*e, 200+(c[1]-200)*e];
    th.setAttribute('transform',`translate(${(200-C[0]*s).toFixed(2)} ${(200-C[1]*s).toFixed(2)}) scale(${s.toFixed(4)})`);
    th.style.opacity=String(e<.6?1:Math.max(0,1-(e-.6)/.4));
    fd.style.opacity=String(e<.55?0:Math.min(1,(e-.55)/.45));
  };
  const fin=()=>{ if(dir===1){ th.style.display='none'; } else { fd.style.display='none'; } };
  if(!animate||RM.matches){ apply(dir===1?1:0); fin(); return; }
  addTw({keep:true,zoom:true,dur:1250,step:p=>{const e=easeInOut(p); apply(dir===1?e:1-e);},end:fin});
}
function runTokens(){
  tfigs.forEach(f=>{ const p=f.tok.path[0]; f.x=p[0]+f.ox; f.y=p[1]+f.oy; f.op=1; f.fv=1; f.rot=0; f.h=0; draw(f); });
  const finish=f=>{ if(f.tok.end==='ko') tw(f,{rot:[0,stRot(f,'ko')],op:[1,.78]},440,0,easeBack); };
  if(RM.matches){ tfigs.forEach(f=>{ const l=f.tok.path[f.tok.path.length-1]; f.x=l[0]+f.ox; f.y=l[1]+f.oy; if(f.tok.end==='ko'){f.rot=stRot(f,'ko'); f.op=.78;} draw(f); }); return; }
  tfigs.forEach(f=>{
    const path=f.tok.path; let step=1;
    const next=()=>{ if(step>=path.length){ finish(f); return; } const p=path[step++]; hop(f,p[0]+f.ox,p[1]+f.oy,0,next); };
    later(500+f.ui*380+f.fi*90,next);
  });
}
function drawTheaterArrows(){
  const g=$('#tarrows'); let s='';
  (B.prologue.a||[]).forEach((a,k)=>{
    const side=a[0][0], dashed=a[0].length>1;
    const d = a.length===5 ? `M${a[1]} ${a[2]} L${a[3]} ${a[4]}` : `M${a[1]} ${a[2]} Q${a[3]} ${a[4]} ${a[5]} ${a[6]}`;
    const col = side==='g' ? '#21531a' : '#b5381f';
    s+=`<g class="arw" style="animation-delay:${(RM.matches?0:.3+k*.25).toFixed(2)}s"><path d="${d}" fill="none" stroke="#f6eedb" stroke-width="6" stroke-linecap="round" opacity=".5"/><path d="${d}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round"${dashed?' stroke-dasharray="6 5"':''} marker-end="url(#m${side})"/></g>`;
  });
  g.innerHTML=s;
}

/* ---------- board build ---------- */
/* keep every map label fully on the board: measure it and nudge it inside the edges */
function fitLabels(root){
  const svg=$('#board'); if(!svg||!root) return;
  const H=(B&&B.H)||400, m=svg.getScreenCTM(); if(!m||!m.a) return;
  const k=1/m.a, sr=svg.getBoundingClientRect(), pad=5, placed=[];
  const box=t=>{ const r=t.getBoundingClientRect(); return {x0:(r.left-sr.left)*k, x1:(r.right-sr.left)*k, y0:(r.top-sr.top)*k, y1:(r.bottom-sr.top)*k, w:r.width}; };
  const hit=(a,b)=>a.x0<b.x1+2 && a.x1>b.x0-2 && a.y0<b.y1+1 && a.y1>b.y0-1;
  const shift=(t,dx,dy)=>{ t.setAttribute('transform',`translate(${dx.toFixed(1)} ${dy.toFixed(1)}) `+(t.getAttribute('transform')||'')); t.dataset.fit='1'; };
  const mzg=root.querySelector('#mzones'); if(mzg) mzg.classList.add('meas');   /* hidden circle names are measured too, unseen */
  const all=[...root.querySelectorAll('text.lbl'),...root.querySelectorAll('text.mzl')].filter(t=>!t.closest('[style*="display:none"]')&&!t.closest('#theater'));
  all.forEach(t=>{ if(t.dataset.fit){ t.setAttribute('transform',(t.getAttribute('transform')||'').replace(/^translate\([^)]*\)\s*/,'')); delete t.dataset.fit; if(!t.getAttribute('transform')) t.removeAttribute('transform'); } });
  /* troops count as obstacles too, so a name never hides under (or behind) a toy */
  if(document.body.classList.contains('mys')) root.querySelectorAll('#units > g').forEach(g=>{ const cs=getComputedStyle(g); if(cs.display==='none'||+cs.opacity<.2) return; const b=box(g); if(b.w>2) placed.push({x0:b.x0+2,x1:b.x1-2,y0:b.y0+2,y1:b.y1-1}); });
  /* so do the numbered badges on the order circles: a name must not cover the number you tap */
  root.querySelectorAll('#mzones .mz > g').forEach(g=>{ const b=box(g); if(b.w>2) placed.push({x0:b.x0+1,x1:b.x1-1,y0:b.y0+1,y1:b.y1-1}); });
  /* a name set along a river or road stays on it, but slides along to a stretch clear of toys, badges and other names */
  const lbox=[], letters=t=>{ const o=[], n=t.getNumberOfChars?t.getNumberOfChars():0; for(let i=0;i<n;i+=2){ try{ const e=t.getExtentOfChar(i); if(e.width) o.push({x0:e.x-2,x1:e.x+e.width+2,y0:e.y-1,y1:e.y+e.height+1}); }catch(x){} } return o; };
  const clash=bs=>bs.some(c=>c.x0<pad||c.x1>400-pad||c.y0<pad||c.y1>H-pad||placed.some(p=>hit(c,p)));
  all.forEach(t=>{ const tp=t.querySelector('textPath'); if(!tp||!box(t).w) return;
    const base=+tp.dataset.base, half=+tp.dataset.half, st=+tp.dataset.step||5; let got=null;
    for(const k of [0,1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,8,-8,10,-10]){ const o=base+k*st; if(o<half||o>100-half) continue;
      tp.setAttribute('startOffset',o.toFixed(1)+'%'); const bs=letters(t); if(bs.length && !clash(bs)){ got=bs; break; } }
    if(!got){ tp.setAttribute('startOffset',base.toFixed(1)+'%'); got=letters(t); }
    got.forEach(b=>{ placed.push(b); lbox.push(b); }); });
  all.forEach(t=>{
    if(t.dataset.pin||t.dataset.zc) return;
    let b=box(t); if(!b.w) return;
    let dx=0, dy=0;
    if(b.x0<pad) dx=pad-b.x0; else if(b.x1>400-pad) dx=400-pad-b.x1;
    if(b.y0<pad) dy=pad-b.y0; else if(b.y1>H-pad) dy=H-pad-b.y1;
    const mv=(o,h=0)=>({x0:b.x0+dx+h,x1:b.x1+dx+h,y0:b.y0+dy+o,y1:b.y1+dy+o});
    if(placed.some(p=>hit(mv(0),p))){
      const step=(b.y1-b.y0)+1, tries=[];
      [step,-step,2*step,-2*step,3*step,-3*step].forEach(o=>tries.push([o,0]));
      [20,-20,36,-36,64,-64,90,-90].forEach(h=>[0,step,-step,2*step,-2*step].forEach(o=>tries.push([o,h])));
      for(const [o,h] of tries){ const c=mv(o,h); if(c.y0>=pad && c.y1<=H-pad && c.x0>=pad && c.x1<=400-pad && !placed.some(p=>hit(c,p))){ dy+=o; dx+=h; break; } }
    }
    if(dx||dy) shift(t,dx,dy);
    placed.push(mv(0)); lbox.push(mv(0));
  });
  /* the name that appears beside an order circle (wide screens) takes whichever side of its circle is clear. Each is
     placed on its own, since only the picked or pointed-at one shows. */
  all.forEach(t=>{ if(!t.dataset.zc) return; const [cx,cy,r]=t.dataset.zc.split(',').map(Number), two=!!t.querySelector('tspan');
    const set=(x,y,anc)=>{ t.setAttribute('x',x); t.setAttribute('y',y); t.setAttribute('text-anchor',anc); t.querySelectorAll('tspan').forEach(s=>s.setAttribute('x',x)); };
    const yr=two?cy-2:cy+4, R=[cx+r+6,yr,'start'], Lf=[cx-r-6,yr,'end'], Dn=[cx,cy+r+12,'middle'], Up=[cx,cy-r-(two?19:7),'middle'];
    const near=cx>262?[Lf,R,Dn,Up]:[R,Lf,Dn,Up], order=near.slice();
    /* then the same sides nudged up, down or a little further out */
    [14,-14,26,-26].forEach(d=>{ order.push([R[0],yr+d,'start'],[Lf[0],yr+d,'end']); });
    order.push([cx,Dn[1]+14,'middle'],[cx,Up[1]-14,'middle'],[cx+r+20,yr,'start'],[cx-r-20,yr,'end']);
    const over=bs=>{ let a=0; bs.forEach(c=>{ if(c.x0<pad||c.x1>400-pad||c.y0<pad||c.y1>H-pad) a+=1e4; placed.forEach(p=>{ const w=Math.min(c.x1,p.x1)-Math.max(c.x0,p.x0), h=Math.min(c.y1,p.y1)-Math.max(c.y0,p.y0); if(w>0&&h>0) a+=w*h; }); }); return a; };
    let ok=false, least=null;
    for(const c of order){ set(...c); const b=box(t); if(!b.w){ ok=true; break; } const bs=[{x0:b.x0,x1:b.x1,y0:b.y0+1,y1:b.y1-1}];
      if(!clash(bs)){ ok=true; break; } const a=over(bs); if(!least||a<least.a) least={a,c}; }
    if(!ok && least) set(...least.c); });

  /* no tree grows through a name: clear any tree that would sit under a label once labels are placed */
  if(document.body.classList.contains('mys')){
    const trees=[...root.querySelectorAll('#field .terr g.tree')];
    trees.forEach(g=>g.style.display='');
    const L=lbox;
    trees.forEach(g=>{ const b=box(g); if(L.some(l=>b.x0<l.x1+1 && b.x1>l.x0-1 && b.y0<l.y1+1 && b.y1>l.y0-1)) g.style.display='none'; });
  }
  if(mzg) mzg.classList.remove('meas');
}
/* two frames on, so the toys have been drawn where they now stand before names are fitted around them */
function refitLabels(){ requestAnimationFrame(()=>requestAnimationFrame(()=>fitLabels($('#board')))); }
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(refitLabels);
addEventListener('resize',()=>{ clearTimeout(refitLabels.t); refitLabels.t=setTimeout(refitLabels,200); });
/* names are measured on screen, so fit them again whenever the board changes size or a web font arrives:
   the first fit can run before the layout and the lettering have settled, and would miss names that then collide */
(function(){ const later=()=>{ clearTimeout(refitLabels.t); refitLabels.t=setTimeout(refitLabels,120); };
  try{ const b=document.getElementById('board'); if(b && window.ResizeObserver) new ResizeObserver(later).observe(b); }catch(e){}
  try{ if(document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone',later); }catch(e){} })();

function buildBoard(b){ const toon=TOON=document.body.classList.contains('mys'); TREE_AVOID=treeAvoid(b); buildBoard0(b); TOON=false; TREE_AVOID=[];
  /* crisp map text: lift place names out of the sketchy terrain filter, into their own layer that still sits below the troops */
  if(toon){ const svg=$('#board'), terr=svg.querySelector('#field > .terr'), arr=svg.querySelector('#arrows');
    if(terr&&arr){ const L=document.createElementNS(NS,'g'); L.id='tlabels'; L.setAttribute('pointer-events','none');
      terr.querySelectorAll('text.lbl').forEach(t=>L.appendChild(t)); arr.parentNode.insertBefore(L,arr); geoLabels(svg,L,terr); } }
  refitLabels(); }
/* Place names the way a map sets them. Each gets a kind (water, high ground) for its lettering, and the name of a river or
   a road runs along it, on the side it was placed, reading left to right, instead of sitting across it at a fixed angle. */
function geoLabels(svg,L,terr){
  const lines=[[/river|creek|stream|brook|canal/i,'.riv'],[/road|lane|track|causeway/i,'.rd']];
  const defs=svg.querySelector('defs');
  [...L.querySelectorAll('text.lbl')].forEach((t,ti)=>{ try{
    const s=t.textContent;
    if(/river|creek|stream|bay|sea\b|channel|strait|narrows|ocean|lake|gulf|mediterranean|estuary/i.test(s)) t.classList.add('k-water');
    else if(/rise|ridge|hill|bluff|mont\b|mt\.|mount|heights|crest/i.test(s)) t.classList.add('k-hill');
    const kind=lines.find(k=>k[0].test(s)); if(!kind||!defs) return;
    const x=+t.getAttribute('x'), y=+t.getAttribute('y'); let best=null;
    terr.querySelectorAll('path'+kind[1]).forEach(p=>{ const n=p.getTotalLength(); for(let l=0;l<=n;l+=4){ const q=p.getPointAtLength(l), d=Math.hypot(q.x-x,q.y-y); if(!best||d<best.d) best={d,l,p,n}; } });
    if(!best||best.d>70) return;
    const P=best.p, N=best.n, w=s.length*((+t.getAttribute('font-size')||10)*.72)+10;
    if(N<w) return;   /* too short a stretch to carry the name */
    const at=l=>{ const q=P.getPointAtLength(l), q0=P.getPointAtLength(Math.max(0,l-1.5)), q1=P.getPointAtLength(Math.min(N,l+1.5)), d=Math.hypot(q1.x-q0.x,q1.y-q0.y)||1; return {x:q.x,y:q.y,tx:(q1.x-q0.x)/d,ty:(q1.y-q0.y)/d}; };
    const m=at(best.l), side=((x-m.x)*-m.ty+(y-m.y)*m.tx)<0?-1:1, off=(+P.getAttribute('stroke-width')||6)/2+10.5;
    /* the whole feature, set off to the side the name was placed on, so the name can slide along it to a clear stretch */
    let pts=[]; for(let l=0;l<=N+.01;l+=3){ const q=at(Math.min(l,N)); pts.push([q.x-q.ty*side*off,q.y+q.tx*side*off]); }
    const rev = Math.abs(m.tx)>=Math.abs(m.ty)*.3 ? m.tx<0 : m.ty>0;   /* left to right; a north-south one reads upward */
    if(rev) pts.reverse();
    const half=Math.min(50,100*(w/2)/N), base=Math.max(half,Math.min(100-half,100*(rev?N-best.l:best.l)/N));
    const id='gl'+ti, p=document.createElementNS(NS,'path'); p.id=id; p.setAttribute('d','M'+pts.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')); defs.appendChild(p);
    const tp=document.createElementNS(NS,'textPath'); tp.setAttribute('href','#'+id); tp.setAttribute('startOffset',base.toFixed(1)+'%'); tp.textContent=s;
    tp.dataset.base=base.toFixed(1); tp.dataset.half=half.toFixed(1); tp.dataset.step=(100*12/N).toFixed(2);
    t.textContent=''; ['x','y','transform'].forEach(k=>t.removeAttribute(k)); t.setAttribute('text-anchor','middle'); t.setAttribute('dominant-baseline','middle'); t.dataset.pin='1'; t.appendChild(tp);
  }catch(e){} });
}
function buildBoard0(b){
  const svg=$('#board');
  const P=b.prologue, box=P?P.box:[0,0,400], [bx,by,bw]=box, H=b.H||400;
  const wrap=svg.closest('.board-wrap'); if(wrap) wrap.style.aspectRatio = H===400 ? '' : `400 / ${H}`;
  svg.innerHTML =
    `<defs><mask id="fogMask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="${H}"><rect width="400" height="${H}" fill="white"/><g id="fogHoles" filter="url(#soft)"></g></mask></defs>`+
    `<g id="field"${P?' style="display:none"':''}><g class="terr" filter="url(#aged)">${b.terrain()}</g><rect width="400" height="${H}" fill="url(#parch)" pointer-events="none"/><g id="arrows"></g>`+
      `<g id="fogL"><rect width="400" height="${H}" fill="#dfe3dc" fill-opacity=".9" mask="url(#fogMask)"/><rect width="400" height="${H}" fill="url(#cloud)" mask="url(#fogMask)"/></g>`+
      `<g id="units"></g><g id="fx" pointer-events="none"></g><g pointer-events="none">${b.over?b.over():''}</g><g id="lens"></g><g class="neat" pointer-events="none"><rect x="3.5" y="3.5" width="393" height="${H-7}" fill="none" stroke="#3b2a18" stroke-width="1.4"/><rect x="6.5" y="6.5" width="387" height="${H-13}" fill="none" stroke="#3b2a18" stroke-width=".5"/></g></g>`+
    (P?`<g id="theater">${P.theater()}<rect x="${bx}" y="${by}" width="${bw}" height="${bw}" fill="rgba(210,63,44,.12)" stroke="#d23f2c" stroke-width="2" stroke-dasharray="5 3" rx="2"/><text class="lbl" x="${bx+bw/2}" y="${by+bw+12}" font-size="10" text-anchor="middle">${b.name}</text><g id="tarrows"></g><g id="tunits"></g>${end()}</g>`:'');
  const ug=svg.querySelector('#units'), tg=svg.querySelector('#tunits');
  figs=[]; tfigs=[];
  b.units.forEach((u,ui)=>{ OFF[u.n||1].forEach((o,fi)=>{ const f=makeFig(u,o,fi,ui,b.face[u.s],ug); f.g.addEventListener('click',e=>{e.stopPropagation(); selectUnit(u.id);}); figs.push(f); }); });
  ((P&&P.tokens)||[]).forEach((tok,ui)=>{
    const u={id:'tok'+ui,s:tok.s,t:tok.t,n:tok.n||1,name:tok.name,why:tok.why||''};
    OFF[u.n].forEach((o,fi)=>{ const f=makeFig(u,o,fi,ui,b.face[u.s],tg); f.tok=tok; f.g.addEventListener('click',e=>{e.stopPropagation(); showTag(`<b>${tok.name}</b>${tok.why?`<p>${tok.why}</p>`:''}`);}); tfigs.push(f); });
  });
  svg.onclick=e=>{ const pin=e.target.closest('[data-feat]'); if(pin){ selectFeature(+pin.dataset.feat); return; } selectUnit(null); };
}

/* ---------- views ---------- */
const views=['home','battle','playbook','archive','cards'];
const BACK_SVG='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const pgHead=(t,sub)=>`<header class="pbar"><button class="back bk-ico" type="button" data-home aria-label="Back to today's order">${BACK_SVG}</button><div class="pbt"><h1>${t}</h1>${sub?`<p>${sub}</p>`:''}</div></header>`;
function show(v){ views.forEach(x=>{$('#'+x).hidden=(x!==v);}); if(v!=='battle') document.body.classList.remove('mys','mbrief'); if(v==='battle' && window.sheetTo) requestAnimationFrame(()=>sheetTo('mid',false)); }
function strip(){
  let s=`<svg viewBox="0 0 400 74" aria-hidden="true"><rect x="0" y="58" width="400" height="16" rx="2" fill="#5a3a20"/><rect x="0" y="58" width="400" height="3" fill="#8a6230"/><rect x="0" y="71" width="400" height="3" fill="#2c1a0d"/>`;
  const xs=[[22,'g','hvy'],[52,'g','inf-blk'],[84,'g','cav-blk'],[118,'g','cmd-blk'],[152,'g','arm'],[188,'g','plane'],[226,'t','ship'],[262,'t','gal'],[296,'t','spr'],[326,'t','cav'],[356,'t','art'],[384,'t','inf']];
  xs.forEach(([x,sd,t],k)=>{ const lift=t==='plane'?-12:0, sc=/ship|gal/.test(t)?1.05:1.4; s+=`<g transform="translate(${x} 64)"><ellipse rx="9" ry="2.6" fill="rgba(0,0,0,.3)"/><g class="idle" style="animation-delay:${(k*.21).toFixed(2)}s"><g transform="translate(0 ${lift}) scale(${sd==='g'?sc:-sc} ${sc})"><use href="#u-${t}" ${fillAttr({s:sd})}/></g></g></g>`; });
  return s+'</svg>';
}
function thumb(b,sq){
  const H=b.H||400; let vy=0;
  if(sq && H>400){ const ys=(b.m&&b.m.zones)?b.m.zones.map(z=>z[3]):b.units.map(u=>posAt(u,0)[1]); vy=Math.max(0,Math.min(H-400,ys.reduce((a,c)=>a+c,0)/ys.length-200)); }
  const T0=TOON, A0=TREE_AVOID; TOON=!!sq; TREE_AVOID=treeAvoid(b);
  let s=sq ? `<svg viewBox="0 ${vy.toFixed(0)} 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g filter="url(#sketch)">${b.terrain()}</g>`
           : `<svg viewBox="0 0 400 ${H}" aria-hidden="true"><g filter="url(#aged)">${b.terrain()}</g><rect width="400" height="${H}" fill="url(#parch)"/>`;
  b.units.forEach(u=>{ const p=(b.m&&b.m.start&&b.m.start[u.id])||posAt(u,0); if(p[2]==='off'||p[2]==='exit') return; const lift=u.t==='plane'?-15:0; OFF[u.n||1].forEach(o=>{ s+=`<g transform="translate(${p[0]+o[0]} ${p[1]+o[1]+lift}) scale(${b.face[u.s]*1.15} 1.15)"${p[2]==='hide'?' opacity=".45"':''}><use href="#u-${SPR(u.t,yearOf(b),u.name)}" ${fillAttr(u)}/></g>`; }); });
  TREE_AVOID=A0; TOON=T0;
  return s+'</svg>';
}
function renderHome(){
  const how=[['r','1','Read the general\'s briefing.'],['y','2','Give your order: one toy, one place.'],['b','3','Watch what really happened.']];
  let h=`<div class="land">
    <header class="lbar"><span class="lword">The Daily Order</span><nav class="lnav"><a href="#archive">Past orders</a><a href="#cards">Troop cards</a><a class="lnav-pb" href="#playbook">Playbook</a></nav></header>
    <div class="lwrap">
      <section class="lhero"><span class="lchip">A new battle every day</span>
        <h1>Think you're smarter than history's greatest generals?</h1>
        <p class="lsub" id="lsub"></p>
        <ol class="lhow lhow-d">${how.map(([c,n,t])=>`<li><span class="ln ${c}">${n}</span><span>${t}</span></li>`).join('')}</ol>
      </section>
      <div class="lright"><div id="dailySlot"></div>
        <ol class="lhow lhow-m">${how.map(([c,n,t])=>`<li><span class="ln ${c}">${n}</span><span>${t}</span></li>`).join('')}</ol></div>
    </div>
  </div>`;
  $('#home').innerHTML=h;
  if(window.renderDailySlot) renderDailySlot();
}
function renderPlaybook(){
  /* principles unlock as you finish daily orders: each lists the orders that taught it */
  const got=new Map(), n=window.todayN?todayN():0;
  for(let k=1;k<=n;k++){
    const sc=window.scFor&&scFor(k), r=(typeof RES!=='undefined')&&RES[k];
    if(!sc||!r||!(r.done||r.first)) continue;
    ((sc.debrief&&sc.debrief.principles)||[]).forEach(id=>{ if(!got.has(id)) got.set(id,[]); got.get(id).push([k,sc]); });
  }
  const list=PRINCIPLES.filter(p=>got.has(p.id)), left=PRINCIPLES.length-list.length;
  let h=`<div class="pg2">${pgHead('The Playbook', list.length?`${list.length} of ${PRINCIPLES.length} principles unlocked. Finish an order to learn its lessons.`:'Finish an order to unlock the lessons behind it.')}<div class="pbody">`;
  if(!list.length){
    h+=`<div class="prc prc-empty"><span class="prc-k">Nothing here yet</span><h2>Every order teaches a principle</h2><p>Win or lose today's order and the ideas behind the real general's move are added here, with the battles that show them.</p><a class="prc-go" href="#daily">Take today's order ›</a></div>`;
  } else {
    list.forEach(p=>{
      h+=`<article class="prc" id="pr-${p.id}"><span class="prc-k">Principle</span><h2>${p.name}</h2><p>${p.mil}</p>
        <div class="prc-seen"><span>Seen in</span>${got.get(p.id).map(([k,sc])=>`<a href="#daily-${k}">${sc.name} <i>${sc.year}</i></a>`).join('')}</div></article>`;
    });
    if(left>0) h+=`<p class="prc-left">${left} more ${left===1?'principle':'principles'} to discover in future orders.</p>`;
  }
  h+=`</div></div>`;
  const el=$('#playbook'); el.innerHTML=h; el.scrollTop=0;
  if(state.pbFocus){ const t=document.getElementById('pr-'+state.pbFocus); if(t){ t.classList.add('flash'); requestAnimationFrame(()=>t.scrollIntoView({block:'center'})); setTimeout(()=>t.classList.remove('flash'),2200);} state.pbFocus=null; }
}
$('#playbook').addEventListener('click',e=>{
  if(e.target.closest('[data-home]')){ if(state.pbBack){ state.pbBack=false; history.back(); } else location.hash='home'; return; }
});

/* ---------- battle flow ---------- */
function openBattle(b){
  show('battle'); state.mode='battle'; document.body.classList.remove('mys');
  B=b; tweens=[]; state.cur={i:-1}; state.curArrows=[]; state.pov='g'; state.lens=false;
  $('#bName').textContent=b.name;
  $('#bSub').innerHTML=`<span class="sw g"></span>${b.g.short} <span>vs</span> <span class="sw t"></span>${b.t.short} <span>· ${b.year}</span>`;
  $('#povG').textContent=b.g.tab||b.g.short; $('#povT').textContent=b.t.tab||b.t.short;
  buildBoard(b);
  selectUnit(null);
  const p=state.pending; state.pending=null;
  if(p!==null && p>=0){ state.phase=p; enterField(p,false); }
  else goTo(-1,{fresh:true});
}
function histIdx(c){ let k=c.opts.findIndex(o=>o.hist); if(k<0) k=c.opts.findIndex(o=>o.ok); return k; }
function enterField(i,animateZoom){
  const ph=B.phases[i], key=B.id+':'+i;
  const pendingCall = ph.call && state.answered[key]===undefined;
  const cur = pendingCall ? {i:i-1, ph:i-1} : {i, ph:i};
  if(pendingCall) state.pov=ph.call.side;
  display(cur,false,pendingCall?[]:ph.a);
  theaterZoom(1,animateZoom);
  renderCtrl(); renderTools(); renderLens();
  if(pendingCall) renderCall(i,null); else renderCard(i);
}
function goTo(i,opts={}){
  const n=B.phases.length;
  i=Math.max(-1,Math.min(n-1,i));
  const fromTheater = state.cur.i===-1;
  state.phase=i; state.callChoice=null;
  selectUnit(null); hideBanner();
  if(i===-1){
    state.cur={i:-1}; state.curArrows=[];
    theaterZoom(-1,!opts.fresh);
    drawTheaterArrows(); runTokens();
    renderCtrl(); renderTools(); renderLens(); renderPrologue();
    return;
  }
  if(fromTheater){ enterField(i,true); return; }
  const ph=B.phases[i], key=B.id+':'+i;
  const pendingCall = ph.call && state.answered[key]===undefined;
  const cur = pendingCall ? {i:i-1, ph:i-1} : {i, ph:i};
  if(pendingCall) state.pov=ph.call.side;
  if(state.cur.i!==cur.i || state.cur.alt) display(cur,true,pendingCall?[]:ph.a);
  else if(pendingCall){ refreshVis(); drawArrows([]); state.curArrows=[]; }
  renderCtrl(); renderTools(); renderLens();
  if(pendingCall) renderCall(i,null); else renderCard(i);
}
function nextBattle(){ return BATTLES[BATTLES.indexOf(B)+1]||null; }
function nextLabel(i){
  const n=B.phases.length;
  if(i<n-1) return `Next: ${B.phases[i+1].title} ›`;
  const nb=nextBattle();
  return nb ? `Next battle: ${nb.name} ›` : 'Back to all battles ›';
}
function advance(){
  if(state.mode==='daily') return dailyNext();
  if(state.phase<B.phases.length-1){ goTo(state.phase+1); return; }
  const nb=nextBattle(); location.hash = nb ? nb.id : 'home';
}
function renderCtrl(){
  const n=B.phases.length, i=state.phase;
  $('#dots').innerHTML=`<button type="button" class="dot map${i===-1?' on':''}" data-k="-1" aria-label="Campaign map"${i===-1?' aria-current="step"':''}>Map</button>`+B.phases.map((p,k)=>`<button type="button" class="dot${k===i?' on':''}${p.call?' hascall':''}" data-k="${k}" aria-label="Phase ${k+1}: ${p.title}${p.call?' (decision)':''}"${k===i?' aria-current="step"':''}>${k+1}</button>`).join('');
  $('#prev').disabled = i===-1;
  $('#next').innerHTML = i===-1 ? 'Zoom in ›' : i<n-1 ? 'Next ›' : (nextBattle()?'Next battle ›':'Finish ›');
}
function renderTools(){
  const field=state.phase>=0;
  document.querySelectorAll('#pov button').forEach(b=>{ b.setAttribute('aria-pressed',String(b.dataset.pov===state.pov)); b.disabled=!field; });
  const f=$('#tFog'), l=$('#tLens');
  f.setAttribute('aria-pressed',String(state.fog)); l.setAttribute('aria-pressed',String(state.lens));
  f.disabled=!field; l.disabled=!field;
}
function showBanner(t,cls=''){ const b=$('#banner'); b.textContent=t; b.className='banner '+cls; b.hidden=false; }
function hideBanner(){ const b=$('#banner'); if(state.lens && state.phase>=0){ showBanner('Terrain lens: tap a numbered pin','lens'); } else b.hidden=true; }

/* ---------- cards ---------- */
const sec=(t,p)=>`<div class="sec"><h3>${t}</h3><p>${p}</p></div>`;
function sidesBrief(){
  return `<div class="brief"><div class="side"><span class="sw g"></span><div><b>${B.g.name}</b><br>${B.g.cmdr}<br><span class="str">${B.g.str}</span></div></div><div class="side"><span class="sw t"></span><div><b>${B.t.name}</b><br>${B.t.cmdr}<br><span class="str">${B.t.str}</span></div></div><p class="obj"><b>The objectives.</b> ${B.objective}</p></div>`;
}
const uInfo = u => window.dailyUnit ? dailyUnit(u) : {name:u.name, why:u.why};
const fInfo = (f,k) => window.dailyFeat ? dailyFeat(f,k) : {name:f.name, why:f.why};
function roster(){
  return `<details class="roster"><summary>Troops on the board (${B.units.length})</summary><div class="ros">${B.units.map(u=>{const I=uInfo(u); return `<button type="button" data-u="${u.id}"><span class="sw ${u.s}"></span><span><b>${I.name}</b> · ${TYPE[u.t]}${I.why?'<br>'+I.why:''}</span></button>`;}).join('')}</div></details>`;
}
function featList(){
  const fs=B.features||[]; if(!fs.length) return '';
  return `<details class="roster"><summary>Key terrain (${fs.length})</summary><div class="ros feat-list">${fs.map((f,k)=>{const I=fInfo(f,k); return `<button type="button" data-feat="${k}"><span class="feat-n">${k+1}</span><span><b>${I.name}</b><br>${I.why}</span></button>`;}).join('')}</div></details>`;
}
function renderPrologue(){
  const P=B.prologue;
  state.cardMode='prologue';
  card.innerHTML=`<div class="card-in"><div class="kicker">The campaign · ${P.when}</div><h2>${P.title}</h2>${sec('How they got here',P.text)}<div class="wants"><div class="want"><span class="sw g"></span><div><b>What ${B.g.short} needed.</b> ${P.gWant}</div></div><div class="want"><span class="sw t"></span><div><b>What ${B.t.short} needed.</b> ${P.tWant}</div></div></div>${sidesBrief()}<p class="hint">The map shows how the armies reached the battlefield. Tap a toy for details, then zoom in to the battle itself.</p><button type="button" class="nextbig">Zoom in to the battlefield ›</button></div>`;
  card.scrollTop=0;
}
function otherBox(ph){
  if(!ph.tv) return '';
  return `<div class="other"><h3>${B.t.eyes}</h3><p>${ph.tv}</p></div>`;
}
function renderCard(i){
  state.cardMode='phase';
  const ph=B.phases[i], n=B.phases.length, key=B.id+':'+i;
  let h=`<div class="card-in"><div class="kicker">Phase ${i+1} of ${n} · ${ph.when}</div><h2>${ph.title}</h2>`;
  if(ph.call){
    const a=state.answered[key], o=ph.call.opts[a], hi=histIdx(ph.call);
    if(o) h+=`<div class="recap ${o.ok?'ok':'no'}"><b>Your call as ${ph.call.who}:</b> ${o.t}. ${a===hi?(o.ok?'That matches what happened.':'Same as history, and here is how it went.'):(o.ok?'Better than what history did.':'History went a different way.')}</div>`;
  }
  if(i===0) h+=`<p class="hint">Tap any toy to see who it is and why it was there. Try Fog of war to see only what one side could see, or the Terrain lens to learn the ground.</p>`;
  if(state.pov==='t') h+=otherBox(ph);
  h+=sec('The move',ph.move)+sec('Why',ph.why);
  if(state.pov!=='t') h+=otherBox(ph);
  h+=(ph.ground?sec('The ground',ph.ground):'')+(ph.supply?sec('Supply and logistics',ph.supply):'');
  h+=`<aside class="boardroom"><div class="br-k">In the boardroom</div><h4>${ph.board.h}</h4><p>${ph.board.b}</p><p class="try"><b>Try this:</b> ${ph.board.try}</p></aside>`;
  const pr=PR_AT[key];
  if(pr) h+=`<div class="sec"><h3>Principles in play</h3><div class="chips">${pr.map(p=>`<button type="button" class="chip-p" data-pr="${p.id}">${p.name}</button>`).join('')}</div></div>`;
  h+=featList()+roster()+`<button type="button" class="nextbig">${nextLabel(i)}</button></div>`;
  card.innerHTML=h; card.scrollTop=0;
}
function renderCall(i,chosen){
  state.cardMode='call'; state.callChoice=chosen;
  const ph=B.phases[i], c=ph.call, n=B.phases.length, hi=histIdx(c), side=c.side==='g'?B.g:B.t;
  let h=`<div class="card-in"><div class="kicker">Phase ${i+1} of ${n} · ${ph.when}</div><div class="call ${c.side}"><div class="ck">Your call, ${c.who}</div><div class="who"><span class="sw ${c.side}"></span>You are commanding for ${side.short}</div><h3>${c.q}</h3>`;
  c.opts.forEach((o,k)=>{ let cls='opt'; if(chosen!==null){ if(o.ok) cls+=' right'; else if(k===chosen) cls+=' wrong'; } h+=`<button type="button" class="${cls}" data-opt="${k}"${chosen!==null?' disabled':''}>${o.t}</button>`; });
  if(chosen!==null){
    const o=c.opts[chosen];
    const lab = chosen===hi ? (o.ok?'Good call. This is what happened.':'This is what history did.') : (o.ok?'Better than history.':'Not quite.');
    h+=`<div class="fb"><b>${lab}</b> ${o.fb}</div>`;
    if(chosen!==hi) h+=`<div class="fb"><b>What actually happened:</b> ${c.opts[hi].fb}</div>`;
    if(chosen!==hi && o.alt) h+=`<p class="fb" style="opacity:.85">The board is playing out your choice. This is informed speculation, not history.</p><button type="button" class="play">See what really happened ›</button>`;
    else h+=`<button type="button" class="play">Play it out on the board ›</button>`;
  } else {
    h+=`<p class="fb" style="opacity:.8">The board shows the situation as it stood. Pick one, then see what really happened.</p>`;
  }
  h+=`</div></div>`;
  card.innerHTML=h; card.scrollTop=0;
}
function pickOption(k){
  const i=state.phase, c=B.phases[i].call, hi=histIdx(c), o=c.opts[k];
  state.answered[B.id+':'+i]=k;
  renderCall(i,k);
  if(k!==hi && o.alt){
    display({i:i-1, ph:i, alt:o.alt},true,o.alt.a||[]);
    showBanner('What if · informed speculation');
  }
}
function playReal(){
  const i=state.phase; hideBanner();
  display({i,ph:i},true,B.phases[i].a);
  renderCtrl(); renderCard(i);
}

/* ---------- selection, lens ---------- */
function showTag(html){
  const tag=$('#utag');
  tag.innerHTML=html+`<button type="button" class="x" aria-label="Close">×</button>`;
  tag.hidden=false;
  tag.querySelector('.x').addEventListener('click',ev=>{ev.stopPropagation(); selectUnit(null);});
}
function selectUnit(id){
  if(id && window.mUnitTap && mUnitTap(id)) return;
  figs.forEach(f=>f.g.classList.toggle('sel',f.u.id===id));
  document.querySelectorAll('#lens .pin').forEach(p=>p.classList.remove('sel'));
  if(!id){ const tag=$('#utag'); tag.hidden=true; tag.innerHTML=''; return; }
  const u=B.units.find(x=>x.id===id); if(!u) return;
  const side=u.s==='g'?B.g.short:B.t.short;
  const I=uInfo(u); showTag(`<b>${I.name}</b><div class="ut"><span class="sw ${u.s}"></span>${side} · ${TYPE[u.t]}</div>${I.why?`<p>${I.why}</p>`:''}`);
}
function renderLens(){
  const L=$('#lens'), fd=$('#field'); if(!L) return;
  const on=state.lens && state.phase>=0;
  fd.classList.toggle('lensOn',on);
  if(!on){ L.innerHTML=''; hideBanner(); return; }
  let s='';
  (B.features||[]).forEach(f=>{ if(f.d) s+=`<path class="lz${f.line?' line':''}" d="${f.d}"/>`; else if(f.r) s+=`<circle class="lz" cx="${f.x}" cy="${f.y}" r="${f.r}"/>`; });
  (B.features||[]).forEach((f,k)=>{ const px=f.px??f.x, py=f.py??f.y; s+=`<g class="pin" data-feat="${k}" transform="translate(${px} ${py})"><circle class="pr0" r="14"/><circle r="9.5" fill="#ffd36b" stroke="#1f1a14" stroke-width="1.5"/><text y="3.6" text-anchor="middle" font-size="10.5" font-weight="800" font-family="Archivo, sans-serif" fill="#1f1a14">${k+1}</text></g>`; });
  L.innerHTML=s;
  hideBanner();
}
function selectFeature(k){
  if(!state.lens){ state.lens=true; renderTools(); renderLens(); setVB(FULL()); }
  figs.forEach(f=>f.g.classList.remove('sel'));
  document.querySelectorAll('#lens .pin').forEach(p=>p.classList.toggle('sel',+p.dataset.feat===k));
  const f=B.features[k];
  const I=fInfo(f,k); showTag(`<b>${k+1}. ${I.name}</b><div class="ut">Terrain</div><p>${I.why}</p>`);
}

/* ---------- events ---------- */
card.addEventListener('click',e=>{
  const daily=state.mode==='daily';
  const opt=!daily&&e.target.closest('[data-opt]');
  if(opt && !opt.disabled){ pickOption(+opt.dataset.opt); return; }
  if(!daily&&e.target.closest('.play')){ playReal(); return; }
  const u=e.target.closest('[data-u]'); if(u){ selectUnit(u.dataset.u); return; }
  const ft=e.target.closest('[data-feat]'); if(ft){ selectFeature(+ft.dataset.feat); return; }
  const pr=e.target.closest('[data-pr]'); if(pr){ state.pbFocus=pr.dataset.pr; state.pbBack=true; location.hash='playbook'; return; }
  if(!daily&&e.target.closest('.nextbig')) advance();
});
$('#dots').addEventListener('click',e=>{ const d=e.target.closest('[data-k]'); if(!d) return; if(state.mode==='daily') dailyDot(+d.dataset.k); else goTo(+d.dataset.k); });
$('#prev').addEventListener('click',()=>{ if(state.mode==='daily') dailyPrev(); else goTo(state.phase-1); });
$('#next').addEventListener('click',advance);
$('#bBack').addEventListener('click',()=>{ location.hash='home'; });
$('#bPb').addEventListener('click',()=>{ location.hash='playbook'; });
$('#pov').addEventListener('click',e=>{
  const b=e.target.closest('[data-pov]'); if(!b||b.disabled) return;
  state.pov=b.dataset.pov; renderTools(); refreshVis();
  if(state.cardMode==='phase') { const st=card.scrollTop; renderCard(state.phase); card.scrollTop=st; }
});
$('#tFog').addEventListener('click',()=>{ state.fog=!state.fog; renderTools(); refreshVis(); });
$('#tLens').addEventListener('click',()=>{ state.lens=!state.lens; renderTools(); renderLens(); if(state.lens){ tweens=tweens.filter(o=>!o.cam); setVB(FULL()); } else selectUnit(null); });
document.addEventListener('keydown',e=>{
  if($('#battle').hidden) return;
  if(e.key==='ArrowRight') advance();
  else if(e.key==='ArrowLeft'){ if(state.mode==='daily') dailyPrev(); else goTo(state.phase-1); }
  else if(e.key==='Escape') selectUnit(null);
});

function route(){
  let h=location.hash.replace('#','');
  if(window.dailyRoute && dailyRoute(h)) return;
  const b=BMAP[h];
  if(b){ openBattle(b); return; }
  tweens=[];
  if(h==='playbook'){ show('playbook'); renderPlaybook(); return; }
  show('home');
}
window.addEventListener('hashchange',route);
function start(data){
  if(data && data.answered) state.answered=data.answered;
  if(data && data.fog) state.fog=true;
  if(data && data.hash===location.hash && typeof data.phase==='number' && data.phase>=0) state.pending=data.phase;
  renderHome();
  route();
}
window.claude?.hot?.snapshot?.(()=>({hash:location.hash, phase:state.phase, answered:state.answered, fog:state.fog}));
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
