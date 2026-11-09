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
,
  // Waterloo, 1815
  {id:'redcoat1815', set:'waterloo', name:'British line infantry', era:'Napoleonic Wars, 1815', t:'inf-blk', side:'g', st:[2,4,3,3],
   good:'Volley fire from a steady line or square', beat:'Massed guns firing at a line in the open',
   fact:'At Waterloo many battalions lay down behind the ridge to shelter from the French guns.'},
  {id:'guards1815', set:'waterloo', name:'Foot Guards', era:'Napoleonic Wars, 1815', t:'hvy-blk', side:'g', st:[2,4,4,3],
   good:'Holding a strongpoint, close-range volleys', beat:'Being worn down with no relief',
   fact:'Guardsmen held the walled farm of Hougoumont all day.'},
  {id:'heavycav1815', set:'waterloo', name:'British heavy cavalry', era:'Napoleonic Wars, 1815', t:'cav-blk', side:'g', st:[4,5,2,1],
   good:'Charging infantry caught in column', beat:'Losing control and riding too far',
   fact:'The Union and Household Brigades broke a French infantry corps, then paid heavily for chasing too far.'},
  {id:'prussian1815', set:'waterloo', name:'Prussian infantry', era:'Napoleonic Wars, 1815', t:'inf-blk', side:'g', st:[3,3,3,3],
   good:'Arriving on the enemy\'s flank', beat:'Long marches on muddy roads',
   fact:'Blücher\'s men marched for hours on soaked roads to reach the battle.'},
  {id:'ligne1815', set:'waterloo', name:'French line infantry', era:'Napoleonic Wars, 1815', t:'inf-blk', side:'t', st:[3,3,3,3],
   good:'Attacking in dense columns', beat:'Volley fire, cavalry on the flank',
   fact:'Veterans of many campaigns, trained to attack in deep columns.'},
  {id:'cuirass1815', set:'waterloo', name:'Cuirassiers', era:'Napoleonic Wars, 1815', t:'cav-blk', side:'t', st:[4,5,4,1],
   good:'Riding down infantry caught out of formation', beat:'Infantry squares',
   fact:'Armoured heavy cavalry. Thousands charged the allied squares at Waterloo without breaking them.'},
  {id:'garde1815', set:'waterloo', name:'Imperial Guard', era:'Napoleonic Wars, 1815', t:'hvy-blk', side:'t', st:[2,5,4,3],
   good:'Deciding a battle at the right moment', beat:'Close-range fire from a hidden line',
   fact:'Napoleon\'s veteran elite. Their retreat at Waterloo broke the whole French army.'},
  {id:'gun1815', set:'waterloo', name:'Field artillery', era:'Napoleonic Wars, 1815', t:'art', side:'t', st:[1,5,2,5],
   good:'Smashing any line it can see', beat:'Targets hidden behind a crest',
   fact:'Napoleon trained as an artillery officer and loved massed guns.'}
