/* The Daily Order: the card as a draggable bottom sheet on phones.
   Three resting spots: full (read), mid (board and card), peek (just the board). Drag the handle,
   tap it to toggle, or pull down on the card when it is scrolled to the top. */
const SHEET = { el:null, grab:null, pos:'mid', y:0, snaps:{}, drag:null };
const sheetOn = () => !matchMedia('(min-width:900px) and (min-height:520px)').matches;

function sheetMeasure(){
  const st=document.querySelector('#battle .stage'), left=document.querySelector('#battle .left');
  if(!st||!left) return;
  const H=st.clientHeight, ctrlBottom=left.offsetHeight;
  SHEET.snaps={ full:Math.min(56, H*.08), mid:Math.max(56, Math.min(ctrlBottom, H-170)), peek:H-58 };
  SHEET.el.style.height=(H-SHEET.snaps.full)+'px';
}
function sheetSet(y,anim){
  SHEET.y=y; if(window.hideGloss) hideGloss(); const el=SHEET.el;
  el.style.transition=anim?'transform .32s cubic-bezier(.2,.9,.25,1)':'none';
  el.style.transform=`translateY(${y-SHEET.snaps.full}px)`;
  // the visible part of the card must stay scrollable to its end
  const card=document.getElementById('card'); if(card) card.style.paddingBottom=(y-SHEET.snaps.full+40)+'px';
}
function sheetTo(pos,anim=true){
  if(!SHEET.el) return;
  if(!sheetOn()){ SHEET.el.removeAttribute('style'); const c=document.getElementById('card'); if(c) c.style.paddingBottom=''; return; }
  sheetMeasure(); SHEET.pos=pos; sheetSet(SHEET.snaps[pos],anim);
  SHEET.el.dataset.pos=pos;
  if(SHEET.grab) SHEET.grab.setAttribute('aria-label', pos==='peek'?'Show the card':'Show the board');
}
function sheetNearest(y,v){
  const s=SHEET.snaps;
  if(Math.abs(v)>.5) { // a flick: go one step in that direction
    const order=['full','mid','peek'], i=order.indexOf(SHEET.pos);
    return v>0 ? order[Math.min(2, y>s.mid+20?2:Math.max(i,1))] : order[Math.max(0, y<s.mid-20?0:Math.min(i,1))];
  }
  return Object.keys(s).reduce((a,b)=>Math.abs(s[b]-y)<Math.abs(s[a]-y)?b:a);
}
function sheetStart(y){ SHEET.drag={y0:y, s0:SHEET.y, t:performance.now(), last:y, lt:performance.now(), moved:false}; SHEET.el.style.transition='none'; }
function sheetMove(y){
  const d=SHEET.drag; if(!d) return;
  const s=SHEET.snaps; let ny=d.s0+(y-d.y0);
  if(ny<s.full) ny=s.full-(s.full-ny)*.25; if(ny>s.peek) ny=s.peek+(ny-s.peek)*.25;
  if(Math.abs(y-d.y0)>4) d.moved=true;
  d.v=(y-d.last)/Math.max(1,performance.now()-d.lt); d.last=y; d.lt=performance.now();
  sheetSet(ny,false);
}
function sheetEnd(){
  const d=SHEET.drag; SHEET.drag=null; if(!d) return false;
  if(!d.moved) return false;
  sheetTo(sheetNearest(SHEET.y,d.v||0)); return true;
}

function initSheet(){
  SHEET.el=document.getElementById('sheet'); SHEET.grab=document.getElementById('grab');
  if(!SHEET.el) return;
  const g=SHEET.grab, card=document.getElementById('card');
  // handle: pointer drag, or tap to toggle
  g.addEventListener('pointerdown',e=>{ if(!sheetOn()) return; g.setPointerCapture(e.pointerId); sheetMeasure(); sheetStart(e.clientY); });
  g.addEventListener('pointermove',e=>{ if(SHEET.drag) sheetMove(e.clientY); });
  const up=()=>{ if(!SHEET.drag) return; const moved=sheetEnd(); if(!moved) sheetTo(SHEET.pos==='peek'?'mid':SHEET.pos==='mid'?'full':'mid'); };
  g.addEventListener('pointerup',up); g.addEventListener('pointercancel',up);
  g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); sheetTo(SHEET.pos==='peek'?'mid':SHEET.pos==='mid'?'full':'mid'); } });
  // card body: pull down from the top to lower the sheet, push up to raise it
  let ty=null, mode=null;
  card.addEventListener('touchstart',e=>{ if(!sheetOn()||e.touches.length>1) return; ty=e.touches[0].clientY; mode=null; },{passive:true});
  card.addEventListener('touchmove',e=>{
    if(ty==null) return; const y=e.touches[0].clientY, dy=y-ty;
    if(mode==null && Math.abs(dy)>6){
      if(dy>0 && card.scrollTop<=0 && SHEET.pos!=='peek') mode='sheet';
      else if(dy<0 && SHEET.pos!=='full') mode='sheet';
      else mode='scroll';
      if(mode==='sheet'){ sheetMeasure(); sheetStart(ty); }
    }
    if(mode==='sheet'){ e.preventDefault(); sheetMove(y); }
  },{passive:false});
  const tend=()=>{ if(mode==='sheet') sheetEnd(); ty=null; mode=null; };
  card.addEventListener('touchend',tend); card.addEventListener('touchcancel',tend);
  // tapping the peeking card brings it back
  card.addEventListener('click',e=>{ if(sheetOn() && SHEET.pos==='peek' && !e.target.closest('button,a,.term,summary')) sheetTo('mid'); });
  addEventListener('resize',()=>sheetTo(SHEET.pos,false));
  // the stage must never scroll itself (focus or scrollIntoView could push the board away)
  const st=document.querySelector('#battle .stage'); if(st) st.addEventListener('scroll',()=>{ if(st.scrollTop) st.scrollTop=0; });
  sheetTo('mid',false);
}
/* When the board animates while the card covers it, drop the card so the move can be seen */
function sheetRevealBoard(){ if(sheetOn() && SHEET.pos==='full') sheetTo('mid'); }
