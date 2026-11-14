/* The Daily Order: mystery battles for days 8 to 11 (Marathon, Little Bighorn, El Alamein, Salamis).
   Positions are written for a 400 square board and stretched to the 600 tall board when loaded. */

PGD.mystery(13,{
  war:'Greco-Persian Wars',
  general:'Miltiades',
  pitch:'You are <b>Miltiades</b>. A bigger Persian army holds the beach, a day\'s march from Athens. Form your line, spring the trap, save the city.',
  H:600,
  terrain(){
    let s=felt('#a9a46b',600);
    s+=sea('M334 0 Q318 150 326 300 Q336 450 314 600 H400 V0 Z');
    s+=`<path d="M334 0 Q318 150 326 300 Q336 450 314 600" fill="none" stroke="#e8d9a4" stroke-width="7" opacity=".85"/>`;
    s+=`<ellipse cx="262" cy="92" rx="66" ry="44" fill="#86a07a" stroke="#1c1a17" stroke-width="1.6"/>`+[0,1,2,3,4,5].map(k=>{const x=214+k*19, y=84+((k%2)?10:-6);return `<path d="M${x} ${y} l-2 -8 M${x} ${y} l0 -10 M${x} ${y} l2 -8" stroke="#2f5a24" stroke-width="1.4" stroke-linecap="round"/>`;}).join('');
    s+=mtn(26,120,30)+mtn(30,250,26)+mtn(24,470,30)+mtn(60,560,22);
    s+=road('M0 330 L44 332');
    s+=trees(490,16,[90,300,470,590],()=>true,['#5b7a3a','#6b8a44']);
    s+=label(262,150,'Great Marsh',10)+label(372,430,'Bay of Marathon',10,90)+label(30,312,'To Athens',10)+label(200,560,'The plain of Marathon',10);
    s+=compass(30,40);
    return s+end(600);
  },
  lead:'Persia has sent a fleet across the Aegean to punish Athens for helping a revolt. Its army has landed on the plain of Marathon, about a day\'s march from the city. You are one of ten Athenian generals, and you talked the others into attacking.',
  sit:'September 490 BC. Your line was too short to match the Persians, so you thinned the center to stretch it. On the left, the Plataeans have broken the Persians in front of them. On the right, the fight goes on. In the middle, the best Persian troops are pushing your thin center back.',
  mett:{
    m:'Destroy the Persian army on the beach before it can reach Athens.',
    e:'A bigger army with skilled archers. Its best troops stand in the center. The cavalry seems to be away.',
    t:'A flat coastal plain between the hills and the sea, with a large marsh at the north end.',
    tr:'About 10,000 Athenians and 1,000 Plataeans, all heavy infantry. No cavalry, almost no archers.',
    ti:'One afternoon. If the Persians get back to their ships, they can sail for Athens.'},
  ground:[['Key terrain','The Persian center, where their best troops are pushing forward.',[175,210,40]],
          ['Obstacle','The Great Marsh at the north end of the plain.',[262,62,44]],
          ['Avenue of approach','The open ground on the north side of the Persian center, left empty when their wing ran.',[180,150,36]]],
  q:'Your center is bending. Which toy, sent where, turns that into a trap?',
  qs:'Spring the trap: which toy goes where?',
  toys:[['at_left','Plataeans (left wing)','the Plataeans'],['at_center','Thin center','your thin center'],['at_right','Right wing','your right wing']],
  zones:[['flank','Into the Persian flank',180,152,24,'into the Persian flank'],['ships','Chase them to the ships',318,160,24,'down to the ships'],['marsh','After them into the marsh',250,78,22,'into the marsh after the runaways'],['back','Back up your center',62,168,22,'back behind your center']],
  ans:{u:'at_left',z:'flank'},
  start:{at_left:[210,120],at_center:[110,215],at_right:[180,300],at_milt:[55,232],
         pe_center:[175,210],pe_wl:[306,36,'ko'],pe_wr:[240,300],pe_arch:[235,210],pe_cav:[380,250,'off'],pe_fleet:[352,192]},
  fbU:{at_left:'Right toy. The Plataeans have already beaten the Persians in front of them, so they are the men you can spare.',
       at_center:'Not this toy. The center is the anvil. If it moves, there is nothing to hit the Persians against.',
       at_right:'Not this toy. The right wing is still fighting. Pull it out, and the Persian south wing gets loose.'},
  fbZ:{flank:'Right place. Hit the Persian center from the side while your own center holds it in front.',
       ships:'Not yet. A beaten enemy running to the ships is no danger. An unbeaten Persian center is.',
       marsh:'Not here. The Persians in the marsh are already beaten. Chasing them wins nothing.',
       back:'Not here. Backing up the center only pushes the Persians away. It does not trap them.'},
  fail:{
    'at_left@ships':{u:{pe_center:[124,212]},fire:[['$','pe_fleet','clash'],['pe_center','at_center','clash']],ko:['at_center'],
      b:'The Plataeans run down to the beach and grab a few ships. Behind them, the Persian center breaks through your thin middle and is on the road to Athens.'},
    'at_left@marsh':{u:{pe_center:[124,212]},fire:[['pe_center','at_center','clash']],ko:['at_center'],idle:['$'],
      b:'The Plataeans chase beaten men into the marsh. Nobody helps the center, and the Persians break through it toward Athens.'},
    'at_left@back':{u:{pe_center:[262,196],pe_arch:[300,214]},ko:[],idle:['$'],
      b:'The Plataeans march back to stiffen the center. It holds, but nobody is beside the Persians now. Their center pulls back to the ships in good order.'},
    'at_center@flank':{u:{pe_center:[112,214]},fire:[['pe_center','$','arrows'],['pe_arch','$','arrows']],
      b:'Your center steps out of the line. That leaves a hole, and the Persian center walks straight through it while their archers shoot into your men.'},
    'at_center@ships':{fire:[['pe_center','$','arrows'],['pe_arch','$','arrows']],
      b:'The thin center tries to push through to the ships and runs into the best Persian troops and their archers. It is shot to pieces.'},
    'at_center@marsh':{u:{pe_center:[100,214]},ko:[],idle:['$'],
      b:'Your center runs off after the beaten Persians. Nothing is left in the middle, and the Persian center marches through the gap toward Athens.'},
    'at_center@back':{u:{pe_center:[128,206],pe_arch:[186,210]},fire:[['pe_arch','$','arrows']],ko:[],
      b:'Pulling the center back only invites the Persians on. They push toward the hills, and your two wings are left fighting on their own.'},
    'at_right@flank':{fire:[['pe_center','$','arrows']],
      b:'Callimachus pulls his wing out of its own fight and marches across the front of the Persian center. Persian arrows hit his men in the side on the way.'},
    'at_right@ships':{fire:[['pe_arch','$','arrows']],
      b:'The right wing breaks off its fight and heads for the beach, straight past the Persian archers. Arrows cut it down.'},
    'at_right@marsh':{u:{pe_arch:[238,170]},fire:[['pe_arch','$','arrows']],
      b:'The right wing marches the whole length of the battle to reach the marsh, under Persian arrows all the way.'},
    'at_right@back':{u:{pe_wr:[136,246]},fire:[['pe_wr','at_center','clash']],ko:[],idle:['$'],
      b:'The right wing marches back behind the center. Now nothing holds the Persian south wing, and it swings round into the side of your center.'}},
  /* Three decisions, this battle's own format (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {from:0, start:{at_left:[44,176],at_center:[44,212],at_right:[44,248],at_milt:[72,212]}, after:[0,1,2,3,4],
     qs:'Form the line: which toy goes where?',
     sit:'September 490 BC. The Persian line on the plain is longer than yours. To match it you have to stretch, and you do not have the men to be strong everywhere. Some part of your line will be only four ranks deep, half the usual depth.',
     q:'One part of your line has to be thin. Which toy, placed where, makes that a strength?',
     intel:[['The enemy','A bigger army with skilled archers. Its best troops stand in the center, with weaker troops on both ends.'],
            ['Your men','About 10,000 Athenians and 1,000 Plataeans, all heavy infantry. No cavalry, almost no archers.'],
            ['The ground','A flat plain between the hills and the sea. Nothing on it will protect the ends of a short line.']],
     toys:[['at_center','Thin ranks','the thin ranks'],['at_left','Deep ranks: Plataeans','the deep Plataean ranks'],['at_right','Deep ranks: Athenians','the deep Athenian ranks']],
     zones:[['mid','Middle of the line',104,212,22,'into the middle of the line'],['north','Left end of the line',104,142,22,'to the left end of the line'],['south','Right end of the line',104,282,22,'to the right end of the line'],['res','Held back in reserve',52,112,20,'back into reserve']],
     ans:{u:'at_center',z:'mid'},
     hint:{u:'One part of the line only has to hold on. It does not have to win.',z:'Their best troops stand in one place, and their weakest in another. Decide where you can afford to give ground.'},
     fbU:{at_center:'Right toy. Something has to be thin, so let it be the part that only has to hold.',
          at_left:'Not this toy. Deep ranks win fights. Spend them where you mean to win, not where you only need to hold.',
          at_right:'Not this toy. Deep ranks win fights. Spend them where you mean to win, not where you only need to hold.'},
     fbZ:{mid:'Right place. Their best troops are in the middle. You do not have to beat them there, only keep them busy.',
          north:'A thin end is a weak end. The longer Persian line breaks it and comes round behind you.',
          south:'A thin end is a weak end. The longer Persian line breaks it and comes round behind you.',
          res:'Held back, your line is too short, and the Persians lap round both ends of it.'},
     fail:{mid:{ko:[],fire:[['pe_center','$','clash']]},north:{ko:[],fire:[['pe_wl','$','clash']]},
           south:{ko:[],fire:[['pe_wr','$','clash']]},res:{ko:[],idle:['$'],fire:[['pe_arch','at_milt','arrows']]}}},
    {after:[5],
     hint:{u:'Look for the men who have already won their own fight.',z:'The Persian center has pushed forward, past your wings. Think about its sides.'},
     intel:[['A bend, not a break','You thinned the center on purpose. It was always going to bend. What matters now is what your wings do.'],
            ['The other fights','The Persians on the north end are beaten and running. On the south end, they are still fighting.'],
            ['Hammer and anvil','Your center is holding the Persians in place, like an anvil.']]},
    {from:6, after:[7],
     qs:'The battle is won: which toy goes where?',
     sit:'The Persian center has broken and run for the ships. You have taken several of them in the surf. But most of the fleet is afloat, and it is turning south round the coast, toward Athens.',
     q:'Athens is about a day\'s march away, and its army is here on the beach. Which toy, sent where, finishes the job?',
     intel:[['The fleet','The surviving Persian ships are sailing round the coast toward Athens.'],
            ['The city','Athens is about a day\'s march from here. Its army is standing on this beach.']],
     toys:[['at_left','Plataeans','the Plataeans'],['at_center','Center','your center'],['at_right','Right wing','your right wing']],
     zones:[['athens','The road to Athens',28,226,20,'down the road to Athens'],['surf','After the last ships',352,250,20,'into the surf after the last ships'],['marsh','Into the marsh',250,78,22,'into the marsh after the stragglers'],['hills','Back to camp in the hills',70,120,20,'back to camp in the hills']],
     ans:{u:['at_left','at_center','at_right'],z:'athens'},
     hint:{z:'The danger has left the beach. Work out where it is going.'},
     fbU:{at_left:'Right toy. Whoever leads, the whole army follows: every man is needed at home.',
          at_center:'Right toy. Whoever leads, the whole army follows: every man is needed at home.',
          at_right:'Right toy. Whoever leads, the whole army follows: every man is needed at home.'},
     fbZ:{athens:'Right place. The fleet has to sail round the coast. Your men can march straight home and be waiting when it arrives.',
          surf:'The ships still in reach are already taken. The ones that matter are at sea, heading for your city.',
          marsh:'The men in the marsh are beaten. Chasing them wins nothing while the fleet sails for Athens.',
          hills:'Resting in camp hands the Persians an empty city.'},
     fail:{athens:{ko:[]},surf:{ko:[],idle:['$']},marsh:{ko:[],idle:['$']},hills:{ko:[],idle:['$']}}}],
  clues:[
    {cat:'m',t:'A bend, not a break',b:'You thinned the center on purpose to stretch the line. It was always going to bend. What matters now is what your wings do.'},
    {cat:'e',card:'sparabara490'},
    {cat:'e',t:'The other fights',b:'The Persians on the north end are beaten and running. On the south end, they are still fighting.'},
    {cat:'tr',card:'plataean490'},
    {cat:'m',t:'Hammer and anvil',b:'Your center is holding the Persians in place. Hit them from the side, and they are caught between two walls of spears.'}],
  deduce:[['The center was thinned on purpose and is bending, not breaking.','Let it hold the Persians in place.'],
          ['The Plataeans have already won their fight.','They are the men you can spare.'],
          ['The Persian center has pushed forward past your wings.','Turn the free wing inward and hit it from the side.']],
  /* The real battle. North is up. The Athenians come down from the hills in the west and face east, so their left is the north. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={at_left:[100,140],at_center:[100,210],at_right:[100,280],at_milt:[70,210],
           pe_center:[250,210],pe_wl:[250,140],pe_wr:[250,280],pe_arch:[220,210],pe_cav:[300,240],pe_fleet:[340,200]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Two lines',b:'Miltiades stretches his line to match the longer Persian one. He keeps the wings deep and thins the center to about four ranks, half the usual depth. The Plataeans stand on the left.'});
    add(1,{pe_cav:[392,250,'exit']},{t:'No horsemen',b:'For reasons nobody is sure of, the Persian cavalry plays little part. One later story says it was away, being loaded onto the ships.'});
    add(1,{at_left:[170,140],at_center:[160,210],at_right:[170,280]},{a:[['g',100,140,166,140],['g',100,210,156,210],['g',100,280,166,280]],t:'At a run',b:'The Athenians cross the last stretch of the plain at a run, to spend as little time as possible under the Persian arrows.',
      fire:[['pe_arch','at_center','arrows'],['pe_arch','at_left','arrows'],['pe_arch','at_right','arrows']]});
    add(1,{at_left:[228,140],at_right:[226,286],pe_wl:[262,128,'ko'],pe_wr:[262,300,'ko']},{a:[['g',170,140,224,140],['g',170,280,222,284]],t:'The wings win',b:'The deep wings smash into the weaker Persian troops on both ends of the line. Both Persian wings break and run.',
      fire:[['at_left','pe_wl','clash'],['at_right','pe_wr','clash']]});
    add(1,{pe_center:[172,210],at_center:[118,212]},{a:[['t',250,210,178,210]],t:'The center bends',b:'In the middle, the best Persian troops push the thin Athenian center back toward the hills, exactly where it was weakest.',
      fire:[['pe_center','at_center','clash']]});
    add(2,{at_left:[195,182],at_right:[196,238],pe_arch:[220,210,'ko']},{a:[['g',228,140,198,178],['g',226,286,198,242]],t:'The trap closes',b:'Instead of chasing the beaten Persian wings, the Athenian wings turn inward and hit the Persian center from both sides.',
      fire:[['at_left','pe_center','clash'],['at_right','pe_center','clash'],['at_left','pe_arch','clash'],['at_right','pe_arch','clash'],['at_center','pe_center','clash']]});
    add(2,{pe_center:[312,202,'ko'],at_left:[306,176],at_right:[294,240],at_center:[230,212]},{a:[['g',195,182,302,176],['g',196,238,290,240]],t:'To the ships',b:'The Persian center breaks and runs for the ships. The Athenians chase it into the surf and capture several ships. Herodotus counts 192 Athenian dead.',
      fire:[['at_left','pe_center','clash'],['at_right','pe_center','clash'],['at_left','pe_fleet','clash']]});
    add(2,{pe_fleet:[384,330,'exit']},{t:'The race to Athens',b:'The surviving Persian ships sail round the coast toward Athens. The Athenians march straight home and are waiting when the fleet arrives. The Persians give up and sail away.'});
    return S;
  })(),
  video:{id:'UebkPaosYrU',t:'The Brutal Reality of the Battle of Marathon',ch:'Bannerlore',v:1644142},
  sources:[['Livius: Marathon (490 BCE)','https://livius.org/articles/battle/marathon-490-bce'],
           ['Britannica: Battle of Marathon','https://www.britannica.com/event/Battle-of-Marathon'],
           ['History Hit: 10 facts about the Battle of Marathon','https://www.historyhit.com/facts-about-the-battle-of-marathon/'],
           ['HistoryNet: what we learned from Marathon','https://historynet.com/learned-marathon-490-bc/']],
  cards:{at_left:'plataean490',at_center:'hoplite490',at_right:'hoplite490',pe_center:'sparabara490',pe_wl:'levy490',pe_wr:'levy490',pe_arch:'parcher490'}
});

PGD.mystery(29,{
  war:'Great Sioux War',
  general:'Crazy Horse',
  pitch:'You are <b>Crazy Horse</b>. Soldiers on the ridge are falling back. Leave them nowhere to go.',
  H:600,
  terrain(){
    let s=felt('#b9ad7a',600);
    s+=hill(304,236,62,128,3)+hill(246,500,54,40,3)+hill(214,140,40,30,2);
    s+=`<path d="M396 420 Q320 396 262 360 Q222 334 196 318" fill="none" stroke="#8a7a4e" stroke-width="10" stroke-linecap="round" opacity=".55"/>`;
    s+=river('M150 0 Q118 90 156 180 Q196 270 152 360 Q108 450 146 540 Q160 580 150 600',12);
    [[40,92],[86,70],[26,236],[94,262],[70,420],[24,452],[104,478],[54,560],[110,140]].forEach(p=>s+=tent(p[0],p[1],'#efe4c4'));
    s+=trees(1876,10,[118,190,20,580],(x,y)=>true,['#4f7a3a','#5f8a44']);
    s+=label(66,30,'Lakota and Cheyenne camp',10)+label(122,300,'Little Bighorn River',9,-80)+label(354,250,'Battle Ridge',10,90)+label(250,566,'Reno Hill',10)+label(330,430,'Medicine Tail Coulee',9,22);
    s+=compass(376,40);
    return s+end(600);
  },
  lead:'The US government has ordered the free Lakota bands onto reservations, and Army columns are closing in. Thousands of Lakota, Northern Cheyenne and Arapaho are camped together along the Little Bighorn. Today, without warning, soldiers attacked.',
  sit:'25 June 1876. Soldiers charged the south end of the camp and were driven back across the river onto a hill. A second group rode in from the east toward the ford. Warriors there have pushed them back up onto the long ridge.',
  mett:{
    m:'Protect the camp and destroy or drive off the soldiers on the ridge.',
    e:'Five companies of cavalry on the ridge, cut off from the rest of their regiment. More soldiers dug in on the hill to the south.',
    t:'A river with the camp on its west bank. On the east bank, a long ridge, broken by ravines that hide riders.',
    tr:'Warriors from many bands, some with repeating rifles. Many more are arriving from the Reno fight.',
    ti:'An afternoon. If the soldiers on the ridge can join the others, they will be much harder to beat.'},
  ground:[['Key terrain','The long ridge where the soldiers have pulled back.',[296,190,50]],
          ['Avenue of approach','The north end of the ridge. Nobody is there yet.',[296,96,36]],
          ['Obstacle','The river, crossed at the ford below the ridge.',[176,208,30]]],
  q:'The soldiers on the ridge are pushed back from the ford. Which toy, sent where, leaves them nowhere to go?',
  qs:'Close the ring: which toy goes where?',
  toys:[['na_north','Crazy Horse\'s warriors'],['na_ford','Warriors at the ford'],['na_south','Warriors from the Reno fight']],
  zones:[['north','Round the north end of the ridge',296,96,24],['ford','Straight across at the ford',196,205,24],['reno','Back after Reno on the hill',180,282,24],['camp','Stay to guard the camp',70,246,22]],
  ans:{u:'na_north',z:'north'},
  start:{na_north:[60,100],na_ford:[150,215],na_south:[170,330],na_camp:[36,250],na_cmd:[30,220],
         us_custer:[275,160],us_cmd:[290,140],us_reno:[235,325],us_benteen:[256,345],us_pack:[284,368]},
  fbU:{na_north:'Right toy. Crazy Horse\'s warriors are free, rested and fast, and nobody is watching them.',
       na_ford:'Not this toy. The warriors at the ford are holding the crossing. Move them, and the way into the camp is open.',
       na_south:'Not this toy. Those warriors are keeping Reno\'s men pinned on their hill.'},
  fbZ:{north:'Right place. The soldiers are being pushed from the south and west. Get round to the north, and there is nowhere left for them to go.',
       ford:'Not here. The ford is already held. More warriors there only push the soldiers back the way they want to go.',
       reno:'Not here. Reno\'s men are already beaten and pinned down. The danger is on the ridge.',
       camp:'Not here. The camp is safest if the soldiers on the ridge are beaten, not left free.'},
  fail:{
    'na_north@ford':{fire:[['$','us_custer','rifle']],ko:[],
      b:'Crazy Horse\'s warriors pile in at the ford beside the others. The soldiers are pushed back up the ridge, but nobody closes the north end, and they can still pull back that way.'},
    'na_north@reno':{fire:[['$','us_reno','rifle']],ko:[],
      b:'They ride south to join the fight at Reno\'s hill, where the soldiers are already dug in. Meanwhile Custer\'s companies on the ridge face only the warriors from the ford, and hold.'},
    'na_north@camp':{ko:[],idle:['$'],
      b:'The camp is guarded, but Custer\'s five companies hold the ridge, facing only the warriors from the ford.'},
    'na_ford@north':{u:{us_custer:[196,215]},ko:[],idle:['$'],
      b:'With the ford left empty, Custer\'s companies ride straight back down toward it, and toward the camp full of families.'},
    'na_ford@ford':{fire:[['$','us_custer','rifle'],['us_custer','$','rifle']],ko:[],
      b:'The warriors at the ford charge straight up the slope into the soldiers\' carbines. They push them back, but north along the ridge, the soldiers\' way out stays open.'},
    'na_ford@reno':{u:{us_custer:[196,215]},fire:[['$','us_reno','rifle']],ko:[],
      b:'The warriors leave the ford to go after Reno. Custer\'s companies ride back down to the empty crossing, heading for the camp.'},
    'na_ford@camp':{u:{us_custer:[196,215]},fire:[['$','us_custer','rifle']],ko:[],
      b:'Falling back to the camp gives up the ford. Custer\'s companies ride down to the river, and the fight comes to the tents.'},
    'na_south@north':{fire:[['us_custer','$','rifle'],['us_cmd','$','rifle']],
      b:'Many warriors did leave Reno\'s hill to fight Custer. But riding the long way round to the north end takes these men straight across the soldiers\' carbines.'},
    'na_south@ford':{u:{us_reno:[245,280]},fire:[['$','us_custer','rifle']],ko:[],
      b:'They join the fight at the ford and push the soldiers back up the ridge. But the north end stays open, and Reno\'s men, no longer pinned, start north to help.'},
    'na_south@reno':{fire:[['$','us_reno','rifle']],ko:[],
      b:'They keep Reno pinned on his hill, which helps. But Custer\'s companies on the ridge face only the warriors from the ford, and hold.'},
    'na_south@camp':{u:{us_reno:[250,300],us_benteen:[262,312]},ko:[],idle:['$'],
      b:'Falling back to the camp lets Reno\'s and Benteen\'s men off their hill. They ride north along the bluffs to join Custer.'}},
  clues:[
    {cat:'e',t:'Cut off',b:'The soldiers on the ridge are a long way from the rest of their regiment. Nobody can reach them quickly.'},
    {cat:'e',card:'trooper1876'},
    {cat:'t',t:'The ridge',b:'The warriors from the ford are pressing the ridge from the south and west. Nobody is on its north end.'},
    {cat:'tr',card:'warrior1876'},
    {cat:'m',t:'Close the ring',b:'Soldiers pushed from one side fall back the other way. Get round behind them, and there is nowhere left to go.'}],
  deduce:[['The soldiers on the ridge are cut off from the rest of the regiment.','Beat them before they can join up.'],
          ['They are being pushed from the ford, so they will fall back north.','The north end of the ridge is their way out.'],
          ['Crazy Horse\'s warriors are free and fast.','Send them round to close it.']],
  /* The real battle. North is up. The camp is on the west bank; the soldiers came from the east and south. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={na_north:[30,120],na_ford:[60,210],na_south:[40,340],na_camp:[30,220],na_cmd:[24,200],
           us_custer:[300,300],us_cmd:[300,280],us_reno:[320,320],us_benteen:[330,340],us_pack:[360,360]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'The summer camp',b:'Several Lakota bands, with Northern Cheyenne and Arapaho, are camped for kilometres along the Little Bighorn. The 7th Cavalry is approaching from the east.'});
    add(1,{us_benteen:[372,396],us_custer:[262,290],us_cmd:[270,272],us_reno:[250,318]},{a:[['gd',330,340,370,392],['g',300,300,264,290]],t:'Three battalions',b:'Custer splits his regiment. Benteen is sent off to scout to the south. Reno is ordered to attack the south end of the camp, and Custer keeps five companies himself.'});
    add(1,{us_reno:[116,366],na_south:[70,350]},{a:[['g',250,318,122,364]],t:'Reno attacks',b:'Reno\'s battalion crosses the river and charges the south end of the camp. Warriors pour out to meet it, and the soldiers stop and fight on foot.',
      fire:[['us_reno','na_south','rifle'],['na_south','us_reno','rifle']]});
    add(1,{us_reno:[235,325],na_south:[170,330]},{a:[['gd',116,366,230,326],['t',70,350,164,330]],t:'Driven back',b:'Reno\'s line breaks. His men flee back across the river and up the bluffs to a hilltop, with warriors chasing them all the way.',
      fire:[['na_south','us_reno','rifle']]});
    add(2,{us_custer:[215,215],us_cmd:[232,204],na_ford:[110,215]},{a:[['g',262,290,220,218]],t:'Toward the ford',b:'Custer\'s companies ride north behind the bluffs, then down a ravine toward a ford, perhaps to cross into the camp. Warriors at the ford open fire.',
      fire:[['na_ford','us_custer','rifle'],['us_custer','na_ford','rifle']]});
    add(2,{us_custer:[275,160],us_cmd:[290,140],na_ford:[205,215]},{a:[['gd',215,215,272,164],['t',110,215,200,215]],t:'Up the ridge',b:'The soldiers pull back up onto the long ridge. More and more warriors cross the river and follow them.',
      fire:[['na_ford','us_custer','rifle']]});
    add(2,{na_north:[300,95]},{a:[['t',30,120,150,60,294,92]],t:'Round the north end',b:'Many Lakota and Cheyenne accounts say Crazy Horse led a large party down the valley, crossed the river and came up onto the ridge from the north.',
      fire:[['na_north','us_cmd','rifle'],['na_north','us_custer','rifle']]});
    add(2,{us_custer:[280,150,'ko'],us_cmd:[292,128,'ko'],na_ford:[250,190]},{a:[['t',205,215,248,194]],t:'Nowhere to go',b:'Pressed from the south and west and now cut off to the north, Custer\'s five companies are destroyed on the ridge. About 210 soldiers die there.',
      fire:[['na_north','us_cmd','clash'],['na_ford','us_custer','rifle'],['na_north','us_custer','rifle']]});
    add(2,{us_benteen:[256,345],us_pack:[284,368]},{a:[['g',372,396,258,348]],t:'Reno Hill',b:'Benteen and the pack train join Reno on his hill. Warriors keep them pinned down until the camp moves off as more soldiers approach. They are relieved on 27 June.',
      fire:[['na_south','us_reno','rifle'],['na_south','us_benteen','rifle']]});
    return S;
  })(),
  video:{id:'qTRcQTUW0vk',t:'Exposing The Myths Of Little Bighorn And General Custer',ch:'Our History',v:2751300},
  sources:[['National Park Service: context and story of the battle','https://home.nps.gov/libi/learn/historyculture/battle-story.htm'],
           ['National Park Service: Lt. Col. Custer\'s battalion','https://home.nps.gov/libi/learn/historyculture/lt-col-custer-s-battalion.htm'],
           ['National Park Service: Reno\'s battalion','https://home.nps.gov/libi/learn/historyculture/reno-s-battalion.htm'],
           ['NPS History: Little Bighorn Battlefield handbook','https://www.npshistory.com/publications/libi/index.htm'],
           ['World History Encyclopedia: Battle of the Little Bighorn','https://www.worldhistory.org/Battle_of_the_Little_Bighorn/']],
  cards:{na_north:'warrior1876',na_south:'warrior1876',na_ford:'defender1876',us_custer:'trooper1876',us_reno:'trooper1876',us_benteen:'trooper1876',us_pack:'pack1876'}
});

PGD.mystery(23,{
  war:'Second World War',
  general:'Bernard Montgomery',
  pitch:'You are <b>Bernard Montgomery</b>. Rommel\'s tanks will rush to wherever you attack. Make him guess wrong.',
  H:600,
  terrain(){
    let s=felt('#e2cf98',600);
    s+=sea('M0 0 H400 V40 Q300 58 200 44 Q100 30 0 50 Z');
    s+=`<path d="M0 548 Q100 530 200 546 Q300 562 400 540 V600 H0 Z" fill="#c8a76a" stroke="#1c1a17" stroke-width="1.6"/>`;
    s+=road('M0 74 Q120 66 220 76 T400 70');
    s+=`<g stroke="#8a2f1e" stroke-width="1.6" opacity=".75">`+Array.from({length:22},(_,k)=>{const y=96+k*20, x=176+((k%3)-1)*8;return `<path d="M${x-4} ${y-4} l8 8 M${x+4} ${y-4} l-8 8"/><path d="M${x+18} ${y+6} l6 6 M${x+24} ${y+6} l-6 6"/>`;}).join('')+`</g>`;
    s+=hill(230,250,40,16,2)+hill(250,330,46,16,2);
    s+=city(330,74,'El Alamein',10,-8);
    s+=label(200,24,'Mediterranean Sea',10)+label(160,360,'Minefields',10,-90)+label(200,580,'Qattara Depression',11)+label(250,214,'Miteirya Ridge',9)+label(60,120,'Axis lines',10)+label(370,500,'British lines',10,90);
    s+=compass(30,520);
    return s+end(600);
  },
  lead:'Rommel\'s army has driven deep into Egypt and been stopped at El Alamein, about a hundred kilometres from Alexandria. You have taken over the British Eighth Army and spent two months building it up. Now you must break the Axis line.',
  sit:'October 1942. The line runs from the sea to the Qattara Depression, so there is no way round it. You will attack in the north. Rommel has split his tanks between north and south, ready to rush to whichever sector you hit.',
  mett:{
    m:'Break through the Axis line and destroy Rommel\'s army.',
    e:'Infantry dug in behind deep minefields, and armour held back in two groups, north and south, to counterattack.',
    t:'Open desert, sea to the north and soft sand in the south. Every movement can be seen from the air.',
    tr:'More men, tanks and guns than Rommel, but every tank park and supply dump is easy to spot.',
    ti:'The attack starts on the night of 23 October. Rommel must not guess when or where.'},
  ground:[['Key terrain','The minefields in the north, where your attack will go in.',[190,110,40]],
          ['Obstacle','The Qattara Depression. Too soft for tanks, so the line cannot be outflanked.',[200,384,40]],
          ['Avenue of approach','The southern sector. Rommel thinks an attack could come here too.',[270,310,40]]],
  q:'Rommel\'s tanks will rush to wherever you attack. Which toy, sent where, keeps them in the wrong place?',
  qs:'Fool Rommel: which toy goes where?',
  toys:[['gb_dummy','Dummy tanks'],['gb_arm','Real tanks'],['gb_inf','Infantry']],
  zones:[['south','Show it off in the south',270,312,24],['north','Mass it in the open, north',252,160,24],['gap','Straight into the minefields',196,110,22],['dep','Round by the Qattara Depression',232,372,22]],
  ans:{u:'gb_dummy',z:'south'},
  start:{gb_inf:[250,110],gb_arm:[320,140],gb_res:[340,220],gb_dummy:[330,280],gb_guns:[285,70],gb_monty:[370,50],
         ax_north:[140,105],ax_ital:[120,170],ax_panz:[120,300],ax_cmd:[40,40,'off']},
  fbU:{gb_dummy:'Right toy. Fake tanks cost almost nothing, and from the air they look exactly like real ones.',
       gb_arm:'Not this toy. Your real tanks are needed for the real attack in the north.',
       gb_inf:'Not this toy. The infantry have to clear paths through the minefields in the north.'},
  fbZ:{south:'Right place. Make the south look like the main attack, and Rommel keeps half his tanks there.',
       north:'Not here. Everything piled up in the north tells Rommel exactly where you will strike.',
       gap:'Not here. Charging the minefields first, with nothing to fool Rommel, lets him bring all his tanks to meet you.',
       dep:'Not here. Nobody attacks through the soft sand of the depression, and Rommel knows it.'},
  fail:{
    'gb_dummy@north':{u:{ax_panz:[130,200]},fire:[['ax_panz','gb_inf','tank']],ko:[],idle:['$'],
      b:'The dummies join the real build-up in the north. Now everything Rommel sees points north, so his southern tanks move up and are waiting when you attack.'},
    'gb_dummy@gap':{fire:[['ax_north','$','cannon']],
      b:'Plywood and canvas tanks roll into the minefield. The first mine gives the game away, and Rommel knows they were fakes all along.'},
    'gb_dummy@dep':{ko:[],idle:['$'],
      b:'A fake army on the edge of the depression fools no one. Tanks cannot cross that sand, so Rommel keeps his armour ready behind the north.'},
    'gb_arm@south':{fire:[['ax_panz','$','tank']],ko:[],
      b:'Your real tanks drive south, and Axis aircraft watch them go. When the attack goes in up north, there are no tanks behind it.'},
    'gb_arm@north':{u:{ax_panz:[130,200]},fire:[['ax_panz','$','tank']],
      b:'Hundreds of tanks gathered in the open tell Rommel exactly where the blow will fall. His southern armour moves up and meets them head on.'},
    'gb_arm@gap':{fire:[['ax_north','$','cannon']],
      b:'Tanks driven into the minefield before the infantry and engineers clear a path. Mines and anti-tank guns stop them in the first belt.'},
    'gb_arm@dep':{ko:[],idle:['$'],
      b:'The tanks bog down in the soft sand at the edge of the Qattara Depression, far from any fight.'},
    'gb_inf@south':{ko:[],idle:['$'],
      b:'Moving the infantry south leaves nobody to clear paths through the minefields in the north. The tanks there have no way through.'},
    'gb_inf@north':{ko:[],idle:['$'],
      b:'Holding the infantry back means no paths are cut through the minefields. The big attack never gets started.'},
    'gb_inf@gap':{u:{ax_panz:[130,200]},fire:[['ax_north','$','rifle'],['ax_panz','$','tank']],
      b:'The infantry cut their way in, but Rommel has watched your build-up in the north. His southern tanks are already on the way to seal the gap.'},
    'gb_inf@dep':{ko:[],idle:['$'],
      b:'The infantry march off toward the depression, where there is nothing to attack. The minefields in the north stay uncleared.'}},
  clues:[
    {cat:'e',t:'Two groups of tanks',b:'Rommel has split his armour, half in the north and half in the south, ready to rush to whichever sector you attack.'},
    {cat:'e',card:'panzer1942'},
    {cat:'t',t:'Seen from the air',b:'In the open desert, every tank park is easy to spot from the air. Rommel will judge your plans by what his pilots see.'},
    {cat:'tr',card:'dummy1942'},
    {cat:'m',t:'Show him the wrong place',b:'If the south looks like it is filling up with tanks, Rommel has to keep half his armour there.'}],
  deduce:[['Rommel will rush his tanks to wherever you attack.','Make him believe the attack is coming somewhere else.'],
          ['He judges your plans by what his pilots can see.','Give his pilots something to see.'],
          ['Fake tanks look real from the air.','Put them in the south, and hide the real tanks in the north.']],
  /* The real battle. North is up. The British hold the east, facing west, with the sea to the north. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={gb_inf:[250,110],gb_arm:[320,140],gb_res:[340,220],gb_dummy:[330,280],gb_guns:[285,70],gb_monty:[370,50],
           ax_north:[140,105],ax_ital:[120,170],ax_panz:[120,300],ax_cmd:[40,40,'off']};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'No way round',b:'The line runs about 65 kilometres from the sea to the Qattara Depression. There is no open flank, so the attack has to go straight through the minefields.'});
    add(0,{gb_dummy:[290,312,'decoy']},{a:[['g',330,280,294,308]],t:'Operation Bertram',b:'In the south, the British build fake tanks and guns, and a dummy pipeline laid so slowly it suggests a much later attack. In the north, real tanks are disguised as trucks.'});
    add(1,{},{t:'The barrage',b:'On the night of 23 October, about a thousand British guns open fire on the Axis lines. Rommel himself is away in Germany, on sick leave.',fire:[['gb_guns','ax_north','cannon']]});
    add(1,{gb_inf:[192,110],gb_arm:[236,124]},{a:[['g',250,110,198,110],['g',320,140,240,126]],t:'Into the minefields',b:'Infantry and engineers push into the minefields to clear two corridors for the tanks. The mines are deeper and thicker than expected.',
      fire:[['gb_inf','ax_north','rifle'],['ax_north','gb_inf','rifle'],['gb_guns','ax_north','cannon']]});
    add(1,{ax_ital:[174,152],ax_cmd:[40,40]},{a:[['t',120,170,170,154]],t:'Fooled',b:'Expecting another blow in the south, the Axis keeps its southern armour there for days. The northern tanks counterattack on their own. Rommel flies back on 25 October.',
      fire:[['ax_ital','gb_inf','tank'],['gb_arm','ax_ital','tank']]});
    add(2,{ax_panz:[150,206],ax_ital:[174,152,'ko']},{a:[['t',120,300,148,212]],t:'Too late',b:'Rommel brings his southern tanks north, burning fuel he cannot replace. In days of grinding fighting, his armour is worn down.',
      fire:[['gb_arm','ax_ital','tank'],['gb_arm','ax_panz','tank'],['ax_panz','gb_arm','tank']]});
    add(2,{gb_res:[214,150],ax_north:[140,105,'ko']},{a:[['g',340,220,218,154]],t:'Supercharge',b:'On 2 November a fresh attack, Operation Supercharge, smashes through what is left of the Axis line.',
      fire:[['gb_res','ax_north','tank'],['gb_inf','ax_north','rifle'],['gb_arm','ax_panz','tank']]});
    add(2,{ax_panz:[20,206,'exit'],ax_cmd:[10,40,'exit']},{a:[['t',150,206,30,206]],t:'Retreat',b:'Rommel\'s army falls back west across the desert. Churchill later wrote that before Alamein the British never had a victory, and after it never a defeat.'});
    return S;
  })(),
  video:{id:'62ZBhP03reM',t:'Rommel\'s Worst Defeat: Second Battle of El Alamein',ch:'The Armchair Historian',v:1133711},
  sources:[['Imperial War Museums: how the Second Battle of El Alamein was won','https://www.iwm.org.uk/history/how-the-second-battle-of-el-alamein-was-won'],
           ['National Army Museum: Second Battle of El Alamein','https://www.nam.ac.uk/explore/battle-alamein'],
           ['CWGC: remembering the battle of El Alamein 80 years on','https://admin.cwgc.org/our-work/blog/remembering-the-battle-of-el-alamein-80-years-on'],
           ['WarHistory.org: Operation Bertram, the cover plan for El Alamein','https://warhistory.org/2017/07/23/operation-bertram-the-cover-plan-for-el-alamein-ii/'],
           ['Grounded Curiosity: Second El Alamein, the lost manoeuvrist battle?','https://groundedcuriosity.com/second-battle-of-el-alamein-the-lost-manoeuvrist-battle/']],
  cards:{gb_inf:'tommy1942',gb_arm:'sherman1942',gb_res:'sherman1942',gb_dummy:'dummy1942',gb_guns:'gun1942',ax_north:'axisinf1942',ax_ital:'panzer1942',ax_panz:'panzer1942'}
});

PGD.mystery(2,{
  war:'Greco-Persian Wars',
  general:'Themistocles',
  pitch:'You are <b>Themistocles</b>. The Persian fleet is twice your size. Pick the water you fight on.',
  H:600,
  terrain(){
    let s=seaBg(600);
    s+=land('M0 0 H400 V420 Q360 400 330 380 Q290 340 250 300 Q210 250 170 200 Q130 150 90 110 Q60 90 30 96 Q10 100 0 104 Z','#c9b98a');
    s+=land('M22 150 Q44 140 70 168 Q100 200 130 240 Q170 290 200 340 Q230 390 230 440 Q226 500 170 540 Q100 576 40 556 Q16 540 18 480 Q22 300 22 150 Z','#bfb27e');
    s+=`<ellipse cx="292" cy="448" rx="18" ry="11" fill="#bfb27e" stroke="#1c1a17" stroke-width="1.6"/>`;
    s+=hill(318,190,62,36,3)+hill(96,400,50,40,2);
    s+=trees(480,10,[240,400,20,160],()=>true,['#6f7f45','#7f8f4c'])+trees(48,8,[40,200,420,540],()=>true,['#6f7f45','#7f8f4c']);
    s+=label(252,64,'Attica',11)+label(340,150,'Mount Aigaleo',9)+label(92,470,'Salamis',11)+label(330,474,'Psyttaleia',9)+label(196,300,'Strait of Salamis',10,56)+label(352,580,'Open sea',10)+label(36,72,'To the Isthmus',9);
    s+=compass(372,520);
    return s+end(600);
  },
  lead:'Ten years after Marathon, King Xerxes has invaded Greece with a huge army and fleet. The Spartans have fallen at Thermopylae and Athens has been burned. Its people have fled to the island of Salamis, and the Greek fleet waits in the strait beside it.',
  sit:'September 480 BC. You sent a secret message telling Xerxes the Greeks were about to run. His ships rowed all night to block every way out. Now it is dawn, and the Persian fleet is gathered at the mouth of the strait.',
  mett:{
    m:'Destroy or drive off the Persian fleet, so the invasion cannot go on by sea.',
    e:'A much bigger fleet with skilled Phoenician and Ionian crews. In open water they could surround you.',
    t:'A narrow, crowded strait between Salamis and the mainland, opening into wide water to the south.',
    tr:'About 370 heavy triremes built to ram, and hoplites waiting on the island.',
    ti:'One morning. The alliance is arguing, and may break up within days.'},
  ground:[['Key terrain','The narrows, where the channel squeezes between Salamis and the mainland.',[175,165,40]],
          ['Obstacle','The western channel, now blocked by Egyptian ships sent round in the night.',[20,85,30]],
          ['Avenue of approach','The mouth of the strait, where the Persian fleet has gathered.',[296,333,40]]],
  q:'The Persians have twice as many ships. Which toy, sent where, makes their numbers useless?',
  qs:'Beat the bigger fleet: which toy goes where?',
  toys:[['gr_fleet','Greek battle line'],['gr_west','Corinthian squadron'],['gr_hopl','Hoplites on the shore']],
  zones:[['narrows','Line up across the narrows',175,165,24],['open','Row out to meet them',344,288,24],['isthmus','Slip away west to the Isthmus',30,83,20],['shore','Pull the ships up on the beach',108,175,20]],
  ans:{u:'gr_fleet',z:'narrows'},
  start:{gr_fleet:[150,150],gr_ath:[195,190],gr_west:[60,87],gr_them:[100,143],gr_hopl:[150,253],
         pe_fleet:[296,333],pe_ion:[262,366],pe_egy:[10,85],pe_psy:[290,293],pe_xerxes:[300,160]},
  fbU:{gr_fleet:'Right toy. Only the whole battle line can block the strait from shore to shore.',
       gr_west:'Not this toy. The Corinthians are too few to block the strait, and they are watching the western channel.',
       gr_hopl:'Not this toy. Soldiers on the beach cannot decide a battle at sea.'},
  fbZ:{narrows:'Right place. In the narrows, only the front few Persian ships can fight. The rest get in the way.',
       open:'Not here. In open water, the bigger Persian fleet can spread out and surround you.',
       isthmus:'Not here. The Egyptian squadron blocked the western channel in the night. There is no way out.',
       shore:'Not here. With no battle, the Greek alliance falls apart and the ships go home one city at a time.'},
  fail:{
    'gr_fleet@open':{fire:[['pe_fleet','$','arrows'],['pe_psy','$','arrows']],
      b:'The Greek line rows out into the wide water at the mouth of the strait. The bigger Persian fleet spreads out around it and closes in.'},
    'gr_fleet@isthmus':{fire:[['pe_egy','$','ram']],
      b:'The Greek fleet tries to slip away west, but Egyptian ships sent round Salamis in the night are blocking the channel. Strung out and running, the Greeks are caught.'},
    'gr_fleet@shore':{ko:[],idle:['$'],
      b:'The fleet stays on the beaches. The Persians have no reason to row into the narrows, so they wait. Without a battle, the Greek alliance starts to break up.'},
    'gr_west@narrows':{u:{pe_egy:[60,87]},fire:[['pe_egy','gr_fleet','arrows']],ko:[],idle:['$'],
      b:'The Corinthians join the main line, but nobody is watching the western channel. The Egyptian squadron rows in behind the Greek fleet.'},
    'gr_west@open':{fire:[['pe_fleet','$','arrows'],['pe_psy','$','arrows']],
      b:'A small squadron rowing out alone into open water, straight at the whole Persian fleet. It does not last long.'},
    'gr_west@isthmus':{fire:[['pe_egy','$','ram']],
      b:'Sailing west takes the Corinthians straight into the Egyptian squadron blocking the channel.'},
    'gr_west@shore':{u:{pe_egy:[60,87]},fire:[['pe_egy','gr_fleet','arrows']],ko:[],idle:['$'],
      b:'With the Corinthians beached, the western channel is left open. The Egyptian squadron rows in behind the Greek fleet.'},
    'gr_hopl@narrows':{ko:[],idle:['$'],
      b:'The hoplites crowd onto the shore of the narrows, but soldiers on a beach cannot stop ships. The battle line has not formed up to fight.'},
    'gr_hopl@open':{fire:[['pe_psy','$','arrows'],['pe_fleet','$','arrows']],
      b:'The hoplites row out in small boats to the mouth of the strait, right in front of the Persian fleet.'},
    'gr_hopl@isthmus':{fire:[['pe_egy','$','ram']],
      b:'Loading the hoplites into boats for the Isthmus puts them in the path of the Egyptian squadron.'},
    'gr_hopl@shore':{ko:[],idle:['$'],
      b:'The hoplites wait on the beach. They will matter later, but right now the battle at sea decides everything, and the fleet has not lined up to fight.'}},
  clues:[
    {cat:'e',t:'Too many ships',b:'The Persians have far more ships than you. In open water they can spread out and surround you.'},
    {cat:'e',card:'phoenician480'},
    {cat:'t',t:'The strait',b:'Between Salamis and the mainland, the channel narrows sharply. A fleet that comes in has to squeeze together.'},
    {cat:'tr',card:'trireme480'},
    {cat:'m',t:'Make numbers useless',b:'In a narrow channel, only the front ships can fight. The rest just get in the way.'}],
  deduce:[['The Persian fleet is much bigger than yours.','Do not fight where it can spread out.'],
          ['The strait narrows sharply between Salamis and the mainland.','Only a few ships can fight there at once.'],
          ['Your heavy triremes are built to ram, not to out-sail anyone.','Line them up across the narrows and let the Persians come to you.']],
  /* The real battle. North is up. Salamis is to the southwest, the mainland to the northeast, open sea to the southeast. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={gr_fleet:[150,150],gr_ath:[195,190],gr_west:[60,87],gr_them:[100,143],gr_hopl:[150,253],
           pe_fleet:[350,340],pe_ion:[310,376],pe_egy:[380,370],pe_psy:[380,300,'off'],pe_xerxes:[380,180]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{},{t:'Cornered',b:'Athens has been burned. About 370 Greek triremes wait in the strait beside Salamis, and many allied commanders want to fall back to the Isthmus. The Persian fleet lies out in open water.'});
    add(0,{pe_egy:[10,392],pe_psy:[290,293],pe_xerxes:[300,160]},{a:[['t',380,370,14,390]],t:'A secret message',b:'Herodotus says Themistocles sent a slave to tell Xerxes the Greeks were about to flee. Xerxes sends a squadron round the island and lands troops on Psyttaleia.'});
    add(1,{pe_egy:[10,85],pe_fleet:[296,333],pe_ion:[262,366]},{a:[['t',10,392,10,90],['t',350,340,300,334]],t:'All night at the oars',b:'Through the night, the Persian crews row to block every way out of the strait. By dawn they have been at their oars for hours.'});
    add(1,{pe_fleet:[232,226],pe_ion:[262,262],gr_fleet:[175,165],gr_ath:[200,195]},{a:[['t',296,333,236,232],['t',262,366,262,268]],t:'Into the narrows',b:'At dawn the Persian ships row into the strait, squeezing together as it narrows. Xerxes watches from a throne on the mountainside.'});
    add(2,{gr_fleet:[205,200],gr_ath:[240,205],pe_fleet:[226,220,'ko']},{a:[['g',175,165,203,196],['g',200,195,238,202]],t:'Rams',b:'The Greek line surges forward and rams. The crowded Persian ships in front cannot turn or back away.',
      fire:[['gr_fleet','pe_fleet','ram'],['gr_ath','pe_fleet','ram']]});
    add(2,{gr_ath:[245,215],pe_ion:[250,240,'ko']},{a:[['t',262,262,252,244]],t:'Jammed',b:'Ships behind push forward into the wrecks ahead. In the cramped strait the huge Persian numbers become a hindrance, and the fleet falls into confusion.',
      fire:[['gr_ath','pe_ion','ram']]});
    add(2,{gr_hopl:[282,284],pe_psy:[290,293,'ko']},{a:[['g',150,253,278,282]],t:'Psyttaleia',b:'Greek hoplites cross to the little island of Psyttaleia and kill the Persian troops who landed there.',
      fire:[['gr_hopl','pe_psy','clash']]});
    add(2,{pe_xerxes:[400,160,'exit'],pe_egy:[0,85,'exit']},{t:'Xerxes goes home',b:'The beaten Persian fleet pulls back. Without control of the sea, Xerxes soon heads back to Asia with much of his army.'});
    return S;
  })(),
  video:{id:'Hwz56hBW9KI',t:'Salamis 480 BC: The Battle for Greece',ch:'Epic History',v:2940729},
  sources:[['Britannica: Battle of Salamis','https://www.britannica.com/event/Battle-of-Salamis'],
           ['Livius: Salamis (480 BCE)','https://livius.org/articles/battle/salamis-480-bce'],
           ['History Skills: how did the Greeks win the Battle of Salamis?','https://www.historyskills.com/classroom/ancient-history/anc-salamis-reading'],
           ['History Revealed: Salamis, 480 BC','https://www.historyrevealed.com/period/ancient-greece/battle-salamis-480-bc-facts-what-happened-who-won']],
  cards:{gr_fleet:'trireme480',gr_ath:'trireme480',gr_west:'trireme480',gr_hopl:'marine480',pe_fleet:'phoenician480',pe_ion:'ionian480',pe_egy:'ionian480'}
});
