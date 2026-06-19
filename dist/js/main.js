/* ── MAIN ORCHESTRATOR ── */
(function() {
  const scripts = [
    'js/workhub.js',
    'js/navigation-cta.js',   // unified scroll + CTA layer (depends on workhub panels)
    'js/cursor.js',
    'js/navigation.js',
    'js/reveal.js',
    'js/lab.js',              // lab section interactions
    'js/hero-canvas.js',
    'js/terminal.js',         // kali terminal typewriter in hero
    'js/contact-canvas.js',
    'js/contact-form.js',
    'js/image-transitions.js'
  ];

  scripts.forEach(src => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  });
  
  console.log('Portfolio initialized. All modules injected.');
})();
