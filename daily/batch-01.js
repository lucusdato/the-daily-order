/* Daily battles 1 to 10 */

/* ===== 1. COWPENS ===== */
PGD.add({
  n:1, id:'cowpens', name:'Cowpens', year:'1781', place:'South Carolina', side:'g', you:'Daniel Morgan', minutes:8,
  face:{g:1,t:-1},
  g:{short:'Americans', name:'American force', cmdr:'Brigadier General Daniel Morgan', str:'About 1,000 Continentals, militia and cavalry', eyes:'Through American eyes'},
  t:{short:'British', name:'British and Loyalist force', cmdr:'Lieutenant Colonel Banastre Tarleton', str:'About 1,100 infantry, dragoons and two light guns', eyes:'Through British eyes'},
  brief:{
    hook:`Your shakiest troops are the ones the enemy expects to run. Can you turn that into a trap?`,
    situation:`January 1781. In the Carolinas the British have been winning. General Nathanael Greene has split his small army and sent you west to harass the enemy. Cornwallis has sent Banastre Tarleton, his most aggressive commander, to hunt you down. Tarleton has marched through the night. You have stopped at a cattle pasture called the Cowpens to fight.`,
    forces:`About 1,000 men: a few hundred tough Continental regulars from Maryland and Delaware, experienced Virginia riflemen, a larger body of Carolina and Georgia militia, and a small cavalry force under William Washington.`,
    enemy:`About 1,100 men: British Legion infantry and dragoons, light infantry, the 71st Highlanders and two small cannon. Disciplined and confident, but tired from an all-night march.`,
    ground:`A gently rolling open pasture with scattered trees and two low rises. The Broad River lies a few miles behind you, so there is no easy road to run away on. Open ground suits Tarleton's dragoons.`,
    supply:`Neither side can stay long. Tarleton is far ahead of Cornwallis's main army. Your militia drifted in overnight and could melt away if things go badly.`,
    intel:`Tarleton always attacks fast and head-on. He has routed militia many times and expects them to run again. Militia, without bayonets, really do tend to break when charged by regulars.`,
    objective:`Destroy Tarleton's force. That would strip Cornwallis of his light troops and his best cavalry.`,
    notes:[`Militia shoot well but will not stand against a bayonet charge.`,`Tarleton attacks immediately, without much scouting.`,`The enemy is tired and hungry. Make them work for every yard.`]
  },
  terrain(){
    let s=felt('#93a463');
    s+=river('M0 16 Q200 34 400 12',14);
    s+=road('M120 400 Q180 250 200 140 Q210 60 230 0');
    s+=hill(200,142,74,24,3)+hill(232,70,62,22,3);
    s+=trees(101,26,[10,390,40,390],(x,y)=>Math.abs(x-200)>90||y>300,['#3b6b2b','#4b7a35','#557f3b']);
    s+=label(110,40,'Broad River, a few miles back',9)+label(300,150,'First rise',9)+label(320,76,'Second rise',9)+label(140,370,'Road from the south',9,-62);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:200,y:142,r:40,px:270,py:132,name:'The first rise',why:`Where Morgan put his Continentals. A gentle slope gives the defenders a small edge and hides what is behind.`},
    {x:232,y:70,r:36,px:300,py:64,name:'The second rise',why:`Hides the cavalry reserve and gives a fallback spot for the main line.`},
    {x:200,y:16,px:90,py:24,d:'M0 16 Q200 34 400 12',line:true,name:'The river behind you',why:`With a river at their backs, militia had no easy escape route. Morgan reportedly said that was the point.`},
    {x:200,y:250,r:60,px:150,py:300,name:'Open pasture',why:`Few obstacles. Good for dragoons, but also gives your riflemen clear shots at officers.`}
  ],
  units:[
    U('a_rifles','g','inf',2,'Sharpshooters',`Experienced riflemen sent forward to pick off officers and then fall back.`,{0:[176,212],1:[200,262],2:[140,170],3:[148,232]}),
    U('a_militia','g','inf',3,'Militia (Pickens)',`Carolina and Georgia militia. Good shots, no bayonets, likely to run if charged.`,{0:[214,170],1:[200,205],2:[118,112],3:[124,252]}),
    U('a_cont','g','hvy',3,'Continentals (Howard)',`Maryland and Delaware regulars plus veteran Virginians. The only troops able to stand against a bayonet charge.`,{0:[190,122],1:[200,140],2:[206,96],3:[206,214]}),
    U('a_cav','g','cav',2,'Washington\'s cavalry',`A small mounted force, kept hidden behind the second rise.`,{0:[262,72],1:[262,62],3:[292,252]}),
    U('a_morgan','g','cmd',1,'Daniel Morgan',`A tough frontier veteran who personally walked the lines the night before, explaining the plan.`,{0:[236,112],1:[238,118],2:[238,90],3:[236,176]}),
    U('t_inf','t','inf',3,'British infantry',`Legion infantry and light infantry, trained to finish battles with the bayonet.`,{0:[190,370],1:[196,300],2:[200,152],3:[204,250,'ko']}),
    U('t_71','t','hvy',2,'71st Highlanders',`Tarleton's reserve, sent in to turn the American right.`,{0:[250,386],1:[260,330],2:[262,166],3:[262,262,'ko']}),
    U('t_drag','t','cav',2,'British Legion dragoons',`Feared cavalry. In the end most refused to charge and fled.`,{0:[130,360],1:[120,300],2:[110,134],3:[40,388,'exit']}),
    U('t_art','t','art',1,'Two light guns',`Small cannon nicknamed grasshoppers. Captured at the end.`,{0:[170,380],1:[178,322],3:[178,322,'ko']}),
    U('t_tarleton','t','cmd',1,'Banastre Tarleton',`Young, fast and aggressive, with a string of victories over militia.`,{0:[222,392],1:[230,336],3:[396,396,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['g',200,256,198,292],['g',200,200,196,288],['t',196,300,200,270]]},
    {a:[['gd',200,205,150,160,124,118],['t',200,280,200,162],['t',112,300,100,200,112,138],['gd',200,140,205,102]]},
    {a:[['g',206,102,206,208],['g',262,62,322,160,292,244],['g',118,112,100,200,124,246]]}
  ],
  decisions:[
    {when:'Before dawn', title:'Deploy your militia',
     ctx:`Your troops are fed and rested. Scouts say Tarleton will arrive at first light. You must decide where the militia stand.`,
     q:`Militia shoot well but run from a bayonet charge. Where do you put them?`,
     opts:[
       {t:`In the main line beside the Continentals, to make it as strong as possible`, s:1, fb:`Their volleys add firepower, but when the bayonets close the militia will likely break and take the Continental flank with them.`, alt:{u:{a_militia:[150,140], a_cont:[236,140], t_inf:[184,174]}, a:[['t',196,300,186,184]]}},
       {t:`In front: fire two volleys at the officers, then fall back around the left to the rear`, s:3, fb:`This asks the militia to do only what militia do well and turns their expected retreat into part of the plan. Tarleton will see a rout and charge into your real line.`},
       {t:`In reserve behind the hill, out of the fight`, s:1, fb:`Safe, but you throw away hundreds of rifles. Your Continentals face Tarleton alone and outnumbered.`, alt:{u:{a_militia:[200,58]}, a:[]}}],
     result:`Morgan forms three lines. Sharpshooters in front pick off officers and fall back. The militia under Andrew Pickens fire two volleys, many aimed at officers, then file off around the American left. Tarleton, seeing what looks like the usual militia rout, sends his whole line forward.`,
     why:`Morgan built the plan around his troops' real limits and his opponent's real habits. Each line weakened and disordered the British before they reached the next.`,
     tv:`Tarleton saw militia firing and running, exactly as militia always had. He ordered an immediate advance to finish them before they could reform.`},
    {when:'About 7:30 a.m.', title:'The line starts moving backward',
     ctx:`The British reach your Continentals. Tarleton throws in the 71st Highlanders toward your right. An order to turn one company to face them is misunderstood, and your whole main line starts walking backward in good order. The British, sensing victory, rush after it and lose their formation.`,
     q:`Your main line is retreating, but in good order. The British are surging after it in a disorganized crowd. What do you do?`,
     opts:[
       {t:`Stop the retreat immediately and fight where they stand`, s:1, fb:`Halting a line mid-movement under pressure causes confusion, and the Highlanders are already curling around your right.`, alt:{u:{a_cont:[200,150], t_71:[240,148]}, a:[['t',260,320,250,230,242,156]]}},
       {t:`Let them fall back to the next rise, then turn and fire at close range`, s:3, fb:`The accidental retreat has pulled the British into a headlong, disordered rush. A sudden volley at close range against men who think they have won is devastating.`},
       {t:`Throw in your hidden cavalry now`, s:0, fb:`Committing the cavalry before the British are stopped wastes your surprise, and Tarleton's dragoons are still fresh to meet it.`, alt:{u:{a_cav:[160,206]}, a:[['g',262,62,180,130,162,200]]}}],
     result:`Morgan picks a spot on the next rise and tells the Continentals to turn and fire on his signal. At close range, perhaps 30 metres, they turn and fire a crushing volley into the onrushing British, who are scattered and out of breath.`,
     why:`A controlled retreat followed by a sudden stop turned the British momentum against them.`,
     tv:`The British thought they were chasing beaten men. When the line turned and fired at point-blank range, their formation broke.`},
    {when:'Minutes later', title:'Close the trap',
     ctx:`The British are stunned and disordered. Your cavalry is waiting behind the second rise. The militia have reformed behind your left. Tarleton still has dragoons in reserve.`,
     q:`How do you finish this?`,
     opts:[
       {t:`Hold your ground and let the British pull back`, s:0, fb:`They regroup and fight another day. Destroying Tarleton's force was the whole point.`, alt:{u:{t_inf:[200,330], t_71:[260,344]}, a:[['td',200,154,200,320]]}},
       {t:`Bayonet charge, with cavalry hitting one flank and the militia the other`, s:3, fb:`A double envelopment: the British are hit from the front and both sides at once, with no time to recover.`},
       {t:`Send only the cavalry after them`, s:1, fb:`The cavalry does damage, but the infantry, still bunched together, can fight its way out.`, alt:{u:{a_cav:[204,300]}, a:[['g',262,62,250,200,206,290]]}}],
     result:`The Continentals charge with bayonets. Washington's cavalry sweeps around one flank and Pickens's reformed militia hit the other. Most of the British infantry surrender within minutes. Tarleton's dragoons refuse to charge, and he escapes with a small group.`}
  ],
  debrief:{
    title:'A trap built from weakness',
    outcome:`In under an hour Tarleton's force is destroyed. By common counts about 870 British are killed, wounded or captured, against about 150 American casualties. Cornwallis loses his light troops and much of his cavalry, and his pursuit of Greene drags him north toward Virginia, and eventually Yorktown.`,
    why:`Morgan treated his militia's weakness as a known fact and designed around it. He also turned Tarleton's habit of fast frontal attacks against him. Every line was meant to give way; only the last one had to hold.`,
    them:`Tarleton later blamed his troops. But he had marched them all night, attacked without scouting, and assumed militia would behave as they always had.`,
    board:{h:`Design the plan around your team's real strengths`, b:`Morgan did not ask militia to be regulars. He asked for two good volleys, then let them leave. Plans fail when they assume abilities people do not have. Ask each person for what they do best, and make their known limits part of the design.`, try:`For your next project, write down what each team member reliably does well and badly. Assign roles from that list, not from titles.`},
    principles:['habits','fit','flank']
  }
});

