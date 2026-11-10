/* The Daily Order: board drawing helpers and battle registry */
const NS = 'http://www.w3.org/2000/svg';
const PG = { list: [], add(b){ this.list.push(b); } };

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
/* TOON: the daily's cartoon map. Flat colour, ink outlines, less texture. Set by buildBoard. */
let TOON=false;
const INK='#1c1a17';
function toon(c){ const m=/^#([0-9a-f]{6})$/i.exec(c||''); if(!m) return c; const n=parseInt(m[1],16); let r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255;
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b); let hh=0, ss=0, l=(mx+mn)/2; const d=mx-mn;
  if(d){ ss=l>.5?d/(2-mx-mn):d/(mx+mn); hh= mx===r?((g-b)/d+(g<b?6:0)):mx===g?((b-r)/d+2):((r-g)/d+4); hh/=6; }
  ss=Math.min(1,ss*1.25+.06); l=l+(.66-l)*.3;
  const q=l<.5?l*(1+ss):l+ss-l*ss, p=2*l-q, f=t=>{ t=(t+1)%1; return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p; };
  return '#'+[f(hh+1/3),f(hh),f(hh-1/3)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join(''); }
const felt0 = (c,H=400) => `<rect width="400" height="${H}" fill="${c}"/><rect width="400" height="${H}" fill="url(#speck)"/>`;
const felt = (c,H=400) => TOON ? `<rect width="400" height="${H}" fill="${toon(c)}"/>` : felt0(c,H);
const seaBg = (h=400) => TOON ? `<rect width="400" height="${h}" fill="#46b3c4"/><rect width="400" height="${h}" fill="url(#twaves)" opacity=".8"/>` : `<rect width="400" height="${h}" fill="#5d9bc0"/><rect width="400" height="${h}" fill="url(#waves)"/>`;
const land = (d,c='#8fa765') => TOON ? `<path d="${d}" fill="${toon(c)}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` : `<path d="${d}" fill="${c}"/><path d="${d}" fill="url(#speck)"/><path d="${d}" fill="none" stroke="#e6d6a2" stroke-width="3" opacity=".8"/>`;
const sea = d => TOON ? `<path d="${d}" fill="#46b3c4" stroke="${INK}" stroke-width="2"/><path d="${d}" fill="url(#twaves)" opacity=".8"/>` : `<path d="${d}" fill="#5d9bc0"/><path d="${d}" fill="url(#waves)"/><path d="${d}" fill="none" stroke="#e6d6a2" stroke-width="2.5" opacity=".7"/>`;
const river = (d,w) => TOON ? `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w+3.5}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#4aa8d0" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#bfe6f4" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="5 11"/>` : `<path d="${d}" fill="none" stroke="#3f7fa6" stroke-width="${w+3}" stroke-linecap="round" opacity=".55"/><path d="${d}" fill="none" stroke="#5d9bc0" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#9ccbe3" stroke-width="${(w*.35).toFixed(1)}" stroke-linecap="round" opacity=".55" stroke-dasharray="6 9"/>`;
const road = d => TOON ? `<path d="${d}" fill="none" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f4e7c3" stroke-width="5.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#b49a5c" stroke-width="1" stroke-dasharray="4 5"/>` : `<path d="${d}" fill="none" stroke="#d8c596" stroke-width="5" stroke-linecap="round" opacity=".9"/><path d="${d}" fill="none" stroke="#a88c58" stroke-width="1" stroke-dasharray="4 4"/>`;
/* hills: a relief map hill, with cast shadow, stepped contours, hill shading and hachures */
function smoothPath(P){
  const n=P.length; let d=`M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for(let i=0;i<n;i++){ const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; }
  return d+'Z';
}
function hillPts(cx,cy,rx,ry,ph,j,N=40){
  const P=[]; for(let i=0;i<N;i++){ const a=i/N*Math.PI*2, r=1+Math.sin(2*a+ph[0])*.07*j+Math.sin(3*a+ph[1])*.06+Math.sin(5*a+ph[2])*.035*j;
    P.push([cx+Math.cos(a)*rx*r, cy+Math.sin(a)*ry*r, a, r]); }
  return P;
}
function hillToon(cx,cy,rx,ry,n){
  const R=rng(Math.round(cx*7+cy*13)), ph=[R()*6.3,R()*6.3,R()*6.3], L=3, cols=['#e6b64a','#efc65e','#f6da86'];
  let s=`<g class="hill"><path d="${smoothPath(hillPts(cx+rx*.05,cy+ry*.28,rx,ry,ph,1))}" fill="#2a2008" opacity=".18"/>`;
  for(let i=0;i<L;i++){ const k=1-i*.3, d=smoothPath(hillPts(cx-rx*.03*i, cy-ry*.3*i/L*2, rx*k, ry*k, ph, 1-i*.15));
    s+=`<path d="${d}" fill="${cols[i]}" stroke="${INK}" stroke-width="${i?1.2:2}" stroke-linejoin="round"/>`; }
  return s+`</g>`;
}
function hill(cx,cy,rx,ry,n=3){
  if(TOON) return hillToon(cx,cy,rx,ry,n);
  const R=rng(Math.round(cx*7+cy*13)), ph=[R()*6.3,R()*6.3,R()*6.3], L=Math.max(4,n+2);
  const cols=['#7f8c4c','#939d5a','#a8ad6a','#bcbb7c','#cdc68f','#dcd2a2'];
  let s=`<g class="hill">`;
  s+=`<path d="${smoothPath(hillPts(cx+rx*.07,cy+ry*.3,rx*1.02,ry*1.05,ph,1))}" fill="#2a2008" opacity=".22"/>`;
  const P0=hillPts(cx,cy,rx,ry,ph,1);
  /* hachures: short strokes running downhill, heavier on the shadow side */
  P0.forEach(([x,y,a,r],i)=>{ const sh=Math.max(0,Math.cos(a-0.8)), len=4+sh*5+R()*2;
    const nx=Math.cos(a)*ry, ny=Math.sin(a)*rx, k=Math.hypot(nx,ny)||1;
    s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${(nx/k*len).toFixed(1)} ${(ny/k*len).toFixed(1)}" stroke="#4a3a1c" stroke-width="${(.7+sh*.5).toFixed(2)}" stroke-linecap="round" opacity="${(.25+sh*.45).toFixed(2)}"/>`; });
  for(let i=0;i<L;i++){
    const k=1-i/L*.82, P=hillPts(cx-rx*.04*i/L, cy-ry*.34*i/L, rx*k, ry*k, ph, 1-i*.12), d=smoothPath(P);
    s+=`<path d="${d}" fill="${cols[Math.min(i,cols.length-1)]}"/><path d="${d}" fill="url(#hshade)"/><path d="${d}" fill="none" stroke="#5a4320" stroke-width="${i?'.6':'1'}" opacity="${i?'.45':'.6'}"/>`;
  }
  return s+`</g>`;
}
const mtn = (x,y,s,cap='#cfc3a0') => TOON ? `<path d="M${x-s} ${y} L${x-s*.12} ${y-s*1.05} L${x+s} ${y} Z" fill="#b9a57a" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><path d="M${x-s*.12} ${y-s*1.05} L${x-s*.4} ${y-s*.72} L${x-s*.16} ${y-s*.78} L${x+s*.05} ${y-s*.66} L${x+s*.22} ${y-s*.8} Z" fill="#f7f1e1" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>` : `<path d="M${x-s} ${y} L${x-s*.12} ${y-s*1.05} L${x+s} ${y} Z" fill="#a39674"/><path d="M${x-s*.12} ${y-s*1.05} L${x+s} ${y} L${x+s*.15} ${y} Z" fill="#6f6448"/><path d="M${x-s*.12} ${y-s*1.05} L${x-s*.4} ${y-s*.72} L${x-s*.16} ${y-s*.78} L${x+s*.05} ${y-s*.66} L${x+s*.22} ${y-s*.8} Z" fill="${cap}"/>`;
const treeToon = (x,y,s,c) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"><ellipse cx="1" cy="1" rx="5.5" ry="1.8" fill="rgba(0,0,0,.2)"/><rect x="-1.4" y="-6.5" width="2.8" height="7.5" rx="1" fill="#8a5a32" stroke="${INK}" stroke-width="1"/><circle cx="0" cy="-11" r="6.6" fill="${toon(c)}" stroke="${INK}" stroke-width="1.3"/><path d="M-3.4 -13 q1.4 -2.6 3.8 -2.8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.3" stroke-linecap="round"/></g>`;
const tree = (x,y,s=1,c='#3b6b2b') => TOON ? treeToon(x,y,s,c) : `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"><ellipse cx="0" cy="1" rx="6" ry="2" fill="rgba(0,0,0,.25)"/><rect x="-1.2" y="-7" width="2.4" height="8" rx="1" fill="#6b4a2b"/><circle cx="0" cy="-11" r="6.5" fill="${c}"/><circle cx="-2" cy="-13.2" r="2.6" fill="rgba(255,255,255,.18)"/></g>`;
/* spots where toys stand, so trees never hide them: [x, y, r] in board units, set while a board is drawn */
let TREE_AVOID = [];
const treeClear = (x,y) => !TREE_AVOID.some(([ax,ay,ar])=>Math.hypot(x-ax,(y-ay)*1.15)<ar);
function treeAvoid(b){
  const A=[], m=b&&b.m; if(!m) return A;
  const add=(p,r)=>{ if(p&&p.length>=2&&isFinite(p[0])&&isFinite(p[1])&&p[2]!=='off') A.push([p[0],p[1]-6,r]); };
  Object.values(m.start||{}).forEach(p=>add(p,26));
  (b.units||[]).forEach(u=>{ if(!(m.start||{})[u.id] && u.p) add(u.p[0]||Object.values(u.p)[0],26); });
  (m.scenes||[]).forEach(sc=>Object.values(sc.u||{}).forEach(p=>add(p,26)));
  Object.values(m.fail||{}).forEach(f=>Object.values(f.u||{}).forEach(p=>add(p,26)));
  (m.zones||[]).forEach(z=>A.push([z[2],z[3]-4,Math.max(20,z[4]*.95)]));
  return A;
}
function trees(seed,n,box,test,cols){
  const r=rng(seed), pts=[]; let g=0;
  while(pts.length<n && g++<n*30){const x=box[0]+r()*(box[1]-box[0]), y=box[2]+r()*(box[3]-box[2]); if(test(x,y) && treeClear(x,y)) pts.push([x,y,.8+r()*.45,cols[Math.floor(r()*cols.length)]]);}
  pts.sort((a,b)=>a[1]-b[1]);
  return pts.map(p=>tree(p[0],p[1],p[2],p[3])).join('');
}
const house = (x,y,roof='#b5432f') => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="6" ry="1.8" fill="rgba(0,0,0,.25)"/><rect x="-4.5" y="-6" width="9" height="7" fill="#efe3c4" stroke="#5a4a35" stroke-width=".5"/><path d="M-5.6 -6 L0 -11 L5.6 -6 Z" fill="${roof}" stroke="#5a4a35" stroke-width=".5"/><rect x="-1" y="-3" width="2" height="4" fill="#5a4a35"/></g>`;
const ruin = (x,y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="6" ry="1.8" fill="rgba(0,0,0,.25)"/><path d="M-4.5 1 L-4.5 -7 L-1 -4 L1 -8 L4.5 -5 L4.5 1 Z" fill="#b9b2a2" stroke="#4f4a40" stroke-width=".5"/><rect x="-2.5" y="-3" width="1.6" height="2" fill="#4f4a40"/><rect x="1" y="-4" width="1.6" height="2" fill="#4f4a40"/></g>`;
const tent = (x,y,c) => `<path d="M${x-8} ${y} L${x} ${y-10} L${x+8} ${y} Z" fill="${c}" stroke="#6b5838" stroke-width=".6"/><path d="M${x} ${y-10} L${x} ${y}" stroke="#6b5838" stroke-width=".6"/>`;
const label = (x,y,t,size=11,rot=0) => `<text class="lbl" x="${x}" y="${y}" font-size="${size}" text-anchor="middle"${rot?` transform="rotate(${rot} ${x} ${y})"`:''}>${t}</text>`;
const city = (x,y,name,size=9,dy=-6,anchor='middle') => `<circle cx="${x}" cy="${y}" r="3.2" fill="#1f1a14" stroke="#f3ead6" stroke-width="1.4"/><text class="lbl" x="${x}" y="${y+dy}" font-size="${size}" text-anchor="${anchor}">${name}</text>`;
const compass = (x,y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="rgba(246,238,216,.9)" stroke="#1f1a14" stroke-width="1"/><path d="M0 -9 L3.6 3 L0 1 L-3.6 3 Z" fill="#d23f2c"/><text y="9.8" text-anchor="middle" font-size="6.5" font-family="Archivo, sans-serif" font-weight="800" fill="#1f1a14">N</text></g>`;
const end = (H=400) => TOON ? '' : `<rect width="400" height="${H}" fill="url(#grid)"/><rect width="400" height="${H}" fill="url(#vig)"/><rect x="3" y="3" width="394" height="${H-6}" rx="3" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.2"/>`;
const night = ph => `<rect class="ph" data-show="${ph}" width="400" height="400" fill="#14244a" fill-opacity=".4"/>`;
const snowfall = ph => `<g class="ph" data-show="${ph}"><rect width="400" height="400" fill="#f4f6f8" fill-opacity=".28"/><rect width="400" height="400" fill="url(#snow)"/></g>`;
function storm(ph,seed=7,y0=0,y1=400){
  const r=rng(seed);
  let c=`<g class="ph" data-show="${ph}"><rect width="400" height="400" fill="#2b3442" fill-opacity=".25"/><g opacity=".9">`;
  for(let i=0;i<60;i++){const x=r()*400, y=y0+r()*(y1-y0); c+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} l-4 9" stroke="#d3dde8" stroke-width="1" opacity=".7"/>`;}
  [[60,40,62,18],[170,30,72,22],[280,44,66,18],[360,30,52,16]].forEach(e=>c+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#5f6672"/><ellipse cx="${e[0]-6}" cy="${e[1]-6}" rx="${(e[2]*.7).toFixed(1)}" ry="${(e[3]*.6).toFixed(1)}" fill="#7a828e"/>`);
  return c+`</g></g>`;
}
const U = (id,s,t,n,name,why,p) => ({id,s,t,n,name,why,p});
