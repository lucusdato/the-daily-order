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
  cards:{}
});