/* ===== 2. SALAMIS ===== */
PGD.add({
  n:2, id:'salamis', name:'Salamis', year:'480 BC', place:'Greece', side:'g', you:'Themistocles', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Greeks', name:'Greek allied fleet', cmdr:'Themistocles of Athens; Eurybiades of Sparta in overall command', str:'About 370 triremes', eyes:'Through Greek eyes'},
  t:{short:'Persians', name:'Persian fleet', cmdr:'King Xerxes I', str:'Several hundred warships, perhaps 600 or more', eyes:'Through Persian eyes'},
  brief:{
    hook:`Athens is burning and your allies want to sail away. You need the enemy to fight you in exactly one place.`,
    situation:`September 480 BC, weeks after Thermopylae. The Persian army has burned Athens, whose people have fled to the island of Salamis. The Greek fleet is anchored in the narrow channel between Salamis and the mainland. Many allied commanders, especially from the Peloponnese, want to pull back to defend the Isthmus of Corinth.`,
    forces:`About 370 triremes, the largest group Athenian, heavier and less nimble than the best Persian ships. Crews are motivated: their families are on the island behind them.`,
    enemy:`A much larger fleet, with skilled Phoenician and Ionian crews. In open water its numbers and seamanship would let it surround the Greeks.`,
    ground:`The channel between Salamis and the mainland is narrow and crowded with islands. Big fleets cannot spread out in it, and ships that enter in columns arrive a few at a time.`,
    supply:`The sailing season is ending. Xerxes needs a decisive win soon or his huge army must go home before winter. The Greek alliance may break up within days.`,
    intel:`Xerxes believes the Greeks are divided and likely to scatter. He is not wrong: the allies really are arguing about leaving.`,
    objective:`Fight the Persian fleet in the narrows, where its numbers cannot be used, and destroy enough of it to break the invasion.`,
    notes:[`In open water, more ships win.`,`In a narrow channel, only the front ranks fight.`,`Your allies will not stay forever. You must force the battle soon.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M120 0 H400 V262 Q360 252 330 222 Q290 192 260 172 Q220 152 190 122 Q160 92 132 62 Q118 32 120 0 Z');
    s+=land('M0 60 Q40 70 80 100 Q120 140 160 180 Q200 212 240 250 Q270 292 280 342 Q250 382 200 400 H0 Z');
    s+=`<circle cx="306" cy="300" r="11" fill="#8fa765" stroke="#e6d6a2" stroke-width="2"/>`;
    s+=mtn(262,112,22)+mtn(300,90,18);
    s+=label(300,40,'Attica (mainland)',11)+label(70,300,'Salamis island',11)+label(258,74,'Mt. Aigaleo',9)+label(330,322,'Psyttaleia',8)+label(360,380,'Bay of Phaleron',9)+label(150,150,'The narrows',10,-48)+label(52,30,'Bay of Eleusis',9);
    s+=compass(380,24);
    return s+end();
  },
  features:[
    {x:170,y:150,px:160,py:132,d:'M100 60 L300 290',line:true,name:'The narrows',why:`Only a small part of a big fleet could fight here at once, which cancelled the Persian numbers.`},
    {x:360,y:360,r:34,name:'Bay of Phaleron',why:`Open water where the Persian fleet waited. Fighting here would have favored the bigger fleet.`},
    {x:306,y:300,r:16,px:330,py:300,name:'Psyttaleia',why:`A small island at the channel mouth. Xerxes landed troops on it to catch shipwrecked Greeks; they were wiped out instead.`},
    {x:262,y:104,r:20,name:'Mt. Aigaleo',why:`Xerxes watched from a throne on these slopes, which put pressure on his captains to press forward into the crush.`}
  ],
  units:[
    U('gr_fleet','g','gal',3,'Greek fleet (main body)',`Heavier triremes built to ram, not to out-maneuver.`,{0:[150,150]}),
    U('gr_ath','g','gal',2,'Athenian squadron',`The largest contingent, fighting in sight of their evacuated city.`,{0:[195,190]}),
    U('gr_west','g','gal',1,'Corinthian squadron',`Sailed off at the start, possibly to guard the western channel.`,{0:[60,87]}),
    U('gr_them','g','cmd',1,'Themistocles',`The Athenian commander who built the fleet and pushed for battle in the narrows.`,{0:[100,143]}),
    U('gr_hopl','g','hvy',2,'Athenian hoplites',`Soldiers waiting on Salamis. Late in the battle they crossed to Psyttaleia.`,{0:[150,253]}),
    U('pe_fleet','t','gal',3,'Persian fleet (Phoenicians)',`Skilled crews in fast ships, the core of the Persian navy.`,{0:[350,340]}),
    U('pe_ion','t','gal',3,'Persian fleet (Ionians)',`Greek-speaking subjects of Persia, also skilled sailors.`,{0:[310,376]}),
    U('pe_egy','t','gal',2,'Egyptian squadron',`Sent around Salamis overnight to block the western exit.`,{0:[380,370]}),
    U('pe_psy','t','spr',1,'Troops on Psyttaleia',`Landed to kill or capture Greek sailors washed ashore.`,{0:[380,300,'off']}),
    U('pe_xerxes','t','cmd',1,'Xerxes',`Watched from Mt. Aigaleo, with scribes noting which captains fought well.`,{0:[380,180]})
  ],
  states:[
    {a:[]},
    {a:[['td',360,350,330,300,304,280],['td',340,320,200,400,34,240]]},
    {a:[['td',300,276,250,240,226,214],['g',110,130,140,150,150,156],['g',150,170,180,210,192,212]]}
  ],
  decisions:[
    {when:'The night before', title:'Make them come in',
     ctx:`The allied council is about to vote to withdraw to the Isthmus. If the fleet sails away, the alliance probably breaks up. If it fights in open water, the Persians will likely win.`,
     q:`How do you get the battle you want?`,
     opts:[
       {t:`Withdraw to the Isthmus of Corinth with the other allies`, s:0, fb:`The alliance splits, the refugees on Salamis are abandoned, and the Persians can fight you later in open water.`, alt:{u:{gr_fleet:[60,392], gr_ath:[90,392]}, a:[['gd',110,130,40,260,60,384]]}},
       {t:`Attack the Persian fleet in the open bay`, s:0, fb:`Out in open water, more and faster ships can surround you. You would be fighting on their terms.`, alt:{u:{gr_fleet:[320,330], gr_ath:[300,350]}, a:[['g',110,130,260,250,316,324]]}},
       {t:`Send a secret message to Xerxes saying the Greeks are about to flee`, s:3, fb:`If Xerxes believes it, he will block the exits and attack into the narrows. That traps your wavering allies into fighting where numbers do not count.`}],
     result:`Themistocles sends a trusted servant, Sicinnus, to Xerxes with a message: the Greeks are divided and about to escape. Xerxes orders his fleet to block the exits overnight and lands troops on Psyttaleia. By dawn the Greeks are trapped, and the argument about leaving is over.`,
     why:`The message worked because it told Xerxes something he already believed, and it was half true.`,
     tv:`Xerxes wanted a decisive battle before winter and had reason to think the Greeks would scatter. Blocking the exits looked like a way to catch them all.`},
    {when:'Dawn', title:'Battle in the straits',
     ctx:`The Persian ships have been rowing all night. Now they push into the narrow channel in long columns, crowded together, with Xerxes watching from the hill.`,
     q:`How do you fight?`,
     opts:[
       {t:`Rush out to meet them in the wider mouth of the strait`, s:1, fb:`You meet them where they can still spread out, giving back part of the advantage of the narrows.`, alt:{u:{gr_fleet:[260,270], gr_ath:[290,300]}, a:[['g',110,130,200,200,256,266]]}},
       {t:`Back water to draw them deeper, then ram into their crowded flank`, s:3, fb:`The deeper they come, the more crowded they get. Heavy Greek triremes ramming into packed ships is exactly the fight you want.`},
       {t:`Stay at anchor and defend the beach`, s:0, fb:`Ships at anchor cannot ram. You give up the initiative and let them pick their moment.`}],
     result:`The Greek ships first back water toward Salamis, then surge forward and ram the leading Persian ships. The crowded Persian lines cannot turn; damaged ships collide with the ones pushing in behind. By evening the Persian fleet has lost heavily and the troops on Psyttaleia have been wiped out.`}
  ],
  debrief:{
    title:'The trap was a rumor',
    outcome:`Persian losses are heavy, perhaps around 200 ships by ancient estimates, against roughly 40 Greek. Xerxes returns to Asia with much of his army. The following year the Greeks defeat the Persian army left behind at Plataea.`,
    why:`Themistocles chose an arena where Persian numbers did not matter, then got the enemy to enter it voluntarily by feeding them a story they wanted to believe.`,
    them:`Xerxes had won every round so far and had good reason to think the Greek alliance was falling apart. His captains, fighting under his eyes, pressed forward into the crush rather than pull back.`,
    board:{h:`Get the competitor to choose your arena`, b:`The best battlefield is useless if the other side will not fight there. Themistocles combined two moves: picking the narrows, and creating a reason for Persia to come in. Strategy often needs both a good position and a reason for the other side to engage on it.`, try:`Name the arena where you would win. Then write down what would make your competitor want to enter it.`},
    principles:['ground','deceive','force']
  }
});

/* ===== 3. TANNENBERG ===== */
PGD.add({
  n:3, id:'tannenberg', name:'Tannenberg', year:'1914', place:'East Prussia', side:'g', you:'the German high command', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Germany', name:'German 8th Army', cmdr:'Paul von Hindenburg and Erich Ludendorff, with staff officer Max Hoffmann', str:'About 150,000 men', eyes:'Through German eyes'},
  t:{short:'Russia', name:'Russian 1st and 2nd Armies', cmdr:'Generals Rennenkampf (1st) and Samsonov (2nd)', str:'Two armies, together far larger than yours', eyes:'Through Russian eyes'},
  brief:{
    hook:`Two enemy armies are closing on you from two directions. You can only fight one at a time.`,
    situation:`August 1914, the first month of the First World War. Germany has sent most of its army west against France. In East Prussia, one German army faces two Russian armies: Rennenkampf's from the east and Samsonov's from the south. They are separated by a belt of lakes and forests. Your previous commander wanted to retreat and was replaced.`,
    forces:`One army of four corps plus cavalry, with an excellent railway network behind it.`,
    enemy:`Two Russian armies, each roughly as big as yours. Their commanders are said to dislike each other, and their supply and communications are poor.`,
    ground:`The Masurian Lakes split the two Russian armies, making it hard for them to support each other quickly. Your railways let you move whole corps in a day or two.`,
    supply:`Russian railways stop at the border because of a different track gauge, so their armies are short of supplies and slow. Yours are fed and moved by rail.`,
    intel:`The Russians are sending many of their orders by radio without code. Your listeners can read where each Russian corps will march tomorrow.`,
    objective:`Destroy one Russian army before the other can help it.`,
    notes:[`Interior lines: you are between them, so you can switch faster than they can combine.`,`You know their orders. Use that certainty to take risks.`,`Leaving one army lightly watched is a gamble that depends on its commander staying slow.`]
  },
  terrain(){
    let s=felt('#8ca064');
    [[250,140,26,14],[276,176,20,24],[240,206,30,12],[290,236,18,14],[226,250,16,10],[300,130,14,10]].forEach(e=>s+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#5d9bc0" stroke="#e6d6a2" stroke-width="1.5"/>`);
    s+=trees(201,40,[120,330,120,300],(x,y)=>true,['#2f5a24','#3b6b2b']);
    ['M50 40 L340 64','M50 40 L96 300','M96 300 L320 330'].forEach(d=>s+=`<path d="${d}" stroke="#4a3b2b" stroke-width="3" fill="none"/><path d="${d}" stroke="#d8c596" stroke-width="1.2" stroke-dasharray="3 4" fill="none"/>`);
    s+=house(50,40)+house(60,46,'#8a3a2a')+house(180,300);
    s+=label(60,24,'Königsberg',9)+label(270,110,'Masurian Lakes',10)+label(196,320,'Allenstein area',9)+label(360,30,'From Russia',9)+label(200,392,'From Russian Poland',9)+label(190,54,'Railway',8);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:262,y:190,r:60,px:262,py:190,name:'The Masurian Lakes',why:`A belt of lakes and forest between the two Russian armies, making it slow for them to help each other.`},
    {x:96,y:200,px:80,py:200,d:'M50 40 L96 300 L320 330',line:true,name:'German railways',why:`Let the Germans move a whole corps around the battlefield in a day or two. Interior lines on rails.`},
    {x:330,y:80,r:30,name:'Rennenkampf\'s army',why:`Advancing slowly from the east after an earlier clash. The question is whether it will come south in time.`}
  ],
  units:[
    U('de_I','g','inf',3,'I Corps (François)',`Moved by rail to the far southwest to hit Samsonov's left flank.`,{0:[300,96],1:[92,296],2:[176,368]}),
    U('de_XVII','g','inf',3,'XVII Corps (Mackensen)',`Marched south from facing Rennenkampf to hit Samsonov's right.`,{0:[262,70],1:[232,176],2:[262,300]}),
    U('de_IR','g','inf',2,'I Reserve Corps',`Followed XVII Corps south.`,{0:[222,82],1:[204,166],2:[236,282]}),
    U('de_XX','g','inf',3,'XX Corps',`Held the center against Samsonov's main push.`,{0:[170,254],1:[170,240],2:[188,236]}),
    U('de_cav','g','cav',2,'Cavalry screen',`A thin screen left facing Rennenkampf, to watch and delay.`,{0:[312,120],1:[318,108]}),
    U('de_hq','g','cmd',1,'Hindenburg and Ludendorff',`Arrived to take command, adopting a plan already prepared by Hoffmann.`,{0:[80,120]}),
    U('ru_1','t','inf',3,'Russian 1st Army',`Rennenkampf's army, advancing slowly from the east.`,{0:[352,60],1:[340,80],2:[330,92]}),
    U('ru_2c','t','inf',3,'2nd Army center',`Samsonov's main body, pushing north into the trap.`,{0:[180,360],1:[180,286],2:[198,280,'ko']}),
    U('ru_2r','t','inf',2,'2nd Army right wing',`Separated from the center as the army advanced.`,{0:[250,370],1:[250,300],2:[244,316,'ko']}),
    U('ru_2l','t','inf',2,'2nd Army left wing',`Hit by François and driven back, exposing the center.`,{0:[120,370],1:[124,320],2:[140,350,'ko']}),
    U('ru_sams','t','cmd',1,'General Samsonov',`Commanded the 2nd Army. His communications broke down as the trap closed.`,{0:[180,392],1:[184,330],2:[196,350,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['g',300,96,100,120,94,286],['g',262,70,250,120,234,168],['t',180,360,180,294]]},
    {a:[['g',92,296,130,360,172,362],['g',232,176,262,240,262,292],['g',170,240,190,256]]}
  ],
  decisions:[
    {when:'23 to 25 August', title:'Which army do you fight?',
     ctx:`Your listeners have intercepted uncoded Russian orders. Rennenkampf is moving slowly. Samsonov is pushing north from the south. You cannot fight both at full strength.`,
     q:`What do you do with your army?`,
     opts:[
       {t:`Retreat behind the Vistula River and wait for reinforcements`, s:0, fb:`This is what your previous commander wanted. It gives up East Prussia and lets the two Russian armies join.`, alt:{u:{de_I:[40,200], de_XVII:[50,160], de_XX:[60,240]}, a:[['gd',170,254,90,240,62,240]]}},
       {t:`Concentrate everything against Rennenkampf in the north`, s:1, fb:`A head-on fight with one army while Samsonov marches into your rear. Even a win would be slow and costly.`, alt:{u:{de_XX:[300,150], ru_2c:[180,250]}, a:[['g',170,254,250,200,298,154],['t',180,360,180,258]]}},
       {t:`Leave only cavalry facing Rennenkampf, rail I Corps south, and march the rest against Samsonov`, s:3, fb:`A calculated gamble, made possible by the intercepts: you know Rennenkampf is not hurrying.`}],
     result:`The Germans leave a thin cavalry screen in the north. I Corps is moved by rail to the far southwest, while XVII Corps and I Reserve Corps march south. Rennenkampf, as the intercepts suggested, does not hurry.`,
     why:`Knowing the enemy's moves turned a reckless gamble into a calculated one.`,
     tv:`Russian commanders lacked codebooks and trained cipher staff in the right places, so orders went out in the clear. Rennenkampf believed the Germans were retreating and saw no reason to rush.`},
    {when:'26 to 29 August', title:'Close the ring',
     ctx:`Samsonov's center is pushing north and denting XX Corps. Your other corps are in position on both of his flanks.`,
     q:`How do you strike Samsonov?`,
     opts:[
       {t:`Reinforce the center and stop him head-on`, s:1, fb:`You might halt him, but his army escapes to fight again, and Rennenkampf gets more time.`, alt:{u:{de_XVII:[196,226], de_I:[150,240]}, a:[['g',232,176,210,210,198,224]]}},
       {t:`Hit both flanks and close behind him while the center holds`, s:3, fb:`The deeper Samsonov pushes into the center, the easier it is to close the ring behind him.`},
       {t:`Wait until Rennenkampf's intentions are clearer`, s:0, fb:`Waiting throws away the window your intelligence created. The Russians may realize the danger.`}],
     result:`I Corps smashes the Russian left and swings behind the army. XVII Corps and I Reserve Corps close in from the northeast. The Russian 2nd Army is surrounded in the forests and broken up.`}
  ],
  debrief:{
    title:'Reading their mail',
    outcome:`About 92,000 Russians are captured and tens of thousands more killed or wounded, against far lighter German losses. Within weeks the Germans turn on Rennenkampf and drive him out of East Prussia at the Masurian Lakes.`,
    why:`The Germans combined interior lines, fast rail movement and near-perfect intelligence to beat two armies one at a time. Their real edge was knowing exactly how much risk they could take.`,
    them:`The two Russian armies had poor supply, weak communications and commanders who did not coordinate. Each moved as if the other would handle its own problems.`,
    board:{h:`Use the information your competitor broadcasts`, b:`The Russians announced their moves without meaning to. Competitors do the same through job postings, earnings calls, case studies and conference talks. Information that is publicly available but rarely read can be a decisive advantage.`, try:`Spend 30 minutes this week reading what your main competitor has published lately. Write down three things it reveals about their next move.`},
    principles:['intel','interior','economy']
  }
});

