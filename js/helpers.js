/* The Daily Order: board drawing helpers and battle registry */
const NS = 'http://www.w3.org/2000/svg';
const PG = { list: [], add(b){ this.list.push(b); } };

function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const felt = c => `<rect width="400" height="400" fill="${c}"/><rect width="400" height="400" fill="url(#speck)"/>`;
const seaBg = () => `<rect width="400" height="400" fill="#5d9bc0"/><rect width="400" height="400" fill="url(#waves)"/>`;
const land = (d,c='#8fa765') => `<path d="${d}" fill="${c}"/><path d="${d}" fill="url(#speck)"/><path d="${d}" fill="none" stroke="#e6d6a2" stroke-width="3" opacity=".8"/>`;
const sea = d => `<path d="${d}" fill="#5d9bc0"/><path d="${d}" fill="url(#waves)"/><path d="${d}" fill="none" stroke="#e6d6a2" stroke-width="2.5" opacity=".7"/>`;
const river = (d,w) => `<path d="${d}" fill="none" stroke="#3f7fa6" stroke-width="${w+3}" stroke-linecap="round" opacity=".55"/><path d="${d}" fill="none" stroke="#5d9bc0" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#9ccbe3" stroke-width="${(w*.35).toFixed(1)}" stroke-linecap="round" opacity=".55" stroke-dasharray="6 9"/>`;
const road = d => `<path d="${d}" fill="none" stroke="#d8c596" stroke-width="5" stroke-linecap="round" opacity=".9"/><path d="${d}" fill="none" stroke="#a88c58" stroke-width="1" stroke-dasharray="4 4"/>`;
function hill(cx,cy,rx,ry,n){
  let s = `<ellipse cx="${cx}" cy="${cy+3}" rx="${rx}" ry="${ry}" fill="rgba(0,0,0,.14)"/>`;
  for(let i=0;i<n;i++){const k=1-i/n*.72; s+=`<ellipse cx="${cx}" cy="${(cy-i*ry*.16).toFixed(1)}" rx="${(rx*k).toFixed(1)}" ry="${(ry*k).toFixed(1)}" fill="rgba(255,250,225,.12)" stroke="rgba(50,40,20,.3)" stroke-width=".8"/>`;}
  return s;
}
const mtn = (x,y,s,cap='#cfc3a0') => `<path d="M${x-s} ${y} L${x-s*.12} ${y-s*1.05} L${x+s} ${y} Z" fill="#a39674"/><path d="M${x-s*.12} ${y-s*1.05} L${x+s} ${y} L${x+s*.15} ${y} Z" fill="#6f6448"/><path d="M${x-s*.12} ${y-s*1.05} L${x-s*.4} ${y-s*.72} L${x-s*.16} ${y-s*.78} L${x+s*.05} ${y-s*.66} L${x+s*.22} ${y-s*.8} Z" fill="${cap}"/>`;
const tree = (x,y,s=1,c='#3b6b2b') => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"><ellipse cx="0" cy="1" rx="6" ry="2" fill="rgba(0,0,0,.25)"/><rect x="-1.2" y="-7" width="2.4" height="8" rx="1" fill="#6b4a2b"/><circle cx="0" cy="-11" r="6.5" fill="${c}"/><circle cx="-2" cy="-13.2" r="2.6" fill="rgba(255,255,255,.18)"/></g>`;
function trees(seed,n,box,test,cols){
  const r=rng(seed), pts=[]; let g=0;
  while(pts.length<n && g++<n*30){const x=box[0]+r()*(box[1]-box[0]), y=box[2]+r()*(box[3]-box[2]); if(test(x,y)) pts.push([x,y,.8+r()*.45,cols[Math.floor(r()*cols.length)]]);}
  pts.sort((a,b)=>a[1]-b[1]);
  return pts.map(p=>tree(p[0],p[1],p[2],p[3])).join('');
}
const house = (x,y,roof='#b5432f') => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="6" ry="1.8" fill="rgba(0,0,0,.25)"/><rect x="-4.5" y="-6" width="9" height="7" fill="#efe3c4" stroke="#5a4a35" stroke-width=".5"/><path d="M-5.6 -6 L0 -11 L5.6 -6 Z" fill="${roof}" stroke="#5a4a35" stroke-width=".5"/><rect x="-1" y="-3" width="2" height="4" fill="#5a4a35"/></g>`;
const ruin = (x,y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="6" ry="1.8" fill="rgba(0,0,0,.25)"/><path d="M-4.5 1 L-4.5 -7 L-1 -4 L1 -8 L4.5 -5 L4.5 1 Z" fill="#b9b2a2" stroke="#4f4a40" stroke-width=".5"/><rect x="-2.5" y="-3" width="1.6" height="2" fill="#4f4a40"/><rect x="1" y="-4" width="1.6" height="2" fill="#4f4a40"/></g>`;
const tent = (x,y,c) => `<path d="M${x-8} ${y} L${x} ${y-10} L${x+8} ${y} Z" fill="${c}" stroke="#6b5838" stroke-width=".6"/><path d="M${x} ${y-10} L${x} ${y}" stroke="#6b5838" stroke-width=".6"/>`;
const label = (x,y,t,size=11,rot=0) => `<text class="lbl" x="${x}" y="${y}" font-size="${size}" text-anchor="middle"${rot?` transform="rotate(${rot} ${x} ${y})"`:''}>${t}</text>`;
const city = (x,y,name,size=9,dy=-6,anchor='middle') => `<circle cx="${x}" cy="${y}" r="3.2" fill="#1f1a14" stroke="#f3ead6" stroke-width="1.4"/><text class="lbl" x="${x}" y="${y+dy}" font-size="${size}" text-anchor="${anchor}">${name}</text>`;
const compass = (x,y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="rgba(246,238,216,.9)" stroke="#1f1a14" stroke-width="1"/><path d="M0 -9 L3.6 3 L0 1 L-3.6 3 Z" fill="#d23f2c"/><text y="9.8" text-anchor="middle" font-size="6.5" font-family="Archivo, sans-serif" font-weight="800" fill="#1f1a14">N</text></g>`;
const end = () => `<rect width="400" height="400" fill="url(#grid)"/><rect width="400" height="400" fill="url(#vig)"/><rect x="3" y="3" width="394" height="394" rx="3" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.2"/>`;
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
