/* The Daily Order: collectible troop cards.
   Each card belongs to an era, so a 1781 horseman and a 1940 tank never share a stat line.
   Stats run 1 to 5: Speed, Punch (hitting power), Protection, Range. */
const CARDS = [
  // Cowpens, 1781
  {id:'militia1781', set:'cowpens', name:'Patriot militia', era:'American Revolution, 1781', t:'inf-blk', side:'g', st:[3,2,1,3],
   good:'Aimed fire from a good position', beat:'Bayonet charges, cavalry in the open',
   fact:'Many were frontier men who shot well but carried no bayonets, so a charge was their nightmare.'},
  {id:'cont1781', set:'cowpens', name:'Continental regulars', era:'American Revolution, 1781', t:'hvy-blk', side:'g', st:[2,4,3,3],
   good:'Holding a line, volley fire, the bayonet', beat:'Being hit from the side or rear',
   fact:'Years of drill made them a match for British regulars by 1781.'},
  {id:'drag1781', set:'cowpens', name:'Continental light dragoons', era:'American Revolution, 1781', t:'cav-blk', side:'g', st:[5,3,2,1],
   good:'Charging troops already in disorder', beat:'Steady infantry with bayonets fixed',
   fact:'At Cowpens, William Washington led only around a hundred horsemen.'},
  {id:'redcoat1781', set:'cowpens', name:'British line infantry', era:'American Revolution, 1781', t:'inf-blk', side:'t', st:[2,4,3,3],
   good:'The bayonet charge', beat:'Losing formation, fire from the flanks',
   fact:'Trained to fire, then close fast with the bayonet before the enemy could reload.'},
  {id:'legion1781', set:'cowpens', name:'British Legion dragoons', era:'American Revolution, 1781', t:'cav-blk', side:'t', st:[5,4,2,1],
   good:'Riding down troops who break and run', beat:'Formed infantry, rough ground',
   fact:'A Loyalist unit raised in America and led by Banastre Tarleton.'},
  // Sedan, 1940
  {id:'panzer1940', set:'sedan', name:'Panzer division', era:'Second World War, 1940', t:'arm', side:'g', st:[5,4,4,3],
   good:'Fast, deep advances through a gap', beat:'Rivers, anti-tank guns, running out of fuel',
   fact:'Many German tanks in 1940 were lighter than French ones. Speed and radios made the difference.'},
  {id:'stuka1940', set:'sedan', name:'Stuka dive bomber', era:'Second World War, 1940', t:'stuka', side:'g', st:[4,4,1,5],
   good:'Precise strikes on small targets, shock', beat:'Fighter planes, anti-aircraft fire',
   fact:'Some carried sirens, nicknamed the Jericho trumpet, that wailed as they dived.'},
  {id:'pio1940', set:'sedan', name:'Assault engineers', era:'Second World War, 1940', t:'inf', side:'g', st:[3,3,2,2],
   good:'Crossing rivers, clearing bunkers', beat:'Machine guns while out on open water',
   fact:'At Sedan they crossed the Meuse in rubber boats.'},
  {id:'res1940', set:'sedan', name:'French reservist infantry', era:'Second World War, 1940', t:'inf', side:'t', st:[1,2,3,3],
   good:'Holding prepared positions', beat:'Air attack, sudden shock',
   fact:'Many were older men, recently called up, with little recent training.'},
  {id:'bunker1940', set:'sedan', name:'River bunkers', era:'Second World War, 1940', t:'bunker', side:'t', st:[1,3,5,4],
   good:'Covering a river crossing', beat:'Precise bombing, engineers working round the side',
   fact:'Several bunkers in the Sedan sector were still unfinished in May 1940.'},
  // The Nile, 1798
  {id:'sol74_1798', set:'nile', name:'74-gun ship of the line', era:'French Revolutionary Wars, 1798', t:'ship', side:'g', st:[3,4,4,4],
   good:'Broadsides, fighting in a line', beat:'Being fired on from both sides at once',
   fact:'The workhorse of the age. Almost all of Nelson\'s fleet at the Nile were 74s.'},
  {id:'orient1798', set:'nile', name:'First-rate flagship', era:'French Revolutionary Wars, 1798', t:'ship', side:'t', st:[1,5,5,4],
   good:'Overwhelming firepower', beat:'Fire on board, being swarmed',
   fact:'L\'Orient carried about 120 guns, one of the biggest warships afloat.'},
  {id:'battery1798', set:'nile', name:'Shore battery', era:'French Revolutionary Wars, 1798', t:'art', side:'t', st:[1,3,4,4],
   good:'Guarding a channel close by', beat:'Ships that stay out of its range',
   fact:'The guns on Aboukir Island had little effect on the battle.'}
];
const CARD_SETS = {cowpens:['Cowpens, 1781',1], sedan:['Sedan, 1940',14], nile:['The Nile, 1798',17]};
const CARD_KEY='pg-cards-v1';
const CARDBY = Object.fromEntries(CARDS.map(c=>[c.id,c]));
let OWNED = (()=>{ try{ return new Set(JSON.parse(localStorage.getItem(CARD_KEY)||'[]')); }catch(e){ return new Set(); } })();
function unlockCards(ids){ const nw=ids.filter(id=>CARDBY[id] && !OWNED.has(id)); nw.forEach(id=>OWNED.add(id)); try{ localStorage.setItem(CARD_KEY,JSON.stringify([...OWNED])); }catch(e){} return nw; }
const STAT_L=['Speed','Punch','Protection','Range'];

