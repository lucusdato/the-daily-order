PG.add({
  id:'trafalgar', name:'Trafalgar', year:'1805', place:'Off southern Spain',
  summary:`Nelson throws out the rulebook, cuts the enemy line in two places, and wins command of the sea for a century.`,
  face:{g:1,t:-1},
  g:{short:'Britain', name:'Royal Navy', cmdr:'Vice Admiral Lord Nelson; Vice Admiral Collingwood', str:'27 ships of the line', eyes:'Through British eyes'},
  t:{tab:'France/Spain', short:'France and Spain', name:'Combined French and Spanish fleet', cmdr:'Vice Admiral Villeneuve; Admiral Gravina', str:'33 ships of the line', eyes:'Through French and Spanish eyes'},
  objective:`Britain: destroy the combined fleet and end any threat of invasion or French naval power. The combined fleet: escape Cadiz and reach the Mediterranean as Napoleon ordered, without a disastrous battle.`,
  prologue:{
    when:'1803 to October 1805', title:'The invasion that never came',
    text:`Napoleon has gathered an army at Boulogne to invade Britain. He needs control of the Channel for a few days to get it across. Admiral Villeneuve leads a French fleet across the Atlantic to the Caribbean and back to lure the Royal Navy away, but the plan unravels and he ends up blockaded in Cadiz. By late summer Napoleon gives up on the invasion and marches his army east toward Austria. He orders Villeneuve into the Mediterranean, and sends an admiral to replace him.`,
    gWant:`To bring the combined fleet to battle and destroy it, not just keep it bottled up in port.`,
    tWant:`For Villeneuve: to obey his orders, reach the Mediterranean, and restore his reputation before his replacement arrived.`,
    box:[92,272,34],
    theater(){
      let s=seaBg();
      s+=land('M120 0 Q170 10 180 40 Q190 70 170 92 Q140 102 110 92 Q122 62 100 42 Q110 15 120 0 Z');
      s+=land('M200 72 Q262 62 400 52 V400 H262 Q232 332 200 332 Q160 322 130 312 Q100 302 90 282 Q70 262 70 222 Q76 192 100 182 Q140 186 160 176 Q170 142 180 112 Q190 92 200 72 Z');
      s+=sea('M130 312 Q200 262 262 252 Q322 242 400 262 V342 Q332 322 272 332 Q222 337 160 332 Z');
      s+=land('M100 362 Q200 342 300 352 Q362 347 400 362 V400 H100 Z');
      s+=city(204,80,'Boulogne',8,-6)+city(108,292,'Cadiz',9,-6,'end')+city(236,252,'Toulon',8,-6)+city(86,206,'Ferrol',8,-6,'end')+city(140,330,'Gibraltar',8,14);
      s+=label(140,50,'Britain',11)+label(170,230,'Spain',11)+label(260,140,'France',11)+label(40,240,'Atlantic',12)+label(30,350,'To the West Indies',8)+label(370,96,'Austria',9);
      return s;
    },
    tokens:[
      {s:'t',t:'ship',n:2,name:'Villeneuve\'s fleet',why:'Escaped Toulon, sailed to the West Indies and back, fought an indecisive action off Ferrol, then took refuge in Cadiz.',path:[[236,256],[150,330],[30,340],[60,240],[86,210],[106,290]]},
      {s:'g',t:'ship',n:2,name:'Nelson\'s fleet',why:'Chased Villeneuve to the West Indies and back, then took command off Cadiz in late September.',path:[[250,272],[150,336],[34,352],[140,110],[70,300]]},
      {s:'t',t:'inf',n:3,name:'Napoleon\'s army',why:'Abandoned the invasion of Britain and marched east to fight Austria and Russia, ending at Austerlitz.',path:[[204,84],[300,94],[382,104]]}
    ],
    a:[['td',236,258,120,340,32,336],['td',32,330,60,250,86,212],['td',88,216,96,260,104,286],['td',206,86,300,92,380,104]]
  },
  terrain(){
    let s=seaBg();
    s+=land('M310 0 Q320 30 335 60 Q352 82 346 122 Q362 172 352 222 Q366 272 362 302 Q382 322 372 342 Q386 372 380 400 H400 V0 Z','#a8a56a');
    s+=land('M296 30 Q314 22 332 40 Q326 56 310 54 Q298 46 296 30 Z','#a8a56a');
    s+=house(312,40)+house(322,46,'#8a3a2a')+house(366,334);
    s+=`<ellipse cx="330" cy="352" rx="26" ry="10" fill="#9fd0e4" opacity=".5"/><ellipse cx="320" cy="364" rx="14" ry="6" fill="#9fd0e4" opacity=".45"/>`;
    s+=`<path d="M24 112 L84 136" stroke="#1f1a14" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#mk)" opacity=".7"/>`;
    s+=label(70,104,'Light wind from the west-northwest',8)+label(296,20,'Cadiz',10)+label(352,388,'Cape Trafalgar',9)+label(310,374,'Shoals',8)+label(60,380,'Atlantic',13);
    s+=compass(26,26);
    return s+end();
  },
  over(){ return storm(5,9); },
  features:[
    {x:60,y:130,r:34,px:54,py:150,name:'The weather gauge',why:`Being upwind let the British choose when and how to attack. The combined fleet could only wait for them.`},
    {x:236,y:180,px:254,py:180,d:'M236 70 Q206 170 240 300',line:true,name:'The ragged crescent',why:`After turning back toward Cadiz, the allied line was bent and full of gaps, which made it easier to cut.`},
    {x:130,y:215,r:28,name:'The light wind',why:`At walking pace, the British approach took hours, and the leading ships took fire for a long time before they could reply.`},
    {x:340,y:350,r:30,px:330,py:330,name:'Cape Trafalgar and the shoals',why:`Dangerous rocks close by. When the storm came, damaged ships and prizes were driven toward this coast.`},
    {x:318,y:42,r:24,px:340,py:70,name:'Cadiz',why:`The safe harbour behind the allied fleet, and the reason Villeneuve turned his whole line around.`}
  ],
  units:[
    U('gb_victory','g','ship',1,'HMS Victory',`Nelson's flagship, leading the weather column straight at the enemy center.`,{0:[30,180],1:[70,168],2:[218,180]}),
    U('gb_nelson','g','cmd',1,'Lord Nelson',`Britain's most famous admiral. Briefed his captains so thoroughly that he hardly needed to signal during the battle.`,{0:[22,160],1:[62,150],2:[210,162],4:[212,166,'ko']}),
    U('gb_weather','g','ship',3,'Weather column (12 ships)',`Followed Victory to cut the line at the allied center and keep the van out of the fight.`,{0:[18,206],1:[40,174],2:[160,174],3:[210,150]}),
    U('gb_sov','g','ship',1,'Royal Sovereign',`Collingwood's flagship, newly coppered and fast. First into the enemy line, well ahead of the rest of its column.`,{0:[30,252],1:[80,262],2:[238,262]}),
    U('gb_coll','g','cmd',1,'Admiral Collingwood',`Led the lee column and took command after Nelson fell.`,{0:[22,234],1:[72,244],2:[232,244]}),
    U('gb_lee','g','ship',3,'Lee column (15 ships)',`Followed Royal Sovereign to overwhelm the allied rear.`,{0:[20,282],1:[44,268],2:[184,264],3:[236,294]}),
    U('fs_vill','t','cmd',1,'Admiral Villeneuve',`Commander of the combined fleet, aboard Bucentaure. Captured at the end of the battle.`,{0:[352,92],1:[214,152],3:[206,198,'ko']}),
    U('fs_van','t','ship',3,'Allied van (Dumanoir)',`The leading ships of the line. Sailed on, away from the fight, for over an hour before turning back.`,{0:[338,62],1:[236,70],2:[246,40],3:[262,80],4:[6,30,'exit']}),
    U('fs_trin','t','ship',1,'Santisima Trinidad',`The largest warship in the world, with four gun decks. Dismasted and captured.`,{0:[332,84],1:[226,140],3:[230,146,'ko']}),
    U('fs_center','t','ship',3,'Allied center',`Villeneuve's division, cut off and overwhelmed by Nelson's column.`,{0:[346,74],1:[222,170],3:[224,192,'ko']}),
    U('fs_rear','t','ship',3,'Allied rear',`Mostly Spanish ships under Gravina, overwhelmed by Collingwood's column.`,{0:[340,100],1:[240,282],3:[244,300,'ko']}),
    U('fs_esc','t','ship',2,'Ships that escape to Cadiz',`Gravina, mortally wounded, led the survivors back to port.`,{0:[352,112],1:[250,322],4:[330,74]})
  ],
  phases:[
    {when:'19 October 1805', title:'Blockade at Cadiz', a:[],
     move:`The combined French and Spanish fleet lies in Cadiz harbour. Nelson keeps his main fleet out of sight to the west, with a chain of fast frigates watching the port and relaying signals, hoping to tempt Villeneuve out.`,
     why:`Nelson wanted a battle, not a blockade. Staying over the horizon made it more likely the enemy would risk coming out.`,
     tv:`Villeneuve knew British strength was somewhere nearby, and at a council of war his captains, especially the Spanish, argued for staying in port. But he had orders from Napoleon, and news that his replacement was on the way.`,
     ground:`Cadiz was a safe harbour, but leaving it meant beating out to sea in uncertain winds, toward an enemy who might be anywhere over the horizon.`,
     board:{h:`If you want the fight, make it look safe to come out`, b:`Nelson hid his strength so his opponent would take the risk he wanted them to take. Sometimes the best way to draw a competitor into the open is to let them believe the coast is clear.`, try:`What would make your competitor commit to a move you can beat? Can you make that move look safe for them?`}},
    {when:'19 to 21 October', title:'Out of Cadiz',
     a:[['td',338,62,290,60,240,70],['td',346,80,280,120,224,166],['g',30,180,50,174,70,168],['g',30,252,56,258,80,262]],
     call:{side:'t', who:'Villeneuve', q:`Napoleon has ordered you to sail for the Mediterranean, and you have heard your replacement is on his way. Your crews are less trained than the British. What do you do?`, opts:[
       {t:`Stay in Cadiz and keep the fleet intact`, ok:true, fb:`Most of the Spanish officers wanted this. A fleet safe in port still forced Britain to keep ships watching it, without risking defeat.`, alt:{u:{}, a:[]}},
       {t:`Sail out and try to slip past toward the Mediterranean`, hist:true, ok:false, fb:`This is what Villeneuve did. Nelson's frigates saw the fleet leave, and the British closed in.`}]},
     move:`Villeneuve takes the fleet out. On the morning of the 21st, seeing the British bearing down, he orders the whole line to turn back toward Cadiz. The turn, made in light winds, leaves his line ragged and bent into a crescent, with gaps between ships.`,
     why:`Villeneuve wanted to keep a line of retreat open to Cadiz. The turn did that, at the cost of a disordered line.`,
     tv:`Villeneuve believed his fleet, with poorer training and many sick or inexperienced crews, would probably lose a fight at sea. He still felt he had no choice but to obey.`,
     ground:`Light winds meant everything happened slowly, and the big ships handled poorly.`,
     board:{h:`Pressure from above is not a strategy`, b:`Villeneuve sailed largely because he feared being replaced. A decision made to protect a reputation is rarely the right one for the mission.`, try:`Before your next big decision, ask: am I doing this because it is right, or because of how it will look?`}},
    {when:'21 October, noon', title:'Breaking the line',
     a:[['g',70,168,150,172,214,180],['g',80,262,160,264,234,264]],
     call:{side:'g', who:'Nelson', q:`You are upwind of a longer enemy line. Naval doctrine says to form a parallel line and exchange broadsides. What do you do?`, opts:[
       {t:`Form a parallel line and fight by the book`, ok:false, fb:`Line-against-line battles were usually indecisive: ships pounded each other and both fleets limped home.`, alt:{u:{gb_victory:[164,124], gb_weather:[164,172], gb_sov:[164,244], gb_lee:[164,292], gb_nelson:[156,104], gb_coll:[156,224]}, a:[['g',70,168,156,132],['g',80,262,156,256]]}},
       {t:`Attack in two columns and cut their line into pieces`, ok:true, fb:`This is the plan known as the Nelson Touch. It traded early risk for a close, chaotic fight where British gunnery would tell.`},
       {t:`Wait for a stronger wind`, ok:false, fb:`Every hour of waiting brought the enemy closer to the safety of Cadiz, and the weather was turning.`}]},
     move:`The British attack in two columns, heading straight for the enemy line. Collingwood's Royal Sovereign breaks through near the rear around noon. Nelson's Victory cuts behind Villeneuve's flagship and fires a devastating broadside through its stern. The enemy line is cut into pieces.`,
     why:`Nelson's plan, explained to his captains weeks in advance, was to overwhelm the rear and center of the enemy line before the van could turn back and help.`,
     tv:`From the allied ships, the British columns looked reckless: bows pointed straight at a line of broadsides. But the British gunners were faster and better drilled, and once among the allied ships they fought at point-blank range.`,
     ground:`Approaching head-on meant the leading British ships took enemy fire for a long time without being able to fire back. Nelson accepted that risk to close the distance.`,
     board:{h:`Explain the plan, then trust your captains`, b:`Nelson briefed his captains so thoroughly that he hardly needed to signal during the battle. His core guidance was that no captain could go far wrong by placing his ship alongside an enemy. Shared intent let every ship act on its own.`, try:`Can your team explain the plan and its goal without you in the room? If not, brief them until they can.`}},
    {when:'21 October, afternoon', title:'The pell-mell battle',
     a:[['g',160,174,190,160,210,150],['g',184,264,210,280,236,294],['td',246,40,252,60,262,78]],
     call:{side:'t', who:'Admiral Dumanoir', q:`You command the allied van. The battle is raging behind you and the signals from the flagship are unclear. What do you do?`, opts:[
       {t:`Keep your course and hold the line as ordered`, hist:true, ok:false, fb:`Close to what happened. Dumanoir was slow to turn, and his ten ships played little part.`},
       {t:`Turn back immediately and attack the British from the north`, ok:true, fb:`Ten fresh ships hitting Nelson's column from upwind could have made the battle far closer.`, alt:{u:{fs_van:[214,132]}, a:[['t',246,44,200,90,212,128]]}}]},
     move:`The battle breaks into a chaotic close-range brawl, ship against ship and sometimes two against one. British crews fire faster and more accurately. One by one, allied ships in the center and rear are dismasted or forced to surrender. The allied van, under Dumanoir, keeps sailing away from the fight for over an hour before turning back too late.`,
     why:`Cutting the line created local superiority: in the center and rear, the British outnumbered the allies, while the van was out of the fight.`,
     tv:`Dumanoir's ships were upwind of the fight in light air. Turning a squadron around took a long time, and the signals from Villeneuve's flagship were confused. By the time he came back, the battle was decided.`,
     board:{h:`Local superiority beats overall numbers`, b:`The allies had more ships, but at the point of contact the British had more. The question is never just how big you are, but how much you can bring to one place at one time.`, try:`Where could you outnumber a bigger competitor at one specific point: one client, one category, one moment?`}},
    {when:'21 October, 1:15 to 4:30 p.m.', title:'Nelson falls',
     a:[['td',262,80,150,60,10,30],['td',250,322,300,200,330,78]],
     move:`At about 1:15 p.m., a French marksman in the rigging of the Redoutable shoots Nelson on Victory's quarterdeck. He is carried below and dies about three hours later, after being told the battle is won. Villeneuve is captured. Gravina leads the surviving ships back to Cadiz; Dumanoir escapes with four.`,
     why:`By the time Nelson died, his plan had already done its work. The battle no longer depended on him.`,
     tv:`The allied crews fought hard. Many ships fought until they were wrecks before surrendering, and the losses aboard ships like Redoutable and Santisima Trinidad were terrible.`,
     board:{h:`Build a plan that survives the leader`, b:`Nelson's death did not change the outcome, because his captains already understood what to do. A strategy that depends on one person being present is fragile.`, try:`If you were out for a month starting tomorrow, what would stall? Fix one of those today.`}},
    {when:'21 to 28 October', title:'The storm', a:[],
     move:`A great storm hits as the battle ends. Many captured ships are wrecked or scuttled, and some are recaptured. In the end the combined fleet loses 22 of its 33 ships. Britain loses none. Napoleon, already marching on Austria, never again seriously threatens to invade Britain.`,
     why:`Trafalgar settled control of the seas for the rest of the Napoleonic Wars. Six weeks later, Napoleon won at Austerlitz on land. Britain ruled the waves; France dominated the continent.`,
     tv:`Napoleon blamed Villeneuve and the navy. Villeneuve was later released in a prisoner exchange and died in France in 1806 in unclear circumstances.`,
     board:{h:`Some wins change the board for decades`, b:`Trafalgar did not end the war, but it permanently changed what each side could attempt. Look for the moves that change the rules of the game, not just the score.`, try:`What single move would permanently change what your competitors can attempt against you?`}}
  ]
});
