import { motion } from 'framer-motion'
import heroPhoto from '../assets/hero-photo.png'

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

const statsFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.9, duration: 0.6, ease: 'easeOut' },
  },
}

const stats = [
  { value: '2+', label: 'YEARS\nEXPERIENCE' },
  { value: '99+', label: 'PROJECTS\nCOMPLETED' },
  { value: '100%', label: 'CLIENT\nSATISFACTION' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-navy-950"
    >
      {/* ── Background hero photo ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Souvik Bisoi sitting on a bean-bag chair with a laptop and coffee cup, moody cinematic lighting with diagonal light streaks"
          className="w-full h-full object-cover object-[65%_center]"
        />
        {/* Dark gradient overlay — strong on the left for text, transparent on the right to show the photo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #050C1A 0%, rgba(5,12,26,0.92) 25%, rgba(5,12,26,0.65) 45%, rgba(5,12,26,0.15) 65%, transparent 80%)',
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,12,26,0.5) 0%, transparent 30%, transparent 80%, #050C1A 100%)',
          }}
        />
      </div>

      {/* ── Watermark — names positioned in the right half ── */}
      <div className="absolute top-0 right-0 z-[1] overflow-hidden pointer-events-none select-none" style={{ width: '60%', height: '100%' }}>
        <div className="absolute top-20 right-0 lg:top-16 text-right pr-2 lg:pr-6 watermark">
          <span
            className="block font-black uppercase leading-[0.9] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              color: 'rgba(255, 255, 255, 0.07)',
            }}
          >
            SOUVIK
          </span>
          <span
            className="block font-black uppercase leading-[0.9] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              color: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            BISOI
          </span>
        </div>
      </div>


      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-28 pb-10 lg:pt-28 lg:pb-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-[45%]">
          {/* Availability badge — Poppins 600 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
              </span>
              Available for New Projects
            </span>
          </motion.div>

          {/* Headline — Poppins 800, normal (not italic), ~50px */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="uppercase mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              fontWeight: 800,
            }}
          >
            <span className="block text-white">I DON&apos;T JUST</span>
            <span className="block">
              <span className="text-white">EDIT </span>
              <span className="headline-dark">VIDEOS.</span>
            </span>
            <span className="block text-white">I CREATE</span>
            <span className="block headline-dark">EXPERIENCES.</span>
          </motion.h1>

          {/* Supporting paragraph — Poppins 400, ~17px */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/50 text-sm lg:text-base leading-relaxed mb-7 max-w-[400px] font-normal"
          >
            I transform raw footage into cinematic stories that captivate
            audiences, grow brands, and leave a lasting impression — frame by
            frame.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4 mb-10"
          >
            {/* View Projects */}
            <motion.a
              href="#projects"
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(5,12,26,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-navy-900 text-white font-semibold text-[14px] leading-[23px] px-6 py-3 rounded-full border border-white/10 transition-colors duration-300 hover:bg-navy-800"
            >
              View Projects
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </span>
            </motion.a>

            {/* Contact Me */}
            <motion.a
              href="#contact"
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-white font-semibold text-[14px] leading-[23px] px-6 py-3 rounded-full border border-white/20 bg-transparent transition-colors duration-300"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Stats card */}
          <motion.div
            variants={statsFade}
            initial="hidden"
            animate="visible"
            className="inline-flex bg-navy-950/50 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden"
          >
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col px-4 lg:px-6 py-3.5 ${
                  idx < stats.length - 1 ? 'border-r border-white/10' : ''
                }`}
              >
                <span className="text-[22px] lg:text-[26px] leading-[41px] font-extrabold text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-[10px] lg:text-xs font-semibold text-white/40 tracking-[0.15em] uppercase whitespace-pre-line leading-tight">
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