function toySvg(c,size=96){
  return `<svg viewBox="-20 -46 40 52" width="${size}" height="${(size*1.3).toFixed(1)}" aria-hidden="true"><ellipse cx="0" cy="1.5" rx="11" ry="3" fill="rgba(0,0,0,.25)"/><g transform="translate(0 ${/plane|stuka|bomber|jet/.test(c.t)?-8:0}) scale(${/ship|gal|carrier/.test(c.t)?.78:1.25})"><use href="#u-${c.t}" ${fillAttr({s:c.side})}/></g></svg>`;
}
function cardFace(c,opts={}){
  const own=OWNED.has(c.id) || opts.peek;
  if(!own) return `<div class="tc locked"><div class="tc-toy">${toySvg(c,84)}</div><b>Locked</b><span>Play ${CARD_SETS[c.set][0]} to collect</span></div>`;
  return `<div class="tc ${c.side}"><div class="tc-band"><span class="tc-era">${c.era}</span></div><div class="tc-toy">${toySvg(c)}</div><h3>${c.name}</h3>
    <div class="tc-stats">${c.st.map((v,i)=>`<div class="tc-s"><span>${STAT_L[i]}</span><i>${[1,2,3,4,5].map(k=>`<em class="${k<=v?'on':''}"></em>`).join('')}</i></div>`).join('')}</div>
    <p class="tc-g"><b>Strong at</b> ${c.good}</p><p class="tc-b"><b>Beaten by</b> ${c.beat}</p><p class="tc-f">${c.fact}</p></div>`;
}
function showCard(id,extra=''){
  const c=CARDBY[id]; if(!c) return;
  let m=$('#tcard'); if(!m){ m=document.createElement('div'); m.id='tcard'; m.className='tcard'; document.body.appendChild(m); }
  m.innerHTML=`<div class="tc-wrap" role="dialog" aria-label="${c.name}">${cardFace(c,{peek:true})}${extra}<button type="button" class="tc-x">Close</button></div>`;
  m.hidden=false; m.classList.remove('flip'); void m.offsetWidth; m.classList.add('flip');
}
function hideCard(){ const m=$('#tcard'); if(m) m.hidden=true; }
document.addEventListener('click',e=>{
  const m=$('#tcard'); if(!m||m.hidden) return;
  if(e.target.closest('.tc-x') || e.target===m){ hideCard(); return; }
},false);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') hideCard(); });

/* ---------- the collection ---------- */
function renderCards(){
  const own=CARDS.filter(c=>OWNED.has(c.id)).length;
  let h=`<div class="pb-head"><header class="bar"><button class="back" type="button" data-home>‹ Home</button><div class="bt"><div class="bt-name">Troop cards</div><div class="bt-sub">${own} of ${CARDS.length} collected. Finish a battle to add its troops.</div></div></header></div><div class="pb-inner">`;
  Object.entries(CARD_SETS).forEach(([k,[name,n]])=>{
    const cs=CARDS.filter(c=>c.set===k);
    h+=`<h3 class="cs-h">${name}<span>${cs.filter(c=>OWNED.has(c.id)).length}/${cs.length}</span></h3><div class="cgrid">${cs.map(c=>`<button type="button" class="cmini ${OWNED.has(c.id)?c.side:'locked'}" data-card="${c.id}">${toySvg(c,58)}<b>${OWNED.has(c.id)?c.name:'Locked'}</b></button>`).join('')}</div>`;
  });
  h+=`</div>`;
  const el=$('#cards'); el.innerHTML=h; el.scrollTop=0;
}
$('#cards').addEventListener('click',e=>{
  if(e.target.closest('[data-home]')){ location.hash='home'; return; }
  const b=e.target.closest('[data-card]'); if(!b) return;
  const c=CARDBY[b.dataset.card];
  if(OWNED.has(c.id)) showCard(c.id); else { b.classList.add('nope'); setTimeout(()=>b.classList.remove('nope'),400); }
});
