# Solution-Lan-Web — Vanilla JS Animations & Interactive UI

## Overview
A responsive, animation-heavy corporate landing page built with vanilla 
HTML, CSS, and JavaScript — no frameworks. The project focuses on smooth, 
performant UI interactions and custom animation logic built from scratch, 
without relying on animation libraries for the core effects.

## Key Features & Technical Highlights

### Custom Animated Hero Sequence
Built a multi-scene, auto-playing hero section with letter-by-letter text 
reveal animations, timed transitions between scenes, and dynamic 
`letterSpacing` recalculation based on viewport width — all orchestrated 
with vanilla JS `setTimeout` sequencing and CSS animation triggers (no GSAP 
or similar libraries).

### Dynamic Tab System with Animated Highlight
Implemented a sliding highlight indicator that recalculates its position 
and width in real time using `getBoundingClientRect()`, synced to tab 
clicks and content switching.

### Scroll-Driven UI Behavior
- Active navigation link highlighting based on scroll position
- Header style changes on scroll (shrink/elevate effect)
- Section reveal animations powered by the `IntersectionObserver` API for 
  better performance than scroll-event-based solutions

### Responsive Mobile Navigation
Custom hamburger menu with a slide-in panel, scroll lock (`no-scroll` class 
toggling), and a separate language-switcher modal for mobile breakpoints.

### Touch-Friendly Carousel
Built a horizontally scrollable service carousel with dot indicators that 
sync to scroll position via `scrollLeft` calculations, supporting both 
click-to-navigate and swipe gestures on mobile.

### Image Modal / Lightbox
Custom lightbox implementation for viewing an enlarged network map image, 
with click-outside-to-close and scroll-lock behavior — built without a 
third-party lightbox library.

### Contact Form Handling
Form validation and a `mailto:` link generator that dynamically builds a 
pre-filled email (subject + formatted body) from user input, avoiding the 
need for a backend on a static site.

### i18n-Ready Structure
Built with a language-switcher UI (Spanish/English) to support multi-language 
content, including a dedicated mobile modal for language selection.

## Tech Stack
- **HTML5** — semantic structure.
- **CSS3** — custom animations, responsive design, flexbox/grid layouts.
- **Vanilla JavaScript (ES6+)** — no frameworks; DOM manipulation, event delegation, and the native `IntersectionObserver` API.
