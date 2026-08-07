import { motion } from 'framer-motion'
import souvikPortrait from '../assets/souvik-front.png'

/* ── Scroll-triggered fade-up variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-navy-950 py-24 lg:py-32"
    >
      {/* ── "ABOUT ME" watermark ── */}
      <div className="absolute top-8 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden">
        <span
          className="block font-black uppercase tracking-[-0.04em] leading-none text-center lg:text-left lg:ml-[24%]"
          style={{
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
            color: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          ABOUT ME
        </span>
      </div>

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-14">

          {/* ── Left column: Portrait card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="w-full max-w-[320px] lg:max-w-[350px] flex-shrink-0"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 60px 8px rgba(59, 130, 246, 0.12), 0 0 120px 20px rgba(59, 130, 246, 0.06)',
              }}
            >
              {/* Card image container */}
              <div className="bg-cream/90 p-0">
                <img
                  src={souvikPortrait}
                  alt="Souvik Bisoi — portrait with blue brush-stroke treatment"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Right column: Headline + bio (offset down to match reference alignment) ── */}
          <div className="flex-1 max-w-2xl lg:pt-14">
            {/* Headline — same mixed-emphasis pattern as the hero */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              className="uppercase mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                fontWeight: 800,
              }}
            >
              <span className="block text-white">CRAFTING STORIES</span>
              <span className="block headline-dark">FRAME BY FRAME</span>
            </motion.h2>

            {/* Bio paragraph */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
              className="text-white/55 text-sm lg:text-[15px] leading-[1.7] mb-5 max-w-[500px] font-normal"
            >
              I'm Souvik Bisoi, a freelance video editor based in Kolkata, India. I've spent more than 2 years refining the art of post-production across YouTube, documentary, commercial, and social content — working with creators, brands, and agencies who refuse to settle for average.
            </motion.p>

            {/* Philosophy paragraph */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={3}
              className="text-white/55 text-sm lg:text-[15px] leading-[1.7] max-w-[500px] font-normal"
            >
              My philosophy is simple: every cut is intentional, every
              transition serves the story, and every second of silence is
              earned. I don't just assemble footage — I architect emotion.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
