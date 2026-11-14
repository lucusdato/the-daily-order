/* Mystery format: one defining move, five tries, Wordle-style feedback.
   Brief follows METT-T (Mission, Enemy, Terrain and weather, Troops, Time), the US Army and Marine Corps mission variables,
   with terrain read through OAKOC (Observation, Avenues of approach, Key terrain, Obstacles, Cover and concealment).
   sit: the trigger. mett: one line per variable. ground: OAKOC notes for the Terrain row [tag, text].
   clues: extra intel by METT-T row (cat m/e/t/tr/ti), the first shown at the start, one more after each miss. Misses 1 to 4 unlock clues 1 to 4, so put an enemy troop card at 1 and one of yours at 3; anything past index 4 is never shown.
   toys/zones/ans/near/start/fbU/fbZ: the puzzle. fail[zone]: what plays out ($ = the toy you placed).
   scenes: the real battle, play by play. s = state index, u = position overrides, fire = [from, to, kind?], ko = extra casualties.
   deduce: the commander's estimate, fact and so-what, shown in the debrief. cards: unit to troop card. */

PGD.mystery(1,{
  war:'American Revolution',
  pitch:'You are <b>Daniel Morgan</b>. A feared British cavalry commander attacks at dawn. Set the trap.',
  H:600,
  terrain(){
    let s=felt('#93a463',600);
    s+=river('M0 22 Q200 48 400 16',14);
    s+=`<path d="M300 600 Q330 520 360 470 Q380 440 400 430" fill="none" stroke="#6f9ab4" stroke-width="3" opacity=".6"/>`;
    s+=road('M120 600 Q178 410 200 214 Q212 100 232 0');
    s+=hill(232,104,70,34,4)+hill(200,212,86,40,4);
    s+=trees(101,40,[10,390,50,590],(x,y)=>(Math.abs(x-200)>95||y>470)&&!(y>380&&y<480&&Math.abs(x-200)<110),['#3b6b2b','#4b7a35','#557f3b']);
    s+=label(112,58,'Broad River, a few miles back',10)+label(312,226,'First rise',10)+label(336,130,'Second rise',10)+label(150,540,'Road from the south',10,-66);
    s+=compass(378,578);
    return s+end(600);
  },
  features:[
    {x:200,y:213,r:44,px:300,py:206,name:'The first rise',why:'A gentle slope across the road.'},
    {x:232,y:105,r:40,px:326,py:96,name:'The second rise',why:'A second low hill behind the first.'},
    {x:200,y:26,px:90,py:40,d:'M0 22 Q200 48 400 16',line:true,name:'The river behind you',why:'The Broad River, a few miles back.'},
    {x:200,y:375,r:80,px:150,py:450,name:'Open pasture',why:'Open, gently rolling ground with few obstacles.'}],
  qs:'Set the trap: which toy goes where?',
  lead:'The war in the South is going badly. The British have taken Charleston and crushed an American army at Camden. General Greene splits his small army and sends you west to rally the backcountry. The British send their most feared cavalry commander, Banastre Tarleton, to hunt you down.',
  sit:'January 1781. Tarleton\'s fast British force is a few hours behind you and will attack at dawn. How you set up tonight decides tomorrow.',
  mett:{
    m:'Defeat Tarleton\'s force, so the British cannot crush the American army in the South.',
    e:'About 1,100 British regulars and feared Legion dragoons. Fast, confident, tired from a night march.',
    t:'Open pasture with two low rises, cut by a road from the south.',
    tr:'About 1,000: steady Continental regulars, militia who shoot well but have no bayonets, a small cavalry force.',
    ti:'Tonight to set up. He attacks at first light.'},
  ground:[['Key terrain','The first rise, where a main line can stand.',[200,142,46]],['Avenue of approach','The road from the south, straight across open pasture.',[172,300,34]],['Obstacle','A river behind you. Nobody can run far.',[200,16,30]]],
  q:'Tarleton always charges. Which toy, placed where, turns that charge into a trap?',
  toys:[['a_militia','Militia'],['a_cont','Continentals'],['a_cav','Cavalry']],
  zones:[['skirm','Open pasture',196,262,26],['front','Before the first rise',204,188,22],['rise1','On the first rise',200,136,24],['rise2','Behind the second rise',272,40,22]],
  ans:{u:'a_militia',z:'front'},
  near:{u:[],z:['skirm','rise1']},
  start:{a_militia:[64,112],a_cont:[104,112],a_cav:[146,104],a_rifles:[146,262],a_morgan:[236,112]},
  fbU:{a_militia:'Right toy. Tarleton expects militia to run. Let them, on your schedule.',
       a_cont:'Not this toy. Your regulars are the anchor of the plan, not the bait.',
       a_cav:'Not this toy. Your few horsemen are the hammer, kept back for the right moment.'},
  fbZ:{front:'Right place. Close enough to fire, close enough to slip back behind your regulars.',
       skirm:'Too far out. On open pasture, dragoons can ride down a line before it gets back.',
       rise1:'Too far back. A line here takes the charge at full strength, with nothing out front to thin it.',
       rise2:'Out of sight and out of the fight. Nothing slows Tarleton before he reaches your main line.'},
  /* Every wrong combination has its own outcome. Toys you did not place wait in camp; the riflemen are already out front
     and, like all skirmishers, fall back before the enemy reaches them. idle: placed toys that are meant to do nothing. */
  fail:{
    'a_militia@skirm':{u:{t_drag:[168,272],t_inf:[196,320],a_rifles:[64,160]},a:[['t',130,360,168,280]],fire:[['t_drag','$','clash']],
      b:'Out in the open, the dragoons catch the militia before they can get back. After Camden, five months earlier, Tarleton\'s horsemen chased fleeing militia for 20 miles.'},
    'a_militia@rise1':{u:{t_inf:[200,170],a_rifles:[64,160]},a:[['t',190,370,200,178]],fire:[['t_inf','$','clash']],
      b:'Militia without bayonets now face the charge head on, in your main line. At Camden, militia in the main line ran before the bayonets reached them.'},
    'a_militia@rise2':{u:{t_inf:[196,150],t_71:[140,160],a_rifles:[64,160]},a:[['t',190,370,196,158],['t',250,386,142,168]],fire:[['t_inf','a_cav'],['t_71','a_cont']],ko:['a_cont'],idle:['$'],
      b:'Hidden behind the second rise, the militia never fire. Tarleton\'s line arrives fresh, takes the first rise and turns on your camp.'},
    'a_cont@skirm':{u:{t_drag:[160,282],t_71:[236,290],t_inf:[196,304],a_rifles:[64,160]},a:[['t',130,360,160,288],['t',250,386,236,296]],fire:[['t_inf','$'],['t_drag','$','clash'],['t_71','$','clash']],
      b:'Your best troops stand alone in open pasture. Dragoons ride round one end of the line, Highlanders the other, while the infantry closes in front.'},
    'a_cont@front':{u:{t_inf:[204,232],t_71:[160,204],a_rifles:[64,160]},a:[['t',190,370,204,238],['t',250,386,160,210]],fire:[['t_inf','$'],['t_71','$','clash']],
      b:'They can take a charge, but out here the Highlanders lap round their open flank, and there is no line behind them to fall back on.'},
    'a_cont@rise1':{u:{t_inf:[200,176],t_71:[146,150],a_rifles:[64,160]},a:[['t',190,370,200,182],['t',250,386,146,156]],fire:[['t_inf','$'],['t_71','$','clash']],
      b:'The right spot for your regulars, but alone it is an ordinary defence. Nothing out front thins or fools Tarleton, so his whole force arrives fresh and overlaps their flank.'},
    'a_cont@rise2':{u:{t_inf:[196,150],t_71:[140,160],a_rifles:[64,160]},a:[['t',190,370,196,158],['t',250,386,142,168]],fire:[['t_inf','a_cav'],['t_71','a_militia']],ko:['a_militia'],idle:['$'],
      b:'Hidden behind the second rise, your best troops never fire a shot. Tarleton takes the first rise unopposed and turns on the rest of your army.'},
    'a_cav@skirm':{u:{t_drag:[170,282],t_inf:[196,314],a_rifles:[64,160]},a:[['t',130,360,170,288]],fire:[['t_drag','$','clash']],
      b:'Your few horsemen are shown early against far more dragoons. They are driven off, and the surprise you were saving is gone.'},
    'a_cav@front':{u:{t_inf:[204,236],t_drag:[160,214],a_rifles:[64,160]},a:[['t',130,360,160,220]],fire:[['t_inf','$'],['t_drag','$','clash']],
      b:'Horsemen standing still cannot hold a line. Infantry volleys empty their saddles, the dragoons finish the job, and your surprise is gone.'},
    'a_cav@rise1':{u:{t_inf:[200,214],t_art:[186,262],a_rifles:[64,160]},a:[['t',190,370,200,220]],fire:[['t_art','$','cannon'],['t_inf','$']],
      b:'On the hilltop your horsemen are in plain view. The guns and infantry fire on them, and Tarleton now knows exactly where your reserve is.'},
    'a_cav@rise2':{u:{t_inf:[196,150],t_71:[140,160],a_rifles:[64,160]},a:[['t',190,370,196,158],['t',250,386,142,168]],fire:[['t_inf','a_cont'],['t_71','a_militia']],ko:['a_cont'],idle:['$'],
      b:'The right spot for the cavalry, but cavalry needs a moment to strike. With no lines out front, Tarleton\'s attack never breaks up, and that moment never comes.'}},
  /* Trial format, opened with #steps-1: the same battle as three decisions. Decision 1 is the puzzle above.
     Positions, like everything here, are written for the 400 board. Texts stay inside what the scenes and sources below say. */
  steps:[
    {after:[0,1,2,3],
     intel:[['Tarleton\'s habit','He has beaten militia again and again with one headlong bayonet charge.'],
            ['Your militia','They shoot well but have no bayonets, and Tarleton expects them to run.'],
            ['The ground','The low rise hides whatever stands behind it. A river behind you means nobody can run far.']]},
    {from:3, start:{a_militia:[258,164],a_rifles:[244,186],t_drag:[286,262],t_inf:[200,214]}, after:[4,5,6],
     qs:'Dragoons are on your militia: who stops them?',
     sit:'The militia have fired their two volleys and are streaming off round your left, as planned. Tarleton\'s dragoons gallop after them, sure this is the usual rout.',
     q:'The dragoons are about to ride down your militia. Which toy, sent where, stops them?',
     intel:[['What dragoons do to runaways','After Camden, five months earlier, Tarleton\'s horsemen chased fleeing militia for 20 miles.'],
            ['Your reserve','Washington\'s cavalry is still out of sight behind the second rise.'],
            ['The main line','The British infantry are still coming on toward your Continentals on the first rise.']],
     zones:[['chase','Into the dragoons',296,206,22],['hide','Stay hidden',290,40,22],['centre','At the infantry',200,208,22],['right','Right flank',96,124,22]],
     ans:{u:'a_cav',z:'chase'},
     fbU:{a_cav:'Right toy. Only horsemen are fast enough to catch horsemen.',
          a_cont:'Not this toy. Your regulars are about to receive the main British line. Move them and the first rise stands empty.',
          a_militia:'Not this toy. The militia have done their part and need time to re-form. Without bayonets they cannot face dragoons.'},
     fbZ:{chase:'Right place. The dragoons are strung out in pursuit, looking only at the men they are chasing.',
          hide:'Waiting here leaves the dragoons free to ride the militia down before they can re-form.',
          centre:'Wrong target. The infantry line is still in good order, and the dragoons are left free to ride the militia down.',
          right:'Wrong flank. The danger is on your left, where the militia are running.'},
     fail:{chase:{ko:[],fire:[['t_drag','$','clash']]},hide:{ko:[],idle:['$'],fire:[['t_drag','a_militia','clash']]},
           centre:{ko:[],fire:[['t_inf','$']]},right:{ko:[],idle:['$'],fire:[['t_drag','a_militia','clash']]}}},
    {from:6, after:[7,8],
     qs:'Your line is falling back: who turns it?',
     sit:'An order has been misheard and your whole Continental line is stepping back, in good order. The British break ranks and rush after it, sure they have won.',
     q:'The British think the battle is over. Which toy, sent where, turns it around?',
     intel:[['The enemy','They marched through the night and are out of breath, running forward out of formation.'],
            ['Your regulars','The Continentals are stepping back in good order, not running.'],
            ['Close by','The militia are re-forming behind the hill, and your cavalry is back from scattering the dragoons.']],
     zones:[['halt','Halt and face about',206,94,20],['back','Over the second rise',250,34,20],['charge','Bayonet charge',204,134,20],['wide','Round their flank',322,150,22]],
     ans:{u:'a_cont',z:'halt'},
     fbU:{a_cont:'Right toy. Your regulars are still in good order, and the British are rushing straight at them.',
          a_cav:'Not yet. The horsemen strike best once the British rush has been stopped. First something has to stop it.',
          a_militia:'Not this toy. The militia are still re-forming behind the hill and have no bayonets.'},
     fbZ:{halt:'Right place. The British are close, breathless and out of formation: one volley at this range stops them.',
          back:'Keep going and a step back becomes a real retreat, with a river behind you.',
          charge:'Too soon. A charge with no volley first throws away the one close-range shot that can stop them.',
          wide:'A wide move takes minutes you do not have. The British are yards behind your line.'},
     fail:{halt:{ko:[],fire:[['t_inf','$','clash']]},back:{ko:[],idle:['$'],fire:[['t_inf','a_cont']]},
           charge:{ko:[],fire:[['t_inf','$'],['t_71','$']]},wide:{ko:[],idle:['$'],fire:[['t_inf','a_cont']]}}}],
  clues:[
    {cat:'e',t:'Tarleton\'s habit',b:'He has beaten militia again and again with one headlong bayonet charge.'},
    {cat:'e',card:'legion1781'},
    {cat:'m',t:'Morgan\'s intent',b:'For the plan to work, Tarleton has to believe he is winning.'},
    {cat:'tr',card:'militia1781'},
    {cat:'tr',t:'Morgan\'s ask',b:'Morgan reportedly told the militia he needed only a couple of volleys from them.'},
    {cat:'t',t:'Cover and concealment',b:'The low rise hides whatever stands behind it from the British.'}],
  deduce:[['Tarleton always charges headlong.','Make his charge work for you: let him believe he is winning.'],
          ['Militia shoot well but break against bayonets.','Put them where shooting matters and running away is part of the plan.'],
          ['A river blocks any retreat.','Your men must fight here, and they know it. Morgan counted on that.']],
  /* The real battle. Every unit is placed in every scene so nothing drifts. North is up: the British come from the south,
     so the American right (and the British left) is the west side of the map. Checked against the sources below. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={a_rifles:[196,262],a_militia:[204,190],a_cont:[200,136],a_cav:[290,40],a_morgan:[238,108],
           t_inf:[190,370],t_71:[250,386],t_drag:[250,352],t_art:[170,380],t_tarleton:[222,392]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(1,{},{t:'The trap is set',b:'Three lines, about 150 yards apart: riflemen out front, militia behind them, Continentals on the first rise. Washington\'s cavalry waits behind the second rise.'});
    add(1,{t_drag:[226,290]},{a:[['t',250,352,228,296]],t:'Dragoons probe',b:'At dawn Tarleton sends dragoons at the riflemen. Aimed fire empties saddles and the horsemen pull back.',fire:[['a_rifles','t_drag']]});
    add(1,{t_drag:[276,336],t_inf:[196,300],t_art:[176,330],t_tarleton:[226,350],a_rifles:[176,196]},{a:[['t',190,370,196,306],['g',196,262,180,204]],t:'The line advances',b:'Drums beating, the British infantry come on at a trot, their two small guns firing. Their job done, the riflemen fall back to the militia.',fire:[['t_art','a_militia','cannon']]});
    add(2,{t_inf:[200,236]},{t:'Two volleys',b:'The militia fire two volleys, aiming at officers, exactly as Morgan asked. Gaps open in the British ranks.',fire:[['a_militia','t_inf'],['a_rifles','t_inf']]});
    add(2,{a_militia:[300,96],a_rifles:[286,122],t_drag:[298,176],a_cav:[292,148],t_inf:[200,200]},{a:[['gd',204,190,262,160,300,102],['t',276,336,296,184],['g',290,40,292,140]],t:'Bait and hammer',b:'The militia peel away around your left. Dragoons gallop after them, sure this is the usual rout, until Washington\'s cavalry charges out and scatters them.',fire:[['a_cav','t_drag','clash']]});
    add(2,{t_drag:[356,350],a_cav:[268,90],t_inf:[200,178],t_art:[186,206],t_71:[128,172]},{a:[['t',250,386,176,300,130,180]],t:'Highlanders on the flank',b:'Your Continentals and the British line trade volleys. Tarleton throws in his reserve, the 71st Highlanders, to wrap around your right.',fire:[['t_inf','a_cont'],['a_cont','t_inf']]});
    add(2,{a_cont:[206,92],a_morgan:[240,78],t_inf:[204,134],t_71:[150,124],a_militia:[214,34],a_rifles:[236,42]},{a:[['g',200,136,206,98],['t',200,178,204,140]],t:'A misheard order',b:'Howard tells one company to turn and face the Highlanders. The order is misheard and the whole line steps back in good order. The British rush after them, sure they have won. Behind the hill, the militia re-form.'});
    add(2,{},{t:'Turn and fire',b:'Morgan picks the spot. The Continentals face about and fire one volley at close range into the breathless British.',fire:[['a_cont','t_inf'],['a_cont','t_71']]});
    add(3,{a_cont:[198,174],a_cav:[240,186],a_militia:[110,110],a_rifles:[98,96],t_inf:[214,198,'ko'],t_71:[150,124,'ko'],t_art:[186,206,'ko'],t_drag:[380,396,'exit'],t_tarleton:[196,420,'exit']},
      {a:[['g',206,98,198,168],['g',268,90,268,150,244,180],['g',214,34,150,50,112,104]],t:'Caught on both sides',b:'The Continentals charge with the bayonet and take the guns. The militia reappear on your right and the cavalry hits the other flank. Most of the British surrender. Tarleton escapes with a handful of horsemen.',
       fire:[['a_cont','t_inf','clash'],['a_cav','t_inf','clash'],['a_militia','t_71'],['a_cont','t_art','clash']]});
    return S;
  })(),
  video:{id:'kP7Lmz9MdNE',t:'The Most Gangster General Of The American Revolution: Daniel Morgan',ch:'The Fat Electrician',v:3654211},
  sources:[['National Park Service: Battle of Cowpens','https://www.nps.gov/articles/000/battle-of-cowpens.htm'],
           ['National Park Service: Colonel Howard\'s misunderstood order','https://www.nps.gov/places/colonel-howard-s-misunderstood-order.htm'],
           ['Journal of the American Revolution: William Washington at Cowpens','https://allthingsliberty.com/2026/03/coup-doeil-william-washington-at-the-battle-of-cowpens/'],
           ['South Carolina Battleground Trust: Battle of Camden','https://scbattlegroundtrust.org/the-battle-of-camden']],
  cards:{a_militia:'militia1781',a_cont:'cont1781',a_cav:'drag1781',t_inf:'redcoat1781',t_drag:'legion1781'}
});

PGD.mystery(14,{
  war:'Second World War',
  pitch:'You are <b>Heinz Guderian</b>. Your tanks reached the Meuse days early. Get across before France is ready.',
  general:'Heinz Guderian',
  lead:'In 1940 the French expect the main German attack to come through Belgium, and send their best armies north to meet it. The thick Ardennes forest to the south, they believe, will hold any tanks for a week or more. Your panzers have come through it in under three days.',
  sit:'12 May 1940. Your tanks have reached the Meuse River at Sedan, far sooner than the French thought possible. You need to get across.',
  mett:{
    m:'Cross the Meuse at Sedan and break into open country, to cut off the Allied armies in Belgium.',
    e:'French reservists of the 55th Division in bunkers on the far bank. Stronger French reserves are moving up slowly.',
    t:'A river a few hundred feet wide, with bunkers covering it. Open, rolling country beyond.',
    tr:'Three panzer divisions, infantry with rubber assault boats, and a large air force on call.',
    ti:'Every day counts. Your heavy artillery is still stuck in traffic on the forest roads.'},
  ground:[['Obstacle','The Meuse itself, covered by bunkers on the far bank.',[172,200,40]],['Cover and concealment','The Ardennes forest behind you hides your columns.',[320,220,64]],['Avenue of approach','Past the river, open country runs all the way to the sea.',[76,190,56]]],
  q:'Which force, sent where, gets you across the Meuse first?',
  toys:[['de_stuka','Dive bombers'],['de_eng','Engineers'],['de_1pz','Panzers']],
  zones:[['sedan','River at Sedan',176,214,24],['north','Crossing to the north',182,72,24],['deep','French reserves',70,300,26],['wait','Wait in the forest',320,332,26]],
  ans:{u:'de_stuka',z:'sedan'},
  near:{u:['de_eng'],z:['north']},
  start:{de_stuka:[330,64],de_eng:[316,160],de_1pz:[306,236],de_2pz:[352,120],de_10pz:[352,296],de_cmd:[372,206]},
  fbU:{de_stuka:'Right toy. With your guns stuck in traffic, the bombers are the only heavy fire you have.',
       de_eng:'Close. Engineers do the crossing, but in open boats they need the far bank kept quiet first.',
       de_1pz:'Not this toy. Tanks cannot cross a river without a bridge.'},
  fbZ:{sedan:'Right place. You are already here, and the French do not expect a crossing this soon.',
       north:'Close, but shifting north costs a day on jammed forest roads, and the French reinforce.',
       deep:'Too deep. The bunkers on the river are untouched, so nobody gets across.',
       wait:'Waiting is what the French are counting on. Every day, more reserves reach the river.'},
  /* Toys you did not place wait on the east bank. */
  fail:{
    'de_eng@sedan':{fire:[['fr_bunk','$','cannon'],['fr_55','$']],
      b:'Without the bombing, every French gun is free to fire. Rubber boats on open water are shot to pieces before they reach the far bank.'},
    'de_1pz@sedan':{fire:[['fr_bunk','$','cannon'],['fr_55','$']],
      b:'Tanks cannot swim. With no bridge they sit on the open bank, in plain view of the guns across the river.'},
    'de_stuka@north':{fire:[['fr_bunk','de_eng','cannon']],ko:[],idle:['$'],
      b:'The bombs fall on a quiet stretch of river. At Sedan the bunkers are untouched, and the French gain a day.'},
    'de_eng@north':{u:{fr_res:[148,96]},a:[['t',60,300,110,200,148,104]],fire:[['fr_res','$','tank']],
      b:'Moving north costs a day on jammed forest roads. By the time the boats are ready, French reserves have reached the bank.'},
    'de_1pz@north':{u:{fr_res:[148,96]},a:[['t',60,300,110,200,148,104]],fire:[['fr_res','$','tank']],
      b:'A day lost on forest roads, and still no bridge. French reserves reach the river first.'},
    'de_stuka@deep':{fire:[['$','fr_res','bomb'],['fr_bunk','de_eng','cannon']],ko:['fr_res'],
      b:'The reserves far behind take a beating, but nobody is across the river. The bunkers on the bank are untouched.'},
    'de_eng@deep':{fire:[['fr_res','$','tank'],['fr_bunk','$','cannon']],
      b:'Nobody reaches the French rear while the bunkers on the river are untouched. The boats never get that far.'},
    'de_1pz@deep':{fire:[['fr_res','$','tank']],
      b:'Tanks cannot get behind the river without crossing it first. There is no bridge, and the French guns are waiting.'},
    'de_stuka@wait':{u:{fr_res:[128,236]},a:[['t',60,300,124,240]],ko:[],idle:['$'],
      b:'Holding the bombers back hands the French the days they expected to have. Their reserves reach the river.'},
    'de_eng@wait':{u:{fr_res:[128,236]},a:[['t',60,300,124,240]],ko:[],idle:['$'],
      b:'Waiting for your artillery gives the French the days they planned on. Their reserves reach the river, and the crossing gets much harder.'},
    'de_1pz@wait':{u:{fr_res:[128,236]},a:[['t',60,300,124,240]],ko:[],idle:['$'],
      b:'Tanks waiting in the forest do nothing for the crossing. The French use the time to bring their reserves up to the river.'}},
  clues:[
    {cat:'ti',t:'The clock',b:'French commanders believe you need days to prepare any river crossing.'},
    {cat:'e',card:'bunker1940'},
    {cat:'tr',t:'Air support',b:'The air force has promised massive support for this one crossing.'},
    {cat:'tr',card:'stuka1940'},
    {cat:'e',t:'Air defense',b:'The French have few anti-aircraft guns covering Sedan.'}],
  deduce:[['Your heavy artillery is days behind.','Waiting for it hands the French the days they need. Find something else to do its job.'],
          ['The French expect days of preparation.','Crossing tomorrow, right here, hits them before they are ready.'],
          ['The reservists have never faced air attack.','Massed bombing may break their nerve, not just their bunkers.']],
  /* The real battle. The river runs north to south; the Germans hold the east bank. Every unit is placed in every scene. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={de_1pz:[232,200],de_2pz:[244,110],de_10pz:[244,300],de_eng:[214,224],de_stuka:[330,64],de_cmd:[264,240],
           fr_55:[136,190],fr_bunk:[148,244],fr_res:[50,320],fr_north:[110,40],fr_cmd:[56,226]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'At the river, early',b:'12 May. Your tanks reach the Meuse at Sedan days before the French thought possible. Reservists of the 55th Division hold bunkers on the far bank. Your heavy artillery is still stuck in traffic in the forest.'});
    add(0,{de_stuka:[176,196]},{a:[['g',330,64,250,120,184,190]],t:'Bombers instead of guns',b:'13 May. From morning to late afternoon, wave after wave of bombers and dive bombers hits the far bank. The bombs destroy less than it seems, but the defenders keep their heads down and many of their guns fall silent.',fire:[['de_stuka','fr_bunk','bomb'],['de_stuka','fr_55','bomb']]});
    add(1,{de_stuka:[300,60],de_eng:[160,216],fr_bunk:[148,244,'ko']},{a:[['g',214,224,166,218]],t:'Across in rubber boats',b:'Around 4 p.m. infantry and assault engineers cross in rubber boats under fire and take the bunkers one by one. By night they hold the heights beyond the river.',fire:[['de_eng','fr_bunk'],['de_eng','fr_55']]});
    add(1,{fr_55:[40,160,'exit']},{t:'Panic behind the line',b:'That evening a false report of German tanks spreads behind the French line. Much of the 55th Division, its gunners included, abandons its positions.'});
    add(1,{de_1pz:[148,200],de_10pz:[168,290],de_cmd:[176,236]},{a:[['g',232,200,154,200],['g',244,300,174,290]],t:'A bridge by morning',b:'Engineers bridge the river overnight. Early on 14 May the first tanks roll across.'});
    add(2,{fr_res:[110,282,'ko']},{a:[['t',50,320,104,286]],t:'The counterattack comes late',b:'French reserves attack the bridgehead on 14 May, hours later than planned and in small groups. They are beaten one at a time.',fire:[['de_10pz','fr_res','tank'],['de_1pz','fr_res','tank']]});
    add(2,{de_1pz:[60,140],de_2pz:[50,100],de_cmd:[86,166],de_stuka:[120,60]},{a:[['g',148,200,90,170,64,146],['g',244,110,120,100,56,100]],t:'Turn west at once',b:'Guderian does not wait. He turns his tanks west on 14 May, and on 20 May they reach the Channel coast, cutting off the Allied armies in Belgium.'});
    add(3,{fr_north:[80,10,'exit']},{t:'The halt',b:'On 24 May a halt order stops the panzers short of Dunkirk. The delay helps more than 338,000 Allied troops escape by sea.'});
    return S;
  })(),
  video:{id:'PPBmoWBEJDE',t:'The Meuse Must Hold! Ten Days in Sedan, Day Four',ch:'World War Two (TimeGhost)',v:100986},
  sources:[['Wikipedia: Battle of Sedan (1940), drawing on Frieser','https://en.wikipedia.org/wiki/Battle_of_Sedan_(1940)'],
           ['WarHistory.org: Sedan, 13 May, the Germans cross the Meuse','https://warhistory.org/2015/11/26/sedan-13-may-the-germans-cross-the-meuse/'],
           ['Marine Corps Gazette: Guderian and synchronization','https://www.mca-marines.org/gazette/guderian-and-synchronization/'],
           ['WarHistory.org: Sedan, 14 and 15 May, the counterattack fails','https://warhistory.org/de/article/sedan-14-15-may-the-counter-attack-fails-the-tragic-fate-of-the-three-dcrs-part-ii?amp=0'],
           ['Imperial War Museums: why the Dunkirk evacuations were an unexpected success','https://www.iwm.org.uk/history/second-world-war/dunkirk/why-the-dunkirk-evacuations-were-an-unexpected-success']],
  cards:{de_1pz:'panzer1940',de_2pz:'panzer1940',de_10pz:'panzer1940',de_stuka:'stuka1940',de_eng:'pio1940',fr_55:'res1940',fr_bunk:'bunker1940'}
});

