import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroPhoto from '../assets/hero-photo.png'
import { MOTION_CONFIG } from '../config/motion'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 2, suffix: '+', label: 'YEARS\nEXPERIENCE' },
  { target: 99, suffix: '+', label: 'PROJECTS\nCOMPLETED' },
  { target: 100, suffix: '%', label: 'CLIENT\nSATISFACTION' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const watermarkRef = useRef(null)
  const statsRef = useRef(null)
  const statNumbersRef = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse parallax on desktop
  useEffect(() => {
    if (window.innerWidth < 768) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 12 // max 12px
      const y = (e.clientY / innerHeight - 0.5) * 12
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // GSAP ScrollTrigger for Ghost Watermark Parallax & Stat Counter
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Background watermark parallax drift
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: MOTION_CONFIG.duration.parallaxScrub,
          },
        })
      }

      // Animated Stats Counters
      if (statsRef.current && statNumbersRef.current.length) {
        statNumbersRef.current.forEach((el, idx) => {
          if (!el) return
          const targetVal = stats[idx].target
          const statObj = { val: 0 }

          gsap.to(statObj, {
            val: targetVal,
            duration: 1.6,
            ease: MOTION_CONFIG.ease.gsapPower3Out,
            delay: 0.8 + idx * MOTION_CONFIG.stagger.statsCounters,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
              once: true,
            },
            onUpdate: () => {
              el.innerText = `${Math.floor(statObj.val)}${stats[idx].suffix}`
            },
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Line mask animation variants for Framer Motion
  const lineVariant = {
    hidden: { y: '105%', opacity: 0 },
    visible: (custom = 0) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: MOTION_CONFIG.duration.heroHeadline,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.35 + custom * MOTION_CONFIG.stagger.heroLines,
      },
    }),
  }

  const fadeItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.duration.sectionReveal,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.85 + custom * MOTION_CONFIG.stagger.heroElements,
      },
    }),
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-navy-950"
    >
      {/* ── Background hero photo with slow scale-in & subtle mouse parallax ── */}
      <motion.div
        initial={{ scale: 1.08, filter: 'blur(8px)', opacity: 0.6 }}
        animate={{
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          scale: { duration: 1.4, ease: MOTION_CONFIG.ease.framerCinematic },
          filter: { duration: 1.2, ease: 'easeOut' },
          opacity: { duration: 0.9, ease: 'easeOut' },
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
        }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={heroPhoto}
          alt="Souvik Bisoi sitting on a bean-bag chair with a laptop and coffee cup"
          className="w-full h-full object-cover object-[78%_center] sm:object-[65%_center]"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              'linear-gradient(to right, #050C1A 0%, rgba(5,12,26,0.92) 35%, rgba(5,12,26,0.65) 55%, rgba(5,12,26,0.15) 75%, transparent 90%)',
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,12,26,0.92) 0%, rgba(5,12,26,0.85) 50%, rgba(5,12,26,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,12,26,0.6) 0%, transparent 25%, transparent 75%, #050C1A 100%)',
          }}
        />
      </motion.div>

      {/* ── Watermark with GSAP ScrollTrigger Parallax Drift ── */}
      <div
        ref={watermarkRef}
        className="absolute top-0 right-0 z-[1] w-full sm:w-[60%] h-full overflow-hidden pointer-events-none select-none will-change-transform"
      >
        <div className="absolute top-16 right-0 sm:top-20 lg:top-16 text-right pr-4 sm:pr-6 watermark">
          <span
            className="block font-black uppercase leading-[0.9] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 11rem)',
              color: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            SOUVIK
          </span>
          <span
            className="block font-black uppercase leading-[0.9] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 6.5rem)',
              color: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            BISOI
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 pb-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-[45%]">
          {/* Availability badge */}
          <motion.div
            variants={fadeItem}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-5 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/5 border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-orange-500" />
              </span>
              Available for New Projects
            </span>
          </motion.div>

          {/* Masked Line-by-Line Headline Reveal */}
          <h1
            className="uppercase mb-5 sm:mb-6 select-none"
            style={{
              fontSize: 'clamp(1.85rem, 5.5vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              fontWeight: 800,
            }}
          >
            {/* Line 1 */}
            <div className="overflow-hidden py-0.5">
              <motion.span
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={0}
                className="block text-white"
              >
                I DON&apos;T JUST
              </motion.span>
            </div>

            {/* Line 2: EDIT then VIDEOS. */}
            <div className="overflow-hidden py-0.5 flex flex-wrap gap-x-2">
              <motion.span
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={1}
                className="inline-block text-white"
              >
                EDIT
              </motion.span>
              <motion.span
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={3}
                className="inline-block headline-dark"
              >
                VIDEOS.
              </motion.span>
            </div>

            {/* Line 3 */}
            <div className="overflow-hidden py-0.5">
              <motion.span
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={2}
                className="block text-white"
              >
                I CREATE
              </motion.span>
            </div>

            {/* Line 4: EXPERIENCES. lands last */}
            <div className="overflow-hidden py-0.5">
              <motion.span
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={4}
                className="block headline-dark"
              >
                EXPERIENCES.
              </motion.span>
            </div>
          </h1>

          {/* Supporting paragraph */}
          <motion.p
            variants={fadeItem}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-white/50 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-7 max-w-[400px] font-normal"
          >
            I transform raw footage into cinematic stories that captivate
            audiences, grow brands, and leave a lasting impression — frame by
            frame.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeItem}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* View Projects with Arrow Nudge */}
            <motion.a
              href="#projects"
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(5,12,26,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: MOTION_CONFIG.duration.microFast }}
              className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-navy-900 text-white font-semibold text-xs sm:text-[14px] sm:leading-[23px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 transition-colors duration-300 hover:bg-navy-800"
            >
              View Projects
              <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 ease-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </span>
            </motion.a>

            {/* Contact Me */}
            <motion.a
              href="#contact"
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: MOTION_CONFIG.duration.microFast }}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-[14px] sm:leading-[23px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-transparent transition-colors duration-300"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Stats card with GSAP number counters */}
          <motion.div
            ref={statsRef}
            variants={fadeItem}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex w-full sm:w-auto sm:inline-flex bg-navy-950/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden"
          >
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex-1 sm:flex-initial flex flex-col items-center sm:items-start px-2 sm:px-5 lg:px-6 py-3 sm:py-3.5 ${
                  idx < stats.length - 1 ? 'border-r border-white/10' : ''
                }`}
              >
                <span
                  ref={(el) => (statNumbersRef.current[idx] = el)}
                  className="text-base sm:text-[22px] lg:text-[26px] sm:leading-[41px] font-extrabold text-white mb-0.5 sm:mb-1 tabular-nums"
                >
                  {stat.target}
                  {stat.suffix}
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs font-semibold text-white/40 tracking-wider sm:tracking-[0.15em] uppercase whitespace-pre-line leading-tight text-center sm:text-left">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-950 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
