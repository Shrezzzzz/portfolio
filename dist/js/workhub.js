/* ══════════════════════════════════════════════════════
   WORKHUB — Domain System v2
   Floating Glass Worlds × Interactive Ecosystem
══════════════════════════════════════════════════════ */

/* ── Domain configuration ── */
const DOMAINS = {
  cyber: {
    color: [99, 211, 206],
    label: 'Cybersecurity',
    vizType: 'threatmap',
  },
  aiml: {
    color: [74, 222, 128],
    label: 'AI / ML',
    vizType: 'neural',
  },
  iot: {
    color: [251, 176, 64],
    label: 'IoT',
    vizType: 'sensor',
  },
  blockchain: {
    color: [167, 139, 250],
    label: 'Blockchain',
    vizType: 'ledger',
  },
  fintech: {
    color: [96, 165, 250],
    label: 'FinTech',
    vizType: 'graph',
  },
};

/* ── Project content ── */

/* ─── YouTube helper: extracts video ID from a youtu.be or youtube.com URL ─── */
function ytID(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m ? m[1] : null;
}

/* ─── Build a YouTube glassmorphism card ─── */
function buildYtCard(ytUrl) {
  const id = ytID(ytUrl);
  if (!id) return '';
  return `
<div class="ytCard">
  <div class="ytCardInner">
    <div class="ytCardBar">
      <div class="ytCardDots"><span></span><span></span><span></span></div>
      <span class="ytCardLabel">SHOWCASE · YOUTUBE</span>
      <a class="ytCardExternal mag" href="${ytUrl}" target="_blank" rel="noopener" title="Open on YouTube">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
    <div class="ytEmbed">
      <iframe
        src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
        title="Project showcase"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
      <div class="ytOverlay">
        <div class="ytControls">
          <button class="ytPlayBtn mag" data-playing="true" aria-label="Toggle play/pause">
            <svg class="iconPause" width="16" height="16" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="4" height="14" rx="1" fill="currentColor"/><rect x="11" y="2" width="4" height="14" rx="1" fill="currentColor"/></svg>
            <svg class="iconPlay" width="16" height="16" viewBox="0 0 18 18" fill="none" style="display:none"><path d="M4 2l12 7-12 7V2z" fill="currentColor"/></svg>
          </button>
          <button class="ytVolBtn mag" data-muted="true" aria-label="Toggle mute/unmute">
            <!-- Muted icon (shown by default) -->
            <svg class="iconMuted" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <!-- Unmuted icon (hidden by default) -->
            <svg class="iconUnmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" style="display:none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
              <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

/* ─── Build the unified action bar ─── */
function buildActions({ github, linkedin, demo, youtube }) {
  let html = '<div class="projectActions">';
  if (github)   html += `<a class="pAction pAction--gh mag"  href="${github}"   target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>GITHUB</a>`;
  if (linkedin)  html += `<a class="pAction pAction--li mag"  href="${linkedin}"  target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LINKEDIN</a>`;
  if (demo)      html += `<a class="pAction pAction--demo mag" href="${demo}"      target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>LIVE DEMO</a>`;
  if (youtube)   html += `<a class="pAction pAction--yt mag"   href="${youtube}"   target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YOUTUBE</a>`;
  html += '</div>';
  return html;
}

const projects = {
  cyber: () => `
<div class="projectShowcase">
  <div class="projectHero">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — CYBERSECURITY</div>
      <div class="projectTitle">ZERO<br>SHIELD<br>AI</div>
      <div class="projectSub">AI POWERED CYBER DEFENSE SYSTEM</div>
      <p class="projectDesc">AI-driven cybersecurity platform focused on behavioral threat detection, threat intelligence, anomaly analysis and intelligent response handling.</p>
      <div class="projectTags">
        <span>Anomaly Detection</span><span>Threat Intel</span>
        <span>Behavior Analytics</span><span>SOC Research</span>
      </div>
      ${buildActions({
        github:   'https://github.com/Shrezzzzz/ZeroShield-AI',
        linkedin: 'https://www.linkedin.com/posts/shreya-chowdhury-b81988293_powerpuffgirls-nationalfinalist-unstop-activity-7466202407136485376-Qd_w',
        demo:     'https://zero-shield-ai.vercel.app/',
        youtube:  'https://youtu.be/KWsmJgv7vKU',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/KWsmJgv7vKU')}
    </div>
  </div>
</div>`,

  aiml: () => `
<div class="projectShowcase">
  <div class="projectHero">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — AI / ML</div>
      <div class="projectTitle">SLEEP<br>INTELLIGENCE</div>
      <div class="projectSub">PREDICTIVE WELLNESS THROUGH MACHINE LEARNING</div>
      <p class="projectDesc">Machine learning based sleep prediction application using behavioral inputs and regression models.</p>
      <div class="projectTags">
        <span>Python</span><span>Flask</span><span>Scikit-Learn</span><span>ML</span>
      </div>
      ${buildActions({
        github:   'https://github.com/Shrezzzzz/sleep-hours-prediction-webapp',
        linkedin: 'https://www.linkedin.com/posts/manidipadas_machinelearning-datascience-studentprojects-ugcPost-7423399893559459840-C8D7',
        demo:     'https://sleep-hours-prediction-webapp.onrender.com/',
        youtube:  'https://youtu.be/EwJpWAvoCvQ',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/EwJpWAvoCvQ')}
    </div>
  </div>
  <div class="projectHero reverse">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — AI / ML</div>
      <div class="projectTitle">GLOW<br>AI</div>
      <div class="projectSub">AI BEAUTY MARKETPLACE</div>
      <p class="projectDesc">AI-powered salon discovery and beauty recommendation platform built for personalized user experiences.</p>
      <div class="projectTags">
        <span>AI</span><span>Marketplace</span><span>NextJS</span><span>Recommendation</span>
      </div>
      ${buildActions({
        github:   'https://github.com/Shrezzzzz/Glow-AI',
        linkedin: '',
        demo:     'https://glow-ai-frontend.onrender.com',
        youtube:  'https://youtu.be/yUpHiGzo7LA',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/yUpHiGzo7LA')}
    </div>
  </div>
</div>`,

  iot: () => `
<div class="projectShowcase">
  <div class="projectHero">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — IoT</div>
      <div class="projectTitle">AUTONOMOUS<br>CAR</div>
      <div class="projectSub">EDGE AWARE AUTONOMOUS NAVIGATION</div>
      <p class="projectDesc">Arduino-powered autonomous non-falling smart car using ultrasonic and infrared sensing systems.</p>
      <div class="projectTags">
        <span>Arduino</span><span>IoT</span><span>Embedded C</span><span>Sensors</span>
      </div>
      ${buildActions({
        github:   'https://github.com/Ani-05-ai/Non-Falling-Smart-Car',
        linkedin: 'https://www.linkedin.com/posts/shreya-chowdhury-b81988293_embeddedsystems-arduino-iot-activity-7467132894407307264-7tgG',
        demo:     '',
        youtube:  'https://youtu.be/r4Ar0N3bLvs',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/r4Ar0N3bLvs')}
    </div>
  </div>
</div>`,

  blockchain: () => `
<div class="projectShowcase">
  <div class="projectHero">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — BLOCKCHAIN</div>
      <div class="projectTitle">BLOCK<br>VAULT</div>
      <div class="projectSub">DECENTRALIZED TRUST SYSTEM</div>
      <p class="projectDesc">Blockchain based reputation and trust protocol exploring decentralized financial identity systems.</p>
      <div class="projectTags">
        <span>Blockchain</span><span>Trust</span><span>Smart Contracts</span><span>Polygon</span>
      </div>
      ${buildActions({
        github:   'https://github.com/prakritisarkar/BlockVault',
        linkedin: 'https://www.linkedin.com/posts/shreya-chowdhury-b81988293_hackathon-diversion2k26-teamcoderiot-activity-7435942148337905665-_RuD',
        demo:     'https://blockvault-fe.vercel.app/',
        youtube:  'https://youtu.be/cdm9KWGWJNU',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/cdm9KWGWJNU')}
    </div>
  </div>
</div>`,

  fintech: () => `
<div class="projectShowcase">
  <div class="projectHero">
    <div class="projectHeroLeft">
      <div class="pNum">DOMAIN — FINTECH</div>
      <div class="projectTitle">SPLIT<br>X</div>
      <div class="projectSub">SMART GROUP EXPENSE TRACKER</div>
      <p class="projectDesc">Expense sharing platform built during StatusCode2 hackathon with real-time settlement tracking.</p>
      <div class="projectTags">
        <span>React Native</span><span>MongoDB</span><span>NodeJS</span><span>FinTech</span>
      </div>
      ${buildActions({
        github:   'https://github.com/prakritisarkar/Split_x',
        linkedin: 'https://www.linkedin.com/posts/adrija-karmakar-9a639028a_connections-hackathon-statuscode2-ugcPost-7367987653515935744-ABep',
        demo:     'https://split-x-umber.vercel.app/',
        youtube:  'https://youtu.be/7tQNUXkdYoU',
      })}
    </div>
    <div class="projectHeroRight">
      ${buildYtCard('https://youtu.be/7tQNUXkdYoU')}
    </div>
  </div>
</div>`,
};

/* ════════════════════════════════════════════════
   AMBIENT BACKGROUND CANVAS
   Draws a soft radial glow that morphs color
════════════════════════════════════════════════ */
(function initAmbientCanvas() {
  const canvas = document.getElementById('domainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let currentColor = [99, 211, 206];
  let targetColor = [99, 211, 206];
  let t = 0;

  function resize() {
    const section = document.getElementById('workHub');
    W = canvas.width = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function lerp(a, b, f) { return a + (b - a) * f; }
  function lerpColor(c1, c2, f) {
    return [lerp(c1[0], c2[0], f), lerp(c1[1], c2[1], f), lerp(c1[2], c2[2], f)];
  }

  (function draw() {
    requestAnimationFrame(draw);
    t += 0.008;
    currentColor = lerpColor(currentColor, targetColor, 0.03);
    const [r, g, b] = currentColor;

    ctx.clearRect(0, 0, W, H);

    // Primary radial glow — top right
    const grd1 = ctx.createRadialGradient(W * .75, H * .3, 0, W * .75, H * .3, W * .55);
    grd1.addColorStop(0, `rgba(${r},${g},${b},0.07)`);
    grd1.addColorStop(1, 'transparent');
    ctx.fillStyle = grd1;
    ctx.fillRect(0, 0, W, H);

    // Secondary glow — bottom left
    const grd2 = ctx.createRadialGradient(W * .2, H * .8, 0, W * .2, H * .8, W * .4);
    grd2.addColorStop(0, `rgba(${r},${g},${b},0.04)`);
    grd2.addColorStop(1, 'transparent');
    ctx.fillStyle = grd2;
    ctx.fillRect(0, 0, W, H);

    // Subtle horizontal scan line
    const scanY = (Math.sin(t * .4) * .5 + .5) * H;
    const grd3 = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
    grd3.addColorStop(0, 'transparent');
    grd3.addColorStop(0.5, `rgba(${r},${g},${b},0.025)`);
    grd3.addColorStop(1, 'transparent');
    ctx.fillStyle = grd3;
    ctx.fillRect(0, scanY - 80, W, 160);
  })();

  // Expose color setter
  window._setAmbientColor = function(color) {
    targetColor = color;
    document.getElementById('domainAmbient').classList.add('on');
  };
})();

/* ════════════════════════════════════════════════
   PER-PANEL MINI CANVAS VISUALIZATIONS
════════════════════════════════════════════════ */
function drawViz(canvas, domain) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const [r, g, b] = DOMAINS[domain].color;
  const color = `rgb(${r},${g},${b})`;
  const colorA = (a) => `rgba(${r},${g},${b},${a})`;

  const type = DOMAINS[domain].vizType;
  let frame = 0;

  function tick() {
    requestAnimationFrame(tick);
    ctx.clearRect(0, 0, W, H);
    frame++;

    if (type === 'threatmap') {
      // Cybersecurity: scanning threat map with nodes and connection pulses
      const nodes = [
        { x: 30, y: 25 }, { x: 90, y: 15 }, { x: 150, y: 35 },
        { x: 60, y: 60 }, { x: 120, y: 55 }, { x: 170, y: 70 },
        { x: 40, y: 90 }, { x: 100, y: 85 }, { x: 155, y: 100 },
      ];
      const edges = [[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[0,1],[1,2],[3,4],[4,5]];

      // Draw edges
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.strokeStyle = colorA(0.15);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Animated pulse on random edge
      const pulseEdge = edges[Math.floor(frame / 40) % edges.length];
      const pf = ((frame % 40) / 40);
      const pa = nodes[pulseEdge[0]];
      const pb = nodes[pulseEdge[1]];
      const px = pa.x + (pb.x - pa.x) * pf;
      const py = pa.y + (pb.y - pa.y) * pf;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = colorA(0.9);
      ctx.fill();

      // Draw nodes
      nodes.forEach((n, i) => {
        const pulse = Math.sin(frame * 0.05 + i) * .5 + .5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = colorA(0.35 + pulse * 0.35);
        ctx.fill();
        // Outer ring on hovered node
        if (i === Math.floor(frame / 60) % nodes.length) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = colorA(0.15);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Scan line
      const scanY = ((frame * 0.5) % H);
      ctx.fillStyle = colorA(0.06);
      ctx.fillRect(0, scanY, W, 1);

    } else if (type === 'neural') {
      // AI/ML: neural network layers
      const layers = [[20, 50, 80], [50, 30, 60, 80], [35, 65], [50]];
      const xs = [15, 60, 140, 185];
      layers.forEach((layer, li) => {
        if (li < layers.length - 1) {
          layer.forEach(y1 => {
            layers[li + 1].forEach(y2 => {
              const pulse = Math.sin(frame * 0.04 + y1 * 0.05 + li) * .5 + .5;
              ctx.beginPath();
              ctx.moveTo(xs[li], y1);
              ctx.lineTo(xs[li + 1], y2);
              ctx.strokeStyle = colorA(0.07 + pulse * 0.1);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            });
          });
        }
      });
      layers.forEach((layer, li) => {
        layer.forEach(y => {
          const pulse = Math.sin(frame * 0.06 + y * 0.07) * .5 + .5;
          ctx.beginPath();
          ctx.arc(xs[li], y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = colorA(0.3 + pulse * 0.45);
          ctx.fill();
        });
      });

    } else if (type === 'sensor') {
      // IoT: concentric sensor rings pulsing outward
      const cx = W / 2, cy = H / 2;
      for (let ring = 0; ring < 4; ring++) {
        const radius = 12 + ring * 22 + ((frame * 0.4 + ring * 15) % 30);
        const alpha = 0.35 - (radius / (W * .8)) * 0.3;
        if (alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = colorA(alpha);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = colorA(0.8);
      ctx.fill();
      // Satellite nodes
      const nodeCount = 5;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2 + frame * 0.01;
        const nx = cx + Math.cos(angle) * 38;
        const ny = cy + Math.sin(angle) * 38;
        ctx.beginPath();
        ctx.arc(nx, ny, 2, 0, Math.PI * 2);
        ctx.fillStyle = colorA(0.6);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = colorA(0.12);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

    } else if (type === 'ledger') {
      // Blockchain: chain of blocks with hash lines
      const blocks = 5;
      const bw = 28, bh = 18;
      const startX = 10;
      const ys = [30, 55, 45, 70, 40];
      for (let i = 0; i < blocks; i++) {
        const x = startX + i * 36;
        const y = ys[i];
        const pulse = Math.sin(frame * 0.05 + i * 1.2) * .5 + .5;
        // Block rect
        ctx.strokeStyle = colorA(0.2 + pulse * 0.15);
        ctx.lineWidth = 0.8;
        ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = colorA(0.04 + pulse * 0.04);
        ctx.fillRect(x, y, bw, bh);
        // Hash line inside block
        ctx.fillStyle = colorA(0.25);
        ctx.fillRect(x + 4, y + 4, bw - 8, 1);
        ctx.fillRect(x + 4, y + 8, (bw - 8) * 0.6, 1);
        ctx.fillRect(x + 4, y + 12, (bw - 8) * 0.8, 1);
        // Chain connector
        if (i < blocks - 1) {
          const nx = startX + (i + 1) * 36;
          const ny = ys[i + 1];
          ctx.beginPath();
          ctx.moveTo(x + bw, y + bh / 2);
          ctx.lineTo(nx, ny + bh / 2);
          ctx.strokeStyle = colorA(0.18);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          // Animated pulse bead
          const pf = ((frame * 0.5 + i * 20) % 20) / 20;
          const bx = (x + bw) + (nx - (x + bw)) * pf;
          const by = (y + bh / 2) + (ny + bh / 2 - (y + bh / 2)) * pf;
          ctx.beginPath();
          ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = colorA(0.8);
          ctx.fill();
        }
      }

    } else if (type === 'graph') {
      // FinTech: financial chart with candlestick feel
      const data = [38, 52, 44, 60, 55, 72, 65, 80, 74, 88, 78, 95];
      const maxY = 100;
      const colW = (W - 20) / data.length;

      // Area fill under line
      ctx.beginPath();
      ctx.moveTo(10, H - 10);
      data.forEach((v, i) => {
        const x = 10 + i * colW + colW / 2;
        const y = H - 10 - (v / maxY) * (H - 20);
        if (i === 0) ctx.lineTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.lineTo(10 + (data.length - 1) * colW + colW / 2, H - 10);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, colorA(0.12));
      grad.addColorStop(1, colorA(0));
      ctx.fillStyle = grad;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = 10 + i * colW + colW / 2;
        const y = H - 10 - (v / maxY) * (H - 20);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = colorA(0.45);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Animated moving point
      const pi = Math.floor((frame * 0.05) % data.length);
      const px2 = 10 + pi * colW + colW / 2;
      const py2 = H - 10 - (data[pi] / maxY) * (H - 20);
      ctx.beginPath();
      ctx.arc(px2, py2, 3, 0, Math.PI * 2);
      ctx.fillStyle = colorA(0.9);
      ctx.fill();
      const ringR = 6 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(px2, py2, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = colorA(0.25);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
  tick();
}

/* ════════════════════════════════════════════════
   DOMAIN PANEL INTERACTION
════════════════════════════════════════════════ */
(function initDomainPanels() {
  const strip = document.getElementById('domainStrip');
  const container = document.getElementById('projectContainer');
  const panels = document.querySelectorAll('.domainPanel');
  let activeDomain = null;

  // Boot visualizations on all panels
  panels.forEach(panel => {
    const domain = panel.dataset.domain;
    const vizCanvas = panel.querySelector('.dpViz');
    if (vizCanvas) drawViz(vizCanvas, domain);

    // Hover → update ambient background
    panel.addEventListener('mouseenter', () => {
      if (window._setAmbientColor) {
        window._setAmbientColor(DOMAINS[domain].color);
      }
    });

    // Click → select domain
    panel.addEventListener('click', () => {
      const isSame = panel.classList.contains('active');

      // Reset all panels
      panels.forEach(p => p.classList.remove('active'));
      strip.classList.remove('has-active');

      if (isSame) {
        // Toggle off
        activeDomain = null;
        closeProjects();
        return;
      }

      // Activate clicked panel
      panel.classList.add('active');
      strip.classList.add('has-active');
      activeDomain = domain;

      // Trigger ambient glow
      if (window._setAmbientColor) {
        window._setAmbientColor(DOMAINS[domain].color);
      }

      // Cinematic project reveal
      openProjects(domain);
    });
  });

  function openProjects(domain) {
    // First close with a flash-out
    container.classList.remove('open');
    container.innerHTML = '';

    // Short delay for exit animation, then inject and reveal
    setTimeout(() => {
      // projects[domain] is now a function
      container.innerHTML = projects[domain]();

      // Re-attach cursor hover to new links
      container.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
      });

      // Wire up YouTube play/pause overlay buttons
      container.querySelectorAll('.ytPlayBtn').forEach(btn => {
        const iframe = btn.closest('.ytEmbed').querySelector('iframe');
        btn.addEventListener('click', () => {
          const playing = btn.dataset.playing === 'true';
          const msg = playing ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
          if (iframe.contentWindow) iframe.contentWindow.postMessage(msg, '*');
          btn.dataset.playing = (!playing).toString();
          btn.querySelector('.iconPause').style.display = playing ? 'none' : '';
          btn.querySelector('.iconPlay').style.display  = playing ? ''     : 'none';
        });
      });

      // Wire up YouTube mute/unmute buttons
      container.querySelectorAll('.ytVolBtn').forEach(btn => {
        const iframe = btn.closest('.ytEmbed').querySelector('iframe');
        btn.addEventListener('click', () => {
          const muted = btn.dataset.muted === 'true';
          const msg = muted
            ? '{"event":"command","func":"unMute","args":""}'
            : '{"event":"command","func":"mute","args":""}';
          if (iframe.contentWindow) iframe.contentWindow.postMessage(msg, '*');
          btn.dataset.muted = (!muted).toString();
          btn.querySelector('.iconMuted').style.display   = muted ? 'none' : '';
          btn.querySelector('.iconUnmuted').style.display = muted ? ''     : 'none';
        });
      });

      // Scroll to project area (smooth, slight offset)
      requestAnimationFrame(() => {
        container.classList.add('open');
        setTimeout(() => {
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      });
    }, 160);
  }

  function closeProjects() {
    container.classList.remove('open');
    setTimeout(() => { container.innerHTML = ''; }, 500);
  }
})();
