# Noora Bahroz — Cinematic Portfolio

A continuous cinematic scrolling portfolio website built with GSAP ScrollTrigger. The entire site feels like one scrolling film — no hard cuts, no black gaps, every transition is smooth and scroll-driven.
**Live Site:** [https://my-portfolio-aabo.vercel.app/](https://my-portfolio-aabo.vercel.app/)


---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Mouse parallax with character (Jinx 1.png), large "PORTFOLIO" text, name & title, scroll indicator |
| **About** | Character slides to the right, heading + description + social icons appear on the left (unboxed, no background) |
| **Welcome** | Character returns to center, "WELCOME" text crossfades in behind the character |
| **Client Love** | Testimonial marquee lines moving in opposite directions with client names and messages |
| **My Work** | 4 project cards scatter outward (2-left, 2-right layout) with thumbnails and GitHub links |
| **Services** | 4 glassmorphism service cards in infinite right→left marquee with ambient color-reactive glow |
| **Contact** | "LET'S TALK" heading, social icons, glassmorphism contact form, SEND button |
| **Finale** | Text-first layout (buttons → name → character → nav → footer), floating nav appears on scroll-up only |

---

## Tech Stack

- **HTML/CSS/JS** — Single-file static site
- **GSAP 3.12** — All animations powered by GSAP
- **ScrollTrigger** — Scroll-driven cinematic timeline
- **Bebas Neue + Poppins** — Typography (Google Fonts)

---

## Features

### Scroll-Driven Cinematic Timeline
One single GSAP timeline controls the entire pinned section (Hero → About → Welcome → Client Love). All animations use `scrub` for scroll-based control.

### Mouse Parallax (Hero)
Character and portfolio text follow mouse movement with perspective rotation. Disabled on scroll.

### Project Cards with Thumbnails
4 project cards with glassmorphism styling, real project screenshots, and GitHub links:
- **Image Gallery** — React, Masonry, API
- **Blood Group Management** — PHP, MySQL, Bootstrap
- **Music Player** — JavaScript, Audio API, UI
- **NovaCart Ecommerce** — React Native, Firebase, Stripe

### Services Marquee
4 service cards (Frontend, Full Stack, Mobile, UI/UX) move right→left in infinite marquee with ambient color-reactive glow that cycles through yellow → orange → purple → red.

### Floating Navigation
A glassmorphism pill nav appears at the top only when scrolling UP after reaching the finale section. Uses smooth scroll to navigate between sections.

---

## Timeline Position Map

```
0.00 - 0.15  Hero → About transition
0.15 - 0.30  About section visible (description + social icons)
0.30 - 0.45  Description fades out
0.46         Description hidden, Welcome fades in
0.61 - 0.90  Welcome stable on screen
0.92         Welcome exits + Character fades out
0.96 - 1.00  Client Love (testimonials + marquees)
```

After the pinned section:
- **My Work** — Cards scatter on scroll
- **Services** — Marquee + ambient glow
- **Contact** — Form + social links
- **Finale** — Closing section with floating nav

---

## Project Structure

```
My-Portfolio-/
├── index.html              ← Main entry point (Vercel)
├── cinematic-portfolio.html ← Original source file
├── Jinx 1.png              ← Character image (PNG with transparency)
├── image gallery.png       ← Project thumbnail
├── blood grp mng sys.png   ← Project thumbnail
├── music player.png        ← Project thumbnail
├── e commerce novacart.png ← Project thumbnail
├── noora_portfolio.jsx     ← React component (reference)
└── IMPLEMENTATION_GUIDE.md ← Implementation notes
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Framework: **Other**
4. Root directory: **/**
5. No build command needed — static HTML site
6. Deploy

---

## Design Decisions

- **No black gaps** — Body uses `radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%) fixed` as persistent background
- **Unboxed content-left** — Text flows directly on screen without background boxes
- **Crossfade** — Description fades out while Welcome fades in simultaneously (0.46–0.61)
- **Character visibility** — Hidden (not blurred) during Client Love and Finale sections via `visibility: hidden`
- **Glassmorphism** — Cards use `backdrop-filter: blur(12px)` with subtle borders

---

## Author

**Noora Bahroz** — Frontend Developer & React Native Developer

- [GitHub](https://github.com/Noora-Bahroz)
- LinkedIn
- Instagram
- WhatsApp

---

© 2026 All Rights Reserved
