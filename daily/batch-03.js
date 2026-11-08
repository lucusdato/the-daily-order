/* Daily battles 21 to 30 */

/* ===== 21. ISANDLWANA ===== */
PGD.add({
  n:21, id:'isandlwana', name:'Isandlwana', year:'1879', place:'Zululand, southern Africa', side:'g', you:'the Zulu commanders Ntshingwayo kaMahole and Mavumengwana', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Zulu', name:'Zulu army', cmdr:'Ntshingwayo kaMahole and Mavumengwana kaNdlela, for King Cetshwayo', str:'About 20,000 warriors', eyes:'Through Zulu eyes'},
  t:{short:'British', name:'British Centre Column', cmdr:'Lord Chelmsford; at the camp, Lieutenant Colonel Pulleine, later joined by Colonel Durnford', str:'About 1,700 to 1,800 at the camp after Chelmsford left with roughly half the column', eyes:'Through British eyes'},
  brief:{
    hook:`The invaders have modern rifles and artillery. You have numbers, speed and the land itself.`,
    situation:`January 1879. A British army has invaded the Zulu kingdom after King Cetshwayo refused an ultimatum designed to be impossible to accept. One British column has camped below the rocky hill of Isandlwana. King Cetshwayo has sent his main army to meet it.`,
    forces:`Disciplined regiments of warriors who can cover long distances on foot very fast, armed mainly with stabbing spears and shields, with some firearms. They fight in a formation called the horns of the buffalo: a chest that pins the enemy, horns that encircle, and loins held in reserve.`,
    enemy:`British regular infantry with breech-loading Martini-Henry rifles, artillery, and mounted troops and African auxiliaries. Deadly at range. The camp has not been fortified or ringed with wagons.`,
    ground:`Isandlwana hill stands over the camp. To the north and east, a plateau and valleys can hide a large army. The plain in front of the camp is open.`,
    supply:`Your army has marched for days and cannot stay in the field for long. The British depend on long supply trains of wagons.`,
    intel:`Lord Chelmsford believes the main Zulu army is to the southeast, where there has been skirmishing. He is looking for you.`,
    objective:`Destroy the British column and end the invasion.`,
    notes:[`In open fields against massed rifles, a frontal charge is very costly.`,`An army that cannot be found cannot be prepared against.`,`If the British split up, each part is far weaker.`]
  },
  terrain(){
    let s=felt('#a3a679');
    s+=`<path d="M0 0 H400 V120 Q300 140 200 120 Q100 100 0 130 Z" fill="#8e9466"/>`;
    s+=mtn(170,220,40)+hill(260,60,70,30,3)+hill(60,60,60,26,2);
    s+=`<path d="M220 40 Q260 70 330 50" fill="none" stroke="#5a6a3e" stroke-width="10" opacity=".4" stroke-linecap="round"/>`;
    [[200,250],[212,258],[224,250],[206,268],[220,270],[236,262]].forEach(p=>s+=tent(p[0],p[1]));
    s+=road('M200 270 L300 400');
    s+=label(170,184,'Isandlwana',10)+label(270,30,'Ngwebeni valley',9)+label(80,140,'Nyoni ridge',9)+label(310,330,'Open plain',9)+label(330,388,'Chelmsford, far southeast',8);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:270,y:50,r:40,name:'The Ngwebeni valley',why:`Where the Zulu army rested out of sight, only a few kilometres from the camp, while the British searched elsewhere.`},
    {x:170,y:220,r:30,name:'Isandlwana hill',why:`A steep rock behind the camp. It blocked the British view and gave the encircling horn a covered route around it.`},
    {x:220,y:260,r:30,name:'The British camp',why:`Spread out and unfortified, with no wagon laager or trench.`}
  ],
  units:[
    U('zu_chest','g','spr',3,'The chest',`The center, which pinned the British firing line.`,{0:[260,50,'hide'],1:[240,110],2:[230,190]}),
    U('zu_lhorn','g','spr',3,'Left horn',`Swept around the south of the camp.`,{0:[320,60,'hide'],1:[320,150],2:[280,290]}),
    U('zu_rhorn','g','spr',3,'Right horn',`Moved behind Isandlwana hill to cut the road back to Natal.`,{0:[200,40,'hide'],1:[110,120],2:[150,260]}),
    U('zu_loins','g','spr',2,'The loins (reserve)',`Held back, then moved on to Rorke's Drift.`,{0:[280,30,'hide'],1:[250,60],2:[100,180]}),
    U('zu_cmd','g','cmd',1,'Ntshingwayo kaMahole',`Senior commander of the Zulu army.`,{0:[300,20],1:[280,70],2:[260,110]}),
    U('br_line','t','inf',3,'24th Regiment firing line',`Pushed out some distance from the camp.`,{0:[210,240],1:[230,200],2:[220,240,'ko']}),
    U('br_guns','t','art',1,'Two field guns',`Firing shrapnel at the advancing chest.`,{0:[216,232],1:[220,214],2:[200,260,'ko']}),
    U('br_durn','t','cav',2,'Durnford\'s mounted troops',`Rode out to find the Zulu, then fell back.`,{0:[180,300],1:[260,180],2:[200,250,'ko']}),
    U('br_aux','t','inf',2,'African auxiliaries',`Natal Native Contingent, poorly armed and supplied.`,{0:[230,280],2:[180,300,'ko']}),
    U('br_chelm','t','inf',3,'Chelmsford\'s force',`About half the column, searching to the southeast.`,{0:[230,300],1:[340,390,'exit']}),
    U('br_cmd','t','cmd',1,'Pulleine',`Left in command of the camp with orders to defend it.`,{0:[220,252],2:[214,256,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['td',230,300,300,360,336,386]]},
    {a:[['g',240,110,232,184],['g',320,150,330,240,284,286],['g',110,120,110,220,146,256],['g',250,60,150,120,104,174]]}
  ],
  decisions:[
    {when:'21 to 22 January 1879', title:'Find them before they find you',
     ctx:`The British column is camped at Isandlwana. Your army is a few days' march away. Skirmishing to the southeast has caught Chelmsford's attention.`,
     q:`How do you approach the camp?`,
     opts:[
       {t:`March openly across the plain and attack the camp in daylight`, s:0, fb:`Massed rifles and artillery in open ground would cut down your regiments long before they closed.`, alt:{u:{zu_chest:[260,330], zu_lhorn:[320,320], br_line:[230,300]}, a:[['g',260,50,260,320]]}},
       {t:`Move in small groups across broken country into the hidden Ngwebeni valley, close to the camp, while the British look southeast`, s:3, fb:`An army that cannot be found cannot be prepared against. Staying hidden close by keeps every option open.`},
       {t:`Attack Chelmsford's column wherever it moves`, s:1, fb:`You would face the strongest part of the British force, on ground it chooses.`}],
     result:`The Zulu army moves in dispersed groups and gathers, unseen, in the Ngwebeni valley. Before dawn on 22 January, Chelmsford takes about half the column southeast to look for the main Zulu army, leaving the camp under Pulleine.`,
     why:`Concealment let the Zulu army get close, and the British split their forces chasing the wrong target.`,
     tv:`Chelmsford was convinced the Zulu would avoid battle. He did not fortify the camp, believing it was not needed for a short stay.`},
    {when:'Late morning, 22 January', title:'Discovered',
     ctx:`British mounted troops scouting the plateau stumble on your army in the valley. Your commanders had not planned to attack today.`,
     q:`What do you do?`,
     opts:[
       {t:`Pull back and fight another day`, s:1, fb:`The camp would be warned and reinforced, and Chelmsford could return.`},
       {t:`Attack at once in the horns formation: the chest pins the firing line while the horns encircle the camp`, s:3, fb:`The camp is at its weakest with half the column away. The horns turn the British strength, a long firing line, into a weakness with nothing behind it.`},
       {t:`Send everyone straight at the firing line`, s:0, fb:`A pure frontal attack plays to the British rifles.`}],
     result:`The regiments pour off the plateau. The chest is held up by rifle fire for a time, but the horns sweep around both sides of the camp and behind Isandlwana hill. The British line, stretched far from the camp, is overrun. The loins move on to attack the post at Rorke's Drift that evening.`}
  ],
  debrief:{
    title:'The invisible army',
    outcome:`More than 1,300 British soldiers and African auxiliaries are killed, one of the worst defeats of a modern European army by an African force. Zulu losses are also heavy, perhaps 1,000 or more. Britain sends reinforcements, and the Zulu kingdom is defeated at Ulundi that July.`,
    why:`The Zulu commanders combined speed, concealment and a battle formation designed to encircle, then struck when the British had divided their force.`,
    them:`Chelmsford underestimated his enemy, split his column to chase a phantom, and left the camp unfortified because he did not expect an attack.`,
    board:{h:`Don't let your strength become your blind spot`, b:`British firepower was so dominant on paper that they skipped basic precautions. Organizations with a big technical edge often stop asking what happens if an opponent avoids it. The Zulu commanders also show the other side: speed and surprise against a confident, divided incumbent.`, try:`List the precautions your team has quietly dropped because "we're the market leader". Pick one to restore.`},
    principles:['deceive','flank','habits']
  }
});

