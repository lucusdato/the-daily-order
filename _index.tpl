<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>The Daily Order</title>
<meta name="description" content="A daily military strategy puzzle. Read the situation like a real commander, make one call, and watch history play out on a toy board.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Stardos+Stencil:wght@400;700&family=Special+Elite&family=IM+Fell+English+SC&display=swap" rel="stylesheet">
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
    <g id="hand"><rect x="-8.4" y="-74" width="16.8" height="9" rx="2" fill="#3d5a80"/><rect x="-7" y="-67" width="14" height="40" rx="6.5" fill="#f2c9a1" stroke="#9a6b4b" stroke-width=".8"/><path d="M-6.6 -31 Q-10 -19 -4.4 -11 L-2.2 -12.4 Q-5.6 -20 -3 -29 Z" fill="#f2c9a1" stroke="#9a6b4b" stroke-width=".8"/><path d="M6.6 -31 Q10 -19 4.4 -11 L2.2 -12.4 Q5.6 -20 3 -29 Z" fill="#f2c9a1" stroke="#9a6b4b" stroke-width=".8"/></g>
  </defs>
</svg>

<div id="app">
  <section id="home" class="view" aria-label="Choose a battle"></section>

  <section id="battle" class="view" hidden>
    <header class="bar">
      <button class="back" id="bBack" type="button">&#8249; Battles</button>
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
