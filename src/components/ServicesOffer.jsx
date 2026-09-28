import { motion, useReducedMotion } from 'framer-motion'

import youtubeImg from '../assets/youtube.png'
import shortsImg from '../assets/shorts.png'
import commercialImg from '../assets/commercial-ads-preview.jpg'
import podcastImg from '../assets/podcast.jpg'
import motionImg from '../assets/motion-designer-software-vector.jpg'

const servicesData = [
  {
    id: '01',
    title: 'YouTube Editing',
    subtitle: 'Retention Pacing & B-Roll',
    badge: 'Popular',
    image: youtubeImg,
    icon: (
      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Short Form Content',
    subtitle: 'Reels, Shorts & TikToks',
    badge: 'High Impact',
    image: shortsImg,
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Podcast Editing',
    subtitle: 'Clean Audio & Captions',
    badge: 'Broadcast',
    image: podcastImg,
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Commercial Ads',
    subtitle: 'Social & TV Campaigns',
    badge: 'Commercial',
    image: commercialImg,
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Motion Graphics',
    subtitle: 'Lower Thirds & VFX',
    badge: 'Creative FX',
    image: motionImg,
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
]

// Framer Motion spring physics config
const springTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 22,
  mass: 0.8,
}

// Group variants for the 5 cards (Rest vs Hover/Focus)
const cardVariants = [
  {
    rest: { x: -35, y: 15, rotate: -12, zIndex: 10 },
    hover: { x: -160, y: 40, rotate: -10, zIndex: 10 },
  },
  {
    rest: { x: -17, y: 8, rotate: -6, zIndex: 20 },
    hover: { x: -80, y: 20, rotate: -5, zIndex: 20 },
  },
  {
    rest: { x: 0, y: 0, rotate: 0, zIndex: 30 },
    hover: { x: 0, y: 0, rotate: 0, zIndex: 30 },
  },
  {
    rest: { x: 17, y: 8, rotate: 6, zIndex: 40 },
    hover: { x: 80, y: -20, rotate: 5, zIndex: 40 },
  },
  {
    rest: { x: 35, y: 15, rotate: 12, zIndex: 50 },
    hover: { x: 160, y: -40, rotate: 10, zIndex: 50 },
  },
]

export default function ServicesOffer() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="services"
      className="relative w-full bg-navy-950 py-24 lg:py-32 overflow-hidden"
    >
      {/* Background light streak texture matching site theme */}
      <div className="light-streaks opacity-30 pointer-events-none" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Heading & Copy Block ── */}
          <div className="lg:col-span-5 flex flex-col justify-center select-none">
            {/* Ghosted / Low-opacity watermark title */}
            <div className="relative">
              <h2
                className="font-black uppercase tracking-tighter text-white/15 select-none"
                style={{
                  fontSize: 'clamp(4.5rem, 9vw, 122px)',
                  lineHeight: 'clamp(4rem, 8vw, 116px)',
                }}
              >
                WHAT I<br />OFFER
              </h2>

              {/* Solid foreground line ("Services") positioned over lower ghost text */}
              <div
                className="text-accent font-black tracking-tight -mt-1 lg:-mt-2 ml-1"
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 70px)',
                  lineHeight: 'clamp(2.8rem, 5.5vw, 74px)',
                }}
              >
                Services
              </div>
            </div>

            {/* Paragraph copy with bold emphasis */}
            <p 
              className="mt-4 lg:mt-6 text-white/90 font-medium max-w-2xl"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 35px)',
                lineHeight: 'clamp(1.75rem, 4vw, 48px)',
              }}
            >
              I create <strong className="font-bold text-white">unconventional</strong> yet{' '}
              <strong className="font-bold text-white">functional &amp; visually pleasing</strong> content
            </p>
          </div>

          {/* ── RIGHT COLUMN: Interactive Deck Reveal (Desktop Stack) ── */}
          <div className="lg:col-span-7 hidden lg:flex justify-center items-center py-16">
            <motion.div
              initial="rest"
              whileHover={shouldReduceMotion ? 'rest' : 'hover'}
              whileFocus={shouldReduceMotion ? 'rest' : 'hover'}
              tabIndex={0}
              role="region"
              aria-label="Interactive services card deck. Focus or hover to fan out cards."
              className="relative w-[320px] h-[480px] flex items-center justify-center cursor-pointer outline-none focus:ring-2 focus:ring-accent/40 rounded-3xl"
            >
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants[index]}
                  transition={springTransition}
                  whileHover={{ scale: 1.04, zIndex: 100 }}
                  style={{
                    position: 'absolute',
                    width: '320px',
                    height: '460px',
                    transformOrigin: 'bottom center',
                  }}
                  className="group rounded-3xl bg-gradient-to-b from-[#0e2142] via-[#0a1628] to-[#050c1a] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
                >
                  {/* Card Top Section: Icon & Header */}
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner group-hover:bg-accent/10 transition-colors mb-4">
                      {service.icon}
                    </div>

                    <h3 
                      className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-accent transition-colors"
                      style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium text-white/60 mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Card Lower Section: Image Preview with Gradient Overlay */}
                  <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mt-4 bg-navy-950 shadow-inner">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    {/* Dark overlay gradient for text contrast & polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/20 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── MOBILE / TOUCH FALLBACK: Horizontal Scroll-Snap Deck ── */}
          <div className="lg:hidden col-span-1 w-full">
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-white/50 font-medium">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Swipe cards to explore services</span>
            </div>

            <div className="flex overflow-x-auto gap-5 pb-6 pt-2 px-1 snap-x snap-mandatory scrollbar-none scroll-smooth">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="snap-center flex-shrink-0 w-[300px] sm:w-[340px] h-[460px] rounded-3xl bg-gradient-to-b from-[#0e2142] via-[#0a1628] to-[#050c1a] p-6 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent mb-4">
                      {service.icon}
                    </div>

                    <h3 
                      className="text-2xl font-bold text-white tracking-tight leading-snug"
                      style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium text-white/60 mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="relative w-full flex-grow rounded-2xl overflow-hidden mt-4 bg-navy-950 shadow-inner">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/20 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
