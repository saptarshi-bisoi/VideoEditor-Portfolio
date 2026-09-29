import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import souvikPortrait from '../assets/profile.png'
import { MOTION_CONFIG } from '../config/motion'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const photoCardRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Slower ghost watermark parallax
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: MOTION_CONFIG.duration.parallaxScrub,
          },
        })
      }

      // Portrait photo scrubbed vertical parallax
      if (photoCardRef.current && window.innerWidth >= 768) {
        gsap.fromTo(
          photoCardRef.current,
          { y: 30 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Line mask variants for heading
  const lineVariant = {
    hidden: { y: '105%', opacity: 0 },
    visible: (custom = 0) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: MOTION_CONFIG.duration.heroHeadline,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.2 + custom * 0.14,
      },
    }),
  }

  // Paragraph fade-up variants
  const paragraphFade = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.duration.sectionReveal,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.45 + custom * 0.15,
      },
    }),
  }

  // Photo bottom-to-top clip reveal
  const photoReveal = {
    hidden: { clipPath: 'inset(100% 0% 0% 0% round 28px)', opacity: 0, scale: 1.05 },
    visible: {
      clipPath: 'inset(0% 0% 0% 0% round 28px)',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.15,
      },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy-950 py-20 sm:py-28 lg:py-32 select-none"
    >
      {/* ── Subtle background radial lighting ── */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 40% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left column: Portrait card with Clip Reveal & Scrub Parallax ── */}
          <div
            ref={photoCardRef}
            className="lg:col-span-5 flex justify-center lg:justify-start will-change-transform"
          >
            <motion.div
              variants={photoReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px] rounded-[28px] overflow-hidden"
              style={{
                boxShadow:
                  '0 0 50px 10px rgba(59, 130, 246, 0.15), 0 0 100px 25px rgba(59, 130, 246, 0.06)',
              }}
            >
              <img
                src={souvikPortrait}
                alt="Souvik Bisoi — Video Editor & Motion Designer"
                className="w-full h-auto object-cover rounded-[28px] hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* ── Right column: Outlined Watermark + Headline + Copy ── */}
          <div className="lg:col-span-7 relative flex flex-col justify-center">
            
            {/* ── Outlined Watermark "ABOUT ME" with GSAP parallax drift ── */}
            <div
              ref={watermarkRef}
              className="absolute -top-14 sm:-top-16 lg:-top-20 left-0 right-0 pointer-events-none select-none overflow-hidden z-0 will-change-transform"
            >
              <span
                className="block font-[900] uppercase tracking-[-0.03em] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(3.8rem, 9.5vw, 115px)',
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.09)',
                }}
              >
                ABOUT ME
              </span>
            </div>

            {/* ── Masked Headline ── */}
            <h2
              className="relative z-10 font-[900] uppercase tracking-tight mb-6 sm:mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(2rem, 4.2vw, 48px)',
                lineHeight: '1.1',
              }}
            >
              <div className="overflow-hidden py-0.5">
                <motion.span
                  variants={lineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={0}
                  className="block text-white"
                >
                  CRAFTING STORIES
                </motion.span>
              </div>
              <div className="overflow-hidden py-0.5">
                <motion.span
                  variants={lineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={1}
                  className="block text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                >
                  FRAME BY FRAME
                </motion.span>
              </div>
            </h2>

            {/* ── Bio Paragraph with Highlighted Keywords & Soft Glow ── */}
            <motion.p
              variants={paragraphFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              className="relative z-10 text-white/70 text-sm sm:text-[15px] lg:text-[16px] leading-[1.75] mb-5 font-normal max-w-xl"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              I&apos;m <strong className="text-white font-bold">Souvik Bisoi</strong>, a freelance video editor based in Kolkata, India. I&apos;ve spent more than{' '}
              <motion.span
                initial={{ opacity: 0.8 }}
                whileInView={{
                  opacity: 1,
                  textShadow: ['0 0 0px #3B82F6', '0 0 16px rgba(59,130,246,0.8)', '0 0 6px rgba(59,130,246,0.4)'],
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.8 }}
                className="text-[#3B82F6] font-semibold"
              >
                4 years
              </motion.span>{' '}
              refining the art of post-production across YouTube, documentary, commercial, and social content — working with creators, brands, and{' '}
              <motion.span
                initial={{ opacity: 0.8 }}
                whileInView={{
                  opacity: 1,
                  textShadow: ['0 0 0px #3B82F6', '0 0 16px rgba(59,130,246,0.8)', '0 0 6px rgba(59,130,246,0.4)'],
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.95 }}
                className="text-[#3B82F6] font-semibold"
              >
                agencies
              </motion.span>{' '}
              who refuse to settle for average.
            </motion.p>

            {/* ── Philosophy Paragraph ── */}
            <motion.p
              variants={paragraphFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              className="relative z-10 text-white/70 text-sm sm:text-[15px] lg:text-[16px] leading-[1.75] font-normal max-w-xl"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              My philosophy is simple: every cut is intentional, every transition serves the story, and every second of silence is earned. I don&apos;t just assemble footage — I architect emotion.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  )
}
