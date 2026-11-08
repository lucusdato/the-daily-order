PG.add({
  id:'thermopylae', name:'Thermopylae', year:'480 BC', place:'Central Greece',
  summary:`A small Greek force plugs a coastal pass to stall the largest army of the ancient world.`,
  face:{g:-1,t:1},
  g:{short:'Greeks', name:'Greek alliance', cmdr:'King Leonidas of Sparta', str:'About 7,000 men', eyes:'Through Greek eyes'},
  t:{short:'Persians', name:'Persian Empire', cmdr:'King Xerxes I', str:'Likely well over 100,000 (ancient writers claimed millions)', eyes:'Through Persian eyes'},
  objective:`Greeks: hold Persia at the pass long enough for the fleet and the city-states to organize. Persia: break through to central Greece and Athens.`,
  prologue:{
    when:'490 to 480 BC', title:'The Great King comes west',
    text:`Ten years earlier, Athens helped defeat a Persian landing at Marathon. Now Xerxes, ruler of the largest empire on earth, leads a vast army and fleet around the coast of the Aegean to conquer Greece. Many Greek cities submit. A small alliance led by Sparta and Athens decides to fight, but a religious festival and the Olympic Games are underway, so Sparta sends only an advance force north.`,
    gWant:`Time. Every week Persia is held in the north is a week for the fleet to fight and for the cities to mobilize.`,
    tWant:`Speed. A huge army eats a huge amount, and it is fed by a fleet hugging the coast. It needs to break into central Greece before supplies and the sailing season run out.`,
    box:[105,170,36],
    theater(){
      let s=seaBg();
      s+=land('M0 0 H200 L205 40 Q190 60 175 72 Q160 82 150 110 Q140 150 150 190 Q170 230 176 262 Q150 282 130 272 L112 290 Q122 302 140 312 Q130 360 100 382 Q60 362 40 332 Q60 302 90 302 L60 272 Q20 262 0 242 Z');
      s+=land('M200 0 H310 L312 34 Q285 48 255 44 Q225 50 205 40 Z');
      s+=land('M322 0 H400 V400 H330 Q300 350 320 300 Q300 260 315 230 Q295 190 320 150 Q300 120 310 90 Q296 58 322 0 Z');
      s+=`<ellipse cx="180" cy="208" rx="9" ry="26" fill="#8fa765" stroke="#e6d6a2" stroke-width="2" transform="rotate(-30 180 208)"/>`;
      [[230,190,8],[250,250,6],[220,300,7],[270,140,6]].forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="#8fa765" stroke="#e6d6a2" stroke-width="1.5"/>`);
      s+=mtn(110,140,16)+mtn(90,170,14)+mtn(130,100,14);
      s+=city(150,268,'Athens')+city(100,345,'Sparta')+city(355,255,'Sardis',9,-6)+city(316,42,'Hellespont',9,14)+city(162,284,'Salamis',8,12);
      s+=label(240,120,'Aegean Sea',14)+label(60,40,'Greece',13)+label(365,160,'Persian Empire',11,90)+label(200,170,'Artemisium',8);
      return s;
    },
    tokens:[
      {s:'t',t:'spr',n:3,name:'Persian army',why:'Marched from Sardis, crossed the Hellespont on bridges of boats, and moved around the coast.',path:[[352,262],[340,90],[300,52],[200,48],[132,112],[124,184]]},
      {s:'t',t:'gal',n:1,name:'Persian fleet',why:'Shadowed the army along the coast, carrying supplies.',path:[[360,300],[300,120],[230,80],[180,150],[188,178]]},
      {s:'g',t:'hvy',n:2,name:'Greek advance force',why:'About 7,000 men under Leonidas, sent north to block the pass.',path:[[100,345],[140,300],[150,240],[132,196]]},
      {s:'g',t:'gal',n:1,name:'Greek fleet',why:'Moved to Artemisium to block the strait next to the pass.',path:[[165,292],[190,250],[200,190]]}
    ],
    a:[['td',350,250,345,120,305,58],['td',290,46,170,40,128,170],['gd',100,335,150,280,134,198]]
  },
  terrain(){
    let s=felt('#a9a46b');
    s+=sea('M0 0 H400 V100 Q350 118 300 108 Q250 98 220 120 Q190 132 160 112 Q110 96 60 112 Q30 120 0 110 Z');
    const m='M0 222 Q60 205 120 214 Q165 190 205 168 Q240 186 280 208 Q340 198 400 214 V400 H0 Z';
    s+=`<path d="${m}" fill="#8c8160"/><path d="${m}" fill="url(#speck)"/>`;
    [[150,250,26],[60,262,34],[250,264,30],[350,262,34],[170,302,22],[100,334,40],[300,352,40],[30,392,40],[200,394,48],[380,392,36]].forEach(p=>s+=mtn(p[0],p[1],p[2]));
    s+=`<path d="M40 205 Q70 260 120 300 Q200 350 290 310 Q340 260 345 196" fill="none" stroke="#f3e6c0" stroke-width="2.4" stroke-dasharray="5 4" stroke-linecap="round"/>`;
    for(let y=124;y<170;y+=6) s+=`<rect x="212" y="${y}" width="7" height="5" rx="1" fill="#cbbd98" stroke="#6b5d42" stroke-width=".6"/>`;
    s+=label(95,52,'Gulf of Malis',14)+label(262,94,'Middle Gate wall',10)+label(205,320,'Anopaea path',11)+label(330,22,'Artemisium',11)+label(48,132,'Persian camp',10)+label(354,188,'To Athens',10)+label(300,388,'Mt. Kallidromos',11);
    s+=compass(24,24);
    return s+end();
  },
  over(){ return night(2); },
  features:[
    {x:200,y:150,r:30,name:'The Middle Gate',why:`The narrowest point of the pass. Only a small front could fight at once, which cancelled Persia's numbers.`},
    {x:110,y:62,r:36,name:'Gulf of Malis',why:`The sea guarded the Greek right, as long as the Greek fleet held the strait at Artemisium and stopped ships landing troops behind the pass.`},
    {x:250,y:330,px:250,py:326,d:'M40 205 Q70 260 120 300 Q200 350 290 310 Q340 260 345 196',line:true,name:'The Anopaea path',why:`A goat track over the mountain that came out behind the Greek position. The weak point of the whole plan.`},
    {x:330,y:286,r:30,name:'Mt. Kallidromos',why:`Steep slopes protected the Greek left and made going around slow and hard, but not impossible.`},
    {x:330,y:58,r:28,name:'Artemisium strait',why:`The naval half of the defense. Holding it kept the Persian fleet from supplying or landing troops behind the pass.`}
  ],
  units:[
    U('g_spartans','g','hvy',3,'Spartan hoplites (300)',`Full-time professional soldiers with large bronze shields and long spears. In a narrow front, the quality of each man in the front rank decides the fight.`,{0:[192,146],3:[168,148],4:[232,162,'ko']}),
    U('g_allies','g','hvy',3,'Allied Greek hoplites',`Citizen soldiers from across Greece, around 6,000 of them. Enough to rotate fresh men into the line for two days.`,{0:[245,150],1:[232,140],2:[245,150],3:[392,150,'exit']}),
    U('g_thespians','g','hvy',2,'Thespians (700)',`Volunteers from the city of Thespiae who chose to stay on the last day.`,{0:[268,168],3:[178,170],4:[250,178,'ko']}),
    U('g_leonidas','g','cmd',1,'King Leonidas',`Spartan king and overall commander. Fought in the front rank.`,{0:[212,170],3:[186,168],4:[214,176,'ko']}),
    U('g_phocians','g','spr',2,'Phocians (1,000)',`Local troops who knew the mountains, assigned to guard the hidden path.`,{0:[218,328],2:[165,292]}),
    U('g_fleet','g','gal',2,'Greek fleet at Artemisium',`Blocked the sea route so the pass could not be bypassed by ship.`,{0:[330,58],1:[300,62],4:[330,58],5:[388,34,'exit']}),
    U('p_xerxes','t','cmd',1,'King Xerxes I',`Watched the battle from a throne behind his army.`,{0:[30,180]}),
    U('p_medes','t','spr',3,'Medes and Cissians',`First-wave infantry with light wicker shields. Numbers without the armor to win a shoving match.`,{0:[95,150],1:[160,147,'ko'],2:[160,147,'exit']}),
    U('p_immortals','t','spr',3,'The Immortals (10,000)',`Persia's elite guard. Failed head-on, then succeeded by going around.`,{0:[60,170],1:[150,166],2:[212,342],3:[338,192],4:[268,186]}),
    U('p_mass','t','spr',3,'Main Persian army',`Vast and multinational, and mostly unable to reach the fight through the narrow pass.`,{0:[45,140],2:[85,145],3:[128,148],4:[192,148]}),
    U('p_archers','t','arch',2,'Persian archers',`Persia's main strength in open battle. Light arrows struggled against bronze shields.`,{0:[110,178],1:[118,172],4:[176,176]}),
    U('p_fleet','t','gal',2,'Persian fleet',`Tried to force the strait at Artemisium and turn the Greek position from the sea.`,{0:[125,55],1:[250,48],5:[300,52]})
  ],
  phases:[
    {when:'August 480 BC', title:'Plug the Hot Gates', a:[],
     move:`The Greeks rebuild an old wall at the narrowest point of the pass, the Middle Gate, and form up in front of it. Their fleet blocks the strait at Artemisium so Persia cannot simply sail around them.`,
     why:`Leonidas could not beat Persia in open country. In a pass only a few dozen metres wide, Persia could send only a few hundred men at a time, so a small, heavily armored force could trade evenly with a giant one.`,
     tv:`Xerxes had marched for months and expected the small Greek force to run at the sight of his army. Herodotus says he waited four days for them to leave. A few thousand men blocking a road did not look like a serious obstacle.`,
     ground:`Sea on one side, steep mountain on the other. At the point of contact, numbers stop mattering. What matters is who is better in the front rank.`,
     supply:`The land and sea positions protect each other. If the fleet loses, Persian ships land troops behind the pass. If the pass falls, the fleet has no friendly coast to shelter on.`,
     board:{h:`Pick the arena where their scale cannot reach`, b:`A bigger competitor wins the open field: broad reach, national weight, price wars. A challenger picks a narrow battlefield where only a sliver of that budget can be brought to bear at once, such as one retailer, one occasion or one community.`, try:`List the three arenas where your rival's size helps them least. Put your best people there.`}},
    {when:'Days 1 and 2', title:'Waves break on the wall',
     a:[['t',112,150,170,147],['t',72,170,140,165],['g',305,60,262,50]],
     call:{side:'t', who:'Xerxes', q:`Your first waves bounced off the wall in the pass. Thousands are dead, and the Greeks barely seem hurt. What do you do next?`, opts:[
       {t:`Keep attacking head-on with fresh troops, then send in the Immortals`, hist:true, ok:false, fb:`This is what Xerxes did on days one and two. Better troops still hit the same narrow front, and the losses mounted.`},
       {t:`Send the fleet to land troops behind the pass`, ok:false, fb:`Sensible on paper, but the Greek fleet at Artemisium was blocking exactly that route. Persia tried to force the strait in these same days and failed.`, alt:{u:{p_fleet:[262,70]}, a:[['t',125,55,190,40,255,66],['g',330,58,280,64]]}},
       {t:`Look for a way around through the mountains`, ok:true, fb:`The right idea, which Persia found only when a local offered to guide them. Searching for it on day one could have saved thousands of lives.`, alt:{u:{p_immortals:[150,300]}, a:[['td',60,186,70,260,145,296]]}}]},
     move:`Xerxes sends Medes and Cissians in frontal waves, then his elite Immortals. Both are thrown back with heavy losses. Persian arrows do little against bronze shields.`,
     why:`The Greeks rotated contingents through the front line so no unit fought to exhaustion. Herodotus says the Spartans also staged fake retreats, then turned on pursuers who broke formation.`,
     tv:`Persian commanders thought the problem was effort, not approach. Sending fresher, better troops seemed like the obvious fix, and the Immortals had never failed before.`,
     ground:`The width of the front, not the size of the army, set the pace of the fight. Persia's advantage sat idle in the queue behind the pass.`,
     board:{h:`Rotate the front line`, b:`The Greeks lasted because they treated stamina as a resource to manage. A team holding a hard position, through a pitch season or a crisis account, burns out if the same people take every wave.`, try:`Look at who handled the last three crises. Give the next one to someone else.`}},
    {when:'Night of day 2', title:'The goat path', vis:.6,
     a:[['td',60,186,80,280,200,338],['td',224,342,330,310,338,205]],
     call:{side:'g', who:'commander of the Phocians', q:`You guard the mountain path with 1,000 men. In the dark before dawn you hear thousands of soldiers coming up through the oak trees. What do you do?`, opts:[
       {t:`Hold the path and send runners to warn Leonidas`, ok:true, fb:`On a narrow mountain track, 1,000 determined men could have slowed the Immortals for hours and given Leonidas a real choice.`, alt:{u:{g_phocians:[200,333], p_immortals:[150,322]}, a:[['td',60,186,80,280,140,318],['g',210,333,165,325]]}},
       {t:`Pull back to the hilltop and defend yourselves`, hist:true, ok:false, fb:`This is what happened. The Phocians assumed they were the target. The Persians simply marched past them.`},
       {t:`Abandon the path and rejoin the main army`, ok:false, fb:`This leaves the back door wide open and gives no warning that it is open.`, alt:{u:{g_phocians:[244,182], p_immortals:[212,342]}, a:[['gd',218,328,262,250,244,186],['td',60,186,80,280,200,338]]}}]},
     move:`A local man, Ephialtes, shows Xerxes a mountain track called the Anopaea that comes down behind the Greek position. The Immortals march over it in the dark. The 1,000 Phocians guarding it pull back to a hilltop, expecting an attack, and the Persians simply walk past them.`,
     why:`Leonidas knew about the path and posted a guard. The plan failed at its quietest point, where less committed troops held the most important job.`,
     tv:`For Xerxes, Ephialtes was a gift: local knowledge worth more than ten thousand men. The night march was risky, through unknown mountains, but it turned a frontal problem into a flanking one.`,
     ground:`The mountain that protected the Greek flank also hid the route around it. Every strong position has a back door. The question is who knows about it.`,
     board:{h:`Your moat is only as strong as its least-watched path`, b:`Most strategies fail at an unglamorous dependency: a contract renewal, a single platform, one person who holds every client relationship. People who leave, like Ephialtes, know exactly where those paths are.`, try:`Ask what quiet failure would let a rival walk around your whole position. Who is guarding it, and do they know how much it matters?`}},
    {when:'Dawn, day 3', title:'Send the army home',
     a:[['gd',260,150,385,150],['g',186,146,160,148],['t',335,195,290,188]],
     call:{side:'g', who:'Leonidas', q:`Scouts report the Immortals are coming down behind you. You will be surrounded within hours. What do you do?`, opts:[
       {t:`Keep the whole army at the wall and fight to the end`, ok:false, fb:`Brave and wasteful. The army Greece would need later dies in one morning, and the pass still falls.`, alt:{u:{p_immortals:[338,192], p_mass:[128,148]}, a:[['t',335,195,282,172],['t',128,148,178,148]]}},
       {t:`Send most of the army south and keep a rearguard to hold the pass`, ok:true, fb:`This is what Leonidas did. The rearguard buys time for the main force to escape and stops Persian cavalry from riding them down.`},
       {t:`Charge the Persian camp and try to kill Xerxes`, ok:false, fb:`The camp was far off and full of troops. A charge would have destroyed the army without slowing the invasion.`, alt:{u:{g_spartans:[96,150], g_allies:[110,136], g_leonidas:[104,166]}, a:[['g',190,146,100,148]]}}]},
     move:`Leonidas dismisses most of the allies. The Spartans, about 700 Thespians and 400 Thebans stay. Instead of waiting behind the wall, they push out into the wider part of the pass to make the Persians pay for every metre.`,
     why:`Once the position was lost, the job changed from holding to delaying and protecting the retreat. Fewer troops could do that, and the rest were more valuable alive.`,
     tv:`By dawn the Persians knew the trap was closing. Their job now was simply to keep the Greeks pinned in front until the Immortals arrived behind them.`,
     board:{h:`When the position is lost, protect the core`, b:`Leaders hang on to a dying initiative because retreat feels like failure. The skill is spotting the moment the mission changes, then saving the people and capabilities you will need for the next fight.`, try:`For any struggling project, write down what you would keep if you shut it down tomorrow. Protect that first.`}},
    {when:'Day 3', title:'The last stand',
     a:[['t',150,150,215,158],['t',330,190,270,186]],
     move:`Leonidas is killed. The survivors fall back behind the wall to a small hill, where they are surrounded and overwhelmed, many of them by arrows. The Thebans surrender.`,
     why:`The rearguard had done its job. Every hour it held kept the retreat road open.`,
     tv:`Victory, but an expensive one. Herodotus says Xerxes lost thousands of men here, including two of his own brothers, and precious days of the campaign season.`,
     ground:`With the Immortals behind them, the pass that had protected the Greeks became a trap with no exit.`,
     board:{h:`Sacrifice only makes sense if it buys something`, b:`The rearguard mattered because it bought specific time for a specific purpose. Heroic effort on a lost cause with no clear payoff is just loss.`, try:`Before asking a team for a heroic push, name exactly what the extra hours buy.`}},
    {when:'Weeks and months after', title:'Lose the battle, win the war',
     a:[['gd',335,56,385,36]],
     move:`Persia marches south and burns Athens, which has been evacuated. The Greek fleet withdraws to Salamis and wins a decisive sea battle that autumn. The next year the Greeks win on land at Plataea and the invasion ends.`,
     why:`Thermopylae bought time and a story that hardened Greek resolve. The real strategic win came from the fleet the pass had protected.`,
     tv:`From the Persian side the campaign was going to plan: Athens taken and burned. The defeat at Salamis that autumn changed everything. Xerxes returned to Asia, leaving behind an army that lost at Plataea the next year.`,
     board:{h:`A loss can still serve the larger campaign`, b:`Judge a move by what it did for the overall goal. A lost pitch that sharpened your positioning, or a failed launch that bought a year of learning, can be part of a winning campaign if you meant it to be.`, try:`For your last loss, write down what it bought you. If the answer is nothing, change how you run the next one.`}}
  ]
});
