/**
 * Motion Design Configuration & Tuning Constants
 * Easily adjust durations, eases, and staggers here.
 */

export const MOTION_CONFIG = {
  // Easing presets
  ease: {
    // GSAP Easing
    gsapPower3Out: 'power3.out',
    gsapExpoOut: 'expo.out',
    gsapPower2Out: 'power2.out',
    
    // Framer Motion Bezier
    framerCinematic: [0.22, 1, 0.36, 1],
    framerSmooth: [0.25, 0.1, 0.25, 1],
    framerSpring: { type: 'spring', stiffness: 350, damping: 28 },
  },

  // Durations (seconds)
  duration: {
    pageReveal: 1.1,
    heroHeadline: 0.95,
    sectionReveal: 0.85,
    microFast: 0.2,
    microMedium: 0.32,
    parallaxScrub: 0.8,
  },

  // Staggers (seconds)
  stagger: {
    heroLines: 0.12,
    heroElements: 0.14,
    statsCounters: 0.12,
    cardsFan: 0.1,
    infoCards: 0.12,
  },

  // Lenis Smooth Scroll settings
  lenis: {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 2.0,
  },
}
