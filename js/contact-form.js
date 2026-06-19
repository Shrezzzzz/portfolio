/* ══════════════════════════════════════════════════════
   CONTACT FORM — EmailJS Integration
   Real-time email validation · Toast feedback · No mailto
   ─────────────────────────────────────────────────────
   SETUP (one-time):
     1. Go to https://www.emailjs.com and create a free account
     2. Add an Email Service (Gmail recommended) → copy Service ID
     3. Create an Email Template with variables:
          {{from_name}}  {{from_email}}  {{subject}}  {{message}}
        → copy Template ID
     4. Go to Account → API Keys → copy Public Key
     5. Replace the three placeholder strings below
   ══════════════════════════════════════════════════════ */

(function initContactForm() {

  /* ── ❶  YOUR EMAILJS CREDENTIALS ─────────────────── */
  var EMAILJS_PUBLIC_KEY  = 'SMHYTlKY9f4x1FLh_';   // e.g. 'user_abc123XYZ'
  var EMAILJS_SERVICE_ID  = 'service_9y58crw';   // e.g. 'service_abc123'
  var EMAILJS_TEMPLATE_ID = 'template_nwops1r';  // e.g. 'template_abc123'
  /* ─────────────────────────────────────────────────── */

  /* Detect unconfigured credentials before doing anything */
  var CREDENTIALS_SET = (
    EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY'  &&
    EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID'  &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY.trim()  !== '' &&
    EMAILJS_SERVICE_ID.trim()  !== '' &&
    EMAILJS_TEMPLATE_ID.trim() !== ''
  );

  /* ── ❷  ELEMENT REFS ──────────────────────────────── */
  var form         = document.getElementById('ctForm');
  var nameInput    = document.getElementById('ctName');
  var emailInput   = document.getElementById('ctEmail');
  var subjectInput = document.getElementById('ctSubject');
  var msgInput     = document.getElementById('ctMsg');
  var submitBtn    = document.getElementById('ctSubmitBtn');
  var submitLabel  = document.getElementById('ctSubmitLabel');
  var emailError   = document.getElementById('ctEmailError');
  var emailErrTxt  = document.getElementById('ctEmailErrorText');

  if (!form) return; // contact section not on this page

  /* ── ❸  INITIALIZE EMAILJS ────────────────────────── */
  if (CREDENTIALS_SET) {
    /* Wait for EmailJS SDK to be available */
    (function waitForEmailJS(cb) {
      if (window.emailjs) { cb(); return; }
      var attempts = 0;
      var poll = setInterval(function () {
        attempts++;
        if (window.emailjs) { clearInterval(poll); cb(); }
        else if (attempts > 40) { clearInterval(poll); }
      }, 100);
    })(function () {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    });
  }

  /* ── ❹  EMAIL VALIDATION ──────────────────────────── */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function isValidEmail(val) {
    return EMAIL_RE.test(val.trim());
  }

  function showEmailError(msg) {
    emailErrTxt.textContent = msg;
    emailError.classList.add('visible');
    emailInput.classList.add('input-error');
  }

  function clearEmailError() {
    emailError.classList.remove('visible');
    emailInput.classList.remove('input-error');
  }

  /* Real-time validation: only validate after the user has left the field once */
  var emailTouched = false;

  emailInput.addEventListener('blur', function () {
    emailTouched = true;
    validateEmailField();
  });

  emailInput.addEventListener('input', function () {
    if (!emailTouched) return;
    validateEmailField();
    /* Clear error as soon as it becomes valid */
    if (isValidEmail(emailInput.value)) clearEmailError();
  });

  function validateEmailField() {
    var val = emailInput.value.trim();
    if (!val) {
      showEmailError('Email address is required');
      return false;
    }
    if (!isValidEmail(val)) {
      showEmailError('Invalid email address');
      return false;
    }
    clearEmailError();
    return true;
  }

  /* ── ❺  TOAST UTILITY ─────────────────────────────── */
  function showToast(message, type) {
    var existing = document.querySelector('.ctToast');
    if (existing) {
      existing.classList.remove('show');
      existing.remove();
    }

    var toast = document.createElement('div');
    toast.className = 'ctToast ctToast--' + type;

    var icon = type === 'success'
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

    toast.innerHTML = icon + '<span>' + message + '</span>';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 400);
    }, 4500);
  }

  /* ── ❻  RESET HELPER ──────────────────────────────── */
  function resetForm() {
    /* Reset all values explicitly — don't rely on form.reset() alone
       because some browsers restore session state over it */
    nameInput.value    = '';
    emailInput.value   = '';
    subjectInput.value = '';
    msgInput.value     = '';
    clearEmailError();
    emailTouched = false;
    submitBtn.classList.remove('sending');
    submitLabel.textContent = 'Send Message →';
  }

  /* ── ❼  SUBMIT HANDLER ────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailTouched = true;

    var name    = nameInput.value.trim();
    var email   = emailInput.value.trim();
    var subject = subjectInput.value.trim();
    var message = msgInput.value.trim();

    /* Field validation — bail early with specific feedback */
    if (!name) {
      nameInput.focus();
      showToast('Please enter your name.', 'error');
      return;
    }

    if (!email || !isValidEmail(email)) {
      validateEmailField();
      emailInput.focus();
      return;
    }

    if (!subject) {
      subjectInput.focus();
      showToast('Please enter a subject.', 'error');
      return;
    }

    if (!message) {
      msgInput.focus();
      showToast('Please write a message.', 'error');
      return;
    }

    /* Guard: credentials not configured yet */
    if (!CREDENTIALS_SET) {
      showToast('Email service not configured. Please try again later.', 'error');
      return;
    }

    /* Guard: SDK not loaded */
    if (!window.emailjs) {
      showToast('Email service unavailable. Please try again.', 'error');
      return;
    }

    /* Loading state */
    submitBtn.classList.add('sending');
    submitLabel.textContent = 'Sending…';

    /* Pass plain strings — no encoding, spaces stay as spaces */
    var templateParams = {
      from_name  : name,
      from_email : email,
      subject    : subject,
      message    : message
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function (response) {
        if (response.status === 200) {
          resetForm();
          showToast('Message sent — I\'ll get back to you soon!', 'success');
        } else {
          /* EmailJS returned a non-200 response */
          submitBtn.classList.remove('sending');
          submitLabel.textContent = 'Send Message →';
          showToast('Something went wrong. Please try again or email directly.', 'error');
        }
      })
      .catch(function (err) {
        submitBtn.classList.remove('sending');
        submitLabel.textContent = 'Send Message →';
        var status = (err && err.status) ? err.status : 'unknown';
        var text   = (err && err.text)   ? err.text   : String(err);
        /* Surface the real error so it's actionable, then show a clean user message */
        if (status === 401 || status === 403) {
          console.error('[ContactForm] EmailJS auth failed — check your Public Key, Service ID, and Template ID in contact-form.js. Status:', status, '|', text);
        } else {
          console.error('[ContactForm] EmailJS send failed. Status:', status, '|', text);
        }
        showToast('Something went wrong. Please try again or email directly.', 'error');
      });
  });

  /* ── ❽  PREVENT BROWSER SESSION RESTORE ──────────────
     Some browsers (Safari, Firefox) restore form values on
     back-navigation even when autocomplete="off" is set.
     Explicitly clearing on pageshow covers this case.      */
  window.addEventListener('pageshow', function (e) {
    /* e.persisted = true means page was restored from bfcache */
    if (e.persisted) {
      resetForm();
    }
  });

})();
