/* Mystery format: one defining move, five tries, Wordle-style feedback.
   Brief follows METT-T (Mission, Enemy, Terrain and weather, Troops, Time), the US Army and Marine Corps mission variables,
   with terrain read through OAKOC (Observation, Avenues of approach, Key terrain, Obstacles, Cover and concealment).
   sit: the trigger. mett: one line per variable. ground: OAKOC notes for the Terrain row [tag, text].
   clues: extra intel by METT-T row (cat m/e/t/tr/ti), two shown at the start, one more after each miss.
   toys/zones/ans/near/start/fbU/fbZ: the puzzle. fail[zone]: what plays out ($ = the toy you placed).
   scenes: the real battle, play by play. s = state index, u = position overrides, fire = [from, to, kind?], ko = extra casualties.
   deduce: the commander's estimate, fact and so-what, shown in the debrief. cards: unit to troop card. */

PGD.mystery(1,{
  H:600,
  terrain(){
    let s=felt('#93a463',600);
    s+=river('M0 22 Q200 48 400 16',14);
    s+=`<path d="M300 600 Q330 520 360 470 Q380 440 400 430" fill="none" stroke="#6f9ab4" stroke-width="3" opacity=".6"/>`;
    s+=road('M120 600 Q178 410 200 214 Q212 100 232 0');
    s+=hill(232,105,64,26,3)+hill(200,213,78,30,3);
    s+=trees(101,40,[10,390,50,590],(x,y)=>(Math.abs(x-200)>95||y>470)&&!(y>380&&y<480&&Math.abs(x-200)<110),['#3b6b2b','#4b7a35','#557f3b']);
    s+=label(112,58,'Broad River, a few miles back',10)+label(312,226,'First rise',10)+label(326,112,'Second rise',10)+label(150,540,'Road from the south',10,-66);
    s+=compass(378,578);
    return s+end(600);
  },
  features:[
    {x:200,y:213,r:44,px:300,py:206,name:'The first rise',why:'A gentle slope across the road.'},
    {x:232,y:105,r:40,px:326,py:96,name:'The second rise',why:'A second low hill behind the first.'},
    {x:200,y:26,px:90,py:40,d:'M0 22 Q200 48 400 16',line:true,name:'The river behind you',why:'The Broad River, a few miles back.'},
    {x:200,y:375,r:80,px:150,py:450,name:'Open pasture',why:'Open, gently rolling ground with few obstacles.'}],
  qs:'Set the trap: which toy goes where?',
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
  zones:[['skirm','Open pasture',196,262,26],['front','Before the first rise',204,188,22],['rise1','On the first rise',200,136,24],['rise2','Behind the second rise',258,70,24]],
  ans:{u:'a_militia',z:'front'},
  near:{u:[],z:['skirm','rise1']},
  start:{a_militia:[64,112],a_cont:[104,112],a_cav:[146,104],a_rifles:[146,262],a_morgan:[236,112]},
  fbU:{a_militia:'Right toy. Tarleton expects militia to run. Let them, on your schedule.',
       a_cont:'Your only troops who can stand a bayonet charge. Spend them out front and nothing is left to hold.',
       a_cav:'Your only horsemen. Shown this early, the dragoons swamp them and the surprise is gone.'},
  fbZ:{front:'Right place. They fire, then slip round the side while the British run on into your regulars.',
       skirm:'Too far out. In the open pasture the dragoons ride them down before they can fall back.',
       rise1:'In the main line, one break takes the whole line with it.',
       rise2:'Hidden away, they never fire a shot. Tarleton hits your regulars at full strength.'},
  fail:{skirm:{u:{t_drag:[176,292]},a:[['t',130,360,170,320,180,296]],fire:[['t_drag','$','clash']]},
        front:{u:{t_inf:[200,234]},a:[['t',190,370,200,240]],fire:[['t_inf','$']]},
        rise1:{u:{t_inf:[200,172]},a:[['t',190,370,200,178]],fire:[['t_inf','$','clash']]},
        rise2:{u:{t_inf:[200,150]},a:[['t',190,370,200,156]],fire:[['t_art','a_cont','cannon'],['t_inf','a_cont']],ko:['a_cont']}},
  clues:[
    {cat:'e',t:'Tarleton\'s habit',b:'He has beaten militia again and again with one headlong bayonet charge.'},
    {cat:'tr',card:'militia1781'},
    {cat:'e',card:'legion1781'},
    {cat:'m',t:'Morgan\'s intent',b:'For the plan to work, Tarleton has to believe he is winning.'},
    {cat:'tr',t:'Morgan\'s ask',b:'Morgan reportedly told the militia he needed only a couple of volleys from them.'},
    {cat:'t',t:'Cover and concealment',b:'The low rise hides whatever stands behind it from the British.'}],
  deduce:[['Tarleton always charges headlong.','Make his charge work for you: let him believe he is winning.'],
          ['Militia shoot well but break against bayonets.','Put them where shooting matters and running away is part of the plan.'],
          ['A river blocks any retreat.','Your men must fight here, and they know it. Morgan counted on that.']],
  scenes:[
    {s:0,t:'The trap is set',b:'Morgan forms three lines: riflemen out front, militia behind them, Continentals on the first rise. The cavalry waits out of sight.'},
    {s:0,u:{t_inf:[196,300],t_71:[260,330],t_drag:[120,300],t_art:[178,322],t_tarleton:[230,336]},a:[['t',190,370,196,306]],t:'Tarleton attacks at dawn',b:'As always, he sends his infantry straight forward, his small cannon firing in support.',fire:[['t_art','a_rifles','cannon']]},
    {s:1,t:'Two volleys',b:'The riflemen pick off officers. The militia fire their two volleys, aiming at officers, exactly as Morgan asked.',fire:[['a_rifles','t_inf'],['a_militia','t_inf']]},
    {s:2,a:[['gd',200,205,150,160,124,118],['t',200,280,200,162]],t:'The militia slip away',b:'They file off around the left. Tarleton sees the usual rout and charges with everything he has.'},
    {s:2,t:'Turn and fire',b:'On Morgan\'s signal the Continentals turn and fire one crushing volley at about 30 metres into the breathless British.',fire:[['a_cont','t_inf'],['a_cont','t_71']]},
    {s:3,a:[['g',206,102,206,208],['g',262,62,322,160,292,244],['g',118,112,100,200,124,246]],t:'Charge from three sides',b:'Bayonets in front, cavalry on one flank, reformed militia on the other. Most of the British surrender. Tarleton flees.',fire:[['a_cont','t_inf','clash'],['a_cav','t_71','clash'],['a_militia','t_art']]}],
  cards:{a_militia:'militia1781',a_cont:'cont1781',a_cav:'drag1781',t_inf:'redcoat1781',t_drag:'legion1781'}
});

