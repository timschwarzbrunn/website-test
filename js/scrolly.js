/* ── UNIFIED SPORT SCROLLYTELLING ── */
const sportSteps    = document.querySelectorAll('.sport-step');
const sportVisBoat  = document.querySelector('.sport-vis-boat');
const sportVisField = document.querySelector('.sport-vis-field');

function applyFieldStep(idx) {

  document.querySelectorAll('.goal-left, .goal-right').forEach(el => {
    el.classList.toggle('field-hidden', idx < 1);
  });

  const teamA = document.querySelector('.team-a');
  if (teamA) teamA.classList.toggle('field-hidden', idx < 2);

  const teamB = document.querySelector('.team-b');
  if (teamB) teamB.classList.toggle('field-hidden', idx < 2);

  const ball   = document.querySelector('.field-ball');
  const arrows = document.querySelector('.field-arrows');
  if (ball)   ball.classList.toggle('field-hidden', idx < 4);
  if (arrows) arrows.classList.toggle('field-hidden', idx < 4);
}

function applyUnifiedStep(el) {
  const vis   = el.dataset.vis  || 'boat';
  const field = el.dataset.field;

  const isField = vis === 'field';
  if (sportVisBoat)  sportVisBoat.classList.toggle('active',  !isField);
  if (sportVisField) sportVisField.classList.toggle('active',  isField);

  if (isField && field !== undefined) applyFieldStep(parseInt(field));
}

/* Guard against scroll firing during nav anchor jumps */
let navJumping = false;
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    navJumping = true;
    setTimeout(() => { navJumping = false; }, 1000);
  });
});

let activeStep = null;

function updateActiveStep() {
  if (navJumping) return;
  const vh = window.innerHeight;
  let best     = null;
  let bestRatio = -Infinity;

  sportSteps.forEach(step => {
    const rect    = step.getBoundingClientRect();
    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    const ratio   = visible / rect.height;
    if (ratio > bestRatio) { bestRatio = ratio; best = step; }
  });

  if (best && best !== activeStep) {
    sportSteps.forEach(s => s.classList.remove('active'));
    best.classList.add('active');
    applyUnifiedStep(best);
    activeStep = best;
  }
}

window.addEventListener('scroll', updateActiveStep, { passive: true });
updateActiveStep();

applyFieldStep(0);
if (sportSteps[0]) applyUnifiedStep(sportSteps[0]);
