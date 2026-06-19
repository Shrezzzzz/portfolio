/* ══════════════════════════════════════════════════════
   KALI TERMINAL — typewriter animation engine
   Renders a realistic Kali Linux session in the hero.
   ══════════════════════════════════════════════════════ */

(function initKaliTerminal() {

  var output = document.getElementById('kTermOutput');
  var cursor = document.getElementById('kTermCursor');
  if (!output || !cursor) return;

  /* ── Respect prefers-reduced-motion ── */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Session script ─────────────────────────────────
     Each entry is one "action":
       type  'prompt'  — show a new prompt line (no typing)
       type  'cmd'     — type a command char by char
       type  'output'  — print output lines instantly
       type  'blank'   — insert an empty line
  ─────────────────────────────────────────────────────── */
  var PROMPT_HTML =
    '<span class="kt-prompt">┌──(</span>' +
    '<span class="kt-user">shreya㉿portfolio</span>' +
    '<span class="kt-prompt">)-[</span>' +
    '<span class="kt-dir">~</span>' +
    '<span class="kt-prompt">]</span>';

  var ARROW_HTML =
    '<span class="kt-prompt">└─</span>' +
    '<span class="kt-yellow">$</span> ';

  var SESSION = [
    /* ── whoami ── */
    { type: 'prompt' },
    { type: 'cmd',    text: 'whoami' },
    { type: 'output', lines: ['<span class="kt-purple">shreya</span>'] },
    { type: 'blank' },

    /* ── cat profile.txt ── */
    { type: 'prompt' },
    { type: 'cmd',    text: 'cat profile.txt' },
    { type: 'blank' },
    { type: 'output', lines: [
      '<span class="kt-dim">Name    :</span> <span class="kt-green">Shreya Chowdhury</span>',
      '<span class="kt-dim">Degree  :</span> <span class="kt-yellow">B.Tech CSE[Cybersecurity · IoT · Blockchain]</span>',
      '<span class="kt-dim">Base    :</span> <span class="kt-cmd">Kolkata, West Bengal, India</span>',
      '<span class="kt-dim">Status  :</span> <span class="kt-green">● Available for work</span>',
    ]},
    { type: 'blank' },

    /* ── echo ── */
    { type: 'prompt' },
    { type: 'cmd',    text: 'echo "Let\'s build something that moves humanity forward."' },
    { type: 'blank' },
    { type: 'output', lines: [
      '<span class="kt-green">Let\'s build something that moves humanity forward.</span>',
    ]},
    { type: 'blank' },
  ];

  /* ── Timing constants (ms) ── */
  var T = {
    charMin:   38,   /* fastest keystroke          */
    charMax:  115,   /* slowest keystroke           */
    charPause: 55,   /* extra pause after certain chars */
    postCmd:  420,   /* pause before output appears */
    postOut:  620,   /* pause after output block    */
    postBlank: 80,   /* pause for blank lines       */
    restart:  13500, /* restart delay after finish  */
  };

  /* ── Helpers ── */
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sleep(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  /* Occasionally slow down to simulate hesitation */
  function charDelay(ch) {
    var base = rand(T.charMin, T.charMax);
    /* longer pause after space, comma, quote, hyphen */
    if (' ,\'"-'.indexOf(ch) !== -1) base += T.charPause;
    return base;
  }

  /* ── DOM helpers ── */
  function appendLine(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    output.appendChild(el);
    return el;
  }

  function clearOutput() {
    output.innerHTML = '';
    /* Move cursor back into output area */
    output.appendChild(cursor);
  }

  /* Keep cursor always at the bottom of output */
  function placeCursor() {
    /* Detach from wherever it is, re-append to output */
    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    output.appendChild(cursor);
  }

  /* ── Type a command character by character ── */
  async function typeCommand(text) {
    /* Create a line: arrow + typed text span + cursor */
    var lineEl = document.createElement('div');
    lineEl.innerHTML = ARROW_HTML;
    var typedSpan = document.createElement('span');
    typedSpan.className = 'kt-cmd';
    lineEl.appendChild(typedSpan);
    output.appendChild(lineEl);
    placeCursor();   /* cursor sits after typedSpan */
    lineEl.appendChild(cursor);

    for (var i = 0; i < text.length; i++) {
      await sleep(charDelay(text[i]));
      typedSpan.textContent += text[i];
    }

    /* Move cursor off this line before executing */
    await sleep(rand(180, 320));
  }

  /* ── Print output lines ── */
  async function printOutput(lines) {
    await sleep(T.postCmd);
    placeCursor();
    for (var i = 0; i < lines.length; i++) {
      appendLine(lines[i]);
      await sleep(rand(18, 45));
    }
  }

  /* ── Render final resting prompt (cursor blinks here) ── */
  function renderFinalPrompt() {
    appendLine(PROMPT_HTML);
    var arrowLine = document.createElement('div');
    arrowLine.innerHTML = ARROW_HTML;
    output.appendChild(arrowLine);
    arrowLine.appendChild(cursor);
  }

  /* ── Full session runner ── */
  async function runSession() {
    clearOutput();
    placeCursor();   /* cursor visible from start */

    for (var s = 0; s < SESSION.length; s++) {
      var step = SESSION[s];

      if (step.type === 'prompt') {
        appendLine(PROMPT_HTML);

      } else if (step.type === 'cmd') {
        await typeCommand(step.text);

      } else if (step.type === 'output') {
        await printOutput(step.lines);
        await sleep(T.postOut);

      } else if (step.type === 'blank') {
        appendLine('');
        await sleep(T.postBlank);
      }
    }

    /* Final resting state — cursor blinks on empty prompt */
    renderFinalPrompt();
  }

  /* ── Loop: run → wait → restart ── */
  async function loop() {
    await runSession();
    await sleep(T.restart);
    loop();
  }

  /* ── Reduced-motion: show completed terminal instantly ── */
  function renderStatic() {
    clearOutput();

    /* whoami */
    appendLine(PROMPT_HTML);
    appendLine(ARROW_HTML + '<span class="kt-cmd">whoami</span>');
    appendLine('<span class="kt-purple">shreya</span>');
    appendLine('');

    /* cat profile.txt */
    appendLine(PROMPT_HTML);
    appendLine(ARROW_HTML + '<span class="kt-cmd">cat profile.txt</span>');
    appendLine('');
    appendLine('<span class="kt-dim">Name    :</span> <span class="kt-green">Shreya Chowdhury</span>');
    appendLine('<span class="kt-dim">Degree  :</span> <span class="kt-yellow">B.Tech CSE[Cybersecurity · IoT · Blockchain]</span>'),
    appendLine('<span class="kt-dim">Base    :</span> <span class="kt-cmd">Kolkata, West Bengal, India</span>');
    appendLine('<span class="kt-dim">Status  :</span> <span class="kt-green">● Available for work</span>');
    appendLine('');

    /* echo */
    appendLine(PROMPT_HTML);
    appendLine(ARROW_HTML + '<span class="kt-cmd">echo "Let\'s build something that moves humanity forward."</span>');
    appendLine('');
    appendLine('<span class="kt-green">Let\'s build something that moves humanity forward.</span>');
    appendLine('');

    /* final prompt */
    renderFinalPrompt();
  }

  /* ── Boot ── */
  if (prefersReduced) {
    renderStatic();
  } else {
    /* Small delay so the terminal fades in before typing starts */
    setTimeout(loop, 2600);
  }

})();