PGD.mystery(14,{
  sit:'May 1940. Your tanks came through the Ardennes forest days ahead of schedule and have reached the Meuse River at Sedan. You need to get across.',
  mett:{
    m:'Cross the Meuse at Sedan and break into open country, to cut off the Allied armies in Belgium.',
    e:'French reservists dug into bunkers on the far bank. Stronger French reserves are moving up slowly.',
    t:'A wide river with bunkers covering it. Open, rolling country beyond.',
    tr:'Three tank divisions, engineers with rubber boats, and a large air force on call.',
    ti:'Every day counts. Your heavy artillery is still days behind on the forest roads.'},
  ground:[['Obstacle','The Meuse itself, covered by bunkers on the far bank.'],['Cover and concealment','The Ardennes forest behind you hides your columns.'],['Avenue of approach','Past the river, open country runs all the way to the sea.']],
  q:'Which force, sent where, gets you across the Meuse first?',
  toys:[['de_stuka','Dive bombers'],['de_eng','Engineers'],['de_1pz','Panzers']],
  zones:[['sedan','River at Sedan',176,214,24],['north','Crossing to the north',182,72,24],['deep','French reserves',70,300,26],['wait','Wait in the forest',320,332,26]],
  ans:{u:'de_stuka',z:'sedan'},
  near:{u:['de_eng'],z:['north']},
  start:{de_stuka:[330,64],de_eng:[316,160],de_1pz:[306,236],de_2pz:[352,120],de_10pz:[352,296],de_cmd:[372,206]},
  fbU:{de_stuka:'Right toy. With your guns days behind, dive bombers can be your artillery.',
       de_eng:'Close. Engineers do the crossing, but in open boats they need the bunkers silenced first.',
       de_1pz:'Tanks cannot swim. Without a bridge they sit on the bank under fire.'},
  fbZ:{sedan:'Right place. You are already here, and the French do not expect a crossing this soon.',
       north:'Close, but shifting north costs a day on jammed forest roads, and the French reinforce.',
       deep:'Bold, but the bunkers on the river are untouched. Nobody crosses.',
       wait:'Waiting is what the French are counting on. Every day, more reserves reach the river.'},
  fail:{sedan:{fire:[['fr_bunk','$','cannon'],['fr_55','$']]},
        north:{u:{fr_res:[150,96]},a:[['t',60,300,110,200,148,100]],fire:[['fr_res','$','tank']]},
        deep:{fire:[['fr_res','$','tank'],['fr_bunk','de_eng','cannon']],ko:['$','de_eng']},
        wait:{u:{fr_res:[138,232]},a:[['t',60,300,134,234]],ko:[]}},
  clues:[
    {cat:'ti',t:'The clock',b:'French commanders believe you need days to prepare any river crossing.'},
    {cat:'e',card:'res1940'},
    {cat:'e',card:'bunker1940'},
    {cat:'tr',t:'Air support',b:'The air force has promised massive support for this one crossing.'},
    {cat:'e',t:'Air defense',b:'The French have few anti-aircraft guns covering Sedan.'},
    {cat:'tr',card:'stuka1940'}],
  deduce:[['Your heavy artillery is days behind.','Waiting for it hands the French the days they need. Find something else to do its job.'],
          ['The French expect days of preparation.','Crossing tomorrow, right here, hits them before they are ready.'],
          ['The reservists have never faced air attack.','Massed bombing may break their nerve, not just their bunkers.']],
  scenes:[
    {s:0,t:'At the river, early',b:'Your panzers reach the Meuse at Sedan days before the French expect anyone. Reservists hold bunkers on the far bank.'},
    {s:0,u:{de_stuka:[204,170]},t:'Bombers as artillery',b:'For hours, wave after wave of dive bombers pounds the bunkers. Many reservists have never been bombed before.',fire:[['de_stuka','fr_bunk','bomb'],['de_stuka','fr_55','bomb']]},
    {s:1,t:'Across in rubber boats',b:'Engineers paddle across under fire and clear the bunkers one by one. The French line breaks.',fire:[['de_eng','fr_bunk'],['de_eng','fr_55']]},
    {s:2,t:'Break out west',b:'Bridges go up and the panzers race west. French reserves arrive in small groups and are beaten one at a time.',fire:[['de_10pz','fr_res','tank']]},
    {s:3,t:'The halt at Dunkirk',b:'The panzers reach the Channel on 20 May and trap the Allies. Then a halt order stops them for three days, and about 338,000 troops escape by sea.'}],
  cards:{de_1pz:'panzer1940',de_2pz:'panzer1940',de_10pz:'panzer1940',de_stuka:'stuka1940',de_eng:'pio1940',fr_55:'res1940',fr_bunk:'bunker1940'}
});

