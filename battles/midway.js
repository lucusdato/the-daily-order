PG.add({
  id:'midway', name:'Midway', year:'1942', place:'Central Pacific Ocean',
  summary:`Codebreakers tell the US Navy where Japan will strike. In about six minutes, three Japanese carriers are burning.`,
  face:{g:-1,t:1},
  g:{tab:'US', short:'United States', name:'US Pacific Fleet', cmdr:'Admiral Chester Nimitz; Rear Admirals Frank Jack Fletcher and Raymond Spruance', str:'3 aircraft carriers, plus aircraft based on Midway', eyes:'Through American eyes'},
  t:{short:'Japan', name:'Imperial Japanese Navy', cmdr:'Admiral Isoroku Yamamoto; Vice Admiral Chuichi Nagumo (carrier force)', str:'4 fleet carriers in the strike force, with battleships and transports spread across the Pacific', eyes:'Through Japanese eyes'},
  objective:`Japan: take Midway and lure the remaining US carriers into a decisive battle to destroy them. United States: defend Midway and ambush the Japanese carriers without losing its own.`,
  prologue:{
    when:'December 1941 to May 1942', title:'Six months of Japanese victories',
    text:`After the attack on Pearl Harbor, Japan sweeps across Southeast Asia and the Pacific. But the American aircraft carriers were at sea on 7 December and survived. In April, US bombers launched from a carrier hit Tokyo in the Doolittle Raid, shocking Japan's leaders. In May the Battle of the Coral Sea stops a Japanese advance on New Guinea but damages the carrier Yorktown. Yamamoto plans to draw out and destroy what is left of the US fleet by attacking Midway.`,
    gWant:`To defend Midway without losing its last available carriers, and to catch the Japanese carriers before they caught the American ones.`,
    tWant:`To finish the job Pearl Harbor started: destroy the US carriers in a decisive battle and push America toward a negotiated peace.`,
    box:[196,160,60],
    theater(){
      let s=seaBg();
      s+=land('M10 120 Q40 90 70 70 Q82 86 62 110 Q40 140 20 172 Q8 160 10 120 Z')+land('M6 178 Q20 172 26 190 Q16 206 6 196 Z');
      [[120,34],[150,28],[180,24],[210,22],[240,22],[270,24],[300,28],[330,32],[360,38]].forEach(p=>s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="6" ry="2.6" fill="#8fa765" stroke="#e6d6a2" stroke-width="1"/>`);
      [[334,332,5],[348,340,4],[362,348,6],[380,356,8]].forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="#8fa765" stroke="#e6d6a2" stroke-width="1.2"/>`);
      s+=`<circle cx="226" cy="196" r="3" fill="#8fa765" stroke="#e6d6a2"/><circle cx="130" cy="270" r="2.5" fill="#8fa765" stroke="#e6d6a2"/>`;
      s+=land('M0 360 Q40 345 90 355 Q120 365 130 400 H0 Z');
      s+=city(226,196,'Midway',9,14)+city(362,348,'Pearl Harbor',8,-8)+city(130,270,'Wake',8,12);
      s+=label(46,60,'Japan',11)+label(240,12,'Aleutian Islands',9)+label(64,388,'Coral Sea, May 1942',8)+label(300,250,'Pacific Ocean',12);
      return s;
    },
    tokens:[
      {s:'t',t:'ship',n:2,name:'Japanese carrier strike force',why:'Four fleet carriers under Nagumo, heading for Midway from the northwest.',path:[[56,112],[130,150],[200,180]]},
      {s:'t',t:'ship',n:1,name:'Aleutians force',why:'A diversion far to the north, taking two light carriers away from the main battle.',path:[[50,92],[150,62],[230,40]]},
      {s:'t',t:'ship',n:1,name:'Yamamoto\'s battleships',why:'Following hundreds of miles behind the carriers.',path:[[40,130],[120,172]]},
      {s:'t',t:'ship',n:1,name:'Invasion transports',why:'Carrying troops to occupy Midway.',path:[[60,262],[150,240],[208,214]]},
      {s:'g',t:'ship',n:2,name:'Enterprise and Hornet',why:'Left Pearl Harbor to wait northeast of Midway.',path:[[350,330],[300,250],[256,170]]},
      {s:'g',t:'ship',n:1,name:'Yorktown',why:'Damaged at the Coral Sea, patched up at Pearl Harbor in about three days, then sent straight back out.',path:[[70,372],[200,378],[346,334],[264,150]]}
    ],
    a:[['td',56,112,130,150,198,182],['td',50,92,150,62,226,40],['td',60,262,150,240,206,214],['gd',350,330,300,250,258,176]]
  },
  terrain(){
    let s=seaBg();
    s+=`<ellipse cx="150" cy="294" rx="28" ry="20" fill="none" stroke="#cfe6f0" stroke-width="2" stroke-dasharray="3 2"/><ellipse cx="142" cy="298" rx="9" ry="4.5" fill="#d9c98f" stroke="#e6d6a2"/><ellipse cx="160" cy="292" rx="6" ry="3.4" fill="#d9c98f" stroke="#e6d6a2"/><path d="M155 292 L165 292" stroke="#7a6a50" stroke-width="1"/>`;
    [[220,100,34,12],[90,210,28,10],[300,220,30,10],[240,320,36,12],[60,100,24,9],[340,60,26,9]].forEach(e=>s+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#ffffff" opacity=".42"/><ellipse cx="${e[0]+8}" cy="${e[1]-4}" rx="${e[2]*.6}" ry="${e[3]*.7}" fill="#ffffff" opacity=".35"/>`);
    s+=label(150,326,'Midway Atoll',10)+label(364,118,'Point Luck',10)+label(80,12,'Aleutians: diversion force far north',8)+label(300,390,'Pearl Harbor is about 1,300 miles this way',8);
    s+=`<path d="M372 380 L392 394" stroke="#1f1a14" stroke-width="1.5" marker-end="url(#mk)" opacity=".7"/>`;
    s+=compass(380,24);
    return s+end();
  },
  features:[
    {x:150,y:294,r:30,px:118,py:300,name:'Midway Atoll',why:`A small airbase in the middle of the Pacific. Valuable as a forward base, and a fixed target that could not move or hide.`},
    {x:330,y:120,r:40,px:364,py:136,name:'Point Luck',why:`The US carriers' waiting position, off the flank of the Japanese approach and outside where Japan expected them.`},
    {x:220,y:100,r:36,px:220,py:100,name:'Scattered clouds',why:`Patchy cloud hid ships and aircraft, made searches unreliable, and let the dive bombers arrive unseen.`},
    {x:112,y:140,r:120,px:40,py:200,name:'Strike range',why:`Carrier aircraft could strike roughly 200 miles out. Inside that range, whoever found the other first could hit first.`},
    {x:22,y:64,r:22,px:40,py:56,name:'A dispersed fleet',why:`Yamamoto's battleships and transports were hundreds of miles from the carriers, too far to help when it mattered.`}
  ],
  units:[
    U('us_nimitz','g','cmd',1,'Admiral Nimitz (Pearl Harbor)',`Trusted his codebreakers and committed his only available carriers to the ambush.`,{0:[372,372]}),
    U('us_tf16','g','ship',2,'Task Force 16: Enterprise and Hornet',`Under Spruance, who launched his strike early, at long range, to hit the Japanese carriers before they could strike first.`,{0:[352,345],1:[332,150]}),
    U('us_tf17','g','ship',1,'Task Force 17: Yorktown',`Badly damaged at the Coral Sea, patched up at Pearl Harbor in about three days instead of the months normally needed.`,{0:[380,330],1:[326,92],6:[326,92,'ko']}),
    U('us_mid','g','art',2,'Midway garrison and airfield',`An unsinkable airbase, but a fixed one. Its planes attacked bravely and achieved little.`,{0:[150,286]}),
    U('us_midplanes','g','plane',2,'Midway-based bombers',`A mix of Army, Navy and Marine aircraft. Their attacks scored no hits, but they added to the pressure on Nagumo.`,{0:[166,300],2:[150,252],3:[124,162,'ko'],4:[124,162,'exit']}),
    U('us_tbd','g','plane',2,'Torpedo squadrons',`Slow, outdated torpedo bombers. Nearly all were shot down, but they dragged the Japanese fighters down to sea level.`,{0:[332,150,'off'],3:[292,150],4:[120,150,'ko'],5:[120,150,'exit']}),
    U('us_sbd','g','plane',3,'Dauntless dive bombers',`Dove almost straight down from high altitude. Enterprise's squadrons were led by Wade McClusky.`,{0:[332,150,'off'],3:[272,110],4:[192,70],5:[112,114],6:[158,82]}),
    U('jp_kido','t','ship',3,'Akagi, Kaga and Soryu',`Three of the four fleet carriers that had attacked Pearl Harbor. Their decks were crowded with fuelled, armed planes when the dive bombers arrived.`,{0:[40,40],2:[112,140],5:[112,140,'ko']}),
    U('jp_hiryu','t','ship',1,'Hiryu',`The fourth carrier, separated from the others. It survived the morning and struck back at Yorktown.`,{0:[62,30],2:[150,118],6:[156,96,'ko']}),
    U('jp_strike','t','plane',2,'Strike on Midway',`About 108 planes that hit Midway at dawn. Its leader radioed that a second strike was needed.`,{0:[112,140,'off'],2:[150,268],3:[118,150],4:[118,150,'exit']}),
    U('jp_cap','t','plane',2,'Zero fighters',`Superb fighters that shredded the torpedo attacks, but were pulled down low just as the dive bombers arrived high above.`,{0:[112,140,'off'],2:[98,126],4:[130,164]}),
    U('jp_reserve','t','plane',2,'Reserve strike planes',`Held back for the US fleet, switched from torpedoes to bombs for Midway, then back again, as reports changed.`,{0:[112,140,'off'],2:[128,130],5:[126,132,'ko'],6:[126,132,'exit']}),
    U('jp_tone','t','plane',1,'Scout plane from the cruiser Tone',`Launched about half an hour late. It found the US ships in its sector, but its reports came in slowly and incomplete.`,{0:[112,140,'off'],2:[232,140],3:[300,134],4:[300,134,'exit']}),
    U('jp_main','t','ship',2,'Yamamoto\'s main body',`Battleships, including the giant Yamato, sailing hundreds of miles behind the carriers. Too far away to help.`,{0:[22,64],7:[6,40,'exit']}),
    U('jp_inv','t','ship',2,'Invasion transports',`Carrying troops to occupy Midway once its defenses were smashed.`,{0:[30,352],7:[6,370,'exit']})
  ],
  phases:[
    {when:'May 1942', title:'Japan\'s plan',
     a:[['td',40,40,80,90,108,134],['td',30,352,90,330,136,304]],
     move:`Yamamoto's plan is huge and complicated: a diversion toward the Aleutian Islands far to the north, a carrier strike force to smash Midway's defenses, an invasion force to land troops, and a battleship force following hundreds of miles behind to finish off the US fleet when it comes out to fight.`,
     why:`Yamamoto expected the US carriers to be at Pearl Harbor and to rush out only after Midway was attacked, straight into a trap.`,
     tv:`Japan's navy had won every major engagement for six months. Its planners assumed the Americans were demoralized and did not know what was coming. Neither assumption was safe.`,
     ground:`The Pacific is vast. Finding the enemy is the first and hardest problem: whoever finds the other first can strike first.`,
     supply:`Japan's forces were spread across thousands of miles of ocean, which made them hard to coordinate and impossible to support each other quickly.`,
     board:{h:`Complexity is a cost`, b:`Yamamoto split his strength into many pieces to achieve many goals at once. Each piece was weaker, and the plan depended on the enemy behaving as expected. Simple plans survive surprises better.`, try:`Count the moving parts in your next big plan. Which could you cut without losing the main goal?`}},
    {when:'Late May 1942', title:'Breaking the code',
     a:[['g',352,340,320,250,332,156],['g',380,330,350,200,326,98]],
     call:{side:'g', who:'Nimitz', q:`Your codebreakers say the target is Midway. Some officers in Washington think it could be elsewhere. You have three carriers against four. What do you do?`, opts:[
       {t:`Keep the carriers safe at Pearl Harbor until you are certain`, ok:false, fb:`Safe for the carriers, but Midway would fall and Japan would keep the initiative. Certainty never comes in time.`, alt:{u:{jp_kido:[130,230]}, a:[['td',40,40,80,120,128,224]]}},
       {t:`Trust the intelligence and set an ambush northeast of Midway`, ok:true, fb:`This is what Nimitz did. It was a calculated risk with every carrier he had available.`},
       {t:`Split the carriers to guard both Midway and Hawaii`, ok:false, fb:`Splitting a smaller force makes each part weaker than the enemy. Nimitz concentrated instead.`, alt:{u:{us_tf17:[330,150]}, a:[['gd',380,330,350,240,332,156]]}}]},
     move:`US Navy codebreakers in Hawaii, led by Joseph Rochefort, have partly broken Japan's naval code. Intercepts point to a target called AF. To confirm it, Midway sends a fake message saying its water plant has broken down; soon Japan reports that AF is short of water. Nimitz sends all three of his carriers to wait northeast of Midway, at a spot called Point Luck.`,
     why:`Knowing where and roughly when the attack would come let Nimitz turn Yamamoto's trap around. The ambusher became the ambushed.`,
     tv:`Japanese planners believed their code was secure, and a planned change of codebooks came too late. They had no idea their plan had been read.`,
     ground:`Point Luck sat on the flank of the Japanese approach, outside where Japan expected the US fleet to be.`,
     board:{h:`Intelligence turns the weaker side into the stronger one`, b:`The US had fewer carriers but knew the plan. The side that understands the other side's intentions can choose where to fight. Invest in knowing, then act on what you know.`, try:`What does your organization actually know about its biggest competitor's next move? Who is responsible for finding out?`}},
    {when:'4 June, dawn', title:'Dawn strike on Midway',
     a:[['t',112,140,130,210,148,262],['g',166,296,140,210,124,152]],
     move:`Nagumo's four carriers launch about 108 planes against Midway. They damage the base but do not knock out its airfield. Midway's own aircraft are already in the air and attack the Japanese carriers, scoring no hits and losing many planes. The strike leader radios that a second attack on Midway is needed.`,
     why:`Nagumo was following the plan: neutralize Midway first, then deal with any American fleet if one appeared.`,
     tv:`From Nagumo's flagship, the morning looked routine: Midway hit, its counterattacks beaten off. There was still no sign of American carriers.`,
     board:{h:`Plans built on assumptions break when the assumption does`, b:`The Japanese plan assumed no US carriers nearby. Every decision that morning was made inside that assumption until it suddenly failed.`, try:`Write down the one assumption your current plan depends on most. What early signal would tell you it is wrong?`}},
    {when:'4 June, 7:15 to 8:30 a.m.', title:'Nagumo\'s dilemma',
     a:[['g',150,252,134,210,126,166],['t',232,140,270,134,298,132]],
     call:{side:'t', who:'Nagumo', q:`A scout reports American ships to the northeast, then that they include a carrier. Your reserve planes are half rearmed with bombs for Midway, and your Midway strike is returning low on fuel. What do you do?`, opts:[
       {t:`Recover the Midway strike, rearm properly, then launch one full, escorted attack`, hist:true, ok:false, fb:`This is what Nagumo did. It was sound doctrine, but it left his carriers full of fuel and bombs at the worst possible moment.`},
       {t:`Launch whatever is ready right now at the American carrier`, ok:true, fb:`Rear Admiral Yamaguchi's advice. A rushed, unescorted strike would have taken losses, but it might have hit the US carriers first and cleared Japanese decks.`, alt:{u:{jp_reserve:[290,142]}, a:[['t',128,130,210,118,286,142]]}},
       {t:`Turn away northwest and reassess`, ok:false, fb:`It buys time, but the Americans had already launched. Their planes would still find you, just later.`, alt:{u:{jp_kido:[72,92], jp_hiryu:[102,72]}, a:[['td',112,140,90,110,74,94]]}}]},
     move:`Nagumo orders his reserve planes rearmed from torpedoes to bombs for a second strike on Midway. Then a late-launched scout reports American ships to the northeast, and later that they include a carrier. Nagumo reverses the order and decides to land the returning Midway strike first, then launch one big, properly escorted attack. Hangar decks fill with fuel lines and bombs.`,
     why:`Nagumo wanted a single, coordinated strike with fighter escort, which is what doctrine taught. Spruance, meanwhile, had already launched his planes early and at long range.`,
     tv:`Each new report changed the picture: first no carriers, then ships, then a carrier. Nagumo had to decide with planes landing, fighters fighting and bombs being swapped, all at once.`,
     ground:`Scattered clouds and a huge search area made scouting unreliable. Information arrived late and incomplete.`,
     board:{h:`Waiting for the perfect move can cost the good one`, b:`Nagumo chose the textbook answer under time pressure. In a race where the first strike wins, an imperfect attack now beats a perfect one in an hour.`, try:`Is there a decision you are holding until it is perfect? What would a good-enough version look like today?`}},
    {when:'4 June, 9:20 to 10:20 a.m.', title:'The torpedo squadrons',
     a:[['g',292,150,200,162,124,152]],
     move:`American torpedo bombers from all three carriers find the Japanese first, attacking in separate waves without fighter cover. Zeros and anti-aircraft fire shoot down almost all of them; of Hornet's Torpedo Squadron 8, only one pilot survives. None of their torpedoes hits. But the Zeros are now low over the water, and the Japanese carriers have been twisting and turning for an hour.`,
     why:`The squadrons arrived piecemeal because they had lost each other in the clouds. Their sacrifice pulled the Japanese defense out of position.`,
     tv:`The Japanese defense looked brilliant: wave after wave of attackers destroyed without loss to the carriers. It felt like the battle was turning their way.`,
     board:{h:`Sacrifice that creates the opening`, b:`The torpedo squadrons hit nothing, yet they pulled the defense out of position for what came next. In a team, the effort that looks wasted is sometimes the effort that made the win possible. Credit it.`, try:`In your last big win, who did the unglamorous work that set it up? Make sure their part is known.`}},
    {when:'4 June, 10:22 a.m.', title:'Six minutes',
     a:[['g',192,70,140,80,116,112],['g',326,92,220,100,124,126]],
     call:{side:'g', who:'Wade McClusky', q:`You lead Enterprise's dive bombers. You have reached the spot where the Japanese carriers should be and found empty ocean. Fuel is getting low. What do you do?`, opts:[
       {t:`Turn back to Enterprise before you run out of fuel`, ok:false, fb:`The safe choice, and the battle might have been lost. The Japanese carriers would have launched their full strike.`, alt:{u:{us_sbd:[320,140]}, a:[['gd',192,70,260,100,318,138]]}},
       {t:`Fly a search pattern in a new direction`, ok:false, fb:`Reasonable, and McClusky did search, but a blind search over open ocean could easily miss.`},
       {t:`Follow a lone Japanese destroyer racing north at full speed`, ok:true, fb:`This is what McClusky did. The destroyer Arashi was hurrying back to rejoin the carriers, and it led him straight to them.`}]},
     move:`Dive bombers from Enterprise and Yorktown arrive over the Japanese carriers at almost the same moment, by luck rather than plan. With the Zeros down low, they dive nearly unopposed. Within about six minutes Akagi, Kaga and Soryu are hit, and the fuel and bombs on their decks turn them into infernos.`,
     why:`Two separate groups converged on the same spot at the right moment. The torpedo attacks had stripped away the fighter cover, and Nagumo's rearming had filled the decks with fuel and bombs.`,
     tv:`On the Japanese flight decks, crews were readying the counterstrike when lookouts spotted dive bombers almost directly overhead. There was no time to clear the decks.`,
     ground:`Clouds hid the dive bombers until they started their dives from high altitude.`,
     board:{h:`Luck favors the side that keeps searching`, b:`Midway turned on minutes and chance, but the chance was earned by persistence: squadrons that kept looking after finding empty ocean. Plans set you up; persistence lets you catch the luck.`, try:`When a search for a client, a hire or an answer comes up empty where you expected, what is your next place to look?`}},
    {when:'4 June, afternoon', title:'Hiryu strikes back',
     a:[['t',156,96,250,90,322,92],['g',176,82,166,90]],
     move:`The surviving carrier, Hiryu, launches two strikes that hit Yorktown, which is later abandoned and finally sunk by a submarine on 7 June. Late that afternoon, American dive bombers find Hiryu and set it ablaze. That night Spruance turns east rather than chase into the reach of Japanese battleships.`,
     why:`One surviving carrier could still hurt. The Americans kept searching until all four were found, then declined to risk their win.`,
     tv:`Rear Admiral Yamaguchi, aboard Hiryu, kept fighting with what he had. When the ship was lost, he chose to go down with it.`,
     board:{h:`Finish the job, but price the risk`, b:`Spruance destroyed the last carrier, then pulled back that night rather than sail into a battleship trap. Pressing an advantage and avoiding a trap are both part of finishing well.`, try:`When you are ahead, write down the one move that could give the advantage back. Avoid it.`}},
    {when:'June 1942 onward', title:'Aftermath',
     a:[['td',22,64,10,40]],
     move:`Japan loses four fleet carriers, a heavy cruiser, about 250 aircraft and over 3,000 men, including many skilled aircrew and mechanics who could not be replaced quickly. The US loses Yorktown, a destroyer, about 150 aircraft and around 300 men. Yamamoto calls off the operation.`,
     why:`Midway ended Japan's run of offensive victories in the Pacific. American industry would soon outbuild Japan many times over, and the initiative passed to the United States.`,
     tv:`The scale of the loss was hidden from the Japanese public and from much of the government and military. The navy lost not just ships but the experienced crews who made its carriers so effective.`,
     board:{h:`Small numbers, decided by systems`, b:`Midway was fought by a few hundred aircraft, but it was won by codebreaking, rapid ship repair, flexible command and persistent searching. Systems that work under pressure decide outcomes long before the dramatic moment.`, try:`Pick one system your team relies on in a crisis. Test it this month, before you need it.`}}
  ]
});
