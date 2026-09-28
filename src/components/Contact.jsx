import { useState } from 'react'
import { motion } from 'framer-motion'

/* ── Motion animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /* Front-end UI handler stub — ready to connect to Formspree, EmailJS, or custom API endpoint */
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 800)
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-navy-950 py-20 sm:py-28 lg:py-32"
    >
      {/* ── Background subtle radial blue glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Corner Decoration: Glowing diagonal trace-lines with circular nodes ── */}
      {/* Top-Left Corner Trace Line */}
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

      {/* Top-Right Corner Trace Line */}
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

      {/* ── "CONTACT" Watermark ── */}
      <div className="absolute top-8 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden text-center">
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
          
          {/* ── Left Column: Sitting directly on background (NOT inside an enclosing card) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            className="lg:col-span-5 flex flex-col justify-start pt-2"
          >
            {/* Small Pill Badge */}
            <div className="mb-5">
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
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get in touch
            </h2>

            {/* Subtext */}
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md mb-8 sm:mb-9 font-normal">
              Feel free to reach out through the contact form or directly via email or social channels.
            </p>

            {/* ── 3 Individual Contact Method Cards ── */}
            <div className="flex flex-col gap-3.5 sm:gap-4 w-full mb-8">
              {/* 1. Envelope icon — Email (placeholder: overlordyt621@gmail.com) */}
              {/* ⚠ NOTE: overlordyt621@gmail.com is a placeholder. Swap with Souvik's real inbox before shipping. */}
              <a
                href="mailto:overlordyt621@gmail.com"
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
                      overlordyt621@gmail.com
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </a>

              {/* 2. Map-pin icon — Location — "Available Worldwide / Remote" */}
              <div className="group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300">
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
              </div>

              {/* 3. Calendar/checkmark icon — Availability — "Open for Freelance & Full-time" */}
              <div className="group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider mb-0.5">Availability</span>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      Open for Freelance & Full-time
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Social Icon Buttons Row (LinkedIn, X, Instagram) ── */}
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent flex items-center justify-center text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold font-serif">in</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent flex items-center justify-center text-white transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <span className="text-xs font-extrabold">X</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent flex items-center justify-center text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* ── Right Column: Form Card (Dark rounded panel) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                {/* 1. Your Name */}
                <div className="flex flex-col gap-2">
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
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* 2. Your Email */}
                <div className="flex flex-col gap-2">
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
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* 3. Subject */}
                <div className="flex flex-col gap-2">
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
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* 4. Message */}
                <div className="flex flex-col gap-2">
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
                    className="w-full bg-navy-900/60 border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none"
                  />
                </div>

                {/* Full-width Button: "Send Message" with Paper Plane icon */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-cream hover:bg-white text-navy-950 font-bold text-sm py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cream/20 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-navy-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : submitted ? (
                    'Message Sent! ✓'
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 text-navy-950" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c.01.56.49 1 1.39.91z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