,
  // Hastings, 1066
  {id:'knight1066', set:'hastings', name:'Norman knight', era:'Norman Conquest, 1066', t:'cav', side:'g', st:[4,4,3,1],
   good:'Charging troops caught on open ground', beat:'Uphill charges into a solid shield wall',
   fact:'Mounted warriors with lances and swords. England had almost no cavalry of its own.'},
  {id:'archer1066', set:'hastings', name:'Norman archer', era:'Norman Conquest, 1066', t:'arch', side:'g', st:[3,2,1,4],
   good:'Shooting into a crowded line', beat:'Shields, and shooting uphill',
   fact:'The Bayeux Tapestry shows archers playing a part in the final stage of the battle.'},
  {id:'normfoot1066', set:'hastings', name:'Norman foot soldier', era:'Norman Conquest, 1066', t:'hvy', side:'g', st:[2,3,3,1],
   good:'Pressing home an attack', beat:'Axes and spears from higher ground',
   fact:'Many wore mail shirts and carried long, kite-shaped shields.'},
  {id:'housecarl1066', set:'hastings', name:'Housecarls', era:'Norman Conquest, 1066', t:'hvy', side:'t', st:[2,5,4,1],
   good:'Holding a shield wall, the two-handed axe', beat:'Being lured away from the line',
   fact:'Professional warriors who fought with fearsome two-handed axes.'},
  {id:'fyrd1066', set:'hastings', name:'The fyrd', era:'Norman Conquest, 1066', t:'spr', side:'t', st:[2,2,2,1],
   good:'Filling out the shield wall', beat:'Chasing an enemy who only seems beaten',
   fact:'Part-time soldiers called up from the shires.'}
];
const CARD_SETS = {cowpens:['Cowpens, 1781',1], sedan:['Sedan, 1940',14], nile:['The Nile, 1798',17], waterloo:['Waterloo, 1815',28], hastings:['Hastings, 1066',4]};
const CARD_KEY='pg-cards-v1';
const CARDBY = Object.fromEntries(CARDS.map(c=>[c.id,c]));
let OWNED = (()=>{ try{ return new Set(JSON.parse(localStorage.getItem(CARD_KEY)||'[]')); }catch(e){ return new Set(); } })();
function unlockCards(ids){ const nw=ids.filter(id=>CARDBY[id] && !OWNED.has(id)); nw.forEach(id=>OWNED.add(id)); try{ localStorage.setItem(CARD_KEY,JSON.stringify([...OWNED])); }catch(e){} return nw; }
const STAT_L=['Speed','Punch','Protection','Range'];

