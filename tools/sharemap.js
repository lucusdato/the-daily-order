/* The map picture for a day's post: the board as the player first sees it, with the numbered places and their names.

     node tools/sharemap.js            today's order
     node tools/sharemap.js 9          day 9
     node tools/sharemap.js 1 14       days 1 to 14

   Writes maps/day-N.png (1200 wide, made for an X post). It opens the real site in a headless browser with the clock
   set to that day, so the picture is exactly the game's own board. Needs Playwright with Chromium; no other dependencies. */
const fs=require('fs'), path=require('path'), http=require('http');
const root=path.join(__dirname,'..'), out=path.join(root,'maps'), START='2026-11-08';
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.webmanifest':'application/manifest+json'};

const args=process.argv.slice(2).map(Number).filter(n=>n>0);
function today(){
  const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
  return Math.round((Date.parse(`${p.year}-${p.month}-${p.day}`)-Date.parse(START))/864e5)+1-(Number(p.hour)<4?1:0);
}
const from=args[0]||today(), to=args[1]||from;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

(async()=>{
  const { chromium } = require('playwright');
  const server=http.createServer((req,res)=>{
    const f=path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/,'/index.html'));
    if(!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); return res.end(); }
    res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch();
  fs.mkdirSync(out,{recursive:true});
  let failed=0;
  for(let day=from; day<=to; day++){
    const ctx=await browser.newContext({viewport:{width:1280,height:900},deviceScaleFactor:2});
    try{
      const page=await ctx.newPage();
      const d=new Date(START+'T12:00:00'); d.setDate(d.getDate()+day-1);
      await page.clock.setFixedTime(d);                      /* the site shows the order for "today" */
      await page.goto(base+'#daily'); await page.waitForFunction(()=>typeof D!=='undefined' && D.sc && D.n && typeof mGo==='function', null, {timeout:15000});
      await page.waitForTimeout(800);
      await page.evaluate(()=>mGo());                          /* past the briefing, onto the map with its numbered places */
      await page.waitForSelector('.zb'); await page.waitForTimeout(1500);
      const info=await page.evaluate(()=>({ n:D.n, name:D.sc.name, year:D.sc.year, who:(D.sc.m.general||D.sc.you), side:D.sc.side,
        places:[...document.querySelectorAll('.zb')].map(b=>b.textContent.trim().replace(/^\d+\s*/,'')) }));
      if(info.n!==day) throw new Error(`the site opened order ${info.n}, not ${day}`);
      const board=(await page.locator('#board').screenshot()).toString('base64');
      const fonts=await page.evaluate(()=>[...document.querySelectorAll('link[href*="fonts.googleapis"]')].map(l=>l.outerHTML).join(''));
      const card=await ctx.newPage(); await card.setViewportSize({width:600,height:800});
      await card.setContent(`<!doctype html><meta charset="utf-8">${fonts}<style>
        *{box-sizing:border-box;margin:0} body{width:600px;background:#1c6b6b;font-family:'Archivo',system-ui,sans-serif;color:#f7f1e1}
        header{padding:16px 20px 12px} h1{font:700 27px/1.15 'Oswald','Archivo',sans-serif;letter-spacing:.3px;text-transform:uppercase}
        header p{font-size:16px;margin-top:3px;opacity:.92}
        img{display:block;width:572px;height:572px;margin:0 14px;border-radius:8px;border:2px solid #17110a}
        ol{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:7px 14px;padding:13px 20px 6px}
        li{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;line-height:1.2}
        li b{flex:none;width:25px;height:25px;border-radius:50%;background:#f1dc9a;color:#17110a;display:grid;place-items:center;font-size:14px;border:2px solid #17110a}
        footer{padding:6px 20px 14px;font-size:14px;opacity:.85;display:flex;justify-content:space-between}
      </style><body><header><h1>${esc(info.name)}, ${esc(info.year)}</h1><p>You're ${esc(info.who)}${info.side==='g'?', in green':info.side==='t'?', in tan':''}. Where do you make your move?</p></header>
      <img src="data:image/png;base64,${board}" alt="">
      <ol>${info.places.map((t,i)=>`<li><b>${i+1}</b>${esc(t)}</li>`).join('')}</ol>
      <footer><span>The Daily Order #${day}</span><span>thedailyorder.io</span></footer></body>`);
      await card.evaluate(()=>document.fonts.ready);
      const file=path.join(out,`day-${day}.png`);
      await card.locator('body').screenshot({path:file});
      console.log(`${path.relative(root,file)}  ${info.name}: ${info.places.join(' / ')}`);
    }catch(e){ failed++; console.error(`day ${day}: ${e.message.split('\n')[0]}`); }
    await ctx.close();
  }
  await browser.close(); server.close();
  process.exit(failed?1:0);
})();
