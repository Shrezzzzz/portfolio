/* ── NAV DOCK ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('dock', window.scrollY > window.innerHeight * 0.15);
}, { passive: true });

/* ── SMOOTH SCROLL (generic fallback for all #anchors
   NOT handled by navigation-cta.js) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  const href = a.getAttribute('href');
  // Skip anchors that navigation-cta.js owns
  if (href === '#workHub' || href === '#lab' || href === '#contact') return;

  a.addEventListener('click', e => {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