/* ===== 4. HASTINGS ===== */
PGD.add({
  n:4, id:'hastings', name:'Hastings', year:'1066', place:'England', side:'g', you:'William of Normandy', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Normans', name:'Norman army', cmdr:'Duke William of Normandy', str:'Perhaps 7,000 to 10,000: archers, infantry and mounted knights', eyes:'Through Norman eyes'},
  t:{short:'English', name:'English army', cmdr:'King Harold Godwinson', str:'Perhaps 7,000 to 8,000, almost all on foot', eyes:'Through English eyes'},
  brief:{
    hook:`The enemy is on a ridge behind a wall of shields, and every frontal attack bounces off.`,
    situation:`14 October 1066. You have crossed the Channel to claim the English throne. Harold has just beaten a Norwegian invasion in the north at Stamford Bridge and raced south. His army now holds a ridge on the road to London, shields locked in a wall.`,
    forces:`A mixed army: archers and crossbowmen, armored infantry, and mounted knights in three divisions (Bretons on the left, Normans in the center, French and Flemish on the right).`,
    enemy:`Housecarls, professional warriors with big axes, form the core of the shield wall, backed by the fyrd, local levies with less training. Almost no archers or cavalry.`,
    ground:`The English hold the top of a ridge with marshy ground on its flanks. You must attack uphill.`,
    supply:`You are in hostile country with the sea at your back. A long standoff favors Harold, who can gather more troops.`,
    intel:`Harold's men are tired from two forced marches and a big battle. As long as the shield wall holds unbroken, it is extremely hard to beat.`,
    objective:`Break the shield wall and win the crown in a single day.`,
    notes:[`Arrows shot uphill mostly hit shields.`,`A shield wall is strong only while it stays on the ridge and stays closed.`,`Your knights cannot charge up a slope into a solid wall of axes.`]
  },
  terrain(){
    let s=felt('#8ca05e');
    s+=`<path d="M40 150 Q200 100 360 150 L360 170 Q200 128 40 170 Z" fill="rgba(255,250,225,.16)" stroke="rgba(50,40,20,.35)"/>`;
    s+=hill(200,140,170,40,3);
    s+=trees(41,30,[0,400,0,80],()=>true,['#2f5a24','#3b6b2b']);
    [[40,230,40,26],[360,230,40,26]].forEach(e=>s+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#6f8a5a" stroke="#5d9bc0" stroke-width="1.5" stroke-dasharray="3 3"/>`);
    s+=road('M200 0 L200 400');
    s+=label(200,96,'Senlac Ridge',11)+label(40,270,'Marsh',9)+label(360,270,'Marsh',9)+label(200,20,'Road to London',9)+label(200,392,'Road to Hastings',9);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:200,y:140,r:0,px:300,py:120,d:'M40 150 Q200 100 360 150',line:true,name:'Senlac Ridge',why:`The English line ran along the top. Attackers had to climb, and arrows mostly hit shields.`},
    {x:40,y:230,r:40,name:'Marsh on the flanks',why:`Wet ground on both ends of the ridge made it hard to go around. It had to be a frontal fight.`},
    {x:200,y:230,r:44,name:'The slope',why:`Anyone who chased down this slope left the safety of the wall and ended up on open ground, where cavalry could reach them.`}
  ],
  units:[
    U('n_arch','g','arch',3,'Archers and crossbowmen',`Shot at the shield wall all day. Most arrows hit shields, until they began shooting high.`,{0:[200,280],1:[200,270],2:[200,240]}),
    U('n_inf','g','hvy',3,'Norman infantry',`Armored foot soldiers who led the first attacks up the slope.`,{0:[200,300],1:[200,300],2:[200,196]}),
    U('n_bret','g','cav',2,'Breton division',`The left wing. It broke and fled early, which changed the battle.`,{0:[110,320],1:[120,250],2:[120,200]}),
    U('n_cav','g','cav',3,'Norman knights',`The center's mounted knights, used to cut down Englishmen who left the wall.`,{0:[200,340],1:[150,230],2:[220,170]}),
    U('n_fr','g','cav',2,'French and Flemish knights',`The right wing.`,{0:[290,320],1:[290,300],2:[290,200]}),
    U('n_will','g','cmd',1,'William',`Rode along the line during the battle to show he was alive.`,{0:[240,360],1:[160,262],2:[240,250]}),
    U('e_wall','t','hvy',3,'Housecarls (center)',`Professional warriors with long axes. The heart of the shield wall.`,{0:[200,130],2:[200,140,'ko']}),
    U('e_wall_l','t','hvy',2,'Shield wall (west)',`Part of the line along the ridge.`,{0:[120,140],2:[130,150,'ko']}),
    U('e_wall_r','t','hvy',2,'Shield wall (east)',`Part of the line along the ridge.`,{0:[280,140],2:[270,150]}),
    U('e_fyrd','t','spr',3,'The fyrd',`Local levies. Brave, but less disciplined. Some chased the fleeing Bretons down the hill.`,{0:[150,112],1:[120,226,'ko'],2:[120,226,'ko']}),
    U('e_harold','t','cmd',1,'King Harold',`Fought under his banners on the ridge. Killed late in the day.`,{0:[206,100],2:[206,106,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['td',110,320,100,280,114,258],['t',150,112,130,180,120,220],['g',200,340,170,280,152,236]]},
    {a:[['g',200,280,200,170],['gd',120,250,110,270],['g',200,300,200,200],['g',290,300,280,210]]}
  ],
  decisions:[
    {when:'Midday', title:'The left wing breaks',
     ctx:`All morning your archers, infantry and knights have attacked up the slope and failed. Now your Breton division on the left breaks and runs. Part of the English line rushes down the hill after it. A rumor spreads through your army that you have been killed.`,
     q:`What do you do?`,
     opts:[
       {t:`Ride along the line, lift your helmet to show your face, and turn your knights on the English who left the ridge`, s:3, fb:`You stop the panic and punish the English who left the safety of the wall. They are on open ground now, where knights can reach them.`},
       {t:`Pull the whole army back to regroup`, s:0, fb:`A general withdrawal while a rumor of your death is spreading could turn into a real rout.`, alt:{u:{n_inf:[200,370], n_cav:[200,390], n_arch:[200,350]}, a:[['gd',200,300,200,360]]}},
       {t:`Ignore the left and send fresh troops straight up the center`, s:1, fb:`The center is still the strongest part of the wall, and the English who chased the Bretons get away with their victory.`, alt:{u:{n_cav:[200,160]}, a:[['g',200,340,200,170]]}}],
     result:`William rides among his men and pushes back his helmet so they can see he is alive. The Norman knights turn on the Englishmen who had chased the Bretons down the slope and cut them down on the open ground.`,
     why:`The moment the English left their wall, they lost the advantage that had held all morning.`,
     tv:`For the fyrd, chasing a fleeing enemy looked like victory. Without cavalry of their own, they could not protect men who left the ridge.`},
    {when:'Afternoon', title:'Thin the wall',
     ctx:`You have just learned that the English will leave the ridge when they think you are running. The wall is still there, but it is thinner and tired.`,
     q:`How do you break it?`,
     opts:[
       {t:`Keep up head-on attacks until it cracks`, s:1, fb:`It may work eventually, but it is costly, and daylight is running out.`},
       {t:`Stage retreats to draw more of them down the slope, and have archers shoot high so arrows fall behind the shields`, s:3, fb:`Combining tricks keeps the defenders off balance: each pretend retreat costs them men, and arrows dropping from above hit those who keep their shields forward.`},
       {t:`Wait for them to come down and attack you`, s:0, fb:`Harold has no reason to leave a strong position. Time and reinforcements are on his side.`}],
     result:`According to Norman chroniclers, William's knights stage several pretend retreats, each one drawing more English down the slope to be cut off. Archers shoot high so their arrows fall on the men behind the shields. Late in the afternoon Harold is killed, possibly by an arrow (the accounts differ), and the English line collapses.`}
  ],
  debrief:{
    title:'Turn an accident into a method',
    outcome:`Harold and his brothers are killed and the English army breaks. William is crowned King of England on Christmas Day 1066. Norman rule transforms English government, language and law.`,
    why:`William learned from a near-disaster in the middle of the battle and turned it into a technique. His mix of archers, infantry and cavalry gave him options the English, almost all on foot, did not have. Historians still debate how deliberate the later retreats were.`,
    them:`Harold had fought a major battle and marched about 400 kilometres in under three weeks. Some advisers urged him to wait and gather more troops. He chose to fight quickly, on a strong position, and nearly won.`,
    board:{h:`Turn an accident into a method`, b:`The first retreat was real and nearly lost the battle. William noticed what it revealed, that the enemy would leave its strong position to chase, and repeated it on purpose. The best lessons often come from things that went wrong in the middle of the work.`, try:`Look at a recent near-miss. What did it reveal about how your competitor or client reacts? Could you use that deliberately?`},
    principles:['combined','habits','timing']
  }
});

/* ===== 5. DIEN BIEN PHU ===== */
PGD.add({
  n:5, id:'dienbienphu', name:'Dien Bien Phu', year:'1954', place:'Northwest Vietnam', side:'g', you:'General Vo Nguyen Giap', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Viet Minh', name:'Viet Minh People\'s Army', cmdr:'General Vo Nguyen Giap', str:'About 50,000 combat troops, plus tens of thousands of porters', eyes:'Through Viet Minh eyes'},
  t:{short:'French', name:'French Union garrison', cmdr:'Colonel Christian de Castries, under General Henri Navarre', str:'About 11,000 at the start, later reinforced', eyes:'Through French eyes'},
  brief:{
    hook:`Your staff has an attack ready for tonight. The question is whether you should launch it.`,
    situation:`January 1954, late in the war over French rule in Indochina. The French have built a fortified base in a remote valley at Dien Bien Phu, supplied by air, hoping to lure your army into a set-piece battle where their firepower will crush it. You have surrounded the valley.`,
    forces:`Four infantry divisions and a heavy division of artillery and anti-aircraft guns, supplied by a huge network of porters, bicycles and trucks over mountain tracks.`,
    enemy:`A strong garrison in a ring of fortified strongpoints around an airstrip, with artillery, tanks flown in by parts, and aircraft. French commanders believe you cannot bring heavy guns to the surrounding hills.`,
    ground:`The French hold the valley floor. You hold the forested hills around it on every side. Whoever controls the airstrip controls French supply.`,
    supply:`Your supply line is hundreds of kilometres of mountain trail carried largely by people. The French supply line is the airstrip.`,
    intel:`Your attack has been set for 25 January, but not all your guns are in place, the French have strengthened their defences, and intercepted radio traffic suggests they know the attack time.`,
    objective:`Destroy the garrison at Dien Bien Phu.`,
    notes:[`The French plan depends on the airstrip.`,`They think artillery cannot reach the hills.`,`A failed first assault would be very hard to recover from.`]
  },
  terrain(){
    let s=felt('#9aa56a');
    s+=`<path d="M60 70 Q200 40 340 70 Q370 200 330 340 Q200 380 70 340 Q30 200 60 70 Z" fill="rgba(255,240,200,.18)"/>`;
    s+=river('M228 0 Q214 120 226 220 Q236 320 220 400',6);
    s+=`<rect x="186" y="120" width="12" height="180" rx="2" fill="#c9b789" stroke="#6b5838"/><path d="M192 126 V294" stroke="#fff" stroke-dasharray="6 6" stroke-width="1"/>`;
    [[20,40],[60,16],[120,10],[200,8],[280,10],[340,18],[384,44],[392,120],[390,200],[386,280],[370,350],[300,390],[200,394],[110,388],[30,350],[12,270],[10,190],[14,110]].forEach((p,i)=>s+=mtn(p[0],p[1]+22,20+(i%3)*5,'#b9b08f'));
    s+=trees(5,40,[0,400,0,400],(x,y)=>{const dx=(x-200)/170,dy=(y-205)/170;return dx*dx+dy*dy>0.85;},['#2f5a24','#3b6b2b','#2a4f20']);
    s+=label(170,112,'Airstrip',9,-90)+label(244,330,'Nam Yum River',8,-80)+label(200,48,'Gabrielle',9)+label(300,100,'Béatrice',9)+label(290,210,'Dominique, Éliane',8)+label(110,210,'Huguette',9)+label(210,372,'Isabelle',9);
    s+=compass(26,26);
    return s+end();
  },
  features:[
    {x:192,y:210,r:0,px:170,py:150,d:'M186 120 h12 v180 h-12 Z',name:'The airstrip',why:`The garrison's lifeline. Once artillery closed it, everything had to be parachuted in, and much of it fell into Viet Minh lines.`},
    {x:300,y:200,r:0,px:340,py:250,d:'M60 70 Q200 40 340 70 Q370 200 330 340 Q200 380 70 340 Q30 200 60 70 Z',name:'The ring of hills',why:`The Viet Minh held the high ground on every side, looking down into the valley.`},
    {x:300,y:110,r:24,name:'Béatrice and Gabrielle',why:`Isolated northern strongpoints that covered the airstrip. The first targets.`},
    {x:210,y:360,r:22,name:'Isabelle',why:`The southern strongpoint, kilometres from the main position and hard to support.`}
  ],
  units:[
    U('v_art','g','art',3,'Artillery on the forward slopes',`Dismantled and hauled up by hand, then dug into camouflaged emplacements facing the valley.`,{0:[340,30,'off'],1:[318,110],2:[300,140]}),
    U('v_aa','g','art',2,'Anti-aircraft guns',`Made every supply flight dangerous and forced drops from higher altitude.`,{0:[60,40,'off'],1:[80,90],2:[110,110]}),
    U('v_308','g','inf',3,'Division 308',`An elite division, part of the ring around the valley.`,{0:[90,140],1:[96,150],2:[140,180]}),
    U('v_312','g','inf',3,'Division 312',`Assaulted Béatrice on the opening night.`,{0:[340,100],1:[318,124],2:[290,160]}),
    U('v_316','g','inf',3,'Division 316',`Fought for the eastern hills, Dominique and Éliane.`,{0:[350,240],1:[330,236],2:[280,230]}),
    U('v_supply','g','truck',2,'Porters and supply columns',`Tens of thousands of porters with bicycles and carrying poles kept the army supplied.`,{0:[380,370],1:[350,330],2:[330,320]}),
    U('v_giap','g','cmd',1,'Vo Nguyen Giap',`A former history teacher who became the Viet Minh's top commander.`,{0:[60,330]}),
    U('f_bea','t','inf',1,'Béatrice',`Northeastern strongpoint, held by a Foreign Legion battalion.`,{0:[296,106],1:[296,106,'ko']}),
    U('f_gab','t','inf',1,'Gabrielle',`Northern strongpoint covering the airstrip.`,{0:[200,62],1:[200,62,'ko']}),
    U('f_dom','t','inf',2,'Dominique and Éliane',`Hill strongpoints east of the river, fought over for weeks.`,{0:[262,210],2:[262,214,'ko']}),
    U('f_hug','t','inf',2,'Huguette and Claudine',`Strongpoints west of the airstrip.`,{0:[150,220],2:[156,230,'ko']}),
    U('f_isa','t','inf',1,'Isabelle',`The isolated southern position.`,{0:[210,350],2:[210,352,'ko']}),
    U('f_air','t','plane',2,'Air supply',`Transport aircraft landing on the strip, later only dropping supplies by parachute.`,{0:[192,200],1:[230,60],2:[230,60,'exit']}),
    U('f_cmd','t','cmd',1,'Colonel de Castries',`Commanded the garrison in its central bunker.`,{0:[206,240],2:[206,244,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['g',318,110,306,108],['g',318,124,302,112],['g',318,110,250,140,200,74],['g',96,150,170,190,190,206]]},
    {a:[['g',300,140,240,180,212,232],['g',140,180,160,210],['g',280,230,264,214],['g',300,140,250,260,214,340]]}
  ],
  decisions:[
    {when:'25 January 1954', title:'Attack tonight?',
     ctx:`Your staff has prepared a fast, all-out assault for tonight. Not all of your artillery has arrived. The French have reinforced their positions, and your radio interceptors believe they know the attack time.`,
     q:`Do you launch the assault?`,
     opts:[
       {t:`Attack tonight as planned: fast strike, fast victory`, s:0, fb:`Infantry charging fortified positions without full artillery support, against an enemy who expects you, could be a massacre that ruins your army.`, alt:{u:{v_308:[160,200,'ko'], v_312:[280,130,'ko']}, a:[['g',96,150,150,196],['g',340,100,286,124]]}},
       {t:`Call it off. Finish hauling the guns into hidden positions and plan a slower, methodical siege`, s:3, fb:`Giap later called this the hardest decision of his career. It cost time and morale, but it meant attacking only when every advantage was in place.`},
       {t:`Bypass the valley and push into Laos instead`, s:1, fb:`It avoids a costly assault, but it leaves the French base intact and gives up the chance for a decisive blow.`, alt:{u:{v_308:[20,200], v_316:[30,260]}, a:[['gd',96,150,40,190]]}}],
     result:`Giap cancels the January assault and pulls his troops back. Over the next six weeks, his men drag guns up through the jungle by hand and dig them into camouflaged emplacements on the slopes facing the valley. On 13 March they open fire. Béatrice falls in a single night and Gabrielle soon after. Shells close the airstrip.`,
     why:`By waiting, Giap turned a gamble into a near-certainty. The French had not believed heavy guns could be hidden on the slopes above them.`,
     tv:`French commanders were confident their artillery and aircraft would destroy any guns the Viet Minh managed to bring up. They were shocked by how many guns appeared and how well they were hidden.`},
    {when:'March to May 1954', title:'Strangle the base',
     ctx:`The airstrip is closed. The French now depend on parachute drops, which your anti-aircraft guns make dangerous. Your infantry has taken heavy losses in mass attacks on the hill strongpoints.`,
     q:`How do you finish the siege?`,
     opts:[
       {t:`Keep launching mass assaults until the base falls`, s:1, fb:`It might work, but at a terrible cost in lives, and failed attacks could break your army's morale.`},
       {t:`Dig trenches forward toward each strongpoint, cut off the drop zones and take positions one by one`, s:3, fb:`Trenches let your infantry approach under cover. Every metre gained shrinks the area the French can drop supplies into.`},
       {t:`Pull back and wait for the French to run out of supplies`, s:1, fb:`The French could still receive some airdrops, and time also gives them a chance at outside help or reinforcement.`}],
     result:`Viet Minh soldiers dig a network of trenches toward the French positions, cutting the garrison into shrinking islands. Supply drops increasingly land in Viet Minh lines. On 7 May 1954 the garrison stops fighting.`}
  ],
  debrief:{
    title:'They said the guns could not get there',
    outcome:`More than 10,000 French Union troops are taken prisoner, and many die in captivity. Viet Minh losses are also very heavy. The defeat ends French rule in Indochina at the Geneva Conference later that year.`,
    why:`Giap won through logistics and patience: moving guns and supplies by hand over impossible terrain, then refusing to attack until he was ready. The French plan rested on an assumption about what the enemy could not do.`,
    them:`The French chose the valley expecting to fight on their terms, with air supply and superior firepower. They underestimated the Viet Minh's ability to move heavy weapons and to sustain a long siege.`,
    board:{h:`Never assume the competitor cannot do the hard thing`, b:`The French built their whole plan on a belief that the Viet Minh could not get artillery into the hills. Many business plans rest on a similar line: they will never match our distribution, our scale, our relationships. And Giap's other lesson: the patience to call off an attack you are not ready for.`, try:`List the assumptions your strategy makes about what competitors cannot do. Pick one and ask: what would it take for them to do it anyway?`},
    principles:['logistics','timing','ground']
  }
});

/* ===== 6. LEUTHEN ===== */
PGD.add({
  n:6, id:'leuthen', name:'Leuthen', year:'1757', place:'Silesia, today\'s Poland', side:'g', you:'Frederick the Great', minutes:6,
  face:{g:1,t:-1},
  g:{short:'Prussia', name:'Prussian army', cmdr:'King Frederick II (Frederick the Great)', str:'About 35,000', eyes:'Through Prussian eyes'},
  t:{short:'Austria', name:'Austrian army', cmdr:'Prince Charles of Lorraine and Field Marshal Daun', str:'About 65,000', eyes:'Through Austrian eyes'},
  brief:{
    hook:`You are outnumbered almost two to one, and you have to attack anyway.`,
    situation:`December 1757, the Seven Years' War. Austria has retaken most of Silesia, Prussia's richest province. If you do not win it back before winter, it is probably lost for good. The Austrian army has formed a long line, several kilometres long, near the village of Leuthen.`,
    forces:`About 35,000 well-drilled troops who can march and change formation faster than any army in Europe. You know this ground well from peacetime exercises.`,
    enemy:`About 65,000 men in a long, thin line facing west. Confident, and inclined to think your small army will not dare attack.`,
    ground:`Rolling country with low hills between the two armies. Those hills can hide a marching column from the Austrian line.`,
    supply:`Winter is coming. Neither army wants to campaign for long, but time favors Austria, who holds the province.`,
    intel:`The Austrian line is long and its parts are slow to support each other. Its far left (the southern end) is held partly by allied German troops.`,
    objective:`Defeat the Austrian army and recover Silesia.`,
    notes:[`You cannot win a straight fight along the whole line.`,`The low hills can hide your army's movements.`,`A long line takes a long time to turn and face a new threat.`]
  },
  terrain(){
    let s=felt('#9ba478')+`<rect width="400" height="400" fill="url(#snow)"/>`;
    s+=`<path d="M130 30 Q150 120 140 200 Q130 280 150 370" fill="none" stroke="rgba(50,40,20,.28)" stroke-width="30" stroke-linecap="round" opacity=".5"/>`;
    [[140,70,22,40],[140,180,20,46],[140,300,22,50]].forEach(h=>s+=hill(h[0],h[1],h[2],h[3],2));
    s+=house(250,200)+house(262,206,'#8a3a2a')+house(256,192)+house(270,330)+house(262,60);
    s+=trees(17,10,[300,390,0,400],()=>true,['#3b5f2d']);
    s+=label(140,22,'Low hills screen the march',8)+label(290,192,'Leuthen',10)+label(300,330,'Sagschütz',9)+label(296,56,'Nippern',9);
    s+=compass(382,384);
    return s+end();
  },
  features:[
    {x:140,y:200,r:0,px:110,py:200,d:'M130 30 Q150 120 140 200 Q130 280 150 370',line:true,name:'The screening hills',why:`Low hills that hid the Prussian army as it marched south to the Austrian left.`},
    {x:270,y:200,r:0,px:300,py:250,d:'M262 40 L262 360',line:true,name:'The long Austrian line',why:`Several kilometres long and facing west. Hard to turn quickly to meet an attack on one end.`},
    {x:270,y:330,r:24,name:'The Austrian left',why:`The southern end of the line, the weakest point, where Frederick struck.`},
    {x:252,y:200,r:22,name:'Leuthen village',why:`Where the Austrians tried to form a new line facing south.`}
  ],
  units:[
    U('p_adv','g','cav',2,'Advance guard (the feint)',`Pushed toward the Austrian right at the start to draw attention north.`,{0:[80,140],1:[150,60],2:[150,60]}),
    U('p_inf1','g','inf',3,'First line of infantry',`Struck the Austrian left in echelon, each battalion slightly behind the one beside it.`,{0:[70,190],1:[230,332],2:[248,214]}),
    U('p_inf2','g','inf',3,'Second line of infantry',`Followed up to keep the pressure on.`,{0:[50,210],1:[200,350],2:[228,240]}),
    U('p_art','g','art',2,'Heavy guns',`Fortress guns brought along and dragged into position to fire on the Austrian flank.`,{0:[60,230],1:[196,310],2:[206,234]}),
    U('p_cav','g','cav',3,'Cavalry reserve (Driesen)',`Kept back behind a rise on the left flank until the decisive moment.`,{0:[40,170],1:[110,170],2:[220,152]}),
    U('p_fred','g','cmd',1,'Frederick',`Knew this ground from peacetime maneuvers and personally directed the march.`,{0:[40,240],1:[170,300]}),
    U('a_right','t','inf',3,'Austrian right',`The northern end of the line, which the feint drew reinforcements toward.`,{0:[262,60],1:[262,70]}),
    U('a_center','t','inf',3,'Austrian center',`Strung out along the line, slow to turn south.`,{0:[262,170],1:[262,200],2:[256,200,'ko']}),
    U('a_left','t','inf',2,'Austrian left',`Holding the southern end near Sagschütz.`,{0:[270,320],1:[274,334,'ko']}),
    U('a_res','t','inf',3,'Austrian reserve',`Sent north toward the feint, away from where the blow fell.`,{0:[300,230],1:[300,90],2:[290,170]}),
    U('a_cav','t','cav',2,'Austrian cavalry (Lucchesi)',`Tried to hit the Prussian flank late in the day.`,{0:[300,130],1:[300,130],2:[236,170,'ko']}),
    U('a_charles','t','cmd',1,'Prince Charles of Lorraine',`Commanded the Austrian army.`,{0:[320,200],2:[360,210,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['gd',80,140,150,64],['g',70,190,110,300,226,330],['t',300,230,300,96]]},
    {a:[['g',230,332,248,220],['g',110,170,180,140,226,154],['t',300,130,240,168]]}
  ],
  decisions:[
    {when:'Morning, 5 December', title:'Where do you strike?',
     ctx:`The Austrians stand in a long line across your path, facing west. You have about half their numbers.`,
     q:`How do you attack?`,
     opts:[
       {t:`Attack straight ahead along the whole line`, s:0, fb:`A frontal attack by a much smaller army across the whole front invites disaster.`, alt:{u:{p_inf1:[220,180,'ko'], p_inf2:[220,220]}, a:[['g',70,190,220,182]]}},
       {t:`Feint at their right, march the army south behind the hills, and hit their left in echelon`, s:3, fb:`The feint pulls attention and reserves north while your main force appears on the far end of their line, where they are weakest.`},
       {t:`Dig in and wait for them to attack you`, s:1, fb:`Austria holds Silesia and winter is coming. The Austrians have no reason to attack.`}],
     result:`Prussian cavalry pushes toward the Austrian right, and the Austrian commanders send reserves north. Meanwhile Frederick's main army marches south behind the low hills, out of sight, and appears at the southern end of the Austrian line. The battalions attack in echelon, each slightly behind the one beside it, and roll up the Austrian left.`,
     why:`Frederick concentrated most of his army against one small part of theirs, at a moment and place they did not expect.`,
     tv:`Austrian officers saw columns disappear behind the hills and assumed the Prussians were retreating. The attack in the north looked like the real threat.`},
    {when:'Afternoon', title:'The Austrians turn at Leuthen',
     ctx:`The Austrians have swung part of their line around to face south at Leuthen village. Their cavalry under Lucchesi is moving to strike the exposed left flank of your advancing infantry.`,
     q:`What do you do?`,
     opts:[
       {t:`Halt and consolidate before dark`, s:1, fb:`You keep what you have, but the Austrian army survives to fight again with its larger numbers.`},
       {t:`Keep the infantry pressing on Leuthen, and launch your hidden cavalry into the flank of Lucchesi's attack`, s:3, fb:`Your reserve hits the enemy cavalry just as it commits to its own attack, when it is most exposed.`},
       {t:`Pull back west to safety`, s:0, fb:`Throwing away a battle you are winning would hand Silesia to Austria.`, alt:{u:{p_inf1:[110,300], p_inf2:[100,320]}, a:[['gd',230,332,120,304]]}}],
     result:`The Prussian infantry storms Leuthen village. As Lucchesi's cavalry charges, Driesen's Prussian cavalry, waiting behind a rise, smashes into its flank. The Austrian army breaks and flees as night falls.`}
  ],
  debrief:{
    title:'Concentrate where they are weakest, unseen',
    outcome:`Austrian losses are around 20,000 including many prisoners, against about 6,000 Prussian. Within weeks Frederick retakes most of Silesia.`,
    why:`A smaller, faster army hid its movements, struck one end of a long line with most of its strength, and kept a reserve for the counterattack it expected.`,
    them:`The Austrians held a strong position and had a big advantage in numbers. They read the feint as the main attack and assumed a small army would not risk an assault.`,
    board:{h:`Concentrate where they are weakest`, b:`Frederick did not fight the whole Austrian army. He fought one end of it with nearly everything he had. A smaller organization can beat a larger one by bringing most of its strength to bear on one client, one segment or one moment, where the larger one is thin.`, try:`Where is your biggest competitor spread thinnest? What would it take to bring most of your strength there for one quarter?`},
    principles:['mass','deceive','reserve']
  }
});

/* ===== 7. AIN JALUT ===== */
PGD.add({
  n:7, id:'ainjalut', name:'Ain Jalut', year:'1260', place:'Jezreel Valley, Galilee', side:'g', you:'Sultan Qutuz', minutes:5,
  face:{g:-1,t:1},
  g:{short:'Mamluks', name:'Mamluk army of Egypt', cmdr:'Sultan Qutuz, with Baybars commanding the vanguard', str:'Perhaps 15,000 to 20,000, mostly cavalry', eyes:'Through Mamluk eyes'},
  t:{short:'Mongols', name:'Mongol army', cmdr:'Kitbuqa', str:'Perhaps 10,000 to 20,000, with allied contingents', eyes:'Through Mongol eyes'},
  brief:{
    hook:`Your enemy has never really lost. Its favorite trick is the fake retreat.`,
    situation:`1260. The Mongols have destroyed Baghdad and taken Damascus. Their envoys demanded Egypt's surrender, and Qutuz had them killed. The main Mongol army has gone east after the death of the Great Khan, leaving a smaller force under the general Kitbuqa. You have marched north to meet it.`,
    forces:`Mamluk cavalry: slave-soldiers trained from youth as horse archers and armored lancers, many of them from the same steppe peoples as the Mongols. Plus some Syrian allies.`,
    enemy:`Mongol horse archers and lancers, masters of mobility and the feigned retreat, plus allied contingents.`,
    ground:`A broad valley near the spring of Ain Jalut, with hills and trees on both sides. Baybars knows this area well from his years in exile.`,
    supply:`You are fighting near your own territory. The Mongol force is a detachment far from its main army.`,
    intel:`The Mongol army facing you is smaller than the one that took Baghdad. Its commander is confident and aggressive.`,
    objective:`Defeat the Mongol army and stop the invasion of Egypt.`,
    notes:[`Your troops know Mongol tactics because many come from the same steppe tradition.`,`The hills can hide a large force.`,`A Mongol army that wins the first clash usually pursues.`]
  },
  terrain(){
    let s=felt('#b2aa6c');
    s+=`<path d="M0 0 H400 V90 Q300 120 200 110 Q100 100 0 130 Z" fill="#9b9064"/><path d="M0 400 H400 V310 Q300 290 200 300 Q100 310 0 280 Z" fill="#9b9064"/>`;
    [[60,60,20],[150,50,22],[260,40,20],[350,60,18],[60,350,22],[180,370,20],[300,360,22],[380,340,18]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#d8cfa8'));
    s+=trees(31,24,[0,140,90,320],(x,y)=>y<140||y>260,['#4b6b30','#3b5f2d']);
    s+=`<circle cx="300" cy="300" r="6" fill="#5d9bc0" stroke="#e6d6a2"/>`;
    s+=label(300,322,'Spring of Ain Jalut',8)+label(100,20,'Hills',9)+label(300,388,'Mt. Gilboa side',9)+label(220,210,'Open valley floor',10)+label(370,200,'From the east',8,90);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:60,y:200,r:0,px:40,py:200,d:'M0 90 L140 90 L140 320 L0 320 Z',name:'The wooded hills',why:`Trees and slopes where the main Mamluk army could wait out of sight.`},
    {x:220,y:210,r:60,name:'The valley floor',why:`Open ground suited to cavalry. A pursuing army here can be hit from the hills on both sides.`},
    {x:300,y:300,r:14,name:'The spring',why:`Water for horses on a hot September day, and the landmark that named the battle.`}
  ],
  units:[
    U('m_van','g','cav',2,'Baybars and the vanguard',`Rode out to provoke the Mongols and lead them back toward the hills.`,{0:[230,200],1:[120,200],2:[180,210]}),
    U('m_main','g','cav',3,'Main army (hidden)',`Waiting among the trees and slopes.`,{0:[70,200,'hide'],1:[150,200],2:[200,206]}),
    U('m_left','g','cav',2,'Left wing',`Hidden on the southern side of the valley.`,{0:[90,290,'hide'],1:[160,270],2:[220,250]}),
    U('m_right','g','cav',2,'Right wing',`Hidden on the northern side of the valley.`,{0:[90,120,'hide'],1:[160,140],2:[230,160]}),
    U('m_qutuz','g','cmd',1,'Qutuz',`The sultan, who reportedly threw down his helmet so his men could see him in the decisive moment.`,{0:[40,210],1:[110,220],2:[170,226]}),
    U('mo_main','t','cav',3,'Mongol main body',`Pursued the vanguard into the valley.`,{0:[350,200],1:[200,200],2:[226,206,'ko']}),
    U('mo_r','t','cav',2,'Mongol right wing',`Smashed the Mamluk left in a fierce counter-charge.`,{0:[350,250],1:[220,260],2:[250,256,'ko']}),
    U('mo_l','t','cav',2,'Mongol left wing',`Pushed into the valley on the north side.`,{0:[350,150],1:[220,150],2:[260,150,'ko']}),
    U('mo_allies','t','spr',2,'Allied contingents',`Troops from regional allies and subjects of the Mongols.`,{0:[380,210],1:[290,210],2:[392,240,'exit']}),
    U('mo_kit','t','cmd',1,'Kitbuqa',`An experienced Mongol general. Killed in the battle.`,{0:[380,190],1:[250,190],2:[240,196,'ko']})
  ],
  states:[
    {a:[]},
    {a:[['gd',230,200,120,200],['t',350,200,206,200],['g',90,120,130,130,156,140],['g',90,290,130,280,156,270]]},
    {a:[['g',110,220,170,222],['g',160,140,226,156],['g',160,270,218,252]]}
  ],
  decisions:[
    {when:'Morning, 3 September', title:'How do you fight the Mongols?',
     ctx:`The Mongol army is approaching up the valley. Your main force is in the wooded hills on the western end. Baybars and the vanguard are out in the open.`,
     q:`What is your plan?`,
     opts:[
       {t:`Meet them head-on in the open valley with the whole army`, s:1, fb:`A straight cavalry battle against the Mongols plays to their strengths in maneuver and archery.`, alt:{u:{m_main:[200,200], m_left:[200,260], m_right:[200,140]}, a:[['g',70,200,196,200]]}},
       {t:`Show only the vanguard, skirmish, then retreat toward the hills where your main army waits`, s:3, fb:`You use the Mongols' own favorite trick against them. Their instinct is to pursue a fleeing enemy.`},
       {t:`Hold a fortified camp and wait for them to come to you`, s:0, fb:`Mongols rarely attack a strong camp head-on. They can raid your supply lines and wait you out.`}],
     result:`Baybars's vanguard skirmishes for hours, then turns and flees. Kitbuqa's army pursues into the valley, and the hidden Mamluk wings and main army emerge from the hills on both sides.`,
     why:`The Mamluks knew Mongol habits because many of them came from the same steppe world, and Baybars knew the ground.`,
     tv:`To Kitbuqa, a fleeing vanguard looked like a beaten enemy. Mongol armies had chased and destroyed many fleeing armies before.`},
    {when:'The crisis', title:'The left wing is giving way',
     ctx:`The Mongols react fast. A ferocious counter-charge smashes into your left wing, which starts to buckle. Your army could unravel.`,
     q:`What do you do?`,
     opts:[
       {t:`Order a general retreat to save the army`, s:0, fb:`A retreat under Mongol pressure becomes a rout. They are the best pursuers in the world.`, alt:{u:{m_main:[40,200], m_left:[40,280]}, a:[['gd',150,200,44,200]]}},
       {t:`Ride into the fight yourself with your reserve and rally the line`, s:3, fb:`At a moment like this, the commander's visible presence can decide whether a wobbling line holds.`},
       {t:`Hold your position and let the left wing fend for itself`, s:1, fb:`If the left collapses, the Mongols can roll up your whole army from the side.`}],
     result:`According to the chronicles, Qutuz throws down his helmet so his men can see him, rallies them and leads a counterattack. The Mongol army breaks. Kitbuqa is killed and the survivors are pursued.`}
  ],
  debrief:{
    title:'Beaten with their own playbook',
    outcome:`It is the first time a Mongol army is decisively defeated in open battle in this region. The Mamluks retake Damascus within days and drive the Mongols out of Syria. Egypt is saved.`,
    why:`The Mamluks fought with the Mongols' own tools: horse archery, mobility and the feigned retreat, combined with local knowledge and a leader willing to put himself where the line was breaking.`,
    them:`Kitbuqa led a force much smaller than the one that had swept through Baghdad. Confident after years of victories, he pursued as Mongol armies always had.`,
    board:{h:`Beat them with their own playbook`, b:`The Mamluks understood the Mongol playbook from the inside and turned it back on them. Often the best people to compete against an incumbent are those who once worked inside the same model and know its reflexes.`, try:`What is your competitor's signature move? Design one situation where that move would hurt them.`},
    principles:['ground','habits','own']
  }
});

/* ===== 8. BATTLE OF BRITAIN ===== */
PGD.add({
  n:8, id:'britain', name:'Battle of Britain', year:'1940', place:'Southern England', side:'g', you:'Air Chief Marshal Hugh Dowding', minutes:7,
  face:{g:1,t:-1},
  g:{short:'RAF', name:'RAF Fighter Command', cmdr:'Air Chief Marshal Hugh Dowding, with Air Vice-Marshal Keith Park (11 Group)', str:'Several hundred fighters, a radar chain and a control network', eyes:'Through British eyes'},
  t:{short:'Luftwaffe', name:'German air force', cmdr:'Reichsmarschall Hermann Göring', str:'More aircraft, including large bomber fleets', eyes:'Through German eyes'},
  brief:{
    hook:`You have fewer fighters than the enemy. You also have something they do not understand.`,
    situation:`1940. France is falling. Germany will try to destroy Britain's air force as the first step toward an invasion. Your job is to keep Fighter Command alive and fighting long enough that invasion becomes impossible.`,
    forces:`Hurricane and Spitfire squadrons spread across the country, linked to a chain of radar stations, the Observer Corps, a central filter room and sector control rooms that guide fighters by radio.`,
    enemy:`A larger air force with experienced crews, flying from bases in France and Belgium, close to England.`,
    ground:`The fight happens over southern England and the Channel. Your pilots who bail out land at home and can fly again; theirs are captured.`,
    supply:`Pilots are your scarcest resource, more than aircraft. Factories are building fighters fast, but trained pilots take months.`,
    intel:`Radar can see raids forming over France. German intelligence seriously underestimates how your radar and control system work together.`,
    objective:`Prevent Germany from winning control of the air over southern England.`,
    notes:[`Your strength is the system, not just the fighters.`,`Every squadron lost abroad is one you will not have at home.`,`Fighting over home soil saves pilots.`]
  },
  terrain(){
    let s=seaBg();
    s+=land('M0 0 H400 V150 Q360 170 330 160 Q300 190 260 200 Q220 196 180 210 Q120 214 60 206 Q20 200 0 210 Z','#8fa765');
    s+=land('M220 400 Q260 330 320 300 Q360 290 400 270 V400 Z','#8fa765');
    [[60,206],[130,212],[190,206],[250,198],[310,168]].forEach(p=>s+=`<g transform="translate(${p[0]} ${p[1]-8})"><path d="M0 0 L-4 -16 M0 0 L4 -16 M-4 -16 L4 -16 M-2 -8 L2 -8" stroke="#3a3a3a" stroke-width="1.2" fill="none"/></g>`);
    s+=house(220,80)+house(232,74,'#8a3a2a')+house(226,90)+house(240,86);
    s+=label(232,60,'London',11)+label(180,250,'English Channel',12)+label(330,340,'Occupied France',10)+label(130,232,'Radar stations',8)+label(70,40,'Fighter airfields',9);
    s+=compass(26,382);
    return s+end();
  },
  features:[
    {x:190,y:206,r:0,px:120,py:196,d:'M60 206 L130 212 L190 206 L250 198 L310 168',line:true,name:'The radar chain',why:`Coastal radar stations spotted raids forming over France, giving fighters time to take off and climb.`},
    {x:230,y:84,r:24,name:'London',why:`The capital. When Germany switched its bombing here in September, the pressure on RAF airfields eased.`},
    {x:120,y:90,r:50,name:'Sector airfields',why:`The bases and control rooms that turned radar reports into interceptions. They were Germany's most valuable targets.`},
    {x:300,y:300,r:40,name:'Bases in France',why:`German bombers and fighters flew from airfields close across the Channel, but their fighters had little time over England before running low on fuel.`}
  ],
  units:[
    U('r_11','g','plane',3,'11 Group squadrons',`Defended London and the southeast under Keith Park, sending squadrons up quickly in small numbers.`,{0:[330,330],1:[150,120],2:[250,150],3:[230,130]}),
    U('r_12','g','plane',2,'12 Group squadrons',`Covered the Midlands, and argued for large formations known as big wings.`,{0:[180,40],1:[180,40],2:[180,40],3:[210,100]}),
    U('r_10','g','plane',2,'10 Group squadrons',`Covered the southwest.`,{0:[50,120],1:[50,120],2:[80,150]}),
    U('r_dowding','g','cmd',1,'Hugh Dowding',`Built the radar-based defense system before the war. Quiet, stubborn and protective of his pilots.`,{0:[150,40]}),
    U('l_bomb','t','plane',3,'Bomber formations',`Heinkels, Dorniers and Junkers bombers, attacking airfields and later cities.`,{0:[330,320],1:[330,320],2:[200,130],3:[226,96,'ko']}),
    U('l_fight','t','plane',3,'Bf 109 fighters',`Excellent fighters, but with little fuel for combat over England.`,{0:[300,300],1:[300,300],2:[230,160],3:[240,150]}),
    U('l_110','t','plane',2,'Bf 110 escorts',`Heavy fighters that proved vulnerable to Spitfires and Hurricanes.`,{0:[350,290],1:[350,290],2:[150,150,'ko']}),
    U('l_goring','t','cmd',1,'Hermann Göring',`Head of the Luftwaffe, who promised Hitler a quick victory in the air.`,{0:[370,380]})
  ],
  states:[
    {a:[]},
    {a:[['gd',330,330,250,240,156,128]]},
    {a:[['t',330,320,260,220,204,138],['g',150,120,190,130,244,150],['t',300,300,260,220,232,166]]},
    {a:[['t',204,138,226,100],['g',250,150,236,120],['g',180,40,200,70,210,96]]}
  ],
  decisions:[
    {when:'May 1940', title:'Squadrons for France?',
     ctx:`German armies are breaking through in France. The French government is pleading for more British fighter squadrons, and Churchill is inclined to help. You have already lost many fighters over France.`,
     q:`Do you send more fighter squadrons to France?`,
     opts:[
       {t:`Send them. France must not fall`, s:0, fb:`Squadrons sent now would likely be lost in a battle that was already decided, leaving Britain without the fighters it would need weeks later.`, alt:{u:{r_11:[340,330], r_12:[320,350]}, a:[['g',180,40,260,200,316,344]]}},
       {t:`Refuse, and argue in writing that more losses in France would leave Britain defenseless`, s:3, fb:`This is what Dowding did, in a famous letter of 16 May 1940 setting out the minimum number of squadrons Britain needed to survive.`},
       {t:`Send half of what is asked`, s:1, fb:`A compromise that weakens home defense without changing the outcome in France.`}],
     result:`Dowding writes to the government warning that further losses would mean the defeat of Britain itself. The flow of fighter squadrons to France is limited. The squadrons kept at home will fight the Battle of Britain that summer.`,
     why:`Dowding kept his scarce resource for the fight that would decide the war, even under political pressure.`,
     tv:`German commanders expected Britain to make peace after France fell. When it did not, they planned to destroy the RAF quickly.`},
    {when:'August 1940', title:'How do you meet the raids?',
     ctx:`German raids are hitting your airfields and radar stations every day. Your pilots are exhausted, and you cannot replace them as fast as you lose them.`,
     q:`How do you use your fighters?`,
     opts:[
       {t:`Keep big standing patrols in the air over the coast all day`, s:0, fb:`Fighters on patrol burn fuel, wear out pilots and are often in the wrong place when the raid comes.`},
       {t:`Keep fighters on the ground until radar and the control rooms send them precisely onto each raid`, s:3, fb:`The system lets you put fighters where the enemy is, when the enemy is there, and rest them otherwise.`},
       {t:`Wait to assemble very large formations before attacking`, s:1, fb:`Big formations hit hard, but they take time to form up. Over the southeast, raids often reached their targets first. This was a real and bitter argument inside the RAF.`}],
     result:`Keith Park's 11 Group sends squadrons up as raids are detected and guides them by radio to intercept. RAF losses are painful, but German losses are higher. Then, after an RAF raid on Berlin, Germany switches its main attacks to London on 7 September, giving the battered airfields a reprieve.`,
     why:`The control system multiplied the value of every fighter. The German switch to London relieved pressure at the point of greatest danger.`,
     tv:`German intelligence believed RAF Fighter Command was almost finished. Bombing London seemed a way to force the last British fighters into the air and destroy them.`},
    {when:'15 September 1940', title:'The biggest raid',
     ctx:`Radar shows the largest German raid so far forming over France, heading for London. If you hold back, they bomb freely. If you commit everything, you have no reserve if they return.`,
     q:`What do you commit?`,
     opts:[
       {t:`Hold back a reserve in case a second raid follows`, s:1, fb:`Sensible in principle, but a weakly met raid would reach London intact and show the Germans the RAF was spent.`},
       {t:`Commit every squadron, meeting the raid in stages and again over London with 12 Group's wing`, s:3, fb:`The bombers face fighters all the way in and all the way out. German crews, told the RAF was finished, meet more fighters than ever.`},
       {t:`Let the raid through and attack its airfields in France instead`, s:0, fb:`Your fighters are not built for that, and London takes the full blow.`}],
     result:`Park commits all his squadrons. When Churchill, visiting the operations room, asks what reserves remain, he is reportedly told there are none. The German bombers are attacked repeatedly and lose heavily. Two days later, Hitler postpones the invasion of Britain indefinitely.`}
  ],
  debrief:{
    title:'The system that won',
    outcome:`Germany fails to win control of the air. The invasion of Britain is called off. Over the whole battle the Luftwaffe loses far more aircraft than the RAF, and many more of its trained aircrew, who are captured when shot down over England.`,
    why:`Dowding protected his scarcest resource, built and trusted a system that turned information into precise action, and fought where every advantage of home ground applied.`,
    them:`The Luftwaffe never fully understood the radar and control system it faced, and it kept changing targets: from shipping to airfields to cities. Each switch gave the RAF time to recover.`,
    board:{h:`Information beats mass`, b:`Fighter Command won with fewer planes by knowing where to send them. A smaller team with better information and fast decision-making can outperform a bigger one that is guessing. And keep switching targets in mind: changing focus before a job is finished hands the other side time to recover.`, try:`Map how information about a client problem reaches the person who can act on it. Remove one step.`},
    principles:['intel','reserve','interior']
  }
});

/* ===== 9. GAUGAMELA ===== */
PGD.add({
  n:9, id:'gaugamela', name:'Gaugamela', year:'331 BC', place:'Near Mosul, Iraq', side:'g', you:'Alexander the Great', minutes:5,
  face:{g:1,t:-1},
  g:{short:'Macedonians', name:'Macedonian army', cmdr:'Alexander III of Macedon', str:'About 47,000', eyes:'Through Macedonian eyes'},
  t:{short:'Persians', name:'Persian Empire', cmdr:'King Darius III', str:'Much larger, perhaps more than 100,000 by some estimates', eyes:'Through Persian eyes'},
  brief:{
    hook:`The enemy line is so long it overlaps yours on both ends. They picked the ground.`,
    situation:`1 October 331 BC. Darius has gathered the strength of his empire on a wide plain and leveled the ground so his scythed chariots can charge. If you lose here, you lose everything you have conquered. If you win, the Persian Empire is yours.`,
    forces:`The phalanx, a dense block of infantry with very long pikes; the elite Companion cavalry under your personal command; Thessalian cavalry on the left under Parmenion; and agile light troops with javelins and bows. You have placed a second line behind the first, ready to face backward if surrounded.`,
    enemy:`A huge army with heavy cavalry on both wings, scythed chariots in front, elephants and Darius himself in the center with his guard.`,
    ground:`Flat and open, smoothed by Darius to suit chariots. No hills or rivers to protect your flanks.`,
    supply:`You are deep in Persian territory and cannot afford a long campaign or a defeat.`,
    intel:`Darius stays in the center and will try to overlap and surround you. His army is held together by his presence.`,
    objective:`Defeat Darius's army and, ideally, capture or kill Darius.`,
    notes:[`If the line overlaps you, it will try to wrap around your flanks.`,`Chariots need flat ground and a clear run.`,`A long line that moves to follow you can open gaps.`]
  },
  terrain(){
    let s=felt('#c2b47c');
    s+=`<rect x="40" y="110" width="320" height="50" fill="rgba(255,250,220,.25)"/>`;
    s+=trees(9,6,[0,400,330,400],()=>true,['#7a8a4a']);
    s+=label(200,104,'Ground leveled for chariots',9)+label(200,390,'Macedonian camp behind',9)+label(200,20,'Persian camp',9);
    s+=compass(380,384);
    return s+end();
  },
  features:[
    {x:200,y:135,r:0,px:300,py:136,d:'M40 110 h320 v50 h-320 Z',name:'Leveled ground',why:`Darius had the plain smoothed so his scythed chariots could charge at full speed.`},
    {x:250,y:110,r:30,name:'The seam near Darius',why:`If the Persian left stretched to follow Alexander, a gap could open near the center, close to Darius.`},
    {x:100,y:300,r:34,name:'The left flank',why:`Parmenion's wing, which had to hold against overwhelming pressure while Alexander struck.`}
  ],
  units:[
    U('mc_comp','g','cav',3,'Companion cavalry',`Alexander's elite heavy cavalry, trained to charge in a wedge.`,{0:[300,300],1:[352,280],2:[240,120]}),
    U('mc_phal','g','hvy',3,'Phalanx',`Dense infantry with pikes several metres long.`,{0:[200,300],1:[226,288],2:[220,160]}),
    U('mc_phal2','g','hvy',2,'Second line',`Placed behind the first line, ready to turn around if the army was surrounded.`,{0:[200,340],1:[220,330],2:[200,300]}),
    U('mc_left','g','cav',2,'Thessalian cavalry (Parmenion)',`Held the left against heavy Persian attacks.`,{0:[100,300],1:[120,300],2:[110,286]}),
    U('mc_lt','g','arch',2,'Javelin men and archers',`Placed to shoot down chariot drivers and open lanes to let chariots pass.`,{0:[280,260],1:[300,240],2:[290,220]}),
    U('mc_alex','g','cmd',1,'Alexander',`Led the Companions personally.`,{0:[320,320],1:[370,300],2:[250,140]}),
    U('pr_chariot','t','cav',2,'Scythed chariots',`Chariots with blades on their wheels, meant to cut through infantry.`,{0:[200,150],1:[290,230,'ko']}),
    U('pr_center','t','hvy',3,'Persian center and royal guard',`Darius's best troops, around the king.`,{0:[200,80],1:[190,80],2:[200,90,'ko']}),
    U('pr_left','t','cav',3,'Persian left cavalry (Bessus)',`Stretched further and further to follow Alexander's move.`,{0:[300,80],1:[360,120],2:[360,140]}),
    U('pr_right','t','cav',3,'Persian right (Mazaeus)',`Pressed Parmenion hard on the other wing.`,{0:[90,80],1:[90,250],2:[100,260]}),
    U('pr_darius','t','cmd',1,'Darius III',`Commanded from his chariot in the center.`,{0:[200,56],2:[200,8,'exit']})
  ],
  states:[
    {a:[]},
    {a:[['g',300,300,352,282],['t',300,80,360,116],['t',200,150,280,226],['t',90,80,90,240]]},
    {a:[['g',352,280,280,190,242,126],['g',226,288,222,166],['td',200,56,200,12]]}
  ],
  decisions:[
    {when:'Morning', title:'Facing a longer line',
     ctx:`The Persian line overlaps yours on both ends. Chariots wait in front of it on leveled ground. Parmenion suggested a night attack the evening before.`,
     q:`How do you begin the battle?`,
     opts:[
       {t:`Attack straight ahead into the Persian center`, s:0, fb:`You run into the chariots on their chosen ground, and the overlapping wings close around you.`, alt:{u:{mc_phal:[200,200], mc_comp:[260,200], pr_left:[300,230], pr_right:[100,230]}, a:[['g',200,300,200,206],['t',300,80,300,224],['t',90,80,100,224]]}},
       {t:`Advance at an angle to your right, so the Persian left must stretch to follow, with light troops ready for the chariots`, s:3, fb:`Moving off the leveled ground forces Darius to react. As his left wing slides to follow you, it pulls away from his center.`},
       {t:`Attack at night, as Parmenion suggests`, s:1, fb:`It might work, but night battles are chaotic. Alexander reportedly refused, wanting a clear victory that would leave no excuses.`}],
     result:`Alexander leads his army obliquely to the right. The Persian left wing cavalry slides along to keep him from going around it. Darius launches the chariots, but Macedonian light troops shoot the drivers and open lanes in the line so the rest pass through harmlessly.`,
     why:`By refusing to fight where Darius had prepared, Alexander forced the Persian line to move, and moving lines open gaps.`,
     tv:`Darius had chosen and prepared the ground. Seeing the Macedonians drift off it, he had to respond, sending his left wing to stop them from going around.`},
    {when:'The decisive moment', title:'A gap opens',
     ctx:`As the Persian left stretched to follow you, a gap has opened in their line near the center, close to Darius. On your far left, Parmenion is under heavy pressure and sending for help.`,
     q:`What do you do?`,
     opts:[
       {t:`Ride back to help Parmenion first`, s:1, fb:`It may save the left, but the gap closes and the chance to strike at Darius is gone.`, alt:{u:{mc_comp:[150,280]}, a:[['g',352,280,250,320,154,284]]}},
       {t:`Form the Companions into a wedge and drive through the gap straight at Darius`, s:3, fb:`Striking the enemy's command at the moment of opportunity can collapse the whole army, which depends on its king.`},
       {t:`Wait for the phalanx to catch up and advance together`, s:0, fb:`By then the gap has closed. Waiting turns a moment into a missed chance.`}],
     result:`Alexander forms the Companions into a wedge and drives through the gap toward Darius. Darius flees the field. As word spreads that the king has fled, the Persian center collapses. Alexander then turns back to relieve Parmenion.`}
  ],
  debrief:{
    title:'Make them stretch, then hit the seam',
    outcome:`Darius escapes but is murdered months later by his own officers. The Persian Empire falls to Alexander, who takes Babylon, Susa and Persepolis.`,
    why:`Alexander refused the battle Darius had prepared, forced the larger army to move, waited for the gap, then hit it with his best troops at the enemy's center of gravity: the king himself.`,
    them:`Darius had numbers and the ground he wanted. But his plan depended on chariots and a static line, and his army was held together by his own presence. When he fled, it fell apart.`,
    board:{h:`Make them stretch, then hit the seam`, b:`A big competitor's structure is strongest when it stands still. Moves that force it to react, reorganize or chase can open gaps between teams, regions or products. Then the decisive move goes into that gap.`, try:`What could you do that would force your largest competitor to reorganize or react? Where would that open a gap?`},
    principles:['mass','flank','reserve']
  }
});

/* ===== 10. RORKE'S DRIFT ===== */
PGD.add({
  n:10, id:'rorkesdrift', name:'Rorke\'s Drift', year:'1879', place:'Natal, South Africa', side:'g', you:'Lieutenant John Chard', minutes:5,
  face:{g:1,t:-1},
  g:{short:'British', name:'British garrison', cmdr:'Lieutenants John Chard and Gonville Bromhead', str:'About 150 men, some of them sick', eyes:'Through British eyes'},
  t:{short:'Zulu', name:'Zulu reserve regiments', cmdr:'Prince Dabulamanzi kaMpande', str:'About 3,000 to 4,000', eyes:'Through Zulu eyes'},
  brief:{
    hook:`A disaster has just happened over the hill. Thousands of warriors are coming your way. You have an hour.`,
    situation:`22 January 1879, during the British invasion of the Zulu kingdom. A few hours ago, at Isandlwana, a Zulu army destroyed the main British camp. Riders arrive with the news: a large Zulu force is heading for your small supply post and hospital at Rorke's Drift.`,
    forces:`About 150 men, mostly B Company of the 24th Regiment, plus some sick and wounded in the hospital. You have plenty of rifles and ammunition, and stores of heavy mealie bags and biscuit boxes.`,
    enemy:`Three to four thousand Zulu warriors from reserve regiments that missed the main fight. Highly disciplined and brave, armed mainly with spears and shields, with some rifles.`,
    ground:`Two buildings, a hospital and a storehouse, about 30 metres apart, with a stone cattle kraal nearby. A rocky hill, the Oskarberg, overlooks the post from the south.`,
    supply:`You have ammunition and food. Wagons are available, but oxen are slow.`,
    intel:`The Zulu force is fast-moving and will arrive within an hour or two. Help may come from the main column tomorrow.`,
    objective:`Survive until relief arrives.`,
    notes:[`Zulu warriors move faster on foot than ox-wagons.`,`Rifles are deadly from behind cover, weak in the open.`,`A perimeter you cannot man is a perimeter you cannot hold.`]
  },
  terrain(){
    let s=felt('#a4a46a');
    s+=river('M0 26 Q200 46 400 20',16);
    s+=`<path d="M0 400 Q60 310 140 300 Q200 290 260 300 Q340 310 400 400 Z" fill="#8c8160"/>`;
    s+=mtn(200,380,70)+mtn(100,392,40)+mtn(320,392,44);
    s+=`<rect x="110" y="160" width="70" height="38" fill="#efe3c4" stroke="#5a4a35" stroke-width="1.5"/><path d="M106 160 L145 140 L184 160 Z" fill="#9a8b6a" stroke="#5a4a35"/>`;
    s+=`<rect x="236" y="150" width="84" height="40" fill="#efe3c4" stroke="#5a4a35" stroke-width="1.5"/><path d="M232 150 L278 128 L324 150 Z" fill="#9a8b6a" stroke="#5a4a35"/>`;
    s+=`<circle cx="350" cy="196" r="22" fill="none" stroke="#7a7466" stroke-width="5"/>`;
    s+=label(145,226,'Hospital',9)+label(278,206,'Storehouse',9)+label(350,232,'Stone kraal',8)+label(200,40,'Buffalo River crossing',9)+label(200,290,'Oskarberg',10);
    s+=compass(26,384);
    return s+end();
  },
  over(){ return `<g class="ph" data-show="1 2"><path d="M110 150 L236 140 M110 214 L180 214 L236 200 L330 206" stroke="#c4b48a" stroke-width="5" stroke-linecap="round" fill="none"/></g>`; },
  features:[
    {x:145,y:180,r:30,name:'The hospital',why:`Full of sick men and hard to defend, with small rooms and no connecting doors.`},
    {x:278,y:170,r:34,name:'The storehouse',why:`The strongest building, and the final keep.`},
    {x:200,y:330,r:50,px:200,py:316,name:'The Oskarberg',why:`A rocky hill overlooking the post. Zulu marksmen fired down from it, especially at the north wall.`},
    {x:200,y:176,r:0,px:200,py:120,d:'M110 150 L236 140 M110 214 L180 214 L236 200 L330 206',line:true,name:'The mealie-bag walls',why:`Walls of heavy grain sacks and biscuit boxes, thrown up in about an hour, that linked the buildings into a single position.`}
  ],
  units:[
    U('b_north','g','inf',3,'North wall',`Defended the long wall facing the river, exposed to fire from the hill behind.`,{0:[180,110],1:[180,140],2:[262,134]}),
    U('b_south','g','inf',2,'South wall',`Faced the first Zulu rush from the Oskarberg side.`,{0:[230,230],1:[200,222],2:[290,222]}),
    U('b_hosp','g','inf',2,'Hospital defenders',`A few soldiers defending the patients room by room.`,{0:[146,180],1:[146,180],2:[250,190]}),
    U('b_res','g','inf',1,'Bromhead and reserve',`Moved to wherever the line was most threatened.`,{0:[250,120],1:[240,176],2:[300,176]}),
    U('b_chard','g','cmd',1,'John Chard',`A Royal Engineers officer who took command and designed the defences.`,{0:[300,110],1:[300,176],2:[310,176]}),
    U('b_nnc','g','spr',2,'Natal Native Contingent',`Local auxiliaries who fled as the Zulus approached, leaving the walls even more thinly held.`,{0:[60,180],1:[30,60,'exit']}),
    U('z_1','t','spr',3,'uThulwana regiment',`Older married men. Attacked the south wall and hospital.`,{0:[200,380],1:[200,262],2:[160,240]}),
    U('z_2','t','spr',3,'iNdlondlo and uDloko regiments',`Swept around to the west and north.`,{0:[80,360],1:[70,190],2:[110,130]}),
    U('z_rifles','t','inf',2,'Marksmen on the Oskarberg',`A few hundred rifles, firing down into the post.`,{0:[260,340],1:[230,300]}),
    U('z_cmd','t','cmd',1,'Prince Dabulamanzi',`The Zulu king's half-brother, leading the reserve.`,{0:[320,370],1:[300,330],2:[300,320]})
  ],
  states:[
    {a:[]},
    {a:[['t',200,380,200,268],['t',80,360,60,260,70,196],['td',60,180,40,70]]},
    {a:[['gd',146,180,250,190],['t',70,190,110,140],['t',200,262,170,236]]}
  ],
  decisions:[
    {when:'About 3:30 p.m.', title:'Run or stay?',
     ctx:`News of the disaster at Isandlwana has just arrived. Thousands of Zulu warriors are coming. You have wagons, oxen, sick men and about an hour.`,
     q:`What do you do?`,
     opts:[
       {t:`Load the sick into wagons and retreat toward the next British post`, s:0, fb:`Ox-wagons crawl. A fast-moving Zulu force would catch the column in the open, where rifles count for little.`, alt:{u:{b_north:[60,80], b_south:[80,90], b_hosp:[70,100], z_2:[80,130]}, a:[['gd',180,110,70,84],['t',80,360,60,240,76,136]]}},
       {t:`Stay, and build walls of mealie bags and biscuit boxes linking the hospital and storehouse`, s:3, fb:`Behind cover, every rifle counts. The buildings, walls and kraal can become a single strongpoint in an hour.`},
       {t:`Abandon the hospital and defend only the stone storehouse`, s:1, fb:`The storehouse alone is too small for everyone, and abandoning the patients is unthinkable for many of your men.`, alt:{u:{b_north:[262,150], b_south:[290,170], b_hosp:[146,180,'ko']}, a:[]}}],
     result:`Chard and Bromhead decide to stay. In about an hour the garrison builds walls of mealie bags and biscuit boxes connecting the hospital, storehouse and kraal. The Natal auxiliaries flee as the Zulus appear. The first attacks hit the south wall at about 4:30 p.m.`,
     why:`Staying behind cover turned a hopeless situation into a defensible one.`,
     tv:`The Zulu reserve had watched the victory at Isandlwana without taking part. Many young men were eager to prove themselves. They crossed into Natal and attacked, against King Cetshwayo's instructions not to invade British territory.`},
    {when:'Evening', title:'The perimeter is too long',
     ctx:`Wave after wave of attacks hit the walls. Zulu fire from the hill picks off men on the north wall. The hospital is surrounded and its roof is catching fire. You do not have enough men to hold the whole perimeter.`,
     q:`What do you do?`,
     opts:[
       {t:`Hold every metre of the original wall`, s:1, fb:`Your line gets thinner as men fall. Sooner or later the attackers break through at the weakest point.`},
       {t:`Pull back behind an inner wall of biscuit boxes, shrink the perimeter, and get the patients out of the hospital through its walls`, s:3, fb:`A shorter line can be held more densely. Defenders hacked holes through the hospital's internal walls to pass patients out room by room.`},
       {t:`Charge out into the open to drive them off`, s:0, fb:`In the open, a small force loses the advantage of cover and is quickly surrounded.`, alt:{u:{b_south:[200,280,'ko'], b_res:[220,260]}, a:[['g',240,176,210,256]]}}],
     result:`The defenders fall back behind an inner barricade of biscuit boxes in front of the storehouse. In the burning hospital, soldiers break through internal walls to pass patients to safety. The fighting goes on into the night. By dawn the Zulus have withdrawn, and a British relief column arrives.`}
  ],
  debrief:{
    title:'Shrink the perimeter to what you can hold',
    outcome:`Seventeen British defenders are killed. At least 350 Zulu dead are counted, and many more are wounded. Eleven Victoria Crosses are awarded, the most ever for a single action. Strategically the battle changed little, but it became a powerful story in Britain.`,
    why:`The garrison chose to fight from cover, used what it had to build a fortress in an hour, and then shrank its perimeter to match the men it had left.`,
    them:`The Zulu regiments had run a long way, had little food and were attacking prepared rifles across open ground. They showed remarkable courage in repeated assaults. The Zulu kingdom itself was later defeated and divided by Britain.`,
    board:{h:`Shrink the perimeter to what you can hold`, b:`When resources drop, trying to defend everything means defending nothing well. The garrison pulled back to a smaller line it could actually hold. In business, that means consolidating around your core clients and capabilities when things get hard.`, try:`If your team lost a third of its capacity tomorrow, which work would you keep? Write that list now.`},
    principles:['economy','own','ground']
  }
});
