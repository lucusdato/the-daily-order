/* The Daily Order: mystery battles for days 12 to 14 (Alesia, Kursk, Yorktown).
   Positions are written for a 400 square board and stretched to the 600 tall board when loaded. */

PGD.mystery(24,{
  war:'Gallic Wars',
  general:'Julius Caesar',
  pitch:'You are <b>Julius Caesar</b>. You are besieging a town, and an army is attacking you from outside. One wall is about to break.',
  H:600,
  terrain(){
    let s=felt('#9fb06a',600);
    s+=river('M0 150 Q100 170 200 140 Q300 110 400 140',8)+river('M0 470 Q110 440 210 470 Q310 500 400 470',8);
    s+=hill(200,280,86,64,4)+hill(52,92,46,30,2);
    s+=`<ellipse cx="200" cy="290" rx="128" ry="150" fill="none" stroke="#6b4a22" stroke-width="4" stroke-dasharray="10 5"/>`;
    s+=`<ellipse cx="200" cy="300" rx="178" ry="232" fill="none" stroke="#6b4a22" stroke-width="4" stroke-dasharray="10 5"/>`;
    s+=`<rect x="84" y="128" width="34" height="26" fill="none" stroke="#6b4a22" stroke-width="2.4"/>`;
    [[184,262],[204,250],[222,268],[196,284]].forEach(p=>s+=house(p[0],p[1]));
    s+=trees(52,14,[0,400,540,600],()=>true,['#3b6b2b','#45763a']);
    s+=label(200,328,'Alesia',12)+label(200,452,'Inner wall',9)+label(316,560,'Outer wall',9)+label(140,128,'Hill camp',9);
    s+=compass(372,40);
    return s+end(600);
  },
  lead:'Gaul has risen against Rome under Vercingetorix. You have trapped him and his army in the hilltop town of Alesia, and ringed it with a wall. Then a huge Gallic relief army arrived, so you built a second wall facing outward. You are besieging a town, and you are besieged too.',
  sit:'Late September 52 BC. On the final day, the Gauls attack from every side at once. The relief army hits the west. Vercingetorix attacks from inside. A picked force has found the weak spot: a camp on a hill in the north-west, where the ground left the outer wall short. It is starting to give way.',
  mett:{
    m:'Hold both walls and break the relief army.',
    e:'A relief army outside, Vercingetorix\'s army inside, and a picked force attacking the weak hill camp.',
    t:'Two rings of walls round a hilltop town. The hill camp in the north-west sits on awkward, broken ground.',
    tr:'Legions spread thin along both walls, a small reserve, and German cavalry.',
    ti:'Hours. If one wall breaks, the Romans are caught between two armies.'},
  ground:[['Key terrain','The hill camp in the north-west, the weakest point of the outer wall.',[100,95,30]],
          ['Obstacle','The two rings of walls, ditches and traps.',[200,200,60]],
          ['Avenue of approach','The open ground outside the wall, behind the Gauls attacking the hill camp.',[46,34,30]]],
  q:'The hill camp is breaking. Which toy, sent where, breaks the attack instead?',
  qs:'Save the wall: which toy goes where?',
  toys:[['ro_cav','German cavalry'],['ro_res','Labienus and the reserve'],['ro_inner','Legions on the inner wall']],
  zones:[['behind','Out through the wall, behind them',46,34,22],['breach','Into the breach at the hill camp',100,100,22],['town','Storm the town',200,165,22],['west','Help the west wall',40,250,22]],
  ans:{u:'ro_cav',z:'behind'},
  start:{ro_inner:[125,262],ro_outer:[100,95],ro_res:[300,60],ro_cav:[230,70],ro_cmd:[330,100],
         ga_town:[185,180],ga_cmd:[216,190],ga_rel:[32,286],ga_vas:[70,66]},
  fbU:{ro_cav:'Right toy. Only horsemen are fast enough to get outside and round behind the attackers in time.',
       ro_res:'Not this toy. The reserve can plug a hole, but it cannot get behind the enemy fast enough.',
       ro_inner:'Not this toy. If the inner legions leave, Vercingetorix breaks out of the town.'},
  fbZ:{behind:'Right place. The Gauls are all facing the wall. Hit them from behind, and they are caught between two attacks.',
       breach:'Not here. More men in the breach only slow the Gauls down. Something has to break them.',
       town:'Not here. Storming the town now, uphill, while the outer wall is breaking, is the worst of both.',
       west:'Not here. The west wall is holding. The danger is at the hill camp.'},
  fail:{
    'ro_cav@breach':{fire:[['ga_vas','$','clash']],
      b:'Horsemen crowded into a hill camp cannot charge. They fight on foot beside the legions, and the Gauls keep coming.'},
    'ro_cav@town':{u:{ga_vas:[98,116]},fire:[['ga_town','$','clash'],['ga_vas','ro_outer','clash']],ko:['$','ro_outer'],
      b:'The cavalry charges uphill at the town and gets nowhere. Behind them, the Gauls break into the hill camp.'},
    'ro_cav@west':{u:{ga_vas:[98,116]},fire:[['$','ga_rel','clash'],['ga_vas','ro_outer','clash']],ko:['ro_outer'],
      b:'The cavalry helps throw back the relief army in the west. But nobody helps the hill camp in the north, and the Gauls break through there.'},
    'ro_res@behind':{u:{ga_vas:[98,116]},fire:[['ga_vas','ro_outer','clash']],ko:['ro_outer'],idle:['$'],
      b:'Labienus marches his cohorts out and round on foot. It takes far too long, and the hill camp falls before he gets there.'},
    'ro_res@breach':{fire:[['$','ga_vas','clash'],['ga_vas','$','clash']],
      b:'Labienus throws his cohorts into the gap and holds for a while. But the Gauls keep coming in fresh waves, and with nothing hitting them from behind, his men begin to give way.'},
    'ro_res@town':{u:{ga_vas:[98,116]},fire:[['ga_town','$','clash'],['ga_vas','ro_outer','clash']],ko:['$','ro_outer'],
      b:'The reserve attacks the town uphill and is thrown back. Meanwhile the hill camp, with no help coming, falls.'},
    'ro_res@west':{u:{ga_vas:[98,116]},fire:[['ga_vas','ro_outer','clash']],ko:['ro_outer'],idle:['$'],
      b:'The reserve reaches the west wall, which was holding anyway. In the north-west, the Gauls break into the hill camp.'},
    'ro_inner@behind':{u:{ga_town:[130,330]},fire:[['ga_vas','$','clash']],
      b:'Pulling the inner legions out leaves the inner wall empty. Vercingetorix\'s army pours out of the town, and the Romans are caught between both Gallic armies.'},
    'ro_inner@breach':{u:{ga_town:[130,330]},fire:[['$','ga_vas','clash']],ko:[],
      b:'The inner legions help at the hill camp, but the inner wall is left empty. Vercingetorix\'s army breaks out of the town behind them.'},
    'ro_inner@town':{u:{ga_vas:[98,116]},fire:[['ga_town','$','clash'],['ga_vas','ro_outer','clash']],ko:['$','ro_outer'],
      b:'Storming a hilltop town, uphill, against the whole Gallic army inside. The attack fails, and the hill camp falls behind you.'},
    'ro_inner@west':{u:{ga_vas:[98,116]},fire:[['$','ga_rel','clash'],['ga_vas','ro_outer','clash']],ko:['ro_outer'],
      b:'The inner legions help hold the west wall, but nobody helps the hill camp, and it falls.'}},
  clues:[
    {cat:'e',t:'All facing one way',b:'The Gauls attacking the hill camp are all facing the wall, pushing to get in. Nobody is watching behind them.'},
    {cat:'e',card:'gaul52'},
    {cat:'t',t:'Gates in the wall',b:'The outer wall has gates. Troops can go out through a quiet stretch and come round on the open ground outside.'},
    {cat:'tr',card:'germcav52'},
    {cat:'m',t:'Hammer and anvil',b:'The legions in the camp are the anvil. Something fast has to hit the Gauls from behind.'}],
  deduce:[['The Gauls at the hill camp are all facing the wall.','Their backs are open.'],
          ['The outer wall has gates on quieter stretches.','Troops can get out and round behind them.'],
          ['Only horsemen are fast enough to get there in time.','Send the German cavalry out and round, and hit them from behind.']],
  /* The real battle. North is up. The town is in the middle, inside two rings of Roman walls. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={ro_inner:[125,262],ro_outer:[100,95],ro_res:[300,60],ro_cav:[230,70],ro_cmd:[330,100],
           ga_town:[200,200],ga_cmd:[216,190],ga_rel:[24,330,'off'],ga_vas:[20,20,'off']};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Trapped on the hill',b:'Vercingetorix has taken his army into Alesia, a hilltop town between two rivers. Too strong to storm, so Caesar decides to starve it out.'});
    add(0,{},{t:'Two walls',b:'The Romans dig ditches and build a wall with towers right round the town. When they hear a relief army is coming, they build a second ring facing outward.'});
    add(1,{ga_rel:[32,286]},{t:'The relief army',b:'A huge relief army arrives from across Gaul and camps outside. Its first attacks on the outer wall are thrown back.'});
    add(2,{ga_vas:[70,66],ga_town:[185,180]},{a:[['t',200,200,188,184]],t:'The weak spot',b:'On the final day, a picked force under Vercassivellaunus attacks the hill camp in the north-west, where the wall was weakest. Vercingetorix attacks from inside at the same time.',
      fire:[['ga_vas','ro_outer','clash'],['ga_town','ro_inner','arrows']]});
    add(2,{ro_res:[100,100]},{a:[['g',300,60,104,98]],t:'Labienus',b:'Caesar sends Labienus with cohorts to the hill camp. He holds, but only just.',
      fire:[['ro_res','ga_vas','clash'],['ga_vas','ro_res','clash']]});
    add(2,{ro_cmd:[140,110]},{a:[['g',330,100,144,110]],t:'Caesar arrives',b:'Caesar hurries to the hill camp with more men. His red cloak tells both sides he is there.',
      fire:[['ga_vas','ro_outer','clash'],['ro_res','ga_vas','clash']]});
    add(2,{ro_cav:[46,34],ga_vas:[70,66,'ko']},{a:[['g',230,70,150,10,50,30]],t:'From behind',b:'Caesar\'s cavalry rides out through the outer wall, circles round and hits the attackers from behind. Caught between the horsemen and the legions, the Gauls break.',
      fire:[['ro_cav','ga_vas','clash'],['ro_res','ga_vas','clash'],['ro_outer','ga_vas','clash']]});
    add(2,{ga_rel:[0,286,'exit'],ga_town:[200,200]},{a:[['t',185,180,198,196]],t:'Surrender',b:'The relief army melts away. The next day Vercingetorix rides out of Alesia and surrenders to Caesar. The war for Gaul is effectively over.'});
    return S;
  })(),
  video:{id:'SU1Ej9Yqt68',t:'The Battle of Alesia (52 B.C.E.)',ch:'Historia Civilis',v:2689315},
  sources:[['Battle of Alesia (Schools Wikipedia selection, archived)','https://dlab.epfl.ch/wikispeedia/wpcd/wp/b/Battle_of_Alesia.htm'],
           ['Time Travel Rome: the siege of Alesia','https://www.timetravelrome.com/?p=4262'],
           ['Weapons and Warfare: Alesia, 52 BC','https://weaponsandwarfare.com/?p=12390'],
           ['Battle of Alesia, on RallyPoint (from Wikipedia)','https://www.rallypoint.com/shared-links/battle-of-alesia-wikipedia']],
  cards:{ro_inner:'legion52',ro_outer:'legion52',ro_res:'legion52',ro_cav:'germcav52',ga_town:'gaul52',ga_rel:'gaul52',ga_vas:'picked52'}
});

PGD.mystery(19,{
  war:'Second World War',
  general:'Georgy Zhukov',
  pitch:'You are <b>Georgy Zhukov</b>. The Germans are about to hit the Kursk bulge from both sides. Your best tank reserve is still yours to place.',
  H:600,
  terrain(){
    let s=felt('#a7b06a',600);
    const F='M400 80 L260 92 Q150 104 92 160 Q48 300 100 440 Q170 520 262 512 L400 522';
    s+=`<path d="${F} V600 H400 Z" fill="none"/><path d="M400 80 L260 92 Q150 104 92 160 Q48 300 100 440 Q170 520 262 512 L400 522 Z" fill="#c4c98a" opacity=".55"/>`;
    s+=`<path d="${F}" fill="none" stroke="#b5432f" stroke-width="3.4" stroke-dasharray="9 5"/>`;
    [16,32,48].forEach(k=>s+=`<path d="M400 ${80+k} L262 ${92+k} Q${150+k} ${104+k} ${92+k} ${160+k*.6} Q${48+k*1.1} 300 ${100+k} ${440-k*.6} Q${170+k*.4} ${520-k} 262 ${512-k} L400 ${522-k}" fill="none" stroke="#6b5838" stroke-width="1.4" stroke-dasharray="2 5" opacity=".7"/>`);
    s+=river('M0 250 Q60 270 110 250',6)+river('M330 600 Q320 560 340 530',6);
    s+=trees(1943,12,[0,400,0,70],()=>true,['#3b6b2b','#45763a'])+trees(43,10,[0,400,540,600],()=>true,['#3b6b2b','#45763a']);
    s+=city(296,330,'Kursk',11,-9)+city(112,30,'Orel',10,-8)+city(252,560,'Belgorod',10,-8)+city(322,412,'Prokhorovka',9,-8);
    s+=label(60,330,'Front line',9,-70)+label(300,160,'The Kursk bulge',11);
    s+=compass(30,560);
    return s+end(600);
  },
  lead:'Stalingrad has been won, and the front line now bulges west around the city of Kursk. It is the obvious place for the Germans to attack, and Soviet intelligence says they will, as soon as their new heavy tanks are ready.',
  sit:'Early July 1943. Two Soviet fronts hold the bulge, dug in behind deep belts of mines and anti-tank guns. Stalin\'s generals are split: some want to attack first. You argued for letting the Germans come. Now you must decide what to do with the Steppe Front, your big reserve of tanks.',
  mett:{
    m:'Break the German offensive, then counterattack.',
    e:'Two powerful German pincers, north and south, with new Tiger and Panther tanks.',
    t:'Open, rolling farmland. The bulge pokes west into the German lines, so it can be hit from both sides.',
    tr:'Two fronts dug in on the faces of the bulge, belts of anti-tank strongpoints, and the Steppe Front in reserve.',
    ti:'Days. The Germans will attack any morning now.'},
  ground:[['Key terrain','The belts of mines, trenches and anti-tank guns across the bulge.',[170,200,50]],
          ['Avenue of approach','The southern shoulder, where the strongest German tanks wait.',[220,330,40]],
          ['Obstacle','The front line around the bulge.',[90,200,30]]],
  q:'The Germans will attack both shoulders. Which toy, sent where, wins the battle?',
  qs:'Break Citadel: which toy goes where?',
  toys:[['so_steppe','Steppe Front tanks'],['so_belts','Anti-tank guns'],['so_vor','Voronezh Front']],
  zones:[['reserve','Hold them back, east of the bulge',360,200,24],['attack','Strike first, at Orel',150,52,22],['north','Into the northern face',200,96,22],['south','Into the southern face',215,300,22]],
  ans:{u:'so_steppe',z:'reserve'},
  start:{so_cen:[200,110],so_vor:[200,290],so_belts:[170,200],so_steppe:[250,200],so_zhukov:[340,120],
         ge_model:[150,30],ge_hoth:[220,380],ge_kempf:[300,390],ge_cmd:[180,390]},
  fbU:{so_steppe:'Right toy. Your reserve tanks are the one force free to move. Where they wait decides the battle.',
       so_belts:'Not this toy. The anti-tank guns are already where they need to be, in belts across the German routes.',
       so_vor:'Not this toy. The Voronezh Front is holding the southern face. Move it, and that face is empty.'},
  fbZ:{reserve:'Right place. Keep the reserve back until the Germans have worn themselves out on the belts. Then hit them.',
       attack:'Not here. Attacking first means hitting German tanks while they are fresh and at full strength.',
       north:'Not here. Committing everything to one face leaves nothing for wherever the Germans get furthest.',
       south:'Not here. Committed too early, the reserve meets the German tanks before the belts have worn them down.'},
  fail:{
    'so_steppe@attack':{fire:[['ge_model','$','tank']],
      b:'Attacking first throws your reserve against the German tanks while they are at full strength. It is shot to pieces, and the Germans still attack.'},
    'so_steppe@north':{u:{ge_hoth:[230,330]},fire:[['ge_hoth','so_vor','tank']],ko:['so_vor'],idle:['$'],
      b:'Your reserve joins the northern face. When the Germans break deep into the southern face, there is nothing left to stop them.'},
    'so_steppe@south':{fire:[['ge_hoth','$','tank']],
      b:'Committed early in the south, your reserve meets the German tanks head on before the belts have worn them down. It is badly mauled.'},
    'so_belts@reserve':{u:{ge_hoth:[230,330]},fire:[['ge_hoth','so_vor','tank']],ko:['so_vor'],idle:['$'],
      b:'Pulling the anti-tank guns back leaves the front with nothing to stop tanks. The German armour breaks straight through the southern face.'},
    'so_belts@attack':{fire:[['ge_model','$','tank']],
      b:'Anti-tank guns are built to wait for tanks, not to charge them. Pushed out into the open, they are overrun.'},
    'so_belts@north':{u:{ge_hoth:[230,330]},fire:[['ge_hoth','so_vor','tank']],ko:['so_vor'],idle:['$'],
      b:'All the guns go to the northern face. The attack there stalls, but the southern face has nothing left to stop tanks, and the Germans break through.'},
    'so_belts@south':{u:{ge_model:[160,80]},fire:[['ge_model','so_cen','tank']],ko:['so_cen'],idle:['$'],
      b:'All the guns go to the southern face. Now the north has nothing to stop tanks, and the German pincer there breaks through.'},
    'so_vor@reserve':{u:{ge_hoth:[215,300]},fire:[['ge_hoth','so_belts','tank']],ko:[],idle:['$'],
      b:'The Voronezh Front pulls back, and the Germans drive into the empty southern face without a fight.'},
    'so_vor@attack':{fire:[['ge_model','$','tank']],
      b:'The Voronezh Front leaves its trenches to attack in the north, straight into German tanks. It is cut to pieces in the open.'},
    'so_vor@north':{u:{ge_hoth:[215,300]},fire:[['ge_hoth','so_belts','tank']],ko:[],idle:['$'],
      b:'Sending the southern armies north leaves the southern face empty. The German tanks drive straight in.'},
    'so_vor@south':{ko:[],idle:['$'],
      b:'The Voronezh Front is already dug in on the southern face. Nothing changes, and the big question, what to do with the reserve, is left unanswered.'}},
  clues:[
    {cat:'e',t:'They are coming',b:'Intelligence says the Germans will attack both shoulders of the bulge, with new heavy tanks.'},
    {cat:'e',card:'tiger1943'},
    {cat:'t',t:'Belts',b:'Your armies have dug belt after belt of mines, trenches and anti-tank guns across the likely routes. Every belt costs the attacker tanks.'},
    {cat:'tr',card:'t34_1943'},
    {cat:'m',t:'Let them come',b:'Let the Germans wear themselves out on the belts. Strike with fresh tanks only once they are tired and far from home.'}],
  deduce:[['You know where and roughly when the Germans will attack.','Make them attack into prepared belts.'],
          ['Every belt they cross costs them tanks.','Time is on your side once they start.'],
          ['A fresh reserve is worth most once the attacker is spent.','Hold the Steppe Front back, east of the bulge, and strike later.']],
  /* The real battle. North is up. The bulge pokes west into the German lines. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={so_cen:[200,110],so_vor:[200,290],so_belts:[170,200],so_steppe:[250,200],so_zhukov:[340,120],
           ge_model:[150,30],ge_hoth:[220,380],ge_kempf:[300,390],ge_cmd:[180,390]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'The bulge',b:'The front line bulges west around Kursk, with German armies to the north and south. Zhukov argues for defending first and counterattacking later, and Stalin agrees.'});
    add(0,{},{t:'Digging in',b:'Soldiers and civilians dig belt after belt of trenches, minefields and anti-tank strongpoints across the likely German routes, hundreds of kilometres deep in all.'});
    add(0,{so_steppe:[360,200]},{a:[['g',250,200,354,200]],t:'The reserve',b:'Behind the bulge, a whole extra front, the Steppe Front under Konev, is held back in reserve.'});
    add(1,{ge_model:[175,82],ge_hoth:[235,315],ge_kempf:[300,340]},{a:[['t',150,30,172,78],['t',220,380,234,320],['t',300,390,300,346]],t:'Citadel',b:'On 5 July the Germans attack both shoulders of the bulge at once, with hundreds of new heavy tanks.',
      fire:[['ge_model','so_cen','tank'],['ge_hoth','so_vor','tank'],['so_belts','ge_model','cannon'],['so_belts','ge_hoth','cannon']]});
    add(1,{},{t:'Stuck in the north',b:'In the north, the attack bogs down in the minefields and anti-tank fire after only a few kilometres.',fire:[['so_cen','ge_model','rifle'],['so_belts','ge_model','cannon']]});
    add(1,{ge_hoth:[250,270],so_vor:[205,268],ge_kempf:[300,320]},{a:[['t',235,315,248,276]],t:'Deeper in the south',b:'In the south, the German tanks push deeper, through one belt after another, losing tanks and men all the way.',
      fire:[['ge_hoth','so_vor','tank'],['so_vor','ge_hoth','rifle'],['so_belts','ge_hoth','cannon']]});
    add(2,{so_steppe:[290,250]},{a:[['g',360,200,294,246]],t:'Prokhorovka',b:'On 12 July, Soviet tank reserves crash into the German spearhead near Prokhorovka, in one of the biggest tank battles in history.',
      fire:[['so_steppe','ge_hoth','tank'],['ge_hoth','so_steppe','tank'],['so_steppe','ge_kempf','tank']]});
    add(2,{ge_model:[150,6,'exit'],ge_hoth:[240,394,'exit'],ge_kempf:[312,394,'exit']},{a:[['gd',250,270,240,380]],t:'Called off',b:'Hitler calls the attack off. The Red Army counterattacks, and the Germans never again launch a big offensive in the east.'});
    return S;
  })(),
  video:{id:'90q0ruMFcBY',t:'World War II: The Battle of Kursk, full documentary',ch:'Extreme Mysteries',v:2736533},
  sources:[['Encyclopedia.com: Kursk, Battle of','https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/kursk-battle'],
           ['Warfare History Network: the Battle of Kursk','https://warfarehistorynetwork.com/?p=56584'],
           ['History Skills: how the Soviets won at Kursk','https://www.historyskills.com/classroom/year-10/battle-of-kursk'],
           ['TheCollector: how intelligence and engineering won at Kursk','https://www.thecollector.com/battle-kursk-tank-clash/'],
           ['History Rise: the Kursk salient','https://historyrise.com/article/battle-of-kursk-salient-the-german-attempt-to-break-soviet-lines/']],
  cards:{so_cen:'rifle1943',so_vor:'rifle1943',so_belts:'atgun1943',so_steppe:'t34_1943',ge_model:'panzer1943',ge_hoth:'tiger1943',ge_kempf:'panzer1943'}
});

PGD.mystery(27,{
  war:'American Revolution',
  general:'George Washington',
  pitch:'You are <b>George Washington</b>. A French fleet is sailing for Virginia. You have one chance to trap a British army.',
  H:600,
  terrain(){
    let s=felt('#a9b56e',600);
    s+=sea('M300 0 Q322 120 304 210 Q322 270 302 330 Q282 352 262 352 Q240 360 238 400 Q236 444 262 470 Q292 486 304 520 Q298 560 310 600 H400 V0 Z');
    s+=river('M150 0 Q154 30 162 70',7)+river('M60 392 Q150 380 246 384',6)+river('M60 452 Q160 444 250 462',6);
    s+=road('M140 112 Q160 160 168 220 Q176 280 174 330 Q176 350 180 356');
    s+=trees(1781,16,[0,290,140,600],()=>true,['#3b6b2b','#45763a']);
    s+=city(160,40,'New York',10,-8)+city(214,376,'Yorktown',10,16);
    s+=label(110,320,'Virginia',11)+label(360,160,'Atlantic Ocean',10,90)+label(276,412,'Chesapeake Bay',9,-70)+label(190,292,'Road south',9,-80)+label(110,560,'To the Carolinas',9);
    s+=compass(30,40);
    return s+end(600);
  },
  lead:'Six years into the Revolutionary War, the British hold New York. In the south, General Cornwallis has marched his army into Virginia and dug in at Yorktown, on the water, to wait for the Royal Navy. You and the French general Rochambeau have been planning to attack New York.',
  sit:'Mid-August 1781. A letter arrives: the French admiral de Grasse is sailing from the Caribbean for Chesapeake Bay, with 28 warships and 3,200 soldiers. But he can only stay until mid-October.',
  mett:{
    m:'Trap and capture a British army before the French fleet has to leave.',
    e:'Clinton in New York with about 10,000 men. Cornwallis at Yorktown with about 8,000, waiting for the navy.',
    t:'Hundreds of kilometres of road between New York and Virginia. Yorktown sits on a peninsula with water on three sides.',
    tr:'Your Continental Army, Rochambeau\'s French army, and Lafayette\'s small force already in Virginia.',
    ti:'About two months. De Grasse sails away in mid-October.'},
  ground:[['Key terrain','Yorktown, with water on three sides and one road out by land.',[214,250,30]],
          ['Avenue of approach','The long road south from New York to Virginia.',[170,200,40]],
          ['Obstacle','New York, with strong forts and the British fleet nearby.',[160,30,30]]],
  q:'The French fleet is coming. Which toy, sent where, traps a British army?',
  qs:'Spring the trap: which toy goes where?',
  toys:[['am_cont','Your army'],['am_laf','Lafayette\'s force'],['am_fleet','De Grasse\'s fleet']],
  zones:[['york','March south to Yorktown',176,236,24],['ny','Attack New York',150,46,20],['carolina','Into the Carolinas',100,370,22],['wait','Wait outside New York',110,120,20]],
  ans:{u:'am_cont',z:'york'},
  start:{am_cont:[140,70],am_fr:[160,70],am_cmd:[150,90],am_laf:[150,270],am_fleet:[370,300],
         br_corn:[214,250],br_cmd:[222,244],br_ny:[160,30],br_navy:[390,40,'off']},
  fbU:{am_cont:'Right toy. Only your main army, with the French beside it, is big enough to besiege a whole British army.',
       am_laf:'Not this toy. Lafayette is already watching Cornwallis, but his force is far too small to besiege him.',
       am_fleet:'Not this toy. De Grasse is already on his way to the bay. The move that matters is yours.'},
  fbZ:{york:'Right place. With the French fleet closing the water, an army on the land side leaves Cornwallis nowhere to go.',
       ny:'Not here. New York is strongly held and guarded by the British fleet. The trap is in Virginia.',
       carolina:'Not here. Cornwallis left the Carolinas months ago. He is at Yorktown now.',
       wait:'Not here. Waiting runs down the clock, and the French fleet can only stay until mid-October.'},
  fail:{
    'am_cont@ny':{fire:[['br_ny','$','musket']],
      b:'Attacking New York\'s forts with no fleet to help is just what Clinton is ready for. Meanwhile in Virginia, nobody is closing in on Cornwallis.'},
    'am_cont@carolina':{ko:[],idle:['$'],
      b:'The army marches deep into the Carolinas, chasing an enemy who left months ago. Cornwallis stays safe at Yorktown.'},
    'am_cont@wait':{ko:[],idle:['$'],
      b:'Waiting outside New York keeps Clinton nervous, but the weeks slip by. In mid-October de Grasse has to sail away, and the chance is gone.'},
    'am_laf@york':{fire:[['br_corn','$','musket'],['$','br_corn','musket']],
      b:'Lafayette\'s small force closes in on Yorktown alone. It is far too weak to besiege a whole British army, and Cornwallis\'s men drive it off.'},
    'am_laf@ny':{fire:[['br_ny','$','musket']],
      b:'Lafayette marches all the way north to attack New York. Cornwallis is left free in Virginia.'},
    'am_laf@carolina':{ko:[],idle:['$'],
      b:'Lafayette heads south into the Carolinas. Nobody is watching Cornwallis any more.'},
    'am_laf@wait':{ko:[],idle:['$'],
      b:'Lafayette leaves Virginia to join the main army near New York. Now nobody is watching Cornwallis at all.'},
    'am_fleet@york':{fire:[['$','br_corn','broadside'],['br_corn','$','musket']],ko:[],
      b:'Ships can close the water and bombard the town, but they cannot dig siege lines. Without an army on land, Cornwallis can hold out.'},
    'am_fleet@ny':{fire:[['br_ny','$','cannon']],
      b:'De Grasse sails for New York instead, where the harbour is guarded by forts and the British fleet. Cornwallis is left alone.'},
    'am_fleet@carolina':{ko:[],idle:['$'],
      b:'The fleet sails for the Carolina coast, far from Cornwallis. The bay stays open for the Royal Navy.'},
    'am_fleet@wait':{ko:[],idle:['$'],
      b:'De Grasse sails north to wait off New York. In Virginia, the bay stays open, and Cornwallis can be rescued by sea.'}},
  clues:[
    {cat:'e',t:'Waiting for the navy',b:'Cornwallis has dug in at Yorktown, by the water, to wait for the Royal Navy to bring supplies or carry his army away.'},
    {cat:'e',card:'rnfleet1781'},
    {cat:'ti',t:'A short window',b:'De Grasse\'s fleet can stay in the Chesapeake only until mid-October. Then it must sail away.'},
    {cat:'tr',card:'frinf1781'},
    {cat:'m',t:'Close the trap',b:'With the French fleet closing the water, Cornwallis can only get out by land. Put a big army across his road out.'}],
  deduce:[['Cornwallis is waiting at Yorktown for the Royal Navy.','If the French fleet holds the bay, no help can reach him by sea.'],
          ['The French fleet can only stay until mid-October.','There is time for one big move, not two.'],
          ['Only your main army can besiege a whole British army.','March it south to Yorktown, fast, and close the land side.']],
  /* The real campaign. North is up. New York is at the top, Virginia at the bottom, the Atlantic to the east. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={am_cont:[140,70],am_fr:[160,70],am_cmd:[150,90],am_laf:[150,270],am_fleet:[390,390,'off'],
           br_corn:[214,250],br_cmd:[222,244],br_ny:[160,30],br_navy:[390,40,'off']};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Two targets',b:'Summer 1781. Washington and Rochambeau plan to attack New York, held by Clinton with about 10,000 men. In Virginia, Cornwallis has fortified Yorktown, with Lafayette keeping watch.'});
    add(0,{am_fleet:[370,300]},{t:'News from de Grasse',b:'On 14 August, Washington learns that de Grasse is sailing for the Chesapeake. Within days he gives up the New York plan.'});
    add(1,{am_cont:[166,196],am_fr:[186,204],am_cmd:[176,180]},{a:[['g',140,70,164,190],['g',160,70,184,198]],t:'The march south',b:'The allied armies slip away south, while fake camps and false rumours keep Clinton expecting an attack on New York.'});
    add(1,{am_fleet:[310,280],br_navy:[340,230]},{a:[['g',370,300,314,282],['t',390,40,340,224]],t:'Battle of the Capes',b:'On 5 September, de Grasse fights the British fleet at the mouth of the bay. The British pull back to New York, and the bay stays closed.',
      fire:[['am_fleet','br_navy','broadside'],['br_navy','am_fleet','broadside']]});
    add(1,{br_navy:[392,60,'exit'],am_cont:[186,232],am_fr:[200,262],am_cmd:[178,214],am_laf:[170,280]},{a:[['gd',340,230,390,66],['g',166,196,184,228],['g',186,204,198,256]],t:'Surrounded',b:'By 28 September, around 16,000 American and French soldiers surround Yorktown by land, while de Grasse\'s ships close the water.',
      fire:[['am_cont','br_corn','musket'],['am_fr','br_corn','musket'],['br_corn','am_fr','musket'],['am_fr','br_cmd','musket']]});
    add(2,{},{t:'The siege lines',b:'The allies dig siege trenches and open fire with heavy guns. On the night of 14 October, they storm two key redoubts in the British defences.',
      fire:[['am_cont','br_corn','cannon'],['am_fr','br_corn','cannon'],['am_fr','br_cmd','cannon'],['am_fleet','br_corn','broadside']]});
    add(2,{br_corn:[214,250,'ko'],br_cmd:[222,244,'ko']},{t:'Surrender',b:'On 19 October 1781, Cornwallis surrenders his whole army of about 7,500 men. It is the last major battle of the war.',
      fire:[['am_cont','br_corn','cannon'],['am_fr','br_cmd','cannon']]});
    return S;
  })(),
  video:{id:'7tXmpIp6_7c',t:'Now Or Never: Yorktown Campaign of 1781',ch:'George Washington\'s Mount Vernon',v:1392090},
  sources:[['National Park Service: events leading to the siege of Yorktown','https://www.nps.gov/york/learn/historyculture/eventstoyorktown.htm'],
           ['National Park Service: George Washington and the trail to Yorktown','https://www.nps.gov/waro/learn/historyculture/george-washington-and-the-trail.htm'],
           ['National Park Service: strategy of the siege','https://www.nps.gov/parkhistory/online_books/hh/14/hh14b.htm'],
           ['National Park Service: Colonials and Patriots, victory at Yorktown','https://www.nps.gov/parkhistory/online_books/colonials-patriots/introl.htm'],
           ['World History Encyclopedia: Siege of Yorktown','https://worldhistory.org/article/2532/siege-of-yorktown']],
  cards:{am_cont:'cont1781',am_fr:'frinf1781',am_laf:'cont1781',am_fleet:'frfleet1781',br_corn:'redcoat1781',br_ny:'redcoat1781',br_navy:'rnfleet1781'}
});
