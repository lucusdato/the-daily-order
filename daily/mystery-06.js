/* The Daily Order: mystery battles from day 22 (Dien Bien Phu).
   Positions are written for a 400 square board and stretched to the 600 tall board when loaded. */

PGD.mystery(5,{
  war:'First Indochina War',
  general:'Vo Nguyen Giap',
  pitch:'You are <b>Vo Nguyen Giap</b>, commander of the Viet Minh army. The French have built a fortified camp in a remote valley, supplied by air, and they hope you will throw your army against it. You hold the hills all around. Destroy the camp.',
  H:600,
  terrain(){
    let s=felt('#9aa56a',600);
    s+=`<path d="M60 105 Q200 60 340 105 Q370 300 330 510 Q200 570 70 510 Q30 300 60 105 Z" fill="rgba(255,240,200,.18)"/>`;
    s+=river('M228 0 Q214 180 226 330 Q236 480 220 600',6);
    s+=`<rect x="186" y="180" width="12" height="270" rx="2" fill="#c9b789" stroke="#6b5838"/><path d="M192 189 V441" stroke="#fff" stroke-dasharray="6 6" stroke-width="1"/>`;
    [[20,60],[60,24],[120,15],[200,12],[280,15],[340,27],[384,66],[392,180],[390,300],[386,420],[370,525],[300,585],[200,591],[110,582],[30,525],[12,405],[10,285],[14,165]].forEach((p,i)=>s+=mtn(p[0],p[1]+22,20+(i%3)*5,'#b9b08f'));
    s+=trees(7,60,[0,400,0,600],(x,y)=>{const dx=(x-200)/170,dy=(y-308)/255;return dx*dx+dy*dy>0.85;},['#2f5a24','#3b6b2b','#2a4f20']);
    s+=label(170,168,'Airstrip',9,-90)+label(246,495,'Nam Yum River',8,-80)+label(200,72,'Gabrielle',9)+label(300,145,'Béatrice',9)+label(290,300,'Dominique, Éliane',8)+label(116,312,'Huguette',9)+label(210,556,'Isabelle',9)+label(206,384,'Main camp',8);
    s+=compass(26,576);
    return s+end(600);
  },
  lead:'Late 1953. The war over French rule in Indochina is seven years old. French paratroopers have taken the valley of Dien Bien Phu, near Laos, and built a ring of strongpoints round an airstrip. They hope to draw your army into a battle where their firepower will crush it.',
  sit:'February 1954. You have called off the fast attack. Now your field guns are being dragged in by hand over the mountains, some weighing two tons. Before the next attack, every gun needs a place to fight from.',
  mett:{
    m:'Destroy the French camp at Dien Bien Phu.',
    e:'About 11,000 French Union troops at the start, later more, in strongpoints round an airstrip, with guns, tanks and planes.',
    t:'A flat valley with a river down the middle. Your army holds the forested hills on every side, looking down into it.',
    tr:'About 50,000 soldiers in four infantry divisions, with field guns and anti-aircraft guns, and tens of thousands of porters.',
    ti:'Everything the French need comes in by air. Everything you need comes over the mountains on foot and by bicycle.'},
  ground:[['Key terrain','The airstrip: the camp\'s only way to get supplies.',[192,210,30]],
          ['Key terrain','The hills all round the valley, in your hands.',[340,160,30]],
          ['Obstacle','Open, flat ground on the valley floor, swept by French guns.',[250,290,30]]],
  q:'Your field guns have arrived. Which toy, sent where, can hit the camp without being knocked out?',
  qs:'The guns are here: which toy goes where?',
  toys:[['v_art','Field guns','your field guns'],['v_aa','Anti-aircraft guns','the anti-aircraft guns'],['v_supply','Porters','the porters']],
  zones:[['slopes','Dug into slopes',335,150,22,'into tunnels dug in the slopes facing the camp'],['crest','Open hilltops',372,215,20,'out in the open on the hilltops'],
         ['far','Far back',385,300,20,'far back behind the hills, out of sight'],['valley','Valley floor',262,300,20,'down onto the flat valley floor']],
  ans:{u:'v_art',z:'slopes'},
  start:{v_art:[370,35],v_aa:[60,40],v_308:[70,120],v_312:[350,70],v_316:[365,250],v_supply:[378,372],v_giap:[60,330],
         f_bea:[296,106],f_gab:[200,62],f_dom:[262,210],f_hug:[150,220],f_isa:[210,350],f_air:[192,200],f_cmd:[206,240]},
  fbU:{v_art:'Right toy. Only the field guns can smash bunkers and close the airstrip.',
       v_aa:'Not this toy. Anti-aircraft guns shoot at planes. It is the field guns that break bunkers.',
       v_supply:'Not this toy. The porters carry the shells. They do not fire them.'},
  fbZ:{slopes:'Right place. From a tunnel, a gun is rolled out onto a terrace, fires straight at a target it can see, and is pulled back under cover.',
       crest:'Out in the open, every gun is a target for the French guns and planes.',
       far:'Your gun crews have never fired at targets they cannot see. They need to aim straight at the camp.',
       valley:'On the flat valley floor, the French guns, tanks and planes would find them at once.'},
  fail:{
    'v_art@crest':{fire:[['$','f_dom','cannon'],['f_cmd','$','cannon']],ko:['$'],
      b:'Your guns open fire from the open hilltops. The French see the flashes, their own guns answer, and battery after battery is knocked out.'},
    'v_art@far':{ko:[],idle:['$'],
      b:'From there your crews cannot see the camp, and their shells fall wide.'},
    'v_art@valley':{fire:[['f_cmd','$','cannon'],['f_dom','$','rifle']],ko:['$'],
      b:'Your guns are dragged down onto the open valley floor. French guns and planes find them before they can do much.'},
    'v_aa@slopes':{ko:[],idle:['$'],
      b:'The anti-aircraft guns go into the tunnels, but they are made for planes, not bunkers. The bunkers stand, and the airstrip stays open.'},
    'v_aa@crest':{fire:[['f_cmd','$','cannon']],ko:['$'],
      b:'Aimed at the sky, they do nothing to the bunkers below, and the French guns can see them.'},
    'v_aa@far':{ko:[],idle:['$'],
      b:'The anti-aircraft guns go far back, where the supply planes are out of their reach.'},
    'v_aa@valley':{fire:[['f_cmd','$','cannon'],['f_dom','$','rifle']],ko:['$'],
      b:'The anti-aircraft guns are dragged onto the open valley floor, right under the French guns.'},
    'v_supply@slopes':{ko:[],idle:['$'],
      b:'The porters dig the tunnels, but the guns that should fill them are still out on the trail.'},
    'v_supply@crest':{ko:[],idle:['$'],
      b:'The porters climb the open hilltops with their loads. The guns are still not in place.'},
    'v_supply@far':{ko:[],idle:['$'],
      b:'The porters wait far back with the shells. Nobody has put the guns anywhere useful.'},
    'v_supply@valley':{fire:[['f_cmd','$','cannon']],ko:[],
      b:'The porters come down onto the valley floor and are shelled by the French guns. The field guns are still not in place.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {start:{v_art:[370,35],v_aa:[60,40],v_308:[90,140],v_312:[340,90],v_316:[345,235],v_supply:[378,372],v_giap:[60,330],
            f_bea:[296,106],f_gab:[200,62],f_dom:[262,210],f_hug:[150,220],f_isa:[210,350],f_air:[192,200],f_cmd:[206,240]},
     after:[0],
     qs:'The attack is set: where do they go?',
     sit:'25 January 1954. Your army has surrounded the French camp. Your staff has planned a fast, all-out assault for this evening, to finish the battle in a few days.',
     q:'Your three divisions are ready. Where do you send them?',
     intel:[['Your guns','Not all of your artillery has reached its positions.'],
            ['The French','They have made their defenses stronger. A captured soldier has told them the time of your attack.'],
            ['Your army','It has never attacked a camp this big, defended by tanks, heavy guns and planes.']],
     toys:[['v_312','312th Division','the 312th Division'],['v_308','308th Division','the 308th Division'],['v_316','316th Division','the 316th Division']],
     zones:[['camp','Into the camp',230,250,22,'straight into the main camp tonight'],['gab','Onto Gabrielle',200,92,20,'onto Gabrielle tonight'],
            ['isa','Onto Isabelle',240,350,20,'south onto Isabelle tonight'],['back','Back to wait',382,170,20,'back into the hills to wait']],
     ans:{u:['v_312','v_308','v_316'],z:'back'},
     hint:{z:'The French know when you are coming. Ask whether tonight is the night.'},
     fbU:{v_312:'Right toy. All your infantry gets the same order. The question is whether to attack at all.',
          v_308:'Right toy. All your infantry gets the same order. The question is whether to attack at all.',
          v_316:'Right toy. All your infantry gets the same order. The question is whether to attack at all.'},
     fbZ:{back:'Right place. Your guns are not all in place, and the French know when you are coming. Wait until you are sure.',
          camp:'Charging a camp that knows you are coming, without all your guns, is the kind of fight that wrecks an army.',
          gab:'Gabrielle is waiting for you too. The French know the time of the attack, and your guns are not all in place.',
          isa:'Isabelle is just as ready. The problem is not where to attack, but when.'},
     fail:{back:{ko:[],idle:['$']},
           camp:{ko:[],fire:[['f_cmd','$','cannon'],['f_hug','$','rifle']]},
           gab:{ko:[],fire:[['f_gab','$','rifle']]},
           isa:{ko:[],fire:[['f_isa','$','rifle']]}}},
    {after:[1,2],
     hint:{u:'Which of these can break a bunker?',z:'Any gun the French can see, they will hit. Where can a gun see them without being seen?'},
     intel:[['French guns','The camp has its own artillery and planes, ready to hit any gun they can see.'],
            ['Your gunners','Most have never fired at targets they cannot see.'],
            ['The hills','They rise straight up from the edge of the valley, and you can dig into them.']]},
    {from:2, after:[3,4,5,6,7],
     qs:'The first blow: which toy goes where?',
     sit:'13 March 1954. Your guns are dug in all round the valley, and seven weeks after you called off the first attack, you are ready. Now you must choose where the first blow falls.',
     q:'Which division, sent where, strikes first?',
     intel:[['Béatrice','A strongpoint on a hill at the north-east edge of the camp, held by a Foreign Legion battalion.'],
            ['The center','The main camp has most of the French guns, tanks and men.'],
            ['Your divisions','The 312th is on the hills to the north-east, the 308th to the west, the 316th to the east.']],
     toys:[['v_312','312th Division','the 312th Division'],['v_308','308th Division','the 308th Division'],['v_316','316th Division','the 316th Division']],
     zones:[['bea','Onto Béatrice',296,106,20,'onto Béatrice, the strongpoint on the north-east hill'],['camp','Into the camp',230,250,22,'straight into the main camp'],
            ['isa','Onto Isabelle',240,350,20,'south onto Isabelle'],['hug','Onto Huguette',140,250,20,'onto Huguette, beside the airstrip']],
     ans:{u:'v_312',z:'bea'},
     hint:{u:'Which division already stands on the hills right above the target?',z:'Start where help from the main camp can reach least.'},
     fbU:{v_312:'Right toy. The 312th Division is on the hills right above Béatrice.',
          v_308:'Not this toy. The 308th is on the far side of the valley. Moving it round takes time and shows your plan.',
          v_316:'Not this toy. The 316th faces Dominique and Éliane, farther from Béatrice than the 312th.'},
     fbZ:{bea:'Right place. Béatrice stands on its own at the edge of the camp, where help from the center can reach it least.',
          camp:'The center has the most guns, tanks and men. Attacking it first is the head-on fight you called off in January.',
          isa:'Isabelle is far to the south. Taking it does nothing about the main airstrip and the strongpoints round it.',
          hug:'Huguette sits right beside the airstrip and the main camp. Attack there, and the whole garrison can help it.'},
     fail:{bea:{ko:[],fire:[['$','f_bea','clash'],['f_bea','$','rifle']]},
           camp:{ko:[],fire:[['f_cmd','$','cannon'],['f_hug','$','rifle']]},
           isa:{ko:[],fire:[['f_isa','$','rifle']]},
           hug:{ko:[],fire:[['f_hug','$','rifle'],['f_cmd','$','cannon']]}}}],
  clues:[
    {cat:'m',t:'Seen means hit',b:'The French have guns and planes ready. Any gun of yours they can see, they will hit.'},
    {cat:'e',card:'fug1954'},
    {cat:'m',t:'Aim at what you see',b:'Your gun crews are new to battles this big. They hit best when they can see the target.'},
    {cat:'tr',card:'vmart1954'},
    {cat:'m',t:'Hide and strike',b:'Dig each field gun into a tunnel in the slope facing the camp. Roll it out, fire, and roll it back in.'}],
  deduce:[['Only the field guns can break bunkers.','Send the field guns.'],
          ['French guns and planes hit any gun they can see.','Keep the guns under cover.'],
          ['Your crews aim best at targets they can see.','Dig them into the slopes facing the camp.']],
  /* The real battle. North is up. The airstrip runs north to south down the valley; the Viet Minh hold the hills all round. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={v_art:[370,35],v_aa:[60,40],v_308:[90,140],v_312:[340,90],v_316:[345,235],v_supply:[378,372],v_giap:[60,330],
           f_bea:[296,106],f_gab:[200,62],f_dom:[262,210],f_hug:[150,220],f_isa:[210,350],f_air:[192,200],f_cmd:[206,240]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{v_308:[70,120],v_312:[350,70],v_316:[365,250]},{a:[['gd',90,140,72,122],['gd',340,90,350,72],['gd',345,235,363,248]],t:'Called off',b:'On 26 January Giap cancels the attack. He later calls it the hardest decision of his military career. The plan changes from "fast strike, fast victory" to "steady fight, steady advance".'});
    add(0,{v_art:[335,150]},{a:[['g',370,35,380,100,338,146]],t:'Seven nights a gun',b:'Guns of up to two tons are hauled through the jungle by hand, with ropes, levers and pulleys, about seven nights for each gun. When one starts to slide downhill, a soldier named To Vinh Dien throws himself under its wheel to stop it. The guns go into tunnels dug into the slopes facing the camp.'});
    add(1,{v_aa:[100,90],v_supply:[352,330]},{a:[['g',60,40,98,88],['g',378,372,354,334]],t:'Waiting',b:'Anti-aircraft guns ring the valley, ready for the supply planes. Tens of thousands of porters, with bicycles and carrying poles, bring up food and shells along the mountain trails.'});
    add(1,{v_312:[300,96],f_bea:[296,106,'ko']},{a:[['g',350,70,302,94]],t:'Béatrice',b:'On 13 March your guns open fire. Sappers of the 312th Division cut through the barbed wire, and two of its regiments storm Béatrice. It falls in a single night.',
      fire:[['v_art','f_bea','cannon'],['v_312','f_bea','clash'],['f_bea','v_312','rifle']]});
    add(1,{v_308:[196,76],f_gab:[200,62,'ko'],f_air:[240,40]},{a:[['g',70,120,192,76]],t:'Gabrielle and the airstrip',b:'Your shells wreck the airstrip, and from now on supplies must be dropped by parachute. On the night of 14 March two regiments of the 308th Division storm Gabrielle. The French artillery chief, unable to silence your hidden guns, kills himself with a grenade.',
      fire:[['v_art','f_air','cannon'],['v_308','f_gab','clash'],['f_gab','v_308','rifle']]});
    add(2,{v_312:[290,180],v_316:[292,222]},{a:[['g',300,96,290,176],['g',365,250,296,224]],t:'The five hills',b:'On 30 March the 312th and 316th Divisions attack the hills east of the river, Dominique and Éliane. They take some of them, but the French hold on to others, and your losses are heavy.',
      fire:[['v_art','f_dom','cannon'],['v_312','f_dom','clash'],['v_316','f_dom','clash'],['f_dom','v_316','rifle']]});
    add(2,{v_308:[150,180],v_316:[300,234]},{a:[['g',196,76,152,176]],t:'The trenches',b:'Giap stops throwing men at the wire. His soldiers dig trenches closer and closer to each strongpoint. By 22 April they hold nine-tenths of the airstrip, and the French can no longer drop supplies accurately.',
      fire:[['v_308','f_hug','rifle'],['f_hug','v_308','rifle'],['v_aa','f_air','cannon']]});
    add(2,{v_312:[232,236],v_316:[264,214],v_308:[160,214],f_dom:[262,210,'ko'],f_hug:[150,220,'ko'],f_cmd:[206,240,'ko'],f_isa:[210,350,'ko'],f_air:[240,10,'exit']},{t:'7 May',b:'After weeks of trench fighting, Giap orders an all-out attack. On 7 May the main camp falls, and the last strongpoints give up that night. About 11,700 French Union soldiers are taken prisoner. Weeks later, peace talks at Geneva end French rule in Indochina.',
      fire:[['v_316','f_dom','clash'],['v_308','f_hug','clash'],['v_312','f_cmd','clash'],['v_art','f_isa','cannon']]});
    return S;
  })(),
  video:{id:'dZUmgavuC68',t:'Why France Lost The Battle of Dien Bien Phu 1954 (4K Documentary)',ch:'Real Time History',v:2000000},
  sources:[['Wikipedia: Battle of Dien Bien Phu','https://en.wikipedia.org/wiki/Battle_of_Dien_Bien_Phu'],
           ['Encyclopedia of the Indochina War (UQAM): Dien Bien Phu, cancellation of the first attack','https://indochine.uqam.ca/fr/le-dictionnaire/404-in-bien-ph-cancellation-of-first-attack.html'],
           ['Wikipedia: To Vinh Dien','https://en.wikipedia.org/wiki/T%C3%B4_V%C4%A9nh_Di%E1%BB%87n'],
           ['HISTORY: Battle of Dien Bien Phu','https://www.history.com/topics/france/battle-of-dien-bien-phu'],
           ['Warfare History Network: Five Hills at Dien Bien Phu','https://warfarehistorynetwork.com/article/five-hills-at-dien-bien-phu/'],
           ['HistoryNet: Giap at Dien Bien Phu, 1954','https://historynet.com/giap-dien-bien-phu-1954-take-command/']],
  cards:{v_art:'vmart1954',v_aa:'vmaa1954',v_308:'vminf1954',v_312:'vminf1954',v_316:'vminf1954',v_supply:'porter1954',
         f_bea:'fug1954',f_gab:'fug1954',f_dom:'fug1954',f_hug:'fug1954',f_isa:'fug1954',f_air:'dakota1954'}
});

/* ===== Leuthen, day 23 ===== */
PGD.mystery(6,{
  war:'Seven Years\' War',
  general:'Frederick the Great',
  pitch:'You are <b>Frederick the Great</b>, King of Prussia. An Austrian army about twice the size of yours stands between you and Silesia, and winter is coming. Win the province back in one short December day.',
  H:600,
  terrain(){
    let s=felt('#9ba478',600)+`<rect width="400" height="600" fill="url(#snow)"/>`;
    s+=road('M0 230 Q60 226 100 228 Q180 236 250 306 Q300 330 400 320');
    [[150,330,24,42],[156,440,26,50],[170,530,24,40],[122,282,18,24],[188,372,18,22]].forEach(h=>s+=hill(h[0],h[1],h[2],h[3],2));
    s+=house(92,224)+house(104,230,'#8a3a2a')+house(262,72)+house(272,78,'#8a3a2a')+house(248,150)+house(246,302)+house(258,310,'#8a3a2a')+house(252,294)+house(166,268)+house(282,494)+house(292,500,'#8a3a2a')+house(204,556);
    s+=trees(17,14,[320,395,0,600],()=>true,['#3b5f2d','#2f5a24']);
    s+=label(96,212,'Borne',9)+label(266,58,'Nippern',9)+label(248,136,'Frobelwitz',8)+label(262,286,'Leuthen',10)+label(164,256,'Radaxdorf',8)+label(292,520,'Sagschütz',9)+label(206,576,'Lobetinz',8);
    s+=label(150,388,'Low hills',8)+label(118,312,'Sophienberg',7)+label(190,402,'Butterberg',7);
    s+=compass(382,576);
    return s+end(600);
  },
  lead:'December 1757, the Seven Years\' War. Austria has taken back most of Silesia from Prussia, and its army stands in a long line near the village of Leuthen. You have marched to meet it with an army about half its size. "I must conquer or die," you have told your officers.',
  sit:'Late morning, 5 December 1757. Your cavalry is showing itself in front of the Austrian right wing, and it has worked: the Austrian reserves are marching north to help. Your main army is still near Borne. Now you must decide where the real blow falls.',
  mett:{
    m:'Defeat the Austrian army and win Silesia back before winter.',
    e:'About 65,000 Austrians and their German allies, in a line about 8 km long facing west, with about 210 guns.',
    t:'Rolling farmland in winter. A line of low hills runs south from Borne, between the two armies.',
    tr:'About 33,000 well drilled Prussians with about 167 guns, among them heavy 12-pounders the soldiers call Brummers.',
    ti:'One short December day. Austria holds Silesia, so time is on its side.'},
  ground:[['Key terrain','The low hills south of Borne, which hide a march from the Austrian line.',[150,300,30]],
          ['Key terrain','The south end of the Austrian line, at Sagschütz.',[272,322,26]],
          ['Obstacle','Open ground in front of the Austrian center, in full view of their line.',[200,190,28]]],
  q:'The Austrian reserves have gone north. Which toy, sent where, delivers the real blow?',
  qs:'The real blow: which toy goes where?',
  toys:[['p_inf1','Infantry columns','your infantry columns'],['p_adv','Advance guard','the advance guard cavalry'],['p_art','Heavy guns','the heavy guns']],
  zones:[['south','South end',212,345,22,'south behind the hills, onto the far end of their line'],['center','At Leuthen',190,200,22,'straight at Leuthen, the middle of their line'],
         ['north','At Nippern',200,70,22,'north, onto their right wing at Nippern'],['dig','Dig in',30,280,20,'back to dig in west of Borne']],
  ans:{u:'p_inf1',z:'south'},
  start:{p_adv:[160,95],p_inf1:[80,180],p_inf2:[60,200],p_art:[70,222],p_cav:[50,160],p_fred:[100,165],
         a_right:[262,60],a_center:[262,170],a_left:[272,320],a_res:[300,90],a_cav:[300,112],a_charles:[305,200]},
  fbU:{p_inf1:'Right toy. Only the infantry can break their line and take the ground. The guns can follow it.',
       p_adv:'Not this toy. The advance guard is the feint. If it rides away, the Austrians stop looking north.',
       p_art:'Not this toy. The heavy guns can batter a line, but they cannot take it. Send the infantry and let the guns follow.'},
  fbZ:{south:'Right place. Behind the hills nobody sees you coming, and their reserves have just marched the other way.',
       center:'The middle of their line is in plain view, and they have about twice your numbers.',
       north:'Their reserves have just marched north. That is now the strongest part of their line.',
       dig:'Austria holds Silesia and winter is coming. If you wait, they win without a fight.'},
  fail:{
    'p_inf1@center':{fire:[['a_center','$','musket']],ko:['$'],
      b:'Your infantry marches straight at Leuthen across open ground, in full view of the whole Austrian line. Twice your number are waiting for it, and its attack is shot to pieces.'},
    'p_inf1@north':{fire:[['a_right','$','musket'],['a_res','$','musket']],ko:['$'],
      b:'Your infantry attacks the Austrian right just as their reserves arrive there. It runs into earthworks, grenadiers and fresh troops, and is thrown back.'},
    'p_inf1@dig':{ko:[],idle:['$'],
      b:'Your infantry digs in west of Borne. The Austrians hold Silesia and have no reason to attack. The day ends, and the chance is gone.'},
    'p_adv@south':{fire:[['a_left','$','musket']],ko:['$'],
      b:'The advance guard leaves the feint and rides south. It is far too small to break a line alone, and with nobody threatening them any more, the Austrians on the right relax.'},
    'p_adv@center':{fire:[['a_center','$','musket']],ko:['$'],
      b:'The advance guard rides at the Austrian center. A few squadrons of horsemen cannot break a line of infantry, and the feint in the north is over.'},
    'p_adv@north':{fire:[['a_right','$','musket']],ko:['$'],
      b:'The advance guard charges the earthworks it was only meant to threaten. Grenadiers behind them shoot it down, and the main army is still at Borne.'},
    'p_adv@dig':{ko:[],idle:['$'],
      b:'The feint stops. The Austrians on the right stop worrying, and their reserves are free to go wherever they are needed.'},
    'p_art@south':{fire:[['$','a_left','cannon'],['a_left','$','musket']],ko:['$'],
      b:'The heavy guns are dragged south behind the hills and open up on the far end of the line. With no infantry beside them, Austrian troops come forward and take them.'},
    'p_art@center':{fire:[['$','a_center','cannon'],['a_center','$','musket']],ko:['$'],
      b:'The heavy guns pound the Austrian center for a while. Nobody follows up, the line stays where it is, and the Austrians move up guns of their own.'},
    'p_art@north':{fire:[['a_right','$','musket']],ko:['$'],
      b:'The heavy guns roll north, straight toward the Austrian reserves. Slow and alone, they are overrun.'},
    'p_art@dig':{ko:[],idle:['$'],
      b:'The guns are dug in west of Borne, too far from the Austrian line to matter, and nobody attacks.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say. */
  stepsLive:true,
  steps:[
    {start:{p_adv:[110,140],p_inf1:[80,180],p_inf2:[60,200],p_art:[70,222],p_cav:[50,160],p_fred:[100,165],
            a_right:[262,60],a_center:[262,170],a_left:[272,320],a_res:[310,230],a_cav:[300,112],a_charles:[305,200]},
     after:[0],
     qs:'Fool the Austrians: which toy goes where?',
     sit:'Dawn, 5 December 1757. Your hussars have swept the Austrian outposts out of Borne in the fog. From the heights beyond the village you can see the whole Austrian line: long, and only three ranks deep. You mean to march most of your army round one end of it and strike there. First, the Austrians must be made to look somewhere else.',
     q:'Which toy, sent where, keeps the Austrians from watching your real march?',
     intel:[['The ground','North of Borne the ground is open, and the Austrian right can see everything that moves there. South of Borne, a line of low hills can hide an army on the march.'],
            ['The Austrian right','The strongest part of their line, round Nippern, with grenadiers, cavalry and earthworks.'],
            ['Your army','The infantry and the heavy guns will be needed for the real attack. The advance guard cavalry is fast, and can show itself and pull back.']],
     toys:[['p_adv','Advance guard','the advance guard cavalry'],['p_inf1','Infantry columns','your infantry columns'],['p_art','Heavy guns','the heavy guns']],
     zones:[['show','Face their right',160,95,22,'out into the open, in front of the Austrian right'],['center','At Leuthen',190,200,22,'straight at Leuthen, the middle of their line'],
            ['hills','Behind the hills',150,300,22,'south, behind the low hills'],['back','Back west',25,280,20,'back west, away from the Austrians']],
     ans:{u:'p_adv',z:'show'},
     hint:{u:'Send the troops you can spare from the real attack, and that can get away fast.',z:'A feint only works if the enemy can see it.'},
     fbU:{p_adv:'Right toy. The advance guard is fast and you can spare it. The infantry and guns are kept for the real blow.',
          p_inf1:'Not this toy. The infantry is your real attack. Spend it on a show, and nothing is left for the blow.',
          p_art:'Not this toy. The heavy guns are slow, and they are needed for the real attack.'},
     fbZ:{show:'Right place. The Austrian right can see every move out there, and it will think the whole army is coming.',
          center:'Riding at the middle of their line starts a real fight there, not a show, and points their eyes at Leuthen.',
          hills:'Behind the hills nobody sees you. A feint that nobody sees fools nobody.',
          back:'Pulling back west shows the Austrians nothing they need to worry about.'},
     fail:{show:{ko:[],idle:['$']},
           center:{ko:[],fire:[['a_center','$','musket']]},
           hills:{ko:[],idle:['$']},
           back:{ko:[],idle:['$']}}},
    {after:[1,2,3],
     hint:{u:'Ask which of these can take a line and hold the ground, not just hit it.',z:'Their reserves have just marched one way. Think about the other end, and how to get there unseen.'},
     intel:[['The hills','A line of low hills runs south from Borne. Troops marching behind them cannot be seen from the Austrian line.'],
            ['The south end','The far left of the Austrian line, at Sagschütz, is held by Württemberg and Bavarian troops.'],
            ['The reserves','They have marched north to help the Austrian right, where your cavalry is showing itself.']]},
    {from:3, start:{a_cav:[222,140],p_cav:[130,190,'hide']}, after:[4,5],
     qs:'Their cavalry charges: which toy goes where?',
     sit:'About 4.30 in the afternoon. Your infantry has fought its way into Leuthen, and your heavy guns stand on the Butterberg. Now Lucchesi leads the Austrian cavalry of the right wing south, against the open side of your infantry and the guns.',
     q:'Which toy, sent where, stops the Austrian charge?',
     intel:[['Lucchesi','His squadrons are fresh. To hit your infantry, they have to swing across your front.'],
            ['Your left','Driesen\'s cavalry of the left wing is waiting out of sight behind the Sophienberg.'],
            ['Your infantry','It is locked in the fight round Leuthen and cannot turn without letting go of the village.']],
     toys:[['p_cav','Driesen\'s cavalry','Driesen\'s cavalry'],['p_inf2','Second line','the second line of infantry'],['p_art','Heavy guns','the heavy guns']],
     zones:[['flank','Their side',170,135,20,'out of cover into the side of the Austrian cavalry'],['meet','Head on',215,195,18,'head on into the front of the charge'],
            ['east','East of Leuthen',305,240,20,'round the east end of Leuthen'],['back','Back west',60,265,20,'back west, out of the way']],
     ans:{u:'p_cav',z:'flank'},
     hint:{u:'Horsemen are best stopped by horsemen.',z:'They do not know Driesen is there, and to reach your infantry they must turn their side to him.'},
     fbU:{p_cav:'Right toy. Fresh cavalry, hidden and close, is the one force fast enough to catch a charge.',
          p_inf2:'Not this toy. Infantry on the move in the open is just what cavalry hopes to catch.',
          p_art:'Not this toy. Guns being dragged about under a cavalry charge are taken before they can fire.'},
     fbZ:{flank:'Right place. A cavalry charge is weakest from the side, and they never saw Driesen waiting.',
          meet:'Meeting a fresh charge head on is an even fight, and it wastes the surprise.',
          east:'East of Leuthen is the far end of the fight. The charge would hit your infantry while you are away.',
          back:'Pulling away leaves your infantry and guns open to the charge.'},
     fail:{flank:{ko:[],fire:[['a_cav','$','clash']]},
           meet:{ko:[],fire:[['a_cav','$','clash']]},
           east:{ko:[],fire:[['a_res','$','musket']]},
           back:{ko:[],idle:['$']}}}],
  clues:[
    {cat:'m',t:'Two to one',b:'The Austrians have about twice your numbers. You cannot win by fighting their whole line at once.'},
    {cat:'e',card:'austinf1757'},
    {cat:'e',t:'Looking north',b:'Your feint has worked. The Austrian reserves have marched north to help their right wing.'},
    {cat:'tr',card:'prinf1757'},
    {cat:'m',t:'Out of sight',b:'Send the infantry south behind the low hills, round the far end of their line, and hit it where the reserves have just left.'}],
  deduce:[['You are outnumbered about two to one.','Do not fight their whole line.'],
          ['Their reserves have marched north.','Strike the south end.'],
          ['The low hills hide a march.','Send the infantry behind them.']],
  /* The real battle. North is up. The Austrians stand in a line facing west, their right at Nippern, their left at Sagschütz. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={p_adv:[110,140],p_inf1:[80,180],p_inf2:[60,200],p_art:[70,222],p_cav:[50,160],p_fred:[100,165],
           a_right:[262,60],a_center:[262,170],a_left:[272,320],a_res:[310,230],a_cav:[300,112],a_charles:[305,200]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{p_adv:[160,95],a_res:[300,90]},{a:[['g',110,140,158,97],['t',310,230,320,150,302,94]],t:'The feint',b:'Prussian cavalry forms up in front of the Austrian right, as if to attack, while columns march noisily to and fro. Lucchesi, commanding the cavalry there, is sure the whole Prussian army is coming at him and begs for help. At midday Charles of Lorraine and Daun send the reserves north.'});
    add(1,{p_inf1:[170,330],p_inf2:[150,348],p_art:[150,310],p_fred:[150,290],p_cav:[115,215]},{a:[['g',80,180,120,280,168,328],['g',60,200,110,300,148,346],['g',70,222,150,308]],t:'Behind the hills',b:'The Prussian army marches south in columns behind the low hills, out of sight. Charles sees them leave Borne and says, "Our friends are leaving, let them go in peace." Nádasdy, on the Austrian left, sees them turning toward him and asks for help. None comes.'});
    add(1,{p_inf1:[250,330],p_inf2:[230,348],p_art:[205,322],p_fred:[200,340],a_left:[272,320,'ko']},{a:[['g',170,330,246,330]],t:'Sagschütz',b:'At about 1 in the afternoon the Prussians attack the far left of the Austrian line. The Württemberg troops there trade a few volleys and drift away, and the Bavarians beside them give way too. In about 15 minutes the Austrian left has collapsed.',
      fire:[['p_inf1','a_left','musket'],['p_art','a_left','cannon'],['a_left','p_inf1','musket']]});
    add(2,{p_inf1:[255,226],p_inf2:[232,245],p_art:[190,248],p_fred:[200,262],p_cav:[130,190,'hide'],a_center:[255,200],a_res:[278,194]},{a:[['g',250,330,255,230],['g',205,322,192,252],['t',300,90,280,190]],t:'Leuthen',b:'The Austrians turn to make a new line facing south at Leuthen. Their infantry fights from houses, fences and walls, and holds the walled churchyard until Prussian grenadiers break in. From the Butterberg, the heavy Prussian guns pound the new Austrian line.',
      fire:[['p_inf1','a_center','clash'],['a_center','p_inf1','musket'],['a_res','p_inf1','musket'],['p_art','a_res','cannon']]});
    add(2,{a_cav:[210,152,'ko'],p_cav:[190,150]},{a:[['t',300,112,214,150],['g',130,190,188,152]],t:'Driesen\'s charge',b:'Lucchesi\'s squadrons swing toward the Prussian infantry and show their own side. Driesen\'s cavalry charges out from behind the Sophienberg and catches them by surprise. Lucchesi is killed early, by a cannonball. More Prussian squadrons join in, and the Austrian cavalry breaks.',
      fire:[['p_cav','a_cav','clash'],['p_art','a_cav','cannon'],['p_inf1','a_center','musket'],['a_res','p_inf1','musket']]});
    add(2,{p_cav:[240,180],p_inf1:[262,212],a_center:[255,200,'ko'],a_res:[395,230,'exit'],a_right:[395,80,'exit'],a_charles:[395,210,'exit']},{a:[['g',190,150,236,178]],t:'Night',b:'The Prussian cavalry rides into the open side of the Austrian infantry, and the whole Austrian army breaks and streams east toward Breslau as darkness falls. Austria has lost about 22,000 men, 12,000 of them taken prisoner, against about 6,000 Prussians. Two weeks later Breslau surrenders, and Silesia is Prussian again.',
      fire:[['p_cav','a_center','clash'],['p_inf1','a_center','musket']]});
    return S;
  })(),
  video:{id:'pNx_uD5-x5s',t:'Battle of Leuthen: How 35,000 Prussians CRUSHED a 65,000-strong Austrian army',ch:'Zweitausend Jahre Deutschland',v:316000},
  sources:[['Wikipedia: Battle of Leuthen','https://en.wikipedia.org/wiki/Battle_of_Leuthen'],
           ['Warfare History Network: Covered in Glory at Leuthen','https://warfarehistorynetwork.com/article/covered-in-glory-at-leuthen/'],
           ['EBSCO Research Starters: Battle of Leuthen','https://www.ebsco.com/research-starters/military-history-and-science/battle-leuthen']],
  cards:{p_adv:'prcav1757',p_inf1:'prinf1757',p_inf2:'prinf1757',p_art:'prart1757',p_cav:'prcav1757',
         a_right:'austinf1757',a_center:'austinf1757',a_left:'austinf1757',a_res:'austinf1757',a_cav:'austcav1757'}
});

/* ===== Ain Jalut, day 24 ===== */
PGD.mystery(7,{
  war:'Mongol invasions of the Levant',
  general:'Qutuz',
  pitch:'You are <b>Qutuz</b>, Sultan of Egypt. The Mongols have taken Baghdad and Damascus, and they have told you to surrender. Instead you have marched out to meet their army in the valley of Ain Jalut. Stop it there.',
  H:600,
  terrain(){
    let s=felt('#b2aa6c',600);
    s+=`<path d="M0 0 H400 V120 Q300 160 200 150 Q100 140 0 175 Z" fill="#9b9064"/><path d="M0 600 H400 V450 Q300 420 200 440 Q100 460 0 420 Z" fill="#9b9064"/>`;
    [[60,80,20],[150,64,22],[260,56,20],[350,84,18],[70,540,22],[190,566,20],[300,520,24],[370,500,20]].forEach(p=>s+=mtn(p[0],p[1],p[2],'#d8cfa8'));
    s+=trees(31,30,[0,135,140,470],()=>true,['#4b6b30','#3b5f2d']);
    s+=`<circle cx="300" cy="480" r="7" fill="#5d9bc0" stroke="#e6d6a2"/>`;
    s+=label(300,504,'Spring of Ain Jalut',8)+label(300,580,'Mount Gilboa',9)+label(64,128,'Wooded hills',8)+label(220,316,'Open valley floor',10)+label(384,300,'From the east',8,90);
    s+=compass(26,576);
    return s+end(600);
  },
  lead:'1260. The Mongols have destroyed Baghdad and taken Damascus. Their envoys came to Cairo to demand your surrender, and you had them put to death. Their leader Hulagu has since taken most of his army back east, leaving his general Kitbuqa in Syria with a smaller force. You have marched out of Egypt to meet it.',
  sit:'3 September 1260, by the spring of Ain Jalut. Your main army waits out of sight among the trees in the hills. Out on the valley floor, Baybars and the vanguard have been fighting the Mongols for hours.',
  mett:{
    m:'Defeat Kitbuqa\'s army and stop the Mongols before they reach Egypt.',
    e:'One Mongol tumen, in name 10,000 horsemen, with Georgian, Armenian and Syrian allies. Mounted archers and lancers.',
    t:'A broad valley by the spring of Ain Jalut, at the foot of Mount Gilboa, with wooded hills where an army can hide.',
    tr:'Perhaps 15,000 to 20,000 Mamluk horsemen and allies. Baybars commands the vanguard.',
    ti:'One day. For now, the main Mongol army has gone east.'},
  ground:[['Key terrain','The wooded hills at the west end of the valley, where an army can hide.',[65,200,30]],
          ['Avenue of approach','The open valley floor, good ground for horse archers.',[210,200,30]],
          ['Key terrain','The spring of Ain Jalut, at the foot of Mount Gilboa.',[300,320,20]]],
  q:'The Mongols are pressing Baybars. Which toy, sent where, brings them to your hidden army?',
  qs:'Bait the trap: which toy goes where?',
  toys:[['m_van','Baybars\'s vanguard','Baybars and the vanguard'],['m_main','Main army','the main army'],['m_right','Right wing','the right wing']],
  zones:[['lure','Run to the hills',122,205,22,'back toward the hills, as if beaten'],['charge','At their center',242,200,18,'straight into the Mongol center'],
         ['round','Round the north',255,95,20,'round the north end of the Mongol army'],['spring','To the spring',292,318,20,'south to the spring of Ain Jalut']],
  ans:{u:'m_van',z:'lure'},
  start:{m_van:[215,205],m_main:[65,200,'hide'],m_left:[85,120,'hide'],m_right:[85,285,'hide'],m_qutuz:[42,215],
         mo_main:[265,200],mo_r:[300,140],mo_l:[300,265],mo_allies:[345,212],mo_kit:[335,190]},
  fbU:{m_van:'Right toy. The Mongols are already fighting Baybars. Only he can lead them somewhere without showing them the rest of your army.',
       m_main:'Not this toy. Once the Mongols see your main army, the trap is gone.',
       m_right:'Not this toy. The right wing is part of the trap. If it shows itself, the Mongols know what waits in the trees.'},
  fbZ:{lure:'Right place. Run for the hills as if beaten, and let the Mongols chase you onto your hidden army.',
       charge:'Charging the whole Mongol army with a small force throws that force away.',
       round:'Riding round the Mongols on the open floor only shows them more of you. It does not bring them to the trap.',
       spring:'The spring is behind the Mongols, away from the hills. Nothing there leads them to your hidden army.'},
  fail:{
    'm_van@charge':{fire:[['mo_main','$','arrows'],['mo_kit','$','arrows']],ko:['$'],
      b:'Baybars throws his tired vanguard straight at the whole Mongol army. It is swallowed up, and the Mongols are left in the open valley, nowhere near your trap.'},
    'm_van@round':{fire:[['mo_r','$','arrows']],ko:['$'],
      b:'Baybars rides round the north end of the Mongol army. Their right wing turns on him and shoots his men down, and nobody leads them toward the hills.'},
    'm_van@spring':{fire:[['mo_l','$','arrows']],ko:['$'],
      b:'Baybars rides south to the spring, away from the hills. The Mongols follow him there, the wrong way, and your hidden army waits for nothing.'},
    'm_main@lure':{fire:[['mo_main','$','arrows']],ko:[],
      b:'The main army rides out of the trees to help Baybars. Now the Mongols can see your whole army, the trap is gone, and the battle becomes the open fight they wanted.'},
    'm_main@charge':{fire:[['mo_main','$','arrows'],['$','mo_main','clash']],ko:[],
      b:'Your main army leaves the trees and charges across the open floor. Mongol arrows meet it all the way, and instead of a trap you have a head-on fight.'},
    'm_main@round':{fire:[['mo_r','$','arrows']],ko:[],
      b:'Your main army comes out of hiding and rides round the north end of the Mongols, in full view. Their right wing turns to face it, and the surprise is wasted.'},
    'm_main@spring':{fire:[['mo_l','$','arrows']],ko:[],
      b:'Your main army leaves the hills and crosses the open valley to the spring. The Mongols see it go, and the hills behind Baybars are empty.'},
    'm_right@lure':{fire:[['mo_main','$','arrows']],ko:[],
      b:'The right wing rides out of the trees beside Baybars. The Mongols see it, guess that more troops wait in the hills, and do not follow.'},
    'm_right@charge':{fire:[['mo_main','$','arrows'],['mo_l','$','arrows']],ko:['$'],
      b:'The right wing charges the Mongol center alone and is shot to pieces. Its side of the trap is now open.'},
    'm_right@round':{fire:[['mo_r','$','arrows']],ko:[],
      b:'The right wing crosses the whole valley to get round the Mongols, in plain sight. The Mongols now know the hills were hiding troops.'},
    'm_right@spring':{fire:[['mo_l','$','arrows']],ko:[],
      b:'The right wing rides out to the spring, behind the Mongols. It shows them part of your army and leaves a gap in the trap.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 2 is the puzzle above.
     Every zone is a real move: none sits where a toy already stands. Texts stay inside what the scenes and sources say.
     Some historians doubt that the retreat was planned; the scenes follow the account the listed sources give most often. */
  stepsLive:true,
  steps:[
    {start:{m_van:[112,205],m_main:[15,200],m_left:[15,150],m_right:[15,250],m_qutuz:[35,225],
            mo_main:[350,200],mo_r:[350,145],mo_l:[350,255],mo_allies:[382,215],mo_kit:[375,190]},
     after:[0,1],
     qs:'The Mongols are near: where do you wait?',
     sit:'Early on 3 September 1260. Your army has reached the west end of the valley of Ain Jalut. Kitbuqa\'s Mongols got there first and are camped by the spring. Baybars will ride out with a smaller force to meet them. The rest of your army must be somewhere when the Mongols come.',
     q:'Where does the rest of your army wait while Baybars rides out?',
     intel:[['The Mongols','Fast horse archers who like open ground. A fake retreat is one of their best tricks: run, then turn on whoever chases.'],
            ['The ground','The valley floor is open and flat. At its west end, wooded hills can hide a large army.'],
            ['Baybars','He will ride out with a smaller force and keep the Mongols busy for as long as it takes.']],
     toys:[['m_main','Main army','the main army'],['m_left','Left wing','the left wing'],['m_right','Right wing','the right wing']],
     zones:[['hills','In the trees',72,205,22,'into the trees in the hills, out of sight'],['valley','Valley floor',205,205,22,'out onto the open valley floor beside Baybars'],
            ['spring','To the spring',292,318,20,'round to the spring, behind the Mongols'],['camp','Fortified camp',40,345,20,'back into a fortified camp']],
     ans:{u:['m_main','m_left','m_right'],z:'hills'},
     hint:{z:'Baybars can only lead the Mongols into a trap if they cannot see it.'},
     fbU:{m_main:'Right toy. The whole army gets the same order. The question is where it waits.',
          m_left:'Right toy. The whole army gets the same order. The question is where it waits.',
          m_right:'Right toy. The whole army gets the same order. The question is where it waits.'},
     fbZ:{hills:'Right place. Among the trees the Mongols cannot see you, so whatever Baybars does, they never know what waits behind him.',
          valley:'Out on the open floor, the Mongols see your whole army and fight it on the ground they like best.',
          spring:'Riding round to the spring takes your army across the open valley in full view of the Mongols.',
          camp:'Shut in a camp, your army cannot strike, and the Mongols can see where it is.'},
     fail:{hills:{ko:[],idle:['$']},
           valley:{ko:[],fire:[['mo_main','$','arrows']]},
           spring:{ko:[],fire:[['mo_l','$','arrows']]},
           camp:{ko:[],idle:['$']}}},
    {after:[2,3,4],
     hint:{u:'Only one of these is already in front of the Mongols, and only one can move without giving the trap away.',z:'The trap is in the hills. Bring the Mongols to it.'},
     intel:[['Baybars','His men have fought for hours with hit-and-run attacks, and are still in one piece.'],
            ['What they see','The Mongols can see Baybars on the valley floor. They cannot see your army in the trees.'],
            ['Kitbuqa','He has the whole Mongol force with him, ready to chase.']]},
    {from:4, after:[5,6],
     qs:'The left is breaking: which toy goes where?',
     sit:'The trap has closed, but the Mongols are fighting hard to break out. Their charge has nearly destroyed your left wing, and your men there are giving way. If the left goes, the whole army could come apart.',
     q:'Which toy, sent where, saves your left wing?',
     intel:[['The left wing','The Mongol charge has almost broken it. Its men are wavering.'],
            ['The rest','The main army and the right wing are locked in their own fights, holding the ring shut.'],
            ['Your guard','Your own unit is fresh, and still at your side.']],
     toys:[['m_qutuz','Qutuz and his guard','your own guard, led by you,'],['m_main','Main army','the main army'],['m_right','Right wing','the right wing']],
     zones:[['left','To the left wing',125,160,20,'into the fight on the breaking left wing'],['kit','At Kitbuqa',205,180,18,'straight through the Mongols at Kitbuqa'],
            ['back','Back west',22,330,20,'back west, out of the battle']],
     ans:{u:'m_qutuz',z:'left'},
     hint:{u:'Everyone else is already holding part of the ring. Who is still free?',z:'Go where the battle is being lost.'},
     fbU:{m_qutuz:'Right toy. Everyone else is holding the ring. Your own guard is the only fresh force, and your men need to see you.',
          m_main:'Not this toy. The main army is holding the Mongol center. Pull it out, and the ring opens.',
          m_right:'Not this toy. The right wing holds the other side of the ring. Pull it out, and the Mongols ride out that way.'},
     fbZ:{left:'Right place. That is where the battle is being lost.',
          kit:'Kitbuqa is in the middle of his army. Reaching him means cutting through it while your left wing falls apart.',
          back:'Turning back now starts a rout, with Mongol horsemen chasing you all the way.'},
     fail:{left:{ko:[],fire:[['mo_r','$','clash']]},
           kit:{ko:[],fire:[['mo_main','$','arrows']]},
           back:{ko:[],idle:['$']}}}],
  clues:[
    {cat:'m',t:'Hours of it',b:'Baybars has kept the Mongols busy for hours with hit-and-run attacks, and his force is still in one piece.'},
    {cat:'e',card:'mongol1260'},
    {cat:'e',t:'What they see',b:'The Mongols can see Baybars on the valley floor. They cannot see your main army in the trees.'},
    {cat:'tr',card:'mamluk1260'},
    {cat:'m',t:'Their own trick',b:'Have Baybars turn and run for the hills as if beaten. When the Mongols chase him, your hidden army is waiting.'}],
  deduce:[['Only Baybars is in front of the Mongols.','Use Baybars.'],
          ['The army in the trees cannot be seen.','Bring the Mongols to it.'],
          ['A Mongol army chases a beaten enemy.','Have Baybars run for the hills.']],
  /* The real battle. North is up. The Mamluks come from the west, the Mongols hold the spring to the east.
     Both armies face each other, so the Mamluk left wing is on the north side and meets the Mongol right. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={m_van:[112,205],m_main:[15,200],m_left:[15,150],m_right:[15,250],m_qutuz:[35,225],
           mo_main:[350,200],mo_r:[350,145],mo_l:[350,255],mo_allies:[382,215],mo_kit:[375,190]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{m_main:[65,200,'hide'],m_left:[85,120,'hide'],m_right:[85,285,'hide'],m_qutuz:[42,215],m_van:[200,205],
           mo_main:[300,200],mo_r:[300,140],mo_l:[300,265],mo_allies:[345,212],mo_kit:[335,190]},
      {a:[['g',15,200,62,200],['g',15,150,82,122],['g',15,250,82,282],['g',112,205,196,205],['t',350,200,304,200]],t:'Out of sight',b:'Qutuz hides most of his army among the trees in the hills and sends Baybars forward with a smaller force. The Mongols ride out to meet it.'});
    add(0,{m_van:[215,205],mo_main:[265,200]},{t:'Hit and run',b:'For hours Baybars\'s horsemen dash in, loose their arrows and pull away, drawing the Mongols on while keeping their own men in one piece.',
      fire:[['mo_main','m_van','arrows'],['m_van','mo_main','arrows']]});
    add(1,{m_van:[110,205],mo_main:[165,200],mo_r:[170,140],mo_l:[170,265],mo_kit:[205,192],mo_allies:[240,214]},{a:[['gd',215,205,114,205],['t',265,200,170,200],['t',300,140,172,142],['t',300,265,172,264]],t:'The fake retreat',b:'Then Baybars turns and runs, as if beaten. Kitbuqa sends his whole army after him, toward the hills.'});
    add(1,{m_main:[125,200],m_left:[135,135],m_right:[135,268]},{a:[['g',65,200,121,200],['g',85,120,131,133],['g',85,285,131,270]],t:'The trap',b:'Out of the trees burst the hidden Mamluks, shooting arrows and charging. The Mongols are caught with enemies on three sides.',
      fire:[['m_main','mo_main','clash'],['m_left','mo_r','arrows'],['m_right','mo_l','arrows'],['m_van','mo_main','arrows'],['mo_main','m_main','arrows']]});
    add(1,{m_left:[95,122],mo_r:[118,132]},{a:[['t',170,140,122,133]],t:'The left wing',b:'The Mongols fight hard to break out. Their charge crashes into the Mamluk left wing and very nearly destroys it.',
      fire:[['mo_r','m_left','clash'],['m_left','mo_r','arrows'],['m_right','mo_l','arrows']]});
    add(2,{m_qutuz:[112,150],m_left:[125,135],mo_r:[150,138]},{a:[['g',42,215,108,154]],t:'"O Islam!"',b:'Qutuz pulls off his helmet so his men can see his face, and shouts "O Islam!" Then he charges at the wavering wing with his own guard. The left wing rallies, and the Mongols are pushed back.',
      fire:[['m_qutuz','mo_r','clash'],['m_left','mo_r','clash'],['m_right','mo_l','arrows']]});
    add(2,{mo_r:[150,138,'ko'],mo_main:[165,200,'ko'],mo_kit:[205,192,'ko'],mo_l:[170,265,'ko'],mo_allies:[395,230,'exit'],m_main:[150,200],m_right:[150,262]},{t:'Kitbuqa falls',b:'The Mongols fall back, gather and charge again, but the battle has turned. Kitbuqa is killed, with most of his army. Five days later the Mamluks ride into Damascus, and within a month they hold Aleppo too.',
      fire:[['m_left','mo_r','clash'],['m_main','mo_main','clash'],['m_van','mo_kit','arrows'],['m_right','mo_l','clash'],['m_qutuz','mo_kit','arrows']]});
    return S;
  })(),
  video:{id:'bwhWnRhcMQo',t:'The Epic Battle That Stopped the Mongols and Changed History: Ain Jalut',ch:'Aditu Laudis',v:5260000},
  sources:[['Wikipedia: Battle of Ain Jalut','https://en.wikipedia.org/wiki/Battle_of_Ain_Jalut'],
           ['HistoryNet: Ain Jalut, 1260','https://historynet.com/mongols-met-march/'],
           ['De Re Militari: The Battle of Ayn Jalut, from Rashid al-Din\'s Compendium of Chronicles','https://deremilitari.org/RESOURCES/SOURCES/aynjalut.htm'],
           ['TheCollector: How the Mamluks Beat the Unstoppable Mongols at Ain Jalut','https://www.thecollector.com/battle-ain-jalut/']],
  cards:{m_van:'mamluk1260',m_main:'mamluk1260',m_left:'mamluk1260',m_right:'mamluk1260',
         mo_main:'mongol1260',mo_r:'mongol1260',mo_l:'mongol1260',mo_allies:'mongolally1260'}
});

PGD.mystery(11,{
  war:'Sekigahara campaign',
  general:'Tokugawa Ieyasu',
  pitch:'You are <b>Tokugawa Ieyasu</b>. Japan\'s ruler has died, and its great lords have split into two armies. You lead the Eastern Army. Ishida Mitsunari leads the Western Army, and some of his lords have secretly promised to change sides. Win Japan in one campaign.',
  H:600,
  terrain(){
    let s=felt('#8fa064',600);
    s+=hill(90,138,40,39,3)+hill(110,285,30,33,2)+hill(170,525,50,54,4)+hill(340,375,50,60,4)+hill(300,252,24,24,2)+hill(368,150,26,22,2);
    s+=trees(61,24,[130,220,480,592],()=>true,['#2f5a24','#3b6b2b'])+trees(62,20,[300,385,322,442],()=>true,['#2f5a24','#3b6b2b']);
    s+=road('M0 300 L400 285')+road('M200 0 L200 600')+road('M372 168 Q384 320 362 476');
    s+=`<rect x="340" y="480" width="44" height="34" rx="3" fill="#8a7a5c" stroke="#3a3024" stroke-width="1.4"/>`+house(354,500)+house(368,506,'#8a3a2a');
    s+=label(90,87,'Sasao hill (Ishida)',9)+label(170,456,'Mt. Matsuo (Kobayakawa)',9)+label(340,296,'Mt. Nangu (Mori)',9)+label(300,222,'Momokubari',8)
      +label(368,118,'Akasaka',9)+label(362,536,'Ogaki Castle',9)+label(64,318,'Nakasendo road',8)+label(200,590,'Valley of Sekigahara',9);
    s+=compass(24,24);
    return s+end(600);
  },
  lead:'October 1600. Toyotomi Hideyoshi, who united Japan, has died and left a young son. You are the most powerful of the lords meant to rule for the boy, and you have made enemies. Ishida Mitsunari has gathered a coalition against you, the Western Army. Some of its lords have secretly promised to come over to you. None of them has done it yet.',
  sit:'Around noon, 21 October 1600, in the valley of Sekigahara. Your army has fought the Western line for hours, and neither side has given way. Up on Mount Matsuo, Kobayakawa Hideaki\'s 15,000 men, who promised to join you, still sit and watch.',
  mett:{
    m:'Destroy Ishida\'s coalition in one battle.',
    e:'About 80,000 men of the Western Army, on the hills around the valley. Several of their lords are wavering.',
    t:'A narrow valley where the Nakasendo road meets another, ringed by hills: Sasao to the north-west, Mount Matsuo to the south, Mount Nangu to the south-east, behind you.',
    tr:'About 75,000 to 90,000 men of the Eastern Army, with many arquebus gunners.',
    ti:'One day. A long war gives lords time to change sides, either way.'},
  ground:[['Key terrain','Mount Matsuo, where Kobayakawa\'s army sits above the Western flank.',[170,340,30]],
          ['Key terrain','Mount Nangu, where the Mori army sits behind your army.',[340,250,30]],
          ['Avenue of approach','The Nakasendo road, running west through the valley toward Sawayama and Osaka.',[250,195,24]]],
  q:'Kobayakawa will not move. Which toy, sent where, gets him off his mountain and into the fight?',
  qs:'Kobayakawa waits: which toy goes where?',
  toys:[['e_guns','Arquebusiers','your arquebus gunners'],['e_todo','Todo Takatora','Todo Takatora\'s men'],['e_fuku','Fukushima Masanori','Fukushima Masanori\'s men']],
  zones:[['volley','Fire at Matsuo',225,292,18,'to the foot of Mount Matsuo, to fire a volley up at Kobayakawa'],
         ['storm','Storm Mt Matsuo',196,328,18,'up the slopes of Mount Matsuo, to attack Kobayakawa'],
         ['nangu','Fire at Nangu',304,266,18,'to the foot of Mount Nangu, to fire on the Mori army']],
  ans:{u:'e_guns',z:'volley'},
  start:{e_fuku:[152,204],e_kuroda:[128,108],e_ii:[142,178],e_todo:[168,268],e_guns:[270,230],e_ieyasu:[235,186],
         w_ishida:[90,92],w_ukita:[110,190],w_otani:[130,280],w_koba:[170,340],w_mori:[340,250],w_cmd:[60,110]},
  fbU:{e_guns:'Right toy. Your gunners are not holding a stretch of the line. They can make a loud point without opening a gap.',
       e_todo:'Not this toy. Todo\'s men are locked in their fight with Otani. Pull them out and Otani walks into the gap.',
       e_fuku:'Not this toy. Fukushima is holding Ukita, the biggest Western force. Pull him out and your center breaks.'},
  fbZ:{volley:'Right place. A volley toward his hill tells Kobayakawa the waiting is over: pick a side, now.',
       storm:'Attacking him on his own mountain pushes him to Ishida, with 15,000 men above your flank.',
       nangu:'The Mori promised to sit still, and they are doing it. Shooting at them gives them a reason to fight.'},
  fail:{
    'e_guns@storm':{fire:[['w_koba','$','clash'],['$','w_koba','musket']],ko:['$'],
      b:'Your gunners climb Mount Matsuo to attack. Now Kobayakawa has nothing to gain from you, and his 15,000 men fight for Ishida after all. Your gunners are cut down on the slope.'},
    'e_guns@nangu':{fire:[['$','w_mori','musket'],['w_mori','$','musket']],ko:[],
      b:'Your gunners fire on the Mori. Their commanders promised not to fight, but now they are being shot at, and there are about 25,000 of them behind your army. Kobayakawa keeps on watching.'},
    'e_todo@volley':{fire:[['$','w_koba','musket'],['w_otani','e_fuku','musket']],ko:[],
      b:'Todo\'s men pull out of their fight with Otani to fire up at Mount Matsuo. Otani\'s men push into the gap they leave, and the side of your line starts to bend.'},
    'e_todo@storm':{fire:[['w_koba','$','clash'],['$','w_koba','clash']],ko:['$'],
      b:'Todo\'s men leave Otani and charge up Mount Matsuo. Under attack, Kobayakawa fights for Ishida, and his 15,000 men pour down the slope onto Todo.'},
    'e_todo@nangu':{fire:[['$','w_mori','musket'],['w_mori','$','musket'],['w_otani','e_fuku','musket']],ko:[],
      b:'Todo marches off to the far side of the valley to fire on the Mori. Now the Mori have a reason to fight, and behind Todo, Otani\'s men push into the gap he left.'},
    'e_fuku@volley':{fire:[['$','w_koba','musket'],['w_ukita','e_ii','musket']],ko:[],
      b:'Fukushima pulls out of his fight with Ukita to fire up at Mount Matsuo. Ukita\'s 17,000 men press forward into the hole in your center.'},
    'e_fuku@storm':{fire:[['w_koba','$','clash'],['$','w_koba','clash'],['w_ukita','e_ii','musket']],ko:['$'],
      b:'Fukushima takes his men off the valley floor and up Mount Matsuo. Ukita pours into your center, and on the mountain Kobayakawa, under attack, fights for Ishida.'},
    'e_fuku@nangu':{fire:[['$','w_mori','musket'],['w_mori','$','musket'],['w_ukita','e_ii','musket']],ko:[],
      b:'Fukushima marches away from Ukita to fire on the Mori. Your center opens, and the Mori, who had promised to sit still, now have a reason to fight.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 3 is the puzzle above.
     Every zone is a real move: none sits where one of your toys already stands. Texts stay inside the scenes and sources.
     The gunfire at Kobayakawa is the traditional story; Wikipedia gives the historians who doubt it, and the scene says so.
     Kobayakawa stays a Western unit in the engine, so his charge on Otani is shown by his move, with Todo's men doing the shooting. */
  stepsLive:true,
  steps:[
    {start:{e_fuku:[350,125],e_kuroda:[372,95],e_ii:[385,135],e_todo:[360,155],e_guns:[338,142],e_ieyasu:[388,110],
            w_ishida:[352,330],w_ukita:[378,345],w_cmd:[362,368],w_otani:[130,280],w_koba:[170,340],w_mori:[340,250]},
     after:[0,1],
     qs:'Ishida holds a castle: where do you march?',
     sit:'20 October 1600. Your army has reached the hill at Akasaka. Ishida and the Western Army hold Ogaki Castle, close by. Your real targets lie further west: Ishida\'s own castle at Sawayama, and the city of Osaka.',
     q:'Where does your army march?',
     intel:[['Ogaki','A strong castle, full of Western troops.'],
            ['The road west','The Nakasendo road runs west through the valley of Sekigahara toward Sawayama and Osaka. You hold forts on the main roads.'],
            ['The lords','Both sides are shaky alliances. The longer the war lasts, the more lords may change sides, either way.']],
     toys:[['e_fuku','Fukushima Masanori','Fukushima Masanori\'s men'],['e_kuroda','Kuroda and Hosokawa','Kuroda and Hosokawa\'s men'],['e_ii','Ii Naomasa','Ii Naomasa\'s red cavalry']],
     zones:[['west','West on the road',250,193,22,'west along the Nakasendo road, past Ogaki toward Sawayama'],
            ['storm','Storm Ogaki',326,318,20,'south to storm Ogaki Castle'],
            ['gifu','Back to Gifu',322,40,18,'back east to Gifu Castle, to wait']],
     ans:{u:['e_fuku','e_kuroda','e_ii'],z:'west'},
     hint:{z:'Which suits you better: a siege of his strong walls, or a fight out in the open?'},
     fbU:{e_fuku:'Right toy. The whole army gets the same order. The question is where it goes.',
          e_kuroda:'Right toy. The whole army gets the same order. The question is where it goes.',
          e_ii:'Right toy. The whole army gets the same order. The question is where it goes.'},
     fbZ:{west:'Right place. Ishida cannot let you march past him to Sawayama and Osaka. To stop you, he has to leave his walls and fight in the open.',
          storm:'Storming a strong castle costs weeks and thousands of men, and every week gives wavering lords time to think again.',
          gifu:'Going back gives Ishida time, and shows the waverers a general who will not fight.'},
     fail:{west:{ko:[],idle:['$']},
           storm:{ko:[],fire:[['w_ishida','$','musket']]},
           gifu:{ko:[],idle:['$']}}},
    {from:1, after:[2,3],
     qs:'The fog lifts: where do you strike?',
     sit:'Dawn, 21 October. In the night Ishida left Ogaki and lined the hills around Sekigahara, across your road, and you followed him. Now the fog is lifting. You look surrounded: Western troops on the hills ahead, Kobayakawa on Mount Matsuo, the Mori on Mount Nangu behind you.',
     q:'Where do your front divisions attack?',
     intel:[['The promises','Kobayakawa has secretly promised to join you. Kikkawa, at the front of the Mori army, has promised it will not fight. Neither has moved.'],
            ['Waverers','Lords who are not sure back whoever looks like winning.'],
            ['Ahead','Ukita Hideie\'s 17,000 men hold the center of the Western line.']],
     toys:[['e_fuku','Fukushima Masanori','Fukushima Masanori\'s men'],['e_kuroda','Kuroda and Hosokawa','Kuroda and Hosokawa\'s men'],['e_ii','Ii Naomasa','Ii Naomasa\'s red cavalry']],
     zones:[['center','At Ukita',150,196,20,'straight at Ukita\'s army in the center'],
            ['matsuo','Up Mt Matsuo',200,318,18,'up Mount Matsuo, at Kobayakawa'],
            ['nangu','Up Mt Nangu',305,268,18,'up Mount Nangu, at the Mori behind you']],
     ans:{u:['e_fuku','e_kuroda','e_ii'],z:'center'},
     hint:{z:'The waverers are watching you. Show them a winner, and do not give them a reason to fight you.'},
     fbU:{e_fuku:'Right toy. Your whole front line gets the same order. The question is where it attacks.',
          e_kuroda:'Right toy. Your whole front line gets the same order. The question is where it attacks.',
          e_ii:'Right toy. Your whole front line gets the same order. The question is where it attacks.'},
     fbZ:{center:'Right place. Hitting Ishida\'s main line at once shows every waverer on the hills that you mean to win.',
          matsuo:'Attacking Kobayakawa pushes him onto Ishida\'s side, with 15,000 men above your flank.',
          nangu:'The Mori promised to sit still. Attacking them gives about 25,000 men behind you a reason to fight.'},
     fail:{center:{ko:[],fire:[['$','w_ukita','musket'],['w_ukita','$','musket']]},
           matsuo:{ko:[],fire:[['w_koba','$','musket']]},
           nangu:{ko:[],fire:[['w_mori','$','musket']]}}},
    {after:[4,5,6],
     hint:{u:'Which of these is not holding a piece of your line?',z:'An attack would push him to Ishida. What tells him to choose, without attacking him?'},
     intel:[['Kobayakawa','About 15,600 men on Mount Matsuo, above Otani\'s flank. Flares and messengers from Ishida\'s side have not moved him either.'],
            ['Your line','Every division in the valley is locked in its own fight.'],
            ['Your gunners','A body of arquebus men near your command post.']]}],
  clues:[
    {cat:'m',t:'The promise',b:'About a week ago Kobayakawa sent word that he would join you when the time came. Since dawn his men have only watched.'},
    {cat:'e',card:'koba1600'},
    {cat:'e',t:'Messengers',b:'Otani and Konishi have sent flares and messengers up Mount Matsuo too. Kobayakawa has not moved for them either.'},
    {cat:'tr',card:'ashigaru1600'},
    {cat:'m',t:'Make him choose',b:'Do not attack him, and do not pull anyone out of the line. Send something loud his way, so he knows the waiting is over.'}],
  deduce:[['Kobayakawa is waiting to see who wins.','Every hour of waiting helps Ishida.'],
          ['Every division in the valley holds part of the line.','Use the gunners.'],
          ['Attacking him would push him to Ishida.','Fire toward his hill, as a warning.']],
  /* The real battle. North is up, as on the scenario's own board. Ogaki and Akasaka lie east of the valley, drawn at the right edge.
     The Western Army faces east, so its left is Ishida on Sasao in the north and its right is Kobayakawa on Mount Matsuo. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={e_fuku:[350,125],e_kuroda:[372,95],e_ii:[385,135],e_todo:[360,155],e_guns:[338,142],e_ieyasu:[388,110],
           w_ishida:[352,330],w_ukita:[378,345],w_cmd:[362,368],w_otani:[130,280],w_koba:[170,340],w_mori:[340,250]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    const line=[['e_ii','w_ukita','clash'],['e_fuku','w_ukita','musket'],['w_ukita','e_fuku','musket'],['e_kuroda','w_ishida','musket'],
                ['w_ishida','e_kuroda','musket'],['e_todo','w_otani','musket'],['w_otani','e_todo','musket']];
    add(0,{w_ishida:[90,92],w_ukita:[110,190],w_cmd:[60,110]},
      {a:[['t',352,330,94,96],['t',378,345,114,192],['t',362,368,64,112]],t:'Out of Ogaki',
       b:'Ishida cannot let you march past him to Sawayama and Osaka. On the evening of 20 October he empties Ogaki Castle, and his army marches through the dark and the rain to the hills around Sekigahara, across your road.'});
    add(0,{e_fuku:[230,200],e_kuroda:[230,130],e_ii:[260,170],e_todo:[230,260],e_guns:[270,230],e_ieyasu:[300,160]},
      {a:[['g',350,125,234,198],['g',372,95,234,130],['g',385,135,264,170],['g',360,155,234,258],['g',338,142,272,226]],t:'The chase',
       b:'By about 2 a.m. you are following him. You set up your command post on Momokubari, a small hill beside Mount Nangu, and your front divisions take up their places facing Ishida\'s line.'});
    add(1,{e_ii:[142,178],e_fuku:[152,204],e_kuroda:[128,108],e_todo:[168,268]},
      {a:[['g',260,170,146,178],['g',230,200,156,204],['g',230,130,132,110],['g',230,260,172,268]],t:'Into the fog',
       b:'At about 8 o\'clock, as the fog lifts, Ii Naomasa charges into Ukita\'s line and Fukushima\'s men open fire behind him. To the north, Kuroda attacks the troops in front of Ishida\'s hill, and Todo takes on Otani.',
       fire:line});
    add(1,{e_ieyasu:[235,186]},
      {a:[['g',300,160,238,184]],t:'Deadlock',
       b:'For hours the two lines push at each other, and gunsmoke hides the sun. Shima Sakon, one of Ishida\'s best commanders, is shot. You move your command post forward, close behind the fighting. On the hills, Kobayakawa and the Mori still do not move.',
       fire:line});
    add(2,{e_guns:[225,292]},
      {a:[['g',270,230,227,288]],t:'A warning volley',
       b:'Around noon you run out of patience. The old story says you had your gunners fire toward Kobayakawa\'s hill, so he would know the waiting was over. Some historians doubt it, because the hill was a long way off.',
       fire:[['e_guns','w_koba','musket']].concat(line)});
    add(2,{w_koba:[115,312],w_otani:[130,280,'ko']},
      {a:[['t',170,340,118,312]],t:'Kobayakawa turns',
       b:'Kobayakawa\'s 15,000 men charge down Mount Matsuo into the side of Otani\'s line. Otani expected it and had turned to face him, but with Todo in front of him too he is overwhelmed, and he takes his own life. Other Western lords change sides as well.',
       fire:[['e_todo','w_otani','clash'],['e_guns','w_otani','musket'],['e_ii','w_ukita','clash'],['e_fuku','w_ukita','musket'],['e_kuroda','w_ishida','musket']]});
    add(2,{w_ukita:[0,200,'exit'],w_ishida:[0,80,'exit'],w_cmd:[0,95,'exit'],w_mori:[400,300,'exit'],e_fuku:[112,196],e_ii:[118,170],e_kuroda:[92,106]},
      {t:'The Western Army breaks',
       b:'Hit from two sides, the Western line falls apart. Ukita flees at about 1 p.m., and Ishida soon after. The Mori march away without ever fighting. Ishida is caught and put to death two weeks later, and you go on to become shogun. Your family will rule Japan until 1868.',
       fire:[['e_fuku','w_ukita','musket'],['e_kuroda','w_ishida','musket']]});
    return S;
  })(),
  video:{id:'5vscOHPFUf0',t:'Warring States Japan: Sengoku Jidai - The Campaign of Sekigahara - Extra History - Part 6',ch:'Extra History',v:2394375},
  sources:[['Wikipedia: Battle of Sekigahara','https://en.wikipedia.org/wiki/Battle_of_Sekigahara'],
           ['Wikipedia: Sekigahara campaign','https://en.wikipedia.org/wiki/Sekigahara_Campaign'],
           ['National Park Service: Battle of Sekigahara','https://www.nps.gov/articles/000/battle-of-sekigahara.htm'],
           ['National Park Service: Sekigahara Campaign','https://www.nps.gov/articles/000/sekigahara-campaign.htm'],
           ['EBSCO Research Starters: Battle of Sekigahara','https://www.ebsco.com/research-starters/military-history-and-science/battle-sekigahara']],
  cards:{e_fuku:'eastsam1600',e_kuroda:'eastsam1600',e_ii:'akazonae1600',e_todo:'eastsam1600',e_guns:'ashigaru1600',
         w_ishida:'westsam1600',w_ukita:'westsam1600',w_otani:'westsam1600',w_koba:'koba1600',w_mori:'mori1600'}
});

PGD.mystery(16,{
  war:'Six-Day War',
  general:'Mordechai Hod',
  pitch:'You are <b>Mordechai Hod</b>, commander of the Israeli Air Force. It is June 1967, and Israel has decided to strike Egypt first. Egypt\'s air force is bigger than yours. Your job is to wreck it before it can fight.',
  H:600,
  terrain(){
    let s=seaBg(600);
    s+=land('M0 210 Q60 195 120 225 Q180 240 240 225 Q300 210 360 195 Q380 192 400 180 V600 H0 Z','#c8b88a');
    s+=land('M320 195 Q350 188 400 165 V600 H340 Q330 450 340 330 Q330 255 320 195 Z','#a9a86e');
    s+=river('M60 210 Q70 330 60 450 Q50 540 60 600',6)+river('M200 225 Q205 375 190 600',4);
    [[60,270],[110,300],[150,375],[220,300],[250,420],[180,495],[90,480]].forEach(p=>s+=`<rect x="${p[0]-10}" y="${p[1]-2}" width="20" height="4" fill="#6f6448"/>`);
    s+=label(200,90,'Mediterranean Sea',12)+label(60,186,'Nile Delta',9)+label(212,250,'Suez Canal',8,80)+label(270,510,'Sinai',11)
      +label(372,330,'Israel',10,90)+label(130,270,'Airfields',8)+label(378,150,'To Jordan, Syria',7);
    s+=compass(26,26);
    return s+end(600);
  },
  lead:'June 1967. After weeks of rising tension, with Egyptian troops massed in Sinai, Israel has decided to strike first. Your air force has nearly 200 jets. Egypt\'s is bigger, spread over airfields from Sinai to the Nile, with radar watching the sky.',
  sit:'Early on 5 June 1967. Nearly every jet you have is fuelled and armed. Egypt\'s dawn patrols have flown since 4 a.m. and are now landing, and its pilots are heading to breakfast. Strike time is 7:45.',
  mett:{
    m:'Destroy as much of the Egyptian Air Force as you can on the ground, in the first hours.',
    e:'Several hundred combat aircraft, many of them modern Soviet-built jets, on airfields across Sinai, along the Suez Canal and in the Nile Delta.',
    t:'The Mediterranean to the north. Egyptian radar looks mainly east, toward Israel.',
    tr:'Nearly 200 jets, and ground crews who can refuel and rearm one in minutes.',
    ti:'Hours. Once Egypt\'s jets are in the air, the surprise is gone.'},
  ground:[['Avenue of approach','The Mediterranean, where jets flying very low stay under the radar.',[220,95,30]],
          ['Key terrain','Egyptian airfields, with jets parked in the open.',[130,225,30]],
          ['Key terrain','Israel\'s own airfields, close enough for fast turnarounds.',[360,280,24]]],
  q:'Which toy, sent which way, opens the strike?',
  qs:'Strike time: which toy goes which way?',
  toys:[['ia_w1','First wave','the first wave'],['ia_w2','Following waves','the following waves'],['ia_home','Fighters held back','the twelve home-guard fighters']],
  zones:[['sea','Low over the sea',230,95,22,'out low over the sea, then south into Egypt'],
         ['direct','Straight over Sinai',300,290,20,'straight west over Sinai, high up'],
         ['radar','At the radar',318,225,16,'straight at the radar stations near the border']],
  ans:{u:'ia_w1',z:'sea'},
  start:{ia_w1:[360,250],ia_w2:[352,312],ia_home:[372,190],ia_crews:[365,350],ia_hod:[382,385],
         ea_sinai:[255,245],ea_delta:[110,205],ea_patrol:[138,236],ea_radar:[292,205]},
  fbU:{ia_w1:'Right toy. The first wave has to land its blow before anyone in Egypt knows a war has started.',
       ia_w2:'Not this toy. The following waves go in ten minutes apart, after the first. Someone has to open the strike.',
       ia_home:'Not this toy. Only twelve fighters stay home to guard Israel\'s own sky. Send them and there are none.'},
  fbZ:{sea:'Right place. Very low over the sea, the jets stay under the radar and come in from a side nobody is watching.',
       direct:'Flying high and straight across Sinai, you show up on every radar screen long before you arrive.',
       radar:'Hitting the radar first tells every airfield in Egypt to get its jets up. The airfields are what matter.'},
  fail:{
    'ia_w1@direct':{fire:[['ea_patrol','$','cannon'],['ea_sinai','$','cannon']],ko:[],
      b:'The first wave climbs high and heads straight across Sinai. Egyptian radar picks it up long before it arrives, the airfields are warned, and MiGs rise to meet it.'},
    'ia_w1@radar':{fire:[['$','ea_radar','bomb'],['ea_patrol','$','cannon']],ko:['ea_radar'],
      b:'The first wave goes for the radar stations near the border. They are hit, but the airfields behind them get the warning, and their jets start to take off.'},
    'ia_w2@sea':{fire:[['ea_patrol','$','cannon']],ko:[],
      b:'The following waves fly the sea route, but no first wave has gone in ahead of them. The strike arrives late and thin, and meets an air force that is starting to wake up.'},
    'ia_w2@direct':{fire:[['ea_patrol','$','cannon'],['ea_sinai','$','cannon']],ko:[],
      b:'The following waves climb and fly straight across Sinai. Radar sees them coming, and Egyptian jets are in the air before the first bomb falls.'},
    'ia_w2@radar':{fire:[['$','ea_radar','bomb'],['ea_patrol','$','cannon']],ko:['ea_radar'],
      b:'The following waves hit a radar station near the border and nothing else. Every Egyptian airfield is now on alert, and the jets parked there are being started up.'},
    'ia_home@sea':{fire:[],ko:[],idle:['$'],
      b:'The twelve guard fighters fly off over the sea. Twelve jets cannot wreck an air force, and Israel\'s own sky is left with no guard at all.'},
    'ia_home@direct':{fire:[['ea_patrol','$','cannon']],ko:[],
      b:'The twelve guard fighters cross Sinai high up. Radar spots them, MiGs come up to meet them, and back home Israel has no fighters left to guard it.'},
    'ia_home@radar':{fire:[['$','ea_radar','bomb'],['ea_radar','$','cannon']],ko:['ea_radar'],
      b:'The twelve guard fighters attack a radar station. They knock it out, but they have told Egypt that a war has begun, and left Israel with nothing to guard its sky.'}},
  /* Three decisions (see tools/FORMAT.md). Decision 1 is the puzzle above.
     Every zone is a real move: none sits where one of your toys already stands. Texts stay inside the scenes and sources.
     The scenario's square board (used on wide screens) stops at Israel's eastern edge, so the zone for the Jordanian and
     Syrian air bases sits at the right edge, with the label pointing on east. */
  stepsLive:true,
  steps:[
    {after:[0],
     hint:{u:'Who opens the strike?',z:'Radar sees high jets from far away, and it is watching the east.'},
     intel:[['Radar','Egyptian radar watches mainly east, toward Israel. High-flying jets show up on it from far away.'],
            ['The sea','Every morning your jets fly a routine route west over the sea. Egyptian radar men stopped paying attention to it long ago.'],
            ['Your force','All but twelve of your nearly 200 jets will fly. The twelve stay home to guard Israel.']]},
    {from:0, after:[1,2],
     qs:'Over the airfields: what is hit first?',
     sit:'7:45, 5 June. The first wave climbs over the Egyptian airfields at almost the same moment, from the sea. Below, jets sit in rows in the open. You have a few minutes over each target before the next wave arrives.',
     q:'Where do the first bombs fall?',
     intel:[['The jets','Parked in the open, with no shelters to protect them.'],
            ['The runways','Concrete strips. You have a special bomb, pushed down by a rocket, that blasts a deep hole in a runway.'],
            ['The radar','Radar and missile sites near the airfields.']],
     toys:[['ia_w1','First wave','the first wave'],['ia_w2','Following waves','the following waves']],
     zones:[['runways','The runways',152,252,18,'onto the runways'],
            ['jets','The parked jets',96,226,18,'onto the rows of parked jets'],
            ['radar','The radar',300,232,16,'onto the radar and missile sites']],
     ans:{u:'ia_w1',z:'runways'},
     hint:{u:'Which of these is already over Egypt?',z:'A jet on a broken runway cannot take off. A jet on a whole one can.'},
     fbU:{ia_w1:'Right toy. The first wave is already over the airfields. The question is what it hits first.',
          ia_w2:'Not this toy. The following waves are still on the way, ten minutes behind.'},
     fbZ:{runways:'Right place. With its runway full of holes, every jet on the field is trapped, and the following waves can deal with them one by one.',
          jets:'Going for the parked jets first leaves the runways whole. Any jet you miss can take off and fight.',
          radar:'Knocking out the radar now does not stop a single jet from taking off.'},
     fail:{runways:{ko:[],fire:[['$','ea_delta','bomb']]},
           jets:{ko:[],fire:[['$','ea_delta','bomb'],['ea_sinai','$','cannon']]},
           radar:{ko:[],fire:[['$','ea_radar','bomb'],['ea_delta','$','cannon']]}}},
    {from:2, after:[3,4],
     qs:'Raids from the east: where do jets go?',
     sit:'Around noon. Most of the Egyptian Air Force is wrecked on the ground. Now Jordanian, Syrian and Iraqi jets raid Israel: an airfield, a factory in Netanya, villages in Galilee. Your rearmed jets were meant for a third strike on Egypt.',
     q:'Where do the jets readied for Egypt go now?',
     intel:[['Egypt','Most of its air force is destroyed, and its runways are full of holes.'],
            ['The raiders','Their jets fly from a small number of air bases, in Jordan, Syria and western Iraq.'],
            ['The raids','So far they have done little damage. Your fighters shot down three of the Syrian jets.']],
     toys:[['ia_w1','Jets for Egypt','the jets readied for Egypt'],['ia_home','Fighters held back','the twelve home-guard fighters']],
     zones:[['east','To their bases',392,128,18,'east, onto the Jordanian and Syrian air bases'],
            ['egypt','Egypt again',165,240,18,'back over Egypt for a third strike'],
            ['guard','Over the coast',332,140,18,'up over the coast, to wait for the next raid']],
     ans:{u:'ia_w1',z:'east'},
     hint:{u:'Which of these is meant to be striking, not guarding?',z:'This morning showed you the best place to beat an air force.'},
     fbU:{ia_w1:'Right toy. These jets are armed and ready, and Egypt no longer needs them.',
          ia_home:'Not this toy. The twelve guard fighters keep Israel\'s sky covered while everyone else is away.'},
     fbZ:{east:'Right place. Catch their jets on the ground, as you did in Egypt this morning, and the raids stop for good.',
          egypt:'Egypt\'s air force is already in pieces. Another strike there leaves the new enemies free to raid.',
          guard:'Waiting over the coast only meets the raiders after they come, and they can come again and again.'},
     fail:{east:{ko:[],idle:['$']},
           egypt:{ko:[],idle:['$']},
           guard:{ko:[],idle:['$']}}}],
  clues:[
    {cat:'m',t:'Their routine',b:'Years of watching have shown you the Egyptian day: when the patrols fly, when they land, when the officers get to work.'},
    {cat:'e',card:'radar1967'},
    {cat:'e',t:'The morning flight',b:'Every morning Israeli jets fly a routine route west over the Mediterranean. Egyptian radar men stopped paying attention to it long ago.'},
    {cat:'tr',card:'mirage1967'},
    {cat:'m',t:'Under the beam',b:'Send the first wave out over the sea, so low the radar cannot see it, and turn it south into Egypt at the last moment.'}],
  deduce:[['Radar is watching for jets from the east.','Do not come from the east.'],
          ['Very low jets stay under the radar.','Fly low, over the sea.'],
          ['The first blow decides the rest.','Use the first wave.']],
  /* The real day. North is up: the Mediterranean along the top, Egypt to the west, Israel on the right edge. */
  scenes:(()=>{
    const S=[], at=(prev,ch)=>Object.assign({},prev,ch);
    let p={ia_w1:[360,250],ia_w2:[352,312],ia_home:[372,190],ia_crews:[365,350],ia_hod:[382,385],
           ea_sinai:[255,245],ea_delta:[110,205],ea_patrol:[138,236],ea_radar:[292,205]};
    const add=(s,ch,o)=>{ p=at(p,ch); S.push(Object.assign({s,u:at(p,{})},o)); };
    add(0,{ia_w1:[190,105]},
      {a:[['g',360,250,300,110,194,104]],t:'Under the radar',
       b:'The first wave heads west over the Mediterranean, in radio silence and so low that Egyptian radar cannot see it. Then it turns south, toward Egypt.'});
    add(1,{ia_w1:[150,236],ea_patrol:[138,236,'ko'],ea_radar:[292,205,'ko']},
      {a:[['g',190,105,152,232]],t:'7:45',
       b:'At 7:45 Israeli time the jets climb, then dive on eleven airfields at almost the same moment. The runways go first, holed by the rocket-pushed bombs. Then the jets come round again with their cannon, against planes trapped on the ground.',
       fire:[['ia_w1','ea_delta','bomb'],['ia_w1','ea_sinai','bomb'],['ia_w1','ea_patrol','bomb'],['ia_w1','ea_radar','bomb']]});
    add(1,{ia_w1:[360,250],ia_w2:[118,215],ea_delta:[110,205,'ko'],ea_sinai:[255,245,'ko']},
      {a:[['g',150,236,356,250],['g',352,312,122,218]],t:'Wave after wave',
       b:'Back home, ground crews refuel and rearm each jet in about seven and a half minutes. A second wave at 9:30 destroys 107 more Egyptian aircraft. By mid-morning most of the Egyptian Air Force is wrecked on the ground.',
       fire:[['ia_w2','ea_delta','bomb'],['ia_w2','ea_sinai','bomb']]});
    add(2,{ia_w1:[392,128],ia_w2:[352,312]},
      {a:[['g',360,250,390,132],['g',118,215,348,310]],t:'East',
       b:'Shortly before 12:30 the jets meant for Egypt turn east instead. They hole the runways of Jordan\'s two air bases, then destroy all 21 of its Hunter jets. Syrian air bases and Iraq\'s H-3 airfield are hit as well.'});
    add(2,{ia_w1:[360,250]},
      {a:[['g',392,128,362,246]],t:'By nightfall',
       b:'By the end of the first day about 450 Arab aircraft have been destroyed, most of them on the ground, for 19 Israeli aircraft lost. For the rest of the war, Israel\'s army fights under a sky its enemies cannot use.'});
    return S;
  })(),
  video:{id:'sB8aLlVz_8k',t:'Israel\'s \'Operation Focus\': Inside One of the Most Successful Air Campaigns in Military History',ch:'CBN News',v:3721962},
  sources:[['Wikipedia: Operation Focus','https://en.wikipedia.org/wiki/Operation_Focus'],
           ['Wikipedia: Six-Day War','https://en.wikipedia.org/wiki/Six-Day_War'],
           ['Warfare History Network: The Sinai Air Strike, June 5, 1967 (Eric Hammel)','https://warfarehistorynetwork.com/article/the-sinai-air-strike-june-5-1967/'],
           ['MigFlug: Three Hours That Won a War, Operation Focus 1967','https://migflug.com/afterburner/?p=4644603']],
  cards:{ia_w1:'mirage1967',ia_w2:'mirage1967',ia_home:'mirage1967',ia_crews:'crews1967',
         ea_sinai:'mig1967',ea_delta:'tu16_1967',ea_patrol:'mig1967',ea_radar:'radar1967'}
});
