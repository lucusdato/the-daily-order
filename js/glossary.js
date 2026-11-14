/* The Daily Order: tap-to-define military terms.
   Any matching word in the card or a toy's tag gets a dotted underline; tapping it opens a short definition. */
const GLOSSARY = [
  [['flank','flanks','flanking','outflank','outflanked'],'Flank','The side of an army. Hitting the flank means attacking where the enemy is not facing.'],
  [['reserve','reserves'],'Reserve','Troops deliberately held back from the fight, ready to be sent wherever they are needed most.'],
  [['vanguard','van'],'Vanguard','The leading part of an army or fleet, the first to make contact.'],
  [['rear'],'Rear','The back of an army, where supplies and reserves usually are. Attacks from the rear are hard to answer.'],
  [['cavalry','horsemen','light horse'],'Cavalry','Soldiers on horseback. Fast and good at charging or chasing, weak against a solid wall of spears.'],
  [['heavy cavalry','knights'],'Heavy cavalry','Armored soldiers on big horses, built for a crushing charge. They need open, firm ground.'],
  [['infantry','foot soldiers'],'Infantry','Soldiers who fight on foot. The backbone of most armies.'],
  [['artillery','field guns','guns'],'Artillery','Big guns that fire from a distance, from cannon to modern howitzers.'],
  [['battery','batteries'],'Battery','A group of big guns placed together, often dug in.'],
  [['militia'],'Militia','Part-time citizen soldiers with little training, as opposed to full-time regulars.'],
  [['regulars','Continentals'],'Regulars','Full-time, trained, professional soldiers. Continentals were the American regular army in the Revolution.'],
  [['dragoons'],'Dragoons','Soldiers who rode horses but could also fight on foot.'],
  [['phalanx'],'Phalanx','A dense block of infantry with long spears, deadly from the front, clumsy to turn.'],
  [['hoplite','hoplites'],'Hoplite','A heavily armored Greek citizen soldier with a big round shield and spear.'],
  [['legion','legions','legionaries'],'Legion','A Roman army unit of roughly 5,000 professional soldiers, trained to fight in tight formation.'],
  [['schiltron','schiltrons'],'Schiltron','A Scottish formation: a tight block of spearmen bristling outward like a hedgehog.'],
  [['shield wall'],'Shield wall','A line of soldiers with overlapping shields, very hard to break from the front.'],
  [['housecarls'],'Housecarls','Professional bodyguard warriors of English and Scandinavian kings.'],
  [['fyrd'],'Fyrd','Anglo-Saxon farmers called up to fight for a campaign. Less trained than housecarls.'],
  [['Companions','Companion cavalry'],'Companions','Alexander the Great\'s elite heavy cavalry, which he led in person.'],
  [['wedge'],'Wedge','A triangle formation that punches a narrow point into the enemy line.'],
  [['echelon'],'Echelon','Units staggered like steps, so one end hits the enemy first while the other stays back.'],
  [['feint','feints'],'Feint','A fake attack meant to draw the enemy\'s attention or troops to the wrong place.'],
  [['salient','bulge'],'Salient','Part of a front line that sticks out into enemy territory, so it can be attacked from several sides.'],
  [['siege','besieged','besiege'],'Siege','Surrounding a fortified place to cut off supplies until it surrenders or can be stormed.'],
  [['garrison'],'Garrison','The troops stationed to hold a town, fort or position.'],
  [['redoubt','redoubts','strongpoint','strongpoints'],'Strongpoint','A small fortified position built to hold out on its own.'],
  [['trench','trenches'],'Trench','A ditch soldiers dig to shelter from fire.'],
  [['minefield','minefields'],'Minefield','An area seeded with hidden explosives that blow up when stepped or driven on.'],
  [['barrage','bombardment'],'Barrage','A heavy, concentrated burst of artillery fire.'],
  [['bridgehead'],'Bridgehead','A foothold on the enemy side of a river, held so more troops can cross.'],
  [['breakthrough'],'Breakthrough','Punching a hole all the way through the enemy\'s defensive line.'],
  [['encircle','encircled','encirclement','encircling','surround','surrounded'],'Encirclement','Surrounding an enemy force so it cannot escape or be resupplied.'],
  [['interior lines'],'Interior lines','Being in the middle lets you shift troops between threats faster than an enemy going around the outside.'],
  [['supply line','supply lines','lifeline'],'Supply line','The route food, fuel and ammunition travel to reach an army. Cut it and the army starves.'],
  [['logistics'],'Logistics','Moving and supplying an army: food, fuel, ammunition, transport.'],
  [['corps'],'Corps','A large army formation, usually two or more divisions, often 20,000 to 50,000 troops.'],
  [['division','divisions'],'Division','A large army unit of about 10,000 to 20,000 soldiers.'],
  [['regiment'],'Regiment','A unit of a few hundred to a few thousand soldiers, usually under a colonel.'],
  [['battalion','battalions'],'Battalion','A unit of several hundred soldiers.'],
  [['squadron','squadrons'],'Squadron','A group of warships, or of about 12 to 20 aircraft.'],
  [['ship of the line','ships of the line'],'Ship of the line','The biggest sailing warships, with dozens of cannon, built to fight in a line.'],
  [['frigate','frigates'],'Frigate','A fast, lighter sailing warship used for scouting and messages.'],
  [['flagship'],'Flagship','The ship carrying the fleet\'s commander.'],
  [['ram'],'Ram','A bronze beak on an ancient warship\'s bow, used to smash holes in enemy ships.'],
  [['back water'],'Back water','Rowing backward, so a ship retreats while still facing the enemy.'],
  [['panzer','panzers'],'Panzer','German for armor: German tanks and tank divisions.'],
  [['dive bomber','dive bombers','Stukas'],'Dive bomber','An aircraft that dives steeply at its target to drop bombs accurately.'],
  [['air superiority'],'Air superiority','Controlling the sky so your aircraft operate freely and the enemy\'s cannot.'],
  [['radar'],'Radar','Radio waves that bounce off aircraft or ships, showing where they are long before anyone can see them.'],
  [['amphibious','landing'],'Amphibious landing','An attack from the sea, putting troops ashore from ships.'],
  [['reconnaissance','scouts','scouting'],'Reconnaissance','Finding out where the enemy is and what it is doing.'],
  [['arquebus','arquebusiers'],'Arquebus','An early gun, loaded through the muzzle and fired with a slow-burning match.'],
  [['volley','volleys'],'Volley','Many soldiers firing at the same moment.'],
  [['bayonet','bayonets'],'Bayonet','A blade fixed to the end of a rifle or musket, turning it into a spear.'],
  [['laager'],'Laager','A defensive ring of wagons.'],
  [['horns'],'Horns of the buffalo','The Zulu battle formation: a chest pins the enemy, two horns encircle it, the loins wait in reserve.'],
  [['polemarch'],'Polemarch','An Athenian official with command of the army, who had the deciding vote among the generals.'],
  [['Elector'],'Elector','A German prince with a vote in choosing the Holy Roman Emperor.'],
  [['shogun'],'Shogun','Japan\'s military ruler, governing in the emperor\'s name.'],
  [['doctrine'],'Doctrine','An army\'s official rules for how to fight.'],
  [['attrition'],'Attrition','Wearing the enemy down through steady losses, rather than one decisive blow.'],
  [['defense in depth','in depth'],'Defense in depth','Several lines of defenses one behind another, so an attacker gets weaker with every line.'],
  [['counterattack','counterattacks'],'Counterattack','Striking back at an enemy that has just attacked you, often when it is tired.'],
  [['preemptive'],'Preemptive','Striking first to beat an attack you know is coming.'],
  [['rout','routed'],'Rout','When an army breaks and runs in disorder.'],
  [['reverse slope'],'Reverse slope','The back side of a ridge, hidden from the enemy\'s view and guns.'],
  [['squares'],'Infantry square','Infantry formed into a hollow square, facing outward, so cavalry cannot find a side to hit.'],
  [['Imperial Guard','the Guard'],'Imperial Guard','Napoleon\'s elite veteran soldiers, usually kept for the decisive moment.'],
  [['pack train'],'Pack train','A column of mules carrying supplies and ammunition.'],
  [['carbine','carbines'],'Carbine','A short rifle that is easier to use on horseback.'],
  [['column'],'Column','Troops moving in a long line, one unit behind another. Easy to march in, hard to fight in.'],
  [['perimeter'],'Perimeter','The outer edge of a defended position.'],
  [['engineers'],'Engineers','Soldiers who build bridges, clear mines and dig fortifications.'],
  [['drop zone','drop zones'],'Drop zone','An area where supplies or paratroopers are dropped from aircraft.'],
  [['armistice','ceasefire'],'Armistice','An agreement to stop fighting, usually before a peace treaty.'],
  [['Republican Guard'],'Republican Guard','Iraq\'s best-equipped divisions in 1991.'],
  [['combined arms'],'Combined arms','Using different troop types together, so each covers the others\' weaknesses.'],
  [['deception'],'Deception','Making the enemy believe something false about your plans.'],
  [['intercepts'],'Intercepts','Enemy radio or coded messages captured and read.'],
  [['berm','berms'],'Berm','A long earth wall built as a barrier.'],
  [['line of battle','battle line'],'Line of battle','Ships or troops formed in a line to fight side by side.'],
  [['at anchor','anchored'],'At anchor','A ship held in place by its anchor, unable to maneuver quickly.'],
  [['shoals'],'Shoals','Shallow water where ships can run aground.'],
  [['air campaign','air war'],'Air campaign','A sustained bombing effort before or instead of ground fighting.'],
  [['boarding','grappling'],'Boarding','Hooking onto an enemy ship and sending soldiers across to capture it.'],
  [['panokseon'],'Panokseon','A sturdy, high-sided Korean warship carrying cannon.'],
  [['wing','wings'],'Wing','One side of an army\'s battle line, left or right of the center.'],
  [['METT-T'],'METT-T','The five things officers size up before deciding: Mission, Enemy, Terrain and weather, Troops available, Time.'],
  [['OAKOC'],'OAKOC','How soldiers read ground: Observation and fields of fire, Avenues of approach, Key terrain, Obstacles, Cover and concealment.'],
  [['key terrain'],'Key terrain','Ground that gives a big advantage to whoever holds it, like a hill, bridge or crossroads.'],
  [['avenue of approach','avenues of approach'],'Avenue of approach','A route an attacking force can use to reach its objective.'],
  [['obstacle','obstacles'],'Obstacle','Anything that slows, blocks or channels movement: rivers, marsh, walls, minefields.'],
  [['cover and concealment','concealment'],'Cover and concealment','Cover protects you from fire. Concealment only hides you from view.'],
  [['observation'],'Observation','What can be seen from a position, and how far its weapons can reach.'],
  [['skirmish','skirmishers'],'Skirmish','A small, loose fight, often to probe or harass before the main battle.']
];
const GLOSS = (()=>{ const m=new Map(); GLOSSARY.forEach((g,i)=>g[0].forEach(w=>m.set(w.toLowerCase(),i))); return m; })();
const GLOSS_RE = new RegExp('\\b('+[...GLOSS.keys()].sort((a,b)=>b.length-a.length).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\\b','gi');
const GLOSS_SKIP = '.you b,.cmini,.toy,.zc,.mfb-h,.tc,.commit,.revl,h2,.kicker,.pill,.stamp,pre,button.dgo,.nextbig,.play,.term,.dbtn,summary,.sharebox,.dk,.score,.chip-p,.dot';

function glossify(root){
  if(!root) return;
  const seen=new Set();
  const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
    const p=n.parentElement; if(!p || p.closest(GLOSS_SKIP)) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT; }});
  const nodes=[]; while(walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(t=>{
    const v=t.nodeValue; GLOSS_RE.lastIndex=0; let m, last=0, frag=null;
    while((m=GLOSS_RE.exec(v))){
      const i=GLOSS.get(m[1].toLowerCase()); if(i==null||seen.has(i)) continue;
      seen.add(i); frag=frag||document.createDocumentFragment();
      frag.appendChild(document.createTextNode(v.slice(last,m.index)));
      const s=document.createElement('span'); s.className='term'; s.dataset.g=i; s.tabIndex=0; s.setAttribute('role','button'); s.textContent=m[1]; frag.appendChild(s);
      last=m.index+m[1].length;
    }
    if(frag){ frag.appendChild(document.createTextNode(v.slice(last))); t.parentNode.replaceChild(frag,t); }
  });
}
function showGloss(i,anchor){
  const g=GLOSSARY[i], el=document.getElementById('gloss'); if(!g||!el) return;
  el.innerHTML=`<button type="button" class="x" aria-label="Close">×</button><b>${g[1]}</b><p>${g[2]}</p>`;
  el.hidden=false;
  /* big screens scale the whole page (zoom on <html>), so a pixel in style is not a pixel on screen: measure the scale and work in screen pixels */
  el.style.left='100px'; el.style.top='0px';
  const z=(el.getBoundingClientRect().left/100)||1;
  const r=anchor.getBoundingClientRect(), W=window.innerWidth, w=Math.min(300*z,W-24);
  el.style.width=(w/z)+'px';
  el.style.left=(Math.max(12,Math.min(W-w-12,r.left+r.width/2-w/2))/z)+'px';
  const h=el.getBoundingClientRect().height, below=r.bottom+10, above=r.top-h-10;
  el.style.top=((below+h<window.innerHeight-8||above<8?below:above)/z)+'px';
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
}
function hideGloss(){ const el=document.getElementById('gloss'); if(el) el.hidden=true; }
/* capture phase, so tapping a term inside an answer button never picks that answer */
document.addEventListener('click',e=>{
  const t=e.target.closest && e.target.closest('.term');
  if(t){ e.stopPropagation(); e.preventDefault(); showGloss(+t.dataset.g,t); return; }
  if(!(e.target.closest && e.target.closest('#gloss'))) hideGloss();
  else if(e.target.closest('.x')) hideGloss();
},true);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') hideGloss(); const t=e.target.closest&&e.target.closest('.term'); if(t&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); showGloss(+t.dataset.g,t); } });
/* re-link whenever a card or toy tag is redrawn */
(function(){
  let busy=false;
  const run=el=>{ if(busy) return; busy=true; try{ glossify(el); } finally{ busy=false; } };
  ['card','utag','dock'].forEach(id=>{ const el=document.getElementById(id); if(!el) return;
    new MutationObserver(()=>{ if(!busy){ hideGloss(); run(el); } }).observe(el,{childList:true}); });
})();
