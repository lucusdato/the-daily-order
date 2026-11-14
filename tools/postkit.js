/* The day's outreach posts, written from the battle itself. Plain node, no dependencies.

     node tools/postkit.js                 today's order (4 AM Toronto roll)
     node tools/postkit.js 9               day 9
     node tools/postkit.js 2026-11-20      the order for that date
     node tools/postkit.js --sub wargames  tag the Reddit link for r/wargames

   Prints: the X poll and its link reply, tomorrow's reveal of this battle, and a Reddit text post with its link comment.
   The X poll asks only where the move goes, and nothing here gives the answer on the day, so the game is not spoiled.
   Links carry the tags js/retain.js remembers, so each placement shows up in GoatCounter as evt-src-CAMPAIGN-step. */
const fs=require('fs'), vm=require('vm'), path=require('path');
const root=path.join(__dirname,'..'), SITE='https://thedailyorder.io/', START='2026-11-08', ROLL=4, TZ='America/Toronto';

/* load the battles the same way tools/feeddata.js does */
const byN={}, mys={};
const any=new Proxy(function(){return any;},{get:(t,k)=>k===Symbol.toPrimitive?()=>'' :any, apply:()=>any});
const ctx={ PGD:{ add(o){ byN[o.n]=o; }, mystery(n,m){ mys[n]=m; }, quick(){} }, console };
ctx.window=ctx;
const sandbox=new Proxy(ctx,{has:()=>true, get:(t,k)=>k in t?t[k]:(k===Symbol.unscopables?undefined:any)});
const man={}; vm.runInNewContext(fs.readFileSync(path.join(root,'daily/manifest.js'),'utf8')+';this.F=PGD_FILES;this.R=PGD_RELEASE;',man);
for(const f of man.F){ try{ vm.runInNewContext(`with(sb){${fs.readFileSync(path.join(root,'daily',f),'utf8')}\n}`,{sb:sandbox}); }catch(e){ console.error('postkit: skipped',f,e.message); } }

/* which day */
const args=process.argv.slice(2), si=args.indexOf('--sub'), sub=si>=0?String(args[si+1]||'').replace(/^r\//,''):'';
const pick=args.find((a,i)=>!a.startsWith('--') && !(si>=0 && i===si+1));
const dayOf=ymd=>Math.round((Date.parse(ymd)-Date.parse(START))/864e5)+1;
function today(){
  const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
  return dayOf(`${p.year}-${p.month}-${p.day}`) - (Number(p.hour)<ROLL?1:0);
}
const day = !pick ? today() : /^\d{4}-\d\d-\d\d$/.test(pick) ? dayOf(pick) : Number(pick);
const n=man.R[day-1];
if(!n || !byN[n] || !mys[n]){ console.error(`postkit: no battle scheduled for day ${day} (the schedule has ${man.R.length} days)`); process.exit(1); }

const s=byN[n], m=mys[n];
const plain=t=>String(t||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const who=plain(m.general||s.you), cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
const head=`${plain(s.name)}, ${s.year}. You are ${who}.`;
const link=c=>`${SITE}?utm_source=${c.startsWith('r-')?'reddit':'x'}&utm_medium=${c.startsWith('r-')?'community':'social'}&utm_campaign=${c}`;
const zones=(m.zones||[]).map(z=>({id:z[0],label:plain(z[1])})), toys=(m.toys||[]).map(t=>({id:t[0],label:plain(t[1])}));
const warn=[];

/* X: a poll on where the move goes. A poll cannot carry an image, and takes four options of 25 characters at most. */
const ASK='Where do you make your move?';
let xpost=[head,'',plain(m.sit),'',ASK].join('\n');
if(xpost.length>280) xpost=[head,'',plain(m.pitch).replace(/^You are [^.]+\.\s*/,''),'',ASK].join('\n');
if(xpost.length>280) warn.push(`X post is ${xpost.length} characters; trim it to 280.`);
if(zones.length<2 || zones.length>4) warn.push(`X polls take 2 to 4 options; this battle has ${zones.length} places. Post the options as A/B/C/D text instead.`);
zones.forEach(z=>{ if(z.label.length>25) warn.push(`Poll option "${z.label}" is ${z.label.length} characters; shorten it to 25.`); });

/* tomorrow: what the commander did, said about this battle once its day is over */
const au=[].concat(m.ans.u), az=m.ans.z, lab=(list,id)=>(list.find(x=>x.id===id)||{label:id}).label;
const why=t=>plain(t).replace(/^Right (toy|place)\.\s*/,'');
const mkReveal=whys=>[`Yesterday's order: ${plain(s.name)}, ${s.year}.`,'',
  `${cap(who)} sent the ${au.map(u=>lab(toys,u).toLowerCase()).join(' or the ')} to: ${lab(zones,az)}.`,
  whys.filter(Boolean).join(' '),'',
  '[add the poll result: "NN% of you chose ..."]'].join('\n');
let reveal=mkReveal([why((m.fbU||{})[au[0]]), why((m.fbZ||{})[az])]);
if(reveal.length>280) reveal=mkReveal([why((m.fbZ||{})[az])]);   /* too long: keep the reason for the place, which is what the poll asked */
if(reveal.length>280) warn.push(`Reveal is ${reveal.length} characters before the poll result; trim it to 280.`);

/* Reddit: the whole dilemma as a text post, the link in a comment */
const rc='r-'+(sub||'SUBNAME').toLowerCase().replace(/[^a-z0-9]+/g,'-');
const rtitle=`${plain(s.name)}, ${s.year}: you are ${who}. What is your order?`;
const rbody=[plain(m.lead),'',plain(m.sit),'',
  `You have: ${toys.map(t=>t.label.toLowerCase()).join(', ')}.`,
  'You can send one of them to:', ...zones.map(z=>'- '+z.label),'',
  `Which do you send, where, and why? I will post what ${who} actually did tomorrow.`].join('\n');
const rcomment=`This is today's battle from The Daily Order, a free daily game I make. You give the order on a map and watch the real battle play out. No sign-up: ${link(rc)}`;

const out=[
`THE DAILY ORDER #${day} · ${plain(s.name)}, ${s.year}`,
'',
'=== X · POST (as a poll, 1 day) ' + '='.repeat(30), xpost, '',
'Poll options:', ...zones.map((z,i)=>`  ${i+1}. ${z.label}`), '',
'=== X · REPLY TO YOUR OWN POST ' + '='.repeat(31),
`Play it on the map and see if you matched ${who}:\n${link('x-daily')}`, '',
'=== X · TOMORROW, QUOTING THIS POLL ' + '='.repeat(26), reveal, '',
`=== REDDIT · TEXT POST${sub?' in r/'+sub:''} ` + '='.repeat(20),
'Title: '+rtitle, '', rbody, '',
'=== REDDIT · YOUR FIRST COMMENT ' + '='.repeat(30), rcomment,
...(sub?[]:['','(pass --sub NAME to tag the Reddit link for that subreddit)']),
...(warn.length?['','=== FIX BEFORE POSTING ' + '='.repeat(39), ...warn.map(w=>'- '+w)]:[])
];
console.log(out.join('\n'));
