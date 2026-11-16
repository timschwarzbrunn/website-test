/* ── NAV: solid background on scroll ───────────── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── BURGER MENU ────────────────────────────────── */
const burger   = document.getElementById('nav-burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display        = open ? 'none' : 'flex';
  navLinks.style.flexDirection  = 'column';
  navLinks.style.position       = 'absolute';
  navLinks.style.top            = '100%';
  navLinks.style.left           = '0';
  navLinks.style.right          = '0';
  navLinks.style.background     = 'rgba(43,45,66,.96)';
  navLinks.style.padding        = '1.5rem 2rem';
  navLinks.style.gap            = '1.2rem';
  if (open) navLinks.style.display = 'none';
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    }
  })
);

/* ── SCROLL REVEAL ──────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObs.observe(el));

/* ── HERO BOAT SPEED: proportional to viewport width ── */
function updateHeroSpeeds() {
  const s = window.innerWidth / 1920;   // scale factor (1920px = reference)

  if (_b1)    _b1.style.animationDuration  = `${20 * s}s`;
  if (_b2) {  _b2.style.animationDuration  = `${25 * s}s`;
              _b2.style.animationDelay     = `${-4 * s}s`; }
  if (_b3) {  _b3.style.animationDuration  = `${17 * s}s`;
              _b3.style.animationDelay     = `${-9 * s}s`; }

  // sail duration scales with the boat; throw-catch cycle stays fixed (paddling rhythm)
  if (_balls[0])  _balls[0].style.animationDuration = `${20 * s}s, 3.9s`;
  if (_balls[1]) { _balls[1].style.animationDuration = `${25 * s}s, 3.9s`;
                   _balls[1].style.animationDelay    = `${-4 * s}s, ${-4 * s}s`; }
  if (_balls[2]) { _balls[2].style.animationDuration = `${17 * s}s, 2.6s`;
                   _balls[2].style.animationDelay    = `${-9 * s}s, ${-9 * s}s`; }
}

/* ── PARALLAX: subtle hero boat depth ───────────── */
/* Use `top` (not `transform`) so the offset doesn't conflict with the
   CSS throwCatch/sailLeft transform animations running on the balls. */
const _b1    = document.querySelector('.hero-boat-1');
const _b2    = document.querySelector('.hero-boat-2');
const _b3    = document.querySelector('.hero-boat-3');
const _balls = document.querySelectorAll('.hero-ball');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (_b1) _b1.style.top = `calc(18% + ${y * 0.08}px)`;
  if (_b2) _b2.style.top = `calc(52% + ${y * 0.05}px)`;
  if (_b3) _b3.style.top = `calc(76% + ${y * 0.12}px)`;
  if (_balls[0]) _balls[0].style.top = `calc(18% + 72px + ${y * 0.08}px)`;
  if (_balls[1]) _balls[1].style.top = `calc(52% + 72px + ${y * 0.05}px)`;
  if (_balls[2]) _balls[2].style.top = `calc(76% + 72px + ${y * 0.12}px)`;
}, { passive: true });

updateHeroSpeeds();
window.addEventListener('resize', updateHeroSpeeds, { passive: true });
