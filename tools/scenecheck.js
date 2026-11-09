/* The Daily Order: scene checker. Runs inside the game page (see check_scenes.py).
   It replays every scene of a mystery battle (the real battle and every wrong order) and flags animation that
   does not make military sense: units walking through each other untouched, enemies left standing face to face,
   shots beyond the weapon's reach, the dead or departed still fighting, casualties with no cause, captions that
   promise fire or a charge the animation never shows, wrong orders with no specific outcome, and missing sources.
   It cannot judge history: every reveal scene still needs a human read against the sources listed in m.sources. */
(function(){
const RANGE={clash:60,ram:50,musket:120,rifle:150,arrows:170,broadside:130,cannon:340,tank:280,bomb:9999,torpedo:400};
const PASS=30, FACE=40, STOP=new Set(['british','american','french','german','light','heavy','corps','force','their','under','army']);
function plan(list,before){
  /* returns per scene: {p0,p1} positions by unit id with status */
  let prev=before, dead=new Set(), out=[];
  list.forEach(sc=>{
    const p0={}, p1={};
    D.sc.units.forEach(u=>{ const a=posFor(u,prev), b=posFor(u,sc.cur); p0[u.id]=a; p1[u.id]=b; });
    out.push({sc,p0,p1,dead:new Set(dead)});
    (sc.ko||[]).forEach(id=>dead.add(id));
    D.sc.units.forEach(u=>{ const st=p1[u.id][2]; if(st==='ko'||st==='exit') dead.add(u.id); }); /* 'off' units can still arrive later */
    prev=sc.cur;
  });
  return out;
}
const side=id=>(D.sc.units.find(u=>u.id===id)||{}).s;
const nameOf=id=>(D.sc.units.find(u=>u.id===id)||{name:id}).name;
const gone=st=>st==='exit'||st==='off';
function words(u,m){ const w=new Set(); (u.name||'').toLowerCase().replace(/[()'.,]/g,' ').split(/\s+/).forEach(x=>{ if(x.length>4&&!STOP.has(x)) w.add(x.replace(/s$/,'')); });
  ((m.alias||{})[u.id]||[]).forEach(x=>w.add(x.toLowerCase().replace(/s$/,''))); return [...w]; }
function check(label,list,before,ctx){
  const m=D.sc.m, F=[], push=(lvl,i,msg)=>F.push({lvl,where:`${label} · scene ${i+1}${list[i]&&list[i].t?` "${list[i].t}"`:''}`,msg});
  plan(list,before).forEach(({sc,p0,p1,dead},i)=>{
    const fire=sc.fire||[], ko=new Set(sc.ko||[]), idle=new Set(sc.idle||[]);
    const pair=(a,b)=>fire.some(f=>(f[0]===a&&f[1]===b)||(f[0]===b&&f[1]===a));
    const acts=id=>fire.some(f=>f[0]===id||f[1]===id)||ko.has(id);
    const ids=D.sc.units.map(u=>u.id).filter(id=>!dead.has(id));
    const moved=id=>Math.hypot(p1[id][0]-p0[id][0],p1[id][1]-p0[id][1]);
    // A + B: opposing units passing through or standing face to face with no fight between them
    for(let x=0;x<ids.length;x++) for(let y=x+1;y<ids.length;y++){
      const a=ids[x], b=ids[y]; if(side(a)===side(b)) continue;
      if(ctx&&ctx.toy&&i===0) continue; /* placing the toy: the next scene resolves it */
      const ua=D.sc.units.find(u=>u.id===a), ub=D.sc.units.find(u=>u.id===b); if(ua.t==='plane'||ub.t==='plane') continue; /* aircraft fly over */
      const sa=p1[a][2]||'', sb=p1[b][2]||'';
      if(gone(sa)||gone(sb)||sa==='hide'||sb==='hide'||sa==='decoy'||sb==='decoy') continue;
      if(pair(a,b)) continue;
      let min=1e9; for(let k=3;k<=20;k++){ const t=k/20, ax=p0[a][0]+(p1[a][0]-p0[a][0])*t, ay=p0[a][1]+(p1[a][1]-p0[a][1])*t, bx=p0[b][0]+(p1[b][0]-p0[b][0])*t, by=p0[b][1]+(p1[b][1]-p0[b][1])*t; min=Math.min(min,Math.hypot(ax-bx,ay-by)); }
      const end=Math.hypot(p1[a][0]-p1[b][0],p1[a][1]-p1[b][1]);
      const koNow=ko.has(a)||ko.has(b)||sa==='ko'||sb==='ko';
      if(min<PASS && end>=PASS && !koNow) push('error',i,`${nameOf(a)} and ${nameOf(b)} pass within ${Math.round(min)} of each other and nobody fights.`);
      else if(end<FACE && !koNow) push('warn',i,`${nameOf(a)} and ${nameOf(b)} end ${Math.round(end)} apart with no fight between them.`);
    }
    // C, D, E: fire checks
    fire.forEach(([a,b,k])=>{
      const kind=k||'musket';
      if(!p1[a]||!p1[b]) return push('error',i,`Fire names a unit that does not exist: ${a} → ${b}.`);
      if(dead.has(a)) push('error',i,`${nameOf(a)} fires after being knocked out or leaving the field.`);
      if(dead.has(b)) push('error',i,`${nameOf(b)} is shot at after being knocked out or leaving the field.`);
      if(gone(p1[a][2]||'')) push('error',i,`${nameOf(a)} fires while off the board.`);
      if(side(a)===side(b)) push('error',i,`${nameOf(a)} fires on its own side (${nameOf(b)}).`);
      const d=Math.hypot(p1[a][0]-p1[b][0],p1[a][1]-p1[b][1]), r=((m.ranges||{})[kind])||RANGE[kind]||140;
      if(d>r) push('error',i,`${nameOf(a)} hits ${nameOf(b)} with ${kind} from ${Math.round(d)} away (limit ${r}).`);
    });
    // D: the dead moving
    ids.length; D.sc.units.forEach(u=>{ if(dead.has(u.id) && moved(u.id)>4 && !gone(p1[u.id][2]||'')) push('error',i,`${u.name} moves after being knocked out.`); });
    // F: casualties with no cause
    D.sc.units.forEach(u=>{ const newly=!dead.has(u.id) && (ko.has(u.id)||(p1[u.id][2]==='ko'&&(p0[u.id][2]||'')!=='ko'));
      if(newly && !fire.some(f=>f[1]===u.id)) push('warn',i,`${u.name} falls but nobody fires on them in this scene.`); });
    // G: placed toy idle in a wrong order
    if(ctx&&ctx.toy&&i===list.length-1 && !acts(ctx.toy) && !idle.has(ctx.toy)) push('warn',i,`The placed toy (${nameOf(ctx.toy)}) takes no part. Mark it idle if that is the point.`);
    // H: caption vs animation
    const txt=(sc.b||'')+' '+(sc.t||'');
    if(/\b(fire|fires|fired|firing|volleys?|shoot|shot|guns? firing|bombard)/i.test(txt) && !fire.length && !/never fire|never fires|without firing/i.test(txt)) push('warn',i,'The caption mentions firing but nobody fires.');
    if(/\bcharg(e|es|ed|ing)\b/i.test(txt) && !fire.some(f=>f[2]==='clash') && !ids.some(id=>moved(id)>15)) push('warn',i,'The caption mentions a charge but nothing moves or clashes.');
    D.sc.units.forEach(u=>{ if(dead.has(u.id)||u.t==='cmd'||idle.has(u.id)) return; const w=words(u,m); const named=w.some(x=>new RegExp('\\b'+x+'s?\\b','i').test(txt));
      if(named && moved(u.id)<4 && !acts(u.id) && i>0) push('info',i,`The caption names ${u.name}, who neither moves nor fights here.`); });
  });
  return F;
}
window.sceneCheck=function(n){
  const sc=PGD.byN[n]; if(!sc||!sc.m) return {n,name:sc&&sc.name,findings:[{lvl:'error',where:'battle',msg:'No mystery data.'}]};
  openDaily(n,true); const m=sc.m, out=[];
  out.push(...check('Real battle',mRevealList(),{i:0,ph:0}));
  m.toys.forEach(([u])=>m.zones.forEach(([z])=>{
    if(u===m.ans.u&&z===m.ans.z) return;
    if(!(m.fail&&m.fail[u+'@'+z])) out.push({lvl:'warn',where:`Wrong order ${u} → ${z}`,msg:'No outcome written for this exact combination; it falls back to the zone outcome.'});
    else if(!m.fail[u+'@'+z].b) out.push({lvl:'warn',where:`Wrong order ${u} → ${z}`,msg:'Outcome has no caption of its own.'});
    out.push(...check(`Wrong order ${mToyLabel(u)} → ${mz(z)[1]}`,mFailList(u,z,false),startCur(),{toy:u}));
  }));
  if(!m.sources||!m.sources.length) out.push({lvl:'error',where:'battle',msg:'No sources listed. Every real-battle scene needs a source a reader can check.'});
  return {n,name:sc.name,findings:out};
};
})();
