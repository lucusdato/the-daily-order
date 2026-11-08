PG.add({
  id:'inchon', name:'Inchon', year:'1950', place:'Korean Peninsula',
  summary:`MacArthur lands an army far behind the enemy front, at a port his own planners called nearly impossible.`,
  face:{g:1,t:-1},
  g:{tab:'UN', short:'UN Command', name:'United Nations Command', cmdr:'General Douglas MacArthur', str:'X Corps: about 75,000 troops and 261 ships', eyes:'Through UN eyes'},
  t:{tab:'N. Korea', short:'North Korea', name:'North Korean People\'s Army', cmdr:'North Korean high command', str:'Most of its army committed at the Pusan front, with about 2,000 defenders at Inchon', eyes:'Through North Korean eyes'},
  objective:`UN: break the siege of the Pusan Perimeter by cutting North Korea's supply lines at Seoul. North Korea: finish off the defenders at Pusan before reinforcements arrive.`,
  prologue:{
    when:'June to August 1950', title:'The surprise attack',
    text:`On 25 June 1950, North Korea invades the South with Soviet-built tanks and a well-trained army. Seoul falls within days. The United Nations, led by the United States, sends forces to help, but the first units are thrown back again and again. By August the defenders are squeezed into a corner around Pusan, and MacArthur, commanding from Tokyo, is planning a counterstroke.`,
    gWant:`To break the siege at Pusan and destroy the North Korean army, not just push it back.`,
    tWant:`To take Pusan and finish the war before American and UN strength could build up.`,
    box:[178,178,30],
    theater(){
      let s=seaBg();
      s+=land('M0 0 H270 Q250 60 210 92 Q176 104 150 84 Q120 112 80 122 Q40 142 0 132 Z');
      s+=land('M0 132 Q40 142 80 162 Q100 202 80 262 Q60 332 0 362 Z');
      s+=land('M210 92 Q236 82 252 104 Q272 162 282 232 Q287 282 272 312 Q242 332 212 322 Q192 302 197 262 Q182 232 192 202 Q177 172 187 142 Q182 112 210 92 Z');
      s+=land('M330 330 Q350 316 362 330 Q356 352 336 352 Z');
      s+=land('M346 300 Q370 260 384 210 Q394 180 400 170 V250 Q392 280 372 300 Q358 316 346 300 Z');
      s+=`<path d="M190 176 H282" stroke="#1f1a14" stroke-width="1.5" stroke-dasharray="5 4" opacity=".6"/><path d="M160 96 Q190 96 214 94" stroke="#1f1a14" stroke-width="1.2" stroke-dasharray="2 3" opacity=".5"/>`;
      s+=city(192,192,'Inchon',8,4,'end')+city(204,188,'Seoul',8,-6,'start')+city(262,304,'Pusan',8,14)+city(208,140,'Pyongyang',8,-6)+city(358,330,'Japan',8,14);
      s+=label(110,230,'Yellow Sea',12)+label(110,60,'China',12)+label(246,170,'38th parallel',7)+label(186,104,'Yalu River',7);
      return s;
    },
    tokens:[
      {s:'t',t:'arm',n:2,name:'North Korean army',why:'Swept south from the 38th parallel in June, taking Seoul in three days.',path:[[208,150],[214,196],[236,250],[252,290]]},
      {s:'g',t:'inf',n:2,name:'UN and South Korean forces',why:'Pushed back into the Pusan Perimeter by August.',path:[[220,200],[250,270],[266,298]]},
      {s:'g',t:'ship',n:2,name:'X Corps invasion fleet',why:'Sailed from Japan and Pusan, then up the west coast toward Inchon.',path:[[340,330],[290,350],[190,330],[170,230],[186,196]]}
    ],
    a:[['td',208,150,220,210,250,288],['gd',338,334,240,370,172,320],['gd',168,310,160,250,182,198]]
  },
  terrain(){
    let s=seaBg();
    s+=land('M118 0 Q104 40 114 70 Q126 96 118 120 Q108 150 122 176 Q132 200 114 230 Q100 262 124 296 Q140 330 176 360 Q215 388 262 386 Q306 382 330 360 Q350 330 344 280 Q338 230 332 190 Q328 150 344 110 Q358 60 356 0 Z','#8aa461');
    [[320,118,14],[290,150,11],[322,162,16],[296,202,14],[318,242,15],[272,334,11]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#e7e1cf'));
    s+=`<path d="M116 85 H350" stroke="#1f1a14" stroke-width="1.6" stroke-dasharray="6 4" opacity=".55"/>`;
    s+=road('M176 0 L176 124 Q182 150 188 172 Q202 206 220 240 Q240 274 262 304');
    s+=`<ellipse cx="102" cy="148" rx="20" ry="28" fill="#9b8257"/><ellipse cx="102" cy="148" rx="20" ry="28" fill="url(#speck)"/>`;
    s+=`<ellipse class="ph" data-show="2 3" cx="102" cy="148" rx="21" ry="29" fill="#5d9bc0" fill-opacity=".92"/>`;
    s+=`<circle cx="98" cy="152" r="6" fill="#8aa461" stroke="#e6d6a2" stroke-width="1.5"/>`;
    s+=house(122,144)+house(130,150,'#8a3a2a')+house(172,124)+house(182,126,'#8a3a2a')+house(176,116)+house(188,118)+house(116,252)+house(318,368)+house(328,372,'#8a3a2a');
    s+=`<path d="M240 384 Q246 340 262 304 Q300 292 342 300" fill="none" stroke="#1f1a14" stroke-width="2" stroke-dasharray="5 3" opacity=".7"/>`;
    s+=label(232,80,'38th parallel',10)+label(48,206,'Yellow Sea',14)+label(386,236,'East Sea',10,90)+label(204,110,'Seoul',10)+label(150,164,'Inchon',9)+label(70,190,'Mudflats',9)+label(70,128,'Wolmido',9)+label(146,260,'Kunsan',9)+label(252,228,'Main road and rail',9,56)+label(312,350,'Pusan Perimeter',10)+label(348,390,'Pusan',9);
    s+=compass(380,24);
    return s+end();
  },
  features:[
    {x:102,y:148,r:32,px:76,py:160,name:'Mudflats and tides',why:`Huge tides exposed kilometres of mud twice a day. Landing craft could reach the shore only for a few hours, on a few days each month.`},
    {x:60,y:176,px:40,py:190,d:'M10 230 Q50 196 92 154',line:true,name:'The approach channel',why:`A narrow, winding channel was the only way in. A single sunk ship could have trapped the fleet.`},
    {x:178,y:122,r:24,name:'Seoul',why:`The capital, and the hub of the roads and railways feeding the North Korean army in the south.`},
    {x:222,y:244,px:236,py:236,d:'M176 0 L176 124 Q182 150 188 172 Q202 206 220 240 Q240 274 262 304',line:true,name:'The main road and rail',why:`The single corridor carrying supplies hundreds of kilometres south to the front.`},
    {x:300,y:300,px:300,py:316,d:'M240 384 Q246 340 262 304 Q300 292 342 300',line:true,name:'The Pusan Perimeter',why:`A defended pocket around Pusan, held along the Naktong River. The anvil for the counterattack.`}
  ],
  units:[
    U('un_mac','g','cmd',1,'General MacArthur',`Commanded from the ship USS Mount McKinley, offshore.`,{0:[26,302],1:[40,206],3:[60,150]}),
    U('un_fleet','g','ship',3,'Invasion fleet',`261 ships from several nations. Control of the sea let the UN choose where to strike.`,{0:[44,332],1:[62,226],2:[78,156],5:[56,170]}),
    U('un_marines','g','inf',3,'1st Marine Division',`Amphibious specialists, trained to land on defended shores.`,{0:[70,356],1:[84,250],2:[102,140],3:[136,138],4:[158,124]}),
    U('un_army','g','inf',2,'7th Infantry Division',`Followed the Marines ashore and blocked the road south of Seoul.`,{0:[40,368],1:[56,262],3:[78,182],4:[184,170]}),
    U('un_8th','g','inf',3,'Eighth Army',`The anvil: broke out of the Pusan Perimeter the day after the landing.`,{0:[302,338],4:[258,276],5:[206,186]}),
    U('k_front1','t','inf',3,'North Korean divisions (west)',`Committed against Pusan, hundreds of kilometres from their supply base.`,{0:[262,318],4:[232,246],5:[224,60,'exit']}),
    U('k_front2','t','inf',3,'North Korean divisions (east)',`Almost the whole army was pressed against the perimeter.`,{0:[298,306],4:[288,276,'ko']}),
    U('k_tanks','t','arm',2,'T-34 tanks',`Soviet-built armor that had spearheaded the invasion of the South.`,{0:[238,336],4:[246,304,'ko']}),
    U('k_inchon','t','inf',1,'Inchon garrison',`A small force. North Korea did not expect a landing here.`,{0:[128,146],3:[130,150,'ko']}),
    U('k_wolmido','t','art',1,'Wolmido defenders',`Guns on the island guarding the harbor entrance.`,{0:[98,150],2:[98,152,'ko']}),
    U('k_seoul','t','inf',2,'Seoul garrison',`Defended the capital and its road and rail hub.`,{0:[178,112],4:[188,110,'ko']}),
    U('k_supply','t','truck',2,'Supply columns',`Trucks and trains carrying everything the southern front needed.`,{0:[204,220],4:[208,206,'ko']})
  ],
  phases:[
    {when:'August 1950', title:'Pinned in the corner',
     a:[['td',180,130,200,200,214,226],['td',220,240,240,280,256,304]],
     move:`North Korea's invasion has pushed UN and South Korean forces into a small pocket around the port of Pusan. The North Korean army presses hard on the perimeter, with almost all of its strength committed to the attack.`,
     why:`North Korea's strategy was to win before American strength arrived. That meant putting everything into the front.`,
     tv:`North Korean commanders believed one more push would take Pusan. Pulling troops away from the front looked like throwing away a victory that was days off.`,
     ground:`The Naktong River gave the defenders a line to hold, and mountains channelled the attackers onto a few roads.`,
     supply:`Every shell and ration for the North Korean front travelled hundreds of kilometres down one main road and rail corridor running through Seoul. That artery was their great weakness.`,
     board:{h:`Find the artery behind the front`, b:`A rival's strength is visible at the front: their media weight, their sales force, their big launch. Their weakness usually sits behind it, in a single supplier, platform, distributor or relationship that everything depends on.`, try:`Sketch your biggest competitor's supply chain. Circle the one point everything runs through.`}},
    {when:'Late August 1950', title:'Choose the landing',
     a:[['g',48,326,46,270,60,232]],
     call:{side:'g', who:'MacArthur', q:`You have a reserve corps and control of the sea. Where do you land it?`, opts:[
       {t:`Reinforce Pusan directly`, ok:false, fb:`Safe and predictable. It makes the front stronger but leaves the enemy's supply line untouched, so the grind continues.`, alt:{u:{un_fleet:[322,372], un_marines:[300,350], un_army:[288,362]}, a:[['g',44,332,180,396,300,364]]}},
       {t:`Land at Kunsan, a short way behind the front`, ok:false, fb:`Many senior commanders preferred this. Easier to land, but it threatens only the front line, not the artery at Seoul.`, alt:{u:{un_fleet:[90,262], un_marines:[118,256]}, a:[['g',48,326,80,290,112,258]]}},
       {t:`Land at Inchon, next to Seoul, far behind the front`, ok:true, fb:`This is MacArthur's choice. The difficulties were so extreme that the enemy had not seriously defended it, and Seoul was the hub of their whole supply system.`}]},
     move:`MacArthur argues for a landing at Inchon, about 160 km behind the front and the port for Seoul. Navy and Army leaders object: extreme tides, narrow channels, mudflats and sea walls. He wins the argument and the fleet sets sail.`,
     why:`MacArthur's case was that the obstacles were exactly why the enemy would not expect a landing there, and that Seoul was the one place where a landing would cut off the whole enemy army.`,
     tv:`From Pyongyang, the UN looked close to beaten. The army's attention was fixed on the Pusan front, where the war seemed about to be decided.`,
     board:{h:`The improbable route is the surprise, if you engineer it`, b:`Bold moves work when the team lists every reason they should fail and solves each one. MacArthur's staff did not ignore the tides. They planned the entire operation around them.`, try:`For your boldest idea, list the ten reasons it is impossible. Solve each one on paper before you pitch it.`}},
    {when:'15 September, 6:30 a.m.', title:'Morning tide: Wolmido',
     a:[['g',80,160,94,148]],
     call:{side:'t', who:'the North Korean high command', q:`There are warnings that the UN could land somewhere behind your lines. Your army is fully committed at Pusan, and victory feels close. What do you do?`, opts:[
       {t:`Keep everything at Pusan and finish the war fast`, hist:true, ok:false, fb:`This is what happened. Almost nothing stood between the landing and Seoul.`},
       {t:`Pull several divisions back to guard Seoul and the west coast`, ok:true, fb:`It would have weakened the push on Pusan, but a defended Seoul could have turned the landing into a long, costly fight.`, alt:{u:{k_front1:[190,150], k_tanks:[176,166]}, a:[['t',262,318,240,230,192,156],['t',238,336,210,250,178,170]]}}]},
     move:`On the morning high tide, a single Marine battalion seizes Wolmido island, which guards Inchon harbor. Then the tide runs out, leaving the fleet waiting about twelve hours beside kilometres of exposed mud.`,
     why:`Wolmido had to fall first, or its guns would wreck the main landing. Taking it gave up surprise for the rest of the day, a risk the planners accepted.`,
     tv:`Inchon looked like the least likely place for a major landing. The island garrison fought, but it was small and isolated.`,
     ground:`Inchon's tides rise and fall by roughly 9 to 10 metres, among the largest in the world. Only a few days each month had water deep enough for landing craft: 15 September, 11 October and 3 November.`,
     board:{h:`Hard windows set the calendar`, b:`The tides chose the date, not the generals. Business has its own tides: fiscal years, retail resets, upfronts, tentpole moments. Plan backward from the window you cannot move.`, try:`Name the immovable window for your next big launch, then work backward to today.`}},
    {when:'15 September, 5:30 p.m.', title:'Evening tide: over the sea walls',
     a:[['g',108,140,130,138]],
     move:`As the evening tide returns, Marines land at Red Beach and Blue Beach, climbing the sea walls with ladders. The small garrison is overwhelmed. Losses are light for an operation this size.`,
     why:`Everything had to happen in a short window before dark and the next low tide. The plan was built around the clock.`,
     tv:`With so few troops nearby, the defenders could slow the landing but not stop it. Reinforcements had to come from far away.`,
     ground:`Red Beach was not a beach at all but a stone sea wall in the middle of the city. Landing craft had to arrive at exactly the right water level.`,
     board:{h:`Sequence the enabling move, then commit fully`, b:`Inchon worked because the small move, Wolmido, came first and the main move came as one full commitment. Teams often launch halfway and lose both surprise and momentum.`, try:`Split your next initiative into the enabling step and the main push. Then commit fully to the main push.`}},
    {when:'16 to 28 September', title:'Cut the artery',
     a:[['g',140,134,156,124],['g',88,180,140,182,178,172],['g',300,330,280,300,262,282]],
     move:`The Marines take Kimpo airfield and fight their way into Seoul. The 7th Infantry Division lands and swings south to block the road. On 16 September the Eighth Army begins breaking out of Pusan. With supplies cut and enemies on both sides, the North Korean army collapses.`,
     why:`The landing was the hammer and the breakout from Pusan was the anvil. Either alone would have been far weaker.`,
     tv:`Cut off from supplies and attacked from front and rear, units at Pusan broke up. Many soldiers made their way north through the mountains in small groups.`,
     supply:`Once Seoul fell, almost nothing could reach the North Korean divisions in the south. An army without food, fuel or ammunition stops being an army.`,
     board:{h:`Hammer and anvil`, b:`Two coordinated moves beat one big one. The landing was decisive only because the breakout pinned the enemy in place at the same moment. Pair a bold move with steady pressure on the existing front.`, try:`For your next big move, decide what the anvil is: what keeps the competitor pinned while you strike?`}},
    {when:'October 1950 onward', title:'The culminating point',
     a:[['td',236,240,250,150,226,66],['gd',206,180,200,120,214,70]],
     call:{side:'g', who:'the UN command', q:`The North Korean army is shattered and fleeing north. How far do you go?`, opts:[
       {t:`Stop at the 38th parallel and restore the old border`, ok:false, fb:`This was the original UN aim. It would likely have avoided war with China, but left the North Korean regime free to rebuild.`, alt:{u:{un_8th:[200,96], un_marines:[160,96], un_army:[222,98]}, a:[['g',206,186,202,102]]}},
       {t:`Advance only to the narrow neck of the peninsula, well short of China`, ok:true, fb:`Some advisers favored a line like this: shorter, easier to hold and less threatening to Beijing. There is no certainty China would have stayed out, but the risk would have been lower.`, alt:{u:{un_8th:[220,30], un_marines:[180,30]}, a:[['g',206,186,222,36]]}},
       {t:`Drive all the way to the Chinese border`, hist:true, ok:false, fb:`This is what happened. The advance stretched UN forces thin just as China entered the war.`}]},
     move:`Only a fraction of the North Korean army escapes north. UN forces cross the 38th parallel and race toward the Chinese border, dismissing warnings that China will intervene. In late 1950 Chinese armies strike and drive them back south. The war grinds on until 1953.`,
     why:`Inchon made MacArthur look infallible. That confidence pushed him past the point his forces, supply lines and intelligence could support.`,
     tv:`North Korea's army was nearly destroyed, and the regime survived only because China intervened.`,
     supply:`The further north UN forces advanced, the longer and thinner their own supply lines became: the same weakness they had just exploited.`,
     board:{h:`Know your culminating point`, b:`Every advance reaches a point where resources, attention and goodwill are stretched as far as they go. Push past it and momentum reverses. The same leader who sees the bold opening can miss the moment to stop.`, try:`For your current growth push, decide in advance what signal will tell you that you have reached the limit.`}}
  ]
});
