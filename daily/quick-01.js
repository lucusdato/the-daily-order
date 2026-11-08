/* Quick-play layer for dailies 1 to 30: short briefs, short spoiler-free options, staff hints.
   g: at-a-glance rows [you, enemy, ground, win]. d: per decision {s: situation in a line, o: option labels in original order, h: staff hint}.
   un: spoiler-safe unit names shown until the debrief. fx: spoiler-safe terrain notes [name, text] by feature index. */

PGD.quick(1,{
  g:['About 1,000: steady regulars, rookie militia, a few horsemen','About 1,100 British regulars, eager and exhausted','Open pasture, two low rises, a river behind you','Wreck Tarleton\'s force before it wrecks yours'],
  d:[{s:'Your militia can shoot, but they break when bayonets come at them.',o:['Put them in the main line','Put them out front, then pull them back','Keep them in reserve, out of sight'],h:'Tarleton expects militia to run. What if running is the plan?'},
     {s:'Your main line is falling back in good order. The British are chasing in a ragged crowd.',o:['Stop and fight where they stand','Fall back to the next rise, then turn','Send in the hidden cavalry right now'],h:'A crowd running uphill is not a formed line.'},
     {s:'The British are stunned and disordered after a volley at close range.',o:['Hold your ground and let them go','Charge, with flank attacks on both sides','Send only the cavalry after them'],h:'Shocked troops recover fast if left alone.'}],
  fx:{1:['The second rise','A second low hill behind the first.']}
});
PGD.quick(2,{
  g:['About 370 Greek ships, many crews from a burning Athens','Probably 600 to 1,000 Persian ships','Open bay outside, a narrow strait inside','Destroy the Persian fleet before your allies sail home'],
  d:[{s:'Your allies want to sail away. The Persian fleet waits in the open bay.',o:['Withdraw to Corinth with the allies','Attack them in the open bay','Send Xerxes a secret message'],h:'Where would a huge fleet be weakest? How do you get it there?'},
     {s:'The Persian fleet is rowing into the strait at dawn.',o:['Rush out to the wide mouth','Back water, then ram their flank','Stay at anchor by the beach'],h:'The deeper they come, the more crowded they get.'}]
});
PGD.quick(3,{
  g:['One German army in East Prussia','Two Russian armies, together much bigger','Lakes and forest split the Russian armies','Beat the Russians before they unite'],
  d:[{s:'Rennenkampf comes from the east, Samsonov from the south. Your railways are excellent.',o:['Retreat behind the Vistula','Hit Rennenkampf with everything','Screen Rennenkampf, rail south, hit Samsonov'],h:'Rennenkampf is moving slowly. Samsonov is moving fast and tired.'},
     {s:'Samsonov\'s center is pushing hard into your middle.',o:['Reinforce the center, stop him head-on','Hit both his flanks and close behind','Wait to see what Rennenkampf does'],h:'An enemy pushing forward is leaving his sides behind.'}]
});
PGD.quick(4,{
  g:['Norman knights, infantry and archers','English shield wall on a ridge, King Harold in the middle','A ridge with marsh on both ends','Break the shield wall before dark'],
  d:[{s:'Your left wing is fleeing and a rumor says you are dead. Some English have chased them downhill.',o:['Show yourself and turn on the chasers','Pull everyone back to regroup','Ignore it, push up the center'],h:'Panic spreads on a rumor. So does courage.'},
     {s:'The shield wall is thinner, but still holding the ridge.',o:['Keep attacking head-on','Draw them down, and shoot high','Wait for them to come to you'],h:'Shields block what comes straight at them.'}],
  fx:{2:['The slope','A long, open slope below the English line.']}
});
PGD.quick(5,{
  g:['Four Viet Minh divisions and hidden artillery','A French garrison of strongpoints in a valley','A valley floor ringed by hills you hold','Take the base and break French will'],
  d:[{s:'Your guns are only partly in place. Your staff wants to attack tonight.',o:['Attack tonight as planned','Call it off and prepare a siege','Skip the valley, push into Laos'],h:'A failed first attack can be worse than no attack.'},
     {s:'The airstrip is under your guns. The French hold on in their strongpoints.',o:['Mass assaults until it falls','Trench forward and take them one by one','Pull back and starve them'],h:'Open ground is what killed your men before.'}]
});
PGD.quick(6,{
  g:['About 35,000 Prussians','About 65,000 Austrians in a long line','Low hills between you and them','Win a battle Prussia cannot afford to lose'],
  d:[{s:'The Austrian line runs for kilometres, facing west toward you.',o:['Attack straight along the whole line','Feint right, march south, hit their left','Dig in and let them attack'],h:'A long line is only as strong as its end.'},
     {s:'The Austrians have swung around to form a new line at Leuthen village. Their cavalry is moving to attack.',o:['Halt and hold before dark','Press on and unleash your cavalry','Pull back west to safety'],h:'Their cavalry is about to show you its side.'}],
  un:{p_adv:'Advance guard'},
  fx:{0:['The low hills','Low hills between the armies that block the view.'],2:['The Austrian left','The southern end of the Austrian line.']}
});
PGD.quick(7,{
  g:['A Mamluk army, roughly equal in size','A Mongol army that has never lost','A valley with wooded hills around it','Stop the Mongol advance into Egypt'],
  d:[{s:'The Mongols love to fake a retreat and lure enemies into a trap.',o:['Meet them head-on in the valley','Show a little, then fall back to the hills','Hold a fortified camp and wait'],h:'What if you used their favorite trick on them?'},
     {s:'Your left wing is starting to give way under a Mongol charge.',o:['Order a general retreat','Ride in yourself with the reserve','Let the left fend for itself'],h:'Armies watch their commander.'}],
  un:{m_main:'Main Mamluk army'},
  fx:{0:['The wooded hills','Trees and slopes at the edge of the valley.']}
});
PGD.quick(8,{
  g:['RAF Fighter Command, fewer fighters','The Luftwaffe, more planes and confident','The Channel, radar and airfields','Keep the RAF alive so invasion stays impossible'],
  d:[{s:'France is falling. The government wants more fighter squadrons sent there.',o:['Send them','Refuse, in writing','Send half'],h:'What happens to Britain if the fighters are gone?'},
     {s:'Raids are coming daily. You have radar and control rooms the enemy underrates.',o:['Big patrols over the coast all day','Wait on the ground, then send precisely','Build huge formations, then attack'],h:'Fuel and pilots are your scarcest things.'},
     {s:'15 September: the biggest raid yet is heading for London.',o:['Hold back a reserve','Commit every squadron','Hit their airfields in France instead'],h:'The enemy thinks you are nearly finished.'}]
});
PGD.quick(9,{
  g:['About 47,000 Macedonians and Greeks','A Persian army several times larger','A wide plain Darius has leveled','Break Darius\'s army, ideally by reaching Darius'],
  d:[{s:'Their line is so long it overlaps yours on both ends.',o:['Attack straight at the center','Angle right and make them follow','Attack at night'],h:'If they move to match you, something has to stretch.'},
     {s:'A gap has opened in the Persian line near Darius. Your left is under heavy pressure.',o:['Ride back to help your left','Drive straight through the gap','Wait for the phalanx to catch up'],h:'Gaps close fast.'}],
  fx:{1:['The Persian center','Where Darius stands with his royal guard.']}
});
PGD.quick(10,{
  g:['About 150 soldiers, many sick','About 3,000 to 4,000 Zulu warriors','Two buildings, a stone kraal, a rocky hill','Hold the post until help comes'],
  d:[{s:'Warriors are about an hour away. You have wagons, sick men and stacks of supplies.',o:['Load the sick and retreat','Stay and wall the buildings together','Hold only the stone storehouse'],h:'Could you outrun them with wagons?'},
     {s:'Night is falling and your walls are too long to man.',o:['Hold every metre','Pull back to an inner wall','Charge out to drive them off'],h:'Fewer metres of wall, more rifles per metre.'}],
  fx:{3:['The open yard','Open ground between the hospital and the storehouse.']}
});
PGD.quick(11,{
  g:['Eastern Army, perhaps 75,000 to 90,000','Western Army, about as big, holding the hills','A valley ringed by enemy hills','Smash Ishida\'s coalition in one day'],
  d:[{s:'Several enemy lords have secretly promised to switch sides. None has moved yet.',o:['Wait for them to move first','Attack the center right now','Pull back until the switch is certain'],h:'Waverers back whoever looks like winning.'},
     {s:'Midday. Kobayakawa\'s big army still sits on its hill, watching.',o:['Attack his hill','Force him to choose, now','Keep waiting'],h:'He is waiting to be pushed.'}]
});
PGD.quick(12,{
  g:['Grant\'s army and a river fleet','Pemberton at Vicksburg, Johnston gathering at Jackson','A fortress on bluffs, swamps to the north','Take Vicksburg and open the river'],
  d:[{s:'Months of tries through the northern swamps have failed.',o:['Keep trying the swamps','Go back to Memphis, start over','Go south past the guns and cross'],h:'The guns are deadly by day. What about at night?'},
     {s:'You are across the river, with an enemy army on each side of you.',o:['Build a supply line first','Strike east first, then west','March straight on Vicksburg'],h:'If they join up, you are outnumbered.'}],
  fx:{2:['Bruinsburg','Dry ground on the east bank, south of the city.']}
});
PGD.quick(13,{
  g:['About 11,000 armored Greek infantry','A bigger Persian army with archers and cavalry','A coastal plain between hills and sea','Stop the Persians before they reach Athens'],
  d:[{s:'Days of standoff. Sparta is late. The Persian cavalry may not be in position.',o:['Keep waiting for Sparta','Attack now','March back to guard Athens'],h:'What was their best weapon against you?'},
     {s:'Their line is longer than yours. Their best troops are in the middle.',o:['Stay deep everywhere','Thin center, strong wings, run','Make the center strongest'],h:'If your ends get wrapped, nothing else matters.'}],
  hook:'The Persians have landed. Help is on the way, slowly.',
  fx:{1:['The Great Marsh','Swampy ground at the northern end of the plain.']}
});
PGD.quick(14,{
  g:['Fast tank divisions with dive bombers','French reservists behind a river, reserves far off','A river at Sedan, open country beyond','Break through and cut off the Allies'],
  d:[{s:'Your tanks reached the river early. Your artillery is days behind.',o:['Wait for artillery','Cross tomorrow, with aircraft as artillery','Look north for an easier crossing'],h:'Every day you wait, they dig.'},
     {s:'You are over the river. Orders say halt.',o:['Halt as ordered','Race west to the Channel','Turn south for Paris'],h:'Where are the Allies\' best armies?'},
     {s:'The Allies are trapped at Dunkirk. Your tanks are worn out.',o:['Halt and let aircraft finish it','Keep the tanks moving in','Pull back to refit'],h:'Who gains most from a three-day pause?'}]
});
PGD.quick(15,{
  g:['About 6,000 to 7,000 Scots, mostly spearmen','Perhaps 15,000 to 20,000 English with heavy knights','Woods, streams and soft ground near Stirling','Stop the English relieving Stirling Castle'],
  d:[{s:'The English army is marching up the road to Stirling. You pick the ground.',o:['Meet them in open fields','Hold the woods and dig in','Lift the siege and avoid battle'],h:'What do heavy knights need most?'},
     {s:'Dawn. The English camped overnight on soft ground between streams.',o:['Withdraw and raid instead','Advance and attack them now','Wait in the woods'],h:'Their cavalry has no room. Their archers do.'}],
  fx:{2:['The road to Stirling','Open ground where the road runs north to the castle.']}
});
PGD.quick(16,{
  g:['About 200 Israeli combat aircraft','A larger Egyptian air force on many bases','Airfields across Sinai and the Nile Delta','Destroy their air force in the first hours'],
  d:[{s:'You know their daily routine in detail.',o:['Strike at dawn','Strike at about 7:45 a.m.','Strike at night'],h:'When do defenders stop expecting an attack?'},
     {s:'Their radar watches mainly east, toward you.',o:['Fly high and direct, balanced force','Fly low over the sea, nearly all in','Send half, keep half home'],h:'The first blow decides whether there is a second.'}],
  fx:{0:['The Mediterranean','Open sea north of the Egyptian coast.']}
});
PGD.quick(17,{
  g:['13 British ships of the line','13 French ships at anchor, a huge flagship','A bay with shoals on the landward side','Destroy the fleet that carried Napoleon'],
  d:[{s:'You found them late in the day. Night is near and you have no charts.',o:['Wait for dawn','Attack now','Blockade the bay'],h:'Many French sailors are ashore.'},
     {s:'Their line is anchored along the shoals. The first ship has room to swing.',o:['Line up seaward, ship for ship','Pass around the head, fight both sides','Go for the flagship'],h:'Which side of their ships is ready to fire?'}],
  un:{gb_inside:'British ships (lead group)',gb_outside:'British ships (second group)'},
  fx:{1:['The head of the line','The leading French ship, anchored near the shoals.']}
});
PGD.quick(18,{
  g:['Germanic warriors, brave but lightly armed','Three Roman legions, the best in the world','Forest, hills and bog','Destroy the legions, end Roman rule'],
  d:[{s:'Varus trusts you completely. His army is heading for winter quarters.',o:['Revolt openly and fight','Lure him on a detour','Storm his summer camp'],h:'You know which roads he will take.'},
     {s:'The Roman column is strung out for kilometres in the rain.',o:['Hit the head right away','Wait for the narrowest spot','Attack their night camp'],h:'Legions need room to form up.'}],
  hook:'The Roman legions are the best army in the world in open battle. You need to beat them anyway.',
  un:{ge_wall:'Warriors (hill side)'}
});
PGD.quick(19,{
  g:['Over a million Soviet troops','Germany\'s best tank divisions','A bulge in the front line around Kursk','Defeat the attack, then go on the attack'],
  d:[{s:'You know they will attack the bulge. Stalin wants to strike first.',o:['Strike first','Dig deep, then counterattack','Pull out of the bulge'],h:'Attacking is costly. So is being attacked, if you are ready.'},
     {s:'Their attack has stalled after heavy losses.',o:['Wait until they retreat','Counterattack now','Feed the reserve into gaps'],h:'They are off balance right now.'}],
  un:{so_belts:'Soviet artillery',so_steppe:'Steppe Front'},
  fx:{1:['The open steppe','Rolling farmland and villages, good for tanks and for digging.'],2:['Steppe Front','A large Soviet army east of the bulge, not yet committed.']}
});
PGD.quick(20,{
  g:['About 52,000 Allied troops','About 56,000 French and Bavarians','A marshy stream, three villages','Destroy their army and save Vienna'],
  d:[{s:'Their infantry holds the villages. Their center is mostly cavalry.',o:['Hit the center now','Attack Blenheim village hard','Attack only in the north'],h:'Defenders reinforce whatever is shouting loudest.'},
     {s:'Blenheim is packed with French infantry. You are across the stream in the center.',o:['Keep assaulting Blenheim','Pin Blenheim, break the center','Pull back before dark'],h:'Those packed soldiers are not in the center.'}],
  un:{al_cutts:'Cutts\'s British infantry'}
});
PGD.quick(21,{
  g:['About 20,000 Zulu warriors','A British column with modern rifles and guns','Plateau and hidden valleys above an open plain','Destroy the column and end the invasion'],
  d:[{s:'The British camp sits below Isandlwana. Their commander is hunting for you.',o:['Cross the plain in daylight','Slip close, unseen','Go after his column'],h:'An army that cannot be found cannot be prepared for.'},
     {s:'British scouts have just found you. You had not planned to fight today.',o:['Pull back, fight another day','Attack now, in the horns','Charge straight at the line'],h:'Half their column is away.'}],
  fx:{0:['The Ngwebeni valley','A valley on the plateau, out of sight of the British camp.']}
});
PGD.quick(22,{
  g:['13 Korean warships','133 Japanese warships','A narrow strait with a tidal current','Stop the fleet getting through'],
  d:[{s:'The court has ordered you to give up the navy.',o:['Obey: scuttle and join the army','Fight them in open sea','Block the narrow strait'],h:'Where does a big fleet stop being big?'},
     {s:'Your flagship is fighting nearly alone. The current favors them, for now.',o:['Retreat with the fleet','Hold and wait for the tide','Charge into their fleet'],h:'Tides turn. So do captains.'}]
});
PGD.quick(23,{
  g:['About 195,000 men, over 1,000 tanks','About 116,000 Axis troops, low on fuel','Desert, minefields, no open flank','Break through and destroy Rommel\'s army'],
  d:[{s:'Your build-up is huge and the desert is flat. They are waiting behind minefields.',o:['Attack in the south','Attack in the north, with a trick','Attack the whole front'],h:'Where does a breakthrough actually lead?'},
     {s:'Your tanks are jammed in the minefields. Rommel is back and hitting you.',o:['Call it off and rethink','Grind on, build a fresh punch','Push tanks down the same paths'],h:'Every counterattack costs him fuel he lacks.'}],
  hook:'There is no open flank to go around. Somewhere, you have to go through.',
  un:{gb_dummy:'Southern sector troops'},
  fx:{2:['The southern sector','Thinner minefields in open desert, far from the coast road.']}
});
PGD.quick(24,{
  g:['Perhaps 60,000 to 75,000 Romans','A trapped Gallic army and a bigger one coming','A hilltop town ringed by your siege wall','Capture Vercingetorix'],
  d:[{s:'Vercingetorix is starving inside. A huge relief army is on its way.',o:['Storm the town now','Lift the siege','Build a second wall, facing out'],h:'Your soldiers dig faster than anyone alive.'},
     {s:'They found your weak spot and are hitting it from both sides at once.',o:['Hold every part equally','Rush the reserve there, and hit back','Fall back to the inner wall only'],h:'You cannot be strong everywhere.'}],
  un:{ro_outer:'Legions (north camps)'},
  fx:{1:['The plain around the hill','Open ground beyond the siege lines, where any relief army would arrive.']}
});
PGD.quick(25,{
  g:['About 60,000 Confederates','About 130,000 Union troops','Dense forest called the Wilderness','Beat Hooker before he traps you'],
  d:[{s:'Most of Hooker\'s army has crossed upstream, onto your flank.',o:['Retreat toward Richmond','Leave a few, strike Hooker','Stay put and wait'],h:'He expects you to retreat.'},
     {s:'Hooker is dug in. His far right flank is open and facing the wrong way.',o:['Attack head-on','Send most of the army around','Withdraw while you can'],h:'The forest hides more than trees.'}],
  fx:{2:['A forest road','A little-used road running west through the Wilderness.']}
});
PGD.quick(26,{
  g:['About 57,000 infantry, 12,000 cavalry','Tired, hungry Ottoman armies','A coastal plain, hills, a key valley','Destroy the Ottoman armies in Palestine'],
  d:[{s:'Two raids east have convinced them your next attack comes in the Jordan Valley.',o:['Attack the Jordan Valley','Mass on the coast, secretly','Attack evenly everywhere'],h:'What do they already believe?'},
     {s:'Your infantry has broken through near the coast.',o:['Keep the cavalry back','Send the cavalry deep','Chase them directly'],h:'All their roads meet in one valley.'}],
  un:{br_dummy:'Jordan Valley camps'}
});
PGD.quick(27,{
  g:['American and French armies near New York','Cornwallis at Yorktown, Clinton in New York','A coastal town with a bay behind it','Win big before the French fleet leaves'],
  d:[{s:'The French fleet is heading for the Chesapeake, not New York, and only until mid-October.',o:['Stick with New York','Switch to Virginia','Wait for a better moment'],h:'Go where your strongest ally can be.'},
     {s:'A British fleet is coming to rescue Cornwallis.',o:['Fleet waits in the bay','Fleet goes out to fight','Let Cornwallis sail away'],h:'Cornwallis lives or dies by the sea.'}],
  fx:{2:['The road south','About 700 km of roads from New York to Virginia.']}
});
PGD.quick(28,{
  g:['About 68,000, a mixed army','Napoleon with about 73,000 veterans','A low ridge, two walled farms','Hold until Blücher arrives, then win'],
  d:[{s:'Blücher promises to come tomorrow. Napoleon is following you.',o:['Retreat to Brussels','Stand on the ridge, dug in','Line up in full view, out front'],h:'French artillery is deadly at what it can see.'},
     {s:'Evening. Napoleon sends his elite Guard up the ridge.',o:['Withdraw before it arrives','Stay hidden, then rise and fire','Charge it with cavalry'],h:'They expect a beaten line.'}],
  fx:{0:['The ridge','A low ridge. Behind its crest, the ground drops out of sight.']}
});
PGD.quick(29,{
  g:['About 600 cavalry, tired from a night march','A huge Lakota, Cheyenne and Arapaho camp','A river valley under bluffs and ravines','Your orders: find the camp, coordinate with other columns'],
  d:[{s:'Scouts say the camp is the biggest they have seen, and that you have been spotted.',o:['Attack now','Hold, scout, coordinate','Withdraw and report'],h:'What are your scouts telling you?'},
     {s:'Reno\'s attack has failed. Your regiment is split into pieces.',o:['Push north, attack elsewhere','Reunite the regiment','Message Benteen, wait'],h:'Scattered pieces cannot help each other.'}],
  fx:{1:['The bluffs','Rough, broken ground east of the river.'],2:['A hilltop','High ground on the bluffs above the river.']}
});
PGD.quick(30,{
  g:['Over 600,000 coalition troops','Iraqi divisions dug in facing south and east','Open desert, a coast, a border','Free Kuwait with as few losses as possible'],
  d:[{s:'Their defenses face south and the sea. The western desert is lightly held.',o:['Smash straight into Kuwait','Land from the sea','Pin them, hook far west'],h:'Where are they not looking?'},
     {s:'Moving two corps west is huge and visible from the air.',o:['Move now','Move once they are blind','Do not move: air power only'],h:'What happens to their eyes once the air war starts?'}],
  fx:{0:['The coast','Kuwait\'s coast, where Iraq expects a landing.'],2:['The western desert','Open, lightly defended desert west of Kuwait.']}
});
