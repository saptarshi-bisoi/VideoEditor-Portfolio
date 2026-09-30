import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION_CONFIG } from '../config/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // GSAP ScrollTrigger Watermark Parallax Drift
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: MOTION_CONFIG.duration.parallaxScrub,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9da0fe2a-f585-4218-8bf3-45cc3c756993'

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New inquiry from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} (via Portfolio)`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please reach out directly via Email or WhatsApp.')
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your internet connection or email directly.')
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.7, ease: MOTION_CONFIG.ease.framerCinematic },
    }),
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -35 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * MOTION_CONFIG.stagger.infoCards, duration: 0.65, ease: MOTION_CONFIG.ease.framerCinematic },
    }),
  }

  const inputVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.08, duration: 0.5, ease: MOTION_CONFIG.ease.framerCinematic },
    }),
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy-950 py-20 sm:py-28 lg:py-32 select-none"
    >
      {/* ── Background subtle radial blue glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Corner Decoration ── */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 pointer-events-none z-0 opacity-40 sm:opacity-60">
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20L80 20L140 80L180 80" stroke="url(#accentGlowLeft)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="140" cy="80" r="3.5" fill="#3B82F6" className="animate-pulse" />
          <circle cx="80" cy="20" r="2.5" fill="#3B82F6" />
          <defs>
            <linearGradient id="accentGlowLeft" x1="0" y1="20" x2="180" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 pointer-events-none z-0 opacity-40 sm:opacity-60">
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M180 20L100 20L40 80L0 80" stroke="url(#accentGlowRight)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="40" cy="80" r="3.5" fill="#3B82F6" className="animate-pulse" />
          <circle cx="100" cy="20" r="2.5" fill="#3B82F6" />
          <defs>
            <linearGradient id="accentGlowRight" x1="180" y1="20" x2="0" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── "CONTACT" Watermark with GSAP Parallax Drift ── */}
      <div
        ref={watermarkRef}
        className="absolute top-8 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden text-center will-change-transform"
      >
        <span
          className="font-black uppercase tracking-[-0.04em] leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 16vw, 15rem)',
            color: 'rgba(255, 255, 255, 0.04)',
          }}
        >
          CONTACT
        </span>
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Contact Methods & Socials ── */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2">
            {/* Pill Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <svg
                  className="w-3.5 h-3.5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-3h-2.25m-1.5 0h-2.25m-1.5 0H3"
                  />
                </svg>
                Contact
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
            >
              Get in touch
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={2}
              className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md mb-8 sm:mb-9 font-normal"
            >
              Feel free to reach out through the contact form or directly via email or social channels.
            </motion.p>

            {/* ── Contact Method Cards (Slide in from Left + Hover Arrow Rotate) ── */}
            <div className="flex flex-col gap-3.5 sm:gap-4 w-full mb-8">
              {/* 1. Email */}
              <motion.a
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
                href="mailto:souvikbisoi2021@gmail.com"
                className="group flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-accent/40 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent group-hover:border-accent/30 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider mb-0.5">Email</span>
                    <span className="block text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors break-all">
                      souvikbisoi2021@gmail.com
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300 ease-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.a>

              {/* 2. WhatsApp */}
              <motion.a
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={1}
                href="https://wa.me/918159042006?text=Hello%20Souvik%21%20%F0%9F%91%8B%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20your%20video%20editing%20services.%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#25D366]/40 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#25D366] group-hover:border-[#25D366]/30 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.101-.475-.15-.675.15-.2.301-.776.98-.952 1.18-.175.201-.35.226-.651.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.35.452-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.493-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.11.15.2 2.12 3.238 5.136 4.541.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.118.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351zM12.012 2.002C6.49 2.002 2.01 6.48 2.01 12.003c0 1.996.586 3.864 1.602 5.438L2.001 22l4.708-1.545a9.96 9.96 0 005.303 1.548c5.522 0 10.002-4.478 10.002-10c0-5.523-4.48-10.001-10.002-10.001zm0 18.238c-1.64 0-3.176-.49-4.469-1.332l-.32-.209-2.791.916.936-2.721-.229-.338a8.214 8.214 0 01-1.358-4.551c0-4.55 3.702-8.252 8.231-8.252 4.53 0 8.232 3.702 8.232 8.252 0 4.55-3.702 8.245-8.231 8.245z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider mb-0.5">WhatsApp</span>
                    <span className="block text-xs sm:text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                      +91 81590 42006
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300 ease-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.a>

              {/* 3. Location */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={2}
                className="group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider mb-0.5">Location</span>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      Available Worldwide / Remote
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.div>

              {/* 4. Availability */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={3}
                className="group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider mb-0.5">Availability</span>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      Open for Freelance &amp; Full-time
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* ── Social Icon Buttons Row (Stagger pop-in) ── */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/918159042006?text=Hello%20Souvik%21%20%F0%9F%91%8B%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20your%20video%20editing%20services.%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.',
                  hoverBg: '#25D366',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.101-.475-.15-.675.15-.2.301-.776.98-.952 1.18-.175.201-.35.226-.651.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.35.452-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.493-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.11.15.2 2.12 3.238 5.136 4.541.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.118.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351zM12.012 2.002C6.49 2.002 2.01 6.48 2.01 12.003c0 1.996.586 3.864 1.602 5.438L2.001 22l4.708-1.545a9.96 9.96 0 005.303 1.548c5.522 0 10.002-4.478 10.002-10c0-5.523-4.48-10.001-10.002-10.001zm0 18.238c-1.64 0-3.176-.49-4.469-1.332l-.32-.209-2.791.916.936-2.721-.229-.338a8.214 8.214 0 01-1.358-4.551c0-4.55 3.702-8.252 8.231-8.252 4.53 0 8.232 3.702 8.232 8.252 0 4.55-3.702 8.245-8.231 8.245z"/>
                    </svg>
                  ),
                },
                { label: 'LinkedIn', href: 'https://linkedin.com', hoverBg: '#3B82F6', icon: <span className="text-xs font-bold font-serif">in</span> },
                { label: 'X (Twitter)', href: 'https://x.com', hoverBg: '#3B82F6', icon: <span className="text-xs font-extrabold">X</span> },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  hoverBg: '#E1306C',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: 'backOut' }}
                  whileHover={{ scale: 1.1, backgroundColor: social.hoverBg || '#3B82F6', borderColor: social.hoverBg || '#3B82F6' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Right Column: Form Card (Fade up & scale 0.97 to 1) ── */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: MOTION_CONFIG.ease.framerCinematic }}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                {/* 1. Name */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                  className="flex flex-col gap-2"
                >
                  <label htmlFor="name" className="text-xs font-semibold text-white/90">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    aria-label="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                  />
                </motion.div>

                {/* 2. Email */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="flex flex-col gap-2"
                >
                  <label htmlFor="email" className="text-xs font-semibold text-white/90">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    aria-label="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                  />
                </motion.div>

                {/* 3. Subject */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                  className="flex flex-col gap-2"
                >
                  <label htmlFor="subject" className="text-xs font-semibold text-white/90">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    aria-label="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration"
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300"
                  />
                </motion.div>

                {/* 4. Message */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                  className="flex flex-col gap-2"
                >
                  <label htmlFor="message" className="text-xs font-semibold text-white/90">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    aria-label="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project…"
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-300 resize-none"
                  />
                </motion.div>

                {/* Full-width Button: "Send Message" with hover scale 1.02 & icon slide */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: MOTION_CONFIG.duration.microFast }}
                  className="group w-full mt-2 bg-cream hover:bg-white text-navy-950 font-bold text-sm py-4 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-cream/20 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <svg className="animate-spin h-4 w-4 text-navy-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </motion.span>
                    ) : submitted ? (
                      <motion.span
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Message Sent! ✓
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2.5"
                      >
                        Send Message
                        <svg
                          className="w-4 h-4 text-navy-950 transform group-hover:translate-x-1 transition-transform duration-300 ease-out"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c.01.56.49 1 1.39.91z" />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Error Banner */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5"
                    >
                      <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
