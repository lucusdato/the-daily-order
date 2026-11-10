/* Sends today's order to the Buttondown list. Run by .github/workflows/daily-email.yml.
   Reads the schedule from the live site (falls back to the copy in the repo), works out today's order number
   in Toronto time, and sends one email per order: if an email for this order already exists, it does nothing. */
import fs from 'node:fs';
const KEY = process.env.BUTTONDOWN_API_KEY;
if (!KEY) { console.log('No BUTTONDOWN_API_KEY secret set, nothing to do.'); process.exit(0); }
const API = 'https://api.buttondown.com/v1/emails';
const H = { Authorization: `Token ${KEY}`, 'Content-Type': 'application/json' };

let feed;
try { const r = await fetch('https://thedailyorder.io/daily/feed-data.json', { cache: 'no-store' }); if (!r.ok) throw new Error(r.status); feed = await r.json(); }
catch (e) { console.log('Live schedule unavailable, using the repo copy.', String(e)); feed = JSON.parse(fs.readFileSync(new URL('../daily/feed-data.json', import.meta.url))); }

const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: feed.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
  .formatToParts(new Date()).map(p => [p.type, p.value]));
const hour = +parts.hour;
if (hour < feed.rollHour) { console.log(`It is ${hour}:00 in Toronto, before ${feed.rollHour} AM. Not yet.`); process.exit(0); }
const today = Date.UTC(+parts.year, +parts.month - 1, +parts.day), start = Date.UTC(...feed.start.split('-').map((v, i) => i === 1 ? v - 1 : +v));
const n = Math.round((today - start) / 864e5) + 1;
const d = feed.days.find(x => x.day === n);
if (!d) { console.log(`No order scheduled for day ${n}.`); process.exit(0); }

const subject = `Order #${n}: ${d.war}, ${d.year}`;
const list = await fetch(`${API}?ordering=-creation_date`, { headers: H });
if (!list.ok) { console.error('Could not list emails:', list.status, await list.text()); process.exit(1); }
const existing = ((await list.json()).results || []).some(e => (e.subject || '').startsWith(`Order #${n}:`));
if (existing) { console.log(`Order #${n} has already been sent.`); process.exit(0); }

const url = `${feed.site}/#daily-${n}`;
const body = [
  `**Order #${n} is out.**`, '',
  `${d.war}, ${d.year}. ${d.place}.`, '',
  `One real battle, one move to make, and five tries to match the general who won it.`, '',
  `[Take today's order](${url})`, '',
  `A new order arrives every morning at 4 AM.`
].join('\n');
const res = await fetch(API, { method: 'POST', headers: H, body: JSON.stringify({ subject, body, status: 'about_to_send' }) });
const txt = await res.text();
if (!res.ok) { console.error('Buttondown refused the email:', res.status, txt); process.exit(1); }
console.log(`Sent "${subject}".`);