PGD.mystery(17,{
  sit:'August 1798. After weeks of searching, you find the French fleet anchored in Aboukir Bay. The sun is setting.',
  mett:{
    m:'Destroy the French fleet, cutting Napoleon\'s army in Egypt off from France.',
    e:'13 ships of the line anchored in one line, including the huge 120-gun flagship L\'Orient.',
    t:'A shallow bay. The French line is anchored along the edge of the shoals.',
    tr:'13 ships of the line, mostly 74s, under captains who know how you think.',
    ti:'Less than an hour of daylight, and no charts of the bay.'},
  ground:[['Obstacle','Shoals along the landward side of the French line.'],['Key terrain','The head of the French line, nearest the island.'],['Avenue of approach','Open water along the seaward side.']],
  q:'Which of your ships go where to open the attack?',
  toys:[['gb_goliath','Your lead ships'],['gb_outside','Your main squadron']],
  zones:[['inside','Shore side of the van',84,152,20],['outside','Sea side of the van',150,104,22],['flag','Beside the flagship',260,214,22],['rear','The French rear',320,284,22],['wait','Outside the bay',358,214,22]],
  ans:{u:'gb_goliath',z:'inside'},
  near:{u:['gb_outside'],z:['outside']},
  start:{},
  fbU:{gb_goliath:'Right toy. Your lead ships, under a captain who has spotted the gap, show the way.',
       gb_outside:'Close. They should follow, but the lead ships must find the way and the rest pin the seaward side.'},
  fbZ:{inside:'Right place. The guns facing the shore are not even cleared for action.',
       outside:'Close. It is a fair fight, ship for ship, and every French gun facing the sea is ready.',
       flag:'L\'Orient\'s 120 guns are the strongest point in their line. You take a pounding.',
       rear:'The wind lets the French van drift down to help. Now you face their whole line.',
       wait:'By dawn the French crews are back aboard and every gun is ready. The surprise is gone.'},
  fail:{inside:{fire:[['fr_van','$','broadside']]},
        outside:{fire:[['fr_van','$','broadside']]},
        flag:{fire:[['fr_orient','$','broadside']]},
        rear:{u:{fr_van:[296,250]},a:[['t',110,130,200,200,290,246]],fire:[['fr_rear','$','broadside'],['fr_van','$','broadside']]},
        wait:{ko:[]}},
  clues:[
    {cat:'ti',t:'Ashore',b:'Many French sailors are on land, fetching water and food.'},
    {cat:'t',t:'Weather',b:'The wind blows down the French line, from the van toward the rear.'},
    {cat:'tr',card:'sol74_1798'},
    {cat:'e',card:'orient1798'},
    {cat:'e',t:'Which guns are ready',b:'The French have cleared for action only the guns facing the open sea.'},
    {cat:'t',t:'Observation',b:'Captain Foley sees the leading French ship is anchored with room to swing on its cable.'}],
  deduce:[['French crews are ashore and nobody expects a fight tonight.','Attack now, before they are ready, even with night falling.'],
          ['The wind blows down their line.','Hit the front half. Their rear cannot easily sail up to help.'],
          ['Only their seaward guns are ready.','The landward side is the open door, if a ship can get there.']],
  scenes:[
    {s:0,t:'Found at sunset',b:'Thirteen French ships lie anchored in a line along the shoals. Many of their sailors are ashore.'},
    {s:1,t:'Straight in',b:'Nelson attacks at once, with night falling. Goliath leads the way into the bay.'},
    {s:1,u:{gb_goliath:[86,146],gb_inside:[124,168]},t:'Round the head of the line',b:'Goliath and the ships behind her slip between the French and the shore, where the French guns are not ready.',fire:[['gb_goliath','fr_van','broadside'],['gb_inside','fr_van','broadside']]},
    {s:1,u:{gb_goliath:[86,146],gb_inside:[124,168],gb_outside:[150,112],gb_nelson:[196,160]},t:'Caught between two fires',b:'The rest of the fleet anchors on the seaward side. The leading French ships are hit from both sides at once.',fire:[['gb_outside','fr_van','broadside'],['gb_inside','fr_center','broadside']],ko:['fr_van','fr_center']},
    {s:2,u:{gb_goliath:[86,146],gb_inside:[124,168],gb_outside:[236,204],gb_nelson:[196,160]},t:'L\'Orient explodes',b:'Around 10 p.m. the French flagship catches fire and blows up. By morning 11 of 13 French ships are taken or destroyed. Two escape.',fire:[['gb_outside','fr_orient','broadside']]}],
  cards:{gb_goliath:'sol74_1798',gb_inside:'sol74_1798',gb_outside:'sol74_1798',fr_van:'sol74_1798',fr_center:'sol74_1798',fr_rear:'sol74_1798',fr_orient:'orient1798',fr_fort:'battery1798'}
});