/* ===== 22. MYEONGNYANG ===== */
PGD.add({
  n:22, id:'myeongnyang', name:'Myeongnyang', year:'1597', place:'Southwest coast of Korea', side:'g', you:'Admiral Yi Sun-sin', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Joseon', name:'Joseon navy', cmdr:'Admiral Yi Sun-sin', str:'13 warships', eyes:'Through Korean eyes'},
  t:{short:'Japan', name:'Japanese fleet', cmdr:'Todo Takatora, Kurushima Michifusa and others', str:'133 warships, with many more support vessels behind', eyes:'Through Japanese eyes'},
  brief:{
    hook:`Thirteen ships against more than a hundred. The court has told you to give up the navy.`,
    situation:`Autumn 1597. Japan has invaded Korea for the second time. Weeks ago, while Yi was out of command, the Korean fleet was almost wiped out at Chilcheollyang. Yi has been restored as commander and has gathered what is left: 13 ships. A large Japanese fleet is moving up the southwest coast to link up with its armies.`,
    forces:`13 panokseon warships: sturdy, high-sided ships with cannon. Your captains and crews are shaken by the recent disaster.`,
    enemy:`Over 130 warships with boarding troops. Japanese tactics favor grappling and boarding enemy ships, where their soldiers excel.`,
    ground:`The Myeongnyang strait (Uldolmok), between Jindo island and the mainland, is very narrow, with one of the fastest tidal currents in Korea. The current flows hard one way, then reverses.`,
    supply:`The court has ordered Yi to abandon the navy and join the army on land. Yi has replied that he still has 12 ships (a 13th joined later).`,
    intel:`Local people and scouts know the timing of the current. The Japanese fleet plans to push through the strait.`,
    objective:`Stop the Japanese fleet from getting through the strait.`,
    notes:[`In open water, they can surround you. In a narrow strait, only a few can reach you at once.`,`Your cannon outrange boarding parties if you keep them off.`,`The current will change. Plan for both directions.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 0 H400 V90 Q300 120 230 160 Q200 175 170 160 Q100 120 0 110 Z','#9cab70');
    s+=land('M0 400 H400 V310 Q300 280 230 240 Q200 225 170 240 Q100 280 0 290 Z','#a9a86e');
    s+=hill(80,40,60,26,2)+hill(320,360,60,26,2);
    [0,1,2,3].forEach(k=>s+=`<path d="M${40+k*90} 200 l26 0 m-8 -5 l8 5 l-8 5" stroke="#e8f4fa" stroke-width="2" fill="none" opacity=".75"/>`);
    s+=label(200,200,'Myeongnyang strait',10)+label(80,60,'Mainland',10)+label(320,370,'Jindo island',10)+label(330,186,'Fast tidal current',8);
    s+=compass(380,26);
    return s+end();
  },
  features:[
    {x:200,y:200,r:30,name:'The narrows',why:`The narrowest point of the strait. Only a handful of ships can fight side by side here.`},
    {x:300,y:200,r:40,name:'The current',why:`A fierce tidal current that flows one way, then reverses during the day. Ships fighting against it struggle to hold position.`},
    {x:60,y:200,r:30,name:'The exit behind Yi',why:`If the Japanese break through here, the route to the west coast is open.`}
  ],
  units:[
    U('ko_flag','g','ship',1,'Yi Sun-sin\'s flagship',`Held the strait almost alone at the start of the battle.`,{0:[90,200],1:[150,200],2:[170,200]}),
    U('ko_ships','g','ship',2,'The other 12 ships',`Held back at first, then joined the fight when Yi signalled them forward.`,{0:[60,190],1:[90,190],2:[150,190]}),
    U('ko_refugee','g','gal',1,'Refugee boats',`Civilian boats placed far behind, making the fleet look larger from a distance.`,{0:[20,230]}),
    U('ko_yi','g','cmd',1,'Yi Sun-sin',`Led from the front of the line.`,{0:[100,220],1:[150,220],2:[170,222]}),
    U('jp_van','t','ship',3,'Japanese vanguard',`Smaller, faster ships that entered the strait first.`,{0:[340,200],1:[200,200],2:[220,200,'ko']}),
    U('jp_main','t','gal',3,'Main Japanese fleet',`Packed behind the vanguard, unable to deploy in the narrows.`,{0:[380,190],1:[260,200],2:[340,200]}),
    U('jp_cmd','t','cmd',1,'Kurushima Michifusa',`A commander killed in the battle.`,{0:[370,220],1:[230,220],2:[230,220,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['t',340,200,206,200],['t',380,190,264,196]]},
    {a:[['g',90,190,146,190],['g',150,200,214,200],['td',260,200,336,200]]}
  ],
  decisions:[
    {when:'September 1597', title:'Where to fight',
     ctx:`You have 13 ships. The court has ordered you to give up the navy. The Japanese fleet is approaching along the coast.`,
     q:`What do you do?`,
     opts:[
       {t:`Obey the order: scuttle the ships and join the army on land`, s:0, fb:`The Japanese fleet would control the sea, supplying its armies freely up the west coast.`, alt:{u:{ko_flag:[20,200,'exit'], ko_ships:[20,190,'exit'], jp_main:[60,200]}, a:[['t',380,190,70,200]]}},
       {t:`Fight in the open sea before they reach the strait`, s:0, fb:`In open water, 133 ships would surround and board your 13.`},
       {t:`Block the narrow Myeongnyang strait, where only a few enemy ships can reach you at once`, s:3, fb:`The narrows cancel their numbers. Each Japanese ship arriving faces your cannon alone.`}],
     result:`Yi positions his ships at the western end of the strait. On the morning of the battle, the Japanese fleet enters the narrows, riding the current toward him. Yi's flagship moves forward to meet them. Many of his captains, shaken by the earlier disaster, hang back.`,
     why:`Yi chose ground that turned a numbers battle into a series of small fights.`,
     tv:`The Japanese commanders knew the Korean fleet was tiny. They expected to push through with sheer weight.`},
    {when:'The battle', title:'Alone against the current',
     ctx:`The current is pushing the Japanese toward you. Your flagship is fighting nearly alone at the front, surrounded by enemy vessels. Your other captains are holding back.`,
     q:`What do you do?`,
     opts:[
       {t:`Retreat with the rest of the fleet`, s:0, fb:`The strait would be open, and the fleet's fighting spirit would be broken for good.`},
       {t:`Hold position with the flagship, signal your captains forward, and wait for the current to turn`, s:3, fb:`Holding buys time. When the current reverses, the packed Japanese ships will be pushed back into each other.`},
       {t:`Charge deep into the Japanese fleet`, s:1, fb:`Brave, but your flagship would be surrounded and boarded.`}],
     result:`Yi's flagship holds the strait for hours, firing into the Japanese ships crowding toward it. He signals his captains, and they come forward. When the current reverses, the Japanese fleet, crammed together in the narrows, is thrown into confusion. Around 30 Japanese warships are destroyed and the commander Kurushima Michifusa is killed. The Japanese fleet withdraws.`}
  ],
  debrief:{
    title:'Thirteen ships',
    outcome:`Not a single Korean ship is lost. The Japanese fleet gives up its push up the west coast, which helps stall the invasion. Japan withdraws from Korea in 1598.`,
    why:`Yi chose the one place where numbers did not matter, timed the fight to the current, and held the line personally when his captains wavered.`,
    them:`The Japanese commanders assumed numbers would win and crowded into a narrow strait where they could not use them.`,
    board:{h:`Pick the narrow ground and lead from the front`, b:`When you are heavily outnumbered, find the constraint that makes size irrelevant: a tight timeline, a niche audience, a single decision-maker. And when your team has just been burned, they need to see you go first.`, try:`Where is your team most outmatched right now? Name the narrowest point where only a few competitors can reach the customer at once.`},
    principles:['ground','timing','own']
  }
});

/* ===== 23. EL ALAMEIN ===== */
PGD.add({
  n:23, id:'alamein', name:'El Alamein', year:'1942', place:'Western Desert, Egypt', side:'g', you:'General Bernard Montgomery', minutes:6,
  face:{g:-1,t:1},
  g:{short:'Britain', tab:'8th Army', name:'British Eighth Army and Commonwealth forces', cmdr:'Lieutenant General Bernard Montgomery', str:'About 195,000 men and over 1,000 tanks', eyes:'Through Eighth Army eyes'},
  t:{short:'Axis', name:'German and Italian Panzer Army Africa', cmdr:'Field Marshal Erwin Rommel (on sick leave in Germany when the battle began)', str:'About 116,000 men and roughly 550 tanks', eyes:'Through Axis eyes'},
  brief:{
    hook:`There is no open flank to go around. You will have to go through, so make them guess where.`,
    situation:`October 1942. Rommel's army has pushed deep into Egypt, but has been stopped at El Alamein, about 100 km from Alexandria. Montgomery has taken command of the Eighth Army and has spent weeks rebuilding it for an offensive.`,
    forces:`More men, tanks and guns than the enemy, with new American Sherman tanks and strong air superiority.`,
    enemy:`Dug in behind deep minefields, nicknamed the Devil's Gardens, with German and Italian armored divisions behind them. Short of fuel.`,
    ground:`The front runs about 60 km from the coast south to the Qattara Depression, a huge sunken area of salt marsh impassable to tanks. There is no open flank. Any attack must break through the minefields.`,
    supply:`Your supplies are close. The Axis supply line runs hundreds of kilometres back across the desert, and its fuel tankers are being sunk at sea.`,
    intel:`Axis commanders expect an attack, but do not know where or when.`,
    objective:`Break through the Axis line and destroy Rommel's army.`,
    notes:[`Tanks, guns and supply dumps are hard to hide in a flat desert.`,`Minefields must be cleared on foot, usually at night.`,`A breakthrough attempt can stall. Keep something back.`]
  },
  terrain(){
    let s=felt('#d6c08a');
    s+=sea('M0 0 H400 V40 Q300 50 200 40 Q100 30 0 46 Z');
    s+=`<path d="M0 400 V340 Q100 320 200 350 Q300 370 400 340 V400 Z" fill="#c7b9a0" stroke="#a3927a" stroke-dasharray="4 3"/>`;
    s+=`<path d="M230 50 Q240 200 230 330" fill="none" stroke="#7a5a3a" stroke-width="16" opacity=".22"/>`;
    for(let y=60;y<330;y+=14) s+=`<circle cx="${226+((y*7)%12)}" cy="${y}" r="1.6" fill="#5a3a20" opacity=".6"/>`;
    s+=road('M0 60 L400 56');
    s+=label(200,22,'Mediterranean',10)+label(200,384,'Qattara Depression',10)+label(250,190,'Minefields',9,90)+label(60,74,'El Alamein',9);
    s+=compass(26,320);
    return s+end();
  },
  features:[
    {x:230,y:190,r:0,px:226,py:250,d:'M230 50 Q240 200 230 330',line:true,name:'The Devil\'s Gardens',why:`Deep Axis minefields, laced with booby traps, covering the whole front.`},
    {x:200,y:370,r:40,name:'Qattara Depression',why:`Impassable to tanks. It closed the southern flank, so there was no way around.`},
    {x:100,y:280,r:40,name:'The southern dummy army',why:`Fake tanks, guns and a dummy water pipeline built to suggest an attack in the south.`}
  ],
  units:[
    U('gb_inf','g','inf',3,'XXX Corps infantry',`Cleared paths through the minefields in the northern sector.`,{0:[150,110],1:[220,110],2:[230,110]}),
    U('gb_arm','g','arm',3,'X Corps armor',`Hidden as trucks before the battle, then pushed through the cleared corridors.`,{0:[100,130],1:[200,130],2:[260,150]}),
    U('gb_res','g','arm',2,'New Zealand and reserve armor',`Regrouped for Operation Supercharge.`,{0:[60,110],1:[120,110],2:[290,110]}),
    U('gb_dummy','g','arm',2,'Dummy army in the south',`Plywood and canvas tanks, fake guns and a half-built fake pipeline.`,{0:[160,280],1:[160,280,'decoy']}),
    U('gb_guns','g','art',3,'Massed artillery',`Opened with a huge night barrage on 23 October.`,{0:[130,90]}),
    U('gb_monty','g','cmd',1,'Montgomery',`Insisted on detailed rehearsal and a battle of attrition, then a decisive breakout.`,{0:[60,80]}),
    U('ax_north','t','inf',3,'Axis infantry, north',`German and Italian infantry behind the minefields.`,{0:[260,100],2:[290,100,'ko']}),
    U('ax_panz','t','arm',3,'German panzer divisions',`Shifted north to counterattack the breakthrough, burning scarce fuel.`,{0:[320,250],1:[290,140],2:[380,90,'exit']}),
    U('ax_ital','t','arm',2,'Italian armored divisions',`Fought hard and were largely destroyed.`,{0:[300,300],1:[300,280],2:[300,200,'ko']}),
    U('ax_cmd','t','cmd',1,'Rommel',`Returned from sick leave on 25 October to find the battle under way.`,{0:[360,60,'off'],1:[340,60]})
  ],
  states:[
    {a:[]},
    {a:[['g',150,110,216,110],['g',100,130,196,130],['t',320,250,300,190,292,146]]},
    {a:[['g',120,110,200,100,284,110],['g',200,130,256,148],['td',290,140,376,92]]}
  ],
  decisions:[
    {when:'Planning, September to October 1942', title:'Where and how to attack',
     ctx:`There is no open flank. Your build-up is huge and hard to hide in open desert. Rommel's army is waiting behind deep minefields.`,
     q:`How do you plan the attack?`,
     opts:[
       {t:`Attack in the south, where the minefields are thinner`, s:1, fb:`The south is weaker, but it leads nowhere useful, and the open desert there favors Rommel's mobile panzers.`},
       {t:`Attack in the north near the coast road, and build a deception to suggest the south and a later date`, s:3, fb:`The north leads to the coast road and the Axis supply line. Deception makes the enemy spread its armor and react late.`},
       {t:`Attack along the whole front at once`, s:0, fb:`Spreading out everywhere means breaking through nowhere.`, alt:{u:{gb_inf:[220,180], gb_arm:[200,260]}, a:[['g',150,110,220,180],['g',100,130,200,256]]}}],
     result:`Operation Bertram hides the real build-up: tanks are disguised as trucks in the north, while dummy tanks, fake guns and a slowly built fake water pipeline in the south suggest an attack there, and later. On the night of 23 October a massive barrage opens and infantry and engineers clear corridors through the northern minefields.`,
     why:`Deception kept much of the Axis armor in the south when the attack came in the north.`,
     tv:`Axis commanders saw the southern build-up and the pace of the pipeline and expected an attack later, and possibly in the south. Rommel was in Germany on sick leave, and his replacement died of a heart attack on the first day.`},
    {when:'Late October 1942', title:'The attack is stalling',
     ctx:`The northern corridors are only partly cleared. Your armor is jammed in the minefields, and losses are mounting. Rommel has returned and is counterattacking.`,
     q:`What do you do?`,
     opts:[
       {t:`Call off the offensive and rethink`, s:0, fb:`You would give up the ground and the advantage, and Rommel's army would recover.`},
       {t:`Keep up pressure to wear down their armor, while pulling out units to form a fresh reserve for a new breakthrough`, s:3, fb:`Steady pressure makes Rommel burn fuel and tanks in counterattacks. A fresh reserve lets you strike again where he is weakest.`},
       {t:`Keep pushing tanks through the same jammed corridors`, s:1, fb:`More tanks into a traffic jam under fire means more losses with little gain.`}],
     result:`Montgomery switches to "crumbling" attacks that draw Rommel's armor into costly counterattacks, while regrouping fresh forces. On 2 November Operation Supercharge punches through. Rommel, short of fuel and tanks, begins to retreat on 4 November.`}
  ],
  debrief:{
    title:'Make them guess, then keep a fresh punch',
    outcome:`The Axis army retreats from Egypt and never returns. Days later, American and British forces land in northwest Africa, and the Axis forces are squeezed out of Africa by May 1943.`,
    why:`Montgomery combined a big material advantage with deception, careful preparation and a reserve kept fresh for the decisive push.`,
    them:`Rommel's army was badly short of fuel and could not move freely. Its commander was away when the attack came.`,
    board:{h:`When you can't go around, make them guess where you'll come through`, b:`Sometimes there is no clever flank, only a crowded market or a well-defended client. Then the edge comes from where you focus, what you signal, and keeping something back for when the first push stalls.`, try:`For your next big push, decide in advance what you'll do if it stalls after a week. Hold back resources for it.`},
    principles:['deceive','reserve','logistics']
  }
});

