# Shreya Chowdhury — Portfolio

Personal portfolio website for Shreya Chowdhury, Creative Engineer.  
Built with vanilla HTML, CSS, and JavaScript. Bundled with Vite.

**Live:** [shreyachowdhury.onrender.com](https://shreyachowdhury.onrender.com) *(update after deployment)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Modular CSS (no framework) |
| Logic | Vanilla JavaScript (ES5/ES6) |
| Build tool | [Vite](https://vitejs.dev/) v5 |
| Email | [EmailJS](https://www.emailjs.com/) (browser SDK) |
| Font | JetBrains Mono (Google Fonts) |
| Deployment | Render — Static Site |

---

## Project Structure

```
portfolio/
├── index.html              # Single page entry point
├── package.json
│
├── assets/
│   └── images/
│       ├── me.jpeg         # Profile photo
│       ├── kali-logo.png   # Kali Linux dragon watermark
│       └── terminal-logo.png
│
├── css/
│   ├── base.css            # CSS variables, reset, global tokens
│   ├── animations.css      # Keyframes
│   ├── navigation.css      # Top nav + docked pill nav
│   ├── hero.css            # Hero section + Kali terminal widget
│   ├── sections.css        # About, Work, Experience, Contact, Footer
│   ├── projects.css        # Project cards and domain panels
│   ├── lab.css             # Lab / certifications section
│   └── responsive.css      # Breakpoints (600px, 900px, 1100px, 1200px)
│
├── js/
│   ├── main.js             # Orchestrator — loads all modules
│   ├── navigation.js       # Scroll-based dock behaviour
│   ├── navigation-cta.js   # CTA visibility on scroll
│   ├── hero-canvas.js      # Particle canvas in hero
│   ├── terminal.js         # Kali Linux typewriter animation
│   ├── workhub.js          # Work section domain panels
│   ├── lab.js              # Lab section interactions
│   ├── reveal.js           # Scroll-reveal animations
│   ├── cursor.js           # Custom magnetic cursor
│   ├── contact-canvas.js   # Canvas effect in contact section
│   ├── contact-form.js     # EmailJS form with validation + toasts
│   └── image-transitions.js
│
└── public/
    └── resume/
        └── Shreya_Chowdhury_Resume.pdf
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Install

```bash
git clone https://github.com/Shrezzzzz/portfolio.git
cd portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Vite copies everything in `public/` directly into `dist/` at build time, so the resume PDF will be available at `/resume/Shreya_Chowdhury_Resume.pdf`.

### Preview the production build

```bash
npm run preview
```

---

## Contact Form — EmailJS Setup

The contact form sends emails directly from the browser via [EmailJS](https://www.emailjs.com/). No backend required.

To configure it:

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (Gmail recommended) → copy the **Service ID**
3. Create an Email Template using these variables:

   ```
   {{from_name}}
   {{from_email}}
   {{subject}}
   {{message}}
   ```

   Copy the **Template ID**.

4. Go to **Account → API Keys** → copy the **Public Key**

5. Open `js/contact-form.js` and replace the three values:

   ```js
   var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

> **Note:** These credentials are public-facing (browser-side). EmailJS handles rate limiting and spam protection on their end. For a personal portfolio this is the standard setup.

---

## Deployment — Render

This is a **frontend-only static site**. Deploy it as a **Static Site** on Render.

| Field | Value |
|---|---|
| Service Type | Static Site |
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Environment Variables | None required |

### Steps

1. Push the repo to GitHub (make sure `public/resume/Shreya_Chowdhury_Resume.pdf` is committed)
2. Go to [render.com](https://render.com) → **New → Static Site**
3. Connect your GitHub repository
4. Set the build command and publish directory as above
5. Click **Deploy**

Add `dist/` to `.gitignore` before deploying — let Render own the build output:

```
# .gitignore
dist/
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated Kali Linux terminal typewriter + CTA buttons |
| **Work** | Featured projects with domain panels |
| **Experience** | Internships and professional timeline |
| **Skills** | Technical capabilities matrix |
| **About** | Bio, education, and identity |
| **Lab** | Hackathons, certifications, open experiments |
| **Contact** | Live contact form (EmailJS) + direct links |

---

## License

This project is personal and not licensed for reuse. All design, content, and code belong to Shreya Chowdhury.
