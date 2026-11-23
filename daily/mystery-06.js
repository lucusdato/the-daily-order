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
