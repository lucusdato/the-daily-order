/* /feed.xml: one item per daily order, published at 4 AM Toronto time. Buttondown watches this feed
   and emails subscribers when a new item appears, so no deploy is needed when a new day starts.
   Data comes from daily/feed-data.json, which build.py writes from the release schedule. */

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* minutes that a time zone is ahead of UTC at a given moment */
function tzOffset(at, tz){
  const f = new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
  const p = Object.fromEntries(f.formatToParts(at).map(x=>[x.type,x.value]));
  const asUTC = Date.UTC(+p.year, +p.month-1, +p.day, +p.hour, +p.minute);
  return Math.round((asUTC - at.getTime())/60000);
}
/* the real moment that a local wall-clock time happens in a zone */
function zoned(y, m, d, h, tz){
  const guess = new Date(Date.UTC(y, m, d, h));
  return new Date(guess.getTime() - tzOffset(guess, tz)*60000);
}

export default async (req) => {
  const res = await fetch(new URL('/daily/feed-data.json', req.url));
  if(!res.ok) return new Response('feed unavailable', {status:503});
  const cfg = await res.json();
  const [sy, sm, sd] = cfg.start.split('-').map(Number);
  const now = new Date();
  const items = [];
  for(const d of cfg.days){
    const at = zoned(sy, sm-1, sd + d.day - 1, cfg.rollHour, cfg.tz);
    if(at > now) break;
    items.push({ d, at });
  }
  const recent = items.slice(-14).reverse();
  const site = cfg.site;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>The Daily Order</title>
<link>${site}/</link>
<description>A new battle every day. Can you match history's greatest generals?</description>
<language>en</language>
${recent.map(({d, at}) => {
  const link = `${site}/#daily-${d.day}`;
  const title = `Order #${d.day}: ${d.war ? d.war + ', ' : ''}${d.year}`;
  const body = `<p>Today's order is in: ${d.war ? esc(d.war) + ', ' : ''}${esc(d.year)}. ${esc(d.place)}.</p>`+
               `<p>Read the general's briefing, give your order, and see if you can match the general who won it.</p>`+
               `<p><a href="${link}">Take today's order ›</a></p>`;
  return `<item><title>${esc(title)}</title><link>${link}</link><guid isPermaLink="false">tdo-day-${d.day}</guid><pubDate>${at.toUTCString()}</pubDate><description><![CDATA[${body}]]></description></item>`;
}).join('\n')}
</channel></rss>`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8', 'cache-control': 'public, max-age=300' } });
};

export const config = { path: '/feed.xml' };
