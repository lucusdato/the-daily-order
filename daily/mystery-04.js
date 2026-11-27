/* The Daily Order: mystery battles for days 12 to 16 (Alesia, Kursk, Yorktown, Rorke's Drift, Vicksburg).
   Positions are written for a 400 square board and stretched to the 600 tall board when loaded. */

PGD.mystery(24,{
  war:'Gallic Wars',
  general:'Julius Caesar',
  pitch:'You are <b>Julius Caesar</b>. The leader of a Gallic revolt has shut himself and his army inside a hilltop town, and all of Gaul is coming to save him. Take the town without getting caught in between.',
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
  lead:'Gaul has risen against Rome under Vercingetorix. You have chased him and his army to Alesia, a hilltop town between two rivers.',
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
  toys:[['ro_cav','German cavalry','the German cavalry'],['ro_res','Labienus and the reserve','Labienus and the reserve'],['ro_inner','Legions on the inner wall','the legions from the inner wall']],
  zones:[['behind','Out through the wall, behind them',46,34,22,'out through the wall and round behind the attackers'],['breach','Into the breach at the hill camp',100,100,22,'into the breach at the hill camp'],['town','Storm the town',200,165,22,'up the hill to storm the town'],['west','Help the west wall',40,250,22,'to help the west wall']],
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
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, start:{ro_inner:[300,340],ro_outer:[340,300],ro_res:[300,60],ro_cav:[230,70]}, after:[0],
     qs:'Take the town: which toy goes where?',
     sit:'52 BC. Vercingetorix has taken his army, perhaps 80,000 men, into Alesia. The town sits on a steep hill between two rivers, and your army is camped round the foot of it.',
     q:'You cannot fight your way up that hill. Which toy, sent where, takes the town anyway?',
     intel:[['The town','Steep slopes on every side and a whole army on top. An attack uphill would be cut to pieces.'],
            ['Too many mouths','Tens of thousands of soldiers and townspeople are packed inside. Their food will not last for ever.'],
            ['Your men','Roman legionaries carry spades as well as swords. They are expert at digging ditches and building walls.']],
     toys:[['ro_inner','Legions','the legions'],['ro_res','Labienus and the reserve','Labienus and the reserve'],['ro_cav','German cavalry','the German cavalry']],
     zones:[['ring','Wall round the town',125,262,22,'to dig a wall right round the town'],['storm','Storm the hill',200,250,22,'up the hill to storm the town'],['plain','Out onto the plain',40,330,22,'out onto the plain to offer battle'],['away','March away',380,380,20,'away from Alesia']],
     ans:{u:['ro_inner','ro_res'],z:'ring'},
     hint:{u:'Think about which troops can build, not just fight.',z:'The town is too strong to take by force. What does a crowded town run out of?'},
     fbU:{ro_inner:'Right toy. Legionaries can dig and build as well as fight.',
          ro_res:'Right toy. Every legionary can dig, and this job needs all of them.',
          ro_cav:'Not this toy. Horsemen are for fighting in the open. Walls and ditches are work for legionaries with spades.'},
     fbZ:{ring:'Right place. Shut the town in, and hunger will do what an attack up the hill cannot.',
          storm:'An attack uphill against a whole army behind walls is cut to pieces on the slopes.',
          plain:'Vercingetorix has no reason to come down and fight you. He just waits on his hill.',
          away:'March away, and the revolt goes on, with Vercingetorix free to gather more men.'},
     fail:{ring:{ko:[]},storm:{ko:[],fire:[['ga_town','$','arrows']]},plain:{ko:[],idle:['$']},away:{ko:[],idle:['$']}}},
    {after:[1,2,3],
     qs:'Help is coming: which toy goes where?',
     sit:'Your legions are digging a ditch and a wall right round the town. Just before it closed, Vercingetorix\'s horsemen slipped out and rode off to call all of Gaul to his rescue. A huge relief army will come.',
     q:'A second army is coming to break the siege. Which toy, sent where, keeps you safe from both?',
     intel:[['Help is coming','The relief army will be far bigger than your own.'],
            ['The town','Still too strong to storm, and the people inside are starting to go hungry.'],
            ['Your works','A ditch and a wall stop an army coming in just as well as one going out.']],
     toys:[['ro_inner','Legions on the inner wall','the legions'],['ro_res','Labienus and the reserve','Labienus and the reserve'],['ro_cav','German cavalry','the German cavalry']],
     zones:[['outer','Build a wall facing out',200,360,22,'out to build a second wall, facing outward'],['storm','Storm the town now',200,240,22,'up the hill to storm the town before help comes'],['meet','Meet them in the open',30,300,22,'out to meet the relief army in open country'],['leave','Lift the siege',380,380,20,'away, giving up the siege']],
     ans:{u:['ro_inner','ro_res'],z:'outer'},
     hint:{u:'Horsemen ride and fight. Building is for men with spades.',z:'Your wall keeps the town in. What would keep the relief army out?'},
     fbU:{ro_inner:'Right toy. The legionaries who built the first wall can build a second.',
          ro_res:'Right toy. A wall this long needs every spare legionary.',
          ro_cav:'Not this toy. Horsemen cannot build a wall. They are better kept ready to ride out.'},
     fbZ:{outer:'Right place. With a wall facing each way, you can hold off both armies with fewer men.',
          storm:'The town is still too strong to storm. A failed attack uphill only weakens you before the relief army arrives.',
          meet:'Out in the open, a far bigger army surrounds you, and Vercingetorix comes down the hill behind you.',
          leave:'Lift the siege, and Vercingetorix walks free with all of Gaul behind him.'},
     fail:{outer:{ko:[]},storm:{ko:[],fire:[['ga_town','$','arrows']]},meet:{ko:[],idle:['$']},leave:{ko:[],idle:['$']}}},
    {after:[4,5,6,7],
     hint:{u:'Ask which of your troops is fast enough to get round in time.',z:'The attackers are all facing the wall. Think about what is behind them.'},
     intel:[['All facing one way','The Gauls attacking the hill camp are all facing the wall, pushing to get in. Nobody is watching behind them.'],
            ['Gates in the wall','The outer wall has gates. Troops can go out through a quiet stretch and come round on the open ground outside.'],
            ['Inside the town','Vercingetorix is attacking the inner wall at the same time.']]}],
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
  pitch:'You are <b>Georgy Zhukov</b>. The front line bulges around Kursk, and the Germans are about to hit it from both sides with new heavy tanks. Meet the biggest tank attack of the war.',
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
  toys:[['so_steppe','Steppe Front tanks','the Steppe Front tanks'],['so_belts','Anti-tank guns','the anti-tank guns'],['so_vor','Voronezh Front','the Voronezh Front']],
  zones:[['reserve','Hold them back, east of the bulge',360,200,24,'back to wait east of the bulge'],['attack','Strike first, at Orel',150,52,22,'forward to strike first at Orel'],['north','Into the northern face',200,96,22,'into the northern face'],['south','Into the southern face',232,328,22,'into the southern face']],
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
      b:'The Voronezh Front climbs out of its own trenches and moves up to the front edge of the southern face. It wins nothing there, and the big question, what to do with the reserve, is left unanswered.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, start:{so_belts:[336,276]}, after:[0,1],
     qs:'Attack or wait: which toy goes where?',
     sit:'Spring 1943. Soviet intelligence says the Germans will attack both shoulders of the Kursk bulge as soon as their new heavy tanks are ready. Some of Stalin\'s generals want to hit them first. You have months to prepare.',
     q:'You know where they will come. Which toy, sent where, makes them pay for it?',
     intel:[['They are coming','The Germans will attack the northern and southern shoulders of the bulge, with hundreds of new heavy tanks.'],
            ['Time','You have months before they are ready. Soldiers and civilians can dig a great deal in that time.'],
            ['The attacker pays','An army that attacks into dug-in guns and minefields loses far more tanks than the army waiting for it.']],
     toys:[['so_belts','Anti-tank guns','the anti-tank guns'],['so_steppe','Tank reserve','your tank reserve'],['so_cen','Central Front','the Central Front']],
     zones:[['dig','Dig in across their routes',170,200,24,'forward to dig belts of mines and guns across the German routes'],['orel','Strike first at Orel',150,56,22,'forward to strike first at Orel'],['belg','Strike first at Belgorod',260,362,22,'forward to strike first at Belgorod'],['kursk','Guard Kursk itself',310,220,20,'back to guard the city of Kursk']],
     ans:{u:'so_belts',z:'dig'},
     hint:{u:'Which of your troops does its best work standing still, waiting?',z:'You know where they will come. Be there first, dug in and ready.'},
     fbU:{so_belts:'Right toy. Anti-tank guns are at their best dug in, waiting for tanks to come to them.',
          so_steppe:'Not this toy. Your tanks are the punch. Spend them later, not on the first move.',
          so_cen:'Not this toy. The Central Front already holds the northern face. Move it, and it leaves a hole.'},
     fbZ:{dig:'Right place. Every belt the Germans have to cross costs them tanks before they get anywhere.',
          orel:'Strike first, and it is your men who attack fresh German tanks, and your side that pays.',
          belg:'Strike first, and it is your men who attack fresh German tanks, and your side that pays.',
          kursk:'Guns parked by the city do nothing until the Germans are already deep inside the bulge.'},
     fail:{dig:{ko:[]},orel:{ko:[],fire:[['ge_model','$','tank']]},belg:{ko:[],fire:[['ge_hoth','$','tank']]},kursk:{ko:[],idle:['$']}}},
    {after:[2,3,4,5],
     hint:{u:'Two of these are already where they need to be. One is free to move.',z:'A fresh reserve is worth most once the attacker is tired.'},
     intel:[['Belts','Belt after belt of mines, trenches and anti-tank guns now crosses the likely German routes. Every belt costs the attacker tanks.'],
            ['The two faces','The Central Front holds the northern face. The Voronezh Front holds the southern face.']]},
    {from:5, after:[6,7],
     qs:'Strike back: which toy goes where?',
     sit:'July 1943. In the north, the German attack has stuck fast after a few kilometres. In the south, their tanks have pushed through one belt after another and are nearing Prokhorovka. They have lost many tanks and men on the way.',
     q:'The German spearhead in the south is tired and far from home. Which toy, sent where, stops it?',
     intel:[['North','The German attack there has stalled in the minefields and anti-tank fire.'],
            ['South','The German tanks are deep in the southern face, near the railway station at Prokhorovka.'],
            ['Your reserve','Your reserve tank armies are fresh and have not fired a shot yet.']],
     toys:[['so_steppe','Tank reserve','your tank reserve'],['so_cen','Central Front','the Central Front'],['so_belts','Anti-tank guns','the anti-tank guns']],
     zones:[['prok','Prokhorovka',290,250,22,'down to Prokhorovka, into the German spearhead'],['north','The northern face',140,120,22,'up to the northern face'],['back','Guard Kursk',310,215,20,'back to guard Kursk'],['belg','Round to Belgorod',250,375,22,'far round the side, to Belgorod']],
     ans:{u:'so_steppe',z:'prok'},
     hint:{u:'Only one force here is fresh and fast.',z:'Look at where the Germans have got furthest.'},
     fbU:{so_steppe:'Right toy. Fresh tanks against tired ones: this is what you kept them back for.',
          so_cen:'Not this toy. The Central Front is still holding the north. Pull it away, and the stalled attack gets going again.',
          so_belts:'Not this toy. The anti-tank guns are dug in where they are. They cannot race across country to meet tanks.'},
     fbZ:{prok:'Right place. That is where the Germans have got furthest, and where they must be stopped.',
          north:'The north is already holding. The danger is in the south.',
          back:'Waiting by Kursk lets the German tanks keep pushing through the last belts.',
          belg:'Too far round. The danger is the spearhead in front of you, not the town it came from.'},
     fail:{prok:{ko:[]},north:{u:{ge_hoth:[268,244]},fire:[['ge_hoth','so_vor','tank']],ko:[],idle:['$']},back:{u:{ge_hoth:[268,244]},fire:[['ge_hoth','so_vor','tank']],ko:[],idle:['$']},belg:{ko:[],fire:[['ge_kempf','$','tank']]}}}],
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

