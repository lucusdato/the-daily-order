/* The Daily Order: mystery battles for days 17 to 20 (Teutoburg Forest, Isandlwana, Blenheim, Bannockburn).
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

PGD.mystery(20,{
  war:'War of the Spanish Succession',
  general:'the Duke of Marlborough',
  pitch:'You are <b>the Duke of Marlborough</b>. You have marched your army across Europe to save Vienna. Now a bigger French and Bavarian army waits for you behind a marshy stream beside the Danube. Beat it.',
  H:600,
  terrain(){
    let s=felt('#97a468',600);
    s+=trees(20,40,[0,190,0,150],()=>true,['#4f7434','#5b7a3a']);
    s+=`<path d="M190 0 Q176 180 194 300 Q206 450 186 560 L212 560 Q226 450 216 300 Q200 180 212 0 Z" fill="#7f9a72" opacity=".6"/>`;
    s+=river('M200 0 Q188 180 205 300 Q216 450 198 560',6);
    s+=river('M0 572 Q200 548 400 574',22);
    s+=house(270,480)+house(282,488,'#8a3a2a')+house(276,468)+house(260,494)+house(288,474);
    s+=house(266,264)+house(278,272,'#8a3a2a')+house(272,256);
    s+=house(260,90)+house(272,98,'#8a3a2a')+house(266,82);
    s+=road('M220 520 Q300 512 400 520');
    s+=label(272,452,'Blenheim',10)+label(272,240,'Oberglau',9)+label(266,66,'Lutzingen',9)+label(120,592,'Danube',10)+label(180,370,'Nebel stream',8,-86);
    s+=label(360,506,'To Hochstadt',8)+label(80,190,'Broken ground',8);
    s+=compass(26,560);
    return s+end(600);
  },
  lead:'August 1704. France and Bavaria threaten Vienna, and with it the whole alliance against King Louis XIV. You have marched your army about 400 km from the Low Countries to the Danube and joined Prince Eugene of Savoy. Marshal Tallard, the French commander, thinks you are about to march away.',
  sit:'5 pm, 13 August. Your center is over the Nebel at last. Blenheim is crammed with French infantry that cannot get out, Oberglau is held in check, and Eugene is fighting hard in the north. Between the two villages, Tallard\'s center is mostly cavalry, and his few battalions of foot there have just been shot to pieces.',
  mett:{
    m:'Destroy the French and Bavarian army and save Vienna.',
    e:'About 56,000 French and Bavarians. Tallard\'s infantry holds Blenheim, Marsin and the Elector of Bavaria hold Oberglau and Lutzingen, and the center between them is mostly cavalry.',
    t:'A plain beside the Danube, cut across by the marshy Nebel stream. Villages anchor the French line.',
    tr:'About 52,000 British, Dutch, Danish, German and Austrian soldiers, under you and Prince Eugene.',
    ti:'One summer day. The French think you will march away, so they are not ready for a battle at dawn.'},
  ground:[['Key terrain','The French center between Blenheim and Oberglau, held mostly by cavalry.',[300,246,36]],
          ['Obstacle','The Nebel, a marshy stream across the whole front.',[204,200,22]],
          ['Avenue of approach','The open ground behind the French center, running down to the Danube.',[332,336,30]]],
  q:'The French center has lost its foot soldiers. Which toy, sent where, breaks the French army?',
  qs:'The last blow: which toy goes where?',
  toys:[['al_cav','Allied cavalry','your cavalry'],['al_inf','Center infantry','your center infantry'],['al_cutts','Cutts\'s column','Cutts\'s column']],
  zones:[['gap','French center',300,246,24,'straight through the French center'],['blen','Storm Blenheim',258,316,20,'into Blenheim village'],
         ['ober','Into Oberglau',276,176,20,'into Oberglau'],['north','Help Eugene',196,110,22,'north to help Eugene']],
  ans:{u:'al_cav',z:'gap'},
  start:{al_cutts:[228,322],al_inf:[252,236],al_cav:[236,216],al_eugene:[236,74],al_marl:[216,216],
         fr_blen:[280,322],fr_cav:[292,244],fr_ober:[284,182],fr_marsin:[292,80],fr_tallard:[336,282]},
  fbU:{al_cav:'Right toy. You have about 80 squadrons in the center against about 64 French. Horsemen are what break and chase horsemen.',
       al_inf:'Not this toy. Your infantry has just shot the French battalions apart. Now it is the support that lets the horsemen go forward, not the blow itself.',
       al_cutts:'Not this toy. Cutts is the only thing keeping a garrison about twice his size inside Blenheim. Move him, and they come out.'},
  fbZ:{gap:'Right place. The French center has no foot soldiers left to stop horsemen. Break it, and Blenheim is cut off from the rest of the French army.',
       blen:'Blenheim is already doing nothing for the French. Storming a packed village only wastes men.',
       ober:'Oberglau is held in check. A fight there wins a village, not the battle.',
       north:'Eugene is holding his own. Marching north spends the moment the French center is weakest.'},
  fail:{
    'al_cav@blen':{fire:[['fr_blen','$','musket']],ko:[],
      b:'Your squadrons ride at the barricades of Blenheim. Horsemen cannot storm a village, and the packed garrison shoots them down from behind walls and fences.'},
    'al_cav@ober':{fire:[['fr_ober','$','musket']],ko:[],
      b:'Your squadrons ride at Oberglau, where the French and Irish shoot them from the houses. Tallard\'s center is left alone and has time to bring up help.'},
    'al_cav@north':{u:{fr_cav:[268,240]},fire:[['fr_cav','al_inf','clash']],ko:[],idle:['$'],
      b:'Your cavalry rides north to Eugene. Your infantry is left alone in the open, and Tallard\'s squadrons come at it.'},
    'al_inf@gap':{fire:[['fr_cav','$','clash']],ko:[],
      b:'Your infantry marches into the French center on foot. Tallard\'s squadrons swirl round it, and with your own horsemen standing still behind, the attack stalls.'},
    'al_inf@blen':{fire:[['fr_blen','$','musket']],ko:[],
      b:'Your center infantry joins the attack on Blenheim. The packed garrison shoots it down from the barricades, and your cavalry is left with no foot soldiers to support it.'},
    'al_inf@ober':{fire:[['fr_ober','$','musket']],ko:[],
      b:'Your infantry attacks Oberglau again. The fight there drags on, and the moment to break the center slips past.'},
    'al_inf@north':{u:{fr_cav:[268,232]},fire:[['fr_cav','al_cav','clash']],ko:[],idle:['$'],
      b:'Your infantry marches north to help Eugene. Your cavalry in the center is left without foot soldiers beside it, and Tallard\'s squadrons hit it.'},
    'al_cutts@gap':{u:{fr_blen:[258,296]},fire:[['fr_blen','$','musket']],ko:[],
      b:'Cutts leaves Blenheim and marches into the center. The garrison comes pouring out of the village behind him and shoots into his back.'},
    'al_cutts@blen':{fire:[['fr_blen','$','musket']],ko:[],
      b:'Cutts storms Blenheim once more. The garrison is now so big that the attack fails at the barricades, just as the first ones did.'},
    'al_cutts@ober':{u:{fr_blen:[258,296]},fire:[['fr_blen','al_inf','musket']],ko:[],idle:['$'],
      b:'Cutts marches north to Oberglau. The garrison of Blenheim is free to come out of the village and into the side of your center.'},
    'al_cutts@north':{u:{fr_blen:[258,296]},fire:[['fr_blen','al_inf','musket']],ko:[],idle:['$'],
      b:'Cutts marches the length of the field to help Eugene. Behind him, the garrison of Blenheim comes out and into the side of your center.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {start:{al_cutts:[150,322],al_inf:[150,246],al_cav:[124,214],al_eugene:[160,72],al_marl:[112,272],
            fr_blen:[284,322],fr_cav:[300,248],fr_ober:[284,182],fr_marsin:[300,84],fr_tallard:[336,282]},
     after:[0,1,2,3,4],
     qs:'Open the battle: which toy goes where?',
     sit:'1 pm, 13 August. Your army came out of the morning fog and formed up across the Nebel from the French, who did not expect an attack. Eugene has finished his long march on the right and is ready. Your center still has to get over the marshy stream.',
     q:'You want Tallard\'s infantry tied down far from his center while you cross. Which toy, sent where, does that?',
     intel:[['The French line','Tallard holds the right and the center. Most of his infantry is in and around Blenheim, by the Danube. His center is mostly cavalry.'],
            ['Your columns','Cutts\'s column faces Blenheim. Your center is waiting to cross the Nebel. Eugene faces Lutzingen, far to the north.'],
            ['The stream','The Nebel is marshy. Your center needs time to get across it in good order.']],
     toys:[['al_cutts','Cutts\'s column','Cutts\'s column'],['al_inf','Center infantry','your center infantry'],['al_cav','Allied cavalry','your cavalry'],['al_eugene','Eugene\'s wing','Eugene\'s wing']],
     zones:[['blen','Blenheim village',250,320,22,'against Blenheim village'],['ober','Oberglau',258,180,20,'against Oberglau'],
            ['gap','French center',300,246,22,'straight at the French center'],['res','Into reserve',70,236,20,'back into reserve']],
     ans:{u:'al_cutts',z:'blen'},
     hint:{u:'Use the men already facing the place you want to tie down, so the rest are free to cross.',z:'Find where most of Tallard\'s own infantry already stands.'},
     fbU:{al_cutts:'Right toy. Cutts already faces Blenheim. Sending him leaves your center free to cross.',
          al_inf:'Not this toy. Your center infantry has to cross the Nebel. Send it elsewhere, and the main blow has nobody to make it.',
          al_cav:'Not this toy. Horsemen cannot storm villages, and you need them to cross in the center.',
          al_eugene:'Not this toy. Eugene has his own fight against Marsin and the Elector in the north. Pull him away and they are free.'},
     fbZ:{blen:'Right place. Most of Tallard\'s infantry is here. Keep it busy, and it cannot help his center.',
          ober:'Oberglau is held by Marsin\'s men. Attacking it does nothing about Tallard\'s infantry by the Danube.',
          gap:'That is where the main blow must land later, once your center is over the stream. Going in now is too early.',
          res:'Held back, it ties down nobody. Tallard\'s infantry is free to help his center.'},
     fail:{blen:{ko:[],fire:[['fr_blen','$','musket']]},ober:{ko:[],fire:[['fr_ober','$','musket']]},
           gap:{ko:[],fire:[['fr_cav','$','clash']]},res:{ko:[],idle:['$']}}},
    {from:4, after:[5,6,7,8],
     qs:'Trouble at Oberglau: which toy goes where?',
     sit:'About 3 pm. Near Oberglau, two of your brigades under the Prince of Holstein-Beck have been cut down by French and Irish troops coming out of the village. Now Marsin is turning his cavalry against the open side of your center.',
     q:'Your center is about to be hit from the side. Which toy, sent where, stops Marsin\'s horsemen?',
     intel:[['Your cavalry','Your center cavalry is over the Nebel, face to face with Tallard\'s squadrons.'],
            ['Cutts','Cutts is keeping a garrison about twice his size shut inside Blenheim.'],
            ['Eugene','Eugene is fighting hard in the north, but he has a brigade of Imperial heavy cavalry under Count Fugger.']],
     toys:[['al_eugene','Fugger\'s cuirassiers','Count Fugger\'s cuirassiers'],['al_cav','Allied cavalry','your center cavalry'],['al_cutts','Cutts\'s column','Cutts\'s column']],
     zones:[['flank','Marsin\'s flank',246,130,22,'into the side of Marsin\'s horsemen'],['ober','Storm Oberglau',292,196,18,'straight into Oberglau'],
            ['blen','Storm Blenheim',260,316,20,'into Blenheim village'],['back','Over the Nebel',164,212,20,'back over the Nebel']],
     ans:{u:'al_eugene',z:'flank'},
     hint:{u:'Two of your forces cannot turn away from what they are doing. Look for horsemen who can.',z:'Horsemen are strongest when they hit other horsemen from the side.'},
     fbU:{al_eugene:'Right toy. Fugger\'s brigade is the one body of heavy horse you can call on that is not locked in a fight of its own.',
          al_cav:'Not this toy. Your center cavalry is face to face with Tallard\'s squadrons. Turn it away, and they ride straight over your infantry.',
          al_cutts:'Not this toy. Cutts is the lid on Blenheim. Take him away, and the garrison comes out.'},
     fbZ:{flank:'Right place. Marsin\'s horsemen are turned toward your center, so their own side is open.',
          ober:'The village is full of French and Irish infantry. Storming it does not stop Marsin\'s cavalry hitting your center.',
          blen:'Blenheim is already pinned. The danger is at Oberglau.',
          back:'Going back over the stream gives up the center you have just built, and Marsin still rides in.'},
     fail:{flank:{ko:[],fire:[['fr_cav','al_inf','clash']]},ober:{ko:[],fire:[['fr_ober','$','musket']]},
           blen:{ko:[],fire:[['fr_blen','$','musket']]},back:{ko:[],idle:['$'],u:{fr_marsin:[256,170]},fire:[['fr_marsin','al_inf','clash']]}}},
    {after:[9,10,11],
     hint:{u:'Count the squadrons on each side in the center.',z:'Look for the part of the French line that has nothing left to stop horsemen.'},
     intel:[['Pinned','The French infantry in Blenheim is packed so tight it can hardly move, and Cutts is keeping it there.'],
            ['The center','About 80 of your squadrons face about 64 French. The French foot soldiers in the center have just been cut down.'],
            ['The north','Eugene is holding Marsin and the Elector around Lutzingen.']]}],
  clues:[
    {cat:'m',t:'A thin center',b:'Tallard built his center mostly from cavalry, with only a few battalions of foot. Those battalions have just been cut down.'},
    {cat:'e',card:'gendarme1704'},
    {cat:'e',t:'Pinned and crammed',b:'The French infantry in Blenheim is packed so tight it can hardly move, and Cutts is keeping it there. Oberglau is held in check.'},
    {cat:'tr',card:'allyhorse1704'},
    {cat:'m',t:'Horse against horse',b:'You now have about 80 squadrons in the center against about 64 French. Send your horsemen, with the infantry behind them, through the middle.'}],
  deduce:[['The French center has lost its foot soldiers.','Horsemen can now ride into it.'],
          ['You have more squadrons there than Tallard.','The cavalry is the toy to send.'],
          ['Blenheim and Oberglau are both held in check.','Nothing threatens the sides of your charge.']],
  /* The real battle. North is up. The Allies attack from the west, across the Nebel; the French face west, with their right on the Danube. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={al_cutts:[150,322],al_inf:[150,246],al_cav:[124,214],al_eugene:[160,72],al_marl:[112,272],
           fr_blen:[284,322],fr_cav:[300,248],fr_ober:[284,182],fr_marsin:[300,84],fr_tallard:[336,282]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{al_cutts:[244,322]},{a:[['g',150,322,240,322]],t:'Storming Blenheim',b:'At about 1 pm Cutts\'s column wades the Nebel and storms Blenheim. Its brigadier, Rowe, is shot down at the palisade, and the attack is thrown back with heavy losses.',
      fire:[['fr_blen','al_cutts','musket'],['al_cutts','fr_blen','clash']]});
    add(0,{al_cutts:[228,322],fr_blen:[280,322]},{t:'Crammed in',b:'Without asking Tallard, the French commander in the village, Clerambault, orders his reserve battalions into Blenheim. Soon the men are packed so tight they get in each other\'s way.'});
    add(1,{al_marl:[180,268]},{t:'Keep them busy',b:'Marlborough tells Cutts to stop storming the village and simply keep its garrison inside. No more than 5,000 Allied soldiers now pin down about twice that many French.'});
    add(1,{al_inf:[236,246],al_cav:[240,224],fr_cav:[280,238],al_marl:[196,262]},{a:[['g',150,246,232,246],['g',124,214,236,222]],t:'Over the Nebel',b:'In the center, your infantry and cavalry cross the Nebel. Tallard lets them come over, planning to strike once they are across. His squadrons charge, and Prussian cavalry drives them back.',
      fire:[['fr_cav','al_cav','clash'],['al_cav','fr_cav','clash']]});
    add(1,{al_inf:[236,208],fr_ober:[254,192],fr_marsin:[276,140]},{a:[['t',300,84,278,136]],t:'Trouble at Oberglau',b:'Near Oberglau, the Prince of Holstein-Beck leads two brigades over the stream. French and Irish troops come out of the village and cut them down, and Holstein-Beck is wounded and captured. Marsin turns his cavalry toward your open side.',
      fire:[['fr_ober','al_inf','clash']]});
    add(1,{al_eugene:[252,132],fr_marsin:[292,110],al_marl:[216,216]},{a:[['g',160,72,248,128]],t:'Fugger\'s charge',b:'Marlborough asks Eugene for Count Fugger\'s brigade of Imperial cuirassiers. They charge into Marsin\'s squadrons from the side and throw them back in disorder.',
      fire:[['al_eugene','fr_marsin','clash'],['fr_ober','al_inf','musket']]});
    add(1,{al_inf:[244,214],fr_ober:[284,182]},{t:'Back into Oberglau',b:'Marlborough sends fresh battalions forward, and they push the French and Irish back into Oberglau. Your center is safe.',
      fire:[['al_inf','fr_ober','musket']]});
    add(1,{al_eugene:[236,74],fr_marsin:[292,80]},{t:'Eugene\'s fight',b:'In the north, Eugene\'s attacks on Lutzingen are thrown back again and again. In the end he leads the Prussian and Danish infantry himself. They storm a Bavarian battery and push the French back with the bayonet.',
      fire:[['fr_marsin','al_eugene','musket'],['al_eugene','fr_marsin','clash']]});
    add(2,{al_inf:[252,236],al_cav:[236,216],fr_cav:[292,244]},{t:'Nine battalions',b:'By 5 pm you have about 80 squadrons over the stream, some taken from Cutts, against about 64 French. In the French center, nine battalions of foot form squares, and your guns and close-range volleys cut them down.',
      fire:[['al_inf','fr_cav','musket']]});
    add(2,{al_cav:[318,252],fr_cav:[334,272],al_marl:[262,236]},{a:[['g',236,216,314,250]],t:'The charge',b:'At about 5:30 pm Marlborough sends his cavalry forward, with infantry behind it. The French squadrons meet the charge standing still, and break.',
      fire:[['al_cav','fr_cav','clash']]});
    add(2,{al_cav:[334,346],al_inf:[300,280],fr_cav:[340,372,'ko'],fr_tallard:[326,352,'ko']},{a:[['t',334,272,340,366]],t:'Into the Danube',b:'The broken French horsemen flee toward the Danube. Many plunge into the river and drown, over 3,000 by some counts. Tallard is surrounded by Hessian troopers near Sonderheim and taken prisoner.',
      fire:[['al_cav','fr_cav','clash'],['al_cav','fr_tallard','clash']]});
    add(2,{al_inf:[300,316],al_cutts:[240,322],fr_blen:[280,322,'ko'],fr_marsin:[392,60,'exit'],fr_ober:[392,150,'exit']},{t:'Surrender',b:'Marsin and the Elector get away at dusk. Blenheim is cut off and surrounded, and that evening about 10,000 French infantry lay down their arms. Marlborough writes a note to his wife on the back of a tavern bill: her army has had a glorious victory.',
      fire:[['al_inf','fr_blen','musket'],['al_cutts','fr_blen','musket']]});
    return S;
  })(),
  video:{id:'BrDQ1DuLmxk',t:'Day that changed history: Battle of Blenheim 1704 - Marlborough & Savoy Masterclass',ch:'HistoryMarche',v:498698},
  sources:[['Wikipedia: Battle of Blenheim','https://en.wikipedia.org/wiki/Battle_of_Blenheim'],
           ['British Battles: Battle of Blenheim','https://www.britishbattles.com/war-of-the-spanish-succession/battle-of-blenheim/'],
           ['National Army Museum: Battle of Blenheim','https://www.nam.ac.uk/explore/battle-blenheim'],
           ['Encyclopaedia Britannica (1911): Blenheim','https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Blenheim'],
           ['Marlborough\'s note to his wife after Blenheim','https://en.wikisource.org/wiki/Marlborough%27s_note_to_his_wife_Sarah_at_the_end_of_the_Battle_of_Blenheim']],
  cards:{al_cutts:'redcoat1704',al_inf:'redcoat1704',al_cav:'allyhorse1704',al_eugene:'cuirassier1704',
         fr_blen:'frenchfoot1704',fr_cav:'gendarme1704',fr_ober:'irish1704',fr_marsin:'frenchfoot1704'}
});

PGD.mystery(15,{
  war:'First War of Scottish Independence',
  general:'Robert the Bruce',
  pitch:'You are <b>Robert the Bruce</b>, King of Scots. The biggest English army in years is marching to save Stirling Castle, and it has the finest heavy cavalry in Europe. Your army is mostly men with spears. Stop it.',
  H:600,
  terrain(){
    let s=felt('#8fa064',600);
    s+=`<path d="M220 180 Q300 240 360 390 Q330 450 260 450 Q220 375 220 180 Z" fill="#7f9a72" opacity=".75"/>`;
    s+=trees(91,60,[0,200,90,450],()=>true,['#2f5a24','#3b6b2b']);
    s+=river('M0 450 Q120 420 200 465 Q280 510 400 450',9)+river('M260 90 Q300 240 340 345 Q370 420 400 435',6);
    s+=river('M230 0 Q320 40 400 24',12);
    s+=road('M150 600 L150 0');
    s+=`<rect x="186" y="14" width="28" height="22" fill="#b9b2a2" stroke="#4f4a40"/><rect x="190" y="5" width="6" height="12" fill="#8d8478"/><rect x="204" y="5" width="6" height="12" fill="#8d8478"/>`;
    s+=house(196,206,'#8a3a2a');
    s+=label(200,52,'Stirling Castle',9)+label(70,270,'New Park (woods)',10)+label(296,330,'The Carse',9)+label(320,500,'Bannock Burn',9)+label(336,190,'Pelstream',8)+label(196,226,'St Ninian\'s',8)+label(330,14,'River Forth',8);
    s+=compass(380,576);
    return s+end(600);
  },
  lead:'June 1314. Your brother has besieged Stirling Castle, and its English commander has agreed to give it up unless an English army arrives by midsummer. King Edward II is marching north with a huge army to relieve it. You have chosen to meet him at the New Park, a wood across the road to Stirling.',
  sit:'Morning, 24 June. Your spearmen have pushed the English knights back into the cramped ground between the streams. But English archers have worked their way out beside the fight and are shooting into your schiltrons. If they keep it up, the blocks of spearmen will be cut to pieces.',
  mett:{
    m:'Beat the English army and keep Stirling Castle from being relieved.',
    e:'Perhaps 15,000 to 20,000 men, with about 2,000 heavy cavalry and many archers.',
    t:'A wood across the road to Stirling. To the east, the Carse: flat, wet ground between the Bannock Burn and the Pelstream.',
    tr:'Perhaps 6,000 to 7,000 spearmen in schiltrons, tight blocks of long spears, and about 500 horsemen under Sir Robert Keith.',
    ti:'Edward must reach Stirling by midsummer, 24 June.'},
  ground:[['Key terrain','The New Park wood, across the road to Stirling.',[80,180,40]],
          ['Obstacle','The Bannock Burn and the Pelstream, hemming in the Carse.',[300,296,30]],
          ['Avenue of approach','The open ground beside the fight, where the archers have gone.',[290,326,26]]],
  q:'The archers are shooting into your spearmen from the side. Which toy, sent where, stops them?',
  qs:'Arrows from the side: which toy goes where?',
  toys:[['sc_keith','Keith\'s horsemen','Keith\'s horsemen'],['sc_king','The king\'s schiltron','your own schiltron'],['sc_doug','Douglas\'s schiltron','Douglas\'s schiltron']],
  zones:[['arch','Into the archers',300,334,22,'into the side of the archers'],['cav','Into the knights',296,214,20,'into the mass of knights'],
         ['king','Edward\'s banner',340,150,20,'round to King Edward\'s banner'],['castle','To the castle',204,50,20,'north to the castle']],
  ans:{u:'sc_keith',z:'arch'},
  start:{sc_moray:[244,226],sc_edw:[242,258],sc_doug:[250,184],sc_king:[170,250],sc_keith:[140,196],sc_bruce:[176,236],
         en_cav:[268,214],en_van:[246,262,'ko'],en_arch:[282,316],en_inf:[312,206],en_edw:[334,180]},
  fbU:{sc_keith:'Right toy. Horsemen cross open ground fast, and archers on foot with nobody guarding them cannot stand a charge.',
       sc_king:'Not this toy. Spearmen on foot are slow. The archers would shoot them as they came, and your last reserve would be spent.',
       sc_doug:'Not this toy. Douglas is locked in the fight with the knights. Turn him away, and the line opens.'},
  fbZ:{arch:'Right place. Strike the archers from the side, where they have nothing to protect them.',
       cav:'The knights are already held by your spears. More men there do nothing about the arrows.',
       king:'Edward is behind his whole army. You would have to cut through it first, under arrows all the way.',
       castle:'The castle is not the danger. The arrows are.'},
  fail:{
    'sc_keith@cav':{fire:[['en_cav','$','clash'],['en_arch','sc_edw','arrows']],ko:[],
      b:'Keith\'s few hundred horsemen ride into the mass of English knights and are swallowed up. The archers keep shooting.'},
    'sc_keith@king':{u:{en_inf:[326,176]},fire:[['en_inf','$','clash'],['en_arch','sc_edw','arrows']],ko:[],
      b:'Keith rides for Edward\'s banner and runs into the English foot soldiers around it. Meanwhile the archers go on shooting into your schiltrons.'},
    'sc_keith@castle':{fire:[['en_arch','sc_edw','arrows'],['en_arch','sc_moray','arrows']],ko:[],idle:['$'],
      b:'Keith rides off toward the castle, away from the fight. The archers go on shooting, and the schiltrons start to thin.'},
    'sc_king@arch':{fire:[['en_arch','$','arrows']],ko:[],
      b:'Your own schiltron marches across the open ground toward the archers. They turn and shoot it as it comes, and your last reserve is worn down before it reaches them.'},
    'sc_king@cav':{fire:[['$','en_cav','clash'],['en_arch','sc_edw','arrows']],ko:[],
      b:'Your own schiltron joins the push against the knights. The line is thicker, but the archers keep shooting into its side.'},
    'sc_king@king':{u:{en_inf:[326,176]},fire:[['en_inf','$','clash'],['en_arch','sc_edw','arrows']],ko:[],
      b:'Your schiltron tries to fight its way round to Edward\'s banner, past the English foot soldiers and under arrows all the way.'},
    'sc_king@castle':{fire:[['en_arch','sc_edw','arrows']],ko:[],idle:['$'],
      b:'Your own division marches off toward the castle. Nobody deals with the archers, and they go on shooting.'},
    'sc_doug@arch':{u:{en_cav:[256,196]},fire:[['en_cav','sc_moray','clash'],['en_arch','$','arrows']],ko:[],
      b:'Douglas turns away from the knights to go after the archers. The knights push into the gap he leaves and hit Moray\'s schiltron from the side.'},
    'sc_doug@cav':{fire:[['$','en_cav','clash'],['en_arch','sc_edw','arrows']],ko:[],
      b:'Douglas pushes harder at the knights, but they are already held. The archers are untouched and keep shooting.'},
    'sc_doug@king':{u:{en_cav:[256,196],en_inf:[326,176]},fire:[['en_cav','sc_moray','clash'],['en_inf','$','clash']],ko:[],
      b:'Douglas tries to fight his way round to Edward\'s banner. The knights push into the gap he leaves, and the archers keep shooting.'},
    'sc_doug@castle':{u:{en_cav:[256,196]},fire:[['en_cav','sc_moray','clash']],ko:[],idle:['$'],
      b:'Douglas marches off toward the castle. The knights are free to push through the gap he leaves.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {start:{sc_moray:[196,140],sc_edw:[120,240],sc_doug:[96,170],sc_king:[104,262],sc_keith:[56,120],sc_bruce:[150,264],
            en_cav:[262,236],en_van:[150,330],en_arch:[240,380],en_inf:[200,386],en_edw:[290,386]},
     after:[0,1,2],
     qs:'Riders round the flank: which toy goes where?',
     sit:'Evening, 23 June. While the English vanguard comes up the road toward your wood, about 300 English horsemen under Sir Robert Clifford are riding round its eastern edge, along the Carse. They are heading for Stirling Castle.',
     q:'Which toy, sent where, stops the riders reaching Stirling?',
     intel:[['Moray','Moray\'s schiltron stands by the church of St Ninian, at the east edge of the wood. You set it there to guard the way to the castle.'],
            ['The riders','Heavy horsemen in armor. On open ground they ride down men who break ranks.'],
            ['Your horse','Keith\'s 500 horsemen are your only cavalry, held in reserve.']],
     toys:[['sc_moray','Moray\'s schiltron','Moray\'s schiltron'],['sc_doug','Douglas\'s schiltron','Douglas\'s schiltron'],['sc_edw','Edward Bruce\'s schiltron','Edward Bruce\'s schiltron'],['sc_keith','Keith\'s horsemen','Keith\'s horsemen']],
     zones:[['block','In their path',236,176,22,'out into the open, across their path'],['castle','To the castle',204,50,20,'north to the castle walls'],
            ['road','At the vanguard',150,304,20,'down the road at the English vanguard'],['west','West to Lennox',28,200,20,'off west toward the Lennox']],
     ans:{u:'sc_moray',z:'block'},
     hint:{u:'You set one division to guard exactly this route.',z:'The riders must pass the edge of the wood. Get in front of them, not behind them.'},
     fbU:{sc_moray:'Right toy. Moray was set by St Ninian\'s to guard this very road, and he is the closest.',
          sc_doug:'Not this toy. Douglas stands deeper in the wood. By the time he is out, the riders are past.',
          sc_edw:'Not this toy. Edward Bruce stands far back in the wood, nowhere near the riders.',
          sc_keith:'Not this toy. Keith\'s few horsemen are your only cavalry. A tight block of spears is what stops knights.'},
     fbZ:{block:'Right place. Stand in front of them on the open ground, and they must ride onto your spears or turn back.',
          castle:'Racing them to the castle means a long march, and horsemen are faster than men on foot.',
          road:'The vanguard on the road is already facing your main body. The riders slip past to Stirling.',
          west:'Marching away leaves the road to Stirling wide open.'},
     fail:{block:{ko:[],fire:[['en_cav','$','clash']]},castle:{ko:[],idle:['$']},
           road:{ko:[],fire:[['en_van','$','clash']]},west:{ko:[],idle:['$']}}},
    {from:2, after:[3,4,5,6],
     qs:'Dawn on the Carse: which toy goes where?',
     sit:'Dawn, 24 June. You had thought of slipping away west in the night. Now the English are camped on the Carse, squeezed between the Bannock Burn and the Pelstream, after a night spent standing in their armor. A knight who has come over from their camp says their spirits are low.',
     q:'Your schiltrons are in the wood. Where do you send them?',
     intel:[['The English camp','Their heavy cavalry is jammed onto soft ground, with streams behind and beside it. There is little room to form up or build up speed.'],
            ['Your spearmen','A schiltron is a tight block of long spears. Knights packed together cannot break it.'],
            ['The deadline','Stirling Castle will be handed over unless it is relieved by midsummer: today.']],
     toys:[['sc_edw','Edward Bruce\'s schiltron','Edward Bruce\'s schiltron'],['sc_moray','Moray\'s schiltron','Moray\'s schiltron'],['sc_doug','Douglas\'s schiltron','Douglas\'s schiltron']],
     zones:[['carse','Onto the Carse',246,226,24,'out onto the open ground at their camp'],['west','West to Lennox',28,200,20,'off west toward the Lennox'],
            ['castle','To the castle',204,50,20,'north to the castle'],['wood','Deep in the wood',60,330,20,'deeper into the wood to wait']],
     ans:{u:['sc_edw','sc_moray','sc_doug'],z:'carse'},
     hint:{z:'Their strength needs room. Ask yourself where they have the least of it, and when.'},
     fbU:{sc_edw:'Right toy. All three schiltrons go together. This is a fight for the whole army.',
          sc_moray:'Right toy. All three schiltrons go together. This is a fight for the whole army.',
          sc_doug:'Right toy. All three schiltrons go together. This is a fight for the whole army.'},
     fbZ:{carse:'Right place. Packed between the streams, the knights have no room to charge. Attack now, before they get out onto firm ground.',
          west:'Slipping away saves your army, but Stirling is relieved and the chance is gone.',
          castle:'Stirling is held by the English. Marching there leaves their army free to come up behind you.',
          wood:'Waiting in the wood gives the English time to get off the Carse and onto firm ground.'},
     fail:{carse:{ko:[]},west:{ko:[],idle:['$']},castle:{ko:[],idle:['$']},wood:{ko:[],idle:['$']}}},
    {after:[7,8,9],
     hint:{u:'Spearmen are slow. Find something fast.',z:'Look for the enemy that has nobody standing beside it.'},
     intel:[['The knights','Jammed together between the streams, they are held by your schiltrons.'],
            ['The archers','Out on the side of the fight, shooting into your spearmen, with no knights guarding them.'],
            ['Your reserve','Your own division stands behind the line, and Keith\'s 500 horsemen are still waiting.']]}],
  clues:[
    {cat:'m',t:'Arrows from the side',b:'English archers have worked their way out beside the fight and are shooting into your schiltrons. Packed spearmen cannot shoot back.'},
    {cat:'e',card:'longbow1314'},
    {cat:'e',t:'Nobody guards them',b:'The English knights are jammed in the fight with your spears. Nobody is standing beside the archers.'},
    {cat:'tr',card:'keith1314'},
    {cat:'m',t:'Something fast',b:'Archers on foot, with no knights beside them, cannot stand a charge by horsemen. Your only horsemen are Keith\'s 500.'}],
  deduce:[['The archers are out on the side, alone.','Hit them where nothing protects them.'],
          ['Your spearmen are slow and locked in the fight.','Use something fast.'],
          ['Keith has your only horsemen.','Send Keith at the archers.']],
  /* The real battle. North is up. The English come up the road from the south; the Scots hold the wood west of the Carse. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={sc_moray:[196,140],sc_edw:[120,240],sc_doug:[96,170],sc_king:[104,262],sc_keith:[56,120],sc_bruce:[150,264],
           en_cav:[262,236],en_van:[150,330],en_arch:[240,380],en_inf:[200,386],en_edw:[290,386]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{sc_moray:[228,168],en_cav:[256,190],sc_doug:[170,150]},{a:[['g',196,140,226,166]],t:'Moray\'s stand',b:'Moray leads his schiltron out of the wood onto open ground, right across the riders\' path. The English horsemen charge the block of spears and cannot break it, and they are driven off with heavy losses. Douglas hurries to help, but sees he is not needed.',
      fire:[['en_cav','sc_moray','clash'],['sc_moray','en_cav','clash']]});
    add(0,{en_van:[150,296]},{a:[['t',150,330,150,300]],t:'Bruce and de Bohun',b:'On the road, the English vanguard reaches the wood. A young English knight, Henry de Bohun, sees the king and rides straight at him. Bruce kills him with a single blow of his axe, and the vanguard is beaten back.',
      fire:[['en_van','sc_bruce','clash'],['sc_bruce','en_van','clash']]});
    add(0,{sc_moray:[196,150],sc_doug:[100,170],en_van:[258,262],en_cav:[284,236],en_inf:[312,206],en_arch:[320,268],en_edw:[334,180]},{a:[['t',290,386,330,186]],t:'A night on the Carse',b:'In the night the English cross the Bannock Burn and camp on the Carse, a flat, wet strip between two streams. They stand in their armor all night. Sir Alexander Seton slips over from the English camp and tells you their spirits are low.'});
    add(1,{sc_edw:[214,268],sc_moray:[226,212],sc_doug:[214,166],sc_bruce:[176,236],sc_king:[170,250],sc_keith:[140,196]},{a:[['g',120,240,210,266],['g',196,150,222,210],['g',100,170,210,166]],t:'Out of the wood',b:'At sunrise your army marches out of the wood onto the open ground. The Scots kneel to pray. Edward II, watching, says they kneel to ask for mercy. One of his lords answers that they ask it of God, not of him.'});
    add(1,{en_van:[246,262,'ko']},{t:'Gloucester\'s charge',b:'Stung when the king calls him a coward, the Earl of Gloucester leads the vanguard straight at Edward Bruce\'s schiltron. He is surrounded and killed, one of the first English dead.',
      fire:[['en_van','sc_edw','clash'],['sc_edw','en_van','clash']]});
    add(1,{sc_moray:[244,226],sc_doug:[250,184],sc_edw:[242,258],en_cav:[268,214]},{t:'No room',b:'The schiltrons push on. The English knights, jammed together on the soft ground, have no room to build up speed and crash against the spears. Behind them, most of the English foot soldiers cannot even reach the fight.',
      fire:[['sc_moray','en_cav','clash'],['sc_doug','en_cav','clash'],['en_cav','sc_moray','clash']]});
    add(1,{en_arch:[282,316]},{a:[['t',320,268,284,312]],t:'Arrows from the side',b:'English archers work their way out to the side of the fight and start shooting into the schiltrons. Barbour, the Scottish poet who told the story, says that if their shooting had gone on, it would have gone hard for the Scots.',
      fire:[['en_arch','sc_edw','arrows'],['en_arch','sc_moray','arrows'],['sc_moray','en_cav','clash']]});
    add(2,{sc_keith:[290,326],en_arch:[312,352,'ko']},{a:[['g',140,196,286,322]],t:'Keith\'s charge',b:'Bruce sends Sir Robert Keith and his 500 horsemen at the archers. Barbour says they rode into their side and scattered them. Some historians think the story grew in the telling, but the arrows stop.',
      fire:[['sc_keith','en_arch','clash'],['sc_moray','en_cav','clash']]});
    add(2,{sc_king:[262,238],sc_bruce:[226,236]},{a:[['g',170,250,258,238]],t:'All in',b:'Bruce sends in his own division, his last reserve. The whole Scottish line presses forward, and the English are driven back onto the Bannock Burn.',
      fire:[['sc_king','en_cav','clash'],['sc_moray','en_cav','clash']]});
    add(2,{sc_edw:[270,282],en_cav:[286,262,'ko'],en_inf:[396,250,'exit'],en_edw:[396,120,'exit']},{t:'The rout',b:'The English army breaks. The Earl of Pembroke leads Edward II off the field. Stirling Castle will not let him in, so he rides for Dunbar and escapes by ship. Many of his men drown in the Bannock Burn and the Forth. Stirling Castle surrenders.',
      fire:[['sc_edw','en_cav','clash'],['sc_king','en_cav','clash']]});
    return S;
  })(),
  video:{id:'TlcZWz0qykQ',t:'Battle of Bannockburn, 1314 AD ⚔️ First War of Scottish Independence (Part 5)',ch:'HistoryMarche',v:2447596},
  sources:[['Wikipedia: Battle of Bannockburn','https://en.wikipedia.org/wiki/Battle_of_Bannockburn'],
           ['Historic Environment Scotland: Battle of Bannockburn (BTL4)','https://portal.historicenvironment.scot/designation/BTL4'],
           ['Battlefields Trust: Bannockburn report (Glenn Foard)','https://www.battlefieldstrust.com/media/672.pdf'],
           ['Wikipedia: Thomas Randolph, 1st Earl of Moray','https://en.wikipedia.org/wiki/Thomas_Randolph,_1st_Earl_of_Moray'],
           ['History Hit: facts about the Battle of Bannockburn','https://www.historyhit.com/facts-about-the-battle-of-bannockburn/']],
  cards:{sc_moray:'schiltron1314',sc_edw:'schiltron1314',sc_doug:'schiltron1314',sc_king:'schiltron1314',sc_keith:'keith1314',
         en_cav:'knight1314',en_van:'knight1314',en_arch:'longbow1314',en_inf:'footman1314'}
});
