/* The Daily Order: combat effects. Every shot travels from the toy that fires to the toy it hits,
   so a player can always see who is fighting whom. Coordinates are board units (0 to 400). */
const KIND = {inf:'musket',hvy:'musket',para:'musket',cmd:'musket',truck:'musket',crate:'musket',stake:'musket',
  spr:'clash',cav:'clash',arch:'arrows',art:'cannon',ship:'broadside',gal:'ram',arm:'tank',plane:'bomb'};
const NAVAL = t => t==='ship'||t==='gal';
function uFigs(id){ const all=figs.filter(f=>f.u.id===id); const vis=all.filter(f=>f.op*f.fv>.05); return vis.length?vis:all; }
const figXY = f => [f.x, f.y-(f.h+f.base)-(NAVAL(f.u.t)?4:9)];
function uXY(id){ const fs=uFigs(id); if(!fs.length) return null; let x=0,y=0; fs.forEach(f=>{const p=figXY(f); x+=p[0]; y+=p[1];}); return [x/fs.length,y/fs.length]; }
function fxG(html,cls){ const fx=$('#fx'); if(!fx) return null; const g=document.createElementNS(NS,'g'); if(cls) g.setAttribute('class',cls); g.innerHTML=html; fx.appendChild(g); return g; }
function fxAnim(dur,delay,step,end){ return addTw({keep:true,dur,delay,step,end}); }
const rnd = (a,b) => a+Math.random()*(b-a);

