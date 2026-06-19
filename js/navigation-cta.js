/* ══════════════════════════════════════════════════════
   NAVIGATION + CTA — Unified scroll & activation layer
   scrollToWork(), scrollToExp(), scrollToContact() are
   the single source of truth used by navbar links,
   hero CTAs, and any future entry point.
══════════════════════════════════════════════════════ */

/* ── Utility: smooth scroll to any element ── */
function smoothScrollTo(el, offset) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - (offset || 0);
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── scrollToWork ──────────────────────────────────────
   Scrolls to #workHub (Project Domains).
   No domain is pre-selected — the user chooses.
─────────────────────────────────────────────────────── */
window.scrollToWork = function () {
  const section = document.getElementById('workHub');
  if (!section) return;
  smoothScrollTo(section, 80);
};

/* ── scrollToExp ───────────────────────────────────────
   Scrolls to #lab (Experience section) and triggers
   the reveal animation on any un-animated items.
─────────────────────────────────────────────────────── */
window.scrollToExp = function () {
  const section = document.getElementById('lab');
  if (!section) return;

  smoothScrollTo(section, 80);

  setTimeout(function () {
    section.querySelectorAll('.rv, .rv2').forEach(function (el) {
      el.classList.add('vis');
    });
    section.classList.add('lab-entered');
  }, 400);
};

/* Keep old name as alias so any external call still works */
window.scrollToLab = window.scrollToExp;

/* ── scrollToContact ───────────────────────────────────
   Scrolls to #contact.
─────────────────────────────────────────────────────── */
window.scrollToContact = function () {
  const section = document.getElementById('contact');
  if (!section) return;
  smoothScrollTo(section, 80);
};

/* ── Wire Hero CTA buttons ─────────────────────────── */
(function wireHeroCtas() {

  /* View Projects → scroll to #workHub */
  var btnViewProjects = document.getElementById('heroBtnViewProjects');
  if (btnViewProjects) {
    btnViewProjects.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToWork();
    });
  }

  /* Bottom "Explore Work" duplicate → scroll to #workHub */
  var btnWork2 = document.getElementById('heroBtnWork2');
  if (btnWork2) {
    btnWork2.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToWork();
    });
  }

  /* View Experience → scroll to #lab */
  var btnLab = document.getElementById('heroBtnLab');
  if (btnLab) {
    btnLab.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToExp();
    });
  }

  /* Bottom "Open Lab" duplicate → scroll to #lab */
  var btnLab2 = document.getElementById('heroBtnLab2');
  if (btnLab2) {
    btnLab2.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToExp();
    });
  }

  /* Contact → scroll to #contact */
  var btnContact = document.getElementById('heroBtnContact');
  if (btnContact) {
    btnContact.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToContact();
    });
  }

  /* Hire Me → scroll to #contact */
  var btnHireMe = document.getElementById('heroBtnHireMe');
  if (btnHireMe) {
    btnHireMe.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToContact();
    });
  }

})();

/* ── Wire Navbar links ─────────────────────────────── */
(function wireNavLinks() {

  /* Work links → scrollToWork */
  document.querySelectorAll('a[href="#workHub"], a[data-nav="work"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToWork();
    });
  });

  /* Experience / Lab links → scrollToExp */
  document.querySelectorAll('a[href="#lab"], a[data-nav="exp"], a[data-nav="lab"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToExp();
    });
  });

  /* Contact links in nav → scrollToContact */
  document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
    /* Skip hero buttons — already wired above */
    if (a.id === 'heroBtnContact' || a.id === 'heroBtnHireMe') return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollToContact();
    });
  });

})();

/* ── Active nav-link highlight on scroll ─────────────
   Watches sections and marks the matching nav link
   with class 'nav-active'.
─────────────────────────────────────────────────────── */
(function initNavHighlight() {
  var sections = [
    { id: 'workHub', navHref: '#workHub'  },
    { id: 'lab',     navHref: '#lab'      },
    { id: 'about',   navHref: '#about'    },
    { id: 'contact', navHref: '#contact'  },
  ];

  var navLinks = document.querySelectorAll('#mainNav .nLinks a');

  function getActive() {
    var scrollMid = window.scrollY + window.innerHeight * 0.45;
    var active = null;
    sections.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (!el) return;
      if (el.offsetTop <= scrollMid) active = s.navHref;
    });
    return active;
  }

  function update() {
    var href = getActive();
    navLinks.forEach(function (a) {
      a.classList.toggle('nav-active', a.getAttribute('href') === href);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
