/* ══════════════════════════════════════════════════════
   LAB — Research Facility Interactions
   Stat counters · Cert reveals · Mission timeline
══════════════════════════════════════════════════════ */

(function initLab() {

  /* ── 1. STAT COUNTERS ──────────────────────────────
     Animate numbers from 0 → target when scrolled in
  ─────────────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.labStatN[data-target]');

  function animateCounter(el) {
    if (el._counted) return;
    el._counted = true;

    const target = parseInt(el.dataset.target, 10);
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) animateCounter(e.target);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));


  /* ── 2. CERT BAR REVEALS ───────────────────────────
     Add .in-view to each certNode when it enters viewport
     so the CSS width transition fires.
  ─────────────────────────────────────────────────── */
  const certNodes = document.querySelectorAll('.certNode');

  const certObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        certObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  certNodes.forEach(el => certObserver.observe(el));


  /* ── 3. CURSOR HOVER REGISTRATION ─────────────────
     Register new interactive elements with the
     cursor hover system (adds/removes body.hov)
  ─────────────────────────────────────────────────── */
  function registerCursorHover(selector) {
    document.querySelectorAll(selector).forEach(el => {
      if (el._labCursorBound) return;
      el._labCursorBound = true;
      el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
    });
  }

  registerCursorHover('.labRecord, .vaultRecord, .certNode, .missionEvent, .labLog, .labStat');


  /* ── 4. MISSION TIMELINE — CLICK TO EXPAND ─────────
     Clicking a .tlCard toggles .is-open on its parent
     .tlEvent. Only one event open at a time.
     Keyboard (Enter / Space) also works.
  ─────────────────────────────────────────────────── */
  const tlEvents = document.querySelectorAll('.tlEvent');

  function openTlEvent(event) {
    const isOpen = event.classList.contains('is-open');

    // Close all
    tlEvents.forEach(ev => {
      ev.classList.remove('is-open');
      const card = ev.querySelector('.tlCard');
      if (card) card.setAttribute('aria-expanded', 'false');
      const detail = ev.querySelector('.tlDetail');
      if (detail) detail.setAttribute('aria-hidden', 'true');
    });

    // Open clicked one unless it was already open
    if (!isOpen) {
      event.classList.add('is-open');
      const card = event.querySelector('.tlCard');
      if (card) card.setAttribute('aria-expanded', 'true');
      const detail = event.querySelector('.tlDetail');
      if (detail) detail.setAttribute('aria-hidden', 'false');
    }
  }

  tlEvents.forEach(ev => {
    const card = ev.querySelector('.tlCard');
    if (!card) return;

    card.addEventListener('click', () => openTlEvent(ev));

    // Keyboard support
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTlEvent(ev);
      }
    });
  });

  // Staggered reveal — assign index var for CSS stagger; parent tlWrap.rv handles visibility
  tlEvents.forEach((ev, i) => {
    ev.style.setProperty('--tl-i', i);
  });

  // Register cursor hover for new elements
  registerCursorHover('.tlCard');


  /* ── 5. VAULT RECORD — STAGGERED ENTRY ─────────────
     Mild horizontal slide-in per vault record
  ─────────────────────────────────────────────────── */
  document.querySelectorAll('.vaultRecord').forEach((el, i) => {
    el.style.setProperty('--vault-delay', `${i * 60}ms`);
  });


  /* ── 6. LAB RECORD HOVER — SUBTLE PARALLAX ─────────
     On mouse move inside a labRecord, shift the glow
     position slightly to follow the cursor.
  ─────────────────────────────────────────────────── */
  document.querySelectorAll('.labRecord').forEach(record => {
    record.addEventListener('mousemove', e => {
      const rect = record.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const glow = record.querySelector('.labRecordGlow');
      if (glow) {
        glow.style.background =
          `radial-gradient(ellipse 55% 80% at ${x}% ${y}%, rgba(99,211,206,.06) 0%, transparent 65%)`;
      }
    });
  });


  /* ── 7. VAULT RECORD HOVER — COLOR ACCENT BY TYPE ──
     Tint the glow based on clearance level
  ─────────────────────────────────────────────────── */
  const vaultColors = {
    'NATIONAL':   '99,211,206',
    'TOP 5000':   '74,222,128',
    'DEPLOYED':   '251,176,64',
    'COMPETITOR': '167,139,250',
  };

  document.querySelectorAll('.vaultRecord').forEach(record => {
    const clearance = record.dataset.clearance || 'NATIONAL';
    const rgb = vaultColors[clearance] || '99,211,206';
    const glow = record.querySelector('.vaultGlow');

    record.addEventListener('mouseenter', () => {
      if (glow) {
        glow.style.background =
          `radial-gradient(ellipse 80% 100% at 50% 120%, rgba(${rgb},.1) 0%, transparent 70%)`;
      }
      // Tint the top border
      record.style.setProperty('--vault-accent', `rgb(${rgb})`);
      record.style.cssText += `--vault-accent:rgb(${rgb})`;
    });
  });

  // Override ::before color from CSS var
  // (done via data attribute + CSS [data-clearance] rules below via inline style trick)
  document.querySelectorAll('.vaultRecord').forEach(record => {
    const clearance = record.dataset.clearance || 'NATIONAL';
    const rgb = vaultColors[clearance] || '99,211,206';
    record.style.setProperty('--vault-glow-rgb', rgb);
  });


  /* ── 8. MISSION TIMELINE — SPINE PULSE ─────────────
     A small glowing dot travels down the tlSpine while
     the timeline section is in the viewport.
     The dot (.tlPulse) is injected here so the CSS
     class handles all styling.
  ─────────────────────────────────────────────────── */
  const tlWrap = document.querySelector('.tlWrap');

  if (tlWrap) {
    // Inject pulse element
    const pulse = document.createElement('div');
    pulse.className = 'tlPulse';
    tlWrap.appendChild(pulse);

    let pulseFrame;
    let pulseStart = null;

    function animateTlPulse(ts) {
      if (!pulseStart) pulseStart = ts;

      const events = tlWrap.querySelectorAll('.tlEvent');
      if (!events.length) {
        pulseFrame = requestAnimationFrame(animateTlPulse);
        return;
      }

      // Travel from first dot to last dot
      const spine = tlWrap.querySelector('.tlSpine');
      const wrapRect = tlWrap.getBoundingClientRect();
      const topY  = spine ? (spine.getBoundingClientRect().top  - wrapRect.top + tlWrap.scrollTop) : 20;
      const botY  = spine ? (spine.getBoundingClientRect().bottom - wrapRect.top + tlWrap.scrollTop) : tlWrap.offsetHeight - 20;
      const range  = Math.max(botY - topY, 1);
      const period = 5000; // ms per full pass

      const elapsed = (ts - pulseStart) % period;
      const t       = elapsed / period;
      // ease-in-out sine for smooth reversal feel
      const ease    = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
      const y       = topY + ease * range;

      pulse.style.top     = y + 'px';
      pulse.style.opacity = '0.75';

      pulseFrame = requestAnimationFrame(animateTlPulse);
    }

    const tlObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          pulseStart = null;
          pulseFrame = requestAnimationFrame(animateTlPulse);
        } else {
          cancelAnimationFrame(pulseFrame);
          pulse.style.opacity = '0';
        }
      });
    }, { threshold: 0.05 });

    tlObserver.observe(tlWrap);
  }

})();