PGD.mystery(10,{
  war:'Anglo-Zulu War',
  general:'John Chard',
  pitch:'You are <b>John Chard</b>. A Zulu army has just wiped out the main British camp, and thousands of warriors are heading for your small post and its hospital. What you do in the next few hours decides who lives.',
  H:600,
  terrain(){
    let s=felt('#a4a46a',600);
    s+=river('M0 39 Q200 69 400 30',16);
    s+=`<path d="M0 600 Q60 465 140 450 Q200 435 260 450 Q340 465 400 600 Z" fill="#8c8160"/>`;
    s+=mtn(200,570,70)+mtn(100,588,40)+mtn(320,588,44);
    s+=trees(1879,10,[60,200,90,190],()=>true,['#5b7a3a','#6b8a44']);
    s+=`<rect x="110" y="240" width="70" height="57" fill="#efe3c4" stroke="#5a4a35" stroke-width="1.5"/><path d="M106 240 L145 210 L184 240 Z" fill="#9a8b6a" stroke="#5a4a35"/>`;
    s+=`<rect x="236" y="225" width="84" height="60" fill="#efe3c4" stroke="#5a4a35" stroke-width="1.5"/><path d="M232 225 L278 192 L324 225 Z" fill="#9a8b6a" stroke="#5a4a35"/>`;
    s+=`<circle cx="350" cy="294" r="28" fill="none" stroke="#7a7466" stroke-width="5"/>`;
    s+=`<path d="M110 225 L236 210 M110 321 L180 321 L236 300 L330 309" stroke="#c4b48a" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    s+=`<path d="M230 214 L230 302" stroke="#b08a52" stroke-width="5" stroke-dasharray="6 3" fill="none"/>`;
    s+=road('M330 309 Q370 330 400 380');
    s+=label(145,318,'Hospital',9)+label(278,300,'Storehouse',9)+label(350,340,'Stone kraal',8)+label(200,22,'Buffalo River',9)+label(200,500,'Oskarberg',10)+label(372,372,'To Helpmekaar',8);
    s+=compass(26,560);
    return s+end(600);
  },
  ranges:{rifle:260},
  lead:'Britain has invaded the Zulu kingdom. You are Lieutenant John Chard, an engineer left in charge of a small supply post and hospital at Rorke\'s Drift, by a river crossing on the border. The main British army camped at Isandlwana, a few miles away.',
  sit:'22 January 1879, about 4:20 p.m. Your walls of mealie bags link the hospital, the storehouse and a stone cattle kraal. But the horsemen sent out to watch have ridden off, and the whole Native Contingent has run after them. About 150 men are left, many of them sick, and the Zulus are minutes away.',
  mett:{
    m:'Keep the garrison and the sick alive until help comes.',
    e:'Three to four thousand Zulu warriors, mostly armed with spears and shields, a few with old guns.',
    t:'Two thatched buildings joined by walls of sacks and boxes, a stone cattle kraal, and a rocky hill, the Oskarberg, just to the south.',
    tr:'B Company of the 24th Regiment, some sick and wounded, and a few others. About 150 men in all.',
    ti:'Through the night. The main British column is the nearest help.'},
  ground:[['Key terrain','The storehouse, the stronger of the two buildings.',[278,170,34]],
          ['Obstacle','The walls of mealie bags linking the buildings.',[200,176,50]],
          ['Avenue of approach','The Oskarberg, the rocky hill the Zulus will come round.',[200,318,44]]],
  q:'Your walls are now far too long for the men you have. Which toy, sent where, fixes that?',
  qs:'Too few men: which toy goes where?',
  toys:[['b_res','Bromhead\'s reserve','Bromhead\'s reserve'],['b_north','North wall','the men on the north wall'],['b_south','South wall','the men on the south wall']],
  zones:[['mid','A wall across the middle',228,178,20,'to build a wall of biscuit boxes across the middle'],['kraal','Into the empty kraal',350,196,20,'into the empty kraal'],['chase','After the runaways',384,300,20,'off after the men who ran'],['hill','Up onto the hill',200,318,22,'up onto the Oskarberg to meet them']],
  ans:{u:'b_res',z:'mid'},
  start:{b_north:[175,138],b_south:[205,216],b_hosp:[145,180],b_res:[300,128],b_chard:[300,176],b_nnc:[398,250,'off'],
         z_1:[200,392,'off'],z_2:[20,200,'off'],z_rifles:[250,392,'off'],z_cmd:[330,392,'off']},
  fbU:{b_res:'Right toy. The reserve is the one group not holding a wall, so it is free to build.',
       b_north:'Not this toy. The north wall men are holding their stretch. Take them off it, and it stands empty.',
       b_south:'Not this toy. The south wall faces the hill the Zulus are coming round. It needs every man it has.'},
  fbZ:{mid:'Right place. A wall across the middle gives you a shorter line to fall back to if the outer walls cannot be held.',
       kraal:'Filling the kraal keeps the line as long as ever, with even fewer men to spare.',
       chase:'The men who ran are on horseback and long gone. Chasing them only leaves the post emptier.',
       hill:'On the open hillside your rifles lose the walls that make them deadly.'},
  fail:{
    'b_north@mid':{u:{z_1:[150,146]},fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','rifle']],ko:[],idle:['$'],
      b:'The north wall men go off to build and leave their wall bare. When the Zulus swing round the hospital, they find that stretch empty.'},
    'b_north@kraal':{u:{z_1:[150,146]},fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','rifle']],ko:[],idle:['$'],
      b:'The north wall men move into the kraal. The line is just as long, and now its north side is bare. The Zulus come round the hospital and over the empty wall.'},
    'b_north@chase':{u:{z_1:[150,146]},fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','rifle']],ko:[],idle:['$'],
      b:'The north wall men run off after the deserters, who are mounted and long gone. The Zulus come round the hospital and find the north wall empty.'},
    'b_north@hill':{u:{z_1:[200,330]},fire:[['z_1','$','clash']],ko:['$'],
      b:'The north wall men climb the hill and meet the Zulus on open ground, with no wall to fight from. They are swept away.'},
    'b_south@mid':{u:{z_1:[212,206]},fire:[['z_1','$','clash'],['$','z_1','rifle']],ko:[],
      b:'The south wall men pull back to build. The first rush comes round the hill and straight over the empty south wall, into the men still stacking boxes.'},
    'b_south@kraal':{u:{z_1:[205,200]},fire:[['b_hosp','z_1','rifle'],['b_north','z_1','rifle']],ko:[],idle:['$'],
      b:'The south wall men leave to fill the kraal. The first rush comes round the hill and over the empty south wall into the yard.'},
    'b_south@chase':{u:{z_1:[205,200]},fire:[['b_hosp','z_1','rifle'],['b_north','z_1','rifle']],ko:[],idle:['$'],
      b:'The south wall men run off after the deserters. The first rush comes round the hill and over the empty south wall into the yard.'},
    'b_south@hill':{u:{z_1:[200,330]},fire:[['z_1','$','clash']],ko:['$'],
      b:'The south wall men climb the hill and meet the Zulus on open ground, with no wall to fight from. They are swept away.'},
    'b_res@kraal':{u:{z_1:[150,146]},fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','rifle']],ko:[],idle:['$'],
      b:'The reserve fills the kraal. The line is as long as ever and nobody is spare. When the Zulus swing round to the north-west wall, there is no one left to send.'},
    'b_res@chase':{u:{z_1:[150,146]},fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','rifle']],ko:[],idle:['$'],
      b:'The reserve runs off after the men who fled. They are mounted and long gone, and the post has even fewer men when the Zulus come round the hill.'},
    'b_res@hill':{u:{z_1:[200,330]},fire:[['z_1','$','clash']],ko:['$'],
      b:'The reserve climbs the hill and meets the Zulus on open, rocky ground, with no wall to fight from. It is swept away, and the post is weaker than ever.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, start:{b_north:[330,96],b_south:[300,96],b_res:[360,112],b_nnc:[60,100],b_chard:[200,50]}, after:[0,1],
     qs:'Run or stay: which toy goes where?',
     sit:'22 January 1879, about 3:15 p.m. Two riders gallop in with terrible news: the main camp at Isandlwana has been wiped out, and part of the Zulu army is coming your way. You have about 400 men, a hospital full of sick, ox wagons and piles of stores.',
     q:'Which toy, sent where, gives your men the best chance?',
     intel:[['The enemy','Thousands of Zulu warriors, fast on foot. They have already marched a long way today.'],
            ['The road','The next British post, Helpmekaar, is about 16 kilometres away across open country.'],
            ['Your stores','Heavy sacks of mealies (maize), big wooden biscuit boxes and two wagons.']],
     toys:[['b_res','B Company','B Company'],['b_nnc','Native Contingent','the Native Contingent'],['b_hosp','Walking wounded','the walking wounded']],
     zones:[['wall','Wall the buildings together',208,178,22,'to wall the hospital and storehouse together'],['road','Retreat to Helpmekaar',382,262,20,'off down the road to Helpmekaar'],['ponts','Hold the river crossing',130,36,20,'down to hold the river crossing'],['hill','Up the Oskarberg',200,322,22,'up onto the Oskarberg']],
     ans:{u:['b_res','b_nnc','b_hosp'],z:'wall'},
     hint:{z:'Ox wagons crawl. Think about where rifles count for most.'},
     fbU:{b_res:'Right toy. Every man is needed for this.',
          b_nnc:'Right toy. Every man is needed for this.',
          b_hosp:'Right toy. Every man is needed, and the sick who could hold a rifle took a place at the walls.'},
     fbZ:{wall:'Right place. Behind walls every rifle counts. In the open, a few hundred men are no match for thousands.',
          road:'Ox wagons full of sick men crawl. Fast Zulu warriors would catch the column in open country.',
          ponts:'The Zulus are expected from behind the hill, not across the river. The sick and the stores would be left unguarded.',
          hill:'On an open hillside your men have no walls, and the sick and the stores are left behind.'},
     fail:{wall:{ko:[]},road:{ko:[],idle:['$']},ponts:{ko:[],idle:['$']},hill:{ko:[],idle:['$']}}},
    {after:[2,3,4],
     hint:{u:'Look for the men who are not already holding a stretch of wall.',z:'You cannot hold everything with 150 men. Think about a shorter line.'},
     intel:[['Half gone','The horsemen and the Native Contingent have run. About 150 men are left to hold walls built when there were more than 400.'],
            ['The hill','The Zulus are coming round the hill to the south. They will reach the walls within minutes.'],
            ['Your reserve','Bromhead has a few men in reserve by the storehouse, not yet holding any wall.']]},
    {from:4, after:[5,6,7,8],
     qs:'Shot from behind: which toy goes where?',
     sit:'About 6 p.m. Zulu marksmen on the rocks of the hill are firing down into the post. Other warriors hold the far side of the north wall, and the hospital is under attack. Men on the north wall keep falling.',
     q:'The north wall is being hit from in front and from behind. Which toy, sent where, stops the losses?',
     intel:[['From behind','The marksmen are about 400 yards away on the hill. Their aim is poor, but the men on the north wall have their backs to them.'],
            ['The boxes','Your wall of biscuit boxes now runs across the middle of the post, beside the storehouse.'],
            ['The bush','There was no time to cut down the bush. Warriors use it to creep right up to the wall.']],
     toys:[['b_north','North wall','the men on the north wall'],['b_res','Reserve at the boxes','the reserve'],['b_hosp','Hospital defenders','the hospital defenders']],
     zones:[['back','Behind the boxes',266,136,20,'back behind the biscuit boxes'],['rocks','Clear the rocks',222,280,22,'up the hill to clear the rocks'],['bush','Clear the bush',104,70,20,'out into the bush to clear it'],['kraal','Out to the kraal',350,196,20,'out to the far end of the kraal']],
     ans:{u:'b_north',z:'back'},
     hint:{u:'Ask which men are being hit in the back.',z:'You built something earlier for exactly this moment.'},
     fbU:{b_north:'Right toy. These are the men being hit from behind.',
          b_res:'Not this toy. The reserve is already at the boxes. The men in danger are the ones on the north wall.',
          b_hosp:'Not this toy. The hospital defenders are fighting room by room to save the patients. They cannot leave them.'},
     fbZ:{back:'Right place. A shorter line means more rifles for every yard of wall, and it is the line you built for this.',
          rocks:'Up the open hillside, men would be hit by the marksmen and by thousands of warriors, with no wall at all.',
          bush:'Out in the bush, among the warriors hiding there, a few men would be cut off and killed.',
          kraal:'The kraal is at the far end of the post. Moving there leaves the north wall empty and solves nothing.'},
     fail:{back:{ko:[]},rocks:{ko:['$'],fire:[['z_rifles','$','rifle']]},bush:{ko:['$'],fire:[['z_2','$','clash']]},kraal:{ko:[],idle:['$'],fire:[['z_2','b_res','clash']]}}}],
  clues:[
    {cat:'tr',t:'Half the men gone',b:'The horsemen and the Native Contingent have run. About 150 men are left to hold walls built when there were more than 400.'},
    {cat:'e',card:'zulu1879'},
    {cat:'t',t:'Two buildings',b:'The storehouse is the stronger building. The hospital end of the post, with its small rooms full of sick men, is the hardest to hold.'},
    {cat:'tr',card:'b24_1879'},
    {cat:'m',t:'Shrink the line',b:'A wall you cannot man is no wall at all. Keep the men on the walls where they are, and build a shorter line across the middle that you can fall back to.'}],
  deduce:[['The horsemen and the Native Contingent have gone.','About 150 men are left for walls built for 400.'],
          ['Every stretch of wall already has its men.','Only the reserve is free.'],
          ['A line you cannot man is a line you cannot hold.','Use the reserve to build a shorter line across the middle.']],
  /* The real battle. North is up. The Buffalo River is to the north; the Oskarberg is just south of the post.
     The hospital is the west building, the storehouse the east one, with the stone kraal beyond it. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={b_north:[175,138],b_south:[205,216],b_hosp:[145,180],b_res:[300,128],b_chard:[300,176],b_nnc:[350,196],
           z_1:[200,392,'off'],z_2:[20,200,'off'],z_rifles:[250,392,'off'],z_cmd:[330,392,'off']};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{a:[['g',330,96,180,134],['g',300,96,204,210],['g',360,112,300,126],['g',60,100,344,192]],t:'Stay and fight',b:'About 3:15 p.m. two riders bring news of the disaster at Isandlwana. Chard, Bromhead and Dalton agree that wagons full of sick men would be caught in the open. They stay, and build walls of mealie bags, biscuit boxes and two wagons between the hospital and the storehouse.'});
    add(0,{b_nnc:[398,250,'exit']},{a:[['gd',350,196,394,248]],t:'Left alone',b:'About 4:20 p.m. there is the noise of a fight behind the hill. The horsemen sent out to watch ride off to Helpmekaar, and the Native Contingent leaves the kraal and runs too. About 150 men are left.'});
    add(1,{b_res:[228,178]},{a:[['g',300,128,232,174]],t:'Biscuit boxes',b:'Chard sees that his walls are now far too long for the men left. He starts a new wall of biscuit boxes across the middle of the post, so the hospital end can be given up if it has to be.'});
    add(1,{z_1:[120,128]},{a:[['t',200,392,206,236,120,132]],t:'The first rush',b:'About 4:30 p.m. some 500 or 600 warriors come round the hill and run at the south wall. Heavy volleys stop them about 50 yards out. Most swing round the hospital and rush the north-west wall, and are driven back into the bush.',
      fire:[['b_south','z_1','rifle'],['b_north','z_1','rifle'],['b_hosp','z_1','rifle'],['z_1','b_north','clash']]});
    add(1,{z_1:[130,150],z_2:[180,104],z_rifles:[250,290],z_cmd:[330,330]},{a:[['t',20,200,176,108],['t',250,392,250,296]],t:'From the rocks',b:'The main body arrives. Marksmen line the rocks on the hill and fire into the post from behind. Others creep up through the bush, and the two sides fight hand to hand across the north wall and at the hospital.',
      fire:[['z_rifles','b_north','rifle'],['z_2','b_north','clash'],['b_north','z_2','rifle'],['z_1','b_hosp','clash'],['b_hosp','z_1','clash'],['b_north','z_1','rifle']]});
    add(2,{b_north:[262,138],z_2:[190,140]},{a:[['g',175,138,258,138],['t',180,104,190,136]],t:'Behind the boxes',b:'About 6 p.m., with men being hit from behind by the marksmen on the hill, Chard pulls the north wall back behind the biscuit boxes. The yard in front of the hospital is given up.',
      fire:[['z_rifles','b_north','rifle'],['b_north','z_2','rifle'],['b_res','z_2','rifle']]});
    add(2,{b_hosp:[196,200],z_1:[160,182]},{a:[['g',145,180,192,198]],t:'Through the walls',b:'The Zulus set the hospital roof alight and break in. Inside, the defenders hack holes through the walls from room to room, drag the patients through, and get most of them out of a window and across the yard.',
      fire:[['z_1','b_hosp','clash'],['b_hosp','z_1','clash'],['b_res','z_1','rifle']]});
    add(2,{b_hosp:[258,200],b_res:[276,128],b_south:[340,200],z_1:[214,196],z_2:[236,150]},{a:[['g',196,200,254,200],['g',205,216,336,200]],t:'The last line',b:'As it gets dark, two heaps of mealie bags become a small redoubt that can fire in every direction. Pressed from all sides, the men fall back to the middle and then the inner wall of the kraal. The light of the burning hospital helps them aim.',
      fire:[['z_2','b_north','clash'],['b_north','z_2','rifle'],['z_1','b_hosp','clash'],['b_hosp','z_1','rifle'],['b_res','z_2','rifle']]});
    add(2,{z_1:[0,392,'exit'],z_2:[0,300,'exit'],z_rifles:[120,400,'exit'],z_cmd:[60,400,'exit']},{a:[['td',214,196,40,380]],t:'Dawn',b:'The attacks die away after midnight, and by dawn the Zulus have gone back over the hill. About 8 a.m. the British relief column arrives. Seventeen defenders are dead, and about 350 Zulus. Eleven defenders win the Victoria Cross, Britain\'s highest award for bravery.'});
    return S;
  })(),
  video:{id:'WYtPfhWREsg',t:'Victory From Disaster: Last Stand at Rorke\'s Drift',ch:'Battle Guide',v:1452419},
  sources:[['National Army Museum: the defence of Rorke\'s Drift','https://www.nam.ac.uk/explore/rorkes-drift'],
           ['Chard\'s official report, 25 January 1879 (South African Military History Society)','https://samilitaryhistory.org/misc/rorke.html'],
           ['British Battles: Battle of Rorke\'s Drift','https://www.britishbattles.com/zulu-war/battle-of-rorkes-drift/'],
           ['Wikipedia: Battle of Rorke\'s Drift','https://en.wikipedia.org/wiki/Battle_of_Rorke%27s_Drift']],
  cards:{b_north:'b24_1879',b_south:'b24_1879',b_hosp:'b24_1879',b_res:'b24_1879',b_nnc:'nnc1879',z_1:'zulu1879',z_2:'zulu1879',z_rifles:'zmark1879'}
});

PGD.mystery(12,{
  war:'American Civil War',
  general:'Ulysses S. Grant',
  pitch:'You are <b>Ulysses S. Grant</b>. A fortress city on high bluffs blocks the Mississippi River, and a whole winter of trying has failed. Find another way to take it.',
  H:600,
  terrain(){
    let s=felt('#9fae6c',600);
    s+=trees(1863,26,[0,62,0,600],()=>true,['#3b6b2b','#4b7a35'])+trees(63,10,[120,180,0,70],()=>true,['#3b6b2b','#4b7a35']);
    s+=river('M190 0 Q200 180 180 330 Q170 450 190 600',5);
    s+=river('M90 0 Q60 90 110 165 Q150 225 100 300 Q60 375 110 450 Q140 510 110 600',22);
    s+=`<path d="M152 204 L240 282 L338 276" fill="none" stroke="#5a4630" stroke-width="2.2" stroke-dasharray="7 4"/>`;
    s+=hill(156,196,20,16,2)+hill(240,282,20,13,2);
    s+=house(146,198)+house(156,206,'#8a3a2a')+house(152,188)+house(334,272)+house(344,280,'#8a3a2a');
    s+=label(166,176,'Vicksburg',11)+label(342,258,'Jackson',10)+city(178,495,'Port Gibson',9,-8)+city(275,375,'Raymond',9,-8);
    s+=label(140,372,'Grand Gulf',9)+label(164,506,'Bruinsburg',9)+label(36,374,'Hard Times',8)+label(50,80,'Milliken\'s Bend',8)+label(166,98,'Snyder\'s Bluff',8);
    s+=label(242,306,'Champion Hill',8)+label(204,120,'Big Black River',8,-86)+label(34,560,'Louisiana',10)+label(300,560,'Mississippi',10)+label(30,170,'Swamps and bayous',8,-86);
    s+=compass(372,40);
    return s+end(600);
  },
  lead:'Vicksburg stands on high bluffs above the Mississippi River, and its heavy guns stop Union ships from using the river. While it holds, the Confederacy stays joined across the river. All winter your army has tried to reach it through the swamps and bayous, and every try has failed.',
  sit:'April 1863. Your engineers have built a rough road through the Louisiana swamps, and your corps are marching down the west bank to Hard Times, well below the city. But an army cannot cross the Mississippi on foot, and all of Admiral Porter\'s gunboats and transports are upstream, north of the city guns.',
  mett:{
    m:'Take Vicksburg and open the Mississippi River.',
    e:'Pemberton\'s army in and around Vicksburg, with heavy guns on the bluffs. More Confederates gathering at Jackson, the state capital, to the east.',
    t:'A great river with swamps and bayous to the north. High bluffs at the city. Dry ground on the east bank, south of it.',
    tr:'The Army of the Tennessee in three corps, Porter\'s gunboats and transports, and Grierson\'s cavalry.',
    ti:'Spring. The winter tries have already used up months.'},
  ground:[['Key terrain','The bluffs at Vicksburg, lined with heavy guns over the river.',[142,130,30]],
          ['Obstacle','The swamps and bayous north of the city, where every winter try failed.',[170,40,40]],
          ['Avenue of approach','Dry ground on the east bank, south of the city, at Bruinsburg.',[142,326,28]]],
  q:'Your army is marching south, but its boats are north of the city. Which toy, sent where, gets the army across the river?',
  qs:'Cross the river: which toy goes where?',
  toys:[['un_boats','Porter\'s gunboats','Porter\'s gunboats and transports'],['un_sher','Sherman\'s corps','Sherman\'s corps'],['un_grier','Grierson\'s cavalry','Grierson\'s cavalry']],
  zones:[['run','Past the guns',86,232,22,'past the city guns at night, down to Hard Times'],['swamps','Yazoo swamps',170,40,22,'up into the Yazoo swamps'],['bluffs','Under the bluffs',128,160,20,'straight in under the city bluffs'],['lake','Lake Providence',24,26,20,'back upriver to the Lake Providence bayous']],
  ans:{u:'un_boats',z:'run'},
  start:{un_sher:[50,60],un_mcp:[58,150],un_mccl:[56,180],un_boats:[80,48],un_grier:[330,22],un_grant:[36,118],
         cs_batt:[140,124],cs_pemb:[168,150],cs_pcmd:[176,128],cs_gulf:[112,258],cs_john:[340,196]},
  fbU:{un_boats:'Right toy. The army can walk to Hard Times, but only boats can carry it over the river.',
       un_sher:'Not this toy. Two corps are already marching south. More men do not help if there is nothing to carry them across.',
       un_grier:'Not this toy. Horses cannot carry an army over a river this wide.'},
  fbZ:{run:'Right place. The guns are deadly by day, but a fast ship on a dark night is a hard target. Below the city, the boats meet the army.',
       swamps:'The Yazoo swamps are where the winter tries already failed.',
       bluffs:'Under the bluffs, everything is in point-blank range of the heavy guns above.',
       lake:'The Lake Providence route is a long way round through bayous, and it has already proved hopeless.'},
  fail:{
    'un_boats@swamps':{ko:[],idle:['$'],
      b:'The boats push back up into the Yazoo swamps, where every route has already failed. The army waits at Hard Times with no way across.'},
    'un_boats@bluffs':{fire:[['cs_batt','$','cannon']],ko:['$'],
      b:'The boats stop under the bluffs to land troops right below the city. The heavy guns above them cannot miss.'},
    'un_boats@lake':{ko:[],idle:['$'],
      b:'The boats steam back upriver toward the Lake Providence bayous. Weeks pass, and the army is still on the wrong bank.'},
    'un_sher@run':{ko:[],idle:['$'],
      b:'Sherman\'s corps joins the march south. Now there are more men at Hard Times, but still no boats to carry them over.'},
    'un_sher@swamps':{fire:[['cs_batt','$','cannon']],ko:[],
      b:'Sherman tries the Yazoo swamps again. Mud, flooded bayous and the guns on the bluffs stop him, just as they did all winter.'},
    'un_sher@bluffs':{fire:[['cs_batt','$','cannon'],['cs_pemb','$','musket']],ko:['$'],
      b:'Sherman\'s men try to cross right under the city. The bluffs are steep, the guns on top are waiting, and the attack is cut to pieces.'},
    'un_sher@lake':{ko:[],idle:['$'],
      b:'Sherman heads back upriver to dig through the Lake Providence bayous. Months of digging there have already come to nothing.'},
    'un_grier@run':{ko:[],idle:['$'],
      b:'Grierson\'s horsemen ride down to Hard Times. They can water their horses at the river, but nobody can cross it.'},
    'un_grier@swamps':{ko:[],idle:['$'],
      b:'Horsemen in a swamp are stuck. Grierson\'s men flounder in the flooded bayous north of the city and get nowhere.'},
    'un_grier@bluffs':{fire:[['cs_batt','$','cannon'],['cs_pemb','$','musket']],ko:['$'],
      b:'Grierson\'s horsemen ride at the bluffs below the city, and the guns on top cut them down.'},
    'un_grier@lake':{ko:[],idle:['$'],
      b:'Grierson\'s men ride back upriver to the bayous. Horses are no help in digging a way through the swamps.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 1 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {after:[0,1,2,3,4,5,6,7],
     hint:{u:'Ask what the army is missing, not who could join it.',z:'The guns are deadly by day. Think about when a moving ship is hardest to hit.'},
     intel:[['The road south','A rough road now runs about 70 miles through the swamps on the Louisiana side, to Hard Times, below the city.'],
            ['The guns','Heavy guns on the bluffs cover the river in front of the city. By day, nothing gets past them.'],
            ['The winter','Five tries to get round the city through the swamps and bayous have all failed.']]},
    {from:7, after:[8,9,10,11],
     qs:'Between two armies: which toy goes where?',
     sit:'May 1863. Your army is across the river and has won at Port Gibson and Raymond. Pemberton\'s army is near Edwards Station, between you and Vicksburg. Behind you, General Johnston is due at Jackson any day with more men.',
     q:'There is an enemy army on each side of you. Which toy, sent where, keeps them from joining up?',
     intel:[['To the west','Pemberton\'s army is near Edwards Station, on the railroad between Jackson and Vicksburg. McClernand\'s corps is closest to it.'],
            ['To the east','Johnston is due at Jackson with reinforcements within a couple of days. For now, the Confederates there are few.'],
            ['Your orders','Your first orders were to take Grand Gulf, then go south and join General Banks against Port Hudson. Banks says he is not ready.']],
     toys:[['un_mcp','McPherson\'s corps','McPherson\'s corps'],['un_sher','Sherman\'s corps','Sherman\'s corps'],['un_mccl','McClernand\'s corps','McClernand\'s corps']],
     zones:[['jackson','East to Jackson',322,204,22,'east to take Jackson'],['vburg','Vicksburg itself',176,170,22,'west, straight at Vicksburg'],['banks','South to Banks',175,385,20,'south to join Banks at Port Hudson'],['gulf','Grand Gulf',112,262,18,'back to Grand Gulf to guard the river']],
     ans:{u:['un_mcp','un_sher'],z:'jackson'},
     hint:{u:'One of your corps is already watching Pemberton.',z:'One enemy army is still small, but it is growing. Deal with it first.'},
     fbU:{un_mcp:'Right toy. McPherson\'s corps is closest to the road east.',
          un_sher:'Right toy. Sherman\'s corps is free to march.',
          un_mccl:'Not this toy. McClernand\'s corps is the one facing Pemberton. Move it, and nothing watches the Vicksburg side.'},
     fbZ:{jackson:'Right place. Strike Jackson before Johnston\'s men arrive, and the railroad that feeds Vicksburg goes with it.',
          vburg:'Turn your back on Jackson, and Johnston can march up behind you while you face the city.',
          banks:'Going south means waiting for Banks while both Confederate armies grow and join up.',
          gulf:'Pulling back to the river gives both Confederate armies time to join up.'},
     fail:{jackson:{ko:[]},vburg:{u:{cs_john:[285,215]},fire:[['cs_pemb','$','musket']],ko:[]},banks:{ko:[],idle:['$']},gulf:{ko:[],idle:['$']}}},
    {from:11, after:[12,13],
     qs:'The fortress holds: which toy goes where?',
     sit:'Late May 1863. You have chased Pemberton back inside the Vicksburg earthworks. You stormed them on 19 May and again on 22 May, and both attacks were thrown back with heavy losses.',
     q:'The walls will not fall to a charge. Which toy, sent where, takes the city anyway?',
     intel:[['The earthworks','Forts and trenches ring the city on the land side, with over 170 cannon.'],
            ['Inside','About 30,000 Confederate soldiers and the townspeople, cut off from the rest of the South.'],
            ['Your side','Your men are well fed from the countryside, and boats now bring supplies straight up the Yazoo.']],
     toys:[['un_sher','Sherman\'s corps','Sherman\'s corps'],['un_mcp','McPherson\'s corps','McPherson\'s corps'],['un_mccl','McClernand\'s corps','McClernand\'s corps']],
     zones:[['ring','Ring the city',140,212,20,'to dig in and close the ring round the city'],['storm','Storm the walls',156,128,18,'at the walls for a third assault'],['east','After Johnston',330,180,22,'east after Johnston'],['back','Over the river',62,200,20,'back over the river']],
     ans:{u:['un_sher','un_mcp','un_mccl'],z:'ring'},
     hint:{z:'Two charges have failed. Think about what the people inside will run out of.'},
     fbU:{un_sher:'Right toy. Every corps has a part of the ring to hold.',
          un_mcp:'Right toy. Every corps has a part of the ring to hold.',
          un_mccl:'Right toy. Every corps has a part of the ring to hold.'},
     fbZ:{ring:'Right place. Shut every road in and out, and hunger and your guns will do what charges could not.',
          storm:'Twice the walls have thrown your men back. A third charge only adds to the losses.',
          east:'Leave the city, and Pemberton\'s army can march out and join Johnston.',
          back:'Going back over the river throws away everything the campaign has won.'},
     fail:{ring:{ko:[]},storm:{fire:[['cs_pemb','$','musket']],ko:[]},east:{u:{cs_pemb:[205,150]},ko:[],idle:['$']},back:{ko:[],idle:['$']}}}],
  clues:[
    {cat:'m',t:'The road south',b:'Your engineers have built a rough road through the Louisiana swamps, about 70 miles, to Hard Times, below the city. The army can get there on foot.'},
    {cat:'e',card:'battery1863'},
    {cat:'t',t:'A dark night',b:'The guns on the bluffs are deadly by day. On a night with no moon, a ship moving fast with its lights out is much harder to hit.'},
    {cat:'tr',card:'gunboat1863'},
    {cat:'m',t:'No boats, no crossing',b:'An army cannot swim the Mississippi. Whatever carries it across has to get south of the city first.'}],
  deduce:[['Every route through the swamps north of the city has failed.','Look south.'],
          ['The army can march south on its own.','What it lacks is a way across the river.'],
          ['The boats are north of the guns.','Run them past the city at night, down to the army.']],
  /* The real campaign. North is up. The Mississippi runs down the west side; Vicksburg is on the east bank. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={un_sher:[50,60],un_mcp:[58,150],un_mccl:[56,180],un_boats:[80,48],un_grier:[330,22],un_grant:[36,118],
           cs_batt:[140,124],cs_pemb:[168,150],cs_pcmd:[176,128],cs_gulf:[112,258],cs_john:[340,196]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{un_mcp:[52,232],un_mccl:[56,246],un_grant:[40,226]},{a:[['g',58,150,52,226],['g',56,180,56,240]],t:'Down the west bank',b:'Grant\'s men build roads and bridges through the Louisiana swamps and march about 70 miles down the west bank, to Hard Times, below the city.'});
    add(0,{un_boats:[86,230]},{a:[['g',80,48,112,140,86,224]],t:'Running the guns',b:'On the night of 16 April, with no moon, Porter\'s gunboats and transports slip downriver. Lookouts spot them and the bluffs open fire, but the fleet gets through with little damage. One transport burns.',
      fire:[['cs_batt','un_boats','cannon']]});
    add(1,{un_grier:[262,392,'exit'],un_sher:[165,74]},{a:[['g',330,22,262,386],['g',50,60,159,74]],t:'Raids and feints',b:'Grierson\'s cavalry raids right through Mississippi, and Sherman stages a fake attack north of the city at Snyder\'s Bluff. Both draw Confederate attention away from the crossing.',
      fire:[['cs_batt','un_sher','cannon']]});
    add(1,{un_boats:[96,250],un_sher:[50,70]},{a:[['g',86,230,94,246],['g',165,74,56,70]],t:'Grand Gulf',b:'On 29 April Porter\'s ironclads pound the guns at Grand Gulf for over five hours. They silence the lower batteries, but the upper guns keep firing. Landing here would cost too much.',
      fire:[['un_boats','cs_gulf','broadside'],['cs_gulf','un_boats','cannon']]});
    add(1,{un_boats:[120,322],un_mcp:[134,330],un_mccl:[152,338],un_grant:[124,346],un_sher:[56,236]},{a:[['g',96,250,118,316],['g',56,246,148,334],['g',50,70,56,230]],t:'Across at Bruinsburg',b:'The transports run past Grand Gulf under fire, and on 30 April they land the army further south at Bruinsburg: 17,000 men, with nobody there to stop them. Sherman\'s corps follows down the west bank.',
      fire:[['cs_gulf','un_boats','cannon']]});
    add(1,{un_mccl:[174,322]},{a:[['g',152,338,170,324]],t:'Port Gibson',b:'Marching inland, the army runs into Confederates near Port Gibson on 1 May and pushes them back all day.',
      fire:[['un_mccl','cs_gulf','musket'],['cs_gulf','un_mccl','musket']]});
    add(2,{un_sher:[205,330],un_mcp:[240,285],un_mccl:[215,250],un_grant:[200,300],cs_pemb:[222,195],cs_pcmd:[214,174],cs_gulf:[150,250,'exit']},{a:[['g',174,322,213,256],['g',134,330,236,288],['t',168,150,218,190]],t:'Inland',b:'The Confederates give up Grand Gulf, and Sherman\'s corps crosses and follows. Grant marches north-east toward the railroad that links Vicksburg with Jackson. Pemberton brings his army out to Edwards Station.'});
    add(2,{un_mcp:[270,250],cs_john:[300,236],un_sher:[232,300]},{a:[['g',240,285,266,254],['t',340,196,304,232]],t:'Raymond',b:'On 12 May, near Raymond, McPherson\'s corps runs into a Confederate brigade sent from Jackson. After hours of hard fighting, the Confederates fall back toward Jackson.',
      fire:[['un_mcp','cs_john','musket'],['cs_john','un_mcp','musket']]});
    add(2,{cs_john:[340,196]},{a:[['t',300,236,336,200]],t:'Johnston comes',b:'General Johnston reaches Jackson on 13 May to take command. He finds two Union corps marching on the town and only about 6,000 men to defend it.'});
    add(2,{un_sher:[318,214],un_mcp:[326,174],un_grant:[300,210],cs_john:[358,160]},{a:[['g',232,300,314,218],['g',270,250,322,180]],t:'Jackson falls',b:'Sherman and McPherson attack on 14 May. Johnston pulls his men out to the north, and the Union troops take the town and wreck the railroad that feeds Vicksburg.',
      fire:[['un_sher','cs_john','musket'],['un_mcp','cs_john','musket']]});
    add(2,{un_mcp:[262,190],un_mccl:[236,226],un_grant:[262,212],cs_pemb:[240,188],cs_pcmd:[222,168],un_sher:[296,214],cs_john:[392,90,'exit']},{a:[['g',326,174,266,188],['g',215,250,234,230],['t',222,195,238,190]],t:'Champion Hill',b:'Grant turns west. On 16 May he meets Pemberton\'s army at Champion Hill. After a day of fierce fighting the Union troops take the hill, and Pemberton retreats.',
      fire:[['un_mcp','cs_pemb','musket'],['cs_pemb','un_mcp','musket'],['un_mccl','cs_pemb','musket']]});
    add(2,{cs_pemb:[152,145],cs_pcmd:[140,160],un_mccl:[172,186],un_mcp:[180,146],un_sher:[170,104],un_grant:[204,164]},{a:[['t',240,188,158,148],['g',262,190,186,148],['g',296,214,174,110]],t:'Storming the walls',b:'Pemberton falls back inside the Vicksburg earthworks. Grant storms them on 19 May and again on 22 May. Both attacks are thrown back; the second alone costs about 3,200 men.',
      fire:[['cs_pemb','un_mcp','musket'],['cs_pemb','un_mccl','musket'],['cs_batt','un_sher','cannon'],['un_mcp','cs_pemb','musket'],['un_sher','cs_pemb','musket']]});
    add(2,{un_mccl:[168,184],un_mcp:[176,146],un_sher:[170,100],un_boats:[92,214]},{a:[['g',120,322,94,220]],t:'The siege',b:'Grant digs in round the city. For weeks his guns and Porter\'s gunboats pound it day and night. Food runs short, and many townspeople shelter in caves dug into the hillsides.',
      fire:[['un_mcp','cs_pemb','musket'],['un_sher','cs_pemb','musket'],['un_mccl','cs_pemb','musket'],['un_boats','cs_pemb','broadside']]});
    add(2,{cs_pemb:[152,145,'exit'],cs_pcmd:[140,160,'exit'],cs_batt:[140,124,'exit']},{t:'Surrender',b:'After 47 days, on 4 July 1863, Pemberton surrenders the city and about 29,000 men. Together with Port Hudson five days later, it gives the Union the whole Mississippi and splits the Confederacy in two.'});
    return S;
  })(),
  video:{id:'1eSgimZ8GKQ',t:'Vicksburg: Animated Battle Map',ch:'American Battlefield Trust',v:1545993},
  sources:[['Wikipedia: Vicksburg campaign','https://en.wikipedia.org/wiki/Vicksburg_campaign'],
           ['Wikipedia: Siege of Vicksburg','https://en.wikipedia.org/wiki/Siege_of_Vicksburg'],
           ['American Battlefield Trust: Vicksburg','https://www.battlefields.org/learn/civil-war/battles/vicksburg'],
           ['National Park Service: the campaign for Vicksburg','https://www.nps.gov/vick/learn/historyculture/campaign-for-vicksburg.htm'],
           ['National Park Service: the siege of Vicksburg','https://www.nps.gov/vick/learn/historyculture/vicksburgsiege.htm']],
  cards:{un_sher:'unioninf1863',un_mcp:'unioninf1863',un_mccl:'unioninf1863',un_boats:'gunboat1863',un_grier:'ucav1863',
         cs_batt:'battery1863',cs_gulf:'battery1863',cs_pemb:'csinf1863',cs_john:'csinf1863'}
});
