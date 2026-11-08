PG.add({
  id:'cannae', name:'Cannae', year:'216 BC', place:'Apulia, southern Italy',
  summary:`Hannibal lets the Roman army push into his center, then closes around it. The textbook encirclement.`,
  face:{g:1,t:-1},
  g:{short:'Carthage', name:'Carthage', cmdr:'Hannibal Barca', str:'About 50,000: 40,000 infantry, 10,000 cavalry', eyes:'Through Carthaginian eyes'},
  t:{short:'Rome', name:'Roman Republic', cmdr:'Consuls Varro and Paullus', str:'About 86,000: 80,000 infantry, 6,000 cavalry', eyes:'Through Roman eyes'},
  objective:`Hannibal: destroy a Roman army so completely that Rome's Italian allies desert it. Rome: use overwhelming infantry to crush Hannibal in one blow.`,
  prologue:{
    when:'218 to 216 BC', title:'Over the Alps',
    text:`In the Second Punic War, Hannibal does the unthinkable. He marches an army from Spain over the Pyrenees and the Alps into Italy itself, losing a large part of it on the way. He then destroys Roman armies at the Trebia and at Lake Trasimene. Rome tries delay under Fabius, refusing battle, but the policy is unpopular. For 216 BC Rome raises the largest army in its history and sends both consuls to crush him.`,
    gWant:`A crushing victory big enough to make Rome's Italian allies switch sides. Without them, Rome would run out of soldiers.`,
    tWant:`To end the humiliation quickly with overwhelming numbers, and to stop Hannibal living off allied farmland.`,
    box:[284,186,32],
    theater(){
      let s=seaBg();
      s+=land('M0 0 H400 V30 Q330 52 300 40 Q262 60 230 42 Q200 30 172 40 Q130 62 100 80 Q60 52 0 62 Z');
      s+=land('M0 62 Q60 52 100 80 Q112 140 92 200 Q80 252 40 272 Q10 262 0 242 Z');
      s+=land('M172 40 Q230 30 260 60 Q250 100 270 140 Q300 180 320 200 Q350 215 362 240 Q342 252 330 236 Q316 252 332 282 Q320 302 300 292 Q290 262 270 242 Q240 212 220 182 Q200 152 190 112 Q176 80 172 40 Z');
      s+=land('M0 362 Q80 342 150 352 Q200 342 262 362 L262 400 H0 Z');
      s+=land('M266 352 L312 340 L292 372 Z');
      s+=`<ellipse cx="180" cy="212" rx="12" ry="22" fill="#8fa765" stroke="#e6d6a2" stroke-width="2"/><ellipse cx="182" cy="170" rx="7" ry="13" fill="#8fa765" stroke="#e6d6a2" stroke-width="2"/>`;
      [[150,46,13],[172,40,15],[194,46,13],[214,40,12],[120,62,10]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#efe9da'));
      s+=city(242,170,'Rome',9,-6)+city(60,222,'New Carthage',8,12)+city(150,374,'Carthage',9,12)+city(202,86,'Trebia',8,-6)+city(232,142,'Trasimene',8,-6);
      s+=label(60,130,'Spain',12)+label(170,20,'The Alps',11)+label(110,300,'Mediterranean',12)+label(330,120,'Adriatic',11);
      return s;
    },
    tokens:[
      {s:'g',t:'cmd',n:1,name:'Hannibal',why:'Left Spain in 218 BC with perhaps 40,000 men and some elephants. Far fewer reached Italy.',path:[[60,222],[90,110],[150,64],[204,86],[234,140],[296,200]]},
      {s:'g',t:'cav',n:2,name:'Hannibal\'s army',why:'Lived off the land in Italy for years, with no reliable supply line home.',path:[[66,228],[96,116],[156,70],[208,92],[240,146],[302,206]]},
      {s:'t',t:'hvy',n:3,name:'The new Roman army',why:'Eight legions plus allies, the largest army Rome had ever fielded.',path:[[242,172],[270,184],[296,192]]}
    ],
    a:[['gd',60,215,80,110,148,60],['gd',160,52,206,64,232,138],['gd',238,146,282,170,294,196]]
  },
  terrain(){
    let s=felt('#b2aa62');
    [[110,40,90,60,-8,'rgba(255,240,180,.13)'],[250,40,110,52,4,'rgba(80,60,20,.08)'],[120,300,100,70,6,'rgba(80,60,20,.08)'],[250,300,120,62,-5,'rgba(255,240,180,.13)'],[300,180,90,80,3,'rgba(255,240,180,.1)']].forEach(f=>{s+=`<rect x="${f[0]}" y="${f[1]}" width="${f[2]}" height="${f[3]}" fill="${f[5]}" transform="rotate(${f[4]} ${f[0]+f[2]/2} ${f[1]+f[3]/2})"/>`;});
    s+=river('M44 0 Q22 80 46 160 Q70 240 38 320 Q22 370 42 400',20);
    s+=hill(90,372,32,14,2)+house(78,366)+house(94,372,'#8a3a2a')+house(88,358);
    [150,172,194,216,238,260].forEach(x=>s+=tent(x,30,'#ece0c4'));
    [254,276,298,320].forEach(x=>s+=tent(x,388,'#d9b98a'));
    s+=`<path d="M380 352 Q390 316 378 280" fill="none" stroke="#1f1a14" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#mk)" opacity=".7"/>`;
    s+=label(88,22,'Aufidus River',11)+label(205,13,'Roman camps',10)+label(287,372,'Hannibal\'s camp',10)+label(354,394,'Volturnus wind',9)+label(140,395,'Cannae: Roman depot, captured',9);
    s+=compass(378,24);
    return s+end();
  },
  features:[
    {x:56,y:200,px:62,py:210,d:'M44 0 Q22 80 46 160 Q70 240 38 320 Q22 370 42 400',line:true,name:'The Aufidus River',why:`Hannibal anchored one flank on the river. It protected that side and squeezed the cavalry fight there into a narrow lane.`},
    {x:200,y:180,r:58,name:'The open plain',why:`Flat, open ground: ideal for cavalry, Hannibal's strongest arm, and with nothing for the Romans to anchor a flank on.`},
    {x:90,y:366,r:22,name:'The Cannae depot',why:`Hannibal captured Rome's supply base here weeks before. That forced the Romans to seek battle rather than wait him out.`},
    {x:378,y:316,r:24,name:'Wind and dust',why:`Livy says a hot wind blew dust into Roman eyes. A small, real edge on a dry summer day.`},
    {x:82,y:150,r:30,name:'The cavalry lane',why:`A narrow strip between river and infantry where cavalry could only fight head-on, which favored the heavier Carthaginian horse.`}
  ],
  units:[
    U('c_skirm','g','arch',2,'Balearic slingers and skirmishers',`Light troops who opened the battle and screened the line, then slipped behind it.`,{0:[200,178],1:[200,292]}),
    U('c_g1','g','spr',2,'Gallic and Iberian infantry (left)',`Hannibal's most numerous and least disciplined foot. Placed in the center because that was exactly where he wanted ground given.`,{0:[155,224],2:[150,242],4:[162,206]}),
    U('c_g2','g','spr',2,'Gallic and Iberian infantry (center)',`The tip of the crescent, the first to meet the legions and the first to give way.`,{0:[200,206],2:[200,264],4:[200,214]}),
    U('c_g3','g','spr',2,'Gallic and Iberian infantry (right)',`Gave ground slowly with the rest of the center, keeping the line from breaking.`,{0:[245,224],2:[250,242],4:[238,206]}),
    U('c_afr_l','g','hvy',2,'African heavy infantry (left)',`Veterans, many armed with captured Roman gear. One of the two hidden jaws of the trap.`,{0:[110,248],3:[128,192],4:[140,172]}),
    U('c_afr_r','g','hvy',2,'African heavy infantry (right)',`The other jaw. Held back for hours, then turned inward at the decisive moment.`,{0:[290,248],3:[272,192],4:[260,172]}),
    U('c_hcav','g','cav',3,'Heavy cavalry (Hasdrubal)',`Iberian and Gallic horsemen. Hard-hitting, used to win one wing outright and then sweep around the whole Roman army.`,{0:[74,240],1:[86,148],3:[305,98],4:[200,90]}),
    U('c_ncav','g','cav',2,'Numidian light cavalry',`Fast North African riders. Ideal for pinning an enemy without a decisive fight, and for chasing a broken one.`,{0:[330,240],1:[334,152],3:[372,74],4:[392,46,'exit']}),
    U('c_hannibal','g','cmd',1,'Hannibal Barca',`Stood with the bending center, where the plan was most likely to fail.`,{0:[205,244],2:[205,288],4:[205,248]}),
    U('r_velites','t','spr',2,'Velites',`Rome's light skirmishers. Fought the opening exchange, then withdrew behind the legions.`,{0:[200,150],1:[200,60,'exit']}),
    U('r_inf1','t','hvy',3,'Roman legions (left)',`Heavy infantry with big shields and short swords, packed deeper than usual to smash through the center.`,{0:[158,120],2:[158,182],4:[170,162,'ko']}),
    U('r_inf2','t','hvy',3,'Roman legions (center)',`The point of the Roman push, driving straight at the Gallic crescent.`,{0:[200,114],2:[200,192],4:[200,166,'ko']}),
    U('r_inf3','t','hvy',3,'Roman legions (right)',`Pressed forward with the center, crowding into the pocket.`,{0:[242,120],2:[242,182],4:[230,162,'ko']}),
    U('r_inf4','t','hvy',3,'Roman rear ranks',`The extra depth Rome hoped would break the line. It ended up packed so tight it could not fight.`,{0:[200,84],2:[200,152],4:[200,136,'ko']}),
    U('r_cav','t','cav',2,'Roman citizen cavalry',`About 2,400 horsemen, squeezed against the river and outclassed.`,{0:[76,118],1:[64,122,'ko']}),
    U('r_acav','t','cav',2,'Allied Italian cavalry',`Held the open wing until struck from behind.`,{0:[330,122],1:[332,126],3:[388,58,'exit']}),
    U('r_varro','t','cmd',1,'Consul Varro',`Commanded the Roman left. Escaped with the remnants of the cavalry.`,{0:[348,98],3:[392,40,'exit']}),
    U('r_paullus','t','cmd',1,'Consul Paullus',`Commanded the Roman right by the river, then joined the infantry. Killed in the battle.`,{0:[110,98],1:[150,104],4:[186,150,'ko']})
  ],
  phases:[
    {when:'2 August 216 BC', title:'Set the bait', a:[],
     move:`Hannibal has already seized the Roman supply depot at Cannae, forcing Rome to come to him. He anchors one flank on the Aufidus River, puts his least reliable infantry, the Gauls and Iberians, in the center in a crescent bulging toward the enemy, and places his best African infantry at both ends. Cavalry holds the wings.`,
     why:`He expected the Romans to do what Romans usually did: mass infantry and smash through the middle. So he built a center designed to give way slowly and put his best troops where the Romans would end up.`,
     tv:`Rome had numbers and a straightforward plan: deepen the legions, push through the center, and break the enemy where most battles were decided. The ancient sources say the consuls disagreed, with Paullus more cautious, and that command alternated daily. Varro chose to fight.`,
     ground:`A flat, open plain suited his superior cavalry. The river on the Roman right squeezed the cavalry fight there into a narrow lane where his heavier horsemen would win. Livy adds that a hot wind blew dust into Roman faces.`,
     supply:`Hannibal had no supply line from home. Taking the depot at Cannae fed his army and took away Rome's, so the Romans could not afford to wait him out.`,
     board:{h:`Plan around their habits`, b:`Big organizations are predictable. They respond to threats with the playbook that won last time, usually more budget on the obvious front. Design your move so their most likely response works in your favor.`, try:`Write down what your biggest rival will do when you launch. Then shape the launch so that response wastes their effort.`}},
    {when:'Opening', title:'Win the wings first',
     a:[['g',76,232,84,156],['g',330,232,333,160],['td',200,145,200,80]],
     move:`Hannibal's heavy cavalry crush the Roman citizen cavalry in the cramped space by the river. On the other wing, the fast Numidians keep the allied cavalry busy without committing to a decisive fight.`,
     why:`Cavalry was Hannibal's decisive edge, so he used it early and in two different ways: one wing to win outright, the other only to hold. Once Rome's horsemen were gone, the legions' flanks and rear were open.`,
     tv:`Losing the cavalry looked like a setback, not a disaster. Roman thinking said the infantry won battles, and this was the strongest infantry the Republic had ever fielded.`,
     ground:`The river stopped the Roman cavalry from spreading out or slipping away, which turned the fight into a head-on crush that heavier horses won.`,
     board:{h:`Lead with your unfair advantage`, b:`Hannibal did not spread his best asset evenly. He put the heavy cavalry where it could win quickly and gave the light cavalry a holding job. Know what you are genuinely better at, and commit it where it changes the whole board.`, try:`Name your one real edge over the competition. Is it aimed at the decisive fight, or spread across everything?`}},
    {when:'Midday', title:'The center bends',
     a:[['t',200,124,200,184],['t',158,128,158,176],['t',242,128,242,176],['gd',200,212,200,256]],
     call:{side:'g', who:'Hannibal', q:`The Roman legions, packed deep, are shoving your Gallic center backward. It is starting to bow inward. What do you do?`, opts:[
       {t:`Send the African infantry in to shore up the center`, ok:false, fb:`That stops the bending, but it turns the battle into a straight slugging match against a much bigger army, which Hannibal would lose.`, alt:{u:{c_afr_l:[152,232], c_afr_r:[248,232], r_inf1:[158,182], r_inf2:[200,192], r_inf3:[242,182], r_inf4:[200,152]}, a:[['g',110,240,150,232],['g',290,240,250,232],['t',200,124,200,184]]}},
       {t:`Let the center keep giving ground slowly, and keep the Africans waiting`, ok:true, fb:`This is Hannibal's plan. Every step the Romans take pulls them deeper into a pocket with your best infantry waiting on both sides.`},
       {t:`Pull the cavalry back to help the infantry`, ok:false, fb:`The cavalry has a bigger job: getting behind the Roman army. Pulling it back gives up the encirclement.`, alt:{u:{c_hcav:[118,236]}, a:[['gd',86,148,100,200,118,230]]}}]},
     move:`The legions push forward. The crescent flattens, then bows backward into a U. The Romans, sensing victory, crowd into the gap. Hannibal stays with the center to keep it from breaking.`,
     why:`A controlled retreat is very different from a collapse. The center had to give ground without running, and Hannibal's presence there made that possible.`,
     tv:`From inside the legions it felt like winning. The enemy was falling back, exactly as planned. The bowing line looked like a breaking line.`,
     ground:`As the Romans pushed into the pocket, their own numbers packed them tighter and tighter. Men in the middle could barely swing a sword.`,
     board:{h:`Give ground on purpose, and stand where it hurts`, b:`Some strategies need a team to absorb pain on purpose: a loss-leader product, a holding campaign, a client you protect while you build elsewhere. That team will break unless the leader is visibly with them.`, try:`Which team is absorbing the cost of your strategy right now? When did you last stand with them?`}},
    {when:'Afternoon', title:'The jaws close',
     a:[['g',110,240,126,200],['g',290,240,274,200],['g',90,140,150,40,300,92],['td',340,124,386,62]],
     call:{side:'g', who:'Hasdrubal, the cavalry commander', q:`Your heavy cavalry has destroyed the Roman horsemen by the river. The survivors are fleeing. What do you do now?`, opts:[
       {t:`Chase the beaten Roman cavalry off the field`, ok:false, fb:`Satisfying and useless. Cavalry that vanishes in pursuit cannot shape the main battle, a mistake many commanders made.`, alt:{u:{c_hcav:[52,40]}, a:[['gd',86,148,70,90,54,48]]}},
       {t:`Ride behind the Roman army and hit the other cavalry wing from the rear`, ok:true, fb:`This is what happened. Cavalry disciplined enough to rally after winning and strike again was rare, and decisive.`},
       {t:`Charge straight into the side of the legions now`, ok:false, fb:`Tempting, but the Roman allied cavalry would still be free on the far wing, and cavalry charging dense infantry head-on usually loses.`, alt:{u:{c_hcav:[128,172]}, a:[['g',86,148,126,168]]}}]},
     move:`The African infantry, fresh and untouched, turn inward and hit both Roman flanks. Hasdrubal's heavy cavalry rides right around the back of the Roman army and strikes the allied cavalry from behind. They break and flee, with the Numidians chasing them off the field.`,
     why:`The Africans had been held back for exactly this moment. Their timing mattered more than their numbers.`,
     tv:`Legionaries packed in the middle could see little beyond the men around them. By the time the flanks were hit, the army was too deep and too tightly packed to turn.`,
     board:{h:`Hold your best people for the decisive moment`, b:`The African infantry did nothing for hours, then decided the battle. Leaders often put their strongest people on every early task, leaving no one fresh for the moment that counts.`, try:`Keep one strong person or team deliberately uncommitted this quarter, and decide in advance what would trigger sending them in.`}},
    {when:'Late afternoon', title:'Encirclement',
     a:[['g',296,96,250,80,208,92],['g',140,182,162,170],['g',260,182,238,170]],
     call:{side:'t', who:'Consul Paullus', q:`Your army is surrounded on three sides and packed so tightly that men cannot swing their swords. Cavalry is gathering behind you. What order do you give?`, opts:[
       {t:`Keep pushing forward through the center`, hist:true, ok:false, fb:`The legions kept pressing into the pocket, which only packed them tighter.`},
       {t:`Turn the rear ranks outward and fight as a giant square`, ok:true, fb:`Very hard to organize in that crush, but it would have used the formation's depth to face every threat. Some Roman units did cut their way out on their own initiative.`, alt:{u:{r_inf4:[200,108], r_inf1:[150,162], r_inf3:[250,162], c_hcav:[200,66]}, a:[['t',200,134,200,94],['t',166,168,134,170],['t',234,168,266,170]]}},
       {t:`Break out toward the river`, ok:false, fb:`The river side was where the Carthaginian heavy cavalry had started. Men pinned against water had nowhere to go.`, alt:{u:{r_inf1:[108,150], r_inf4:[146,120]}, a:[['td',168,166,112,150]]}}]},
     move:`The heavy cavalry charges into the Roman rear. The legions are now surrounded on every side and packed so tightly they cannot fight back. Paullus is killed. The killing lasts until nightfall.`,
     why:`Hannibal had turned Rome's advantage, sheer mass, into the cause of its destruction.`,
     tv:`Paullus died with dozens of senators and former officials. Varro escaped with the remnants of the cavalry, and Rome's leaders later thanked him for not despairing of the Republic.`,
     board:{h:`Scale can become paralysis`, b:`The bigger the organization, the harder it is to change direction once committed. Rome's army was too big and too tightly packed to turn and face the threat behind it. Large incumbents get stuck the same way.`, try:`Look for where a big rival is overcommitted and slow to turn. That is where a fast move costs them most.`}},
    {when:'216 to 202 BC', title:'The battle won, the war lost', a:[],
     move:`Rome loses around 50,000 men in an afternoon, one of the deadliest single days in military history. Yet Rome refuses to negotiate. It raises new armies, avoids open battle with Hannibal and attacks Carthage's bases in Spain and Africa instead. In 202 BC Scipio defeats Hannibal at Zama.`,
     why:`Hannibal lacked the siege engines, reinforcements and supply to take Rome itself. Brilliant tactics could not fix a weak strategic position far from home.`,
     tv:`Rome's answer to Cannae was refusal: no surrender talks, new legions, and the patient delaying strategy it had given up. Losing a battle did not mean accepting the war was lost.`,
     supply:`With no reliable supply line, Hannibal spent over a decade living off the Italian countryside, never able to turn victories into a finished war.`,
     board:{h:`A great win is not a finished strategy`, b:`Winning the pitch is not keeping the account, and a brilliant campaign does not fix a weak business model. Ask what the win needs next, whether that is resourcing, follow-through or a home base, and whether you have it.`, try:`For your biggest recent win, list what has to be true for it to still matter in two years.`}}
  ]
});
