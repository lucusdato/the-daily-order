/* ---------- reasons to come back: tomorrow's teaser, a daily reminder, and keeping progress safe ---------- */

/* tomorrow's order, without giving the battle away: just the war, the year and the place */
function nextOrderInfo(n){
  const sc = window.scFor && scFor(n+1);
  if(!sc || !sc.m) return null;
  return { war: sc.m.war || '', year: sc.year, place: sc.place || '' };
}
function teaserHtml(n){
  const t = nextOrderInfo(n);
  return `<div class="tease">
    <span class="msl">Tomorrow's order · 4 AM</span>
    ${t ? `<b>${t.war}${t.war?', ':''}${t.year}</b><p>${t.place}. Same time tomorrow?</p>`
        : `<b>A new battle at 4 AM</b><p>Same time tomorrow?</p>`}
    ${reminderHtml()}
  </div>`;
}

/* the daily email: a Buttondown signup. Buttondown watches /feed.xml and mails each new order at 4 AM */
function signupHtml(){
  const u=(window.TDO_CONFIG||{}).buttondown; if(!u) return '';
  let sub=false; try{ sub=!!localStorage.getItem('pg-sub'); }catch(e){}
  if(sub) return `<p class="rem-msg">You're on the 4 AM list ✓</p>`;
  return `<form class="rem" data-bd="${u}" novalidate>
    <label class="sr" for="bd-email">Email</label>
    <input id="bd-email" type="email" name="email" required placeholder="you@email.com" autocomplete="email" inputmode="email">
    <button type="submit" class="rem-btn">Email me each order</button>
    <p class="rem-msg" aria-live="polite">One email at 4 AM with the new battle. Unsubscribe anytime.</p></form>`;
}
function reminderHtml(){ return signupHtml(); }
document.addEventListener('submit', e => {
  const f=e.target.closest('form[data-bd]'); if(!f) return;
  e.preventDefault();
  const em=f.querySelector('input[type=email]'), msg=f.querySelector('.rem-msg'), btn=f.querySelector('button');
  if(!em.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value)){ msg.textContent='That email looks off. Try again?'; em.focus(); return; }
  btn.disabled=true; btn.textContent='Signing you up…';
  const body=new URLSearchParams({email:em.value, embed:'1', tag:'daily-order'});
  fetch(`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(f.dataset.bd)}`,{method:'POST',mode:'no-cors',body})
    .then(()=>{ f.classList.add('done'); btn.textContent='You are in ✓'; msg.textContent='Check your inbox to confirm, then look out for 4 AM.'; track('subscribe'); try{ localStorage.setItem('pg-sub','1'); }catch(x){} })
    .catch(()=>{ btn.disabled=false; btn.textContent='Email me each order'; msg.textContent="Couldn't reach the sign-up. Try again in a moment."; });
});

/* analytics: a handful of GoatCounter events that make up the funnel */
const gcOff = () => { try{ return localStorage.getItem('skipgc')==='t'; }catch(e){ return false; } };   /* GoatCounter's own opt-out flag */
function send(name){
  try{ if(gcOff()) return; const g=window.goatcounter; if(g && g.count) g.count({path:'evt-'+name, title:name, event:true}); else (window.__tdoq=window.__tdoq||[]).push(name); }catch(e){}
}
/* where this browser first came from: a tagged link (?utm_campaign=, ?utm_source= or ?ref=) is remembered, so the
   funnel can be read per source, days later too. First touch wins. Each funnel step is also counted as src-SOURCE-step. */
