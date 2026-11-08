PG.add({
  id:'stalingrad', name:'Stalingrad', year:'1942', place:'Southern Russia',
  summary:`A German army fights its way into a ruined city while the Soviets quietly mass armies to cut it off from behind.`,
  face:{g:-1,t:1},
  g:{tab:'Soviets', short:'Soviet Union', name:'Soviet Red Army', cmdr:'Generals Zhukov and Vasilevsky (planning); General Chuikov (62nd Army in the city)', str:'Over a million men by the November counteroffensive', eyes:'Through Soviet eyes'},
  t:{short:'Germany', name:'German 6th Army and Axis allies', cmdr:'General Friedrich Paulus; Adolf Hitler', str:'About 250,000 to 300,000 Axis troops were eventually trapped', eyes:'Through German eyes'},
  objective:`Germany: take the city, cut traffic on the Volga and guard the flank of the drive for Caucasus oil. Soviet Union: hold the city at any cost, then encircle and destroy the German army.`,
  prologue:{
    when:'June to August 1942', title:'The drive for oil',
    text:`A year after invading the Soviet Union and failing to take Moscow, Germany launches a summer offensive, Case Blue, toward the oil fields of the Caucasus. Hitler splits the attack: one army group drives south for the oil, while the 6th Army pushes east to the Volga River at Stalingrad to shield the flank. As the summer goes on, the city named after Stalin becomes a goal in itself for both leaders.`,
    gWant:`To hold the Volga at all costs, buy time, and gather reserves for a counterstroke.`,
    tWant:`Oil to keep its war machine running, and a prestige victory in the city that bore Stalin's name.`,
    box:[262,140,40],
    theater(){
      let s=felt('#a3a679');
      s+=sea('M0 262 Q60 242 120 272 Q150 312 120 362 Q60 382 0 372 Z')+sea('M136 232 Q156 222 170 236 Q160 252 140 248 Z');
      s+=sea('M332 222 Q372 202 396 232 L400 400 H342 Q322 332 337 282 Q322 252 332 222 Z');
      [[160,342,14],[190,336,16],[220,342,15],[250,336,14],[280,344,12],[310,338,11]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#f0ece0'));
      s+=river('M240 0 Q300 90 292 165 Q300 210 340 240',6)+river('M120 30 Q200 100 240 170 Q222 220 150 240',4);
      s+=city(200,14,'Moscow',9,14)+city(60,122,'Kharkov',8,-6)+city(290,168,'Stalingrad',9,-7,'end')+city(124,226,'Rostov',8,-6)+city(232,356,'Caucasus oil fields',8,16);
      s+=label(60,330,'Black Sea',10)+label(370,320,'Caspian Sea',9,90)+label(310,100,'Volga',9)+label(176,130,'Don',9);
      return s;
    },
    tokens:[
      {s:'t',t:'inf',n:3,name:'German 6th Army',why:'About 250,000 men, the strongest German army on the Eastern Front, heading for the Volga.',path:[[60,130],[180,142],[268,162]]},
      {s:'t',t:'arm',n:2,name:'Army Group A',why:'Drove south toward the oil fields of the Caucasus, stretching German forces over huge distances.',path:[[70,176],[160,250],[226,318]]},
      {s:'g',t:'arm',n:3,name:'Soviet reserves',why:'New armies gathered in secret east of the Volga and north of the Don.',path:[[200,22],[244,72],[300,116]]}
    ],
    a:[['td',60,130,180,140,262,160],['td',70,176,160,250,226,316],['gd',200,22,244,72,296,114]]
  },
  terrain(){
    let s=felt('#a7a57c');
    s+=river('M0 70 Q90 50 150 80 Q190 110 188 180 Q180 230 140 270 Q100 320 0 330',10);
    s+=river('M332 0 Q300 90 318 170 Q330 240 360 300 Q380 350 400 380',26);
    s+=hill(286,170,16,10,2);
    const r=rng(42);
    for(let k=0;k<28;k++){ const y=70+r()*220, x=272+r()*30+(y>220?(y-220)*.25:0); s+=r()<.5?ruin(x.toFixed(0),y.toFixed(0)):house(x.toFixed(0),y.toFixed(0),'#7a6f66'); }
    s+=`<rect x="282" y="86" width="24" height="14" fill="#8d8478" stroke="#3f3a33" stroke-width=".8"/><rect x="286" y="76" width="4" height="10" fill="#5b544b"/><rect x="296" y="78" width="4" height="8" fill="#5b544b"/>`;
    s+=house(196,190)+house(204,196,'#8a3a2a');
    s+=label(232,110,'Stalingrad',12)+label(366,170,'Volga',12,72)+label(110,58,'Don',11)+label(206,214,'Kalach',9)+label(252,182,'Mamayev Kurgan',8)+label(266,74,'Tractor factory',8)+label(66,38,'Serafimovich bridgehead',8)+label(120,372,'Kalmyk steppe',10)+label(374,24,'East bank',8);
    s+=compass(26,382);
    return s+end();
  },
  over(){ return snowfall('3 4 5 6')+night(2); },
  features:[
    {x:334,y:190,px:348,py:206,d:'M332 0 Q300 90 318 170 Q330 240 360 300 Q380 350 400 380',line:true,name:'The Volga',why:`The river behind the city: the Soviet lifeline by ferry, and a wall that made retreat impossible.`},
    {x:290,y:180,r:34,px:272,py:150,name:'The ruined city',why:`Rubble cancelled German tanks and air power and forced close-range fighting that favored the defenders.`},
    {x:100,y:72,r:34,px:100,py:96,name:'The northern flank on the Don',why:`A long front held by the Romanian 3rd Army with weak anti-tank weapons. One of the weakest points on the map.`},
    {x:256,y:340,r:34,px:256,py:316,name:'The southern steppe',why:`Open country held thinly by the Romanian 4th Army. Ideal ground for a tank attack.`},
    {x:200,y:192,r:18,px:180,py:180,name:'Kalach',why:`Where the two Soviet pincers met on 23 November, closing the ring.`}
  ],
  units:[
    U('s_62','g','inf',3,'62nd Army (Chuikov)',`Defended the city street by street. Chuikov kept his lines so close to the Germans that German aircraft could not bomb them without hitting their own troops.`,{0:[296,190],1:[312,200],5:[296,200]}),
    U('s_volga','g','ship',2,'Volga ferries',`Night crossings brought in fresh troops and ammunition and took out the wounded, under constant fire.`,{0:[340,200],1:[334,172],5:[338,190]}),
    U('s_north','g','arm',3,'Northern pincer',`Tank and infantry armies of the Southwestern Front, massed in secret behind the Don.`,{0:[50,30,'off'],2:[70,70,'hide'],3:[190,170],5:[214,150]}),
    U('s_don','g','inf',3,'Don Front',`Pinned German forces between the Don and the Volga as the ring closed.`,{0:[150,40,'off'],2:[150,70,'hide'],3:[220,110],5:[248,128]}),
    U('s_south','g','arm',3,'Southern pincer',`Armies of the Stalingrad Front, attacking from south of the city across the open steppe.`,{0:[300,380,'off'],2:[300,350,'hide'],3:[206,212],5:[236,236]}),
    U('s_stavka','g','cmd',1,'Zhukov and Vasilevsky',`The planners of Operation Uranus. They argued for patience: feed the city just enough to hold, and save the reserves for the counterstroke.`,{0:[372,52]}),
    U('g_6th','t','inf',3,'6th Army main body',`Germany's strongest army in the east, gradually drawn into the city and the fighting around it.`,{0:[170,150],1:[232,170],5:[248,178,'ko']}),
    U('g_city','t','inf',3,'6th Army assault groups',`Infantry and engineers fighting for buildings, factories and single floors.`,{0:[220,200],1:[288,206],5:[286,210,'ko']}),
    U('g_paulus','t','cmd',1,'General Paulus',`A capable staff officer who obeyed Hitler's orders to hold. Surrendered on 31 January 1943.`,{0:[180,176],1:[240,196],5:[262,196,'ko']}),
    U('g_pz','t','arm',2,'4th Panzer Army elements',`Armor south of the city, part of which was trapped in the pocket.`,{0:[200,300],1:[262,268],5:[262,268,'ko']}),
    U('r_3rd','t','inf',3,'Romanian 3rd Army',`Holding the long Don flank north of the city with poor anti-tank weapons. The target of the northern pincer.`,{0:[60,80,'off'],1:[100,72],3:[96,66,'ko']}),
    U('r_4th','t','inf',2,'Romanian 4th Army',`Thinly spread across the open steppe south of the city.`,{0:[260,360,'off'],1:[256,334],3:[262,346,'ko']}),
    U('g_air','t','plane',2,'Luftwaffe airlift',`Hermann Göring promised to supply the trapped army by air. The planes delivered a fraction of what was needed.`,{0:[40,380,'off'],4:[226,214],5:[60,380,'exit']}),
    U('g_manstein','t','arm',2,'Manstein\'s relief force',`Operation Winter Storm fought to within about 50 km of the pocket in December before being forced back.`,{0:[120,395,'off'],4:[176,292],5:[110,385,'exit']}),
    U('g_hitler','t','cmd',1,'Hitler',`Directed the battle from his headquarters in East Prussia, far away, and forbade retreat.`,{0:[22,24]})
  ],
  phases:[
    {when:'August 1942', title:'To the Volga',
     a:[['t',170,150,220,160,266,176],['t',220,200,260,200,282,204]],
     move:`The German 6th Army crosses the Don and reaches the Volga just north of Stalingrad on 23 August. The same day, massive air raids set much of the city on fire. Soviet troops and civilians dig in among the ruins.`,
     why:`Reaching the Volga cut a vital river route and protected the flank of the drive south. Taking the city itself became the next goal.`,
     tv:`German commanders expected the city to fall within days. After a summer of rapid advances, the Red Army looked close to breaking.`,
     ground:`The city stretched for kilometres along the high west bank of the Volga. Behind the defenders was the river; behind the Germans, hundreds of kilometres of open steppe.`,
     supply:`German supply lines ran back over long distances with few railways. Every kilometre east made the army more dependent on fragile links.`,
     board:{h:`Know whether the goal still serves the strategy`, b:`Stalingrad began as a flank guard for the real objective, oil. It grew into the main event because of its name and its symbolism. Goals drift when pride gets involved.`, try:`Revisit your current top priority. Does it still serve the original strategy, or has it become a goal in itself?`}},
    {when:'September to November 1942', title:'The city fight',
     a:[['t',232,170,270,180,288,196],['g',340,200,330,200,316,200]],
     call:{side:'t', who:'Hitler and Paulus', q:`Your army is bleeding street by street, and your long flanks along the Don are held by weaker allied armies. What do you do?`, opts:[
       {t:`Keep feeding divisions into the city until it falls`, hist:true, ok:false, fb:`This is what happened. The city fight consumed the army while the danger on the flanks grew.`},
       {t:`Hold a line outside the city and strengthen the flanks with German units`, ok:true, fb:`Several German generals argued for something like this. It meant giving up a prestige goal to protect the army.`, alt:{u:{g_city:[200,190], g_6th:[150,128], g_pz:[226,326]}, a:[['td',220,200,210,196,202,192],['t',170,150,160,140,152,132]]}},
       {t:`Hand the city fight to allied armies and pull German units out`, ok:false, fb:`The allied armies had weaker equipment and training. They could not have held what the 6th Army could not take.`}]},
     move:`Fighting in Stalingrad becomes a brutal close-quarters battle for buildings, factories and single floors. Chuikov's 62nd Army is pushed back to narrow strips along the riverbank but never off it. By November, Germany holds most of the city. More and more German divisions are drawn into the fight, while weaker Romanian armies guard the long flanks.`,
     why:`Hitler and Paulus kept feeding troops into the city because the goal always seemed just within reach. Each block taken made stopping harder.`,
     tv:`From inside the German army, the city was always about to fall: one more factory, one more block. Hitler declared publicly that Stalingrad was as good as taken. Retreat would have meant admitting failure.`,
     ground:`Rubble and ruined factories cancelled German strengths in tanks and maneuver. Fighting at close range favored stubborn defenders.`,
     board:{h:`Do not let a symbolic goal eat your strategy`, b:`Germany poured its best troops into a city that was no longer militarily essential, while its flanks thinned out. Prestige projects pull resources away from where risk is building.`, try:`List the projects you are continuing mainly because you have announced them. What would you do with the resources if you stopped?`}},
    {when:'October to November 1942', title:'The hidden build-up', vis:.6,
     a:[],
     call:{side:'g', who:'Zhukov and Vasilevsky', q:`The Germans are bogged down in the city. You have assembled strong new reserves. Where do you use them?`, opts:[
       {t:`Send them across the Volga to reinforce the city`, ok:false, fb:`It would have eased the pressure in the city and changed nothing else: a slow battle of attrition.`, alt:{u:{s_north:[318,150], s_south:[320,232]}, a:[['g',372,52,340,110,320,146]]}},
       {t:`Attack the German army head-on outside the city`, ok:false, fb:`Against the strongest German formations, that meant heavy losses for limited gains.`, alt:{u:{s_north:[196,140], s_don:[214,120]}, a:[['g',150,70,190,110,226,160]]}},
       {t:`Strike the weak flanks far to each side and encircle the whole army`, ok:true, fb:`This is Operation Uranus: hit the Romanian armies, not the Germans, and close the ring far behind the city.`}]},
     move:`While the city fight rages, Soviet planners secretly mass more than a million men, with thousands of tanks and guns, opposite the Romanian sectors north and south of the city. Troops move at night, radio silence is enforced, and the defenders of the city get only the minimum needed to hold.`,
     why:`The aim was not to win back the city block by block, but to cut off everyone in it.`,
     tv:`German intelligence noticed some Soviet build-up near the flanks but badly underestimated its size. Commanders believed the Red Army had no major reserves left.`,
     ground:`Bridgeheads over the Don and the open steppe in the south gave room to assemble and to strike with tanks.`,
     board:{h:`Hold with the minimum, strike with the maximum`, b:`The Soviets accepted terrible pressure in the city so they could save their real strength for one decisive blow. Saying no to reinforcing a crisis is one of the hardest leadership calls.`, try:`Where are you spending your best resources defending a position, when they could be building the move that ends the problem?`}},
    {when:'19 to 23 November', title:'Operation Uranus',
     a:[['g',70,70,130,120,186,166],['g',300,350,250,280,210,214],['g',150,70,190,90,218,108]],
     move:`On 19 November the northern pincer smashes the Romanian 3rd Army; the next day the southern pincer breaks the Romanian 4th. Tank forces race across the snowy steppe and meet at Kalach on the Don on 23 November. Roughly 250,000 to 300,000 Axis troops are now trapped.`,
     why:`By striking where the line was weakest, the Soviets avoided German strength in the city entirely and turned it into a trap.`,
     tv:`Paulus asked permission to break out while the ring was still thin. Hitler refused and declared the army a fortress, to be supplied by air.`,
     ground:`Open, frozen steppe let tank columns move fast. The bridge at Kalach was the hinge that closed the ring.`,
     board:{h:`Attack the weakest link in their chain`, b:`The Germans were strongest in the city and weakest on the flanks. The Soviets hit the flanks and made the strength irrelevant. Competitors are rarely as strong at the edges of their business as at the center.`, try:`Where is your competitor relying on a partner, supplier or second-tier team that is much weaker than its core?`}},
    {when:'December 1942', title:'Stay or break out?',
     a:[['t',176,292,200,250,220,228],['t',40,380,140,300,222,218]],
     call:{side:'t', who:'Paulus', q:`Manstein's relief force is about 50 km away. Hitler forbids a breakout. You have fuel for perhaps 30 km. What do you do?`, opts:[
       {t:`Obey the order and hold your position`, hist:true, ok:false, fb:`This is what Paulus did. The relief was driven back and the army's last real chance passed.`},
       {t:`Break out toward Manstein, against orders`, ok:true, fb:`Risky: many men and most heavy equipment would have been lost. But most historians see it as the only chance to save a large part of the army.`, alt:{u:{g_6th:[200,252], g_city:[220,242], g_paulus:[214,262]}, a:[['t',232,170,210,220,202,248],['t',176,292,190,272,198,258]]}},
       {t:`Surrender now to save lives`, ok:false, fb:`It would have saved many lives in the short term, but no German general in 1942 would have considered it, and Soviet prison camps were deadly too.`}]},
     move:`Hitler orders the army to stand fast and promises supply by air. The Luftwaffe delivers only a fraction of what is needed. In mid-December, Field Marshal Manstein's relief force fights to within about 50 km of the pocket. Paulus does not break out to meet it, and the relief force is pushed back.`,
     why:`The army stayed because of orders, because fuel and horses were short, and because the airlift promise made staying seem possible.`,
     tv:`The trapped soldiers were starving and freezing. Paulus had fuel for only a short move and a direct order not to make it. He would not break out without permission.`,
     supply:`The pocket needed hundreds of tonnes of supplies a day. On average, the airlift delivered around 100 tonnes a day, in winter weather and under attack.`,
     board:{h:`A promise is not a supply line`, b:`Göring promised an airlift he could not deliver, and the decision to hold rested on it. Before committing to a plan, check whether the critical dependency can actually perform.`, try:`Identify the promise your current plan depends on most. Ask the person making it to show you the numbers.`}},
    {when:'January to February 1943', title:'Collapse',
     a:[['g',214,150,240,160,252,176],['g',236,236,250,220,260,206],['g',248,128,270,150,280,170]],
     move:`The Soviets tighten the ring. Starving, frozen and short of ammunition, the pocket is split in two. Paulus surrenders on 31 January; the last troops in the north give up on 2 February. About 91,000 men go into captivity. Only about 5,000 ever return home.`,
     why:`With no supplies and no way out, the trapped army could only lose more slowly.`,
     tv:`Hitler promoted Paulus to field marshal on 30 January, because no German field marshal had ever surrendered. Paulus surrendered the next day.`,
     board:{h:`Delay is not a strategy`, b:`Holding on bought nothing once the relief failed. When a position has no path to success, every extra week adds cost.`, try:`For any initiative running on hope alone, set a date and a test: if it does not show progress by then, stop.`}},
    {when:'1943 onward', title:'Aftermath', a:[],
     move:`Stalingrad is among the bloodiest battles in history, with estimates of total casualties on both sides, including civilians, running close to two million. Germany never fully recovers the initiative in the east. After its failed offensive at Kursk in July 1943, the Red Army advances steadily westward.`,
     why:`The battle broke the image of German invincibility and showed that the Soviet Union could plan and carry out huge, complex operations.`,
     tv:`For Germany, Stalingrad was the first time an entire field army had been destroyed. The defeat was impossible to hide from the German public.`,
     board:{h:`The turning point is often a decision, not a battle`, b:`Stalingrad was lost in a chain of decisions: to keep feeding the city, to trust the airlift, to forbid retreat. Big outcomes follow from choices made under pressure to save face.`, try:`Look back at a project that failed. Find the one decision where stopping would have been cheapest.`}}
  ]
});
