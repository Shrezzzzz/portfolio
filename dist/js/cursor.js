/* ═══════════════════════════════════════════════════════════════
   ENGINEERING RETICLE CURSOR
   Technical targeting cursor — L-bracket corners, scan ring,
   crosshair dot, hover expansion, section-aware tint.
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Inject the SVG shell into the DOM ── */
  const reticle = document.createElement('div');
  reticle.id = 'reticle';
  reticle.setAttribute('aria-hidden', 'true');

  reticle.innerHTML = `
    <svg id="reticleSVG" width="48" height="48" viewBox="0 0 48 48" fill="none"
         xmlns="http://www.w3.org/2000/svg">

      <!-- Scan ring (animates on hover) -->
      <circle id="rScanRing" cx="24" cy="24" r="19"
        stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 5"
        opacity="0.28"/>

      <!-- Corner brackets — top-left -->
      <path id="rTL" d="M6 14 L6 6 L14 6"
        stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>

      <!-- Corner brackets — top-right -->
      <path id="rTR" d="M34 6 L42 6 L42 14"
        stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>

      <!-- Corner brackets — bottom-left -->
      <path id="rBL" d="M6 34 L6 42 L14 42"
        stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>

      <!-- Corner brackets — bottom-right -->
      <path id="rBR" d="M42 34 L42 42 L34 42"
        stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>

      <!-- Fine crosshair lines -->
      <line id="rCH" x1="24" y1="18" x2="24" y2="20"
        stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>
      <line id="rCV" x1="24" y1="28" x2="24" y2="30"
        stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>
      <line id="rCL" x1="18" y1="24" x2="20" y2="24"
        stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>
      <line id="rCR" x1="28" y1="24" x2="30" y2="24"
        stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>

      <!-- Centre dot -->
      <circle id="rDot" cx="24" cy="24" r="1.2"
        fill="currentColor" opacity="0.9"/>

      <!-- Acquisition ring (appears on hover) -->
      <circle id="rAcqRing" cx="24" cy="24" r="7"
        stroke="currentColor" stroke-width="0.6"
        stroke-dasharray="2 3"
        opacity="0" />

    </svg>
  `;

  document.body.appendChild(reticle);

  /* ── 2. State ── */
  const svg     = document.getElementById('reticleSVG');
  const acqRing = document.getElementById('rAcqRing');
  const scanRing= document.getElementById('rScanRing');

  // Target & actual position (smooth interpolation)
  let tx = -200, ty = -200;
  let ax = -200, ay = -200;

  // Scale target (1 = normal, 1.6 = hover, 0.75 = click)
  let targetScale  = 1;
  let currentScale = 1;

  // Rotation for the scan ring
  let scanAngle = 0;

  // Hover state
  let isHovering = false;

  // Section accent colour (CSS var name)
  const COLORS = {
    default : 'rgb(99,211,206)',
    dark    : 'rgb(99,211,206)',
    cyber   : 'rgb(99,211,206)',
    aiml    : 'rgb(74,222,128)',
    iot     : 'rgb(251,176,64)',
    blockchain: 'rgb(167,139,250)',
    fintech : 'rgb(96,165,250)',
    about   : 'rgb(99,211,206)',
    lab     : 'rgb(99,211,206)',
    contact : 'rgba(99,211,206,0.85)',
  };

  /* ── 3. Detect which section the cursor is over ── */
  const sectionMap = [
    { id: 'hero',          key: 'dark'       },
    { id: 'about',         key: 'about'      },
    { id: 'workHub',       key: 'default'    },
    { id: 'p01',           key: 'cyber'      },
    { id: 'p02',           key: 'blockchain' },
    { id: 'p03',           key: 'iot'        },
    { id: 'p04',           key: 'aiml'       },
    { id: 'p05',           key: 'cyber'      },
    { id: 'lab',           key: 'lab'        },
    { id: 'cap',           key: 'default'    },
    { id: 'manifesto',     key: 'default'    },
    { id: 'contact',       key: 'contact'    },
  ];

  let currentColor = COLORS.default;
  let targetColor  = COLORS.default;

  function getColorForPosition(x, y) {
    // Walk the list in reverse so deeper sections win
    for (let i = sectionMap.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionMap[i].id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        return COLORS[sectionMap[i].key] || COLORS.default;
      }
    }
    return COLORS.default;
  }

  /* ── 4. Mouse events ── */
  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    targetColor = getColorForPosition(tx, ty);
  });

  document.addEventListener('mousedown', () => {
    targetScale = 0.72;
    reticle.style.opacity = '0.7';
  });

  document.addEventListener('mouseup', () => {
    targetScale = isHovering ? 1.55 : 1;
    reticle.style.opacity = '1';
  });

  /* ── 5. Interactive elements — hover expansion ── */
  const HOVER_SELECTORS = [
    'a', 'button', '.mag', '.capChip', '.capTag',
    '.domainPanel', '.ci', '.labRecord', '.vaultRecord',
    '.certNode', '.labLog', '.missionEvent', '.cLink',
    '.projectLinks a', '[data-hover]',
  ].join(',');

  function attachHoverListeners() {
    document.querySelectorAll(HOVER_SELECTORS).forEach(el => {
      if (el._reticleBound) return;
      el._reticleBound = true;
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        targetScale = 1.55;
        document.body.classList.add('hov');
        acqRing.style.opacity = '0.55';
        scanRing.style.opacity = '0.45';
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        targetScale = 1;
        document.body.classList.remove('hov');
        acqRing.style.opacity = '0';
        scanRing.style.opacity = '0.28';
      });
    });
  }

  attachHoverListeners();
  setInterval(attachHoverListeners, 900); // pick up dynamic content

  /* ── 6. Hide on mouse leave, show on enter ── */
  document.addEventListener('mouseleave', () => {
    reticle.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    reticle.style.opacity = '1';
  });

  /* ── 7. Lerp helper ── */
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ── 8. Colour interpolation (simple, just snap on threshold) ── */
  let colorBlend = 0;
  function blendColor() {
    colorBlend += (1 - colorBlend) * 0.07;
    if (colorBlend > 0.95) {
      currentColor = targetColor;
      colorBlend = 0;
    }
    // Simple cross-fade via opacity trick on colour change
    if (currentColor !== targetColor) return currentColor;
    return targetColor;
  }

  /* ── 9. Main RAF loop ── */
  (function loop() {
    requestAnimationFrame(loop);

    // Position interpolation — snappy but smooth
    ax = lerp(ax, tx, 0.15);
    ay = lerp(ay, ty, 0.15);

    // Scale interpolation
    currentScale = lerp(currentScale, targetScale, 0.12);

    // Spin the scan ring slowly; faster when hovering
    scanAngle += isHovering ? 0.4 : 0.15;

    // Colour — snap when close
    if (currentColor !== targetColor) {
      currentColor = targetColor;
    }

    // Apply transforms
    reticle.style.left  = ax + 'px';
    reticle.style.top   = ay + 'px';

    const s = currentScale;
    svg.style.transform = `rotate(${scanAngle * 0.18}deg) scale(${s})`;
    scanRing.style.transform = `rotate(${-scanAngle * 1.1}deg)`;
    scanRing.style.transformOrigin = '24px 24px';

    // Colour
    reticle.style.color = currentColor;
  })();

  /* ── 10. Reticle starts hidden until first mouse move ── */
  reticle.style.opacity = '0';
  reticle.style.transition = 'opacity 0.4s ease, color 0.5s ease';
  let firstMove = false;
  document.addEventListener('mousemove', () => {
    if (!firstMove) {
      firstMove = true;
      reticle.style.opacity = '1';
    }
  }, { once: true });

})();