/* ---------- building blocks ---------- */
function flash(x,y,s=1,delay=0){
  const g=fxG(`<polygon points="0,-6 1.6,-1.6 6,0 1.6,1.6 0,6 -1.6,1.6 -6,0 -1.6,-1.6" fill="#fff3a8"/><circle r="2.6" fill="#ff9b2e"/>`); if(!g) return;
  g.style.opacity='0';
  fxAnim(200,delay,p=>{ g.setAttribute('transform',`translate(${x} ${y}) scale(${(s*(.4+p*.9)).toFixed(2)}) rotate(${(p*40).toFixed(0)})`); g.style.opacity=(p<.3?1:(1-p)/.7).toFixed(2); },()=>g.remove());
}
function smoke(x,y,s=1,delay=0,dark=false){
  const g=fxG([0,1,2].map(k=>`<circle cx="${rnd(-3,3).toFixed(1)}" cy="${rnd(-2,1).toFixed(1)}" r="${(2.6+k).toFixed(1)}" fill="${dark?(k%2?'#5b544b':'#3d3832'):(k%2?'#f2ede2':'#d9d2c3')}"/>`).join('')); if(!g) return;
  g.style.opacity='0'; const dx=rnd(-4,4);
  fxAnim(1100,delay,p=>{ const e=easeOut(p); g.setAttribute('transform',`translate(${(x+dx*e).toFixed(1)} ${(y-9*e).toFixed(1)}) scale(${(s*(.6+e*1.6)).toFixed(2)})`); g.style.opacity=(p<.1?p*8:.8*(1-p)).toFixed(2); },()=>g.remove());
}
function proj(x0,y0,x1,y1,{dur=260,delay=0,arc=0,shape='tracer',onHit}={}){
  const html = shape==='ball' ? '<circle r="1.9" fill="#1f1a14"/>'
    : shape==='arrow' ? '<line x1="-4" y1="0" x2="4" y2="0" stroke="#3a2d1c" stroke-width="1"/><path d="M4 0 l-2 -1.4 v2.8z" fill="#3a2d1c"/>'
    : shape==='bomb' ? '<ellipse rx="1.6" ry="3" fill="#2a2a24"/>'
    : '<line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#ffe27a" stroke-width="1.4" stroke-linecap="round"/>';
  const g=fxG(html); if(!g) return; g.style.opacity='0';
  fxAnim(dur,delay,p=>{
    const x=x0+(x1-x0)*p, y=y0+(y1-y0)*p-arc*4*p*(1-p);
    const dy=(y1-y0)-arc*4*(1-2*p), ang=shape==='bomb'?0:Math.atan2(dy,x1-x0)*57.3;
    g.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(0)})`);
    g.style.opacity='1';
  },()=>{ g.remove(); if(onHit) onHit(); });
}
function burst(x,y,s=1,delay=0){
  const g=fxG(`<circle r="5" fill="#ffb347"/><circle r="3" fill="#fff0a0"/>${[0,1,2,3,4,5].map(k=>{const a=k/6*6.28; return `<line x1="${(Math.cos(a)*3).toFixed(1)}" y1="${(Math.sin(a)*3).toFixed(1)}" x2="${(Math.cos(a)*8).toFixed(1)}" y2="${(Math.sin(a)*8).toFixed(1)}" stroke="#ff7a1a" stroke-width="1.4" stroke-linecap="round"/>`;}).join('')}`); if(!g) return;
  g.style.opacity='0';
  fxAnim(420,delay,p=>{ g.setAttribute('transform',`translate(${x} ${y}) scale(${(s*(.3+easeOut(p)*1.1)).toFixed(2)})`); g.style.opacity=(p<.2?1:(1-p)/.8).toFixed(2); },()=>g.remove());
  smoke(x,y-2,s*1.2,delay+120,true);
}
function splash(x,y,s=1,delay=0){
  const g=fxG(`<ellipse rx="6" ry="2" fill="none" stroke="#e8f6ff" stroke-width="1.2"/>${[-3,0,3].map(d=>`<line x1="${d}" y1="0" x2="${d*1.4}" y2="-7" stroke="#e8f6ff" stroke-width="1.6" stroke-linecap="round"/>`).join('')}`); if(!g) return;
  g.style.opacity='0';
  fxAnim(520,delay,p=>{ g.setAttribute('transform',`translate(${x} ${y}) scale(${(s*(.4+p)).toFixed(2)} ${(s*(.4+p*(1-p)*3)).toFixed(2)})`); g.style.opacity=(1-p).toFixed(2); },()=>g.remove());
}
function sparks(x,y,delay=0){
  const g=fxG(`<path d="M-5 -5 L5 5 M-5 5 L5 -5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M0 -7 L0 7 M-7 0 L7 0" stroke="#ffd36b" stroke-width="1.1" stroke-linecap="round"/>`); if(!g) return;
  g.style.opacity='0';
  fxAnim(300,delay,p=>{ g.setAttribute('transform',`translate(${x} ${y}) scale(${(.4+p*.9).toFixed(2)}) rotate(${(p*60).toFixed(0)})`); g.style.opacity=(1-p).toFixed(2); },()=>g.remove());
}
function shakeUnit(id,delay=0){
  uFigs(id).forEach(f=>{ fxAnim(320,delay,p=>{ f.dir=(p<1?(Math.sin(p*38)>0?1:-1)*(f.face||1):0); },()=>{ f.dir=0; }); });
}
function lunge(id,tx,ty,delay=0){
  uFigs(id).forEach((f,k)=>{ const x0=f.x,y0=f.y, dx=(tx-x0)*.45, dy=(ty-y0)*.45;
    fxAnim(520,delay+k*60,p=>{ const e=p<.5?easeOut(p*2):1-easeInOut((p-.5)*2); f.x=x0+dx*e; f.y=y0+dy*e; f.h=Math.sin(p*Math.PI)*3; },()=>{ f.x=x0; f.y=y0; f.h=0; }); });
}

/* ---------- one unit fires on another; returns how long it takes (ms) ---------- */
function fire(fromId,toId,kind,delay=0){
  const A=uXY(fromId), T=uXY(toId); if(!A||!T||RM.matches) return 0;
  const U=figs.find(f=>f.u.id===fromId).u, V=figs.find(f=>f.u.id===toId).u;
  kind = kind || KIND[U.t] || 'musket';
  const sea = NAVAL(V.t), dirX = Math.sign(T[0]-A[0])||1;
  const hit = (x,y,big,d) => { (sea?splash:burst)(x+rnd(-4,4),y+rnd(-2,3),big?1.1:.6,d); if(sea && big) burst(x,y,.7,d+60); shakeUnit(toId,d); };
  const shooters = uFigs(fromId);
  if(kind==='musket'){
    [0,520].forEach(v=>shooters.forEach((f,k)=>{ const [x,y]=figXY(f), mx=x+dirX*6, d=delay+v+k*90;
      flash(mx,y-2,.8,d); smoke(mx,y-2,.8,d+40);
      proj(mx,y-2,T[0]+rnd(-6,6),T[1]+rnd(-3,4),{dur:230,delay:d,onHit:()=>sparks(T[0]+rnd(-5,5),T[1]+rnd(-2,3))}); }));
    setTimeout(()=>shakeUnit(toId),delay+300);
    return 1100;
  }
  if(kind==='arrows'){
    for(let k=0;k<8;k++){ const d=delay+k*55; proj(A[0]+rnd(-6,6),A[1],T[0]+rnd(-8,8),T[1]+rnd(-3,4),{dur:620,delay:d,arc:22,shape:'arrow'}); }
    setTimeout(()=>shakeUnit(toId),delay+650);
    return 1050;
  }
  if(kind==='cannon'||kind==='tank'){
    const n=kind==='tank'?2:2;
    for(let k=0;k<n;k++){ const d=delay+k*480, mx=A[0]+dirX*9;
      flash(mx,A[1]+2,1.3,d); smoke(mx,A[1]+2,1.2,d+40,kind==='tank');
      proj(mx,A[1]+2,T[0]+rnd(-5,5),T[1]+rnd(-2,3),{dur:kind==='tank'?200:460,delay:d,arc:kind==='tank'?0:Math.hypot(T[0]-A[0],T[1]-A[1])*.12,shape:kind==='tank'?'tracer':'ball',onHit:()=>hit(T[0],T[1],true,0)}); }
    return 1150;
  }
  if(kind==='broadside'){
    const W=[-9,-5,-1,3,7];
    [0,620].forEach(v=>W.forEach((w,k)=>{ const d=delay+v+k*70, x=A[0]+w, y=A[1]+3;
      flash(x,y,.9,d); smoke(x,y,1,d+30);
      proj(x,y,T[0]+w*.6+rnd(-3,3),T[1]+rnd(-2,3),{dur:300,delay:d,arc:3,shape:'ball',onHit:()=>hit(T[0]+w*.6,T[1],k%2===0,0)}); }));
    return 1400;
  }
  if(kind==='bomb'){
    shooters.slice(0,2).forEach((f,k)=>{ const [x,y]=figXY(f), d=delay+k*350;
      proj(x,y+3,T[0]+rnd(-5,5),T[1]+rnd(-2,2),{dur:620,delay:d,arc:-6,shape:'bomb',onHit:()=>{ burst(T[0]+rnd(-4,4),T[1],1.5); smoke(T[0],T[1]-3,1.6,150,true); shakeUnit(toId); }}); });
    return 1200;
  }
  if(kind==='clash'||kind==='ram'){
    lunge(fromId,T[0],T[1]+8,delay);
    const mx=A[0]+(T[0]-A[0])*.6, my=A[1]+(T[1]-A[1])*.6;
    [180,330,480].forEach(v=>{ if(kind==='ram') splash(mx,my+4,1,delay+v); else sparks(mx+rnd(-4,4),my+rnd(-3,3),delay+v); });
    setTimeout(()=>{ puff(T[0],T[1]+9,.7); shakeUnit(toId); },delay+260);
    return 900;
  }
  return 0;
}

/* ---------- casualties: knock the toys over where everyone can see ---------- */
function knockDown(ids,delay=0){
  ids.forEach((id,j)=>uFigs(id).forEach((f,k)=>{
    const d=delay+j*120+k*70, end=stRot(f,'ko');
    if(Math.abs(f.rot-end)<1) return;
    if(f.u.t==='ship'||f.u.t==='gal'||f.u.t==='arm'||f.u.t==='plane'){ const [x,y]=figXY(f); burst(x,y,1.3,d); smoke(x,y-4,1.5,d+150,true); }
    fxAnim(460,d,p=>{ const e=easeBack(p); f.rot=end*e; f.op=1-(.22*p); },()=>{ f.rot=end; f.op=.78; puff(f.x,f.y,.8); });
  }));
}
