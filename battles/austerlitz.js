PG.add({
  id:'austerlitz', name:'Austerlitz', year:'1805', place:'Moravia, today\'s Czech Republic',
  summary:`Napoleon pretends to be weak, gives away the high ground, and waits for his enemy to walk into the gap.`,
  face:{g:1,t:-1},
  g:{short:'France', name:'French Empire', cmdr:'Emperor Napoleon I', str:'About 73,000', eyes:'Through French eyes'},
  t:{short:'Allies', name:'Russia and Austria', cmdr:'Tsar Alexander I, Emperor Francis II, General Kutuzov', str:'About 85,000', eyes:'Through Allied eyes'},
  objective:`Napoleon: win one decisive battle to knock Austria out of the war before Prussia joins. The Allies: cut Napoleon off from Vienna and destroy his army far from home.`,
  prologue:{
    when:'August to December 1805', title:'From the Channel to the Danube',
    text:`Napoleon has spent two years massing an army at Boulogne to invade Britain. When Austria and Russia join a new coalition against him, he swings the whole army east across Europe in a matter of weeks. At Ulm in October he surrounds an Austrian army, which surrenders. He takes Vienna in November. But the Russian army is intact and joining the Austrians in Moravia, Prussia is close to joining them, and Napoleon is deep in hostile country with winter coming.`,
    gWant:`One decisive battle, quickly, before Prussia joined the coalition and before his supply lines and his army wore thin.`,
    tWant:`To catch Napoleon overextended, far from France, cut him off from Vienna and destroy him.`,
    box:[286,172,30],
    theater(){
      let s=felt('#93a172');
      s+=sea('M0 0 H150 Q130 30 100 40 Q60 60 30 50 Q10 60 0 70 Z');
      s+=sea('M260 0 H400 V30 Q350 40 320 30 Q290 24 260 0 Z');
      s+=sea('M180 400 Q200 350 230 330 Q250 345 262 370 Q275 390 290 400 Z');
      s+=river('M110 236 Q180 230 240 252 Q300 262 400 300',5)+river('M90 60 Q85 140 100 230',4);
      [[200,320,12],[150,300,11],[250,316,10],[120,280,10]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#efe9da'));
      s+=city(36,96,'Boulogne',9,-6,'start')+city(150,234,'Ulm',9,14)+city(290,256,'Vienna',9,14)+city(300,186,'Austerlitz',9,-7)+city(340,170,'Olmütz',8,-6)+city(210,120,'Prussia, wavering',8,-6);
      s+=label(70,22,'North Sea',11)+label(80,180,'France',12)+label(210,214,'Danube',9)+label(200,300,'The Alps',9)+label(360,120,'Russian armies',9,90);
      return s;
    },
    tokens:[
      {s:'g',t:'inf',n:3,name:'Grande Armée',why:'About 200,000 men marched from the Channel coast to the Danube in about six weeks.',path:[[36,96],[90,170],[146,226],[230,250],[284,252],[296,196]]},
      {s:'t',t:'inf',n:2,name:'Austrian army at Ulm',why:'Surrounded at Ulm in October. Most of it surrendered without a major battle.',path:[[164,226],[152,232]],end:'ko'},
      {s:'t',t:'inf',n:3,name:'Russian and Austrian armies',why:'Kutuzov\'s Russians retreated east, joined fresh Russian troops and Austrian remnants near Olmütz.',path:[[396,150],[350,170],[312,186]]}
    ],
    a:[['gd',40,104,90,180,144,226],['gd',156,232,230,256,284,252],['gd',288,244,300,220,298,200],['td',396,152,360,164,318,182]]
  },
  terrain(){
    let s=felt('#8f9f72')+`<rect width="400" height="400" fill="url(#snow)"/>`;
    s+=road('M0 46 Q120 40 200 38 Q300 34 400 26');
    s+=hill(238,202,82,58,4)+hill(112,72,20,12,2)+hill(62,202,22,13,2);
    s+=river('M152 0 Q140 70 160 140 Q178 210 152 280 Q136 330 160 400',7);
    s+=`<ellipse cx="250" cy="368" rx="36" ry="12" fill="#d6e9f0" stroke="#9cc1d0" stroke-width="1.2"/><ellipse cx="314" cy="356" rx="26" ry="10" fill="#d6e9f0" stroke="#9cc1d0" stroke-width="1.2"/><path d="M226 366 l12 3 l10 -4 l14 5 M300 354 l9 4 l12 -3" fill="none" stroke="#8fb3c4" stroke-width=".8"/>`;
    s+=house(172,252)+house(180,260,'#8a3a2a')+house(160,318)+house(168,326,'#8a3a2a')+house(14,32)+house(26,26,'#8a3a2a');
    s+=trees(5,7,[300,390,250,330],()=>true,['#3b5f2d','#456b33']);
    s+=label(238,136,'Pratzen Heights',12)+label(112,54,'Santon',9)+label(62,228,'Zuran hill',9)+label(124,246,'Sokolnitz',9)+label(124,330,'Telnitz',9)+label(116,392,'Goldbach stream',9)+label(290,392,'Satschan ponds, frozen',9)+label(52,22,'Brünn',9)+label(340,18,'Olmütz road',9)+label(44,374,'To Vienna',9);
    s+=compass(382,384);
    return s+end();
  },
  over(){
    let f=`<g class="ph" data-show="2"><g filter="url(#blur)" opacity=".8">`;
    [[130,110,70,30],[150,190,80,34],[140,270,80,30],[160,345,70,26],[90,160,60,26],[200,240,50,22],[110,320,60,24]].forEach(e=>f+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#f4f6f4"/>`);
    return f+`</g></g>`+night(1);
  },
  features:[
    {x:238,y:200,r:70,px:238,py:236,name:'The Pratzen Heights',why:`The dominant high ground in the center. Napoleon gave it up on purpose so the Allies would occupy it, then empty it.`},
    {x:160,y:290,px:150,py:290,d:'M152 0 Q140 70 160 140 Q178 210 152 280 Q136 330 160 400',line:true,name:'Goldbach stream and villages',why:`A marshy stream and the villages of Telnitz and Sokolnitz gave the thin French right a strong line to hold.`},
    {x:110,y:180,r:38,name:'The valley fog',why:`Morning fog in the low ground hid Soult's corps until it marched up the heights.`},
    {x:40,y:378,r:18,name:'The road to Vienna',why:`Napoleon's line of supply and retreat. Making it look vulnerable was the bait.`},
    {x:282,y:362,r:36,name:'The frozen ponds',why:`Water and marsh behind the Allied left. When the trap closed, they blocked the way out.`},
    {x:112,y:72,r:20,name:'Santon hill',why:`A fortified hill anchoring the French left on the Brünn road.`}
  ],
  units:[
    U('fr_napoleon','g','cmd',1,'Napoleon',`Watched from the Zuran hill, timing each move.`,{0:[62,192]}),
    U('fr_soult1','g','inf',3,'Soult\'s corps: St-Hilaire\'s division',`The hammer of the battle, hidden in the valley fog until the decisive moment.`,{0:[220,212],1:[112,210,'hide'],3:[226,214],5:[230,276]}),
    U('fr_soult2','g','inf',3,'Soult\'s corps: Vandamme\'s division',`The second half of the hammer, aimed at the center of the heights.`,{0:[236,174],1:[108,168,'hide'],3:[242,176],5:[256,244]}),
    U('fr_lannes','g','inf',3,'Lannes\' V Corps',`Held the northern flank near the Santon hill.`,{0:[112,92],4:[176,82],5:[212,78]}),
    U('fr_murat','g','cav',2,'Murat\'s cavalry reserve',`Shock cavalry for the open northern plain.`,{0:[84,116],4:[192,108],5:[240,104]}),
    U('fr_bern','g','inf',2,'Bernadotte\'s I Corps',`Moved up to support the attack on the heights.`,{0:[46,144],4:[168,140]}),
    U('fr_guard','g','cav',2,'Imperial Guard',`Napoleon's elite reserve, committed only once the decisive point was clear.`,{0:[40,176],4:[206,152],5:[206,196]}),
    U('fr_legrand','g','inf',1,'Legrand\'s division',`The deliberately thin right flank, holding the villages until help arrived.`,{0:[132,292],2:[142,286],5:[150,302]}),
    U('fr_davout','g','inf',2,'Davout\'s III Corps',`Marched about 110 km in roughly two days to make the bait survivable.`,{0:[30,392,'off'],2:[118,306],5:[176,316]}),
    U('fr_art','g','art',2,'French artillery',`Moved onto the heights in the afternoon to fire down on the trapped Allied left.`,{0:[70,168],5:[214,252]}),
    U('al_col1','t','inf',3,'Doctorov\'s column',`Part of the big Allied push south to cut the Vienna road.`,{0:[352,272],1:[272,246],2:[180,318],5:[252,350,'ko']}),
    U('al_col2','t','inf',3,'Langeron\'s column',`Attacked the villages along the stream, drawing troops off the heights.`,{0:[356,236],1:[256,216],2:[184,262],5:[206,334,'ko']}),
    U('al_col3','t','inf',3,'Przhebishevsky\'s column',`The third column sent south, leaving the center thin.`,{0:[360,200],1:[272,190],2:[198,236],5:[192,282,'ko']}),
    U('al_kol','t','inf',3,'Kolowrat and Miloradovich',`The center column, still on the heights in marching order when Soult attacked.`,{0:[364,166],1:[288,166],2:[264,192],3:[278,198,'ko']}),
    U('al_bag','t','inf',2,'Bagration\'s wing',`Russian forces on the northern flank. Pushed back, but withdrew in good order.`,{0:[332,72],1:[292,66],4:[236,70],5:[322,48,'exit']}),
    U('al_lich','t','cav',2,'Liechtenstein\'s cavalry',`Allied cavalry linking the northern wing to the center.`,{0:[342,112],1:[272,112],4:[218,116,'ko']}),
    U('al_guard','t','cav',2,'Russian Imperial Guard',`The Allied reserve, spent trying to retake the heights.`,{0:[386,150],1:[338,150],4:[230,160,'ko']}),
    U('al_tsar','t','cmd',1,'Tsar Alexander and Kutuzov',`The young Tsar backed the aggressive attack plan over his cautious senior general.`,{0:[382,214],1:[334,218],5:[392,250,'exit']})
  ],
  phases:[
    {when:'Late November 1805', title:'Far from home, outnumbered', a:[],
     move:`Napoleon's army has marched deep into Moravia. Russian and Austrian armies are gathering to the east, and Prussia is threatening to join them. French troops hold the Pratzen Heights, the dominant ground in the area.`,
     why:`Napoleon needed a decisive battle quickly. A long campaign would let the coalition grow while his own supply line to Vienna stretched thin.`,
     tv:`The Allies saw an enemy far from home and outnumbered. The young Tsar and his advisers believed Napoleon was weak and could be destroyed, against the instincts of the cautious Kutuzov.`,
     ground:`The Pratzen Heights overlook everything. Conventional thinking says whoever holds them holds the battlefield.`,
     supply:`Napoleon's army depended on a long road back to Vienna. That road was both his lifeline and the obvious target for the Allies.`,
     board:{h:`Know which side the clock favors`, b:`Napoleon's plan started from one honest fact: a long fight favored his enemies. Every strategy should begin with the same question about time.`, try:`Ask whether the next six months make you stronger or weaker relative to your rival. Set the tempo around the answer.`}},
    {when:'1 December', title:'Abandon the heights', vis:.7,
     a:[['gd',214,212,160,222,118,210],['gd',230,174,170,160,114,168],['t',350,262,280,246],['t',356,200,280,190]],
     call:{side:'g', who:'Napoleon', q:`You hold the high ground, but you are outnumbered and need the enemy to attack in a way you can punish. What do you do?`, opts:[
       {t:`Dig in on the Pratzen Heights and dare them to attack`, ok:false, fb:`Solid, but a careful enemy would simply not attack, and time was on their side.`},
       {t:`Give up the heights and leave your right flank looking thin`, ok:true, fb:`This is Napoleon's gamble. An apparently weak flank next to the Vienna road was a target the Allies could not resist.`},
       {t:`Retreat toward Vienna to shorten your supply line`, ok:false, fb:`Safe, but it hands the initiative to a coalition that is growing. Napoleon needed a decisive battle.`, alt:{u:{fr_soult1:[70,330], fr_soult2:[80,300], fr_napoleon:[44,344], fr_guard:[40,320]}, a:[['gd',214,212,120,280,72,326]]}}]},
     move:`Napoleon pulls his troops off the Pratzen Heights, asks for an armistice to look nervous, and leaves his southern flank deliberately thin. Soult's corps is hidden in the low ground opposite the heights. The Allies move up and occupy the high ground.`,
     why:`Napoleon was handing the Allies a plan: swing south, crush the weak flank, cut the Vienna road. He wanted them to take it, because carrying it out would mean emptying their center.`,
     tv:`Every signal pointed the same way: the French had left the heights, asked for talks and looked thin in the south. The Allied plan, drafted by the Austrian staff officer Weyrother, was a sweeping attack to cut the Vienna road.`,
     ground:`Giving up the high ground looked like a mistake, which is exactly why the Allies believed it.`,
     board:{h:`Shape their decision by what you show them`, b:`Napoleon made the move he wanted the Allies to make look obvious and easy. With competitors, the opening you leave can be designed. Use this only on rivals, never on clients or your own team: trust on your own side is what keeps everything else working.`, try:`Where could you leave a visible, cheap opening that draws a rival's resources away from where you plan to win?`}},
    {when:'2 December, 7 a.m.', title:'They take the bait', vis:.55,
     a:[['t',268,250,220,300,184,312],['t',252,220,210,240,188,258],['t',268,194,230,210,202,232],['g',36,384,80,330,114,308]],
     call:{side:'t', who:'Tsar Alexander', q:`The French right looks weak, and the road to Vienna is just behind it. Your staff wants to send three big columns south off the heights. Kutuzov is uneasy. What do you order?`, opts:[
       {t:`Send three big columns south to crush the weak flank`, hist:true, ok:false, fb:`This is the Allied plan. It made progress in the south, and emptied the heights in the center.`},
       {t:`Attack south, but keep a strong force on the heights`, ok:true, fb:`Kutuzov's instinct. Holding the center would have turned Soult's attack into a fight uphill against fresh, ready troops.`, alt:{u:{al_col1:[180,318], al_col2:[184,262], al_col3:[262,206], al_kol:[288,172]}, a:[['t',268,250,220,300,184,312],['t',252,220,210,240,188,258]]}},
       {t:`Stay on the heights and make Napoleon attack you`, ok:false, fb:`Defensible, since time favored the coalition. But it gave up the chance to destroy Napoleon, which is what the Tsar wanted, and left him free to maneuver.`}]},
     move:`In thick valley fog, three big Allied columns pour off the heights and attack the French right around the villages of Telnitz and Sokolnitz. Davout's III Corps arrives after a forced march of about 110 km in roughly two days and holds the line alongside Legrand's thin division.`,
     why:`The bait only worked because Davout's speed made the thin flank stronger than it looked. Without him, the trap becomes a real defeat.`,
     tv:`The plan seemed to be working. The southern villages were under heavy pressure and the French right was bending. Nobody on the heights could see what the fog was hiding.`,
     ground:`Fog in the Goldbach valley hid Soult's massed corps from the Allied commanders on the heights.`,
     supply:`Napoleon called Davout forward days earlier. That forced march was the logistics that made the deception safe.`,
     board:{h:`A thin position needs a guaranteed backup`, b:`Napoleon deliberately underinvested on one flank, but he secured a fast reinforcement before the fight began. A small team on a hard brief needs an escalation path agreed in advance, not improvised mid-crisis.`, try:`For every place you are running lean on purpose, write down who comes in, and how fast, if it goes wrong.`}},
    {when:'About 9 a.m.', title:'The sun of Austerlitz',
     a:[['g',118,210,170,222,222,214],['g',114,168,180,160,238,176]],
     call:{side:'g', who:'Napoleon', q:`Soult tells you his men can reach the top of the heights in under twenty minutes. Allied columns are still filing off the slopes. When do you attack?`, opts:[
       {t:`Now, while the fog still hides you`, ok:false, fb:`Striking early catches more Allied troops still on the heights, who could turn back and fight.`, alt:{u:{fr_soult1:[198,218], fr_soult2:[210,182], al_col3:[222,224], al_kol:[260,190]}, a:[['g',118,210,160,222,194,218],['t',198,236,218,226],['t',264,192,256,190]]}},
       {t:`Wait another quarter of an hour so more Allies leave the heights`, ok:true, fb:`This is what Napoleon reportedly did. The extra fifteen minutes meant the heights were nearly empty when Soult arrived.`},
       {t:`Wait until Davout has won in the south`, ok:false, fb:`Davout was badly outnumbered and could only hold, not win. Waiting for him would have let the Allies spot the danger and reinforce the heights.`}]},
     move:`The fog burns off. Soult's two divisions march up out of the valley and storm the Pratzen Heights, catching the remaining Allied troops still in marching columns. By late morning the French hold the center of the battlefield.`,
     why:`Napoleon waited until the Allied center was nearly empty, then struck with overwhelming force at the one point that would split the enemy army.`,
     tv:`Kutuzov had tried to keep troops on the heights, but the columns were already strung out on the march. Being caught in marching formation by an enemy in battle formation is a disaster.`,
     ground:`Now the high ground worked for France. From the heights, Napoleon could split the Allied army in two.`,
     board:{h:`Let them fully commit before you move`, b:`Striking too early reveals the plan and lets the opponent recover. The hardest discipline in strategy is waiting until the other side has committed past the point of easy return.`, try:`Before your next counter-move, ask whether the competitor has committed enough that they cannot quickly pull back.`}},
    {when:'Midday', title:'Split the army',
     a:[['t',334,152,236,160],['g',48,176,130,150,200,152],['g',116,92,170,82],['g',88,116,186,108],['g',50,144,162,140]],
     move:`The Allies throw in their reserves, including the Russian Imperial Guard, to retake the heights. Napoleon commits his own Guard cavalry and Bernadotte's corps, and the counterattack fails. In the north, Lannes and Murat push back Bagration.`,
     why:`Napoleon had kept his best troops back until the decisive point was clear. The Allies spent their reserve trying to undo a disaster.`,
     tv:`The Russian Guard counterattack was brave and at first successful, but it came piecemeal and too late to change the shape of the battle.`,
     board:{h:`Spend your reserve on winning, not on rescue`, b:`The French Guard decided the battle at the moment of opportunity. The Russian Guard was used up trying to fix a mistake. Reserves of time, budget or people are worth most when you use them to press an advantage.`, try:`Look at where your contingency budget went last year. Was it used to win, or to patch?`}},
    {when:'Afternoon', title:'Shut the trap',
     a:[['g',228,218,246,250,234,270],['g',244,182,268,214,256,238],['g',120,306,170,316],['td',184,318,224,340,250,348]],
     move:`French troops on the heights turn south and hit the rear of the Allied columns still fighting Davout. Trapped between the French and a chain of frozen ponds, the Allied left collapses. Some troops flee across the ice under artillery fire.`,
     why:`Taking the heights was the turning point, but Napoleon used it to finish the job: he destroyed the Allied left as a fighting force.`,
     tv:`The southern columns found French troops behind them and on their flank. With ice and marsh at their backs, units broke up as they tried to escape.`,
     ground:`The ponds and marsh behind the Allied left became a wall. There was no clean line of retreat.`,
     board:{h:`Turn a win into a result`, b:`Many teams take the hill and stop to celebrate. Napoleon used the hill to finish the fight. Once you have the advantage, push it to the outcome that changes the market, not just the scoreboard.`, try:`After your next win, schedule the follow-up push before the celebration.`}},
    {when:'December 1805', title:'Aftermath', a:[],
     move:`The Allies lose about 27,000 killed, wounded or captured; the French about 9,000. Austria signs the Treaty of Pressburg within weeks and the coalition collapses. Stories of thousands drowning in the ponds were exaggerated: when the ponds were later drained, few bodies were found.`,
     why:`One afternoon ended a war. It also convinced Napoleon he could always outthink his enemies, a confidence that led him into Russia in 1812.`,
     tv:`For the Allies, Austerlitz showed the danger of trusting a plan that matched what they wanted to believe. Russia fought on; Austria made peace.`,
     board:{h:`Brilliance builds blind spots`, b:`The more often a bold bet pays off, the more a leader trusts instinct over evidence. Napoleon's greatest victory planted the overconfidence behind his greatest defeat.`, try:`Ask someone you trust to name the decision where you are relying on your track record instead of the facts.`}}
  ]
});
