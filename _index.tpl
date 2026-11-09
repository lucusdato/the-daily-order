<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>The Daily Order</title>
<meta name="description" content="A daily military strategy puzzle. Read the situation like a real commander, make one call, and watch history play out on a toy board.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Stardos+Stencil:wght@400;700&family=Special+Elite&family=IM+Fell+English+SC&display=swap" rel="stylesheet">
<style>
{{CSS}}
{{EXTRA}}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
{{DEFS}}
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
    <pattern id="cloud" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="15" cy="18" r="12" fill="rgba(255,255,255,.28)"/><circle cx="44" cy="40" r="15" fill="rgba(255,255,255,.22)"/><circle cx="48" cy="10" r="7" fill="rgba(120,130,140,.12)"/><circle cx="12" cy="48" r="8" fill="rgba(120,130,140,.1)"/></pattern>
    <g id="hand" transform="translate(0 9) rotate(-6)">
      <rect x="-9.5" y="-86" width="19" height="13" rx="3" fill="#4d5a2b" stroke="#25300f" stroke-width=".9"/><rect x="-9.5" y="-75" width="19" height="2" fill="#25300f" opacity=".5"/>
      <rect x="-8.6" y="-73.5" width="17.2" height="5" rx="1.5" fill="#efe6cf" stroke="#8a7a58" stroke-width=".7"/>
      <path d="M-7.6 -69 C-10.6 -60 -11.4 -48 -8.4 -38 C-6 -33 6 -33 8.6 -37.5 C11.2 -47 10.6 -60 7.6 -69 Z" fill="#e8b78e" stroke="#7d4f31" stroke-width=".9"/>
      <path d="M8.4 -40 q4 2 3.2 6.5 q-1.6 3 -4.6 1.2" fill="#e8b78e" stroke="#7d4f31" stroke-width=".9"/>
      <path d="M8 -34 q3.4 1.8 2.4 5.6 q-1.6 2.4 -4.2 .6" fill="#dfa982" stroke="#7d4f31" stroke-width=".9"/>
      <path d="M5.2 -37 Q8.6 -26 2.4 -15.5" fill="none" stroke="#7d4f31" stroke-width="6.6" stroke-linecap="round"/>
      <path d="M5.2 -37 Q8.6 -26 2.4 -15.5" fill="none" stroke="#e8b78e" stroke-width="4.8" stroke-linecap="round"/>
      <path d="M-6.2 -40 Q-9.6 -27 -2.6 -16.5" fill="none" stroke="#7d4f31" stroke-width="7.2" stroke-linecap="round"/>
      <path d="M-6.2 -40 Q-9.6 -27 -2.6 -16.5" fill="none" stroke="#efc29b" stroke-width="5.4" stroke-linecap="round"/>
      <path d="M1.2 -17.6 l2 .9 M-1.6 -18.4 l-2 1" stroke="#fff3e2" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
      <path d="M-4.5 -55 q4.5 2 9 0 M-4 -47 q4 1.6 8 0" fill="none" stroke="#7d4f31" stroke-width=".6" opacity=".5"/>
      <path d="M-6.4 -66 C-8.6 -58 -9 -50 -7.4 -43" fill="none" stroke="#fff3e2" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>
    </g>
  </defs>
</svg>

<div id="app">
  <section id="home" class="view" aria-label="Choose a battle"></section>

  <section id="battle" class="view" hidden>
    <header class="bar">
      <button class="back bk-ico" id="bBack" type="button" aria-label="Back to all battles"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="bt"><div class="bt-name" id="bName"></div><div class="bt-sub" id="bSub"></div></div>
      <button class="pbtn" id="bPb" type="button">Playbook</button>
    </header>
    <div class="stage">
      <div class="left">
        <div class="tools" id="tools">
          <div class="seg" id="pov" role="group" aria-label="See the battle as">
            <button type="button" data-pov="g" aria-pressed="true"><span class="sw g"></span><span id="povG"></span></button>
            <button type="button" data-pov="t" aria-pressed="false"><span class="sw t"></span><span id="povT"></span></button>
          </div>
          <button type="button" class="tg" id="tFog" aria-pressed="false">Fog of war</button>
          <button type="button" class="tg" id="tLens" aria-pressed="false">Terrain</button>
        </div>
        <div class="board-wrap">
          <svg id="board" viewBox="0 0 400 400" role="img" aria-label="Toy game board of the battle"></svg>
          <div class="banner" id="banner" hidden></div>
          <div class="utag" id="utag" hidden role="status"></div>
        </div>
        <div class="ctrl">
          <button id="prev" type="button" aria-label="Previous phase">&#8249;</button>
          <div class="dots" id="dots"></div>
          <button id="next" type="button">Next &#8250;</button>
        </div>
      </div>
      <div class="sheet" id="sheet"><div class="grab" id="grab" role="button" tabindex="0" aria-label="Show the board"><span></span></div><div class="dock" id="dock" hidden aria-live="polite"></div><div class="card" id="card"></div></div>
    </div>
  </section>

  <section id="playbook" class="view" hidden aria-label="The Playbook"></section>
  <section id="archive" class="view" hidden aria-label="Past orders"></section>
  <section id="cards" class="view" hidden aria-label="Troop cards"></section>
</div>

<script src="js/helpers.js"></script>
<script src="battles/thermopylae.js"></script>
<script src="battles/cannae.js"></script>
<script src="battles/agincourt.js"></script>
<script src="battles/trafalgar.js"></script>
<script src="battles/austerlitz.js"></script>
<script src="battles/gettysburg.js"></script>
<script src="battles/midway.js"></script>
<script src="battles/stalingrad.js"></script>
<script src="battles/dday.js"></script>
<script src="battles/inchon.js"></script>
<script src="js/principles.js"></script>
<script src="js/engine.js"></script>
<script src="js/glossary.js"></script>
<script src="js/sheet.js"></script>
<script src="js/combat.js"></script>
<script src="js/scenes.js"></script>
<script src="daily/manifest.js"></script>
<script src="js/cards.js"></script>
<script src="js/daily.js"></script>
<script src="js/mystery.js"></script>
<script>initSheet(); (function(){ const d=display; display=function(){ sheetRevealBoard(); return d.apply(this,arguments); }; })();</script>
<div id="gloss" class="gloss" hidden role="dialog"></div>
</body>
</html>