/* ===== 24. ALESIA ===== */
PGD.add({
  n:24, id:'alesia', name:'Alesia', year:'52 BC', place:'Burgundy, France', side:'g', you:'Julius Caesar', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Rome', name:'Roman legions', cmdr:'Gaius Julius Caesar', str:'Perhaps 60,000 to 75,000, including auxiliaries', eyes:'Through Roman eyes'},
  t:{short:'Gauls', name:'Gallic coalition', cmdr:'Vercingetorix (inside Alesia) and the leaders of the relief army', str:'Caesar claimed 80,000 inside and a quarter of a million in the relief army. Modern historians think the real numbers were smaller, but still larger than his', eyes:'Through Gallic eyes'},
  brief:{
    hook:`You have trapped the enemy in a hilltop town. Now a much larger army is coming to rescue them.`,
    situation:`52 BC. Most of Gaul has risen against Rome under Vercingetorix. After failing to defeat Caesar in the field, he has withdrawn his army into Alesia, a fortified town on a steep hill. Caesar has followed.`,
    forces:`Experienced legions, expert at engineering and fieldworks, with German cavalry allies.`,
    enemy:`A large army inside the town, with limited food. Vercingetorix has sent his cavalry out to raise a relief army from all of Gaul.`,
    ground:`Alesia sits on a plateau surrounded by rivers and hills. Storming its slopes would be very costly.`,
    supply:`Food is running short inside the town. Your own supplies depend on foraging the surrounding country.`,
    intel:`Gallic deserters and scouts warn that a huge relief army is gathering.`,
    objective:`Capture Vercingetorix and break the revolt.`,
    notes:[`Hunger works for you inside the town, as long as the siege holds.`,`If the relief army arrives, you are the one surrounded.`,`Your legionaries can dig faster than any army in the world.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=hill(200,200,70,46,4)+hill(80,80,50,30,2)+hill(330,330,50,30,2)+hill(100,330,50,26,2);
    s+=river('M0 270 Q200 290 400 260',6)+river('M0 130 Q200 120 400 140',6);
    s+=`<circle cx="200" cy="200" r="100" fill="none" stroke="#6b4a2a" stroke-width="4" stroke-dasharray="6 3"/>`;
    s+=house(196,196)+house(208,202,'#8a3a2a')+house(190,206);
    s+=label(200,176,'Alesia',10)+label(200,96,'Inner wall',8)+label(80,370,'Mont Rea camp',8);
    s+=compass(380,26);
    return s+end();
  },
  over(){ return `<g class="ph" data-show="1 2"><circle cx="200" cy="200" r="150" fill="none" stroke="#6b4a2a" stroke-width="4" stroke-dasharray="6 3"/>${label(200,46,'Outer wall',8)}</g>`; },
  features:[
    {x:200,y:300,r:0,px:280,py:280,d:'M100 200 A100 100 0 1 0 300 200 A100 100 0 1 0 100 200',line:true,name:'The inner wall',why:`About 15 km of ditches, ramparts and towers facing the town, built to keep Vercingetorix in.`},
    {x:200,y:50,r:0,px:340,py:120,d:'M50 200 A150 150 0 1 0 350 200 A150 150 0 1 0 50 200',line:true,name:'The outer wall',why:`About 20 km of fortifications facing outward, built to hold off the relief army.`},
    {x:80,y:330,r:30,name:'The weak point',why:`A Roman camp on lower ground below a hill, hard to include in the lines. The Gauls found it and attacked it hardest.`}
  ],
  units:[
    U('ro_inner','g','hvy',3,'Legions on the inner line',`Faced the town.`,{0:[150,260],1:[130,250],2:[130,250]}),
    U('ro_outer','g','hvy',3,'Legions on the outer line',`Faced the relief army.`,{0:[260,140],1:[300,100],2:[300,100]}),
    U('ro_res','g','hvy',2,'Labienus and the reserve',`Rushed to the threatened camp.`,{0:[250,250],1:[260,260],2:[110,310]}),
    U('ro_cav','g','cav',2,'German cavalry',`Sent outside the walls to hit the relief army from behind.`,{0:[230,270],1:[240,290],2:[40,370]}),
    U('ro_cmd','g','cmd',1,'Caesar',`Wore a distinctive red cloak so his men could see him arrive at the crisis point.`,{0:[280,230],2:[120,300]}),
    U('ga_town','t','inf',3,'Vercingetorix\'s army',`Inside Alesia, attacking outward.`,{0:[200,200],2:[150,250]}),
    U('ga_rel','t','inf',3,'Relief army',`Attacked the outer wall from outside.`,{0:[380,40,'off'],1:[360,40],2:[60,370]}),
    U('ga_vas','t','spr',2,'Vercassivellaunus\'s picked force',`Attacked the weak camp on the low ground.`,{0:[380,380,'off'],1:[20,380],2:[80,350,'ko']}),
    U('ga_cmd','t','cmd',1,'Vercingetorix',`Surrendered to Caesar after the relief army broke.`,{0:[210,186]})
  ],
  states:[
    {a:[]},
    {a:[['t',380,40,364,40],['t',380,380,26,380]]},
    {a:[['t',200,200,150,248],['t',20,380,76,354],['g',260,260,180,320,114,310],['g',240,290,40,380,44,370]]}
  ],
  decisions:[
    {when:'Summer 52 BC', title:'A relief army is coming',
     ctx:`Vercingetorix is trapped inside Alesia, and his food is running out. But his cavalry escaped and is raising a huge relief army.`,
     q:`What do you do?`,
     opts:[
       {t:`Storm the town before the relief army arrives`, s:0, fb:`Assaulting a steep, fortified hill against a large army would cost huge losses, and might fail.`, alt:{u:{ro_inner:[180,220,'ko']}, a:[['g',150,260,184,222]]}},
       {t:`Lift the siege and fall back`, s:1, fb:`Safe for the army, but Vercingetorix goes free and the revolt grows.`},
       {t:`Build a second ring of fortifications facing outward, so you can hold off the relief army while still starving the town`, s:3, fb:`Two walls let you fight on interior lines: your reserves can move between the inner and outer lines faster than either enemy can coordinate.`}],
     result:`The legions build two rings of fortifications: an inner line facing the town, and an outer one facing outward, with ditches, ramparts, towers and fields of hidden pits and stakes. When the relief army arrives, it attacks the outer wall while Vercingetorix attacks from inside. The Roman lines hold.`,
     why:`Engineering let a smaller army fight two larger ones at once.`,
     tv:`The Gauls expected to crush the Romans between two armies. They struggled to coordinate attacks across the Roman lines.`},
    {when:'The final attack', title:'The weak point',
     ctx:`The relief army has found the weak point: a camp on low ground below a hill. A picked force is attacking it hard, while Vercingetorix attacks the inner line at the same time.`,
     q:`How do you respond?`,
     opts:[
       {t:`Hold every part of the line equally`, s:0, fb:`The weak point would fall, and the whole system would unravel.`},
       {t:`Rush your reserve to the weak point, go there yourself, and send cavalry around outside the walls to hit the attackers from behind`, s:3, fb:`The reserve plugs the gap, your presence lifts morale, and the cavalry turns defense into attack.`},
       {t:`Pull back from the outer line and defend only the inner one`, s:0, fb:`You would be caught between both armies.`}],
     result:`Caesar sends Labienus with reserves to the threatened camp, then arrives himself, recognizable by his red cloak. The German cavalry rides out and hits the attackers from behind. The relief army breaks. The next day Vercingetorix surrenders.`}
  ],
  debrief:{
    title:'Two walls',
    outcome:`The Gallic revolt collapses, and Gaul becomes part of the Roman world for the next five centuries. Vercingetorix is taken to Rome and later executed.`,
    why:`Caesar turned a siege into a fortified position on interior lines, and used reserves and cavalry to win at the one point that mattered.`,
    them:`The Gallic armies outnumbered Caesar but struggled to coordinate inside and outside the walls. When they found the weak point, Caesar's reserve was already moving.`,
    board:{h:`Defend two fronts with a mobile reserve`, b:`Teams are often squeezed from both sides: a client pushing on cost, and a competitor pushing on quality. Caesar didn't try to be strong everywhere. He built strong lines and kept a reserve ready for wherever the real pressure came.`, try:`List your two biggest pressures. What resource could you hold back to throw at whichever one breaks first?`},
    principles:['interior','reserve','ground']
  }
});

/* ===== 25. CHANCELLORSVILLE ===== */
PGD.add({
  n:25, id:'chancellorsville', name:'Chancellorsville', year:'1863', place:'Virginia, United States', side:'g', you:'General Robert E. Lee', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Confederacy', name:'Army of Northern Virginia', cmdr:'General Robert E. Lee, with Lieutenant General Thomas "Stonewall" Jackson', str:'About 60,000', eyes:'Through Confederate eyes'},
  t:{short:'Union', name:'Army of the Potomac', cmdr:'Major General Joseph Hooker', str:'About 130,000', eyes:'Through Union eyes'},
  brief:{
    hook:`You are outnumbered more than two to one. The textbook says never split your army. You are about to do it twice.`,
    situation:`Spring 1863. Lee's army holds a line along the Rappahannock River around Fredericksburg. Hooker has rebuilt the Union army and launched a clever plan: leave part of it facing Fredericksburg, and march most of it upstream to cross the river behind Lee's left.`,
    forces:`An experienced, confident army, short on supplies, with two of its divisions away in southern Virginia.`,
    enemy:`A Union army more than twice your size, now across the river on your flank, near a crossroads called Chancellorsville.`,
    ground:`Around Chancellorsville lies the Wilderness: dense second-growth forest with few roads, where large armies are hard to control and artillery is hard to use.`,
    supply:`Your army is thin on food and horses. A long campaign of retreat would hurt you more than Hooker.`,
    intel:`Your cavalry commander, J.E.B. Stuart, is scouting the Union positions.`,
    objective:`Defeat Hooker's army before it can trap you between its two halves.`,
    notes:[`If you stand still, you will be caught between two Union forces.`,`A bigger army is only bigger where it can be used.`,`An exposed flank is an invitation.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=river('M0 60 Q150 70 260 120 Q330 150 400 140',12);
    s+=trees(251,90,[0,300,130,330],()=>true,['#2f5a24','#3b6b2b','#2a4f20']);
    s+=house(200,200)+house(212,206,'#8a3a2a')+house(350,200)+house(358,206,'#8a3a2a')+house(362,196);
    s+=road('M0 210 L400 200')+road('M200 200 L180 400');
    s+=label(200,184,'Chancellorsville',9)+label(360,224,'Fredericksburg',9)+label(80,300,'The Wilderness',11)+label(120,48,'Rappahannock River',9);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:120,y:260,r:0,px:100,py:300,d:'M0 130 H300 V330 H0 Z',name:'The Wilderness',why:`Dense, tangled forest that hid troop movements and cancelled the Union's advantage in numbers and artillery.`},
    {x:60,y:206,r:30,name:'The Union right flank',why:`Howard's XI Corps faced south, with its western end "in the air": not anchored on any obstacle.`},
    {x:120,y:350,r:30,name:'Jackson\'s route',why:`A hidden forest road that let about 28,000 men march around the Union army.`}
  ],
  units:[
    U('cs_jack','g','inf',3,'Jackson\'s corps',`Marched around the Union army and struck its open flank.`,{0:[330,240],1:[240,230],2:[30,220]}),
    U('cs_lee','g','inf',2,'Lee\'s holding force',`About 14,000 men who kept up pressure on the Union front.`,{0:[340,260],1:[250,250],2:[240,240]}),
    U('cs_early','g','inf',2,'Early\'s division',`Left behind to hold Fredericksburg.`,{0:[350,230],1:[350,230]}),
    U('cs_stuart','g','cav',1,'Stuart\'s cavalry',`Found the open Union flank.`,{0:[300,280],1:[100,250],2:[60,260]}),
    U('cs_cmd','g','cmd',1,'Lee',`Took the risk of splitting his army in the face of a much larger one.`,{0:[320,270],1:[260,270]}),
    U('us_hook','t','inf',3,'Hooker\'s main army',`Pulled back into a defensive position around Chancellorsville.`,{0:[100,100],1:[200,190],2:[210,170]}),
    U('us_xi','t','inf',2,'XI Corps (Howard)',`Holding the far right, facing south. Routed by Jackson's attack.`,{0:[60,100],1:[60,200],2:[90,150,'ko']}),
    U('us_sedg','t','inf',3,'Sedgwick\'s wing',`Left facing Fredericksburg.`,{0:[340,170],1:[340,170],2:[330,180]}),
    U('us_cmd','t','cmd',1,'Hooker',`Confident at first, then cautious once Lee struck. Stunned by a cannonball hitting his headquarters on 3 May.`,{0:[120,80],1:[210,180]})
  ],
  states:[
    {a:[]},
    {a:[['t',100,100,196,184],['g',330,240,246,232]]},
    {a:[['g',240,230,150,340,40,240,32,224],['g',100,250,62,256],['g',30,220,84,160]]}
  ],
  decisions:[
    {when:'30 April 1863', title:'Hooker is on your flank',
     ctx:`Hooker has crossed the river upstream with most of his army and is moving toward your rear. Another large Union force still faces you at Fredericksburg.`,
     q:`What do you do?`,
     opts:[
       {t:`Retreat south toward Richmond`, s:1, fb:`It saves the army for now, but gives up northern Virginia and leaves Hooker with the initiative.`},
       {t:`Leave a small force to hold Fredericksburg, and march most of the army west to strike Hooker`, s:3, fb:`If you hit the main Union force before it is ready, the force at Fredericksburg will not have time to help it.`},
       {t:`Stay in your Fredericksburg positions and wait`, s:0, fb:`You would be caught between two Union armies.`, alt:{u:{us_hook:[260,260]}, a:[['t',100,100,250,250]]}}],
     result:`Lee leaves about 10,000 men under Early at Fredericksburg and marches west. On 1 May his advance meets Hooker's army coming out of the Wilderness. Hooker, surprised by the aggressive response, pulls back into a defensive position around Chancellorsville.`,
     why:`Moving fast toward the bigger enemy took the initiative away from Hooker.`,
     tv:`Hooker had expected Lee to retreat. When Lee attacked instead, Hooker lost confidence and gave up the open ground he had marched to reach.`},
    {when:'Night of 1 May', title:'The open flank',
     ctx:`Hooker is dug in at Chancellorsville. A frontal attack looks hopeless. Stuart reports that the Union right flank, far to the west, is not anchored on anything and faces the wrong way.`,
     q:`What do you do?`,
     opts:[
       {t:`Attack the Union positions head-on`, s:0, fb:`Assaulting a dug-in army twice your size in the forest would be a slaughter.`},
       {t:`Send Jackson with most of the army on a long hidden march around the flank, while you hold the front with about 14,000 men`, s:3, fb:`A huge risk, but it puts most of your strength against the one point where the Union army is unprepared.`},
       {t:`Withdraw while you still can`, s:1, fb:`Safe, but it throws away a real opportunity.`}],
     result:`On 2 May, Jackson's men march about 20 km through the forest. Union scouts see part of the column but Hooker thinks Lee is retreating. In the late afternoon Jackson's men burst out of the woods onto the Union XI Corps, which collapses. That night, Jackson is badly wounded by his own troops in the dark. Over the next days Lee drives Hooker back across the river.`}
  ],
  debrief:{
    title:'Split the army, twice',
    outcome:`Hooker retreats across the Rappahannock by 6 May. The Union loses about 17,000 men and the Confederacy about 13,000, a much larger share of its smaller army. Jackson dies of his wounds on 10 May. A confident Lee invades the North weeks later, leading to Gettysburg.`,
    why:`Lee read Hooker's caution, used the forest to hide a huge flank march, and concentrated force where the Union army was not looking.`,
    them:`Hooker had a brilliant opening plan, then lost his nerve when Lee responded aggressively. His right flank was left unanchored despite warnings.`,
    board:{h:`Bold moves work best against a cautious opponent, and they cost`, b:`Lee won by doing what the textbook said not to, because he had read Hooker correctly. But even victory cost him his best general and more men than he could replace, and the confidence it bred helped lead to Gettysburg. Wins can teach the wrong lessons.`, try:`Think of a recent win. What risk did you take that might not work next time?`},
    principles:['flank','economy','intel']
  }
});

/* ===== 26. MEGIDDO ===== */
PGD.add({
  n:26, id:'megiddo', name:'Megiddo', year:'1918', place:'Palestine', side:'g', you:'General Sir Edmund Allenby', minutes:5,
  face:{g:-1,t:1},
  g:{short:'British Empire', tab:'Allenby', name:'Egyptian Expeditionary Force', cmdr:'General Sir Edmund Allenby', str:'About 57,000 infantry and 12,000 cavalry', eyes:'Through British eyes'},
  t:{short:'Ottoman Empire', tab:'Ottomans', name:'Ottoman Yildirim Army Group, with German support', cmdr:'General Otto Liman von Sanders', str:'Perhaps 35,000 to 40,000 at the front, many sick and short of supplies', eyes:'Through Ottoman eyes'},
  brief:{
    hook:`The enemy thinks they know where you'll attack. Help them keep thinking it.`,
    situation:`September 1918. The final year of the First World War. Allenby's army holds a line across Palestine from the Mediterranean coast to the Jordan Valley. Facing it are three Ottoman armies. Twice this year, British raids have crossed the Jordan toward Amman.`,
    forces:`Infantry divisions, a powerful mounted corps of British, Australian, New Zealand and Indian cavalry, air superiority from the Royal Air Force, and the Arab Northern Army fighting alongside you east of the Jordan.`,
    enemy:`Ottoman infantry holding entrenched lines, tired and short of food and supplies, with German and Austrian support units.`,
    ground:`The coastal plain is open, flat and good for cavalry. Beyond it, the Carmel ridge has passes leading to the Jezreel Valley, where the Ottoman railways and roads meet.`,
    supply:`The Ottoman armies depend on a few railway lines and roads through the Jezreel Valley and the Jordan Valley.`,
    intel:`After the raids toward Amman, Liman von Sanders expects the next attack in the Jordan Valley.`,
    objective:`Destroy the Ottoman armies in Palestine.`,
    notes:[`Cavalry can move fast through a gap, if one can be made.`,`Cut the roads behind an army and it cannot retreat or be supplied.`,`Dust clouds, camps and horse lines reveal where an army is.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M80 0 H400 V400 H60 Q90 300 70 200 Q60 100 80 0 Z','#c8b88a');
    s+=river('M360 0 Q350 200 370 400',6);
    s+=mtn(150,200,26)+mtn(170,180,22)+mtn(250,260,24)+mtn(270,300,22)+mtn(260,120,20);
    s+=`<path d="M190 120 Q230 140 300 150" fill="none" stroke="#a9a86e" stroke-width="18" opacity=".5"/>`;
    s+=road('M90 380 L120 60')+road('M200 140 L360 160');
    s+=label(30,200,'Mediterranean',10,-90)+label(230,128,'Jezreel Valley',9)+label(170,220,'Carmel ridge',8)+label(370,330,'Jordan Valley',9,90)+label(110,40,'Coastal plain',8)+label(200,110,'Megiddo',8);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:100,y:300,r:30,name:'The coastal plain',why:`Open, flat country where cavalry could ride fast once the front line was broken.`},
    {x:160,y:190,r:30,name:'The Carmel passes',why:`Narrow routes through the ridge into the Jezreel Valley. Lightly guarded.`},
    {x:240,y:140,r:40,name:'The Jezreel Valley',why:`Where the Ottoman railways and roads met. Taking it cut off the armies to the south.`},
    {x:360,y:300,r:30,name:'The Jordan Valley',why:`Where the Ottomans expected the attack.`}
  ],
  units:[
    U('br_inf','g','inf',3,'XXI Corps infantry',`Broke the Ottoman line near the coast at dawn on 19 September.`,{0:[110,360],1:[120,300],2:[120,290]}),
    U('br_cav','g','cav',3,'Desert Mounted Corps',`Rode north up the coast through the gap, then east through the passes.`,{0:[100,380,'hide'],1:[110,250],2:[230,140]}),
    U('br_dummy','g','cav',2,'Dummy camps in the Jordan Valley',`Canvas horses, empty tents, and mules dragging sledges to raise dust.`,{0:[340,340],1:[340,340,'decoy']}),
    U('br_raf','g','plane',2,'Royal Air Force',`Bombed Ottoman headquarters, telephone exchanges and the retreat.`,{0:[200,380],1:[200,260],2:[280,250]}),
    U('br_arab','g','cav',2,'Arab Northern Army',`Cut the railway at Deraa, east of the Jordan.`,{0:[390,200,'off'],1:[390,140]}),
    U('br_cmd','g','cmd',1,'Allenby',`A cavalryman who built the whole plan around a deep cavalry breakthrough.`,{0:[160,380]}),
    U('ot_8','t','inf',3,'Ottoman Eighth Army',`Held the coastal sector. Broken on the first morning.`,{0:[120,280],1:[140,270,'ko']}),
    U('ot_7','t','inf',3,'Ottoman Seventh Army',`Held the hills in the center. Trapped when its escape roads were cut.`,{0:[250,280],2:[260,210,'ko']}),
    U('ot_4','t','inf',2,'Ottoman Fourth Army',`East of the Jordan, facing the expected attack.`,{0:[380,280],2:[380,120,'exit']}),
    U('ot_cmd','t','cmd',1,'Liman von Sanders',`Headquarters at Nazareth. Nearly captured by British cavalry.`,{0:[200,90],2:[260,40,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['g',110,360,122,304],['g',100,380,108,256]]},
    {a:[['g',110,250,120,180,226,142],['g',200,260,276,250],['td',250,280,258,214]]}
  ],
  decisions:[
    {when:'Summer 1918', title:'Where to attack',
     ctx:`Two raids across the Jordan have convinced the Ottoman command that your next attack will come there. Your cavalry is your biggest advantage, if it can get through the line.`,
     q:`Where do you attack, and how?`,
     opts:[
       {t:`Attack in the Jordan Valley, as the enemy expects`, s:0, fb:`You would hit the strongest, most alert part of the Ottoman line, in difficult terrain.`, alt:{u:{br_inf:[330,300], br_cav:[340,320]}, a:[['g',110,360,330,300]]}},
       {t:`Secretly mass most of your infantry and cavalry on the coast, while dummy camps keep the enemy's eyes on the Jordan`, s:3, fb:`The coastal plain suits cavalry, and the enemy is looking the other way.`},
       {t:`Attack evenly across the whole front`, s:1, fb:`You would never get the overwhelming local strength needed to open a gap for the cavalry.`}],
     result:`Allenby moves most of his army to the coast by night, hiding it in orchards and camps. In the Jordan Valley, troops build dummy camps, canvas horses and fake horse lines, and mules drag sledges to raise dust. A hotel in Jerusalem is even prepared as a fake headquarters. At dawn on 19 September, a short, intense bombardment opens and the infantry breaks the Ottoman line near the coast.`,
     why:`Deception concentrated overwhelming force at the point where the enemy least expected it.`,
     tv:`Ottoman and German commanders saw what they expected to see in the Jordan Valley. The RAF kept enemy aircraft from looking closely.`},
    {when:'19 September 1918', title:'The gap is open',
     ctx:`The infantry has broken through near the coast. The cavalry is ready.`,
     q:`How do you use the cavalry?`,
     opts:[
       {t:`Keep it back to protect the infantry's gains`, s:0, fb:`The Ottoman armies would retreat in order and form a new line.`},
       {t:`Send it deep: north up the coast, then east through the Carmel passes to seize the valley junctions behind the enemy`, s:3, fb:`Seizing the roads and railways behind the enemy traps whole armies without fighting them head-on.`},
       {t:`Chase the retreating enemy directly`, s:1, fb:`You would push them back, but they could keep escaping along their own roads.`}],
     result:`The Desert Mounted Corps rides north up the coast and through the Carmel passes, taking El Afule and Beisan within about a day and a half. Liman von Sanders barely escapes from Nazareth. The RAF bombs the retreating columns. The Ottoman Seventh and Eighth Armies are trapped and destroyed.`}
  ],
  debrief:{
    title:'Look one way, ride the other',
    outcome:`Most of the Ottoman forces in Palestine are destroyed or captured in a few days. Damascus falls on 1 October, and the Ottoman Empire signs an armistice on 30 October 1918.`,
    why:`Allenby combined deception, a concentrated breakthrough and a deep cavalry move against the enemy's supply arteries, with air power blinding and harassing the enemy.`,
    them:`The Ottoman command trusted what it saw in the Jordan Valley. Its armies were tired and spread out, with their roads and railways all running through a few points.`,
    board:{h:`Go for the junctions, not the front line`, b:`Allenby didn't fight every Ottoman unit. He took the few junctions their whole system depended on. In business, a competitor's strength often runs through a few chokepoints: a key retailer, a single supplier, one big client.`, try:`Map where your competitor's business flows through a single point. Which one could you reach?`},
    principles:['deceive','artery','combined']
  }
});

/* ===== 27. YORKTOWN ===== */
PGD.add({
  n:27, id:'yorktown', name:'Yorktown', year:'1781', place:'Virginia, United States', side:'g', you:'General George Washington', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Allies', name:'American and French forces', cmdr:'General George Washington and General Rochambeau, with Admiral de Grasse\'s fleet', str:'About 17,000 soldiers at Yorktown, plus the French fleet', eyes:'Through American eyes'},
  t:{short:'British', name:'British army in Virginia', cmdr:'General Charles Cornwallis (and General Henry Clinton in New York)', str:'About 8,000 to 9,000 at Yorktown', eyes:'Through British eyes'},
  brief:{
    hook:`You have planned for years to retake New York. A message arrives that changes everything.`,
    situation:`1781. The American War of Independence is in its sixth year. Washington's army and a French army under Rochambeau are camped near New York, the main British base. Washington has long wanted to attack it. In the south, Cornwallis has marched into Virginia and is fortifying a base at Yorktown, on the coast, to stay in contact with the Royal Navy.`,
    forces:`The Continental Army and a French army, experienced but short of money and supplies.`,
    enemy:`Clinton with a large garrison in New York. Cornwallis with about 8,000 to 9,000 at Yorktown, relying on the Royal Navy for supplies and escape.`,
    ground:`Yorktown sits on a peninsula with the York River behind it and the Chesapeake Bay beyond. Whoever controls the bay controls Cornwallis's lifeline.`,
    supply:`The American army is short of pay and supplies; many soldiers have not been paid in months. The French help is vital, but it will not last forever.`,
    intel:`Admiral de Grasse writes that his French fleet will sail from the Caribbean to the Chesapeake Bay, not New York, and can stay only until mid-October.`,
    objective:`Win a decisive victory while the French fleet is available.`,
    notes:[`A fleet controls the sea only while it is there.`,`An army that relies on the sea is trapped if the sea is closed.`,`Moving an army 700 km takes weeks, and is hard to hide.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 0 H260 Q240 60 250 120 Q260 180 230 240 Q220 300 240 400 H0 Z','#9cab70');
    s+=land('M180 220 Q220 230 230 260 Q210 280 180 270 Z','#a9a86e');
    s+=river('M0 230 Q100 230 190 248',8);
    s+=house(210,250)+house(220,256,'#8a3a2a')+house(150,40)+house(160,46,'#8a3a2a');
    s+=road('M150 50 Q120 140 140 200 Q160 240 200 250');
    s+=label(160,24,'New York',9)+label(212,234,'Yorktown',9)+label(320,250,'Chesapeake Bay',9,90)+label(80,220,'York River',8)+label(80,120,'Road south',8);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:300,y:250,r:40,name:'Chesapeake Bay',why:`Cornwallis's link to the Royal Navy. When the French fleet closed it, he was trapped.`},
    {x:150,y:40,r:30,name:'New York',why:`The main British base, too strong for the allies to attack directly.`},
    {x:120,y:140,r:0,px:110,py:150,d:'M150 50 Q120 140 140 200 Q160 240 200 250',line:true,name:'The march south',why:`About 700 km from New York to Virginia, disguised for as long as possible.`}
  ],
  units:[
    U('am_cont','g','inf',3,'Continental Army',`Marched south from New York.`,{0:[140,70],1:[130,170],2:[190,240]}),
    U('am_fr','g','inf',3,'Rochambeau\'s French army',`Marched alongside the Americans.`,{0:[160,70],1:[150,170],2:[200,264]}),
    U('am_fleet','g','ship',3,'De Grasse\'s French fleet',`Arrived from the Caribbean and closed the bay.`,{0:[390,390,'off'],1:[300,300],2:[290,250]}),
    U('am_laf','g','inf',1,'Lafayette\'s force',`Shadowed Cornwallis in Virginia.`,{0:[150,270],2:[170,280]}),
    U('am_cmd','g','cmd',1,'Washington',`Gave up his favored plan to follow the fleet.`,{0:[150,90],1:[140,190],2:[180,230]}),
    U('br_corn','t','inf',3,'Cornwallis at Yorktown',`Fortified a base and waited for the navy.`,{0:[214,250],2:[214,250,'ko']}),
    U('br_ny','t','inf',3,'Clinton in New York',`Expected an attack on New York.`,{0:[160,30]}),
    U('br_navy','t','ship',2,'British fleet under Graves',`Fought the French at the mouth of the bay and withdrew to New York.`,{0:[390,40,'off'],1:[330,240],2:[392,60,'exit']}),
    U('br_cmd','t','cmd',1,'Cornwallis',`Surrendered on 19 October 1781.`,{0:[222,244]})
  ],
  states:[
    {a:[]},
    {a:[['g',140,70,120,120,128,164],['g',390,390,310,310],['t',390,40,334,234]]},
    {a:[['g',130,170,186,236],['td',330,240,388,64]]}
  ],
  decisions:[
    {when:'August 1781', title:'New York or Virginia?',
     ctx:`De Grasse's fleet is coming to the Chesapeake, not New York, and can stay only until mid-October. You have long planned to attack New York.`,
     q:`What do you do?`,
     opts:[
       {t:`Stick with the plan to attack New York`, s:0, fb:`Without the French fleet, an assault on the strongest British base would very likely fail.`},
       {t:`Switch to Virginia: march most of the allied army south to trap Cornwallis while the French fleet closes the bay`, s:3, fb:`The fleet decides where a decisive victory is possible. Go where your strongest ally can be.`},
       {t:`Wait for a better moment`, s:1, fb:`The fleet would come and go, and the allied money and patience would run out.`}],
     result:`Washington and Rochambeau agree to march south. To hide the move, they build ovens and camps in New Jersey as if preparing to attack New York, and only reveal the true direction as late as possible. Clinton stays in New York, expecting an attack.`,
     why:`Washington gave up his preferred plan to follow the real opportunity, then disguised the march to keep Clinton in place.`,
     tv:`Clinton believed the activity in New Jersey was preparation for an attack on New York. By the time he realized, the allied army was well on its way.`},
    {when:'September 1781', title:'The fleet and the siege',
     ctx:`De Grasse has reached the Chesapeake. A British fleet is coming to break through to Cornwallis. Your army is still marching south.`,
     q:`What is the priority?`,
     opts:[
       {t:`Have the French fleet stay in the bay and wait`, s:1, fb:`Sitting at anchor could let the British fleet attack it in a poor position.`},
       {t:`Have the fleet go out to fight the British, keeping them from the bay, while the army closes in by land`, s:3, fb:`If the fleet keeps the British navy away, Cornwallis is cut off from rescue and supplies by sea.`},
       {t:`Let Cornwallis evacuate by sea, and take Yorktown without a fight`, s:0, fb:`The British army would escape intact.`}],
     result:`On 5 September, de Grasse's fleet fights the British fleet under Graves at the mouth of the Chesapeake. The battle is indecisive, but the British withdraw to New York. With the bay closed, the allied armies besiege Yorktown. After artillery bombardment and the capture of two key redoubts, Cornwallis surrenders on 19 October.`}
  ],
  debrief:{
    title:'Follow the real opportunity',
    outcome:`About 8,000 British troops surrender. The British government loses its will to continue the war, and peace talks follow. The Treaty of Paris recognizes American independence in 1783.`,
    why:`Washington let go of a long-held plan, coordinated a land army and a fleet across huge distances, and used deception to keep the enemy in place.`,
    them:`Cornwallis relied on the navy to supply or rescue him. Clinton read the signs in New Jersey the way he expected to.`,
    board:{h:`Let go of the plan you love when a better opportunity appears`, b:`Washington had been set on New York for years. When his key partner offered a different window, he switched. Teams often hold onto a favored plan long after the conditions have changed. The best opportunity is often where your strongest partner can show up.`, try:`What plan has your team defended for a long time? Is there a window elsewhere right now where a partner could help more?`},
    principles:['windows','deceive','sunk']
  }
});

/* ===== 28. WATERLOO ===== */
PGD.add({
  n:28, id:'waterloo', name:'Waterloo', year:'1815', place:'Belgium', side:'g', you:'the Duke of Wellington', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Allies', name:'Anglo-allied army (British, Dutch, Belgian and German troops)', cmdr:'The Duke of Wellington, with Field Marshal Blücher\'s Prussian army coming', str:'About 68,000, plus Prussians arriving during the day', eyes:'Through Allied eyes'},
  t:{short:'France', name:'French Army of the North', cmdr:'Emperor Napoleon Bonaparte', str:'About 73,000', eyes:'Through French eyes'},
  brief:{
    hook:`Napoleon is coming straight at you. If you can hold until the Prussians arrive, you can win.`,
    situation:`June 1815. Napoleon has returned from exile and invaded Belgium to defeat the allied armies before they can unite. Two days ago he beat the Prussians at Ligny, and your army fell back from Quatre Bras. Now you must decide where to stand. Blücher has promised to march to help you.`,
    forces:`A mixed army: experienced British and German units alongside less experienced Dutch, Belgian and German troops.`,
    enemy:`Napoleon's veteran army, with powerful artillery, heavy cavalry and the Imperial Guard.`,
    ground:`South of the village of Mont-Saint-Jean is a low ridge. Behind its crest, the ground drops away, hidden from the south. In front of the ridge are two walled farms: Hougoumont to the west and La Haye Sainte in the center.`,
    supply:`Heavy rain overnight has soaked the ground, which will slow French artillery and the start of the attack.`,
    intel:`Blücher has promised to march with at least part of his army to join you. They have far to travel on muddy roads.`,
    objective:`Hold the ridge until the Prussians arrive, then defeat Napoleon.`,
    notes:[`Troops behind a ridge are hidden from enemy artillery.`,`Strongpoints in front of a line break up attacks.`,`Every hour you hold brings the Prussians closer.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=hill(200,120,190,30,3);
    s+=`<path d="M10 120 Q200 100 390 120" fill="none" stroke="#5a6a3e" stroke-width="3" stroke-dasharray="5 4"/>`;
    s+=`<rect x="70" y="170" width="34" height="26" fill="#c8a978" stroke="#5a4a35"/>`+`<rect x="190" y="150" width="22" height="18" fill="#c8a978" stroke="#5a4a35"/>`;
    s+=trees(281,14,[40,130,160,220],()=>true,['#2f5a24','#3b6b2b']);
    s+=road('M200 0 L200 400')+road('M60 0 L120 400');
    s+=house(196,40)+house(206,46,'#8a3a2a');
    s+=label(200,20,'Mont-Saint-Jean',9)+label(300,96,'The ridge',9)+label(88,210,'Hougoumont',8)+label(240,166,'La Haye Sainte',8)+label(350,220,'Toward the Prussians',8)+label(200,330,'French positions',9);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:200,y:110,r:0,px:300,py:80,d:'M10 120 Q200 100 390 120',line:true,name:'The reverse slope',why:`Wellington kept most of his infantry behind the crest of the ridge, sheltered from French artillery and hidden from view.`},
    {x:86,y:182,r:26,name:'Hougoumont',why:`A walled farm on the right. It held all day and drew in many French troops.`},
    {x:200,y:158,r:20,name:'La Haye Sainte',why:`A farm in the center. Its defenders ran short of ammunition and it fell in the early evening.`},
    {x:370,y:180,r:30,name:'The Prussian approach',why:`Prussian troops arrived from the east during the afternoon, attacking the French right flank at Plancenoit.`}
  ],
  units:[
    U('al_line','g','inf',3,'Infantry behind the ridge',`Formed squares when the French cavalry charged.`,{0:[200,90],1:[200,96],2:[200,110]}),
    U('al_houg','g','inf',2,'Hougoumont garrison',`Guards and German troops who held the farm all day.`,{0:[86,182]}),
    U('al_lhs','g','inf',1,'La Haye Sainte garrison',`King's German Legion riflemen, who held until their ammunition ran out.`,{0:[200,158],2:[200,158,'ko']}),
    U('al_cav','g','cav',2,'Allied cavalry',`Charged the first French infantry attack, then went too far.`,{0:[260,70],1:[260,90]}),
    U('al_pruss','g','inf',3,'Prussian army',`Arrived from the east in the afternoon.`,{0:[396,100,'off'],1:[380,170],2:[320,240]}),
    U('al_cmd','g','cmd',1,'Wellington',`Rode along the line all day, moving units to threatened points.`,{0:[200,70],1:[180,80],2:[220,100]}),
    U('fr_inf','t','inf',3,'French infantry corps',`Attacked the center and Hougoumont.`,{0:[200,300],1:[200,200],2:[200,250]}),
    U('fr_cav','t','cav',3,'French heavy cavalry',`Massed charges against the allied squares in the afternoon.`,{0:[140,320],1:[160,140],2:[160,240,'ko']}),
    U('fr_guard','t','hvy',2,'Imperial Guard',`Napoleon's elite, sent up the ridge in the evening and repulsed.`,{0:[220,360],1:[220,340],2:[220,140,'ko']}),
    U('fr_art','t','art',2,'Grand battery',`Massed French guns bombarding the ridge.`,{0:[240,260]}),
    U('fr_cmd','t','cmd',1,'Napoleon',`Delayed the start of the attack to let the ground dry.`,{0:[200,380],2:[200,396,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['t',200,300,200,206],['t',140,320,160,148],['t',396,100,380,166]]},
    {a:[['t',220,340,220,148],['g',380,170,324,236],['g',200,96,200,108]]}
  ],
  decisions:[
    {when:'17 June 1815', title:'Where to stand',
     ctx:`Your army has fallen back from Quatre Bras. Blücher has promised to come to you tomorrow with at least part of his army. Napoleon is following.`,
     q:`Where do you fight?`,
     opts:[
       {t:`Keep retreating to Brussels and fight there`, s:0, fb:`You would lose contact with the Prussians, which is exactly what Napoleon wants.`},
       {t:`Stand on the Mont-Saint-Jean ridge, with infantry behind the crest and strongpoints in the farms in front`, s:3, fb:`The reverse slope shelters your infantry from artillery, the farms break up attacks, and the Prussians can reach you here.`},
       {t:`Line up on the forward slope, in full view, to show confidence`, s:0, fb:`French artillery would shred your line before the infantry even attacked.`, alt:{u:{al_line:[200,140,'ko']}, a:[]}}],
     result:`Wellington deploys along the ridge, his infantry mostly hidden behind the crest, with garrisons in Hougoumont and La Haye Sainte. On 18 June Napoleon delays his attack until late morning to let the soaked ground dry. Then come attacks on Hougoumont, a huge infantry attack on the center, and in the afternoon, massed French cavalry charges.`,
     why:`The ridge, the farms and the promise of Prussian help turned a defensive battle into a winnable one.`,
     tv:`Napoleon believed the Prussians, beaten at Ligny, were retreating and would not intervene. He planned to break Wellington before any help arrived.`},
    {when:'Evening, 18 June', title:'Hold, and wait for the moment',
     ctx:`La Haye Sainte has fallen. Your line is battered but holding. The Prussians are pressing the French right flank. Napoleon sends his Imperial Guard up the ridge.`,
     q:`What do you do?`,
     opts:[
       {t:`Withdraw before the Guard reaches the ridge`, s:0, fb:`You would give up the ridge at the very moment the battle is turning.`},
       {t:`Keep troops lying down behind the crest until the Guard is close, then rise and fire, and advance once they break`, s:3, fb:`The Guard expects a weakened line. Sudden close-range fire, then a general advance as the Prussians push in, can break the whole French army.`},
       {t:`Attack the Guard with cavalry as it climbs`, s:1, fb:`Infantry in formation can resist cavalry. You would lose your last mounted reserve.`}],
     result:`Allied infantry rise from behind the crest and pour fire into the advancing Guard, which falls back. "The Guard retreats!" spreads through the French army. Wellington orders a general advance as the Prussians break through at Plancenoit. The French army collapses.`}
  ],
  debrief:{
    title:'Hold the ridge, trust the ally',
    outcome:`Napoleon's army is destroyed. He abdicates days later and is exiled to Saint Helena. Wellington's army loses about 17,000, the Prussians about 7,000, and the French around 25,000 killed and wounded, with thousands more captured.`,
    why:`Wellington chose ground that protected his weakest troops, held strongpoints in front to break up attacks, and fought for time until his ally arrived.`,
    them:`Napoleon assumed the Prussians would not come, delayed his attack for the ground to dry, and wasted his cavalry in unsupported charges.`,
    board:{h:`Build the plan around your partner's arrival`, b:`Wellington never meant to win alone. He chose ground and tactics to hold until Blücher came. Many projects depend on a partner or another team showing up. Plan explicitly for the hours until they arrive.`, try:`For your current project, what's the "Prussians arrive" moment? What do you need to hold until then?`},
    principles:['ground','reserve','timing']
  }
});

/* ===== 29. LITTLE BIGHORN ===== */
PGD.add({
  n:29, id:'bighorn', name:'Little Bighorn', year:'1876', place:'Montana Territory, United States', side:'g', you:'Lieutenant Colonel George Armstrong Custer', minutes:5,
  face:{g:-1,t:1},
  g:{short:'7th Cavalry', tab:'US Army', name:'US 7th Cavalry Regiment', cmdr:'Lieutenant Colonel George Armstrong Custer', str:'About 600 soldiers plus civilians and Arikara and Crow scouts', eyes:'Through 7th Cavalry eyes'},
  t:{short:'Lakota and Cheyenne', tab:'Lakota', name:'Lakota, Northern Cheyenne and Arapaho', cmdr:'Leaders including Sitting Bull, Crazy Horse and Gall', str:'A very large camp; perhaps 1,500 to 2,000 or more warriors', eyes:'Through Lakota and Cheyenne eyes'},
  brief:{
    hook:`Your scouts say the village is the biggest they have ever seen. You think you've been spotted. This is a day where the history is a lesson in what not to do.`,
    situation:`June 1876. The US government has ordered the Lakota and their allies onto reservations, after gold was found in the Black Hills, land guaranteed to them by the 1868 Fort Laramie treaty. Three Army columns are converging on the region. The 7th Cavalry, part of General Terry's column, has been sent ahead to find the camp. Another column under Colonel Gibbon is expected near the Little Bighorn around 26 June.`,
    forces:`Twelve companies of cavalry, armed with single-shot carbines and revolvers, tired from a long night march.`,
    enemy:`A huge camp of several Lakota bands, Northern Cheyenne and Arapaho, gathered for the summer. Many warriors are well armed, some with repeating rifles, and fighting to defend their families.`,
    ground:`The camp stretches for kilometres along the Little Bighorn River, under bluffs and ravines on the east bank, which hide much of it from view.`,
    supply:`Your pack train of ammunition and supplies moves slowly behind the regiment.`,
    intel:`Your scouts report a very large camp, and warn you there are more warriors than your men have bullets. Some of your soldiers have been seen by Lakota warriors.`,
    objective:`In your orders from the Army: find the camp and prevent its people from escaping, in coordination with the other columns.`,
    notes:[`Army commanders often feared the camp would scatter before it could be attacked.`,`A regiment split into separate battalions cannot support itself across rough ground.`,`Intelligence that contradicts your expectations is the most valuable kind.`]
  },
  terrain(){
    let s=felt('#b4a978');
    s+=river('M60 0 Q90 100 70 200 Q50 300 90 400',10);
    s+=hill(220,160,90,40,4)+hill(240,300,80,30,3)+hill(300,60,60,24,2);
    [[30,60],[24,100],[34,140],[26,180],[30,220],[22,260],[34,300],[26,340]].forEach(p=>s+=tent(p[0],p[1]));
    s+=label(30,24,'The camp',9)+label(110,200,'Little Bighorn River',8,-80)+label(240,120,'Bluffs',9)+label(250,340,'Hilltop',8)+label(300,30,'North ridge',8);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:30,y:200,r:0,px:40,py:180,d:'M10 40 V360 H50 V40 Z',name:'The camp',why:`Several bands camped along the river for kilometres. From the bluffs, much of it was hidden.`},
    {x:220,y:160,r:50,name:'The bluffs',why:`Rough, broken ground east of the river. Custer's battalion rode along it, out of sight of Reno's men.`},
    {x:240,y:300,r:30,name:'Reno Hill',why:`Where Reno's and Benteen's men dug in and held out until relieved on 27 June.`}
  ],
  units:[
    U('us_custer','g','cav',3,'Custer\'s battalion',`Five companies that rode north along the bluffs. All were killed.`,{0:[300,300],1:[240,180],2:[270,50,'ko']}),
    U('us_reno','g','cav',2,'Reno\'s battalion',`Attacked the south end of the camp, then retreated to the bluffs.`,{0:[320,320],1:[100,370],2:[240,300]}),
    U('us_benteen','g','cav',2,'Benteen\'s battalion',`Sent to scout southwest, away from the camp.`,{0:[330,340],1:[380,380],2:[250,310]}),
    U('us_pack','g','truck',1,'Pack train',`Slow mule train with the reserve ammunition.`,{0:[360,360],1:[340,350],2:[260,320]}),
    U('us_cmd','g','cmd',1,'Custer',`A famous Civil War cavalry commander, known for aggressive attacks.`,{0:[300,280],1:[230,170],2:[266,44,'ko']}),
    U('na_south','t','cav',3,'Warriors at the south end',`Stopped Reno's attack and drove his men back across the river.`,{0:[40,340],1:[60,350],2:[120,320]}),
    U('na_north','t','cav',3,'Warriors at the north',`Led by Crazy Horse, Gall and others, they surrounded Custer's battalion.`,{0:[30,120],1:[40,140],2:[240,70]}),
    U('na_camp','t','spr',2,'The camp',`Families, elders and children.`,{0:[30,220]}),
    U('na_cmd','t','cmd',1,'Sitting Bull',`Hunkpapa Lakota leader whose vision before the battle foretold soldiers falling into camp.`,{0:[24,200]})
  ],
  states:[
    {a:[]},
    {a:[['g',320,320,200,380,104,370],['g',300,300,244,186],['gd',330,340,376,378]]},
    {a:[['t',60,350,116,322],['t',40,140,150,60,234,68],['g',100,370,236,302]]}
  ],
  decisions:[
    {when:'Morning, 25 June 1876', title:'The scouts\' warning',
     ctx:`Your scouts report a very large camp in the valley, and say you have been seen. Gibbon's column is expected nearby tomorrow. You fear the camp will scatter if you wait.`,
     q:`What do you do?`,
     opts:[
       {t:`Attack at once, before the camp can scatter`, s:0, fb:`This is what happened. It meant attacking a far larger force than expected, without knowing its size or layout, with a tired regiment and no support nearby.`},
       {t:`Hold, scout the camp properly, and coordinate with Terry and Gibbon's column due the next day`, s:3, fb:`Your scouts' warning was the most important information you had. A coordinated approach would have brought far more soldiers and a clearer picture.`},
       {t:`Withdraw and report back`, s:1, fb:`Safe, but it gives up contact. Still far better than what happened.`}],
     result:`Custer decides to attack that day, afraid the camp will escape. He divides the regiment: Benteen with three companies is sent southwest to scout, Reno with three companies is ordered to attack the south end of the camp, and Custer takes five companies north along the bluffs. The pack train follows behind.`,
     why:`Custer acted on the assumption that the camp would flee, not fight, and discounted his scouts' warnings about its size.`,
     tv:`The people in the camp were not trying to escape. They were large in number, well armed and ready to defend their families.`},
    {when:'Afternoon, 25 June', title:'Reno\'s attack has failed',
     ctx:`Reno's attack on the south end of the camp has been stopped and his men are falling back in disorder. You are on the bluffs to the north, with no clear view of the whole camp. Benteen is far to the south.`,
     q:`What do you do?`,
     opts:[
       {t:`Keep going north to attack the camp from another direction`, s:0, fb:`This is what happened. Custer's battalion, isolated and outnumbered, was surrounded and wiped out.`},
       {t:`Reunite the regiment: pull back to join Reno, recall Benteen and the pack train, and form one defensive position`, s:3, fb:`A concentrated regiment with its reserve ammunition could hold, as Reno and Benteen later did.`},
       {t:`Send a message to Benteen and wait where you are`, s:1, fb:`Better than pushing on, but your battalion stays isolated.`}],
     result:`Custer sends an urgent message for Benteen to come quickly and bring ammunition, then continues north. Warriors led by Crazy Horse, Gall and others surround his battalion on the ridges, and within a short time all of Custer's men are killed. Reno and Benteen unite on the bluffs and hold out until Terry's column arrives on 27 June.`}
  ],
  debrief:{
    title:'Ignoring the scouts',
    outcome:`Custer and about 210 men of his battalion are killed, and the 7th Cavalry loses around 268 in total. It is a major victory for the Lakota, Cheyenne and Arapaho. The US government responds with a larger military campaign, and within a year most of the bands are forced onto reservations and the Black Hills are taken.`,
    why:`The 7th Cavalry was defeated by its own assumptions: that the camp would flee rather than fight, that intelligence from its scouts was exaggerated, and that a divided regiment could still win. The warriors fought on familiar ground, defending their families, with strong leaders and great numbers.`,
    them:`From the camp's side: warriors responded quickly to each attack, turned back Reno first, then concentrated against Custer. They had come together in great numbers precisely so that they could defend themselves.`,
    board:{h:`Listen to the people closest to the ground`, b:`Custer's scouts told him clearly what he was facing. He heard it through his assumptions. Leaders often discount warnings from the front line when they clash with the plan. The bigger the stakes, the more those warnings deserve a real hearing.`, try:`Ask the person on your team closest to the client what worries them most about your current plan. Then act on at least one thing they say.`},
    principles:['intel','mass','habits']
  }
});

/* ===== 30. DESERT STORM ===== */
PGD.add({
  n:30, id:'desertstorm', name:'Desert Storm', year:'1991', place:'Kuwait and Iraq', side:'g', you:'General Norman Schwarzkopf', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Coalition', name:'US-led coalition', cmdr:'General Norman Schwarzkopf', str:'Over 600,000 troops from more than 30 countries in theater, including about 500,000 Americans', eyes:'Through coalition eyes'},
  t:{short:'Iraq', name:'Iraqi army in Kuwait and southern Iraq', cmdr:'Iraqi high command under Saddam Hussein', str:'A large army, though its real strength was well below the early estimates', eyes:'Through Iraqi eyes'},
  brief:{
    hook:`The enemy has dug in facing you along a border. All of their attention is pointed one way.`,
    situation:`Late 1990. Iraq has invaded and occupied Kuwait. A US-led coalition, backed by United Nations resolutions, has built up a huge force in Saudi Arabia. This scenario looks only at the military plan for the ground campaign, not the wider politics of the war.`,
    forces:`Modern armored and mechanized divisions, airborne and air assault troops, Marines afloat and ashore, and overwhelming air power.`,
    enemy:`Iraqi divisions dug in along Kuwait's southern border and coast, with minefields and berms, and the Republican Guard in reserve further north in Iraq.`,
    ground:`Open desert. Kuwait's coast invites an amphibious landing. West of Kuwait, the Iraqi border is lightly defended desert.`,
    supply:`Moving armored divisions far to the west requires huge fuel and supply bases, and every movement could be seen from the air.`,
    intel:`Iraqi defenses face south and east, expecting a direct attack into Kuwait and a landing from the sea.`,
    objective:`Liberate Kuwait and destroy the Iraqi army's ability to fight, with as few casualties as possible.`,
    notes:[`An army that cannot see can't react.`,`A threat from the sea can hold defenders in place without landing.`,`The desert to the west is empty and open.`]
  },
  terrain(){
    let s=felt('#d6c08a');
    s+=sea('M300 400 V250 Q330 220 360 230 Q380 200 400 200 V400 Z');
    s+=`<path d="M0 260 L250 250 L300 250" fill="none" stroke="#7a5a3a" stroke-width="2" stroke-dasharray="6 4"/><path d="M200 250 L230 160 L300 200" fill="none" stroke="#7a5a3a" stroke-width="2" stroke-dasharray="6 4"/>`;
    s+=`<path d="M210 250 Q260 246 300 250" fill="none" stroke="#5a3a20" stroke-width="5" opacity=".35"/>`;
    s+=house(270,220)+house(280,226,'#8a3a2a')+house(300,130);
    s+=label(270,206,'Kuwait',10)+label(120,200,'Iraq',12)+label(150,300,'Saudi Arabia',12)+label(350,310,'Persian Gulf',9)+label(250,270,'Border defenses',8)+label(300,114,'Basra',8);
    s+=compass(26,26);
    return s+end();
  },
  features:[
    {x:255,y:250,r:30,name:'Kuwait border defenses',why:`Minefields, trenches and berms facing south, where Iraq expected the attack.`},
    {x:340,y:290,r:30,name:'The coast',why:`A Marine amphibious force offshore made Iraq expect a landing, tying down divisions on the coast.`},
    {x:80,y:240,r:50,name:'The western desert',why:`Open, lightly defended desert. The route for the main coalition armored attack.`}
  ],
  units:[
    U('co_xviii','g','para',2,'XVIII Airborne Corps',`Moved far to the west, then struck deep north to the Euphrates.`,{0:[220,320],1:[40,300],2:[60,160]}),
    U('co_vii','g','arm',3,'VII Corps',`The main armored force. Moved west, then swung east into the Republican Guard.`,{0:[240,310],1:[120,300],2:[200,170]}),
    U('co_marines','g','inf',2,'Marines and Arab forces',`Attacked straight into Kuwait.`,{0:[270,300],1:[270,300],2:[270,240]}),
    U('co_amph','g','ship',2,'Amphibious force',`Threatened a landing that never came.`,{0:[360,330],1:[350,300]}),
    U('co_air','g','plane',3,'Coalition air forces',`Bombed for about six weeks before the ground war, blinding Iraqi reconnaissance.`,{0:[180,370],1:[200,180],2:[230,190]}),
    U('co_cmd','g','cmd',1,'Schwarzkopf',`Commander of coalition forces in the region.`,{0:[150,370]}),
    U('iq_front','t','inf',3,'Iraqi frontline divisions',`Dug in along the border.`,{0:[250,240],2:[260,230,'ko']}),
    U('iq_coast','t','inf',2,'Iraqi coastal divisions',`Waiting for a landing.`,{0:[320,220],2:[330,210,'ko']}),
    U('iq_rg','t','arm',3,'Republican Guard',`Iraq's best divisions, in reserve in southern Iraq.`,{0:[240,140],2:[230,160,'ko']}),
    U('iq_cmd','t','cmd',1,'Iraqi high command',`Expected a direct attack and a landing.`,{0:[300,120]})
  ],
  states:[
    {a:[]},
    {a:[['gd',220,320,100,330,44,304],['gd',240,310,160,320,124,302]]},
    {a:[['g',40,300,50,200,58,166],['g',120,300,140,200,194,174],['g',270,300,270,246]]}
  ],
  decisions:[
    {when:'Planning, late 1990', title:'Where to attack',
     ctx:`Iraqi defenses face south along the Kuwait border and east toward the sea. The desert to the west is lightly held.`,
     q:`How do you plan the ground attack?`,
     opts:[
       {t:`Attack straight north into Kuwait's border defenses with your main force`, s:0, fb:`You would hit the enemy where he is strongest and most prepared, with heavy casualties.`, alt:{u:{co_vii:[250,260], co_xviii:[230,270]}, a:[['g',240,310,250,264]]}},
       {t:`Make a big amphibious landing on the coast`, s:1, fb:`The coast is heavily defended and mined. A landing would be risky and costly.`},
       {t:`Pin them with attacks into Kuwait and a threatened landing, while the main armored force swings far west and hooks around`, s:3, fb:`The enemy's attention is fixed south and east. A huge flanking move through the open desert hits where they are not looking.`}],
     result:`The plan becomes known as the left hook. Marines and Arab forces will attack into Kuwait, and the Marine amphibious force will threaten a landing. Meanwhile, two whole corps will shift far west before attacking.`,
     why:`The plan used the enemy's fixed attention to make the obvious attack a holding action, and the real attack a surprise.`,
     tv:`Iraqi commanders expected a direct assault and a landing. Their defenses and reserves were positioned for that.`},
    {when:'January to February 1991', title:'When to move west',
     ctx:`Moving two corps hundreds of kilometres west, with all their fuel and supplies, is a vast effort that could be seen from the air.`,
     q:`When do you shift the armored corps west?`,
     opts:[
       {t:`Move now, before the air campaign`, s:0, fb:`Iraqi aircraft and reconnaissance could see the move, and the surprise would be lost.`},
       {t:`Wait until the air campaign has blinded Iraqi reconnaissance, then move fast`, s:3, fb:`Once the enemy can no longer see, even a huge move can stay hidden.`},
       {t:`Don't move at all, rely on air power alone`, s:1, fb:`Air power badly damaged the Iraqi army, but could not by itself force it out of Kuwait.`}],
     result:`The air campaign begins on 17 January. Once Iraqi air and reconnaissance are largely knocked out, over 250,000 troops and their supplies move hundreds of kilometres west. The ground war begins on 24 February. As Marines and Arab forces break into Kuwait, the western corps swing north and then east into the Republican Guard. A ceasefire comes after about 100 hours.`}
  ],
  debrief:{
    title:'They were all looking one way',
    outcome:`Kuwait is liberated within about 100 hours of ground fighting, with relatively low coalition casualties. Much of the Iraqi army in and around Kuwait is destroyed or captured, though some Republican Guard units escape before the ceasefire, a decision debated ever since.`,
    why:`The coalition used air power to blind the enemy, held its attention with the obvious threat, and put the main effort where it was not looking.`,
    them:`Iraqi commanders built defenses for the attack they expected and could not see the real one coming.`,
    board:{h:`Use their focus against them`, b:`When a competitor is fixated on one threat from you, that threat can hold them in place while you invest somewhere else. It only works if they cannot see what you are really doing.`, try:`What does your competitor most expect from you this year? How could you keep them focused there while your real investment goes elsewhere?`},
    principles:['deceive','flank','intel']
  }
});
