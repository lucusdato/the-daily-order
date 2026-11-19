/* The Daily Order: mystery battles for days 17 and 18 (Teutoburg Forest, Isandlwana).
   Positions are written for a 400 square board and stretched to the 600 tall board when loaded. */

PGD.mystery(18,{
  war:'Roman-Germanic Wars',
  general:'Arminius',
  pitch:'You are <b>Arminius</b>. Three Roman legions, the best soldiers in the world, are marching home through your country, and their general trusts you. Destroy them.',
  H:600,
  terrain(){
    let s=felt('#6f8a50',600);
    s+=`<path d="M0 186 Q100 172 200 198 Q300 226 400 196 L400 0 H0 Z" fill="#5f7a44"/>`;
    s+=hill(120,90,120,70,3)+trees(9,95,[0,400,0,200],()=>true,['#2a4f20','#2f5a24','#3b6b2b']);
    s+=`<path d="M0 392 Q100 380 200 404 Q300 428 400 404 V600 H0 Z" fill="#6b7f5a"/>`;
    s+=`<path d="M0 392 Q100 380 200 404 Q300 428 400 404 V600 H0 Z" fill="url(#furrow)" opacity=".4"/>`;
    s+=trees(10,26,[240,400,338,400],()=>true,['#2a4f20','#3b6b2b'])+trees(11,22,[230,400,226,276],()=>true,['#2f5a24','#3b6b2b']);
    s+=road('M0 300 Q100 285 200 307 Q300 330 400 300');
    s+=`<path d="M30 250 Q120 244 200 262" fill="none" stroke="#8a7a50" stroke-width="7" stroke-linecap="round"/><path d="M30 250 Q120 244 200 262" fill="none" stroke="#b5a57a" stroke-width="3" stroke-dasharray="2 3"/>`;
    s+=label(120,40,'Kalkriese hill',11)+label(110,236,'Turf wall',8)+label(200,520,'The Great Bog',11)+label(300,350,'The forest road',9);
    s+=label(36,326,'To the Rhine',8)+label(352,282,'From the summer camp',8);
    return s+end(600);
  },
  over(){ return `<g class="ph" data-show="1 2">${(()=>{const r=rng(9);let c='<g opacity=".55">';for(let i=0;i<75;i++){const x=r()*400,y=r()*600;c+=`<path d="M${x.toFixed(0)} ${y.toFixed(0)} l-3 8" stroke="#d3dde8" stroke-width="1"/>`;}return c+'</g>';})()}</g>`; },
  lead:'AD 9. Rome is turning the lands east of the Rhine into a province, ruled by the governor Varus with three legions. You, Arminius, are a German noble who grew up among the Romans and served as an officer in their army. Varus trusts you. In secret, you have united several tribes against Rome.',
  sit:'The Romans are marching west, worn out and soaked. Ahead, the road squeezes through a narrow strip of land between Kalkriese hill and the Great Bog. Along the foot of the hill, your men have dug a trench and built a wall of earth and turf beside the road.',
  mett:{
    m:'Destroy the Roman army and end Roman rule east of the Rhine.',
    e:'Three legions with cavalry and auxiliaries, perhaps 15,000 to 20,000 soldiers, plus wagons, servants and families.',
    t:'Thick forest, hills and bogs, cut by narrow tracks. Roman battle lines need open space.',
    tr:'Warriors from several tribes, quick on their feet and lightly armed.',
    ti:'Late summer. Varus is on his way back to his winter quarters near the Rhine.'},
  ground:[['Key terrain','The narrows: a thin strip of land between Kalkriese hill and the Great Bog.',[100,200,34]],
          ['Obstacle','The Great Bog. Nobody can march or form up in it.',[200,340,50]],
          ['Avenue of approach','The forest road, the only way west for a column with wagons.',[290,210,36]]],
  q:'The column is coming into the narrows. Which toy, sent where, springs the trap?',
  qs:'Spring the trap: which toy goes where?',
  toys:[['ge_wall','Hill warriors','the hill warriors'],['ge_wood','Forest warriors','the forest warriors'],['ge_bog','Bog-side warriors','the bog-side warriors']],
  zones:[['wall','Behind the wall',96,166,22,'down behind the turf wall'],['track','Across the road',44,200,20,'out onto the road, to block it in the open'],
         ['rear','Behind the tail',300,200,22,'round behind the tail of the column'],['bog','Out into the bog',200,330,22,'out into the bog']],
  ans:{u:'ge_wall',z:'wall'},
  start:{ge_wall:[96,104],ge_wood:[216,186],ge_bog:[164,234],ge_arm:[100,90],
         ro_cav:[70,196],ro_19:[100,198],ro_varus:[128,208],ro_18:[156,204],ro_17:[190,210],ro_bag:[290,214,'exit']},
  fbU:{ge_wall:'Right toy. The hill warriors are right above the wall already, a short run down the slope.',
       ge_wood:'Not this toy. The forest warriors are busy hounding the back of the column. Pull them away and the rear can close up.',
       ge_bog:'Not this toy. To reach the wall, the bog-side warriors would have to cross the road, right through the Romans.'},
  fbZ:{wall:'Right place. From behind the wall your men can strike and step back, while the Romans are squeezed against the bog with no room to form up.',
       track:'On the open road, your men meet the legions face to face. That is the one fight Rome is built to win.',
       rear:'Pressing the tail only pushes the column faster through the narrows and out the other side.',
       bog:'Out in the bog, your men are as stuck as anyone. The Romans march on past.'},
  fail:{
    'ge_wall@track':{fire:[['ro_cav','$','clash'],['ro_19','$','clash']],ko:[],
      b:'The hill warriors come down off the slope and stand across the open road. The legions form up and push them aside.'},
    'ge_wall@rear':{ko:[],idle:['$'],
      b:'The hill warriors leave the hill and run round to the back of the column. Nobody is above the narrows now, and the head of the column marches on through.'},
    'ge_wall@bog':{ko:[],idle:['$'],
      b:'The hill warriors go down into the bog, where they can hardly move. The column marches on through the narrows untouched.'},
    'ge_wood@wall':{fire:[['$','ro_19','clash']],ko:[],
      b:'The forest warriors reach the wall, but the back of the column, no longer pressed, closes up and comes on in good order.'},
    'ge_wood@track':{fire:[['ro_cav','$','clash']],ko:[],
      b:'The forest warriors run ahead and stand across the open road. Against a Roman line drawn up for battle, they are pushed back.'},
    'ge_wood@rear':{ko:[],idle:['$'],
      b:'The forest warriors drop back behind the column. It hurries on into the narrows, and nobody is behind the wall to meet it.'},
    'ge_wood@bog':{ko:[],idle:['$'],
      b:'The forest warriors wade out into the bog and get stuck. The column marches on.'},
    'ge_bog@wall':{fire:[['ro_19','$','clash'],['ro_cav','$','clash']],
      b:'The bog-side warriors try to cross the road to reach the wall, right through the Roman column. They are cut down on the way.'},
    'ge_bog@track':{fire:[['ro_cav','$','clash']],ko:[],
      b:'The bog-side warriors block the open road. The Romans form up and drive them off.'},
    'ge_bog@rear':{ko:[],idle:['$'],
      b:'The bog-side warriors hurry round to the tail of the column. Nobody is waiting at the narrows, and the head of the column marches on through.'},
    'ge_bog@bog':{ko:[],idle:['$'],
      b:'The bog-side warriors go deeper into the bog, out of the fight. The column marches on.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, after:[0,1],
     qs:'The trap is set: which toy goes where?',
     sit:'Late summer, AD 9. Varus believes your story of a revolt and has agreed to deal with it on his way back to winter quarters. His whole army has turned onto a forest road you chose. You are riding at his side as a trusted friend.',
     q:'The legions are on your road. Which toy, sent where, gets the trap ready to spring?',
     intel:[['Your allies','Warriors from several tribes are gathering in the hills and forests, waiting for the word to strike.'],
            ['Varus','He trusts you. He has already brushed off a warning from Segestes that you are plotting against him.'],
            ['The column','Soldiers, wagons, pack animals and camp followers, all moving together as if in peacetime.']],
     toys:[['ge_arm','Arminius','Arminius'],['ge_wood','Forest warriors','the forest warriors'],['ge_wall','Hill warriors','the hill warriors']],
     zones:[['allies','Gather allies',120,96,22,'off into the hills, to gather allies'],['now','Strike right now',306,180,22,'straight at the column, here and now'],
            ['guide','Up to the head',170,180,20,'up to the head of the column, as its guide']],
     ans:{u:'ge_arm',z:'allies'},
     hint:{u:'The warriors are ready. What they are missing is the man who planned all this.',z:'Once the fighting starts, anyone riding beside Varus is in the middle of a Roman army.'},
     fbU:{ge_arm:'Right toy. The warriors are in place. The one piece of the plan still inside the Roman column is you.',
          ge_wood:'Not this toy. The forest warriors are already hidden and waiting. The move that matters is yours.',
          ge_wall:'Not this toy. The hill warriors are already hidden and waiting. The move that matters is yours.'},
     fbZ:{allies:'Right place. Varus trusts you enough to let you go. Once you are out, you can lead the attack instead of being caught inside it.',
          now:'The column is still close together and fresh. Strike now and the legions can form up and fight.',
          guide:'Riding at the head keeps you inside the Roman army. When the fighting starts, you are the first man they seize.'},
     fail:{allies:{ko:[]},now:{fire:[['ro_18','$','clash'],['ro_17','$','clash']],ko:[]},guide:{ko:[],idle:['$']}}},
    {from:1, after:[2,3,4],
     qs:'Rain on the road: which toy goes where?',
     sit:'Heavy rain is pouring down. The Roman column has stretched out for many kilometres along the forest road, with wagons and camp followers mixed in among the soldiers. Your warriors are hidden in the trees on both sides.',
     q:'The column is strung out in the rain. Which toy, sent where, starts the battle well?',
     intel:[['The legions','Drawn up in their battle lines on open ground, they are the best soldiers in the world.'],
            ['The road','Dense forest comes close on both sides. Strung out this far, the Roman units cannot help each other quickly.'],
            ['Your warriors','Lightly armed and quick on their feet. They know every path through these woods.']],
     toys:[['ge_wood','Forest warriors','the forest warriors'],['ge_bog','Bog-side warriors','the bog-side warriors'],['ge_wall','Hill warriors','the hill warriors']],
     zones:[['raid','Along the column',300,170,22,'out of the trees all along the column, to strike and slip away'],['head','Block the head',30,180,20,'across the road ahead, to block the head of the column'],
            ['line','Stand in a line',236,236,22,'onto the road, to stand and fight in a battle line']],
     ans:{u:['ge_wood','ge_bog','ge_wall'],z:'raid'},
     hint:{z:'Fight the legions where they can form their lines, and they win. Think about what a column this long cannot do.'},
     fbU:{ge_wood:'Right toy. Every band joins in: the more places you strike at once, the better.',
          ge_bog:'Right toy. Every band joins in: the more places you strike at once, the better.',
          ge_wall:'Right toy. Every band joins in: the more places you strike at once, the better.'},
     fbZ:{raid:'Right place. Hit many places at once, then melt back into the trees. Strung out this far, the legions cannot form up or help each other.',
          head:'Block only the front, and the rest of the column can close up behind it into a strong position.',
          line:'A battle line on the road is just the kind of fight the legions are trained to win.'},
     fail:{raid:{ko:[]},head:{fire:[['ro_cav','$','clash']],ko:[]},line:{fire:[['ro_18','$','clash']],ko:[]}}},
    {after:[5,6,7],
     hint:{u:'Look for the men who are closest to the wall already.',z:'The legions need room to form their lines. Find the place where they have none, and somewhere your men can hide.'},
     intel:[['The narrows','A thin strip of land, with the hill on one side and the Great Bog on the other.'],
            ['Your men','The hill warriors are up on the slope above the wall. The forest warriors are hounding the tail of the column. The bog-side warriors are across the road.'],
            ['The Romans','They have burned most of their wagons, and they are wet, tired and crowded together.']]}],
  clues:[
    {cat:'t',t:'The narrows',b:'Ahead, the road runs through a thin strip of land, with Kalkriese hill on one side and the Great Bog on the other.'},
    {cat:'e',card:'legion9'},
    {cat:'t',t:'The wall',b:'Along the foot of the hill, your men have dug a trench and built a wall of earth and turf, right beside the road.'},
    {cat:'tr',card:'german9'},
    {cat:'m',t:'Strike from cover',b:'Put the men who are already on the hill behind the wall. From there they can strike and step back, while the Romans have no room to form up.'}],
  deduce:[['The legions win when they can form their lines.','Pick a place where they cannot.'],
          ['The narrows are squeezed between a hill and a bog.','There is no room to form up, and no way out to the side.'],
          ['The hill warriors are right above the wall.','Send them down behind it.']],
  /* The real battle. The map is not drawn to the compass: the hill is at the top and the bog at the bottom, and the
     Romans march from right to left, toward the Rhine. Sources disagree on which day each fight happened, so the
     captions keep to the order of events and do not name days. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={ge_wall:[70,60,'hide'],ge_wood:[330,80,'hide'],ge_bog:[130,330,'hide'],ge_arm:[258,168],
           ro_cav:[196,198],ro_19:[232,200],ro_varus:[262,212],ro_18:[292,206],ro_17:[326,210],ro_bag:[364,214]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'The detour',b:'Arminius tells Varus of a revolt in a distant tribe and suggests he deal with it on the way back to winter quarters. Varus agrees. He has brushed off a warning from Segestes that Arminius is plotting against him.'});
    add(0,{ge_arm:[100,90],ro_cav:[60,196],ro_19:[110,198],ro_varus:[170,204],ro_18:[220,206],ro_bag:[290,214],ro_17:[350,210]},
      {a:[['g',258,168,104,94],['t',232,200,114,198],['t',326,210,348,210]],t:'Gone to gather allies',b:'Arminius asks leave to go and gather allied warriors, and Varus lets him go. He leaves behind guides who are really spies. The column marches on into the forest, stretching out for many kilometres.'});
    add(1,{ge_wood:[320,190],ge_wall:[170,176],ge_bog:[254,230]},{a:[['g',330,80,320,184],['g',70,60,166,170],['g',130,330,250,236]],t:'Rain and raids',b:'In heavy rain, warriors burst out of the trees all along the column, strike, and melt away again. The wagons suffer most.',
      fire:[['ge_wood','ro_bag','clash'],['ge_wood','ro_17','clash'],['ge_wall','ro_varus','clash'],['ge_bog','ro_18','clash'],['ge_bog','ro_bag','clash']]});
    add(1,{ge_wood:[320,120,'hide'],ge_wall:[150,120,'hide'],ge_bog:[250,300,'hide'],ro_bag:[290,214,'exit'],
           ro_cav:[124,198],ro_19:[150,204],ro_varus:[176,214],ro_18:[204,206],ro_17:[232,212]},
      {a:[['t',350,210,236,212]],t:'Burning the wagons',b:'Varus has a fortified camp built. The Romans burn or leave behind most of their wagons, so they can move faster.'});
    add(1,{ge_wood:[216,186],ge_wall:[96,104],ge_bog:[164,234],ro_cav:[70,196],ro_19:[100,198],ro_varus:[128,208],ro_18:[156,204],ro_17:[190,210]},
      {a:[['t',124,198,74,196],['t',232,212,194,210]],t:'Back into the trees',b:'The Romans reach open country, though not without losses. Then the road plunges back into the woods, where men and horses crowd into narrow lines and crash into each other and the trees. The losses here are the worst yet.',
      fire:[['ge_wood','ro_17','clash'],['ge_bog','ro_18','clash']]});
    add(2,{ge_wall:[98,168]},{a:[['g',96,104,98,162]],t:'The wall at Kalkriese',b:'At the foot of Kalkriese hill, warriors strike from behind the wall, while the bog hems the Romans in on the other side. Roman attacks on the wall fail.',
      fire:[['ge_wall','ro_19','clash'],['ge_wall','ro_cav','clash'],['ro_19','ge_wall','clash'],['ge_bog','ro_18','clash'],['ge_wood','ro_17','clash']]});
    add(2,{ro_cav:[6,190,'exit']},{a:[['t',70,196,10,190]],t:'The cavalry runs',b:'Numonius Vala, one of Varus\'s officers, abandons the foot soldiers and flees with the horsemen, trying to reach the Rhine. He is caught and killed.'});
    add(2,{ro_19:[100,198,'ko'],ro_varus:[128,208,'ko'],ro_18:[156,204,'ko'],ro_17:[190,210,'ko']},{t:'Three legions lost',b:'In wind and pouring rain, the warriors fall on the broken Roman lines, and Varus takes his own life. About 16,000 to 20,000 Romans die. Germany east of the Rhine never becomes a Roman province.',
      fire:[['ge_wall','ro_19','clash'],['ge_bog','ro_varus','clash'],['ge_bog','ro_18','clash'],['ge_wood','ro_17','clash']]});
    return S;
  })(),
  video:{id:'K1XvIiMtim4',t:'The Legendary Battle of Teutoburg Forest: How Arminius Humiliated Rome!',ch:'Aditu Laudis',v:2654477},
  sources:[['Wikipedia: Battle of the Teutoburg Forest','https://en.wikipedia.org/wiki/Battle_of_the_Teutoburg_Forest'],
           ['Livius: Teutoburg Forest, the battle on days 1 and 2','https://www.livius.org/articles/battle/teutoburg-forest-9-ce/teutoburg-forest-5/'],
           ['Livius: Teutoburg Forest, the battle on days 3 and 4','https://www.livius.org/articles/battle/teutoburg-forest-9-ce/teutoburg-forest-6/'],
           ['Livius: Kalkriese','https://www.livius.org/articles/battle/teutoburg-forest-9-ce/kalkriese/']],
  cards:{ge_wall:'german9',ge_wood:'german9',ge_bog:'german9',ro_17:'legion9',ro_18:'legion9',ro_19:'legion9',ro_bag:'baggage9',ro_cav:'romcav9'}
});

PGD.mystery(21,{
  war:'Anglo-Zulu War',
  general:'Ntshingwayo kaMahole',
  pitch:'You are <b>Ntshingwayo kaMahole</b>, commander of the Zulu army. A British army with modern rifles has invaded your kingdom. Stop it.',
  H:600,
  terrain(){
    let s=felt('#a3a679',600);
    s+=`<path d="M0 0 H400 V180 Q300 210 200 180 Q100 152 0 195 Z" fill="#8e9466"/>`;
    s+=hill(260,90,70,40,3)+hill(70,80,60,34,2);
    s+=`<path d="M220 64 Q262 108 334 76" fill="none" stroke="#5a6a3e" stroke-width="12" opacity=".45" stroke-linecap="round"/>`;
    s+=road('M206 402 Q160 414 100 422 Q50 430 0 444')+road('M206 404 L300 600');
    s+=mtn(170,330,40);
    [[200,375],[212,387],[224,375],[206,402],[220,405],[236,393]].forEach(p=>s+=tent(p[0],p[1]));
    s+=label(170,280,'Isandlwana',10)+label(278,48,'Ngwebeni valley',9)+label(80,150,'Plateau',9)+label(316,500,'Open plain',9);
    s+=label(52,462,'To Rorke\'s Drift',8)+label(330,590,'To Mangeni',8);
    s+=compass(26,573);
    return s+end(600);
  },
  lead:'January 1879. A British army has invaded the Zulu kingdom, after King Cetshwayo refused an ultimatum made to be impossible to accept. Its centre column, under Lord Chelmsford, has crossed the Buffalo River at Rorke\'s Drift. You command the king\'s main army, sent to meet it.',
  sit:'Noon, 22 January. The British firing line stretches far out in front of the tents, and its volleys have pinned your chest to the ground. Behind the camp rises Isandlwana hill, and past its southern end runs the road back to Rorke\'s Drift.',
  mett:{
    m:'Destroy the British column and end the invasion.',
    e:'About 1,800 British and colonial soldiers at the camp, with breech-loading rifles, two field guns and a rocket battery.',
    t:'A high plateau with hidden valleys north-east of the camp. Isandlwana hill behind it. Open ground in front.',
    tr:'About 20,000 warriors in regiments, fast on foot, armed mostly with stabbing spears and shields, a few with old guns.',
    ti:'Your army has marched for days and cannot stay in the field for long.'},
  ground:[['Key terrain','Isandlwana hill, behind the camp. It blocks the view west, and the road out runs past its southern end.',[170,214,30]],
          ['Avenue of approach','The edge of the plateau north-east of the camp, where your army comes down.',[250,130,34]],
          ['Obstacle','The open ground in front of the camp, swept by British rifles.',[270,300,40]]],
  q:'The chest is pinned by rifle fire. Which toy, sent where, wins the battle?',
  qs:'Close the trap: which toy goes where?',
  toys:[['zu_rhorn','Right horn','the right horn'],['zu_chest','Chest','the chest'],['zu_lhorn','Left horn','the left horn']],
  zones:[['behind','Behind the hill',110,272,24,'round behind Isandlwana hill, across the road out'],['front','At the rifles',214,178,20,'straight at the firing line'],
         ['chelm','After Chelmsford',330,350,22,'south-east after Chelmsford'],['plateau','Up the plateau',190,60,20,'back up onto the plateau']],
  ans:{u:'zu_rhorn',z:'behind'},
  start:{zu_chest:[236,146],zu_lhorn:[322,170],zu_rhorn:[150,116],zu_loins:[262,70],zu_cmd:[300,82],
         br_line:[226,200],br_guns:[212,222],br_durn:[292,236],br_aux:[256,226],br_chelm:[340,392,'exit'],br_cmd:[218,256]},
  fbU:{zu_rhorn:'Right toy. The right horn is already out on the north side, the closest to the back of the hill.',
       zu_chest:'Not this toy. The chest is what holds the firing line in place. Pull it away and the British are free to turn.',
       zu_lhorn:'Not this toy. The left horn is out on the far side of the camp, beyond Durnford\'s men. Getting behind the hill would mean running across the front of the rifles.'},
  fbZ:{behind:'Right place. With warriors across the road behind the hill, the camp has nowhere left to fall back to.',
       front:'Straight at the rifles is what the chest has already tried, and it is pinned to the ground.',
       chelm:'Chelmsford is far away to the south-east. Marching after him leaves the camp free.',
       plateau:'Going back up the plateau gives the British time to pull in round the tents and get ready.'},
  fail:{
    'zu_rhorn@front':{fire:[['br_line','$','rifle'],['br_guns','$','cannon']],ko:[],
      b:'The right horn charges straight at the firing line beside the chest. Now both are pinned down by the volleys, and nothing closes round the camp.'},
    'zu_rhorn@chelm':{ko:[],idle:['$'],
      b:'The right horn sets off on the long march south-east after Chelmsford. The road behind the camp stays open.'},
    'zu_rhorn@plateau':{ko:[],idle:['$'],
      b:'The right horn climbs back up the plateau, out of the fight. The road behind the hill stays open.'},
    'zu_chest@behind':{fire:[['br_guns','$','cannon']],ko:[],
      b:'The chest gets up and runs for the back of the hill, across the front of the guns. With nobody pinning them, the British rifles are free to shoot at whatever comes next.'},
    'zu_chest@front':{fire:[['br_line','$','rifle'],['br_guns','$','cannon']],ko:[],
      b:'The chest charges the firing line again, head on. The volleys knock it back down, just as before.'},
    'zu_chest@chelm':{ko:[],idle:['$'],
      b:'The chest leaves the fight and heads south-east after Chelmsford. The British line is free, and the camp has time to get ready.'},
    'zu_chest@plateau':{ko:[],idle:['$'],
      b:'The chest climbs back up the plateau. With nothing pinning it, the British line falls back round the tents in good order.'},
    'zu_lhorn@behind':{fire:[['br_guns','$','cannon']],ko:[],
      b:'The left horn sets off to cross behind the camp, right across the front of the British guns. It takes heavy losses, and the far side of the camp is left open.'},
    'zu_lhorn@front':{fire:[['br_line','$','rifle'],['br_guns','$','cannon']],ko:[],
      b:'The left horn joins the chest in a charge straight at the firing line. The volleys pin it down too, and the far side of the camp is left open.'},
    'zu_lhorn@chelm':{ko:[],idle:['$'],
      b:'The left horn turns away south-east after Chelmsford. Durnford\'s men on the British right have nothing in front of them any more.'},
    'zu_lhorn@plateau':{ko:[],idle:['$'],
      b:'The left horn climbs back up the plateau, and the British right is left alone.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, after:[0,1,2,3],
     qs:'The approach: which toy goes where?',
     sit:'21 January 1879. The British column has camped below Isandlwana hill. Your army of about 20,000 has marched fast from the east. British patrols are out looking for you, and there has been skirmishing to the south-east.',
     q:'The camp is a few hours away. Which toy, sent where, brings your army within reach on your own terms?',
     intel:[['The camp','No trench, and no ring of wagons round the tents.'],
            ['Their weapons','Breech-loading rifles and two field guns, deadly across open ground.'],
            ['The ground','North-east of the camp, a high plateau is cut by deep valleys, big enough to hide an army.']],
     toys:[['zu_chest','Chest','the chest'],['zu_lhorn','Left horn','the left horn'],['zu_rhorn','Right horn','the right horn']],
     zones:[['valley','Ngwebeni valley',270,56,24,'in small groups into the hidden Ngwebeni valley'],['plain','Across the plain',320,300,24,'straight across the open plain at the camp'],
            ['skirm','The skirmishes',350,370,20,'south-east, toward the skirmishing']],
     ans:{u:['zu_chest','zu_lhorn','zu_rhorn'],z:'valley'},
     hint:{z:'In the open, their rifles reach you long before your spears reach them. Think about what they cannot shoot at.'},
     fbU:{zu_chest:'Right toy. The whole army moves together: every regiment is needed for the attack.',
          zu_lhorn:'Right toy. The whole army moves together: every regiment is needed for the attack.',
          zu_rhorn:'Right toy. The whole army moves together: every regiment is needed for the attack.'},
     fbZ:{valley:'Right place. A few hours from the camp and out of sight, your army can strike when it chooses.',
          plain:'Across open ground in daylight, their rifles and guns cut your regiments down long before they get close.',
          skirm:'Chasing the skirmishes means meeting the British where they are looking for you, on ground they choose.'},
     fail:{valley:{ko:[]},plain:{fire:[['br_line','$','rifle'],['br_guns','$','cannon']],ko:[]},skirm:{ko:[],idle:['$']}}},
    {from:3, after:[4],
     qs:'Found: which toy goes where?',
     sit:'22 January, late morning. Your commanders meant to attack tomorrow. But British horsemen chasing a few of your men have just come over the ridge and seen the whole army sitting in the valley.',
     q:'Your army has been found. Which toy, sent where, makes the most of it?',
     intel:[['The horsemen','They have seen you, and they are falling back toward the camp, firing as they go.'],
            ['The camp','Still no trench, and no ring of wagons round the tents.'],
            ['Waiting','By tomorrow, the camp will know exactly where you are.']],
     toys:[['zu_chest','Chest','the chest'],['zu_lhorn','Left horn','the left horn'],['zu_rhorn','Right horn','the right horn']],
     zones:[['attack','At the camp, now',236,150,24,'over the edge of the plateau at the camp, now'],['back','Back into hiding',350,26,20,'back out of sight, to wait for tomorrow'],
            ['chelm','After Chelmsford',330,350,22,'south-east after Chelmsford']],
     ans:{u:['zu_chest','zu_lhorn','zu_rhorn'],z:'attack'},
     hint:{z:'They know where you are now. Every hour you wait, the camp gets readier.'},
     fbU:{zu_chest:'Right toy. The whole army goes together: the chest and both horns have work to do.',
          zu_lhorn:'Right toy. The whole army goes together: the chest and both horns have work to do.',
          zu_rhorn:'Right toy. The whole army goes together: the chest and both horns have work to do.'},
     fbZ:{attack:'Right place. Surprise is gone, so speed is all you have left. Strike before the camp is ready.',
          back:'Once the camp is warned, it can dig in or call Chelmsford back. Waiting throws your chance away.',
          chelm:'Chelmsford has the bigger half of the column. Going after him leaves the smaller half alone.'},
     fail:{attack:{ko:[]},back:{ko:[],idle:['$']},chelm:{ko:[],idle:['$']}}},
    {after:[5,6,7],
     hint:{u:'Which horn is already on the side of the camp nearest the hill?',z:'The chest holds them in front. Think about where they would go if they had to fall back.'},
     intel:[['The firing line','Long and thin, far out in front of the tents. Its volleys have pinned your chest down.'],
            ['Your horns','The right horn is out on the north side, near the hill. The left horn is out on the far side, beyond Durnford\'s men.'],
            ['The hill','Isandlwana hides the ground behind the camp, where the road runs back to Rorke\'s Drift.']]}],
  clues:[
    {cat:'m',t:'The chest is pinned',b:'Your chest has gone to ground under the British volleys. It can hold the firing line where it is, but it cannot break it.'},
    {cat:'e',card:'b24i1879'},
    {cat:'t',t:'The hill behind the camp',b:'Isandlwana hill blocks the British view to the west. The road back to Rorke\'s Drift runs past its southern end.'},
    {cat:'tr',card:'zhorn1879'},
    {cat:'m',t:'Horns of the buffalo',b:'The chest holds the enemy while the horns run round to cut off his escape. Send the horn that is closest to the back of the camp.'}],
  deduce:[['The chest is pinned by the volleys.','It holds the British in place, but it cannot win alone.'],
          ['Isandlwana hill hides the ground behind the camp.','A horn can get round it out of sight.'],
          ['The right horn is out on the north side, nearest the hill.','Send it round behind the hill, across the road out.']],
  /* The real battle. North is up. The camp faces east, toward the plateau; Isandlwana hill is behind it to the west,
     with the road to Rorke's Drift running west past its southern end. Chelmsford went south-east, toward Mangeni. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={zu_chest:[380,150],zu_lhorn:[384,200],zu_rhorn:[376,104],zu_loins:[392,56],zu_cmd:[356,128],
           br_line:[232,236],br_guns:[212,240],br_durn:[14,290,'off'],br_aux:[240,282],br_chelm:[262,262],br_cmd:[218,256]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Camp at Isandlwana',b:'On 20 January the British centre column camps below Isandlwana hill. Lord Chelmsford digs no trench and forms no ring of wagons. "It would take a week to make," he says.'});
    add(0,{zu_chest:[270,60,'hide'],zu_lhorn:[304,74,'hide'],zu_rhorn:[238,44,'hide'],zu_loins:[296,34,'hide'],zu_cmd:[322,52]},
      {a:[['g',380,150,274,64],['g',384,200,306,80],['g',376,104,242,48]],t:'The hidden valley',b:'On 21 January the Zulu army, more than 20,000 strong, slips into the Ngwebeni valley north-east of the camp. No flames are lit, and nobody makes a sound.'});
    add(1,{br_chelm:[340,392,'exit'],br_durn:[190,292]},{a:[['t',262,262,336,384],['t',14,290,186,292]],t:'The column splits',b:'At dawn on 22 January, Chelmsford marches off south-east with about 2,800 men to look for the Zulu army. About 1,300 stay at the camp under Colonel Pulleine. Mid-morning, Colonel Durnford rides in from Rorke\'s Drift with about 500 more men and a rocket battery.'});
    add(1,{br_durn:[250,120],zu_chest:[270,60],zu_lhorn:[304,74],zu_rhorn:[238,44],zu_loins:[296,34]},{a:[['t',190,292,248,126]],t:'Found',b:'Around 11 in the morning, a troop of Durnford\'s horsemen under Lieutenant Raw chases some Zulus herding cattle up a slope. From the top they look down on the whole Zulu army, sitting in silence. The Zulus had meant to attack the next day.'});
    add(2,{zu_chest:[236,146],zu_lhorn:[322,170],zu_rhorn:[150,116],zu_loins:[262,70],zu_cmd:[300,82],
           br_durn:[292,236],br_line:[226,200],br_guns:[212,222],br_aux:[256,226]},
      {a:[['g',270,60,236,140],['g',304,74,320,164],['g',238,44,154,112],['t',250,120,290,230]],t:'Off the plateau',b:'The Zulu regiments pour off the plateau in the horns and chest of the buffalo. Durnford\'s men fall back to a dry gully on the British right. Pulleine sends his companies out into a long firing line, and for about an hour their volleys pin the chest down.',
      fire:[['br_line','zu_chest','rifle'],['br_guns','zu_chest','cannon'],['br_durn','zu_lhorn','rifle']]});
    add(2,{zu_rhorn:[116,270],zu_lhorn:[296,284],zu_chest:[226,180],br_durn:[244,266],br_line:[222,226],br_aux:[180,300],br_guns:[208,236]},
      {a:[['g',150,116,118,264],['g',322,170,298,278],['t',292,236,248,264]],t:'The horns close',b:'The left horn works round the British right. Durnford\'s men run short of ammunition and fall back, and Pulleine orders the line back to the camp. Behind Isandlwana, the right horn comes down across the road out, cutting off the retreat.',
      fire:[['zu_lhorn','br_durn','clash'],['br_line','zu_chest','rifle'],['br_guns','zu_chest','cannon'],['br_durn','zu_lhorn','rifle']]});
    add(2,{zu_chest:[220,214],zu_lhorn:[262,282],zu_rhorn:[170,282],
           br_line:[222,232,'ko'],br_guns:[208,240,'ko'],br_durn:[244,268,'ko'],br_cmd:[218,258,'ko'],br_aux:[160,312,'ko']},
      {a:[['g',226,180,220,208],['g',296,284,266,282],['g',116,270,164,282]],t:'The sun goes dark',b:'The Zulu regiments break into the camp from three sides. At about half past two, an eclipse darkens the sun in the middle of the fighting. Pulleine and Durnford are killed, and only a few men on horseback get away to the river.',
      fire:[['zu_chest','br_line','clash'],['zu_chest','br_guns','clash'],['zu_lhorn','br_durn','clash'],['zu_lhorn','br_cmd','clash'],['zu_rhorn','br_aux','clash']]});
    add(2,{zu_loins:[14,296,'exit']},{a:[['g',262,70,100,150,18,292]],t:'The cost',b:'Over 1,300 British and allied soldiers are dead, and at least 1,000 Zulus. The reserve, about 4,000 warriors, goes on west to attack Rorke\'s Drift, where about 150 men hold the post. Chelmsford gets back to the camp at sundown, too late.'});
    return S;
  })(),
  video:{id:'nVpDp-nd02w',t:'The Battle of Isandlwana 1879 (Anglo-Zulu War Documentary)',ch:'Battle Guide',v:1346878},
  sources:[['Wikipedia: Battle of Isandlwana','https://en.wikipedia.org/wiki/Battle_of_Isandlwana'],
           ['British Battles: Battle of Isandlwana','https://britishbattles.com/zulu-war/isandlwana.htm'],
           ['Talana Museum: Isandlwana','https://www.talana.co.za/battles-of-the-area/isandlwana/'],
           ['Heritage Portal: the battle behind Isandlwana','https://www.theheritageportal.co.za/article/battle-behind-isandlwana-fight-amanzimnyama-drift-and-fugitives-trail'],
           ['Historic UK: Zulus victorious at Isandlwana','https://www.historic-uk.com/HistoryUK/HistoryofBritain/Isandlwana-Zulu-War-Victory/'],
           ['EBSCO Research Starters: Battle of Isandhlwana','https://www.ebsco.com/research-starters/military-history-and-science/battle-isandhlwana']],
  cards:{zu_chest:'zchest1879',zu_lhorn:'zhorn1879',zu_rhorn:'zhorn1879',zu_loins:'zchest1879',
         br_line:'b24i1879',br_guns:'rgun1879',br_durn:'nmh1879',br_aux:'nnci1879',br_chelm:'b24i1879'}
});
