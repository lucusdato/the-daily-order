PG.add({
  id:'gettysburg', name:'Gettysburg', year:'1863', place:'Pennsylvania, United States',
  summary:`Two armies stumble into each other at a crossroads town. The side that holds the high ground, and can move along the inside of its line, wins.`,
  face:{g:-1,t:1},
  g:{short:'Union', name:'Union Army of the Potomac', cmdr:'Major General George G. Meade, in command for only three days', str:'About 94,000', eyes:'Through Union eyes'},
  t:{short:'Confederacy', name:'Confederate Army of Northern Virginia', cmdr:'General Robert E. Lee', str:'About 72,000', eyes:'Through Confederate eyes'},
  objective:`Lee: win a big victory on Northern soil to weaken the North's will to keep fighting. Meade: protect Washington and Baltimore and stop Lee's army.`,
  prologue:{
    when:'May to June 1863', title:'Lee invades the North',
    text:`Fresh from a stunning win at Chancellorsville, Lee takes his army north through the Shenandoah Valley into Pennsylvania, using the Blue Ridge Mountains to screen his march. He hopes to feed his army from Northern farms, take pressure off Virginia and push the North toward peace. His cavalry chief, J.E.B. Stuart, rides off on a wide raid and loses touch, leaving Lee nearly blind. The Union army follows under a new commander, George Meade, appointed just three days before the battle.`,
    gWant:`To stay between Lee and Washington, find good ground, and make Lee attack it.`,
    tWant:`A decisive victory on Northern soil, ideally against part of the Union army before the rest could arrive.`,
    box:[174,88,32],
    theater(){
      let s=felt('#93a86a');
      s+=sea('M300 120 Q288 180 300 230 Q290 280 300 330 Q310 380 300 400 H400 V120 Z');
      s+=river('M30 218 Q100 200 150 228 Q200 250 240 250 Q270 260 300 268',5)+river('M120 330 Q180 320 230 330 Q270 336 300 340',4);
      [[80,332],[94,302],[104,272],[114,242],[124,212],[134,182],[144,152]].forEach(p=>s+=mtn(p[0],p[1],11,'#e3dccb'));
      s+=`<path d="M0 126 H300" stroke="#1f1a14" stroke-width="1.4" stroke-dasharray="6 4" opacity=".55"/>`;
      s+=city(190,104,'Gettysburg',9,-6)+city(236,246,'Washington',9,14)+city(272,176,'Baltimore',8,-6)+city(232,384,'Richmond',8,-6)+city(224,322,'Fredericksburg',8,14,'start')+city(198,40,'Harrisburg',8,-6)+city(130,96,'Chambersburg',8,-6)+city(204,190,'Frederick',8,-6);
      s+=label(150,118,'Pennsylvania',9)+label(150,140,'Maryland',9)+label(80,262,'Shenandoah Valley',8,-62)+label(360,200,'Chesapeake Bay',9,90)+label(260,276,'Potomac',8)+label(70,22,'Vicksburg is under siege, far to the west',8);
      return s;
    },
    tokens:[
      {s:'t',t:'cmd',n:1,name:'Robert E. Lee',why:'Moved north behind the Blue Ridge, spreading his army across Pennsylvania to gather supplies.',path:[[220,320],[122,268],[140,152],[132,100],[180,104]]},
      {s:'t',t:'inf',n:3,name:'Army of Northern Virginia',why:'About 72,000 men, confident after a string of victories.',path:[[214,314],[116,262],[134,146],[126,94],[170,100]]},
      {s:'t',t:'cav',n:2,name:'Stuart\'s cavalry',why:'Rode around the Union army, captured wagons, and lost contact with Lee for days.',path:[[226,324],[270,232],[292,150],[250,70],[206,62]]},
      {s:'g',t:'inf',n:3,name:'Army of the Potomac',why:'Followed Lee north, staying between him and Washington.',path:[[246,306],[218,238],[206,190],[198,120]]}
    ],
    a:[['td',220,316,96,290,124,236],['td',132,226,150,150,134,104],['gd',244,302,214,230,204,128],['td',230,320,300,200,254,74]]
  },
  terrain(){
    let s=felt('#86a05b');
    ['M200 72 Q100 80 0 92','M200 72 L40 0','M200 72 L190 0','M200 72 L300 0','M200 72 L400 60','M200 72 Q260 140 400 230','M200 72 Q235 200 260 400','M200 72 Q150 250 70 400'].forEach(d=>s+=road(d));
    s+=river('M318 0 Q326 120 312 220 Q300 320 320 400',4);
    s+=hill(108,215,18,140,2)+trees(31,22,[94,124,90,350],()=>true,['#3b6b2b','#447a31']);
    s+=hill(214,220,16,105,2)+hill(222,118,26,16,3)+hill(290,120,26,24,3)+trees(32,10,[272,310,104,138],()=>true,['#2f5a24','#3b6b2b']);
    s+=hill(212,322,16,14,3)+hill(222,362,24,22,4)+trees(33,8,[206,240,350,380],()=>true,['#2f5a24','#3b6b2b']);
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) s+=tree(140+i*9,244+j*8,.55,'#6f9a45');
    s+=`<rect x="166" y="276" width="28" height="20" fill="#d8c27a" opacity=".85"/><rect x="166" y="276" width="28" height="20" fill="url(#furrow)"/>`;
    [[184,338,6,4],[192,332,5,3.5],[196,342,7,4.5],[188,346,4,3]].forEach(e=>s+=`<ellipse cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}" fill="#a7a49b" stroke="#5b5850" stroke-width=".5"/>`);
    [[188,62],[200,58],[212,64],[196,74],[208,78],[184,74],[220,72],[202,86]].forEach(p=>s+=house(p[0],p[1],p[0]%2?'#8a3a2a':'#b5432f'));
    s+=label(238,52,'Gettysburg',11)+label(80,232,'Seminary Ridge',10,-90)+label(238,240,'Cemetery Ridge',10,-90)+label(176,132,'Cemetery Hill',9)+label(292,156,'Culp\'s Hill',9)+label(252,322,'Little Round Top',8)+label(262,372,'Big Round Top',8)+label(138,234,'Peach Orchard',8)+label(180,270,'Wheatfield',8)+label(168,358,'Devil\'s Den',8)+label(116,350,'Emmitsburg Road',8,-58)+label(352,186,'Baltimore Pike',8,30);
    s+=compass(382,384);
    return s+end();
  },
  over(){ return night(2); },
  features:[
    {x:255,y:118,r:44,px:258,py:96,name:'Cemetery Hill and Culp\'s Hill',why:`The top of the fishhook. High ground anchoring the Union right and guarding the roads to Baltimore and Washington.`},
    {x:214,y:210,px:236,py:200,d:'M300 120 Q262 100 222 118 Q210 150 214 220 Q214 280 212 322',line:true,name:'The fishhook',why:`The curved Union line was short and compact. Troops could cross from one end to the other on the inside in a fraction of the time it took the Confederates to go around the outside.`},
    {x:212,y:322,r:18,px:230,py:310,name:'Little Round Top',why:`A rocky hill at the south end. Guns placed there could have fired straight along the Union line.`},
    {x:160,y:196,px:160,py:196,d:'M120 160 L206 160 L206 232 L120 232 Z',name:'The open ground',why:`Almost a mile of open farmland between the ridges. A killing ground for any attack across it.`},
    {x:200,y:72,r:26,px:178,py:70,name:'The road hub',why:`About ten roads met in the town, which is why both armies converged here without planning to.`}
  ],
  units:[
    U('u_buford','g','cav',2,'Buford\'s cavalry',`Dismounted troopers with fast-loading carbines. Held the ridges west of town long enough for infantry to arrive.`,{0:[120,92],1:[160,100],2:[392,320,'exit']}),
    U('u_I','g','inf',3,'Union I Corps',`The first infantry to reach the field. Lost heavily west of town, but bought hours.`,{0:[160,78],1:[205,128],2:[262,128]}),
    U('u_XI','g','inf',3,'Union XI Corps',`Deployed north of town, outflanked, and driven back through the streets.`,{0:[215,40],1:[225,112],2:[232,120]}),
    U('u_XII','g','inf',3,'Union XII Corps',`Held Culp's Hill, then was mostly pulled away on day two to save the Union left.`,{0:[395,140,'off'],2:[284,130],3:[230,240],5:[290,124]}),
    U('u_greene','g','inf',1,'Greene\'s brigade',`A single brigade left on Culp's Hill behind log breastworks, holding off a much larger attack.`,{0:[395,120,'off'],2:[306,108]}),
    U('u_II','g','inf',3,'Union II Corps (Hancock)',`The center of the line on Cemetery Ridge, and the target of Pickett's Charge.`,{0:[395,240,'off'],2:[218,190],3:[206,248],5:[220,190]}),
    U('u_III','g','inf',3,'Union III Corps (Sickles)',`Moved forward without orders into an exposed salient at the Peach Orchard.`,{0:[395,280,'off'],2:[214,262],3:[160,248],4:[178,268,'ko']}),
    U('u_V','g','inf',3,'Union V Corps',`The reserve rushed to the southern end of the line on day two.`,{0:[395,300,'off'],2:[300,252],3:[200,296]}),
    U('u_vincent','g','inf',2,'Vincent\'s brigade (20th Maine)',`Rushed onto Little Round Top minutes before the Confederates. The 20th Maine held the far end with a bayonet charge when its ammunition ran low.`,{0:[395,320,'off'],3:[214,318]}),
    U('u_VI','g','inf',3,'Union VI Corps',`The army's largest corps, arriving after a long forced march. A reserve that let Meade plug gaps.`,{0:[395,360,'off'],3:[292,330]}),
    U('u_art','g','art',2,'Union Artillery Reserve (Hunt)',`Henry Hunt, Meade's artillery chief, had guns slow their fire during the bombardment to save ammunition for the infantry assault.`,{0:[395,200,'off'],2:[250,190],5:[228,206]}),
    U('u_meade','g','cmd',1,'George Meade',`Took command three days before the battle. Arrived after midnight and chose to stay and fight on the high ground.`,{0:[395,260,'off'],2:[252,168]}),
    U('c_heth','t','inf',3,'Heth\'s division (Hill\'s corps)',`Ran into Buford's cavalry on the first morning and started the battle.`,{0:[40,92],1:[140,98],2:[104,140],5:[106,180],6:[188,178,'ko']}),
    U('c_ewell','t','inf',3,'Ewell\'s corps',`Arrived from the north and smashed the XI Corps. Lee asked Ewell to take Cemetery Hill if practicable; he decided it was not.`,{0:[200,8],1:[205,84],2:[250,82],4:[278,112],5:[260,86]}),
    U('c_hood','t','inf',3,'Hood\'s division (Longstreet)',`Attacked the Union far left through Devil's Den toward Little Round Top.`,{0:[30,330,'off'],2:[102,292],3:[186,330],4:[190,336]}),
    U('c_mclaws','t','inf',3,'McLaws\' division (Longstreet)',`Smashed the III Corps salient at the Peach Orchard and fought through the Wheatfield.`,{0:[30,300,'off'],2:[104,250],3:[140,268],4:[170,272]}),
    U('c_pickett','t','inf',3,'Pickett\'s division',`Fresh Virginia troops who arrived for the third day and led the final assault.`,{0:[30,200,'off'],5:[104,210],6:[200,198,'ko']}),
    U('c_art','t','art',3,'Confederate artillery',`About 150 guns lined up for the biggest bombardment of the war so far. Many shells flew over the Union line.`,{0:[60,120],2:[118,190],5:[128,200]}),
    U('c_lee','t','cmd',1,'Robert E. Lee',`Confident after a string of victories. Without Stuart, he did not know where most of the Union army was.`,{0:[30,120],2:[96,118]}),
    U('c_longstreet','t','cmd',1,'James Longstreet',`Lee's senior corps commander. Argued for a defensive strategy and against the attacks on days two and three.`,{0:[30,280,'off'],2:[88,272]}),
    U('c_stuart','t','cav',2,'Stuart\'s cavalry',`Lee's eyes and ears, absent until the evening of the second day after a long raid around the Union army.`,{0:[395,10,'off'],2:[372,40],5:[360,70]})
  ],
  phases:[
    {when:'1 July 1863, morning', title:'A fight over a crossroads',
     a:[['t',40,92,108,92],['g',160,80,134,90]],
     move:`Confederate infantry marching toward Gettysburg run into Union cavalry under John Buford, who has dismounted his troopers on the ridges west of town. They hold long enough for the Union I Corps to arrive. Neither commanding general meant to fight here; the roads brought them.`,
     why:`Buford saw what the ground was worth. About ten roads met at Gettysburg, and the hills south of town were the best defensive ground for miles. Delaying the Confederates bought time for the Union army to claim them.`,
     tv:`Lee had told his commanders not to bring on a major battle until the army was concentrated. But each attack that morning seemed to be going well, and more troops kept arriving to join it.`,
     ground:`Low ridges west of town let a small force delay a larger one, falling back from one line to the next.`,
     board:{h:`Fight for the position, not just the moment`, b:`Buford's cavalry could not win the battle, but it could hold the door open for the army that could. Early, small commitments that secure the best position (a key hire, a category role, a partnership) often matter more than the size of the first win.`, try:`What is the high ground in your market that nobody has claimed yet? What small move would hold it open?`}},
    {when:'1 July, afternoon', title:'Back to the hill',
     a:[['t',140,98,190,110],['t',205,20,210,78],['gd',165,82,205,124],['gd',215,44,225,108]],
     move:`More Confederates arrive from the west and north at the same moment. The Union I and XI Corps are overwhelmed and fall back through the streets of Gettysburg, losing thousands of prisoners. Survivors rally on Cemetery Hill. Lee asks Ewell to take the hill if practicable. Ewell decides it is not.`,
     why:`The Confederates won the day but not the ground that mattered. Union officers, including Winfield Hancock, organized the defense on the hill as fresh troops arrived.`,
     tv:`Lee was fighting half blind. With Stuart's cavalry far away, he did not know how much of the Union army was nearby. Ewell's men were tired and disorganized after a hard fight, and the hill looked strongly held.`,
     ground:`Cemetery Hill dominated the town and the roads south. Whoever held it overnight held the strongest position on the field.`,
     board:{h:`A win that leaves them the best ground is half a win`, b:`The Confederates took the town and thousands of prisoners, but the Union kept the hill. Celebrate the scoreboard and you can miss the position that decides the next round.`, try:`After your next win, ask what your competitor still holds that matters more than what you took.`}},
    {when:'Night of 1 July to morning of 2 July', title:'The fishhook', vis:.65,
     a:[['g',395,240,300,220,222,192],['g',395,140,330,124,290,128]],
     call:{side:'g', who:'Meade', q:`You have been in command for three days. Half your army is still arriving onto the hills south of town. Lee has momentum. What do you do?`, opts:[
       {t:`Fall back to a prepared line in Maryland`, ok:false, fb:`Meade had drawn up just such a plan, along Pipe Creek. It was safer, but it would have given up the best ground on the field and handed Lee the initiative.`, alt:{u:{u_I:[330,300], u_XI:[344,322]}, a:[['gd',225,118,300,220,340,310]]}},
       {t:`Stay, bring up the whole army, and hold the high ground`, ok:true, fb:`This is what Meade did. He let the ground do the work and made Lee attack it.`},
       {t:`Attack Lee at dawn before he concentrates`, ok:false, fb:`With the army only partly arrived, an attack would have thrown away the defensive advantage of the hills.`, alt:{u:{u_I:[150,120], u_XI:[170,96]}, a:[['g',205,128,158,122],['g',225,112,176,98]]}}]},
     move:`Meade arrives after midnight and decides to stay. Through the night and morning, corps after corps march in and form a line shaped like a fishhook: from Culp's Hill, around Cemetery Hill, and south along Cemetery Ridge toward the Round Tops.`,
     why:`The position was strong and compact. Its curved shape meant Meade could move troops from one end to the other quickly, across the inside of the hook.`,
     tv:`Lee saw an enemy beaten the day before and possibly still off balance. Attacking before the whole Union army arrived looked like the way to finish the job.`,
     ground:`The Union line was about 5 km long. The Confederate line wrapping around it was roughly twice that, so messages and reinforcements took far longer to move around the outside.`,
     board:{h:`Interior lines: the short side wins on speed`, b:`A compact organization can move people and resources between problems faster than a sprawling one. Being smaller with short internal distances can beat being bigger and spread out.`, try:`Map how long it takes to move a person or budget from one priority to another in your team. Shorten that path.`}},
    {when:'2 July, afternoon', title:'Attack on the Union left',
     a:[['t',102,292,150,320,184,328],['t',104,250,136,262],['g',300,252,250,280,204,296],['g',284,130,282,200,232,236],['g',218,190,212,220,208,244]],
     call:{side:'t', who:'Lee', q:`Longstreet urges you to swing the army around the Union left, get between Meade and Washington, and make him attack you on ground of your choosing. What do you order?`, opts:[
       {t:`Attack the Union left as planned, up the Emmitsburg Road`, hist:true, ok:false, fb:`This is what Lee ordered. It came close, but it was a head-on fight against strong ground and fast-moving reserves.`},
       {t:`Take Longstreet's advice: move around the Union flank and dig in`, ok:true, fb:`Historians still argue whether it was practical, but it would have used the defensive strength that had served Lee so well, and forced Meade to attack.`, alt:{u:{c_hood:[198,388], c_mclaws:[150,382], c_longstreet:[120,384]}, a:[['td',102,292,140,384,194,388],['td',104,250,100,340,146,380]]}},
       {t:`Pull back west and wait for Stuart to return`, ok:false, fb:`Safer, but Lee was far from home and could not stay long. Waiting for information he should already have had would not change that.`, alt:{u:{c_hood:[56,292], c_mclaws:[56,250]}, a:[['td',102,292,60,292],['td',104,250,60,250]]}}]},
     move:`Longstreet's corps attacks the southern end of the Union line. Sickles has moved his III Corps forward without orders into a salient at the Peach Orchard, and it is shattered. Confederates reach Devil's Den and climb Little Round Top, which is nearly empty until Union engineer Gouverneur Warren spots the danger and Vincent's brigade races up just in time. Meade pulls troops from across the line to plug the gaps.`,
     why:`Little Round Top overlooked the whole Union line. Holding it, and shifting reserves along the inside of the hook, saved the Union left.`,
     tv:`Lee believed the Union left was shorter and weaker than it was. His scouts had missed how far south the line ran, and Longstreet's long march to stay hidden delayed the attack until late afternoon.`,
     ground:`Rocky, broken ground at Devil's Den and the Round Tops broke the attacks into small, desperate fights.`,
     board:{h:`A reserve you can move quickly beats a bigger one far away`, b:`Meade won the afternoon by shifting units across short internal distances to wherever the line was breaking. The ability to redeploy fast is a strategy in itself.`, try:`If your most important client or project went wrong tomorrow, who could you move onto it by the afternoon?`}},
    {when:'2 July, evening', title:'Culp\'s Hill',
     a:[['t',250,82,278,108]],
     move:`As the fighting dies down in the south, Ewell attacks Culp's Hill on the Union right. Most of the XII Corps has been pulled away to help the left, and a single brigade under George Greene, dug in behind log breastworks, holds the summit against repeated assaults. Confederates take some empty trenches on the lower slope.`,
     why:`Moving troops along interior lines has a price: every unit sent to one end leaves a gap at the other. Greene's earthworks made a small force strong enough to cover it.`,
     tv:`The attack came late and was poorly coordinated with Longstreet's assault. The Confederates who reached the empty trenches did not realize how close they were to the Baltimore Pike, the Union army's main supply road.`,
     ground:`Steep, wooded and rocky. Earthworks on Culp's Hill multiplied the defenders' strength.`,
     board:{h:`Every reinforcement leaves a gap somewhere`, b:`Meade saved the left by weakening the right, and nearly lost Culp's Hill. When you move people to a fire, decide deliberately who holds the position they left, and give them something to hold it with.`, try:`Next time you pull someone onto an urgent project, name who covers their work and what tools they need.`}},
    {when:'3 July, 1 p.m.', title:'The cannonade',
     a:[['t',128,200,170,170,214,190],['t',128,210,170,236,214,200],['g',228,206,180,244,134,210]],
     call:{side:'t', who:'Lee', q:`Two days of attacks on the Union flanks have failed. Longstreet begs you not to attack again. What next?`, opts:[
       {t:`Bombard the center, then send a massive infantry assault across the open ground`, hist:true, ok:false, fb:`This is what Lee ordered. The bombardment failed to knock out the Union guns, and the assault walked straight into them.`},
       {t:`Pull back to a strong position and make Meade attack you`, ok:true, fb:`Longstreet's advice. Lee's army was at its best on defense, and Meade was under pressure to attack.`, alt:{u:{c_pickett:[56,210], c_heth:[56,170], c_art:[66,190]}, a:[['td',104,206,60,206]]}},
       {t:`Throw everything at Culp's Hill again`, ok:false, fb:`Ewell did attack there again early on 3 July and was beaten off. The hill had been reinforced overnight.`, alt:{u:{c_ewell:[282,112], c_pickett:[232,70]}, a:[['t',250,82,282,108],['t',104,210,180,110,230,74]]}}]},
     move:`About 150 Confederate guns open fire on the Union center, the largest bombardment of the war so far. Union artillery chief Henry Hunt orders many of his guns to slow and then stop firing, to save ammunition. The Confederates read the silence as a sign the Union guns have been knocked out.`,
     why:`Lee believed the Union flanks had been reinforced, so the center must be weak. Smoke and long-range fire hid how little damage the bombardment was doing.`,
     tv:`Lee had nearly broken the Union line twice. He reasoned that the center, between the two reinforced flanks, must now be the weak point, and that one massive blow could end the war.`,
     ground:`Many Confederate shells flew high and burst behind the Union line, where few men stood.`,
     board:{h:`Silence is not surrender`, b:`Hunt's guns went quiet on purpose. Read a competitor's quiet period carefully: it may be conserving resources for the moment you commit.`, try:`When a competitor goes quiet, list three reasons other than weakness. Plan for the most dangerous one.`}},
    {when:'3 July, 3 p.m.', title:'Pickett\'s Charge',
     a:[['t',104,210,200,198],['t',106,180,188,178],['g',220,190,206,196]],
     move:`About 12,500 Confederate infantry step out of the trees on Seminary Ridge and march across nearly a mile of open fields toward the Union center. Union artillery tears into them from the front and flanks, then infantry fire hits at close range. A few hundred reach a stone wall at a spot later called the Angle before they are killed, captured or driven back. Roughly half become casualties.`,
     why:`The assault depended on the bombardment having broken the Union center. It had not.`,
     tv:`Many officers in the assault knew the odds as they formed up. Afterward Lee rode among the survivors and told them the failure was his fault.`,
     ground:`Open, gently rolling farmland with fences to climb, under fire the entire way. The fences along the Emmitsburg Road slowed the lines at the worst possible moment.`,
     board:{h:`Do not double down to justify past losses`, b:`After two days of heavy losses, a final all-in push felt like the way to make them worth it. That is the sunk cost trap: losses already spent are not a reason to spend more.`, try:`For any project you are tempted to push harder on, ask: if I were starting fresh today, would I invest in this?`}},
    {when:'July 1863 onward', title:'Aftermath',
     a:[['td',104,210,60,300,40,340],['gd',220,190,180,300,140,360]],
     move:`Lee retreats to Virginia on 4 July. The same day, the Confederate garrison at Vicksburg on the Mississippi surrenders to Grant. The battle has cost the two armies about 50,000 men killed, wounded, captured or missing. Lincoln is frustrated that Meade does not pursue and destroy Lee's army.`,
     why:`Gettysburg ended Lee's last major invasion of the North. Together with Vicksburg, it turned the war's momentum toward the Union, though the fighting lasted almost two more years.`,
     tv:`Lee kept his army together and fought on, but he never again had the strength to invade the North. The South's hopes increasingly rested on wearing down Northern will.`,
     board:{h:`Defense that wins still needs a follow-through`, b:`Meade fought a near-perfect defensive battle, then let a weakened enemy escape. Winning by not losing is real, but the moment after a win is often the cheapest time to press.`, try:`After a defensive win, set a 48-hour plan for what you will push next while the competitor regroups.`}}
  ]
});
