/* ══════════════════════════════════════════════════
   BOAT SVG TEMPLATE
   Edit once here — all boats (hero, diagram, CTA) update.
   uid    : unique string suffix for <defs> IDs (must be unique per page)
   opts   : hullDark, paddleColor, paddleDelay, svgAttrs, extra
══════════════════════════════════════════════════ */
function makeBoatSVG(uid, opts) {
  const {
    hullDark    = '#a4161a',
    paddleColor = '#111111',
    paddleDelay = '',
    svgAttrs    = '',
    extra       = ''
  } = opts || {};
  const pd = paddleDelay ? ` style="animation-delay:${paddleDelay}"` : '';
  return `<svg viewBox="0 -40 320 192" xmlns="http://www.w3.org/2000/svg"${svgAttrs ? ' '+svgAttrs : ''}>
  <defs>
    <clipPath id="bs${uid}"><rect x="0"   y="-40" width="62"  height="192"/></clipPath>
    <clipPath id="bb${uid}"><rect x="258" y="-40" width="62"  height="192"/></clipPath>
  </defs>
  <ellipse cx="160" cy="55" rx="145" ry="42" fill="${hullDark}"/>
  <g clip-path="url(#bs${uid})">
    <ellipse cx="160" cy="55" rx="145" ry="42" fill="#161a1d"/>
    <ellipse cx="160" cy="55" rx="134" ry="31" fill="${hullDark}"/>
  </g>
  <g clip-path="url(#bb${uid})">
    <ellipse cx="160" cy="55" rx="145" ry="42" fill="#161a1d"/>
    <ellipse cx="160" cy="55" rx="134" ry="31" fill="${hullDark}"/>
  </g>
  <ellipse cx="160" cy="46" rx="105" ry="17" fill="#f5f3f4" opacity=".12"/>
  <ellipse cx="158" cy="55" rx="50"  ry="36" fill="#660708"/>
  <ellipse cx="158" cy="55" rx="42"  ry="27" fill="#161a1d"/>
  <ellipse cx="160" cy="55" rx="17"  ry="12" fill="#0b090a"/>
  <g class="paddle-anim"${pd}>
    <line x1="160" y1="-22" x2="160" y2="134" stroke="${paddleColor}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="160" cy="-14" rx="11" ry="23" fill="${paddleColor}"/>
    <ellipse cx="160" cy="126" rx="11" ry="23" fill="${paddleColor}"/>
  </g>
  <circle  cx="160" cy="55" r="20"           fill="#f5f3f4"/>
  <ellipse cx="156" cy="51" rx="5"   ry="4"  fill="rgba(255,255,255,0.45)"/>
  ${extra}
</svg>`;
}

/* ── Inject boats ───────────────────────────────── */
// Hero boats — paddle delays handled by CSS .boat-N .paddle-anim selectors
document.querySelector('.boat-1').innerHTML = makeBoatSVG('h1');
document.querySelector('.boat-2').innerHTML = makeBoatSVG('h2');
document.querySelector('.boat-3').innerHTML = makeBoatSVG('h3');


// Diagram boat (sport section) — floating ball prop, no annotations
const annExtra = `
  <circle cx="230" cy="0"  r="13"               fill="#000000"/>
  <circle cx="230" cy="0"  r="12.9"             fill="#FFD600"/>
  <ellipse cx="230" cy="0" rx="7.65" ry="13"    fill="#000000"/>
  <ellipse cx="230" cy="0" rx="7.57" ry="12.9"  fill="#004bb5"/>
  <ellipse cx="230" cy="0" rx="12.77" ry="10.79" fill="#000000"/>
  <ellipse cx="230" cy="0" rx="12.69" ry="10.71" fill="#004bb5"/>
  <ellipse cx="230" cy="0" rx="12.77" ry="3.83"  fill="#000000"/>
  <ellipse cx="230" cy="0" rx="12.69" ry="3.75"  fill="#FFD600"/>
  <ellipse cx="225" cy="-5" rx="4"   ry="3"       fill="rgba(255,255,255,0.45)"/>`;

document.querySelector('.boat-label-wrap').insertAdjacentHTML('afterbegin', makeBoatSVG('ann', {
  extra: annExtra
}));

// CTA boats — lighter hull, explicit paddle delays (no CSS selector for these)
const ctaBoats = document.querySelectorAll('.cta-boat-wrap');
ctaBoats[0].innerHTML = makeBoatSVG('c1', {
  paddleDelay: '.6s',  svgAttrs: 'width="120" opacity=".35"'
});
