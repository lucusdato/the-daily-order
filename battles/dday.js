PG.add({
  id:'dday', name:'D-Day', year:'1944', place:'Normandy, France',
  summary:`The largest seaborne invasion in history, won as much by deception, forecasting and logistics as by fighting.`,
  face:{g:1,t:-1},
  g:{short:'Allies', name:'Allied forces', cmdr:'General Eisenhower (supreme commander), General Montgomery (land forces)', str:'About 156,000 landed by sea and air on the first day', eyes:'Through Allied eyes'},
  t:{short:'Germany', name:'Germany', cmdr:'Field Marshal Rommel (Army Group B), Field Marshal von Rundstedt', str:'Several divisions along the Normandy coast, with a larger army waiting at Calais', eyes:'Through German eyes'},
  objective:`Allies: win a foothold in France big enough to land and supply millions of troops. Germany: stop the invasion on the beaches, before the Allies can build up.`,
  prologue:{
    when:'1940 to 1944', title:'Fortress Europe',
    text:`Since 1940 Germany has held France and most of western Europe. The Soviet Union has carried the heaviest load of the land war in the east and has pressed for a second front. Allied forces have fought in North Africa and Italy, but the decisive blow must come across the Channel. Through 1943 and early 1944, Britain becomes a giant staging base: millions of troops, thousands of ships and mountains of supplies.`,
    gWant:`A foothold in France big enough to land and supply a war-winning army, without being thrown back into the sea.`,
    tWant:`To smash any landing on the beaches within days, before the Allies could build up, freeing troops for the east.`,
    box:[132,196,36],
    theater(){
      let s=seaBg();
      s+=land('M60 20 Q110 10 130 40 Q150 80 160 120 Q170 160 150 190 Q110 202 70 196 Q50 170 70 140 Q40 120 50 80 Q40 50 60 20 Z');
      s+=`<ellipse cx="22" cy="104" rx="16" ry="30" fill="#8fa765" stroke="#e6d6a2" stroke-width="2"/>`;
      s+=land('M100 400 Q110 330 120 300 Q140 250 130 228 Q160 216 186 222 Q206 206 214 182 Q230 158 250 140 Q270 112 296 100 Q326 90 346 66 Q366 40 400 30 V400 Z');
      s+=sea('M200 400 Q230 352 270 362 Q300 350 330 372 Q360 360 400 380 V400 Z');
      s+=land('M300 330 L322 334 L344 378 L330 384 L310 350 Z');
      s+=city(152,220,'Normandy',9,14)+city(214,184,'Calais',8,-6)+city(200,262,'Paris',9,14)+city(330,180,'Berlin',9,-6)+city(320,350,'Rome',8,-6);
      s+=label(100,110,'Britain',12)+label(50,300,'Atlantic',12)+label(260,240,'Occupied Europe',11)+label(370,240,'Eastern Front',9,90);
      return s;
    },
    tokens:[
      {s:'g',t:'inf',n:3,name:'Allied armies in Britain',why:'American, British, Canadian and other Allied troops, trained for months for the landing.',path:[[110,120],[128,170],[150,210]]},
      {s:'t',t:'inf',n:3,name:'German forces in France',why:'Many divisions were understrength or second-rate. The best were in the east.',path:[[250,230],[190,224]]},
      {s:'g',t:'arm',n:2,name:'Soviet Red Army',why:'Launched a huge summer offensive in late June 1944, tying down most of the German army.',path:[[396,190],[350,196]]},
      {s:'g',t:'inf',n:1,name:'Allied armies in Italy',why:'Rome fell on 4 June 1944, two days before D-Day.',path:[[330,382],[320,350]]}
    ],
    a:[['g',110,128,130,180,148,208],['g',396,196,372,192,352,196],['g',332,382,326,366,322,354]]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 0 H400 V58 Q382 72 362 70 Q340 56 318 68 Q280 84 240 72 Q200 62 160 76 Q120 86 80 74 Q40 64 0 78 Z');
    s+=land('M0 256 Q20 262 40 258 L44 200 Q48 162 70 158 Q96 160 99 200 L101 236 Q140 248 180 245 Q240 241 290 238 Q320 220 345 176 Q366 150 400 134 V400 H0 Z');
    ['M100 210 L102 234','M118 246 L160 247','M168 246 L200 244','M208 243 L236 242','M244 241 L274 239'].forEach(d=>s+=`<path d="${d}" stroke="#ead79f" stroke-width="5" stroke-linecap="round"/>`);
    s+=river('M282 238 Q278 262 270 302',3)+`<rect x="272" y="254" width="10" height="3" fill="#6b4a2b"/>`;
    s+=house(64,170)+house(76,174,'#8a3a2a')+house(252,288)+house(264,292,'#8a3a2a')+house(258,280)+house(374,162)+house(386,158,'#8a3a2a')+house(366,60)+house(378,62,'#8a3a2a');
    s+=label(84,206,'Utah',9)+label(140,236,'Omaha',9)+label(184,234,'Gold',9)+label(222,232,'Juno',9)+label(260,229,'Sword',9)+label(306,262,'Pegasus Bridge',8);
    s+=label(56,24,'England',13)+label(72,122,'English Channel',13)+label(70,192,'Cherbourg',9)+label(258,306,'Caen',9)+label(372,184,'Calais',9)+label(296,16,'Kent: Patton\'s phantom army',9)+label(200,366,'Normandy',14);
    s+=compass(26,382);
    return s+end();
  },
  over(){ return storm(2,7,100,220)+night(3); },
  features:[
    {x:140,y:262,r:22,name:'Omaha\'s bluffs',why:`High bluffs over a curved beach gave defenders clear fields of fire, with only a few gullies leading off the sand.`},
    {x:70,y:190,r:30,name:'Cotentin and Cherbourg',why:`The peninsula held Cherbourg, the deep-water port the Allies needed. Utah Beach was placed to cut it off quickly.`},
    {x:277,y:256,r:16,name:'The Orne bridges',why:`Bridges on the eastern flank. Holding them blocked German armor from rolling up the beaches from the east.`},
    {x:230,y:140,d:'M190 76 L186 236',line:true,name:'The long crossing',why:`Much longer than the Calais route, which is why the Germans thought it less likely, and why the Allies needed artificial harbours.`},
    {x:350,y:196,r:30,name:'Pas-de-Calais',why:`The shortest crossing and the heaviest defences. The deception kept a whole German army waiting here.`},
    {x:258,y:288,r:18,name:'Caen',why:`A key road hub and a D-Day objective. It was not fully captured until July.`}
  ],
  units:[
    U('a_ike','g','cmd',1,'General Eisenhower',`Supreme commander. Made the weather call at Southwick House near Portsmouth.`,{0:[150,34]}),
    U('a_us_ab','g','para',2,'US 82nd and 101st Airborne',`Dropped at night to secure the exits from Utah Beach and block counterattacks.`,{0:[62,42],2:[62,42,'exit'],3:[80,252]}),
    U('a_br_ab','g','para',2,'British 6th Airborne',`Seized bridges on the eastern flank and knocked out the Merville gun battery.`,{0:[290,46],2:[290,46,'exit'],3:[276,262]}),
    U('a_us_inf','g','inf',3,'US First Army',`Landed at Utah and Omaha.`,{0:[118,46],2:[124,150],4:[124,236],5:[132,262]}),
    U('a_br_inf','g','inf',3,'British Second Army',`Landed at Gold and Sword, with the Canadians at Juno between them.`,{0:[200,46],2:[190,150],4:[188,250],5:[198,270]}),
    U('a_cdn','g','inf',2,'3rd Canadian Infantry Division',`About 14,000 Canadians landed at Juno.`,{0:[246,52],2:[226,156],4:[222,252],5:[226,286]}),
    U('a_tanks','g','arm',2,'Specialized armor',`Swimming tanks and Hobart's Funnies: engineering tanks built to clear mines, cross ditches and break bunkers.`,{0:[80,58],2:[158,160],4:[160,252],5:[170,276]}),
    U('a_fleet','g','ship',3,'Allied naval force',`Nearly 7,000 vessels, from battleships to landing craft.`,{0:[170,96],2:[178,176],4:[176,208]}),
    U('a_mulb','g','crate',2,'Mulberry harbours',`Prefabricated ports, built in Britain and towed across the Channel in sections.`,{0:[182,62,'off'],5:[176,228]}),
    U('a_fusag','g','arm',3,'First US Army Group (phantom)',`An army that did not exist: inflatable tanks, fake radio traffic and double agents.`,{0:[332,44,'off'],1:[332,44,'decoy']}),
    U('g_7th','t','inf',3,'German 7th Army',`Defended Normandy with a mix of experienced and second-rate divisions.`,{0:[150,292]}),
    U('g_15th','t','inf',3,'German 15th Army',`The strongest force on the coast, held at Calais by the deception for weeks.`,{0:[344,214]}),
    U('g_wall','t','art',2,'Atlantic Wall defences (west)',`Bunkers, guns and beach obstacles behind Omaha and Gold.`,{0:[138,262],4:[138,262,'ko']}),
    U('g_wall2','t','art',1,'Atlantic Wall defences (east)',`Coastal guns and strongpoints behind Juno and Sword.`,{0:[232,262],4:[232,262,'ko']}),
    U('g_panzer','t','arm',2,'Panzer reserve',`Germany's strongest weapon against a landing, held back under Hitler's personal control.`,{0:[300,346],5:[272,316]}),
    U('g_rommel','t','cmd',1,'Field Marshal Rommel',`Believed the battle would be won or lost on the beaches. Was in Germany on 6 June.`,{0:[312,300],2:[396,396,'exit']})
  ],
  phases:[
    {when:'1943 to 1944', title:'Where do you cross?', a:[],
     move:`Germany has fortified the French coast with the Atlantic Wall: bunkers, guns, mines and beach obstacles. The heaviest defences and the strongest army sit at the Pas-de-Calais, opposite Dover.`,
     why:`Calais was the shortest crossing and the most direct route to Germany. Everyone, especially the Germans, expected the invasion there.`,
     tv:`German commanders disagreed about how to meet the invasion. Rommel wanted armor close to the beaches to strike within hours. Others wanted it held back to counterattack once the main landing was clear. The result was a compromise that did neither well.`,
     ground:`Normandy offered wide beaches, a sheltered bay, fighter cover from southern England and the port of Cherbourg nearby, at the cost of a much longer sea crossing.`,
     supply:`An invasion lives or dies on the build-up afterward. The Allies needed a port, or a way to manage without one.`,
     board:{h:`The obvious target is the defended one`, b:`Where everyone expects the attack is where the defences are thickest. In a category, the obvious positioning or the obvious channel is usually the most contested.`, try:`Write down where every competitor expects you to move next. Then find the less obvious place that still gets you what you need.`}},
    {when:'Spring 1944', title:'Sell them Calais',
     a:[['gd',334,58,360,110,362,156]],
     call:{side:'g', who:'the Allied planners', q:`Calais is the obvious, shortest crossing. Normandy is longer but less defended. What do you do?`, opts:[
       {t:`Land at Calais with overwhelming force`, ok:false, fb:`Shortest route, strongest defences. Going head-on at the best-prepared point invites a bloodbath.`, alt:{u:{a_us_inf:[318,108], a_br_inf:[340,96], a_fleet:[330,120]}, a:[['g',200,50,300,80,340,140],['t',344,214,350,180]]}},
       {t:`Land in Normandy, and make Germany believe the real attack is still coming at Calais`, ok:true, fb:`This is the actual plan: Operation Overlord, covered by a deception called Operation Fortitude.`},
       {t:`Land far to the west in Brittany`, ok:false, fb:`Too far from England for fighter cover and too far from Germany to matter quickly.`, alt:{u:{a_us_inf:[20,190], a_fleet:[30,150]}, a:[['g',118,52,50,110,22,184]]}}]},
     move:`The Allies invent an entire army group in Kent, the First US Army Group, under the famous General Patton. Inflatable tanks, fake landing craft, false radio traffic and double agents all point at Calais.`,
     why:`Fortitude worked because it confirmed what German leaders already believed. Even after D-Day, it kept a whole German army waiting at Calais for weeks.`,
     tv:`Every source German intelligence trusted pointed at Calais: agents' reports, radio traffic, aerial photos of a huge army in Kent. Believing it was rational on the evidence they had. They did not know their agents in Britain had been turned.`,
     board:{h:`People believe what confirms their expectations`, b:`The best deception fed an existing belief rather than creating a new one. The same bias works on you: competitors, partners and even your own team can tell you what you already want to hear.`, try:`Name a belief about your market that you have not tested this year. What would it cost if it were wrong?`}},
    {when:'4 to 5 June 1944', title:'The weather call',
     a:[['g',118,62,122,140],['g',200,62,192,140],['g',246,66,228,146]],
     call:{side:'g', who:'Eisenhower', q:`A storm has already forced one day's delay. Your chief meteorologist forecasts a short break in the weather. The next suitable tides are about two weeks away. What do you decide?`, opts:[
       {t:`Go on 6 June, trusting the forecast break`, ok:true, fb:`This is the decision Eisenhower made in the early hours of 5 June.`},
       {t:`Postpone to the next good tides, about two weeks later`, ok:false, fb:`The next window ran into the worst Channel storm in decades, from 19 to 22 June, the storm that wrecked the American Mulberry harbour. Keeping the plan secret for two more weeks would also have been very hard.`, alt:{u:{a_fleet:[170,96]}, a:[]}}]},
     move:`A storm forces a delay from 5 June. Group Captain James Stagg, the chief meteorologist, forecasts a brief break. Eisenhower decides: go on 6 June. He also writes a short note taking full personal blame in case the landings fail. The fleet sails.`,
     why:`The landing needed a narrow mix of conditions: low tide at dawn to expose beach obstacles, moonlight for the paratroopers and calm enough seas. The next suitable window was weeks away.`,
     tv:`German forecasters, with less weather data from the Atlantic, judged conditions too poor for an invasion. Senior officers left for war games, and Rommel went home to Germany for his wife's birthday.`,
     board:{h:`Decide under uncertainty, and own the downside in advance`, b:`Eisenhower could not remove the risk. He gathered the best information, made the call on time and accepted the blame before the outcome was known. That is what lets a team commit fully.`, try:`On your next high-stakes decision, set a deadline, decide on the best information you have, and say out loud that the outcome is yours.`}},
    {when:'Night, 5 to 6 June', title:'The night drop', vis:.55,
     a:[['g',62,52,30,160,74,240],['g',290,56,318,150,280,250]],
     move:`About 24,000 airborne troops land behind the beaches. American paratroopers drop across the Cotentin peninsula to secure the causeways off Utah. British airborne troops seize bridges over the Orne River and the Caen Canal, including Pegasus Bridge, taken by gliders just after midnight.`,
     why:`The airborne troops protected both ends of the invasion, blocking counterattacks into the flanks and securing the exits the beach troops would need.`,
     tv:`Reports of paratroopers came in all night, but the drops were scattered and the Allies also dropped dummy paratroopers as decoys. It was hard to tell a raid from an invasion.`,
     ground:`Flooded fields and hedgerows scattered many paratroopers far from their targets. Small groups formed up and fought wherever they landed.`,
     board:{h:`Secure the flanks before the main launch`, b:`The paratroopers went in first to make the main landing survivable. In a campaign launch, the equivalent is locking approvals, inventory and measurement before the media goes live.`, try:`List what must be in place the night before your launch, and give each item a single owner.`}},
    {when:'6 June, 6:30 a.m. onward', title:'H-Hour on five beaches',
     a:[['g',124,164,124,226],['g',190,164,188,240],['g',226,168,222,244],['g',158,170,160,242]],
     move:`After naval and air bombardment, troops land on Utah, Omaha, Gold, Juno and Sword. Utah goes smoothly. Omaha nearly fails: the bombing missed, most of the swimming tanks sank, and troops were pinned under the bluffs until small groups fought their way up. The British and Canadian beaches push inland, and the Canadians at Juno get further inland than any other force that day.`,
     why:`Each beach got a mix of infantry, engineers, tanks and naval gunfire. Where the mix worked, troops moved inland. Where parts failed, it was up to junior leaders to improvise.`,
     tv:`Local defenders fought hard, especially at Omaha. But the commanders who could release the reserves were asleep, away or unsure, and Hitler's headquarters hesitated.`,
     ground:`Omaha's high bluffs gave defenders a perfect field of fire. On the flatter British and Canadian beaches, specialized tanks solved specific obstacles one by one.`,
     board:{h:`Plans break; intent survives`, b:`At Omaha the plan collapsed within minutes. What saved it was soldiers who understood the goal, get off the beach, and acted without waiting for orders. Teams that know the intent behind a plan keep moving when the plan fails.`, try:`For your current project, can every team member say in one sentence what success looks like if the plan falls apart?`}},
    {when:'June 1944', title:'The build-up race',
     a:[['gd',182,92,180,170,178,218],['td',300,344,288,330,276,322]],
     call:{side:'t', who:'German high command', q:`Allied troops are ashore in Normandy. Your intelligence still reports a huge army in Kent, ready to cross to Calais. What do you do with the 15th Army?`, opts:[
       {t:`Keep it at Calais for the main invasion`, hist:true, ok:false, fb:`This is what happened. The deception kept those divisions waiting for weeks for an attack that never came.`},
       {t:`Send it and the panzers to Normandy at once`, ok:true, fb:`The strongest response. Hitting the beachhead in the first days with everything available was Germany's best chance, though Allied air power would have made the move costly.`, alt:{u:{g_15th:[290,300], g_panzer:[232,290]}, a:[['t',344,214,320,260,292,296],['t',300,346,260,320,234,294]]}}]},
     move:`By nightfall on 6 June about 156,000 troops are ashore. Over the next days two artificial Mulberry harbours are towed across the Channel and assembled off the beaches. German armored reserves arrive slowly and piecemeal, and the 15th Army stays at Calais.`,
     why:`After the landing came a race: could the Allies land men and supplies faster than Germany could bring up reinforcements? Allied air power, sabotage and a slow German chain of command decided it.`,
     tv:`Even with the Allies ashore, many German leaders still expected a second, larger invasion at Calais. The fake army in Kent kept that belief alive for weeks.`,
     supply:`Without a captured port, the Allies brought their own. A storm later wrecked the American Mulberry, but the British one at Arromanches kept supplies flowing for months.`,
     ground:`The panzer reserves could not move without approval from Hitler's headquarters, which came hours late. Allied commanders on the beaches could act on their own judgment.`,
     board:{h:`Logistics sets the ceiling`, b:`The landing made the headlines, but the build-up won the campaign. And Germany lost hours because one person had to approve the reserves. Centralized sign-off is a speed tax at exactly the moment speed matters most.`, try:`Find one approval in your process that slows the team in a crisis. Delegate it before the next crisis.`}},
    {when:'Summer 1944', title:'Aftermath',
     a:[['g',150,280,170,340,210,372]],
     move:`After weeks of hard fighting in the hedgerows, the Allies break out in late July. Paris is liberated on 25 August. Less than a year after D-Day, Germany surrenders.`,
     why:`D-Day succeeded because many unglamorous systems worked together: deception, forecasting, planning, logistics and the initiative of small units.`,
     tv:`Germany now fought on two major fronts with dwindling fuel, aircraft and men. The defeat in Normandy cost it its strongest forces in the west.`,
     board:{h:`Great launches are systems`, b:`No single idea won D-Day. It took years of planning, an army of specialists and a culture where people acted on intent. The headline moment rests on everything underneath it.`, try:`For your next big launch, give the unglamorous systems (forecasting, operations, supply, sign-off) the same leadership attention as the big idea.`}}
  ]
});
