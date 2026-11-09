/* The Daily Order: mystery battles, set 2. Same structure as mystery-01.js (Cowpens is the reference).
   Coordinates for units, zones and ground are written for a 400 by 400 board and stretched to H. */

/* ---------- Waterloo, 18 June 1815 ---------- */
PGD.mystery(28,{
  war:'Napoleonic Wars',
  general:'the Duke of Wellington',
  pitch:'You are the <b>Duke of Wellington</b>. Napoleon is coming straight at you. Hold until the Prussians arrive.',
  H:600,
  terrain(){
    let s=felt('#8fa064',600);
    s+=trees(1815,30,[0,400,4,64],(x,y)=>Math.abs(x-200)>14,['#2f5a24','#3b6b2b','#45763a']);
    s+=road('M200 0 L200 600')+road('M150 0 Q112 300 40 600');
    s+=hill(200,206,178,34,4);
    s+=`<rect x="58" y="272" width="46" height="34" fill="#d9c08f" stroke="#1c1a17" stroke-width="1.6"/>`+house(72,294)+house(90,292,'#8a3a2a');
    s+=trees(18,7,[44,124,312,350],()=>true,['#3b6b2b','#45763a']);
    s+=`<rect x="206" y="250" width="26" height="22" fill="#d9c08f" stroke="#1c1a17" stroke-width="1.4"/>`+house(219,266);
    s+=house(184,96)+house(216,100,'#8a3a2a')+house(200,114);
    s+=house(216,470,'#8a3a2a');
    s+=house(338,526)+house(356,534,'#8a3a2a');
    s+=trees(77,12,[250,390,300,440],()=>true,['#3b6b2b','#45763a']);
    s+=label(200,84,'Mont-Saint-Jean',10)+label(330,168,'The ridge',10)+label(82,326,'Hougoumont',10)+label(272,262,'La Haye Sainte',10);
    s+=label(216,494,'La Belle Alliance',10)+label(348,556,'Plancenoit',10)+label(300,22,'Forest of Soignes',10)+label(378,330,'Prussians coming',10,-90);
    s+=compass(30,572);
    return s+end(600);
  },
  lead:'Napoleon has escaped from exile and taken back France. To beat the allied armies before they can join up, he has marched into Belgium and beaten the Prussians at Ligny. Your army has fallen back to a ridge south of Brussels.',
  sit:'18 June 1815. Napoleon is coming straight at you with his whole army. Blücher\'s Prussians have promised to march to you, but they are hours away.',
  mett:{
    m:'Hold the ridge until the Prussians arrive, then beat Napoleon together.',
    e:'Napoleon\'s veteran army, a little larger than yours, with masses of artillery, heavy cavalry and the Imperial Guard.',
    t:'A low ridge running east to west across the road to Brussels, with two walled farms in front of it.',
    tr:'A mixed army of British, Dutch, Belgian and German troops, many of them inexperienced.',
    ti:'All day. The Prussians will not reach the field until the afternoon.'},
  ground:[['Key terrain','The ridge of Mont-Saint-Jean, across the road to Brussels.',[200,138,70]],
          ['Obstacle','The walled farms of Hougoumont and La Haye Sainte, in front of the ridge.',[150,186,70]],
          ['Avenue of approach','The road from the south, straight up to the center of the ridge.',[200,250,40]]],
  q:'Napoleon\'s guns will pound whatever they can see. Which toy, placed where, holds the ridge until the Prussians come?',
  qs:'Hold the ridge: which toy goes where?',
  toys:[['al_line','Infantry'],['al_houg','Guards'],['al_cav','Cavalry']],
  zones:[['fwd','Forward slope',150,168,22],['crest','Behind the crest',200,104,24],['houg','Hougoumont farm',82,193,22],['rear','Toward Brussels',200,40,22]],
  ans:{u:'al_line',z:'crest'},
  near:{u:['al_houg'],z:['fwd']},
  start:{al_line:[96,52],al_houg:[130,52],al_cav:[162,48],al_cmd:[236,78],al_lhs:[212,175],al_pruss:[396,120,'off'],
         fr_inf:[190,300],fr_cav:[120,320],fr_guard:[220,352],fr_art:[250,290],fr_cmd:[205,336]},
  fbU:{al_line:'Right toy. Your line infantry are the ones who have to hold the ridge.',
       al_houg:'Close. The Guards are infantry, but there are too few of them to hold a whole ridge.',
       al_cav:'Not this toy. Cavalry cannot hold ground. They strike once the enemy is tired.'},
  fbZ:{crest:'Right place. Behind the crest, the French guns cannot see your men.',
       fwd:'Close. Right ridge, wrong side. On the forward slope the French guns can see every man.',
       houg:'Not here. A few can hold a farm. Your army needs the ridge.',
       rear:'Too far back. Retreat any further and you lose touch with the Prussians.'},
  /* Toys you did not place wait by Mont-Saint-Jean. The King's German Legion already holds La Haye Sainte. */
  fail:{
    'al_line@fwd':{u:{fr_inf:[160,214]},a:[['t',190,300,162,220]],fire:[['fr_art','$','cannon'],['fr_inf','$']],
      b:'In full view on the forward slope, your line is torn apart by the French guns before their infantry even arrive.'},
    'al_line@houg':{u:{fr_inf:[150,80]},a:[['t',190,300,170,180,152,88]],fire:[['fr_inf','al_houg']],ko:['al_houg'],idle:['$'],
      b:'Your main line is packed into one farm, and the ridge stands empty. The French march past the walls and take it.'},
    'al_line@rear':{u:{fr_inf:[160,120]},a:[['t',190,300,162,128]],ko:[],idle:['$'],
      b:'Falling back toward Brussels breaks your link with the Prussians, which is exactly what Napoleon wants. He takes the ridge without a fight.'},
    'al_houg@fwd':{fire:[['fr_art','$','cannon']],
      b:'Even the Guards cannot stand in the open under massed guns. With no line behind the crest, nothing holds the ridge.'},
    'al_houg@crest':{u:{fr_inf:[120,120]},a:[['t',190,300,140,190,124,128]],fire:[['fr_inf','$']],
      b:'The right place to shelter a line, but the Guards alone are far too few to hold the whole ridge. The French go around them.'},
    'al_houg@houg':{u:{fr_inf:[150,80]},a:[['t',190,300,170,180,152,88]],fire:[['fr_inf','al_line']],ko:['al_line'],idle:['$'],
      b:'The farm holds, as it really did. But with no main line on the ridge, the French simply march past it.'},
    'al_houg@rear':{u:{fr_inf:[160,120]},a:[['t',190,300,162,128]],ko:[],idle:['$'],
      b:'Pulling the Guards back toward Brussels does nothing to hold the ridge. Napoleon takes it unopposed.'},
    'al_cav@fwd':{fire:[['fr_art','$','cannon']],
      b:'Horsemen standing still on the forward slope are a target for every French gun.'},
    'al_cav@crest':{u:{fr_inf:[150,130]},a:[['t',190,300,152,138]],fire:[['fr_inf','$']],
      b:'The right place for cavalry, and Wellington kept his there. But horsemen alone cannot hold a ridge. The French infantry climb it and stay.'},
    'al_cav@houg':{u:{fr_inf:[92,214]},a:[['t',190,300,96,220]],fire:[['fr_inf','$']],
      b:'Horsemen cannot defend a walled farm. The French take it, and the empty ridge behind it.'},
    'al_cav@rear':{u:{fr_inf:[160,120]},a:[['t',190,300,162,128]],ko:[],idle:['$'],
      b:'Your cavalry wait far behind while Napoleon walks onto the ridge.'}},
  clues:[
    {cat:'e',t:'Napoleon\'s guns',b:'Napoleon trusts massed artillery. He has gathered a great battery to smash any line he can see.'},
    {cat:'ti',t:'The ally',b:'Blücher has promised to march to you. You only need to hold until he arrives.'},
    {cat:'t',t:'Behind the ridge',b:'Behind the crest the ground drops away, out of sight from the south.'},
    {cat:'e',t:'Mud',b:'Heavy rain overnight has soaked the fields. The French will be slow to start.'},
    {cat:'tr',t:'Your army',b:'Many of your units are inexperienced. They will fight hard if they are not exposed to the full weight of the French guns.'},
    {cat:'m',t:'Wellington\'s habit',b:'In Spain, Wellington often kept his infantry out of sight until the enemy came close.'}],
  deduce:[['Napoleon\'s great battery smashes any line it can see.','Keep your line out of its sight, behind the crest.'],
          ['Many of your troops are inexperienced.','Shelter them, and they will hold.'],
          ['The Prussians are coming.','You do not need to win alone. You need to last until the afternoon.']],
  /* The real battle. North is up: the allies face south, so their right (Hougoumont) is the west. The Prussians come from the east. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={al_line:[200,104],al_houg:[82,193],al_lhs:[212,175],al_cav:[250,80],al_cmd:[236,96],al_pruss:[396,120,'off'],
           fr_inf:[190,300],fr_cav:[120,320],fr_guard:[220,352],fr_art:[250,290],fr_cmd:[205,336]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'On the ridge',b:'18 June 1815. Wellington lines the ridge of Mont-Saint-Jean. Most of his infantry wait behind the crest, out of sight of the French guns. Garrisons hold the farms of Hougoumont and La Haye Sainte in front.'});
    add(0,{fr_inf:[118,234]},{a:[['t',190,300,124,240]],t:'Hougoumont',b:'Rain has soaked the ground, so Napoleon waits until late morning. His first attack hits Hougoumont. The farm holds all day and draws in thousands of French troops.',fire:[['fr_inf','al_houg'],['al_houg','fr_inf']]});
    add(0,{},{t:'The great battery',b:'French guns pound the ridge. Most of Wellington\'s men are behind the crest and lying down, so many shots fly over them.',fire:[['fr_art','al_line','cannon']]});
    add(1,{fr_inf:[176,150],al_cav:[196,160]},{a:[['t',118,234,150,190,174,156],['g',250,80,200,154]],t:'The first big attack',b:'Early in the afternoon a whole French infantry corps climbs the slope. Wellington\'s infantry fire, and the British heavy cavalry charge into the columns.',fire:[['al_line','fr_inf'],['al_cav','fr_inf','clash']]});
    add(1,{fr_inf:[150,262],al_cav:[244,262],fr_cav:[216,252]},{a:[['g',196,160,240,256],['t',120,320,212,258]],t:'Too far',b:'The cavalry scatter the French infantry but ride on into the French guns. French cavalry counterattack, and the British horsemen pay heavily.',fire:[['al_cav','fr_art','clash'],['fr_cav','al_cav','clash']]});
    add(1,{al_cav:[256,84],fr_cav:[130,120]},{a:[['t',216,252,160,180,134,128]],t:'Cavalry against squares',b:'Around 4 p.m. Marshal Ney sends wave after wave of French cavalry up the slope. The infantry form squares, and the horsemen cannot break them.',fire:[['al_line','fr_cav']]});
    add(1,{al_pruss:[330,320],fr_guard:[270,345]},{a:[['g',396,140,370,240,334,312]],t:'The Prussians arrive',b:'Blücher\'s Prussians reach the field from the east and attack the French right at Plancenoit. Napoleon has to send part of his Imperial Guard to hold them.',fire:[['al_pruss','fr_guard']]});
    add(2,{fr_cav:[140,280],fr_inf:[204,196],al_lhs:[212,175,'ko']},{a:[['t',150,262,200,202]],t:'La Haye Sainte falls',b:'Around 6 p.m. the German defenders of La Haye Sainte run out of ammunition and the farm falls. Wellington\'s center is in danger.',fire:[['fr_inf','al_lhs']]});
    add(2,{fr_guard:[190,120,'ko']},{a:[['t',270,345,220,240,194,128]],t:'The Guard attacks',b:'At about 7 p.m. Napoleon sends the Imperial Guard up the ridge. British Guards lying behind the crest rise and fire at close range. For the first time, the Guard falls back.',fire:[['al_line','fr_guard']]});
    add(2,{al_line:[196,168],al_cav:[228,200],al_pruss:[292,300],fr_inf:[204,196,'ko'],fr_art:[250,290,'ko'],fr_cav:[120,396,'exit'],fr_cmd:[204,400,'exit']},
      {a:[['g',200,104,196,162],['g',256,84,230,194],['g',330,320,296,302]],t:'The army breaks',b:'As the Guard falls back, the whole French army loses heart. Wellington orders a general advance, the Prussians break through, and Napoleon\'s army flees.',
       fire:[['al_line','fr_inf','clash'],['al_cav','fr_inf','clash'],['al_pruss','fr_art','clash']]});
    return S;
  })(),
  sources:[['Britannica: Battle of Waterloo, the first hours of battle','https://www.britannica.com/event/Battle-of-Waterloo/The-first-hours-of-battle'],
           ['National Army Museum: Battle of Waterloo','https://www.nam.ac.uk/explore/battle-waterloo'],
           ['King\'s College London: the battle of Waterloo','https://kingscollections.org/exhibitions/archives/wellington/military/waterloo-battle'],
           ['History UK: reverse slope and the Guard','https://www.history.co.uk/history-of-the-battle-of-waterloo/waterloo']],
  cards:{al_line:'redcoat1815',al_houg:'guards1815',al_cav:'heavycav1815',al_pruss:'prussian1815',fr_inf:'ligne1815',fr_cav:'cuirass1815',fr_guard:'garde1815',fr_art:'gun1815'}
});

/* ---------- Hastings, 14 October 1066 ---------- */
PGD.mystery(4,{
  war:'Norman Conquest',
  general:'William of Normandy',
  pitch:'You are <b>William of Normandy</b>. Harold\'s shield wall holds the hill. Get the English off it.',
  H:600,
  terrain(){
    let s=felt('#8fa064',600);
    s+=trees(1066,26,[0,400,4,70],(x,y)=>Math.abs(x-200)>14,['#2f5a24','#3b6b2b','#45763a']);
    s+=road('M200 0 L200 120');
    s+=hill(200,190,150,60,4);
    const marsh=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#7dbba2" stroke="#1c1a17" stroke-width="1.6"/>`+[0,1,2,3,4].map(k=>{const x=cx-rx*.6+k*rx*.3, y=cy-ry*.2+((k%2)?6:-4);return `<path d="M${x} ${y} l-2 -8 M${x} ${y} l0 -10 M${x} ${y} l2 -8" stroke="#2f5a24" stroke-width="1.4" stroke-linecap="round"/>`;}).join('');
    s+=marsh(46,280,42,34)+marsh(356,282,40,32);
    s+=trees(9,12,[20,380,330,560],(x,y)=>Math.abs(x-200)>60,['#3b6b2b','#45763a']);
    s+=label(200,98,'Road to London',10)+label(318,124,'Senlac Hill',11)+label(46,326,'Marsh',10)+label(356,326,'Marsh',10)+label(200,582,'Toward Hastings and the Norman camp',10);
    s+=compass(372,560);
    return s+end(600);
  },
  lead:'King Edward has died without an heir, and three men claim the English crown. Harold Godwinson has taken it, and has just crushed a Norwegian invasion in the north. Now you, Duke William of Normandy, have landed in the south.',
  sit:'14 October 1066. Harold has raced south, and his army blocks the road to London from the top of a hill. You have to attack uphill.',
  mett:{
    m:'Break Harold\'s army and open the road to London.',
    e:'Around 7,000 English packed into a shield wall on the hilltop, with axes and spears but very few archers.',
    t:'A hill with a steep front and marshy ground on its flanks. Open, flatter ground at the bottom.',
    tr:'Archers, armoured foot soldiers and mounted knights from Normandy, Brittany and Flanders.',
    ti:'One October day. The English must break before dark.'},
  ground:[['Key terrain','The top of Senlac Hill, where Harold\'s shield wall stands.',[200,128,70]],
          ['Obstacle','Marshy ground on both flanks of the hill.',[46,186,40]],
          ['Avenue of approach','The open slope up the front of the hill.',[200,214,46]]],
  q:'The shield wall cannot be broken head on. Which toy, sent where, gets the English off their hill?',
  qs:'Break the wall: which toy goes where?',
  toys:[['n_cav','Knights'],['n_arch','Archers'],['n_inf','Foot soldiers']],
  zones:[['top','Top of the hill',200,152,22],['slope','Fall back down the slope',150,230,24],['marsh','Around the marshy flank',40,170,22],['wait','Stay out of reach',300,320,22]],
  ans:{u:'n_cav',z:'slope'},
  near:{u:['n_inf'],z:['top']},
  start:{n_arch:[200,270],n_inf:[200,296],n_cav:[200,330],n_bret:[110,300],n_fr:[290,300],n_will:[240,345],
         e_wall:[200,130],e_wall_l:[120,136],e_wall_r:[280,136],e_fyrd:[150,110],e_harold:[206,100]},
  fbU:{n_cav:'Right toy. Only horsemen are fast enough to run, turn and strike before the English get back to their wall.',
       n_inf:'Close. Foot soldiers could pretend to run, but they are too slow to turn and catch anyone.',
       n_arch:'Not this toy. Arrows mostly stick in the shields. They cannot draw anyone off the hill.'},
  fbZ:{slope:'Right place. Make them think you are beaten, and they will come down after you.',
       top:'Close. The fight is for the hilltop, but you cannot take it head on. Draw them off it first.',
       marsh:'Not here. The marshy flanks swallow horses and men.',
       wait:'Waiting gets you nothing. At dusk the English still hold the hill.'},
  /* Toys you did not place stay where they were drawn up at the bottom of the hill. */
  fail:{
    'n_cav@top':{fire:[['e_wall','$','clash']],
      b:'Horses charging uphill into locked shields and axes. The wall holds, and your best knights fall.'},
    'n_cav@marsh':{ko:[],idle:['$'],
      b:'Heavy horses sink into the marsh on the flank. The English on the ridge are never touched.'},
    'n_cav@wait':{ko:[],idle:['$'],
      b:'Your knights wait out of reach while the shield wall stands untouched. Daylight runs out with Harold still on the hill.'},
    'n_arch@top':{fire:[['e_wall','$','clash']],
      b:'Archers crowding the top of the slope are right under the English axes. They are cut down before they can shoot.'},
    'n_arch@slope':{fire:[['$','e_wall','arrows']],ko:[],
      b:'Your archers shoot from the bottom of the slope, but most arrows stick in the shields. Nothing draws the English off the hill.'},
    'n_arch@marsh':{fire:[['$','e_wall_l','arrows']],ko:[],
      b:'From the marsh the angle is poor, and the arrows hit shields. The wall holds.'},
    'n_arch@wait':{ko:[],idle:['$'],
      b:'Kept back out of range, your archers never come into play. The English hold the hill until dark.'},
    'n_inf@top':{fire:[['e_wall','$','clash']],
      b:'Foot soldiers charging uphill meet the axes head on. The wall holds, and your infantry fall back bloodied.'},
    'n_inf@slope':{u:{e_fyrd:[150,206]},a:[['t',150,110,150,198]],fire:[['e_fyrd','$','clash']],
      b:'The English do come down after them, but men on foot are too slow to turn the tables. Without fast horsemen, the trap never closes.'},
    'n_inf@marsh':{fire:[['e_wall_l','$','arrows']],
      b:'Wading through the marsh, your foot soldiers reach the hill slow and tired, under a rain of thrown spears and stones.'},
    'n_inf@wait':{ko:[],idle:['$'],
      b:'Holding your infantry back changes nothing. The English still hold the hill at dusk.'}},
  clues:[
    {cat:'e',t:'The shield wall',b:'The English stand shoulder to shoulder, shields overlapping. Uphill attacks have broken on walls like this before.'},
    {cat:'tr',t:'Your horsemen',b:'Your knights are fast and can wheel around quickly. The English have almost no cavalry.'},
    {cat:'e',t:'The fyrd',b:'Many English are part-time levies. Brave, but if they see an enemy running, they may chase it.'},
    {cat:'t',t:'Below the hill',b:'At the bottom of the slope the ground is open and fairly flat. Good ground for horses.'},
    {cat:'ti',t:'Daylight',b:'October days are short. If the English still hold the hill at dusk, they win.'},
    {cat:'m',t:'An old trick',b:'Norman horsemen have used a pretended flight to break an enemy line before.'}],
  deduce:[['The shield wall cannot be broken head on.','Get the English to break it themselves.'],
          ['Some English chase anyone who runs.','Give them something to chase.'],
          ['Your knights can turn fast, and the English have no horsemen.','Lead them onto open ground, then turn and strike.']],
  /* The real battle. North is up: the English face south, so their right (where the Bretons attacked) is the west. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={n_arch:[200,270],n_inf:[200,296],n_cav:[200,330],n_bret:[110,300],n_fr:[290,300],n_will:[240,345],
           e_wall:[200,130],e_wall_l:[120,136],e_wall_r:[280,136],e_fyrd:[150,110],e_harold:[206,100]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Two armies',b:'14 October 1066. Harold\'s army stands shoulder to shoulder along the top of Senlac Hill, shields locked in a wall. William\'s army waits below: archers in front, then foot soldiers, then knights.'});
    add(0,{n_arch:[200,200]},{a:[['g',200,270,200,206]],t:'Arrows',b:'The archers move up and shoot. Firing uphill, most arrows stick in the shields.',fire:[['n_arch','e_wall','arrows']]});
    add(1,{n_arch:[200,250],n_inf:[200,160],n_cav:[256,160],n_bret:[120,170]},{a:[['g',200,296,200,166],['g',200,330,252,166],['g',110,300,120,176]],t:'Up the hill',b:'Foot soldiers, then knights, charge up the slope. The shield wall and the English axes throw them back.',
      fire:[['n_inf','e_wall','clash'],['e_wall','n_inf','clash'],['n_cav','e_wall_r','clash'],['n_bret','e_wall_l','clash']]});
    add(1,{n_bret:[100,320],e_fyrd:[110,250]},{a:[['gd',120,170,104,312],['t',150,110,112,242]],t:'The Bretons run',b:'On the left, the Bretons break and run. Part of the English army charges down the hill after them.'});
    add(1,{n_cav:[130,240],n_bret:[110,280],n_will:[150,300],e_fyrd:[110,250,'ko']},{a:[['g',256,160,136,236]],t:'William is alive',b:'William lifts his helmet to show his men he is alive. His knights turn on the English who left the hill, and catch them on open ground.',fire:[['n_cav','e_fyrd','clash'],['n_bret','e_fyrd','clash']]});
    add(1,{n_fr:[300,340],n_cav:[250,300],e_wall_r:[290,240]},{a:[['gd',290,300,300,334],['t',280,136,288,232]],t:'Run, and run again',b:'Twice more, Norman horsemen pretend to flee. Each time, some of the English leave the wall to chase them.'});
    add(1,{n_cav:[270,250],n_fr:[310,262],e_wall_r:[290,240,'ko']},{t:'Turn and strike',b:'The horsemen wheel round on the men who followed them down the slope. Each time, the shield wall on the hill grows thinner.',fire:[['n_cav','e_wall_r','clash'],['n_fr','e_wall_r','clash']]});
    add(2,{n_arch:[200,210]},{a:[['g',200,250,200,216]],t:'Arrows again',b:'As evening comes, the archers shoot into the thinned English line. Harold is killed late in the day. The Bayeux Tapestry suggests an arrow played a part.',fire:[['n_arch','e_wall','arrows'],['n_arch','e_harold','arrows']]});
    add(2,{n_cav:[190,150],n_inf:[140,160],e_wall:[200,130,'ko'],e_wall_l:[120,136,'ko'],e_harold:[206,100,'ko']},{a:[['g',270,250,194,156],['g',200,160,146,160]],t:'The wall breaks',b:'Exhausted and thinned, the shield wall finally breaks. Harold and his brothers fall, and the rest of his army flees as night comes.',
      fire:[['n_cav','e_wall','clash'],['n_inf','e_wall_l','clash'],['n_arch','e_harold','arrows']]});
    return S;
  })(),
  sources:[['English Heritage: the battle of Hastings, sequencing (teaching resource)','https://www.english-heritage.org.uk/siteassets/home/learn/teaching-resources/1066_rebrand_sequencing_a4_final.pdf'],
           ['English Heritage: get ready for the battle of Hastings','https://www.english-heritage.org.uk/members-area/members-magazine/october-2018-get-ready-for-the-battle-of-hastings/'],
           ['myArmoury: the battle of Hastings','https://myarmoury.com/feature_battle_hastings.php'],
           ['History Skills: why William won at Hastings','https://www.historyskills.com/classroom/ancient-history/battle-of-hastings/']],
  cards:{n_cav:'knight1066',n_bret:'knight1066',n_fr:'knight1066',n_arch:'archer1066',n_inf:'normfoot1066',e_wall:'housecarl1066',e_wall_l:'housecarl1066',e_wall_r:'housecarl1066',e_fyrd:'fyrd1066'}
});

/* ---------- The Nile, 1 August 1798 ---------- */
PGD.mystery(17,{
  war:'French Revolutionary Wars',
  general:'Horatio Nelson',
  pitch:'You are <b>Horatio Nelson</b>. The French fleet lies at anchor, and the sun is setting.',
  H:600,
  terrain(){
    let s=seaBg(600);
    s+=land('M0 600 V430 Q22 400 28 350 Q30 300 0 262 Z','#e3cf94');
    s+=land('M0 600 H400 V572 Q330 548 250 566 Q170 584 100 560 Q50 548 0 560 Z','#e3cf94');
    s+=`<path d="M14 140 Q22 200 34 240 Q120 360 214 482 Q240 520 252 576" fill="none" stroke="#bfe6ee" stroke-width="30" opacity=".8" stroke-linecap="round"/>`;
    s+=`<path d="M14 140 Q22 200 34 240 Q120 360 214 482 Q240 520 252 576" fill="none" stroke="#1c1a17" stroke-width="1.4" stroke-dasharray="3 6" opacity=".5"/>`;
    s+=`<ellipse cx="64" cy="86" rx="22" ry="14" fill="#e3cf94" stroke="#1c1a17" stroke-width="1.8"/>`;
    s+=`<path d="M330 30 L292 80" stroke="#1c1a17" stroke-width="2.2" stroke-dasharray="5 4" marker-end="url(#mk)" opacity=".75"/>`;
    s+=label(64,112,'Aboukir Island',10)+label(150,416,'Shoals',10,52)+label(14,470,'Egyptian coast',10,-80)+label(340,26,'Wind',10)+label(330,520,'Aboukir Bay',11);
    s+=compass(372,470);
    return s+end(600);
  },
  lead:'Napoleon has carried an army to Egypt and left his fleet waiting off the coast. For weeks you have hunted that fleet across the Mediterranean. Late on 1 August your lookouts finally spot it.',
  sit:'1 August 1798. Thirteen French battleships lie anchored in a line in Aboukir Bay. The sun is setting, and you have no proper chart of the bay.',
  mett:{
    m:'Destroy the French fleet, and cut Napoleon\'s army in Egypt off from France.',
    e:'13 battleships anchored in one line along the shoals, including the huge 120-gun flagship L\'Orient. Many of their sailors are ashore.',
    t:'A shallow bay. The French line sits along the edge of the shoals, with an island at its head.',
    tr:'13 battleships, most with 74 guns, under captains who know how you think and will act on their own.',
    ti:'Less than an hour of daylight. Waiting means giving the French all night to get ready.'},
  ground:[['Obstacle','The shoals along the shore side of the French line.',[100,160,40]],
          ['Key terrain','The head of the French line, nearest the island.',[100,120,40]],
          ['Avenue of approach','Open water along the sea side of the line.',[210,150,50]]],
  q:'Which ships go where to open the attack?',
  qs:'Open the attack: which ships go where?',
  toys:[['gb_goliath','Your lead ships'],['gb_outside','Your main squadron']],
  zones:[['inside','Shore side of the French van',64,152,20],['outside','Sea side of the French van',160,108,22],['flag','Beside L\'Orient',272,212,22],['rear','The French rear',330,282,22],['wait','Hold outside the bay till dawn',356,140,22]],
  ans:{u:'gb_goliath',z:'inside'},
  near:{u:['gb_outside'],z:['outside']},
  start:{gb_goliath:[300,40],gb_inside:[326,58],gb_outside:[352,78],gb_nelson:[376,100],
         fr_fort:[64,58],fr_van:[110,130],fr_center:[170,190],fr_brueys:[192,232],fr_orient:[220,236],fr_rear:[282,292]},
  fbU:{gb_goliath:'Right toy. Your leading captain has spotted the gap. The lead ships find the way and the rest follow.',
       gb_outside:'Close. They follow, but someone has to find the way first, and the main squadron is needed on the sea side.'},
  fbZ:{inside:'Right place. The French guns facing the shore are not even ready to fire.',
       outside:'Close. A fair fight ship for ship, and every French gun facing the sea is ready.',
       flag:'L\'Orient and her 120 guns are the strongest point in the French line.',
       rear:'The wind blows down the French line. Attack the rear and the van can drift down to help.',
       wait:'By dawn the French crews are back aboard and every gun is ready. The surprise is gone.'},
  /* Ships you did not place hold back at the mouth of the bay. */
  fail:{
    'gb_goliath@outside':{fire:[['fr_van','$','broadside'],['$','fr_van','broadside']],
      b:'Your lead ships anchor on the sea side, ship for ship. Every French gun facing the sea is loaded and ready. It turns into a slugging match.'},
    'gb_goliath@flag':{fire:[['fr_orient','$','broadside'],['fr_center','$','broadside']],ko:['$'],
      b:'Your lead ships sail alone into L\'Orient\'s 120 guns, with her neighbours firing too. They are battered before help arrives.'},
    'gb_goliath@rear':{u:{fr_van:[300,236]},a:[['t',110,130,190,140,270,190,300,228]],fire:[['fr_rear','$','broadside'],['fr_van','$','broadside']],
      b:'You hit the back of the line. With the wind behind them, ships from the French van drift down to help, and your lead ships face two at once.'},
    'gb_goliath@wait':{ko:[],idle:['$'],
      b:'Your lead ships wait for daylight. Overnight the French sailors come back aboard and clear every gun. The surprise is gone.'},
    'gb_outside@inside':{fire:[['$','fr_van','broadside'],['fr_fort','$','cannon']],
      b:'Your heavy ships crowd round the head of the line with nobody to find the channel, under fire from the island. And with no one on the sea side, the French van only has one side to defend.'},
    'gb_outside@outside':{fire:[['fr_van','$','broadside'],['$','fr_van','broadside']],
      b:'Your main squadron anchors on the sea side, ship for ship. The French guns facing the sea are ready, and neither side gives way.'},
    'gb_outside@flag':{fire:[['fr_orient','$','broadside'],['$','fr_orient','broadside']],
      b:'You strike the French where they are strongest. L\'Orient\'s 120 guns pound your ships while the French van is left untouched.'},
    'gb_outside@rear':{u:{fr_van:[300,236]},a:[['t',110,130,190,140,270,190,300,228]],fire:[['fr_rear','$','broadside'],['fr_van','$','broadside']],
      b:'You hit the back of the line. With the wind behind them, the French van drifts down to help, and now you face their whole fleet.'},
    'gb_outside@wait':{ko:[],idle:['$'],
      b:'Your squadron waits for dawn. The French get all night to recall their crews and ready their guns.'}},
  clues:[
    {cat:'ti',t:'Ashore',b:'Many French sailors are on land, fetching water and food.'},
    {cat:'e',t:'Which guns are ready',b:'The French expect any attack from the open sea. The guns facing the shore are cluttered and not ready to fire.'},
    {cat:'t',t:'Room to swing',b:'Captain Foley sees the first French ship is anchored with room to swing on its cable. Where a ship can swing, another can sail.'},
    {cat:'t',t:'Wind',b:'The wind blows down the French line, from its head toward its rear. The rear cannot easily sail up to help.'},
    {cat:'tr',card:'sol74_1798'},
    {cat:'e',card:'orient1798'}],
  deduce:[['Only the French guns facing the sea are ready.','The shore side is the open door, if a ship can get there.'],
          ['The first French ship has room to swing.','There is water between it and the shoals. A good captain can lead the way.'],
          ['The wind blows down their line.','Hit the head of the line. The rear cannot come up to help.']],
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={gb_goliath:[300,40],gb_inside:[326,58],gb_outside:[352,78],gb_nelson:[376,100],
           fr_fort:[64,58],fr_van:[110,130],fr_center:[170,190],fr_brueys:[192,232],fr_orient:[220,236],fr_rear:[282,292]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Found at sunset',b:'Thirteen French battleships lie anchored in a line along the shoals. Many of their sailors are ashore. Nelson signals to attack at once.'});
    add(1,{gb_goliath:[120,52],gb_inside:[170,60],gb_outside:[230,70],gb_nelson:[270,84]},{a:[['g',300,40,120,52],['g',326,58,170,60],['g',352,78,230,70],['g',376,100,270,84]],
      t:'Straight in',b:'Night is falling, but the British sail straight into the bay. HMS Goliath, under Captain Foley, is in the lead.'});
    add(1,{gb_goliath:[56,104],gb_inside:[110,58]},{a:[['g',120,52,56,104],['g',170,60,110,58]],
      t:'Round the head of the line',b:'Foley sees there is water between the first French ship and the shoals. Goliath crosses the bow of the French van, firing as she goes, and turns toward the shore side.',
      fire:[['gb_goliath','fr_van','broadside']]});
    add(1,{gb_goliath:[104,198],gb_inside:[60,143]},{a:[['g',56,104,104,198],['g',110,58,60,143]],
      t:'Inside the line',b:'Goliath and four more ships anchor between the French and the shore. The French guns on that side are not even ready to fire.',
      fire:[['gb_goliath','fr_center','broadside'],['gb_inside','fr_van','broadside']]});
    add(1,{gb_outside:[166,104],gb_nelson:[214,164]},{a:[['g',230,70,166,104],['g',270,84,214,164]],
      t:'Caught between two fires',b:'Nelson\'s Vanguard and the ships behind her anchor on the sea side. The leading French ships are hit from both sides at once.',
      fire:[['gb_outside','fr_van','broadside'],['gb_inside','fr_van','broadside'],['gb_nelson','fr_center','broadside']],ko:['fr_van']});
    add(2,{fr_van:[110,130,'ko'],gb_outside:[272,206]},{a:[['g',166,104,240,150,272,206]],
      t:'Down the line',b:'The British work down the French line one ship at a time. On L\'Orient\'s deck, Admiral Brueys is killed by a cannonball. Nelson is wounded in the head but survives.',
      fire:[['gb_goliath','fr_center','broadside'],['gb_nelson','fr_center','broadside'],['gb_outside','fr_brueys','broadside']],ko:['fr_center','fr_brueys']});
    add(2,{fr_center:[170,190,'ko'],fr_brueys:[192,232,'ko']},{
      t:'L\'Orient explodes',b:'L\'Orient catches fire. Around 10 p.m. the flames reach her gunpowder and she blows up, lighting the whole bay.',
      fire:[['gb_outside','fr_orient','broadside']],ko:['fr_orient']});
    add(2,{fr_orient:[220,236,'ko'],fr_rear:[392,360,'exit']},{a:[['td',282,292,340,330,388,356]],
      t:'Dawn',b:'By morning, 11 of the 13 French battleships are taken or destroyed. Two at the rear of the line slip away. Napoleon\'s army is cut off in Egypt.'});
    return S;
  })(),
  sources:[['History Skills: why the French fleet was destroyed at the Nile','https://www.historyskills.com/classroom/modern-history/battle-of-the-nile/'],
           ['The Past: Nelson\'s other great victory, Aboukir Bay','https://the-past.com/?p=50521'],
           ['History Today: the battle of the Nile','https://www.historytoday.com/archive/battle-nile'],
           ['Wikipedia: Battle of the Nile order of battle','https://en.wikipedia.org/wiki/Battle_of_the_Nile_order_of_battle']],
  cards:{gb_goliath:'sol74_1798',gb_inside:'sol74_1798',gb_outside:'sol74_1798',fr_van:'sol74_1798',fr_center:'sol74_1798',fr_rear:'sol74_1798',fr_orient:'orient1798',fr_fort:'battery1798'}
});