const SRC_KEY = 'pg-src', SRC_STEPS = ['open-order','first-move','won','lost','share','subscribe','return'];
const SRC = (function(){
  try{
    const had=localStorage.getItem(SRC_KEY); if(had) return had;
    const q=new URLSearchParams(location.search);
    const v=(q.get('utm_campaign')||q.get('utm_source')||q.get('ref')||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,24);
    if(!v) return '';
    if(Object.values(RES||{}).some(r=>r&&(r.first||(r.tries&&r.tries.length)))) return '';   /* already a player: not this link's doing */
    localStorage.setItem(SRC_KEY,v); send('src-'+v+'-land');
    return v;
  }catch(e){ return ''; }
})();
function track(name){ send(name); if(SRC && SRC_STEPS.includes(name)) send('src-'+SRC+'-'+name); }
/* the owner's own visits: open the site with #toggle-goatcounter to stop (or restart) counting this browser */
(function(){
  if(location.hash!=='#toggle-goatcounter') return;
  try{
    const off=!gcOff(); if(off) localStorage.setItem('skipgc','t'); else localStorage.removeItem('skipgc');
    history.replaceState(null,'',location.pathname+location.search);   /* before count.js loads, so it does not flip it back */
    const m=document.createElement('div'); m.setAttribute('role','status');
    m.textContent=off?'Analytics off: visits from this browser are no longer counted.':'Analytics on: visits from this browser are counted again.';
    m.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99;max-width:calc(100% - 32px);background:#1c1a17;color:#f7f1e1;font:14px/1.4 sans-serif;padding:8px 14px;border-radius:8px';
    document.body.appendChild(m); setTimeout(()=>m.remove(),4000);
  }catch(e){}
})();
/* return visits: the last game day this browser played, to see who comes back and after how long */
const LAST_KEY = 'pg-last';
function markPlayed(){ try{ localStorage.setItem(LAST_KEY,ymd(gameNow())); }catch(e){} }
(function(){
  try{
    let last=localStorage.getItem(LAST_KEY)||'';
    Object.keys(RES||{}).forEach(k=>{ const f=RES[k]&&RES[k].first; if(/^\d+$/.test(k) && f && f.playedOn>last) last=f.playedOn; });   /* saves from before pg-last */
    if(!last) return;
    const [y,mo,d]=last.split('-').map(Number), days=Math.round((midnight(gameNow())-new Date(y,mo-1,d))/864e5);
    if(!(days>=1)) return;
    track('return'); track(days===1?'return-d1':days<7?'return-d2-6':'return-d7plus');
  }catch(e){}
})();
/* landing engagement: a real scroll down the home page (a screen, or to the end of a short page), before any order is opened */
(function(){
  try{
    const h=document.getElementById('home'); if(!h) return;
    const on=()=>{ if(D.sc) return h.removeEventListener('scroll',on);
      if(h.scrollTop>=Math.min(innerHeight,600,Math.max(80,h.scrollHeight-h.clientHeight-8))){ h.removeEventListener('scroll',on); track('landing-scroll'); } };
    h.addEventListener('scroll',on,{passive:true});
  }catch(e){}
})();
(function(){
  const c=(window.TDO_CONFIG||{}).goatcounter; if(!c) return;
  if(!/(^|\.)thedailyorder\.(io|netlify\.app)$/.test(location.hostname)) return;   /* count real visits only */
  window.goatcounter={ no_onload:false };
  const s=document.createElement('script'); s.async=true; s.src='https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter',`https://${c}.goatcounter.com/count`);
  s.onload=()=>{ const q=window.__tdoq||[]; window.__tdoq=[]; q.forEach(send); };
  document.head.appendChild(s);
})();

/* iPhone: Safari can clear a site's saved data after about a week away. Saved to the home screen, it keeps it. */
const HS_KEY = 'pg-hs-dismissed';
function isIOSBrowser(){
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
  const standalone = navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  return ios && !standalone;
}
function homeNudgeHtml(){
  let off=false; try{ off = !!localStorage.getItem(HS_KEY); }catch(e){}
  if(off || !isIOSBrowser()) return '';
  return `<div class="hsn" role="note"><div><b>Keep your streak safe</b><p>Add The Daily Order to your Home Screen: tap <span class="hs-ico" aria-label="Share">Share</span>, then <b>Add to Home Screen</b>. It opens like an app and your progress stays put.</p></div><button type="button" class="hsn-x" aria-label="Dismiss">✕</button></div>`;
}
document.addEventListener('click', e => {
  const x = e.target.closest('.hsn-x'); if(!x) return;
  try{ localStorage.setItem(HS_KEY,'1'); }catch(err){}
  const n = x.closest('.hsn'); if(n) n.remove();
});

/* ask the browser to keep our data, once someone has something worth keeping */
function keepData(){ try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); }catch(e){} }
try{ if(Object.values(RES||{}).some(r=>r&&r.first)) keepData(); }catch(e){}

/* a backup code: everything saved on this device, to carry to another browser or restore after a wipe */
function backupCode(){
  const data = { v:1, r: localStorage.getItem(DKEY)||'{}', c: localStorage.getItem(CARD_KEY)||'[]' };
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
function restoreCode(code){
  const data = JSON.parse(decodeURIComponent(escape(atob(String(code).trim()))));
  if(!data || data.v!==1) throw new Error('bad');
  JSON.parse(data.r); JSON.parse(data.c);
  localStorage.setItem(DKEY, data.r); localStorage.setItem(CARD_KEY, data.c);
}
function backupHtml(){
  return `<details class="bkp"><summary>Back up or move your progress</summary><div class="bkp-in">
    <p>Your scores, streak and troop cards live on this device. Copy this code somewhere safe, or paste it into another browser.</p>
    <button type="button" class="rem-btn bkp-copy">Copy my backup code</button>
    <textarea class="bkp-code" rows="3" placeholder="Paste a backup code here to restore"></textarea>
    <button type="button" class="rem-alt bkp-load">Restore from code</button>
    <p class="bkp-msg" aria-live="polite"></p></div></details>`;
}
document.addEventListener('click', e => {
  const box = e.target.closest('.bkp'); if(!box) return;
  const msg = box.querySelector('.bkp-msg');
  if(e.target.closest('.bkp-copy')){
    const code = backupCode(); box.querySelector('.bkp-code').value = code;
    (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(()=>{ msg.textContent='Copied. Keep it somewhere safe, like your notes.'; }, ()=>{ msg.textContent='Your code is in the box. Select it and copy.'; });
  }
  if(e.target.closest('.bkp-load')){
    try{ restoreCode(box.querySelector('.bkp-code').value); msg.textContent='Restored. Reloading…'; setTimeout(()=>location.reload(),700); }
    catch(err){ msg.textContent="That code didn't work. Check you copied all of it."; }
  }
});

document.addEventListener('click', e => { if(e.target.closest('.mvid')) track('video'); if(e.target.closest('.mskip')) track('skip-reveal'); });
