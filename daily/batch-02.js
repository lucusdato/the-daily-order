/* Daily battles 11 to 20 */

/* ===== 11. SEKIGAHARA ===== */
PGD.add({
  n:11, id:'sekigahara', name:'Sekigahara', year:'1600', place:'Central Japan', side:'g', you:'Tokugawa Ieyasu', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Eastern Army', tab:'East', name:'Eastern Army', cmdr:'Tokugawa Ieyasu', str:'Perhaps 75,000 to 90,000', eyes:'Through Eastern Army eyes'},
  t:{short:'Western Army', tab:'West', name:'Western Army', cmdr:'Ishida Mitsunari', str:'Perhaps 80,000 or more, though several commanders were wavering', eyes:'Through Western Army eyes'},
  brief:{
    hook:`Several enemy commanders have secretly promised to switch sides. Promises are not troops.`,
    situation:`October 1600. Japan's ruler Toyotomi Hideyoshi has died, leaving a young heir. The great lords have split into two coalitions. Ishida Mitsunari leads the Western Army; you lead the Eastern. The armies meet in a narrow valley at Sekigahara, in fog and rain.`,
    forces:`Experienced samurai armies under loyal and allied lords, with large numbers of arquebus gunners.`,
    enemy:`The Western Army holds strong positions on hills around the valley, nearly surrounding the ground where your army must deploy. On paper it is at least as strong as yours.`,
    ground:`A valley crossroads ringed by hills. The Western lords hold most of the high ground, including Mount Matsuo to the south, held by Kobayakawa Hideaki, and Mount Nangu behind you, held by the Mori clan.`,
    supply:`Both coalitions are fragile. A long campaign risks more lords changing sides in either direction.`,
    intel:`Kobayakawa Hideaki has secretly agreed to join you. Kikkawa Hiroie, controlling the Mori army's position, has promised it will not fight. Neither has done anything yet.`,
    objective:`Destroy Ishida's coalition in a single battle.`,
    notes:[`On the map you look surrounded. In reality, much of the ring may not fight.`,`Waverers back whoever looks like winning.`,`If the defections do not happen, you are in a very bad position.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=hill(90,92,40,26,3)+hill(110,190,30,22,2)+hill(170,350,50,36,4)+hill(340,250,50,40,4)+hill(300,168,24,16,2);
    s+=trees(61,24,[130,220,320,395],()=>true,['#2f5a24','#3b6b2b'])+trees(62,20,[300,385,215,295],()=>true,['#2f5a24','#3b6b2b']);
    s+=road('M0 200 L400 190')+road('M200 0 L200 400');
    s+=label(90,58,'Sasao hill (Ishida)',9)+label(170,304,'Mt. Matsuo (Kobayakawa)',9)+label(340,204,'Mt. Nangu (Mori)',9)+label(300,146,'Ieyasu\'s hill',9)+label(200,392,'Crossroads valley',9);
    s+=compass(380,24);
    return s+end();
  },
  over(){ return `<g class="ph" data-show="0"><g filter="url(#blur)" opacity=".7"><ellipse cx="200" cy="200" rx="160" ry="60" fill="#f4f6f4"/></g></g>`; },
  features:[
    {x:170,y:350,r:44,name:'Mount Matsuo',why:`Kobayakawa's army sat here, above the Western flank. Its choice decided the battle.`},
    {x:340,y:250,r:46,name:'Mount Nangu',why:`The Mori army behind the Eastern Army. If it attacked, Ieyasu would be surrounded. It never moved.`},
    {x:200,y:196,r:44,name:'The valley floor',why:`Where the Eastern Army had to fight, overlooked by Western positions on three sides.`}
  ],
  units:[
    U('e_fuku','g','inf',3,'Fukushima Masanori',`Led the attack on Ukita's large force in the center.`,{0:[230,200],1:[160,200],2:[140,210]}),
    U('e_kuroda','g','inf',3,'Kuroda and Hosokawa',`Attacked Ishida's position on the Western right.`,{0:[230,130],1:[140,110],2:[110,100]}),
    U('e_ii','g','cav',2,'Ii Naomasa\'s red cavalry',`Opened the battle by pushing to the front.`,{0:[260,170],1:[170,170],2:[150,160]}),
    U('e_todo','g','inf',2,'Todo Takatora',`Faced Otani Yoshitsugu on the Western left.`,{0:[230,260],1:[170,270],2:[150,280]}),
    U('e_guns','g','inf',2,'Arquebusiers',`Gunners attached to the Eastern divisions.`,{0:[270,230],1:[220,280],2:[200,300]}),
    U('e_ieyasu','g','cmd',1,'Tokugawa Ieyasu',`Moved his headquarters forward during the battle to show confidence.`,{0:[300,160],1:[260,190],2:[220,200]}),
    U('w_ishida','t','inf',3,'Ishida Mitsunari\'s troops',`Defended the hill at the Western right.`,{0:[90,90],2:[80,80,'ko']}),
    U('w_ukita','t','inf',3,'Ukita Hideie',`The largest Western force in the battle, holding the center.`,{0:[110,190],2:[100,190,'ko']}),
    U('w_otani','t','inf',2,'Otani Yoshitsugu',`Held the left, just below Kobayakawa. Hit from the side when Kobayakawa turned.`,{0:[130,280],2:[120,280,'ko']}),
    U('w_koba','t','inf',3,'Kobayakawa Hideaki',`Placed on Mount Matsuo by the Western Army. Secretly committed to the East.`,{0:[170,340],2:[136,292]}),
    U('w_mori','t','inf',3,'The Mori army',`On Mount Nangu, behind the Eastern Army. Kept out of the fight by Kikkawa's secret promise.`,{0:[340,250]}),
    U('w_cmd','t','cmd',1,'Ishida Mitsunari',`An able administrator, distrusted by many of the lords in his own coalition.`,{0:[60,110],2:[20,60,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['g',230,200,166,198],['g',230,130,146,112],['g',260,170,176,170],['g',230,260,176,270]]},
    {a:[['td',170,340,150,310,138,294],['g',160,200,108,192],['g',140,110,92,94]]}
  ],
  decisions:[
    {when:'Morning, 21 October', title:'Act before the waverers move?',
     ctx:`The fog is lifting. Your army stands in the valley, ringed by Western positions. Kobayakawa and the Mori have promised not to fight for Ishida, but neither has moved.`,
     q:`What do you do?`,
     opts:[
       {t:`Wait for the defectors to move first`, s:1, fb:`Waverers wait to see who is winning. If you wait for them, they wait for you, and Ishida gains time to rally them.`},
       {t:`Attack the Western center at once, so the waverers see you are confident and winning`, s:3, fb:`Pressure on Ishida's main force shows you mean to win. Fence-sitters judge by momentum.`},
       {t:`Pull back east and avoid battle until the defections are certain`, s:0, fb:`Retreat looks like weakness and may push the waverers back toward Ishida.`, alt:{u:{e_fuku:[330,190], e_kuroda:[330,130], e_ii:[350,170]}, a:[['gd',230,200,326,192]]}}],
     result:`The Eastern Army attacks. Fierce fighting breaks out against Ukita in the center and Ishida on the right. The Western front holds well through the morning. Ieyasu moves his headquarters closer to the fighting.`,
     why:`Committing to the attack made the outcome look decided in Ieyasu's favor, which is what the waverers needed to see.`,
     tv:`Ishida lit the signal for Kobayakawa and the Mori to join the attack. They did not move. His coalition was stronger on paper than in reality.`},
    {when:'Around midday', title:'Kobayakawa has not moved',
     ctx:`The fight in the valley is even, and Western troops are holding. Kobayakawa's large army is still sitting on Mount Matsuo, watching.`,
     q:`How do you deal with Kobayakawa?`,
     opts:[
       {t:`Send troops up Mount Matsuo to attack him`, s:0, fb:`Attacking him would push him firmly into Ishida's camp, and weaken your own line.`, alt:{u:{e_todo:[170,320]}, a:[['g',170,270,170,316]]}},
       {t:`Make it unmistakable that you expect him to act now`, s:3, fb:`Forcing the choice ends the wait. The traditional story says Ieyasu had guns fired toward Kobayakawa's hill. Some modern historians doubt it and think Kobayakawa turned earlier, but the principle of forcing a waverer to commit holds.`},
       {t:`Keep waiting; he will come over eventually`, s:1, fb:`Every hour of stalemate gives Ishida a chance to win the waverers back.`}],
     result:`Kobayakawa's army comes down the mountain and attacks Otani Yoshitsugu's flank. Several other Western commanders switch sides too. The Western Army collapses, and Ishida flees. The Mori army behind the Eastern lines never fights.`}
  ],
  debrief:{
    title:'The battle was won before it started',
    outcome:`The Western Army is destroyed and Ishida is captured and executed days later. In 1603 Ieyasu becomes shogun, and the Tokugawa family rules Japan for about 250 years.`,
    why:`Ieyasu's real victory came from months of letters and negotiations that turned key enemy commanders. On the day, he acted with enough confidence to make those promises come true.`,
    them:`Ishida's coalition looked strong on a map, but many of its lords disliked him and were hedging their bets. A plan that relies on allies who are not committed is fragile.`,
    board:{h:`Win the alliances before the fight`, b:`Many deals, launches and reorganizations are decided by who the key stakeholders back before the meeting. Ieyasu did that work early, then showed momentum so people who had promised support felt safe delivering it.`, try:`Before your next big decision meeting, list the people whose support decides it. Talk to each one before the meeting.`},
    principles:['intel','timing','own']
  }
});

/* ===== 12. VICKSBURG ===== */
PGD.add({
  n:12, id:'vicksburg', name:'Vicksburg', year:'1863', place:'Mississippi, United States', side:'g', you:'Ulysses S. Grant', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Union', name:'Union Army of the Tennessee', cmdr:'Major General Ulysses S. Grant, with Admiral David Porter\'s river fleet', str:'About 45,000 at the start of the campaign, growing later', eyes:'Through Union eyes'},
  t:{short:'Confederacy', name:'Confederate forces in Mississippi', cmdr:'Lieutenant General John Pemberton, with General Joseph E. Johnston nearby', str:'About 30,000 in and around Vicksburg, with more gathering at Jackson', eyes:'Through Confederate eyes'},
  brief:{
    hook:`Every obvious way to reach the fortress city has failed. You need a completely different approach.`,
    situation:`Spring 1863. Vicksburg, on high bluffs above the Mississippi River, is the last major Confederate stronghold on the river. While it holds, the Confederacy stays connected and the Union cannot use the river freely. Through the winter, attempts to reach the city through swamps, bayous and canals north of it have all failed.`,
    forces:`A tough, experienced army on the west bank of the river, and a powerful fleet of gunboats and transports upstream of the city.`,
    enemy:`Pemberton's army in and around Vicksburg, with heavy batteries on the bluffs commanding the river. General Johnston is gathering another force at Jackson, the state capital, to the east.`,
    ground:`North of Vicksburg is swamp and bayou. The bluffs make a direct assault from the river suicidal. South of the city, the east bank has dry ground.`,
    supply:`Your army depends on supplies coming down the river. Any move south of the city means going past the river batteries or far from your supply line.`,
    intel:`The Confederate commanders are receiving conflicting orders: hold Vicksburg at all costs, or unite their forces in the field.`,
    objective:`Capture Vicksburg and open the Mississippi.`,
    notes:[`The batteries are deadly in daylight; at night, moving ships are harder to hit.`,`If the two Confederate forces unite, they could outnumber you.`,`Being between two enemy forces is dangerous, or an opportunity.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=river('M90 0 Q60 60 110 110 Q150 150 100 200 Q60 250 110 300 Q140 340 110 400',22);
    s+=river('M190 0 Q200 120 180 220 Q170 300 190 400',5);
    s+=trees(71,30,[0,90,0,400],()=>true,['#3b6b2b','#4b7a35'])+trees(72,16,[90,190,0,90],()=>true,['#4b7a35']);
    s+=house(124,140)+house(132,146,'#8a3a2a')+house(126,132)+house(332,180)+house(340,186,'#8a3a2a')+house(124,330);
    s+=label(140,120,'Vicksburg',10)+label(340,166,'Jackson',10)+label(230,196,'Champion Hill',9)+label(206,60,'Big Black River',8,-86)+label(40,90,'Swamps and bayous',8,-86)+label(150,330,'Bruinsburg',9)+label(40,370,'Louisiana',9);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:128,y:140,r:24,name:'Vicksburg bluffs',why:`High bluffs with heavy guns commanding the river. Impossible to storm from the water.`},
    {x:40,y:120,r:44,name:'Swamps north of the city',why:`Where months of attempts to reach the city failed.`},
    {x:130,y:330,r:24,name:'The crossing at Bruinsburg',why:`Dry ground on the east bank, south of the city, where the army crossed.`},
    {x:336,y:182,r:24,name:'Jackson',why:`The state capital and railway hub, where Johnston was gathering a second army.`}
  ],
  units:[
    U('un_mcp','g','inf',3,'McPherson\'s corps',`Swung east to Jackson, then back west toward Vicksburg.`,{0:[50,170],1:[150,320],2:[230,180]}),
    U('un_mccl','g','inf',3,'McClernand\'s corps',`Led the march down the west bank and the crossing.`,{0:[50,220],1:[130,340],2:[210,210]}),
    U('un_sher','g','inf',3,'Sherman\'s corps',`Staged a feint north of the city, then followed the army south.`,{0:[50,110],1:[120,70],2:[300,190]}),
    U('un_boats','g','ship',2,'Porter\'s gunboats and transports',`Ran past the Vicksburg batteries at night to ferry the army across.`,{0:[80,40],1:[106,300],2:[106,300]}),
    U('un_grier','g','cav',2,'Grierson\'s cavalry raid',`A raid through the length of Mississippi that drew Confederate attention away.`,{0:[380,10,'off'],1:[330,330],2:[380,396,'exit']}),
    U('un_grant','g','cmd',1,'Grant',`Willing to take large risks after months of failures.`,{0:[30,190],1:[150,350],2:[240,210]}),
    U('cs_batt','t','art',2,'Vicksburg river batteries',`Heavy guns on the bluffs.`,{0:[112,128]}),
    U('cs_pemb','t','inf',3,'Pemberton\'s army',`Defended Vicksburg, then moved out and was beaten at Champion Hill.`,{0:[150,150],1:[160,200],2:[140,156]}),
    U('cs_gulf','t','art',1,'Grand Gulf batteries',`Guns guarding the river south of the city.`,{0:[100,270],1:[100,270,'ko']}),
    U('cs_john','t','inf',2,'Johnston\'s force at Jackson',`Gathering reinforcements to the east.`,{0:[340,200],2:[380,120,'exit']}),
    U('cs_pcmd','t','cmd',1,'John Pemberton',`Caught between orders to hold the city and advice to unite in the field.`,{0:[170,140],2:[150,140]})
  ],
  states:[
    {a:[]},
    {a:[['g',80,40,140,180,104,292],['g',50,220,80,300,126,334],['gd',50,110,120,72],['g',380,20,360,200,332,324]]},
    {a:[['g',150,320,280,300,328,196],['g',300,190,260,190,214,184],['td',160,200,150,160]]}
  ],
  decisions:[
    {when:'April 1863', title:'Find a way at the city',
     ctx:`Months of digging canals and pushing through bayous north of Vicksburg have failed. Newspapers and politicians are losing patience.`,
     q:`What do you do?`,
     opts:[
       {t:`Keep trying to reach the city from the north through the swamps`, s:0, fb:`The same approach that has failed all winter, with the spring floods making it worse.`},
       {t:`Take the army back to Memphis and start over overland`, s:1, fb:`Sound on paper, but it would look like a retreat, and political support for the war in the North was shaky.`},
       {t:`March down the west bank, run the gunboats past the batteries at night, and cross south of the city`, s:3, fb:`It is risky, but it puts your army on dry ground east of the river, where it can maneuver.`}],
     result:`On a moonless night Porter's fleet runs past the Vicksburg batteries with only light losses. The army marches down the west bank and crosses at Bruinsburg. Meanwhile Sherman feints north of the city, and Grierson's cavalry raid through Mississippi pulls Confederate attention away.`,
     why:`When every obvious route failed, Grant changed the whole approach and used deception to cover the riskiest step.`,
     tv:`Confederate commanders were watching the north and chasing Grierson's raiders. The river batteries could not stop a fleet moving fast in the dark.`},
    {when:'May 1863', title:'Between two armies',
     ctx:`You are across the river with limited supplies. Pemberton's army is near Vicksburg to the west; Johnston is gathering another at Jackson to the east. If they unite, they could outnumber you.`,
     q:`What do you do?`,
     opts:[
       {t:`Build a secure supply line back to the river before advancing`, s:1, fb:`Safe and slow. Every week gives the two Confederate forces time to unite.`},
       {t:`Live off the land, strike east at Jackson first, then turn west on Vicksburg`, s:3, fb:`Moving fast between two enemy forces lets you beat each one separately before they combine.`},
       {t:`March straight north on Vicksburg`, s:1, fb:`Johnston's force would be free to hit your rear as you attack the city's defenses.`, alt:{u:{un_mcp:[150,180], cs_john:[230,240]}, a:[['t',340,200,260,240,236,240]]}}],
     result:`Grant's army moves fast, drawing much of its food from the countryside. It takes Jackson on 14 May, scattering Johnston's force, then turns west and defeats Pemberton at Champion Hill on 16 May. Pemberton retreats into the Vicksburg defenses, and the siege begins.`}
  ],
  debrief:{
    title:'Change the whole approach',
    outcome:`After a siege of about seven weeks, Pemberton surrenders Vicksburg and roughly 30,000 men on 4 July 1863, the day after Gettysburg. The Union controls the Mississippi and the Confederacy is split in two.`,
    why:`Grant accepted big risks: running the batteries, crossing far from his base and moving fast between two enemy forces. Deception covered the most dangerous moments.`,
    them:`Pemberton was ordered by Richmond to hold Vicksburg, while Johnston urged him to bring his army out and unite. Caught between orders, he did neither well.`,
    board:{h:`When the obvious routes fail, change the whole approach`, b:`Grant spent months trying variations of the same idea before switching strategy entirely. Teams often keep refining a failing approach because it is familiar. Sometimes the move is to step back and attack the problem from a completely different side.`, try:`For a problem you have tried to fix three times, write down three approaches that share nothing with what you have tried.`},
    principles:['interior','logistics','deceive']
  }
});

/* ===== 13. MARATHON ===== */
PGD.add({
  n:13, id:'marathon', name:'Marathon', year:'490 BC', place:'Attica, Greece', side:'g', you:'Miltiades', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Athenians', name:'Athenians and Plataeans', cmdr:'Miltiades, one of ten Athenian generals, with the polemarch Callimachus', str:'About 10,000 Athenians and 1,000 Plataeans', eyes:'Through Athenian eyes'},
  t:{short:'Persians', name:'Persian expedition', cmdr:'Datis and Artaphernes', str:'Probably 20,000 or more, with cavalry and a fleet', eyes:'Through Persian eyes'},
  brief:{
    hook:`The Persians are landed on the beach. Waiting for help might be the most dangerous choice of all.`,
    situation:`490 BC. A Persian fleet has landed an army on the plain of Marathon, about 40 km from Athens, to punish the city for supporting a revolt. Athens has marched out and blocked the road to the city. Sparta has promised help, but a religious festival is delaying its army. The ten Athenian generals are split on whether to attack.`,
    forces:`Heavily armored Athenian hoplites, plus the small allied city of Plataea. No cavalry and almost no archers.`,
    enemy:`A larger, more varied army with excellent archers and cavalry, and a fleet beached behind it.`,
    ground:`A coastal plain between the hills and the sea, with a large marsh at the northern end. The Athenians hold the edge of the hills where the road to Athens leaves the plain.`,
    supply:`Every day of waiting risks the Persians re-embarking and sailing for Athens itself, where some citizens might open the gates to them.`,
    intel:`According to one later tradition, Ionian Greeks with the Persians signalled that the Persian cavalry was away. Whatever the reason, the cavalry seems to have played little part.`,
    objective:`Defeat the Persian army before it can reach Athens.`,
    notes:[`Persian archers are deadly at range; armored hoplites are deadly at close quarters.`,`You need a line as long as theirs, or you will be outflanked.`,`The longer you wait, the more chance of betrayal at home.`]
  },
  terrain(){
    let s=felt('#a9a46b');
    s+=sea('M320 0 H400 V400 H180 Q260 360 300 300 Q330 220 320 140 Q310 60 320 0 Z');
    s+=`<ellipse cx="280" cy="60" rx="60" ry="34" fill="#7f9a72" stroke="#5d9bc0" stroke-dasharray="3 3"/>`;
    [[40,80,26],[60,180,30],[40,300,28],[110,40,22]].forEach(p=>s+=mtn(p[0],p[1],p[2]));
    s+=road('M0 220 L120 210');
    s+=label(280,64,'Great Marsh',9)+label(370,260,'Bay of Marathon',9,90)+label(40,240,'To Athens',9)+label(190,330,'The plain',10);
    s+=compass(26,26);
    return s+end();
  },
  features:[
    {x:200,y:210,r:0,px:200,py:180,d:'M120 210 L240 210',line:true,name:'The arrow zone',why:`About 200 metres where Persian archers could hit an advancing line before it reached them. Herodotus says the Athenians crossed it at a run.`},
    {x:280,y:60,r:40,name:'The Great Marsh',why:`Swampy ground at the northern end that limited movement and trapped fleeing Persians.`},
    {x:60,y:210,r:30,name:'The road to Athens',why:`The Athenians blocked it from the hills, where Persian cavalry could not easily reach them.`}
  ],
  units:[
    U('at_left','g','hvy',3,'Left wing (Plataeans)',`Made stronger and deeper than the center.`,{0:[100,140],1:[120,140],2:[230,150]}),
    U('at_center','g','hvy',2,'Center',`Deliberately thinned to stretch the line. Pushed back by the Persian best troops.`,{0:[100,210],1:[130,210],2:[150,210]}),
    U('at_right','g','hvy',3,'Right wing (Callimachus)',`The traditional place of honor, led by the polemarch.`,{0:[100,280],1:[120,280],2:[230,270]}),
    U('at_milt','g','cmd',1,'Miltiades',`Persuaded the polemarch to cast the deciding vote for battle.`,{0:[70,210],1:[100,220]}),
    U('pe_center','t','inf',3,'Persian center',`The best Persian and Saka troops, who broke the Athenian center.`,{0:[250,210],1:[250,210],2:[180,210]}),
    U('pe_wl','t','spr',2,'Persian north wing',`Routed by the Athenian left and driven toward the marsh.`,{0:[250,140],1:[250,140],2:[270,100,'ko']}),
    U('pe_wr','t','spr',2,'Persian south wing',`Routed by the Athenian right.`,{0:[250,280],1:[250,280],2:[280,320,'ko']}),
    U('pe_arch','t','arch',2,'Persian archers',`Expected to shower the Greeks as they approached.`,{0:[220,210],1:[220,210],2:[200,240,'ko']}),
    U('pe_cav','t','cav',2,'Persian cavalry',`Perhaps away from the battlefield, possibly being loaded back onto ships.`,{0:[300,240],1:[340,240,'exit']}),
    U('pe_fleet','t','gal',3,'Persian fleet',`Beached behind the army. The Athenians captured several ships.`,{0:[340,200],2:[360,200]})
  ],
  states:[
    {a:[]},
    {a:[['td',300,240,336,242]]},
    {a:[['g',120,140,226,150],['g',120,280,226,270],['t',250,210,186,210],['g',230,150,210,180,190,200],['g',230,270,210,240,190,220]]}
  ],
  decisions:[
    {when:'After several days of standoff', title:'Attack or wait?',
     ctx:`The armies have faced each other for days. The Spartans are still on their way. There are signs that the Persian cavalry may not be in position.`,
     q:`What do you argue for?`,
     opts:[
       {t:`Keep waiting in the hills for the Spartans`, s:1, fb:`Safe on the plain, but the Persians could sail for Athens, where some citizens might betray the city.`},
       {t:`Attack now, while the Persian cavalry seems to be out of the fight`, s:3, fb:`The cavalry was the Persians' best weapon against a hoplite line in open ground. Its absence created a window.`},
       {t:`March back to defend the walls of Athens`, s:0, fb:`You give up a strong position and let the Persians choose where and when to fight.`, alt:{u:{at_left:[30,200], at_center:[20,220], at_right:[30,240]}, a:[['gd',100,210,26,220]]}}],
     result:`Miltiades persuades the polemarch Callimachus to cast the deciding vote for battle. The Athenians prepare to attack.`,
     why:`A window had opened that might not last. Waiting gave the enemy time and risked treachery at home.`,
     tv:`The Persian commanders may have been preparing to sail part of their force toward Athens while the rest held the Athenians at Marathon.`},
    {when:'The attack', title:'Matching a longer line',
     ctx:`The Persian line is longer than yours. If it overlaps your ends, your hoplites will be hit in the flank. The Persian center holds their best troops.`,
     q:`How do you deploy and advance?`,
     opts:[
       {t:`Keep the line deep everywhere and accept being overlapped`, s:1, fb:`Your flanks would be exposed to the longer Persian line.`, alt:{u:{at_left:[200,170], at_right:[200,250], pe_wl:[210,120], pe_wr:[210,300]}, a:[['t',250,140,214,124],['t',250,280,214,296]]}},
       {t:`Thin the center to match their length, make the wings deep, and cross the arrow zone at a run`, s:3, fb:`Strong wings can win their fights quickly, and running through the archers' range limits the damage they can do.`},
       {t:`Make the center strongest to break their best troops`, s:0, fb:`You would hit their strongest point head-on while your thin wings are outflanked.`}],
     result:`The Athenian line advances, then, according to Herodotus, runs the last stretch. The thin center is pushed back by the Persian elite, but the strong wings rout their opponents, then turn inward and close on the Persian center from both sides. The Persians flee to their ships, and the Athenians capture several.`}
  ],
  debrief:{
    title:'Strike while their best weapon is away',
    outcome:`Herodotus says about 6,400 Persians died against 192 Athenians. The Athenians then marched straight back to Athens, arriving in time to deter a Persian landing near the city. The Persian fleet sailed home. The Spartans arrived after the battle.`,
    why:`Miltiades struck when a window opened, deployed to protect his flanks, and let his wings win before his center broke. Then the army moved fast to protect the real objective: the city.`,
    them:`The Persians had a larger, more varied force and a fleet to move it. But without their cavalry in the fight, their army was vulnerable to a fast, armored charge.`,
    board:{h:`Act when the window is open, then protect the real objective`, b:`The Athenians had two wins that day: the battle, and the march home in time to stop a second threat. Teams often celebrate the first win and forget the second. Know what the battle was really protecting.`, try:`For your current project, write down the real objective behind the visible goal. What threat to it comes after the visible goal is reached?`},
    principles:['timing','economy','flank']
  }
});

/* ===== 14. SEDAN ===== */
PGD.add({
  n:14, id:'sedan', name:'Sedan', year:'1940', place:'France and Belgium border', side:'g', you:'the German panzer commanders', minutes:7,
  face:{g:-1,t:1},
  g:{short:'Germany', name:'German Army Group A (panzer spearhead)', cmdr:'General Heinz Guderian (XIX Panzer Corps), under General von Rundstedt', str:'Three panzer divisions at Sedan, with massive air support', eyes:'Through German eyes'},
  t:{short:'Allies', name:'French and British armies', cmdr:'General Gamelin; at Sedan, General Huntziger\'s Second Army', str:'Large armies, but the best moving north into Belgium', eyes:'Through French eyes'},
  brief:{
    hook:`You are through the forest the enemy thought was impassable. Doctrine says stop and wait. Should you?`,
    situation:`May 1940. Germany has invaded the Netherlands and Belgium, and the best French and British armies have rushed north to meet that attack. Meanwhile your panzer divisions have pushed through the hilly, wooded Ardennes in about three days and reached the Meuse River at Sedan.`,
    forces:`Fast armored divisions with infantry and engineers, and almost the entire Luftwaffe dive bomber force available to support you.`,
    enemy:`At Sedan, a French division of older reservists in bunkers along the river. Strong French armored reserves exist but move slowly. The main Allied armies are 150 km north in Belgium.`,
    ground:`The Meuse is a serious river obstacle. Beyond it, open rolling country runs west toward the English Channel.`,
    supply:`Your columns are long and fuel is a constant worry. Infantry and heavy artillery are still days behind on the forest roads.`,
    intel:`The French expected the Ardennes to take you much longer. They are reinforcing Sedan, but slowly.`,
    objective:`Break through at Sedan and cut off the Allied armies in Belgium.`,
    notes:[`Standard practice: wait for heavy artillery before crossing a defended river.`,`Every day you wait, the French dig in and bring up reserves.`,`The Allied armies in Belgium have their backs to the sea if you get behind them.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=river('M160 0 Q190 80 170 150 Q150 210 180 260 Q210 320 190 400',14);
    s+=trees(81,60,[220,400,0,400],(x,y)=>x>240,['#2f5a24','#3b6b2b','#2a4f20']);
    s+=house(170,200)+house(182,206,'#8a3a2a')+house(176,192)+house(166,212);
    s+=sea('M0 0 H60 Q40 40 30 80 Q20 120 0 130 Z');
    s+=label(330,220,'Ardennes forest',11,90)+label(200,192,'Sedan',10)+label(150,300,'Meuse River',9,-70)+label(80,170,'Toward the Channel',8)+label(220,16,'Allied armies in Belgium, far north',8);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:300,y:200,r:0,px:320,py:280,d:'M240 0 H400 V400 H240 Z',name:'The Ardennes',why:`Hilly, wooded country with narrow roads. The French assumed armored forces would take far longer to cross it.`},
    {x:172,y:180,r:0,px:150,py:120,d:'M160 0 Q190 80 170 150 Q150 210 180 260 Q210 320 190 400',line:true,name:'The Meuse',why:`A serious river obstacle, defended by bunkers on the far bank.`},
    {x:60,y:180,r:50,name:'Open country to the west',why:`Once across the river, rolling country ran toward the Channel coast, behind the Allied armies.`}
  ],
  units:[
    U('de_1pz','g','arm',3,'1st Panzer Division',`Crossed the Meuse at Sedan and led the race west.`,{0:[260,200],1:[150,200],2:[60,140],3:[60,120]}),
    U('de_2pz','g','arm',2,'2nd Panzer Division',`Crossed downstream and joined the drive west.`,{0:[270,120],1:[160,120],2:[50,100],3:[50,90]}),
    U('de_10pz','g','arm',2,'10th Panzer Division',`Crossed upstream and guarded the southern flank.`,{0:[270,290],1:[170,280],2:[120,240]}),
    U('de_eng','g','inf',2,'Infantry and engineers',`Crossed the river in rubber assault boats under fire.`,{0:[230,220],1:[150,220],2:[140,220]}),
    U('de_stuka','g','plane',3,'Dive bombers',`Used as flying artillery, pounding French bunkers for hours.`,{0:[300,60],1:[190,170],2:[100,140],3:[120,60]}),
    U('de_cmd','g','cmd',1,'Heinz Guderian',`An armored warfare pioneer who led from the front and pushed past his orders.`,{0:[290,240],1:[170,236],2:[80,160]}),
    U('fr_55','t','inf',3,'French 55th Division',`Older reservists holding the river line at Sedan.`,{0:[150,190],1:[150,190,'ko']}),
    U('fr_bunk','t','art',2,'Bunkers and artillery',`Fixed defenses along the river.`,{0:[160,240],1:[160,240,'ko']}),
    U('fr_res','t','arm',2,'French armored reserves',`Ordered forward, but slow and scattered.`,{0:[60,300],1:[100,280],2:[120,300,'ko']}),
    U('fr_north','t','inf',3,'Allied armies in Belgium',`The best French divisions and the British Expeditionary Force, cut off when the panzers reached the sea.`,{0:[120,40],2:[100,50],3:[80,10,'exit']}),
    U('fr_cmd','t','cmd',1,'General Huntziger',`Commanded the French Second Army around Sedan.`,{0:[60,220]})
  ],
  states:[
    {a:[]},
    {a:[['g',300,60,240,120,192,166],['g',230,220,160,214],['g',260,200,156,200]]},
    {a:[['g',150,200,100,180,64,144],['g',160,120,100,110,56,102],['t',60,300,90,290,114,286]]},
    {a:[['td',100,50,90,30,82,14]]}
  ],
  decisions:[
    {when:'12 May 1940', title:'Cross now or wait?',
     ctx:`Your tanks reached the Meuse at Sedan days earlier than the French expected. Your infantry and heavy artillery are still stuck on the forest roads behind you. Standard practice is to wait for them before assaulting a defended river.`,
     q:`What do you do?`,
     opts:[
       {t:`Wait for the heavy artillery and infantry, as doctrine says`, s:1, fb:`Safer in theory, but every day lets the French reinforce the river and bring up their reserves.`, alt:{u:{fr_res:[140,240]}, a:[['t',60,300,110,280,136,244]]}},
       {t:`Cross tomorrow, using massed dive bombers in place of artillery`, s:3, fb:`Air power can do the artillery's job right now. Speed is your biggest advantage, and the French are not ready.`},
       {t:`Shift north to look for an easier crossing`, s:1, fb:`You lose a day or more on crowded roads and give up surprise at the point you have already reached.`}],
     result:`On 13 May, hundreds of German bombers pound the French positions for hours. Infantry and engineers cross the Meuse in rubber boats and take the heights beyond. The French reservists, shaken by the bombing, give way. By the next day German tanks are crossing on new bridges.`,
     why:`Using aircraft as artillery let the Germans attack days before the French expected.`,
     tv:`French commanders believed they had days before any serious crossing. The bombing broke the nerve of reservists who had never faced it.`},
    {when:'14 to 15 May', title:'Which way now?',
     ctx:`You have a bridgehead across the Meuse. Orders say halt and consolidate until infantry catches up. The Allied armies in Belgium are far to the north, and the Channel coast lies about 250 km to the west.`,
     q:`What do you do?`,
     opts:[
       {t:`Halt and consolidate as ordered`, s:1, fb:`It reduces risk to your flanks, but gives the French time to form a new line in front of you.`},
       {t:`Turn west and race for the Channel, cutting off the Allied armies in Belgium`, s:3, fb:`If you reach the sea, the best Allied armies are trapped between you and the forces attacking from the east.`},
       {t:`Turn south toward Paris`, s:1, fb:`A dramatic target, but the Allied armies in the north stay intact and free to retreat.`, alt:{u:{de_1pz:[180,380], de_2pz:[200,370]}, a:[['g',150,200,170,300,180,372]]}}],
     result:`Guderian pushes west, sometimes ignoring orders to stop. His panzers reach the Channel coast near Abbeville on 20 May, cutting the Allied armies in two.`,
     why:`Speed and the willingness to act on the commander's intent, not just the letter of orders, turned a breakthrough into a strategic victory.`,
     tv:`French commanders kept trying to form a defensive line, but the panzers moved faster than orders could travel. Reserves arrived piecemeal and were beaten one by one.`},
    {when:'24 May 1940', title:'The halt order',
     ctx:`The Allied armies are trapped around Dunkirk, with their backs to the sea. Your tanks are close. The high command, worried about worn-out tanks and marshy ground, is considering halting them and letting the air force finish the job.`,
     q:`What do you recommend?`,
     opts:[
       {t:`Halt the tanks and let the air force finish the job`, s:0, fb:`This is what happened. The pause gave the Allies time to organize a defense and an evacuation by sea.`},
       {t:`Keep the tanks moving into the pocket before the Allies can organize`, s:3, fb:`The tanks were worn, but the trapped armies were at their weakest. Pausing gave them days to dig in and escape.`},
       {t:`Pull the tanks back to refit before the next phase`, s:0, fb:`The Allies escape almost unhindered.`}],
     result:`The tanks halt for about three days. The Allies strengthen the Dunkirk perimeter, and about 338,000 British and French troops are evacuated by sea, many in small civilian boats.`}
  ],
  debrief:{
    title:'Speed compounds, until you stop',
    outcome:`France surrenders on 22 June 1940, six weeks after the attack began. But the escape at Dunkirk saves the core of the British army, which fights on.`,
    why:`The Germans won by being faster than the French could think: crossing early, using air power as artillery and pushing west on intent. Their biggest mistake was stopping at the moment of greatest opportunity.`,
    them:`French plans assumed a slower war with time to react. The Ardennes was lightly held because commanders thought it too difficult for tanks.`,
    board:{h:`Speed compounds; don't stop at the moment of opportunity`, b:`Each fast decision put the Germans further ahead of a slower opponent, until a cautious halt let the opponent escape. Teams often slow down just as a lead becomes decisive, out of caution or fatigue. Know when pressing on matters more than resting.`, try:`Look at a current initiative where you are ahead. What would it take to keep pace for one more month instead of consolidating?`},
    principles:['mass','intent','timing']
  }
});

/* ===== 15. BANNOCKBURN ===== */
PGD.add({
  n:15, id:'bannockburn', name:'Bannockburn', year:'1314', place:'Near Stirling, Scotland', side:'g', you:'Robert the Bruce', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Scots', name:'Scottish army', cmdr:'King Robert the Bruce', str:'Perhaps 6,000 to 7,000, mostly spearmen', eyes:'Through Scottish eyes'},
  t:{short:'English', name:'English army', cmdr:'King Edward II', str:'Perhaps 15,000 to 20,000, including about 2,000 heavy cavalry', eyes:'Through English eyes'},
  brief:{
    hook:`The enemy has the finest heavy cavalry in Europe. Your army is mostly men with spears.`,
    situation:`June 1314. Your brother has besieged Stirling Castle, and its commander has agreed to surrender if no English army arrives by Midsummer. Edward II is marching north with the largest English army in years to relieve it. You have chosen to meet him.`,
    forces:`Spearmen formed in schiltrons, tight blocks bristling with long spears, plus a small force of light horse under Sir Robert Keith.`,
    enemy:`Heavy armored knights, many archers and large numbers of infantry. Overconfident, and led by a king with little battlefield experience.`,
    ground:`You hold the wooded New Park, astride the road to Stirling. To the east lies the Carse, flat ground cut by streams and boggy patches between the Bannock Burn and the Pelstream.`,
    supply:`Edward must reach Stirling by Midsummer. You can choose your ground and wait for him.`,
    intel:`Heavy cavalry needs firm, open ground to charge. Archers can shred a stationary spear formation if left free to shoot.`,
    objective:`Defeat the English army and keep Stirling from being relieved.`,
    notes:[`Spearmen in a schiltron can stop cavalry, if the cavalry has to come straight at them.`,`Cramped, wet ground is the enemy of heavy cavalry.`,`Deal with the archers before they deal with you.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=river('M0 300 Q120 280 200 310 Q280 340 400 300',9)+river('M260 60 Q300 160 340 230 Q370 280 400 290',6);
    s+=`<path d="M220 120 Q300 160 360 260 Q330 300 260 300 Q220 250 220 120 Z" fill="#7f9a72" opacity=".7"/>`;
    s+=trees(91,40,[0,200,60,300],()=>true,['#2f5a24','#3b6b2b']);
    s+=road('M150 400 L150 0');
    s+=`<rect x="186" y="10" width="28" height="18" fill="#b9b2a2" stroke="#4f4a40"/><rect x="190" y="2" width="6" height="10" fill="#8d8478"/><rect x="204" y="2" width="6" height="10" fill="#8d8478"/>`;
    s+=label(200,40,'Stirling Castle',9)+label(70,180,'New Park (woods)',10)+label(290,220,'The Carse (boggy)',9)+label(320,330,'Bannock Burn',9)+label(330,120,'Pelstream',8);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:90,y:180,r:0,px:70,py:200,d:'M0 60 H200 V300 H0 Z',name:'New Park woods',why:`Wooded ground where the Scots could form up, hidden and protected from cavalry charges.`},
    {x:280,y:220,r:0,px:300,py:250,d:'M220 120 Q300 160 360 260 Q330 300 260 300 Q220 250 220 120 Z',name:'The Carse',why:`Flat ground between streams, soft and cut by ditches. The English camped here and found they had no room to deploy their cavalry.`},
    {x:150,y:330,r:24,name:'The road approach',why:`The Scots dug hidden pits along open approaches near the road to trap charging horses.`}
  ],
  units:[
    U('sc_moray','g','spr',3,'Moray\'s schiltron',`Stopped an English cavalry probe on the first day.`,{0:[150,200],1:[170,180],2:[250,210]}),
    U('sc_edw','g','spr',3,'Edward Bruce\'s schiltron',`Led the advance onto the Carse on the second morning.`,{0:[110,250],1:[130,240],2:[240,260]}),
    U('sc_doug','g','spr',3,'Douglas\'s schiltron',`Advanced alongside the others.`,{0:[100,150],1:[110,150],2:[230,160]}),
    U('sc_king','g','spr',2,'The king\'s schiltron (reserve)',`Robert's own division, committed at the decisive moment.`,{0:[60,200],1:[80,200],2:[200,200]}),
    U('sc_keith','g','cav',1,'Keith\'s light horse',`A few hundred horsemen who scattered the English archers.`,{0:[60,120],1:[80,120],2:[290,250]}),
    U('sc_bruce','g','cmd',1,'Robert the Bruce',`Killed the English knight Henry de Bohun in single combat on the first day.`,{0:[150,280],1:[150,256],2:[210,226]}),
    U('en_cav','t','cav',3,'English heavy cavalry',`The pride of the army. Packed into the Carse with little room to charge.`,{0:[180,380],1:[280,240],2:[290,226,'ko']}),
    U('en_van','t','cav',2,'English vanguard',`Charged up the road on the first day and was beaten back.`,{0:[150,370],1:[150,320,'ko'],2:[150,320,'ko']}),
    U('en_arch','t','arch',2,'English and Welsh archers',`Could have broken the schiltrons, but were scattered by Scottish horsemen.`,{0:[240,380],1:[320,260],2:[310,270,'ko']}),
    U('en_inf','t','inf',3,'English infantry',`Stuck behind the cavalry in the crush.`,{0:[220,390],1:[310,200],2:[320,190]}),
    U('en_edw','t','cmd',1,'Edward II',`Led his army into a cramped camp, then fled the field.`,{0:[270,390],1:[340,160],2:[396,140,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['t',150,370,150,330],['t',180,380,240,300,276,246]]},
    {a:[['g',170,180,240,206],['g',130,240,236,256],['g',80,120,200,200,286,248],['g',80,200,196,200]]}
  ],
  decisions:[
    {when:'Before the English arrive', title:'Where to fight',
     ctx:`The English army is approaching from the south. You can choose where to meet it.`,
     q:`How do you set up?`,
     opts:[
       {t:`Meet them in the open fields south of the Bannock Burn`, s:0, fb:`Open, firm ground is exactly what heavy cavalry wants.`, alt:{u:{sc_moray:[150,340], sc_edw:[110,350], en_cav:[160,360]}, a:[['t',180,380,164,364]]}},
       {t:`Hold the wooded New Park across the road, dig hidden pits on the open approaches, and keep your schiltrons ready`, s:3, fb:`Woods and pits force cavalry onto narrow approaches where your spears are strongest.`},
       {t:`Lift the siege and avoid battle`, s:1, fb:`Safe for your army, but Stirling is relieved and Edward's prestige grows.`}],
     result:`On 23 June the English vanguard charges up the road. In front of both armies, the knight Henry de Bohun charges at Robert himself, who kills him with an axe. An English cavalry probe toward Stirling is beaten off by Moray's schiltron. That night the English army camps on the Carse, cramped between streams and boggy ground.`,
     why:`The Scots chose ground that made heavy cavalry fight on narrow approaches, and the first day's success boosted their confidence.`,
     tv:`The English took the first day's setbacks as skirmishes. Moving onto the Carse looked like a sensible way to reach Stirling around the Scots, not a trap.`},
    {when:'Dawn, 24 June', title:'The English are cramped',
     ctx:`A Scottish knight who has deserted the English tells you their army is tired and its morale is low. Their cavalry is packed onto soft ground with little room to form up.`,
     q:`What do you do?`,
     opts:[
       {t:`Withdraw west and keep up guerrilla warfare`, s:1, fb:`You save your army, but Stirling is relieved and a rare chance is lost.`},
       {t:`Advance your schiltrons onto the Carse and attack while they are cramped, with your horsemen ready to scatter their archers`, s:3, fb:`The schiltrons go on the offensive, pinning the cavalry against the streams. The light horse deals with the one weapon that could break the spear formations.`},
       {t:`Stay in the woods and wait for them to attack`, s:1, fb:`They might, or they might reorganize on better ground. The opportunity of the cramped camp passes.`}],
     result:`The Scottish schiltrons advance onto the Carse. The English cavalry, packed in and unable to build up speed, crashes into walls of spears. When English archers start shooting into the schiltrons from the flank, Keith's light horse scatters them. The English army collapses, and many drown trying to cross the streams. Edward II flees.`}
  ],
  debrief:{
    title:'Pick a battlefield that cramps their strength',
    outcome:`The English suffer heavy losses, including many nobles. Edward II escapes by boat. Bannockburn becomes a symbol of Scottish independence, which England finally recognizes in 1328.`,
    why:`Bruce chose ground that took away the English cavalry's room, prepared it with pits, then attacked at the moment the enemy was most cramped, with a specific plan for the archers.`,
    them:`Edward's army was large and confident. It assumed it could reach Stirling around the Scots. Camping on the Carse took away its own best weapon.`,
    board:{h:`Pick the arena that cramps their strength`, b:`Heavy cavalry was the English advantage, but only on open ground. Bruce made them fight where it could not move. Big competitors' strengths often need room: scale, long timelines, big budgets. Fight in tight, fast contexts where those advantages cannot spread out.`, try:`Name your competitor's main strength. What condition does it need to work? Where is that condition missing?`},
    principles:['ground','combined','force']
  }
});

/* ===== 16. OPERATION FOCUS ===== */
PGD.add({
  n:16, id:'focus', name:'Operation Focus', year:'1967', place:'Sinai and Egypt', side:'g', you:'Major General Mordechai Hod', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Israel', name:'Israeli Air Force', cmdr:'Major General Mordechai Hod', str:'About 200 combat aircraft', eyes:'Through Israeli eyes'},
  t:{short:'Egypt', name:'Egyptian Air Force', cmdr:'Egyptian air command', str:'Several hundred combat aircraft at many airfields', eyes:'Through Egyptian eyes'},
  brief:{
    hook:`You have one chance to catch an air force on the ground. The question is exactly when, and how.`,
    situation:`June 1967. After weeks of rising tension, Israel has decided to strike first at the Egyptian Air Force. The wider war remains politically contested; this scenario looks only at the planning of the opening air strike.`,
    forces:`About 200 combat aircraft, highly trained pilots and ground crews drilled to refuel and rearm aircraft very fast.`,
    enemy:`A larger air force with modern Soviet-built aircraft, at airfields across Sinai, along the Suez Canal and in the Nile Delta. Radar stations watch the skies.`,
    ground:`The Mediterranean lies to the north. Egyptian radar looks mainly east, toward Israel.`,
    supply:`Every aircraft you send is one not defending Israel's own skies.`,
    intel:`Years of intelligence work have mapped Egyptian routines: when patrols fly, when they land, when senior officers drive to work, and where each aircraft is parked.`,
    objective:`Destroy as much of the Egyptian Air Force as possible on the ground in the first hours.`,
    notes:[`Dawn is the classic moment for a surprise attack, which is why defenders watch it.`,`Radar sees high-flying aircraft from far away.`,`Aircraft parked in the open have no protection.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 140 Q60 130 120 150 Q180 160 240 150 Q300 140 360 130 Q380 128 400 120 V400 H0 Z','#c8b88a');
    s+=land('M320 130 Q350 125 400 110 V400 H340 Q330 300 340 220 Q330 170 320 130 Z','#a9a86e');
    s+=river('M60 140 Q70 220 60 300 Q50 360 60 400',6)+river('M200 150 Q205 250 190 400',4);
    [[60,180],[110,200],[150,250],[220,200],[250,280],[180,330],[90,320]].forEach(p=>s+=`<rect x="${p[0]-10}" y="${p[1]-2}" width="20" height="4" fill="#6f6448"/>`);
    s+=label(200,60,'Mediterranean Sea',12)+label(60,124,'Nile Delta',9)+label(200,140,'Suez Canal',8,80)+label(270,340,'Sinai',11)+label(372,200,'Israel',10,90)+label(140,180,'Airfields',8);
    s+=compass(26,26);
    return s+end();
  },
  features:[
    {x:200,y:60,r:50,name:'The sea route',why:`Flying low over the Mediterranean, under radar and in radio silence, let strike aircraft approach from an unexpected direction.`},
    {x:150,y:250,r:60,name:'Egyptian airfields',why:`Aircraft parked in neat rows in the open, without hardened shelters.`},
    {x:360,y:250,r:30,name:'Home airfields',why:`Short flight times let ground crews refuel, rearm and relaunch aircraft in minutes.`}
  ],
  units:[
    U('ia_w1','g','plane',3,'First wave',`Struck airfields almost simultaneously.`,{0:[370,240],1:[180,40],2:[150,240]}),
    U('ia_w2','g','plane',3,'Following waves',`Arriving at short intervals after quick turnarounds.`,{0:[350,300],1:[350,300],2:[110,300]}),
    U('ia_home','g','plane',1,'Fighters held back',`A small number kept home to defend Israeli airspace.`,{0:[380,180]}),
    U('ia_crews','g','crate',1,'Ground crews',`Drilled to turn aircraft around very quickly.`,{0:[360,330]}),
    U('ia_hod','g','cmd',1,'Mordechai Hod',`Commander of the Israeli Air Force.`,{0:[380,370]}),
    U('ea_sinai','t','plane',3,'Aircraft at Sinai bases',`Parked in the open on forward airfields.`,{0:[220,200],2:[220,200,'ko']}),
    U('ea_delta','t','plane',3,'Aircraft at Canal and Delta bases',`Further from Israel, but still reachable.`,{0:[100,200],2:[100,200,'ko']}),
    U('ea_patrol','t','plane',1,'Dawn patrol',`Morning patrols that flew, then landed to refuel.`,{0:[260,100],1:[160,250],2:[160,250,'ko']}),
    U('ea_radar','t','art',2,'Radar and air defense',`Watching mainly toward the east.`,{0:[280,180],2:[280,180,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['td',260,100,180,180,162,244]]},
    {a:[['g',370,240,260,40,180,44],['g',180,40,160,140,152,234],['g',350,300,200,320,114,296]]}
  ],
  decisions:[
    {when:'Planning', title:'When to strike',
     ctx:`Your planners know the Egyptian daily routine in detail.`,
     q:`At what time do you strike?`,
     opts:[
       {t:`At dawn, the classic moment for surprise`, s:1, fb:`Dawn is when defenders expect attacks and when patrols are already in the air. You would meet a more alert enemy.`, alt:{u:{ea_patrol:[260,140]}, a:[]}},
       {t:`At about 7:45, after dawn patrols have landed and as officers commute to work`, s:3, fb:`This is the seam in their routine: aircraft refueling on the ground, alert levels dropping and commanders between home and headquarters.`},
       {t:`At night`, s:0, fb:`Finding and hitting airfields precisely at low level in the dark was far harder with 1960s technology.`}],
     result:`Planners choose 7:45 a.m. Israeli time. The Egyptian dawn patrols have landed, crews are at breakfast and many senior officers are on their way to work.`,
     why:`The best moment for surprise is not the obvious one, but the one the defender has stopped worrying about.`,
     tv:`Egyptian commanders expected any attack to come at dawn and from the east. By mid-morning, alert levels had dropped.`},
    {when:'Planning', title:'Route and commitment',
     ctx:`You must decide how to approach and how many aircraft to commit.`,
     q:`How do you strike?`,
     opts:[
       {t:`Fly straight across Sinai at altitude with a balanced force`, s:0, fb:`Radar would see you coming, and fighters would be scrambled before you arrived.`},
       {t:`Fly low over the sea in radio silence, turn in from an unexpected direction, and commit nearly every jet`, s:3, fb:`The low sea route avoids radar, and committing almost everything maximizes the first blow, which decides whether there will be a second.`},
       {t:`Commit half the force and keep half at home`, s:1, fb:`Safer at home, but a weaker first strike leaves many Egyptian aircraft to fight back.`}],
     result:`Nearly all Israeli combat aircraft take part, with only a small number kept home. Strike groups fly low over the Mediterranean in radio silence, then turn south and hit airfields almost simultaneously. Ground crews turn aircraft around in minutes for wave after wave.`}
  ],
  debrief:{
    title:'Find the seam in their routine',
    outcome:`In the first three hours, most of the Egyptian Air Force is destroyed on the ground. By noon, about 450 aircraft from several air forces have been destroyed, for the loss of 19 Israeli aircraft. Air superiority shapes the rest of the six-day war.`,
    why:`Detailed intelligence on routines, a strike timed to the moment of lowest alert, an unexpected approach route and a fast turnaround that multiplied every aircraft's effect.`,
    them:`Egyptian aircraft were parked in the open without hardened shelters, and air defenses expected an attack at dawn from the east. The air force rebuilt with hardened shelters afterward.`,
    board:{h:`Find the seam in their routine`, b:`Organizations are most alert when they expect trouble, and least alert in the routine moments after. Launches, announcements and approaches land differently depending on timing. Learning when the other side is distracted is often as valuable as having a better offer.`, try:`When is your key client or competitor least focused: end of quarter, after a big launch, during planning season? Plan your next move for that window.`},
    principles:['timing','intel','mass']
  }
});

/* ===== 17. THE NILE ===== */
PGD.add({
  n:17, id:'nile', name:'The Nile', year:'1798', place:'Aboukir Bay, Egypt', side:'g', you:'Rear Admiral Horatio Nelson', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Britain', name:'Royal Navy squadron', cmdr:'Rear Admiral Horatio Nelson', str:'13 ships of the line plus one smaller ship', eyes:'Through British eyes'},
  t:{short:'France', name:'French fleet', cmdr:'Vice Admiral François-Paul Brueys', str:'13 ships of the line, including the huge flagship L\'Orient, and 4 frigates', eyes:'Through French eyes'},
  brief:{
    hook:`You have found the enemy fleet at anchor late in the afternoon. Night is coming.`,
    situation:`August 1798. Napoleon has landed an army in Egypt. For weeks you have been searching the Mediterranean for the French fleet that carried it. Late on 1 August you find it anchored in a line in Aboukir Bay.`,
    forces:`13 ships of the line under captains you have trained to understand your thinking and use their initiative.`,
    enemy:`13 ships of the line, including the 120-gun L'Orient, anchored in a single line along the edge of shallow water, with a battery on an island at one end.`,
    ground:`The French line is anchored close to shoals on the landward side. The wind is blowing down the line from the north-northwest, from van toward rear.`,
    supply:`Your ships are at sea and ready. Many French crews are ashore collecting water and food.`,
    intel:`The French expect any attack to come from the seaward side. Some guns facing the land have not been cleared for action.`,
    objective:`Destroy the French fleet and cut Napoleon's army off from France.`,
    notes:[`Night battles are risky, but give the enemy no time to prepare.`,`With the wind blowing down the line, ships at the rear cannot easily sail up to help the van.`,`If a ship at anchor has room to swing, there is room for another ship to pass.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 400 V220 Q40 200 70 160 Q90 120 70 80 Q60 50 40 40 Q20 30 0 40 Z','#c8b88a');
    s+=`<path d="M70 70 Q120 140 180 200 Q230 250 290 300 Q330 340 360 390" fill="none" stroke="#bfe0ee" stroke-width="44" opacity=".55" stroke-linecap="round"/>`;
    s+=`<circle cx="70" cy="56" r="10" fill="#c8b88a" stroke="#e6d6a2" stroke-width="2"/>`;
    s+=`<path d="M300 20 L250 70" stroke="#1f1a14" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#mk)" opacity=".7"/>`;
    s+=label(30,300,'Egyptian coast',9,-80)+label(140,200,'Shoals',9,45)+label(70,36,'Aboukir Island',8)+label(320,40,'Wind',9)+label(330,160,'Open sea',10);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:200,y:210,r:0,px:150,py:240,d:'M70 70 Q120 140 180 200 Q230 250 290 300 Q330 340 360 390',line:true,name:'The shoals',why:`Shallow water on the landward side. The French believed no ship could get between them and the shore.`},
    {x:110,y:100,r:30,name:'The gap at the head of the line',why:`The leading French ship was anchored with enough room to swing, which meant a British ship could pass around it.`},
    {x:280,y:50,r:30,name:'The wind',why:`Blowing down the French line, so their rear ships could not sail up to help the van.`}
  ],
  units:[
    U('gb_goliath','g','ship',1,'HMS Goliath',`Captain Thomas Foley judged there was room to pass inside the French line, and led the way.`,{0:[340,40],1:[300,80],2:[110,110]}),
    U('gb_inside','g','ship',3,'Ships passing inside',`Followed Goliath around the head of the line onto the landward side.`,{0:[360,70],1:[320,100],2:[150,150]}),
    U('gb_outside','g','ship',3,'Ships attacking from seaward',`Anchored on the seaward side, so the French van was caught between two fires.`,{0:[380,100],1:[340,130],2:[200,140]}),
    U('gb_nelson','g','cmd',1,'Nelson',`Aboard HMS Vanguard. Wounded in the head during the battle.`,{0:[390,130],1:[350,150],2:[220,160]}),
    U('fr_van','t','ship',3,'French van',`Attacked from both sides at once.`,{0:[110,130],2:[120,140,'ko']}),
    U('fr_center','t','ship',2,'French center',`Fought hard, but was overwhelmed one ship at a time.`,{0:[170,190],2:[180,200,'ko']}),
    U('fr_orient','t','ship',1,'L\'Orient',`The French flagship, one of the largest warships afloat. It caught fire and exploded during the night.`,{0:[220,236],2:[220,236,'ko']}),
    U('fr_rear','t','ship',3,'French rear (Villeneuve)',`Downwind of the fighting. Two ships escaped the next day.`,{0:[280,290],2:[392,360,'exit']}),
    U('fr_brueys','t','cmd',1,'Admiral Brueys',`Killed during the battle.`,{0:[230,210],2:[230,214,'ko']}),
    U('fr_fort','t','art',1,'Island battery',`Guns on Aboukir Island at the head of the line.`,{0:[70,56]})
  ],
  states:[
    {a:[]},
    {a:[['g',340,40,320,60,302,78]]},
    {a:[['g',300,80,80,80,108,108],['g',320,100,120,130,148,146],['g',340,130,260,150,204,140],['td',280,290,340,330,388,356]]}
  ],
  decisions:[
    {when:'Late afternoon, 1 August', title:'Attack now or wait?',
     ctx:`You have found the French fleet at anchor. Your ships are spread out after the chase. Night will fall within a couple of hours, and you have no detailed charts of the bay.`,
     q:`What do you do?`,
     opts:[
       {t:`Wait for dawn and attack with the whole squadron together`, s:1, fb:`Safer navigation, but the French get the night to recall their crews, clear their guns and strengthen their line.`},
       {t:`Attack immediately as your ships arrive`, s:3, fb:`The French are not ready, many sailors are ashore, and your captains know your intentions well enough to act without detailed orders.`},
       {t:`Blockade the bay and wait for them to come out`, s:1, fb:`It keeps them penned in, but leaves the fleet intact and Napoleon's link to France open longer.`}],
     result:`Nelson signals to attack at once. His ships head straight into the bay as the sun sets.`,
     why:`Attacking immediately caught the French unprepared, and Nelson's captains could act on shared understanding without a long set of signals.`,
     tv:`Brueys did not expect an attack so late in the day. Many of his sailors were ashore, and his line was set up to face the sea.`},
    {when:'Sunset', title:'How to attack an anchored line',
     ctx:`The French line is anchored along the edge of the shoals. Captain Foley, in the leading ship, notices the first French ship has room to swing on its anchor.`,
     q:`How do you attack?`,
     opts:[
       {t:`Anchor on the seaward side, one British ship opposite each French ship`, s:1, fb:`A fair fight, ship for ship, against an enemy with a heavier flagship.`},
       {t:`Send ships around the head of the line into the gap on the landward side, so the French van is attacked from both sides`, s:3, fb:`If a ship can swing at anchor, there is room for another to pass. The landward guns are not even ready.`},
       {t:`Go straight for the big flagship in the center`, s:0, fb:`You would face the strongest French ships first while the rest of their line pounds you.`, alt:{u:{gb_goliath:[230,180], gb_inside:[250,210]}, a:[['g',300,80,260,150,232,176]]}}],
     result:`Goliath rounds the head of the French line and anchors on its landward side, followed by several others. The rest of the British ships anchor on the seaward side. The French van is caught between two fires and overwhelmed ship by ship. At about 10 p.m. L'Orient catches fire and explodes. The French rear, downwind, cannot come up to help.`}
  ],
  debrief:{
    title:'Attack the side they think is safe',
    outcome:`Eleven of the thirteen French ships of the line are captured or destroyed. Napoleon's army is stranded in Egypt, and Britain dominates the Mediterranean.`,
    why:`Speed, initiative and a sharp eye for the enemy's assumption. The wind let the British concentrate on the front half of the French line while the rear watched helplessly.`,
    them:`Brueys trusted the shoals to protect his landward side and did not expect an attack at nightfall. His anchored line could not maneuver once the battle began.`,
    board:{h:`Attack the side they think is safe`, b:`The French defended against the obvious threat and left the other side unready. Competitors are often well protected where they expect attack, and exposed where they assume no one can reach.`, try:`Where does your main competitor feel completely safe? What would it take to compete there?`},
    principles:['flank','mass','intent']
  }
});

/* ===== 18. TEUTOBURG FOREST ===== */
PGD.add({
  n:18, id:'teutoburg', name:'Teutoburg Forest', year:'AD 9', place:'Northwest Germany', side:'g', you:'Arminius', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Germanic tribes', tab:'Tribes', name:'Germanic tribal alliance', cmdr:'Arminius of the Cherusci', str:'Probably 15,000 or more warriors', eyes:'Through Germanic eyes'},
  t:{short:'Rome', name:'Roman army of Germania', cmdr:'Publius Quinctilius Varus', str:'Three legions with auxiliaries, perhaps 15,000 to 20,000 soldiers, plus camp followers', eyes:'Through Roman eyes'},
  brief:{
    hook:`The Roman legions are the best army in the world in open battle. So do not fight one.`,
    situation:`AD 9. Rome is turning the lands east of the Rhine into a province. You, Arminius, are a Germanic noble who served as an officer in the Roman army and are trusted by the governor, Varus. In secret you have united several tribes against Rome.`,
    forces:`Warriors from several tribes, brave and mobile but lightly armored, with no siege weapons or standing army.`,
    enemy:`Three Roman legions plus auxiliaries, superbly trained and equipped. In open battle, in formation, almost unbeatable.`,
    ground:`Dense forest, hills and bogs, cut by narrow tracks. Roman formations need open space to work.`,
    supply:`Varus's army is marching back toward winter quarters with a long baggage train and many civilians.`,
    intel:`Varus trusts you completely. You know exactly how a Roman column marches, camps and fights.`,
    objective:`Destroy the Roman army and end Roman rule east of the Rhine.`,
    notes:[`Never let the legions form up on open ground.`,`A marching column strung out on a narrow track cannot fight as one.`,`Weather can be an ally.`]
  },
  terrain(){
    let s=felt('#6f8a50');
    s+=`<path d="M0 120 Q100 110 200 130 Q300 150 400 130 L400 0 H0 Z" fill="#5f7a44"/>`;
    s+=hill(200,60,200,50,3)+trees(111,70,[0,400,0,140],()=>true,['#2a4f20','#2f5a24','#3b6b2b']);
    s+=`<path d="M0 260 Q100 250 200 270 Q300 290 400 270 V400 H0 Z" fill="#6b7f5a"/><path d="M0 260 Q100 250 200 270 Q300 290 400 270 V400 H0 Z" fill="url(#furrow)" opacity=".4"/>`;
    s+=road('M0 200 Q100 190 200 205 Q300 220 400 200');
    s+=`<path d="M40 140 Q120 136 200 150 Q280 166 360 150" fill="none" stroke="#8a7a50" stroke-width="7" stroke-linecap="round"/><path d="M40 140 Q120 136 200 150 Q280 166 360 150" fill="none" stroke="#b5a57a" stroke-width="3" stroke-dasharray="2 3"/>`;
    s+=label(200,30,'Wooded hills',10)+label(200,340,'Great bog',11)+label(200,226,'The narrow track',9)+label(200,170,'Turf wall',8);
    s+=compass(380,384);
    return s+end();
  },
  over(){ return `<g class="ph" data-show="1 2">${(()=>{const r=rng(9);let c='<g opacity=".55">';for(let i=0;i<50;i++){const x=r()*400,y=r()*400;c+=`<path d="M${x.toFixed(0)} ${y.toFixed(0)} l-3 8" stroke="#d3dde8" stroke-width="1"/>`;}return c+'</g>';})()}</g>`; },
  features:[
    {x:200,y:205,r:0,px:300,py:230,d:'M0 200 Q100 190 200 205 Q300 220 400 200',line:true,name:'The narrow track',why:`Squeezed between hill and bog. A column here stretched for kilometres and could not form a battle line.`},
    {x:200,y:150,r:0,px:120,py:150,d:'M40 140 Q120 136 200 150 Q280 166 360 150',line:true,name:'The turf wall',why:`A prepared earth wall along the hillside, from behind which warriors could attack and retreat.`},
    {x:200,y:330,r:60,name:'The great bog',why:`Impassable ground on the other side of the track. Nowhere to escape or deploy.`}
  ],
  units:[
    U('ge_wall','g','inf',3,'Warriors behind the turf wall',`Attacked the column from prepared cover on the hillside.`,{0:[80,60,'hide'],1:[200,150,'hide'],2:[200,170]}),
    U('ge_wood','g','spr',3,'Warriors in the forest',`Struck the column from the woods along its length.`,{0:[300,60,'hide'],1:[300,150,'hide'],2:[300,184]}),
    U('ge_bog','g','spr',2,'Warriors on the bog side',`Cut off escape across the marsh.`,{0:[100,330,'hide'],1:[110,260,'hide'],2:[110,236]}),
    U('ge_arm','g','cmd',1,'Arminius',`A Cherusci noble, Roman citizen and former Roman officer.`,{0:[40,60],1:[60,150],2:[150,160]}),
    U('ro_17','t','hvy',3,'Legion XVII',`Marching in column through the forest.`,{0:[340,320],1:[300,212],2:[300,212,'ko']}),
    U('ro_18','t','hvy',3,'Legion XVIII',`In the middle of a column kilometres long.`,{0:[300,340],1:[200,206],2:[200,206,'ko']}),
    U('ro_19','t','hvy',3,'Legion XIX',`At the head of the column.`,{0:[260,360],1:[100,196],2:[100,196,'ko']}),
    U('ro_bag','t','truck',2,'Baggage train and civilians',`Wagons, families and servants, mixed into the column.`,{0:[360,340],1:[350,214],2:[350,214,'ko']}),
    U('ro_cav','t','cav',2,'Roman cavalry',`Tried to break away and was caught.`,{0:[380,300],1:[240,212],2:[20,200,'exit']}),
    U('ro_varus','t','cmd',1,'Varus',`An experienced administrator who trusted Arminius despite warnings.`,{0:[320,300],1:[250,214],2:[250,214,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['td',340,320,360,240,300,212]]},
    {a:[['g',200,150,200,196],['g',300,150,300,202],['g',110,260,110,206],['g',60,150,96,186]]}
  ],
  decisions:[
    {when:'Late summer, AD 9', title:'Lure the legions',
     ctx:`Varus is about to lead his army back to winter quarters near the Rhine. You are with him as a trusted ally.`,
     q:`How do you bring the legions to battle on your terms?`,
     opts:[
       {t:`Lead an open revolt and fight Varus in the field`, s:0, fb:`In open battle, three formed legions would very likely crush you.`, alt:{u:{ge_wall:[200,300], ge_wood:[260,310], ro_17:[230,330], ro_18:[200,340]}, a:[['g',80,60,160,200,200,292]]}},
       {t:`Report an uprising in a remote area so Varus detours through difficult country, then leave to gather allies`, s:3, fb:`A trusted insider can choose the route. The detour takes the army into forest and bog where its formations cannot work.`},
       {t:`Attack the legions in their summer camp`, s:0, fb:`A fortified Roman camp is very hard to storm, even by a much larger force.`}],
     result:`Arminius reports a local uprising and suggests Varus deal with it on the way to winter quarters. Varus agrees. Arminius then leaves, saying he will gather allied warriors. The Roman column marches into the forest, strung out for kilometres, in heavy rain.`,
     why:`Arminius used his inside knowledge and Varus's trust to choose the battlefield.`,
     tv:`Varus had been warned by another Germanic noble, Segestes, that Arminius was plotting. He dismissed it as a feud between rivals.`},
    {when:'The march', title:'Where to strike',
     ctx:`The Roman column is stretched out over several kilometres, mixed with wagons and civilians, soaked by rain. Ahead, the track narrows between a wooded hill and a great bog.`,
     q:`When and where do you strike?`,
     opts:[
       {t:`Attack the head of the column as soon as it enters the forest`, s:1, fb:`The rest of the column could close up and form a defensive position.`},
       {t:`Wait until the column is squeezed between hill and bog, then attack all along its length from behind a prepared wall`, s:3, fb:`On the narrow track the legions cannot form a line, cannot escape and cannot support each other.`},
       {t:`Attack their night camp`, s:1, fb:`Roman marching camps were fortified every night. Attacking one plays to their strengths.`}],
     result:`Over several days of running battle, warriors strike the column from the woods and from behind a turf wall along the hillside. The legions cannot form up, and the column breaks apart. Varus and most of his army are killed. The cavalry tries to escape and is caught.`}
  ],
  debrief:{
    title:'Fight where their system cannot work',
    outcome:`Three legions are destroyed, one of the worst defeats in Roman history. Rome never permanently conquers Germany east of the Rhine. The emperor Augustus is said to have been haunted by the loss for the rest of his life.`,
    why:`Arminius knew the Roman system from the inside and chose terrain, timing and weather where it could not function.`,
    them:`Varus treated the region as already pacified, marched with civilians and baggage, and ignored a clear warning about Arminius.`,
    board:{h:`Fight where their system cannot work, and heed the warnings`, b:`From Arminius's side: a powerful system has conditions it needs. Remove them and it fails. From Varus's side: the person who knows your playbook best is the most dangerous if their loyalty changes. Warnings that sound like office politics are sometimes real.`, try:`Ask: what conditions does our process need to work? Then ask: who outside the team knows those conditions well?`},
    principles:['ground','deceive','goatpath']
  }
});

/* ===== 19. KURSK ===== */
PGD.add({
  n:19, id:'kursk', name:'Kursk', year:'1943', place:'Southern Russia', side:'g', you:'Marshal Georgy Zhukov', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Soviet Union', tab:'Soviets', name:'Soviet Central, Voronezh and Steppe Fronts', cmdr:'Marshal Zhukov with Generals Rokossovsky, Vatutin and Konev', str:'Well over a million men and thousands of tanks', eyes:'Through Soviet eyes'},
  t:{short:'Germany', name:'German Army Groups Center and South', cmdr:'Field Marshals von Manstein and Model (attacking forces)', str:'Several hundred thousand men and thousands of tanks', eyes:'Through German eyes'},
  brief:{
    hook:`You know where and roughly when the enemy will attack. What do you do with that knowledge?`,
    situation:`Spring 1943. After Stalingrad, the front line bulges westward around the city of Kursk. Germany is planning a summer offensive, Operation Citadel, to pinch off the bulge from north and south. Stalin is inclined to strike first.`,
    forces:`Two fronts inside the bulge and a large strategic reserve, the Steppe Front, behind it. Huge numbers of anti-tank guns, mines and engineers.`,
    enemy:`Germany's best armored divisions, including new Tiger and Panther tanks, massing north and south of the bulge.`,
    ground:`Open, rolling steppe with villages and ravines, good for tanks, but also good for digging belts of trenches, minefields and anti-tank strongpoints.`,
    supply:`Time is on your side: Soviet production is rising, and the Western Allies are preparing to land in Italy.`,
    intel:`Intelligence from several sources, including British intercepts passed on to Moscow and Soviet agents, points clearly at the Kursk bulge. The Germans keep postponing the attack while they wait for new tanks.`,
    objective:`Defeat the German offensive and then launch your own.`,
    notes:[`Attacking a prepared defense is far more costly than defending one.`,`Every week the Germans delay, you can dig deeper.`,`A reserve held back can turn a defensive win into an offensive one.`]
  },
  terrain(){
    let s=felt('#a3a679');
    s+=`<path d="M300 40 Q160 60 120 140 Q100 200 120 260 Q160 340 300 360" fill="none" stroke="#b5381f" stroke-width="3" stroke-dasharray="7 4" opacity=".7"/>`;
    s+=house(240,200)+house(250,206,'#8a3a2a')+house(246,192)+house(240,320)+house(160,46);
    s+=label(250,186,'Kursk',10)+label(150,30,'Orel',9)+label(250,340,'Belgorod',9)+label(280,290,'Prokhorovka',8)+label(360,200,'Steppe Front reserve',8,90);
    s+=compass(26,382);
    return s+end();
  },
  over(){ let c='<g class="ph" data-show="1 2">'; [0,1,2].forEach(k=>c+=`<path d="M300 ${60+k*16} Q${178+k*20} ${80+k*12} ${140+k*20} 150 Q${122+k*20} 200 ${140+k*20} 250 Q${178+k*20} ${322-k*12} 300 ${340-k*16}" fill="none" stroke="#5a4a35" stroke-width="1.6" stroke-dasharray="2 4" opacity=".65"/>`); return c+label(170,200,'Defense belts',8,-80)+'</g>'; },
  features:[
    {x:150,y:200,r:0,px:150,py:120,d:'M300 40 Q160 60 120 140 Q100 200 120 260 Q160 340 300 360',line:true,name:'The Kursk bulge',why:`A salient sticking into German lines. An obvious target, which is exactly why the Soviets could predict the attack.`},
    {x:190,y:200,r:40,px:200,py:240,name:'Defense belts',why:`Several lines of trenches, minefields and anti-tank strongpoints, many kilometres deep.`},
    {x:360,y:200,r:30,name:'Steppe Front',why:`A large reserve held back to stop any breakthrough and to lead the counterattack.`}
  ],
  units:[
    U('so_cen','g','inf',3,'Central Front (Rokossovsky)',`Held the northern face of the bulge.`,{0:[200,110],1:[200,110],2:[150,70]}),
    U('so_vor','g','inf',3,'Voronezh Front (Vatutin)',`Held the southern face, where the German attack went deepest.`,{0:[200,290],1:[230,280],2:[220,310]}),
    U('so_belts','g','art',3,'Anti-tank strongpoints',`Guns, mines and trenches arranged in deep belts.`,{0:[170,200],1:[180,200],2:[180,200]}),
    U('so_steppe','g','arm',3,'Steppe Front (reserve)',`Held back east of the bulge.`,{0:[360,200],1:[300,270],2:[260,330]}),
    U('so_zhukov','g','cmd',1,'Zhukov',`Argued for defending first, then counterattacking.`,{0:[340,120]}),
    U('ge_model','t','arm',3,'9th Army (Model), north',`Attacked from the north. Gained only a few kilometres.`,{0:[150,30],1:[180,80],2:[130,20,'exit']}),
    U('ge_hoth','t','arm',3,'4th Panzer Army, south',`Attacked from the south with the strongest panzer forces.`,{0:[220,380],1:[250,300],2:[240,390,'exit']}),
    U('ge_kempf','t','arm',2,'Army Detachment Kempf',`Protected the eastern flank of the southern attack.`,{0:[300,390],1:[300,330],2:[310,392,'exit']}),
    U('ge_cmd','t','cmd',1,'Erich von Manstein',`Commanded the southern attack and had argued for striking earlier, before Soviet defenses were ready.`,{0:[180,390]})
  ],
  states:[
    {a:[]},
    {a:[['t',150,30,170,70,180,84],['t',220,380,240,320,250,304],['t',300,390,300,336]]},
    {a:[['g',200,110,160,80,150,72],['g',300,270,280,310,262,326],['g',230,280,224,306]]}
  ],
  decisions:[
    {when:'Spring 1943', title:'Strike first or defend?',
     ctx:`Intelligence makes it clear Germany will attack the Kursk bulge. Stalin and some generals want to launch a preemptive offensive.`,
     q:`What do you recommend?`,
     opts:[
       {t:`Launch a preemptive offensive before the Germans are ready`, s:1, fb:`Attacking German armor in the open has cost the Red Army dearly before. You would give up the advantage of a prepared defense.`, alt:{u:{so_cen:[170,40], so_vor:[220,370]}, a:[['g',200,110,170,50],['g',200,290,220,362]]}},
       {t:`Build defenses in depth, let them attack and wear down, then counterattack with a strong reserve`, s:3, fb:`If you know where the blow will fall, you can make the enemy pay for every metre, then strike when they are exhausted.`},
       {t:`Pull out of the bulge to shorten the line`, s:1, fb:`It avoids the trap but gives up ground for nothing, and the Germans could attack elsewhere.`}],
     result:`The Soviets build several defense belts, kilometres deep, with huge numbers of mines and anti-tank guns, and hold the Steppe Front in reserve. The German attack begins on 5 July. In the north it gains only a few kilometres; in the south it pushes deeper before stalling, including a huge tank battle near Prokhorovka on 12 July.`,
     why:`Intelligence turned an enemy attack into a trap. Every German delay to wait for new tanks gave the Soviets more weeks to dig.`,
     tv:`Hitler postponed Citadel several times, waiting for new tanks. Several German commanders feared the delay was letting the Soviets prepare. They were right.`},
    {when:'Mid-July 1943', title:'When to counterattack',
     ctx:`The German attacks have stalled after heavy losses. The Allies have landed in Sicily, and the Germans may need to send forces west.`,
     q:`When do you strike back?`,
     opts:[
       {t:`Wait until the Germans are completely exhausted and retreating`, s:1, fb:`Waiting lets them pull back in good order and reorganize.`},
       {t:`Counterattack now, starting with the German positions north of the bulge`, s:3, fb:`Striking while the enemy is off balance, with his reserves committed, magnifies the effect.`},
       {t:`Feed the reserve piecemeal into the gaps`, s:1, fb:`Using the reserve to patch the line wastes the one force that could turn defense into victory.`}],
     result:`On 12 July the Soviets attack the German positions around Orel, north of the bulge, and soon afterward in the south. Hitler calls off Citadel on 13 July, partly because of the Allied landing in Sicily. By August the Red Army has retaken Orel, Belgorod and Kharkov.`}
  ],
  debrief:{
    title:'If you know the attack is coming, make it pay',
    outcome:`Kursk is Germany's last major offensive on the Eastern Front. From here on, the initiative belongs to the Red Army, which advances west for the rest of the war.`,
    why:`The Soviets combined intelligence, patient preparation, depth and a reserve held for the counterattack.`,
    them:`German planners chose the most obvious target, then delayed until it was the most heavily fortified place on the front.`,
    board:{h:`If you know the attack is coming, prepare the ground`, b:`When you can see a competitor's move coming, a launch, a pitch or a price cut, the best response is often not to strike first but to make their move expensive, then counter when they are committed.`, try:`What move do you expect from your biggest competitor this year? List three ways to make it costly for them before it happens.`},
    principles:['intel','reserve','timing']
  }
});

/* ===== 20. BLENHEIM ===== */
PGD.add({
  n:20, id:'blenheim', name:'Blenheim', year:'1704', place:'Bavaria, Germany', side:'g', you:'the Duke of Marlborough', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Grand Alliance', tab:'Allies', name:'Allied army (Britain, the Dutch Republic, Austria and German states)', cmdr:'The Duke of Marlborough and Prince Eugene of Savoy', str:'About 52,000', eyes:'Through Allied eyes'},
  t:{short:'France and Bavaria', tab:'France', name:'French and Bavarian army', cmdr:'Marshal Tallard, Marshal Marsin and the Elector of Bavaria', str:'About 56,000', eyes:'Through French eyes'},
  brief:{
    hook:`The enemy expects you to march away. Instead you attack. But where?`,
    situation:`August 1704, the War of the Spanish Succession. France and Bavaria threaten Vienna, which could knock Austria out of the war. Marlborough has secretly marched his army about 400 km from the Netherlands to the Danube to join Prince Eugene. Now the combined army faces the French and Bavarians near the village of Blenheim.`,
    forces:`British, Dutch, Danish and German troops under Marlborough, and Austrian and German troops under Eugene. Experienced, well-supplied, and led by two commanders who trust each other.`,
    enemy:`A slightly larger French and Bavarian army in a strong position behind a marshy stream, the Nebel, with its right on the Danube at Blenheim and its center held mainly by cavalry.`,
    ground:`The Nebel stream and its marshes run across the front. Blenheim village anchors the French right on the Danube. Oberglau and Lutzingen hold the center and left.`,
    supply:`The French believe the Allies are short of supplies and about to withdraw.`,
    intel:`Tallard does not expect you to attack across the stream. His infantry is concentrated in the villages and his center relies on cavalry.`,
    objective:`Destroy the French and Bavarian army and save Vienna.`,
    notes:[`Villages make strong defensive positions, and attract more defenders when attacked.`,`The center behind the stream looks strong but is thin on infantry.`,`Cavalry and infantry together can do what neither can alone.`]
  },
  terrain(){
    let s=felt('#8fa064');
    s+=river('M0 372 Q200 360 400 380',20)+river('M200 0 Q190 120 205 200 Q215 300 196 372',6);
    s+=`<path d="M190 0 Q182 120 196 200 Q206 300 188 372 L208 372 Q224 300 214 200 Q200 120 210 0 Z" fill="#7f9a72" opacity=".6"/>`;
    s+=house(270,320)+house(282,326,'#8a3a2a')+house(276,312)+house(260,330)+house(266,176)+house(276,182,'#8a3a2a')+house(260,60)+house(270,66,'#8a3a2a');
    s+=label(270,302,'Blenheim',10)+label(270,160,'Oberglau',9)+label(270,44,'Lutzingen',9)+label(200,392,'Danube',10)+label(176,240,'Nebel stream',8,-86);
    s+=compass(26,26);
    return s+end();
  },
  features:[
    {x:200,y:200,r:0,px:180,py:120,d:'M200 0 Q190 120 205 200 Q215 300 196 372',line:true,name:'The Nebel',why:`A marshy stream across the front. Tallard thought it would make an attack too difficult.`},
    {x:272,y:320,r:26,name:'Blenheim village',why:`The French right, on the Danube. Attacks here drew in far more French infantry than needed.`},
    {x:280,y:240,r:30,name:'The French center',why:`Held mainly by cavalry, with few infantry, between Blenheim and Oberglau.`}
  ],
  units:[
    U('al_cutts','g','inf',3,'Cutts\'s attack on Blenheim',`British infantry who attacked the village repeatedly, pinning its huge garrison.`,{0:[120,320],1:[230,320],2:[234,320]}),
    U('al_inf','g','inf',3,'Allied infantry (center)',`Crossed the Nebel and formed up with the cavalry.`,{0:[120,240],1:[170,240],2:[270,240]}),
    U('al_cav','g','cav',3,'Allied cavalry (center)',`Broke through the French center in the late afternoon.`,{0:[100,200],1:[180,210],2:[310,230]}),
    U('al_eugene','g','cav',2,'Prince Eugene\'s wing',`Held the Elector and Marsin in the north in fierce fighting.`,{0:[100,70],1:[180,70],2:[220,70]}),
    U('al_marl','g','cmd',1,'Marlborough',`Directed the battle personally and led the decisive attack in the center.`,{0:[80,260],1:[160,262],2:[250,260]}),
    U('fr_blen','t','inf',3,'French infantry in Blenheim',`More and more battalions were crammed in, until they could barely move.`,{0:[280,320],1:[276,322],2:[276,322,'ko']}),
    U('fr_cav','t','cav',3,'Tallard\'s cavalry (center)',`Held the center, with few infantry to support it.`,{0:[290,240],1:[290,240],2:[330,250,'ko']}),
    U('fr_ober','t','inf',2,'Oberglau garrison',`Held the village between the center and the left.`,{0:[270,180],2:[300,170]}),
    U('fr_marsin','t','inf',3,'Marsin and the Elector',`Fought Eugene in the north, then withdrew.`,{0:[280,70],2:[392,50,'exit']}),
    U('fr_tallard','t','cmd',1,'Marshal Tallard',`Captured at the end of the battle.`,{0:[320,270],2:[330,270,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['g',120,320,226,320],['g',120,240,166,240],['g',100,200,176,210],['g',100,70,176,70]]},
    {a:[['g',180,210,250,220,306,230],['g',170,240,266,240],['g',180,70,216,70]]}
  ],
  decisions:[
    {when:'Midday, 13 August', title:'How to begin',
     ctx:`Tallard was surprised that you attacked at all. His infantry holds the villages; his center behind the stream is mostly cavalry.`,
     q:`Where do you open the attack?`,
     opts:[
       {t:`Attack the center straight away`, s:1, fb:`Crossing the stream under fire with the villages on both flanks intact would be very costly.`, alt:{u:{al_inf:[230,240,'ko'], al_cav:[220,210]}, a:[['g',120,240,226,240]]}},
       {t:`Launch fierce attacks on Blenheim village to pin it, so Tallard packs it with infantry`, s:3, fb:`A loud threat at the village draws defenders there, away from the center where you plan to strike.`},
       {t:`Attack only the northern wing with Eugene`, s:1, fb:`Eugene's wing was the weaker part of the army. It could pin the enemy there, but not win alone.`}],
     result:`British infantry storm toward Blenheim again and again. The French commander in the village calls in more and more battalions, until the village holds a huge garrison packed so tightly it can barely fight. Meanwhile Allied troops cross the Nebel in the center.`,
     why:`Each attack on Blenheim cost Marlborough relatively few men but tied up a large share of the French infantry.`,
     tv:`To the French, Blenheim looked like the main Allied target. Reinforcing it seemed the natural response.`},
    {when:'Late afternoon', title:'The center is thin',
     ctx:`Your troops have crossed the Nebel in the center. Blenheim's garrison is packed in and pinned. Eugene is holding in the north.`,
     q:`What do you do now?`,
     opts:[
       {t:`Keep assaulting Blenheim until it falls`, s:1, fb:`Its garrison is now so large that storming it would be very costly, and it is already doing nothing useful for the French.`},
       {t:`Hold Blenheim's garrison in place with fewer troops and break the French center with cavalry and infantry together`, s:3, fb:`Pinned defenders cannot help the center. Cavalry backed by infantry can break a center made of cavalry alone.`},
       {t:`Pull back across the Nebel before dark`, s:0, fb:`You throw away a battle at the moment it is ready to be won.`}],
     result:`Marlborough launches his cavalry, supported by infantry, against the French center. It breaks. Tallard is captured. The garrison in Blenheim, cut off and surrounded, surrenders that evening.`}
  ],
  debrief:{
    title:'Pin them where they feel threatened, win where they are thin',
    outcome:`The French and Bavarian army loses around 30,000 men, including many thousands captured, among them Marshal Tallard. Bavaria is knocked out of the war and Vienna is saved. It is France's first major defeat in decades.`,
    why:`Marlborough used a secret, long-distance march to arrive where he was not expected, then pinned the enemy's infantry in a village and broke a thin center with combined arms.`,
    them:`Tallard expected the Allies to withdraw. When attacked, he reinforced the place under loudest attack rather than the place most at risk.`,
    board:{h:`Pin them where they feel threatened`, b:`A loud threat can draw a competitor's best resources to the wrong place. Marlborough spent a little at Blenheim to tie up a lot, then won in the center. Know which of your moves is the real one and which is the noise.`, try:`For your next competitive move, decide what the noise is and what the real move is. Make sure your team knows the difference.`},
    principles:['economy','mass','combined']
  }
});
