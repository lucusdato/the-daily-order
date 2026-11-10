/* Builds daily/feed-data.json for the /feed.xml edge function: the release schedule plus each day's teaser (war, year, place).
   Run by build.py. Plain node, no dependencies. */
const fs=require('fs'), vm=require('vm'), path=require('path');
const root=path.join(__dirname,'..');
const byN={}, mys={};
const any=new Proxy(function(){return any;},{get:(t,k)=>k===Symbol.toPrimitive?()=>'' :any, apply:()=>any});
const ctx={ PGD:{ add(o){ byN[o.n]=o; }, mystery(n,m){ mys[n]=m; }, quick(){}, }, console };
ctx.window=ctx;
const sandbox=new Proxy(ctx,{has:()=>true, get:(t,k)=>k in t?t[k]:(k===Symbol.unscopables?undefined:any)});
const run=f=>vm.runInNewContext(`with(sb){${fs.readFileSync(f,'utf8')}\n;this.__m={PGD_FILES:typeof PGD_FILES!=='undefined'?PGD_FILES:null,PGD_RELEASE:typeof PGD_RELEASE!=='undefined'?PGD_RELEASE:null}}`,{sb:sandbox});
const man={}; vm.runInNewContext(fs.readFileSync(path.join(root,'daily/manifest.js'),'utf8')+';this.F=PGD_FILES;this.R=PGD_RELEASE;',man);
for(const f of man.F){ try{ run(path.join(root,'daily',f)); }catch(e){ console.error('feeddata: skipped',f,e.message); } }
const days=man.R.map((n,i)=>{ const s=byN[n]||{}, m=mys[n]||{}; return {day:i+1, war:m.war||'', year:String(s.year||''), place:s.place||''}; });
fs.writeFileSync(path.join(root,'daily/feed-data.json'), JSON.stringify({start:'2026-11-08', rollHour:4, tz:'America/Toronto', site:'https://thedailyorder.io', days},null,1));
console.log('feed-data: '+days.length+' days');
