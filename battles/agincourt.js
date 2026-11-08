PG.add({
  id:'agincourt', name:'Agincourt', year:'1415', place:'Northern France',
  summary:`A sick, outnumbered English army turns a muddy field into a trap for the French nobility.`,
  face:{g:1,t:-1},
  g:{short:'England', name:'Kingdom of England', cmdr:'King Henry V', str:'About 6,000 to 9,000, mostly longbowmen', eyes:'Through English eyes'},
  t:{short:'France', name:'Kingdom of France', cmdr:'Constable d\'Albret and Marshal Boucicaut', str:'Estimates range from about 12,000 to over 30,000', eyes:'Through French eyes'},
  objective:`England: get home to Calais alive, and if forced to fight, fight on the best ground available. France: destroy the English army before it escapes.`,
  prologue:{
    when:'August to October 1415', title:'A march that went wrong',
    text:`Henry V invades Normandy to press his claim to the French crown. The siege of Harfleur takes five weeks instead of days, and dysentery tears through his army. Rather than sail home, Henry marches for English-held Calais with a few thousand men. The French block the crossings of the Somme, forcing a long detour inland, while a much larger French army gathers to cut him off.`,
    gWant:`To reach Calais intact, and to avoid a pitched battle unless it could be fought on good ground.`,
    tWant:`To trap and destroy the English army, and Henry's claim with it, before it escaped to Calais.`,
    box:[266,134,30],
    theater(){
      let s=seaBg();
      s+=land('M0 0 H400 V50 Q360 62 330 46 Q300 70 260 60 Q200 76 150 60 Q100 76 60 66 Q30 80 0 70 Z');
      s+=land('M0 262 Q60 242 110 252 Q130 236 140 222 Q170 202 200 190 Q240 162 268 122 Q290 96 310 82 Q350 72 400 62 V400 H0 Z');
      s+=river('M236 166 Q260 190 290 200 Q320 214 350 230',4)+river('M142 226 Q170 260 190 300 Q196 320 200 340',4);
      s+=city(142,222,'Harfleur',9,14,'start')+city(306,88,'Calais',9,-6)+city(200,340,'Paris',9,14)+city(178,284,'Rouen',8,-6)+city(240,170,'Blanchetaque ford',8,-7);
      s+=label(120,30,'England',13)+label(90,140,'English Channel',13)+label(300,230,'Somme',9)+label(150,360,'France',13);
      return s;
    },
    tokens:[
      {s:'g',t:'arch',n:2,name:'Henry\'s army',why:'Sailed to Harfleur in August with perhaps 12,000 men. Siege, disease and garrison duty cut it in half.',path:[[100,40],[134,212],[200,196],[236,176],[300,214],[284,150]]},
      {s:'g',t:'cmd',n:1,name:'Henry V',why:'Chose to march overland to Calais rather than sail home, to show he could move through his claimed lands.',path:[[110,44],[140,220],[206,202],[242,182],[306,220],[278,156]]},
      {s:'t',t:'cav',n:3,name:'French army',why:'Gathered at Rouen, shadowed the English across the Somme and got ahead of them on the road to Calais.',path:[[184,286],[260,240],[312,190],[288,136]]}
    ],
    a:[['gd',104,46,110,140,132,212],['gd',146,218,190,190,234,172],['gd',242,182,300,236,294,174],['td',190,280,280,250,290,140]]
  },
  terrain(){
    let s=felt('#7f9a52');
    const mud='M72 28 L328 28 L286 334 L114 334 Z';
    s+=`<path d="${mud}" fill="#8a6943"/><path d="${mud}" fill="url(#furrow)"/>`;
    [[150,140,14,4],[240,180,18,5],[190,250,12,3.5],[262,100,10,3],[170,70,12,3],[220,300,14,3.5]].forEach(p=>s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[3]}" fill="rgba(170,205,222,.35)"/>`);
    s+=`<path d="M0 18 L70 18 L114 334 L110 348 L0 348 Z" fill="#4d6b33"/><path d="M400 18 L330 18 L286 334 L290 348 L400 348 Z" fill="#4d6b33"/>`;
    const cols=['#2f5a24','#3b6b2b','#447a31'];
    s+=trees(11,62,[4,112,26,346],(x,y)=>x<70+44*(y-18)/316-9,cols);
    s+=trees(23,62,[288,396,26,346],(x,y)=>x>330-44*(y-18)/316+9,cols);
    s+=house(184,388)+house(216,388,'#8a3a2a');
    s+=label(46,206,'Agincourt wood',11,-90)+label(354,206,'Tramecourt wood',11,90)+label(200,182,'Ploughed field, soaked by rain',10)+label(150,14,'French camp',10)+label(296,14,'Road to Calais',10)+label(300,392,'English camp, Maisoncelle',9);
    s+=compass(26,380);
    return s+end();
  },
  features:[
    {x:56,y:150,d:'M0 18 L70 18 L114 334 L110 348 L0 348 Z M400 18 L330 18 L286 334 L290 348 L400 348 Z',name:'The two woods',why:`Woods on both sides protected the English flanks completely. The French could not go around, only straight through.`},
    {x:200,y:318,d:'M114 334 L286 334',line:true,name:'The funnel',why:`The field narrowed toward the English line. Attackers spread across the wide end were squeezed together by the time they arrived.`},
    {x:200,y:150,px:236,py:140,d:'M72 28 L328 28 L286 334 L114 334 Z',name:'Ploughed mud',why:`Freshly ploughed and soaked by overnight rain. Every step cost armored men energy, and a man who fell could struggle to get up.`},
    {x:200,y:200,px:300,py:200,d:'M112 200 H288',line:true,name:'Bow range',why:`A longbow could reach roughly 250 to 300 metres. Henry's move forward put the French inside that range, making their position impossible to hold.`},
    {x:200,y:384,r:20,name:'Maisoncelle camp',why:`The English baggage and supplies. A raid here late in the day spread fear of an attack from behind.`}
  ],
  units:[
    U('e_arch_l','g','arch',3,'English longbowmen (left)',`Commoners trained from childhood. Cheap, mobile and deadly at long range. About five of every six English soldiers were archers.`,{0:[130,296],1:[132,246],4:[152,232]}),
    U('e_arch_r','g','arch',3,'English longbowmen (right)',`Massed on the flank so their arrows crossed the French line of advance.`,{0:[270,296],1:[268,246],4:[248,232]}),
    U('e_stk_l','g','stake',2,'Sharpened stakes (left)',`Each archer carried a wooden stake cut days earlier. Planted at an angle, they made a hedge horses would not charge through.`,{0:[132,282,'off'],1:[132,230]}),
    U('e_stk_r','g','stake',2,'Sharpened stakes (right)',`Cheap, quick to plant and decisive against cavalry.`,{0:[268,282,'off'],1:[268,230]}),
    U('e_maa_l','g','hvy',2,'Dismounted men-at-arms (left)',`Armored knights fighting on foot to anchor the center of the line.`,{0:[180,306],1:[182,256]}),
    U('e_maa_r','g','hvy',2,'Dismounted men-at-arms (right)',`Few in number, so the line was only a few ranks deep.`,{0:[220,306],1:[218,256]}),
    U('e_henry','g','cmd',1,'King Henry V',`Fought in the center of the line.`,{0:[200,322],1:[200,272]}),
    U('e_guard','g','spr',1,'Baggage guard',`A small guard over the supplies at Maisoncelle.`,{0:[200,370]}),
    U('f_cav_l','t','cav',2,'Mounted knights (left wing)',`Meant to ride down the archers. Many assigned riders were missing when the moment came.`,{0:[102,96],2:[132,212],3:[160,138,'ko']}),
    U('f_cav_r','t','cav',2,'Mounted knights (right wing)',`Charged straight into stakes and arrows with woods on one side and mud underfoot.`,{0:[298,96],2:[268,212],3:[240,138,'ko']}),
    U('f_van1','t','hvy',3,'Vanguard, dismounted (left)',`The French elite on foot, crowded forward by nobles seeking glory.`,{0:[166,112],3:[184,200],4:[188,236,'ko']}),
    U('f_van2','t','hvy',3,'Vanguard, dismounted (right)',`Wearing plate armor through deep mud, under arrows the whole way.`,{0:[234,112],3:[216,200],4:[214,236,'ko']}),
    U('f_cmd','t','cmd',1,'Constable d\'Albret',`Commander of the French army, killed with the vanguard.`,{0:[200,96],3:[200,186],4:[201,224,'ko']}),
    U('f_main','t','hvy',3,'Main battle (second division)',`Followed the vanguard into the same mud and the same funnel.`,{0:[200,70],4:[200,172],5:[200,160,'ko']}),
    U('f_xbow','t','arch',2,'Crossbowmen and archers',`Could have answered the English archers. Instead they were placed behind the men-at-arms and barely used.`,{0:[200,44]}),
    U('f_rear','t','cav',2,'Rearguard (mounted)',`Largely left the field once the first two divisions were destroyed.`,{0:[262,40],5:[268,14,'exit']})
  ],
  phases:[
    {when:'25 October 1415, dawn', title:'A standoff in the mud', a:[],
     move:`The English find the road to Calais blocked. Henry forms a thin line: dismounted men-at-arms in the center, longbowmen massed on the flanks. The French form up in three deep divisions about a kilometre away, and wait.`,
     why:`Henry's army was hungry and riddled with dysentery. He could not attack a larger army, but he could choose to stand where woods protected both flanks.`,
     tv:`The French had every reason for confidence: more men, more knights, fresh troops and an enemy that was starving. Their best play was to wait, and at first they did.`,
     ground:`The field ran between two woods and narrowed toward the English. It had just been ploughed, and heavy overnight rain had turned it into deep, sticky mud. Any attack on the English would be funnelled and slowed.`,
     supply:`This is the hidden driver of the battle. The French had food and time. The English had neither, so waiting was a slow defeat for Henry.`,
     board:{h:`The right conditions turn strength into dead weight`, b:`French strength, armored nobles and sheer numbers, became a liability in the mud. Big competitors carry similar weight: approval layers, long-term commitments, global templates. In a fast-moving moment, that weight sinks them.`, try:`Ask under what conditions your competitor's biggest strength becomes a burden. Can you make the market look like that?`}},
    {when:'Late morning', title:'Move the stakes forward',
     a:[['g',132,288,132,252],['g',268,288,268,252],['g',128,240,112,170,104,108],['g',272,240,288,170,296,108]],
     call:{side:'g', who:'Henry V', q:`Both armies have stood for hours. The French are content to wait. Your men are starving. What do you do?`, opts:[
       {t:`Keep waiting for the French to attack`, ok:false, fb:`Time is on the French side. Every hour weakens your army while theirs grows as latecomers arrive.`},
       {t:`Slip away toward Calais`, ok:false, fb:`A retreating column in the open is exactly what heavy cavalry hopes to catch.`, alt:{u:{e_arch_l:[130,362], e_arch_r:[270,362], e_maa_l:[180,372], e_maa_r:[220,372], e_henry:[200,384], f_cav_l:[150,300], f_cav_r:[250,300]}, a:[['gd',200,300,200,368],['t',102,104,130,220,148,294],['t',298,104,270,220,252,294]]}},
       {t:`Advance into bow range, replant the stakes and provoke them`, ok:true, fb:`This is what Henry did. Arrows falling on the French ranks forced them to attack across the mud, on his terms.`}]},
     move:`Henry orders the whole line forward to within long bowshot of the French. The archers hammer in their sharpened stakes, angled toward the enemy, then loose volley after volley into the packed French ranks.`,
     why:`Henry could not afford to wait, so he forced the decision. The arrows made standing still more painful for the French than attacking.`,
     tv:`Arrows landing in their ranks changed the French calculation. Standing still under fire felt intolerable for proud men-at-arms, and their plan assumed a cavalry charge would sweep the archers aside.`,
     ground:`The new position still kept the woods tight on both English flanks, so there was no way around.`,
     board:{h:`If time is against you, force the decision`, b:`Waiting favors whoever has more runway: more budget, more patience, more time. When you are the one running out, you have to create the moment, on ground you have already prepared.`, try:`If a stalled decision favors the other side, design a move that makes doing nothing more expensive for them than acting.`}},
    {when:'Midday', title:'The cavalry charge fails',
     a:[['t',102,104,126,204],['t',298,104,274,204]],
     call:{side:'t', who:'the French cavalry commander', q:`English arrows are falling on your army. You command the cavalry wings, but many of your riders have drifted from their posts. What do you do?`, opts:[
       {t:`Charge the archers now with the riders you have`, hist:true, ok:false, fb:`That is what happened: a thin, uncoordinated charge into stakes and arrows.`},
       {t:`Hold until every rider and both foot divisions can move together`, ok:true, fb:`A single combined attack would have split the English arrows across many more targets. Better still would have been to pull back out of range altogether.`, alt:{u:{f_cav_l:[110,132], f_cav_r:[290,132]}, a:[['g',128,240,112,170,108,140],['g',272,240,288,170,292,140]]}}]},
     move:`French mounted knights charge the archers on both wings. Fewer turn up than planned, the mud slows them, the woods stop them going around, and the stakes and arrows wreck the charge.`,
     why:`The French counted on heavy cavalry to ride down the archers. They never adapted that plan to this particular field.`,
     tv:`French commanders had planned a big cavalry strike. In the event, many riders had drifted from their posts and the charge went in weak and piecemeal.`,
     ground:`With woods on the flanks and mud underfoot, the cavalry had to hit the stakes head-on.`,
     board:{h:`Cheap preparation beats expensive force`, b:`A few hundred wooden stakes neutralized the most expensive weapon in Europe. Unglamorous groundwork, such as measurement set up before launch, exit clauses in a contract or a crisis plan written in calm weather, often decides the outcome.`, try:`What is the stake you have not planted yet? Plant it before the charge comes.`}},
    {when:'Early afternoon', title:'Into the funnel',
     a:[['t',166,120,184,192],['t',234,120,216,192],['g',140,240,176,206],['g',260,240,224,206],['td',130,206,158,146],['td',270,206,242,146]],
     call:{side:'t', who:'Constable d\'Albret', q:`Your cavalry charge has failed. Wounded horses are bolting back through your lines. Your knights are ready to advance on foot through the mud. What do you do?`, opts:[
       {t:`Advance the dismounted knights through the mud as planned`, hist:true, ok:false, fb:`This is what happened. The vanguard walked into the funnel with arrows coming in the whole way.`},
       {t:`Pull the whole army back out of bow range and wait again`, ok:true, fb:`This restores the waiting game. The English were still starving, and they had already used up their one provoking move.`, alt:{u:{f_van1:[166,82], f_van2:[234,82], f_cmd:[200,68], f_cav_l:[146,58], f_cav_r:[254,58]}, a:[['td',166,112,166,86],['td',234,112,234,86]]}},
       {t:`Push the crossbowmen to the front to duel the archers first`, ok:false, fb:`Better than history, but crossbows reload slowly, and massed longbows outshot them at this range.`, alt:{u:{f_xbow:[200,166]}, a:[['t',200,60,200,160],['g',132,240,168,176],['g',268,240,232,176]]}}]},
     move:`Wounded horses bolt back through the advancing French vanguard, throwing it into chaos. The dismounted men-at-arms push on through the mud as the field narrows around them, with arrows pouring in from both sides.`,
     why:`French knights crowded into the first line because it held the most honor. Their crossbowmen and archers, who might have answered the English, were stuck behind them and barely used.`,
     tv:`Nobles jostled for places in the first line, where honor was won. Command was divided among great lords, and no one could rework the plan once the crush began.`,
     ground:`The narrowing field compressed the French so tightly that men could barely raise their weapons. Each wore around 25 kg of armor and sank into the mud with every step.`,
     board:{h:`Put talent where it has impact, not where status puts it`, b:`The French arranged their army by prestige. Seniority went to the front and their best ranged weapons went to the back. Teams do the same when the most senior people take the visible roles regardless of fit.`, try:`Look at your next big project. Is anyone placed because of rank rather than what they do best?`}},
    {when:'Afternoon', title:'The melee',
     a:[['g',142,234,180,236],['g',258,234,222,236],['t',200,80,200,164]],
     move:`Exhausted French troops reach the English line and pile up against it. The archers drop their bows and attack from the flanks with mallets, axes and swords, against men too tired and too packed to defend themselves. The second French division follows into the same crush.`,
     why:`The archers were lightly equipped and could move on the mud far more easily than men in plate armor. When the fight changed, they changed roles.`,
     tv:`In the press, French men-at-arms could neither advance nor retreat. Many were captured rather than killed at first, because prisoners meant ransom.`,
     board:{h:`Build a team that can switch roles mid-fight`, b:`The archers won twice: first as ranged troops, then as infantry. Specialists who can step into a different role when conditions change are worth more than specialists who cannot.`, try:`Cross-train one person on each critical role this quarter so the team can flex when the plan breaks.`}},
    {when:'Evening and after', title:'Aftermath',
     a:[['td',262,46,268,18]],
     move:`Thousands of French are dead, including a large share of the nobility. English losses are a few hundred at most. Late in the battle, fearing a renewed attack, Henry ordered many prisoners killed, a decision argued over ever since. Within five years the Treaty of Troyes made Henry heir to the French throne.`,
     why:`Henry turned a desperate retreat into a political triumph, though his early death in 1422 meant England eventually lost France anyway.`,
     tv:`For France it was a political catastrophe: a generation of leaders killed or captured. Yet within a generation, with Joan of Arc and Charles VII, France began driving the English out.`,
     board:{h:`Conditions beat resources`, b:`A weaker, sicker army won because it read the ground, the weather and the clock better than its opponent. Resources matter, but the side that reads conditions best often wins.`, try:`Before your next big plan, write one paragraph on conditions only: timing, mood, competitor constraints. Then decide.`}}
  ]
});
