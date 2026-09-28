import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

import youtubeImg from '../assets/youtube.png'
import shortsImg from '../assets/shorts.png'
import commercialImg from '../assets/commercial-ads-preview.jpg'
import podcastImg from '../assets/podcast.jpg'
import motionImg from '../assets/motion-designer-software-vector.jpg'

const services = [
  {
    id: '01',
    title: 'YouTube Long-Form Editing',
    subtitle: 'Pacing & Retention Focus',
    description:
      'Crafting high-retention narrative arcs, seamless cuts, custom intros, dynamic graphic callouts, and cinema-grade sound design that keeps viewers hooked.',
    deliverables: ['Retention Storytelling', 'Custom Intros & Outros', 'SFX & Sound Design', 'Color Grading'],
    hoverImage: youtubeImg,
    badge: 'Popular',
  },
  {
    id: '02',
    title: 'Shorts, Reels & TikTok Edits',
    subtitle: 'High-Velocity Short Form',
    description:
      'Snappy vertical videos engineered for viral algorithmic reach, complete with kinetic subtitles, sound effects, dynamic zooms, and fast-paced pattern interrupts.',
    deliverables: ['Kinetic Captions', 'Pattern Interrupts', 'Hook Optimization', 'Sound Effects'],
    hoverImage: shortsImg,
    badge: 'High Impact',
  },
  {
    id: '03',
    title: 'Commercials & Brand Ads',
    subtitle: 'Cinematic Promo Content',
    description:
      'High-impact commercial video editing designed to elevate brand authority, highlight products, and drive high-converting audience action across platforms.',
    deliverables: ['Brand Storytelling', 'Product Spotlights', 'Audio Mastering', 'Ad Hook Variations'],
    hoverImage: commercialImg,
    badge: 'Commercial',
  },
  {
    id: '04',
    title: 'Podcast & Show Production',
    subtitle: 'Multi-Cam Audio & Video',
    description:
      'Professional multi-camera editing with clean speaker switching, voice enhancement, lower thirds, chapter overlays, and viral short snippet cutouts.',
    deliverables: ['Multi-Cam Switching', 'Audio Noise Removal', 'Lower Thirds & Graphics', 'Short Clips Cutout'],
    hoverImage: podcastImg,
    badge: 'Broadcast',
  },
  {
    id: '05',
    title: 'Motion Graphics & VFX',
    subtitle: 'Visual Effects & Animation',
    description:
      'Adding dynamic 2D/3D motion design, kinetic typography, screen replacements, UI mockups, and logo animation sequences to take video edits to the next level.',
    deliverables: ['Kinetic Typography', 'Logo Animations', 'Screen Replacements', 'UI & Map Animations'],
    hoverImage: motionImg,
    badge: 'Creative FX',
  },
]

// Scroll animation variant matching the site theme
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // GSAP 3D Tilt Effect on mouse movement
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power2.out' })
    const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power2.out' })
    const scaleTo = gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Calculate tilt degrees (max 7 deg)
      const rotateY = (mouseX / (rect.width / 2)) * 7
      const rotateX = -(mouseY / (rect.height / 2)) * 7

      xTo(rotateY)
      yTo(rotateX)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      scaleTo(1.02)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      xTo(0)
      yTo(0)
      scaleTo(1)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        className={`relative group rounded-2xl overflow-hidden bg-navy-900/80 border transition-colors duration-500 flex flex-col justify-between h-full ${
          isHovered
            ? 'border-accent/60 shadow-[0_0_45px_rgba(59,130,246,0.22)]'
            : 'border-white/10 hover:border-accent/40'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top visual preview box (Dual-image container) */}
        <div className="relative w-full h-56 lg:h-64 overflow-hidden bg-navy-950/90 border-b border-white/10">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent/20 border border-accent/40 text-accent backdrop-blur-md">
              {service.badge}
            </span>
          </div>

          {/* Service index number */}
          <div className="absolute top-4 right-4 z-20 font-mono text-xl font-bold text-white/40">
            {service.id}
          </div>

          {/* 1st State: Non-Hover Image / Stylized Base Visual */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
              isHovered ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
            }`}
          >
            {/* Dark background graphic with subtle glow & grid lines */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black/90" />
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
            
            {/* Grayscale / Dark tinted underlying image */}
            <img
              src={service.hoverImage}
              alt={`${service.title} base`}
              className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
            />

            {/* Non-hover center emblem/icon */}
            <div className="absolute z-10 flex flex-col items-center justify-center text-center p-4">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner group-hover:border-accent/50 transition-colors">
                <svg
                  className="w-7 h-7 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-widest font-medium text-white/50">
                Hover to Preview
              </span>
            </div>
          </div>

          {/* 2nd State: Hover Image (Vibrant color preview on hover) */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src={service.hoverImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between z-10">
          <div>
            <div className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">
              {service.subtitle}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-cream transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-normal">
              {service.description}
            </p>
          </div>

          {/* Deliverables list */}
          <div>
            <div className="text-xs font-semibold uppercase text-white/40 mb-3 tracking-wider">
              Deliverables:
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {service.deliverables.map((item, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/75 group-hover:border-accent/30 transition-colors"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            {/* Action link */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors duration-300 group/btn"
            >
              <span>Discuss This Service</span>
              <svg
                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-navy-950 py-24 lg:py-32 border-t border-white/5"
    >
      {/* Background light streak overlay matching index.css */}
      <div className="light-streaks opacity-40 pointer-events-none" />

      {/* ── "SERVICES" Watermark background text ── */}
      <div className="absolute top-10 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden">
        <span
          className="block font-black uppercase tracking-[-0.04em] leading-none text-center lg:text-left lg:ml-[10%]"
          style={{
            fontSize: 'clamp(4.5rem, 13vw, 12rem)',
            color: 'rgba(255, 255, 255, 0.04)',
          }}
        >
          SERVICES
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              What I Offer
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="uppercase"
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              fontWeight: 800,
            }}
          >
            <span className="block text-white">HIGH-IMPACT EDITING</span>
            <span className="block headline-dark">SERVICES THAT ENGAGE</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
            className="mt-4 text-white/60 text-base lg:text-lg max-w-2xl font-normal"
          >
            From retention-driven YouTube videos to high-converting commercial ads and viral short form content, I transform raw footage into compelling stories.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={5}
          className="mt-16 lg:mt-24 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-white/10 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
              Have a custom video project in mind?
            </h3>
            <p className="text-white/60 text-sm lg:text-base font-normal">
              Whether you need ongoing monthly video editing or a one-off campaign, let's build something exceptional together.
            </p>
          </div>

          <a
            href="#contact"
            className="flex-shrink-0 px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center gap-2 group"
          >
            <span>Start a Project</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