function toySvg(c,size=96){
  return `<svg viewBox="-20 -46 40 52" width="${size}" height="${(size*1.3).toFixed(1)}" aria-hidden="true"><ellipse cx="0" cy="1.5" rx="11" ry="3" fill="rgba(0,0,0,.25)"/><g transform="translate(0 ${/plane|stuka|bomber|jet/.test(c.t)?-8:0}) scale(${/ship|gal|carrier/.test(c.t)?.78:1.25})"><use href="#u-${c.t}" ${fillAttr({s:c.side})}/></g></svg>`;
}
/* ---------- the card: a collectible with a living picture ---------- */
const TYPE_L = t => /^(inf|inf-blk|inf-med|inf-mod|para)$/.test(t)?'Infantry':/^(hvy|hvy-blk)$/.test(t)?'Heavy infantry':/^spr$/.test(t)?'Spearmen':/^arch$/.test(t)?'Archers':/^cav|cav-blk$/.test(t)?'Cavalry':/^(art|art-ww|art-anc)$/.test(t)?'Artillery':t==='bunker'?'Fortification':/^arm/.test(t)?'Armour':/^(plane|stuka|bomber|jet)$/.test(t)?'Aircraft':/^(ship|ship-med|ship-ww|gal|carrier)$/.test(t)?'Warship':/^cmd/.test(t)?'Commander':/truck|wagon/.test(t)?'Transport':'Unit';
const ACT_OF = t => /^(art|art-ww|art-anc|bunker)$/.test(t)?'gun':/^arm/.test(t)?'tank':/^(plane|stuka|bomber|jet)$/.test(t)?'air':/^(ship|ship-med|ship-ww|gal|carrier)$/.test(t)?'sea':/^cav/.test(t)?'ride':/^arch$/.test(t)?'bow':/^(spr|hvy|cmd-anc)$/.test(t)?'thrust':/^cmd/.test(t)?'lead':/truck|wagon/.test(t)?'drive':'fire';
function cardArt(c){
  const a=ACT_OF(c.t), fill=c.side==='g'?'#5fb84a':'#e6b86c', ink='#1c1a17';
  const sea=a==='sea', air=a==='air';
  let bg=`<rect width="240" height="140" fill="${sea?'#bfe6f4':air?'#a9dcf2':'#cdebf6'}"/>`;
  if(air) bg+=`<g class="ca-cloud"><ellipse cx="60" cy="40" rx="26" ry="9" fill="#fff"/><ellipse cx="180" cy="26" rx="20" ry="7" fill="#fff"/><ellipse cx="150" cy="104" rx="30" ry="9" fill="#fff"/></g>`;
  else if(sea) bg+=`<rect y="88" width="240" height="52" fill="#46b3c4"/><path d="M0 88 H240" stroke="${ink}" stroke-width="2"/><g class="ca-waves" stroke="#2c8ea3" stroke-width="2" fill="none"><path d="M-20 104 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/><path d="M-12 122 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/></g>`;
  else bg+=`<path d="M0 84 Q60 66 120 80 T240 72 V140 H0Z" fill="#b6dc8a" stroke="${ink}" stroke-width="1.6"/><rect y="104" width="240" height="36" fill="#9ccc6e"/><path d="M0 104 H240" stroke="${ink}" stroke-width="2"/><g class="ca-ground" fill="#7fb257"><circle cx="30" cy="120" r="3"/><circle cx="96" cy="128" r="2.5"/><circle cx="170" cy="118" r="3"/><circle cx="214" cy="130" r="2.5"/></g>`;
  const sc = sea?2.6:air?2.4:3.1, ux = a==='ride'||a==='drive'?112:a==='air'?120:92, uy = sea?100:air?70:118;
  const unit=`<g class="ca-u"><g transform="translate(${ux} ${uy}) scale(${sc})"><ellipse cx="0" cy="1" rx="10" ry="2.6" fill="rgba(0,0,0,.2)"${sea||air?' opacity="0"':''}/><use href="#u-${c.t}" fill="${fill}" stroke="${ink}" stroke-width=".55" stroke-linejoin="round"/></g></g>`;
  const flash=(x,y,cls='')=>`<g transform="translate(${x} ${y})"><g class="ca-flash ${cls}"><path d="M0 -9 L3 -3 L10 -3 L4 1 L7 8 L0 4 L-7 8 L-4 1 L-10 -3 L-3 -3Z" fill="#ffd34d" stroke="${ink}" stroke-width="1.2"/></g></g>`;
  const smoke=(x,y,cls='')=>`<g transform="translate(${x} ${y})"><g class="ca-smoke ${cls}"><circle r="7" fill="#f2efe6" stroke="${ink}" stroke-width="1"/><circle cx="8" cy="-4" r="5.5" fill="#f2efe6" stroke="${ink}" stroke-width="1"/></g></g>`;
  let fx='';
  if(a==='fire') fx=flash(132,64)+smoke(146,60);
  else if(a==='thrust') fx=`<g transform="translate(150 62)"><g class="ca-spark"><path d="M0 -8 V8 M-8 0 H8 M-5 -5 L5 5 M5 -5 L-5 5" stroke="#ffd34d" stroke-width="2.4" stroke-linecap="round"/></g></g>`;
  else if(a==='bow') fx=`<g class="ca-arrow"><path d="M0 0 L16 0 M12 -3 L16 0 L12 3" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
  else if(a==='ride') fx=smoke(40,112,'dust')+smoke(22,116,'dust d2')+`<g class="ca-speed" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"><path d="M14 80 H40"/><path d="M6 92 H30"/></g>`;
  else if(a==='gun') fx=flash(150,90)+smoke(164,86)+`<circle class="ca-ball" cx="150" cy="90" r="4" fill="${ink}"/>`;
  else if(a==='tank') fx=flash(160,96)+smoke(174,92)+`<path class="ca-tracer" d="M160 96 H190" stroke="#ffd34d" stroke-width="3" stroke-linecap="round"/>`;
  else if(a==='sea') fx=flash(108,92,'f1')+flash(124,92,'f2')+flash(140,92,'f3')+smoke(150,84,'s1');
  else if(a==='air') fx=`<g class="ca-bomb"><ellipse cx="0" cy="0" rx="2.6" ry="5" fill="${ink}"/></g>`;
  else if(a==='lead') fx=`<g transform="translate(132 44)"><g class="ca-spark"><path d="M0 -8 V8 M-8 0 H8" stroke="#ffd34d" stroke-width="2.4" stroke-linecap="round"/></g></g>`;
  else if(a==='drive') fx=smoke(40,116,'dust')+smoke(24,118,'dust d2');
  return `<svg class="ca act-${a}" viewBox="0 0 240 140" aria-hidden="true">${bg}${unit}${fx}</svg>`;
}
function cardFace(c,opts={}){
  const own=OWNED.has(c.id) || opts.peek, idx=CARDS.indexOf(c)+1, pow=c.st.reduce((x,y)=>x+y,0)*10;
  if(!own) return `<div class="tcx locked"><div class="tcx-in"><header class="tcx-hd"><span class="tcx-nm">Locked card</span></header><div class="tcx-art">${toySvg(c,84)}</div><p class="tcx-fx">Play ${CARD_SETS[c.set][0]} to collect it.</p></div></div>`;
  return `<div class="tcx ${c.side}"><div class="tcx-in">
    <header class="tcx-hd"><span class="tcx-nm">${c.name}</span><span class="tcx-pw"><small>PWR</small>${pow}</span></header>
    <div class="tcx-art">${cardArt(c)}</div>
    <div class="tcx-ty">${TYPE_L(c.t)} · ${c.era}</div>
    <div class="tcx-ab"><b>Strong at</b><p>${c.good}</p></div>
    <div class="tcx-ab weak"><b>Beaten by</b><p>${c.beat}</p></div>
    <div class="tcx-st">${c.st.map((v,i)=>`<div><span>${STAT_L[i]}</span><b>${v}</b><i>${[1,2,3,4,5].map(k=>`<em class="${k<=v?'on':''}"></em>`).join('')}</i></div>`).join('')}</div>
    <p class="tcx-fx">${c.fact}</p>
    <footer class="tcx-ft"><span>${CARD_SETS[c.set][0]}</span><span>No. ${idx} of ${CARDS.length}</span></footer>
  </div></div>`;
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
function releasedSets(){
  const out=new Set(); const n=window.todayN?todayN():0;
  for(let k=1;k<=n;k++){ const sc=window.scFor&&scFor(k); if(sc) out.add(sc.n); }
  return Object.entries(CARD_SETS).filter(([,v])=>out.has(v[1]));
}
function renderCards(){
  const sets=releasedSets(), keys=new Set(sets.map(([k])=>k));
  const pool=CARDS.filter(c=>keys.has(c.set)), own=pool.filter(c=>OWNED.has(c.id)).length;
  let h='';
  sets.slice().reverse().forEach(([k,[name]])=>{
    const cs=CARDS.filter(c=>c.set===k);
    h+=`<section class="cset"><h2>${name}<span>${cs.filter(c=>OWNED.has(c.id)).length}/${cs.length}</span></h2><div class="cgrid">${cs.map(c=>{ const o=OWNED.has(c.id); return `<button type="button" class="cmini ${o?c.side:'locked'}" data-card="${c.id}"><span class="cmi">${toySvg(c,58)}</span><b>${o?c.name:'Locked'}</b></button>`; }).join('')}</div></section>`;
  });
  const el=$('#cards');
  el.innerHTML=`<div class="pg2">${pgHead('Troop cards',`${own} of ${pool.length} collected. Finish an order to add its troops.`)}<div class="pbody">${h}</div></div>`;
  el.scrollTop=0;
}
$('#cards').addEventListener('click',e=>{
  if(e.target.closest('[data-home]')){ location.hash='home'; return; }
  const b=e.target.closest('[data-card]'); if(!b) return;
  const c=CARDBY[b.dataset.card];
  if(OWNED.has(c.id)) showCard(c.id); else { b.classList.add('nope'); setTimeout(()=>b.classList.remove('nope'),400); }
});
