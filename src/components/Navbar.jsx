import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOTION_CONFIG } from '../config/motion'

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Background blur/opacity shift after 40px
      setScrolled(window.scrollY > 40)

      const sectionIds = ['about', 'projects', 'services', 'reviews', 'contact']
      const scrollPosition = window.scrollY + 250 // threshold for navbar height

      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: MOTION_CONFIG.duration.sectionReveal,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.2,
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-navy-950/92 backdrop-blur-2xl border-white/10 shadow-xl'
          : 'bg-navy-950/70 backdrop-blur-md border-white/5'
      }`}
    >
      {/* Decorative ribbon in top-left corner */}
      <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent/80" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Left: Wordmark + Phone */}
        <div className="flex items-center gap-4">
          {/* Wordmark */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-white font-extrabold text-sm lg:text-base tracking-tight">
              Souvik's Portfolio
            </span>
            {/* Two-dot flourish */}
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            </span>
          </a>

          {/* Phone / WhatsApp pill */}
          <a
            href="https://wa.me/918159042006?text=Hello%20Souvik%21%20%F0%9F%91%8B%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20your%20video%20editing%20services.%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:border-[#25D366]/40 hover:text-[#25D366] transition-colors duration-300"
          >
            <svg
              className="w-3.5 h-3.5 text-[#25D366]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.101-.475-.15-.675.15-.2.301-.776.98-.952 1.18-.175.201-.35.226-.651.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.35.452-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.493-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.11.15.2 2.12 3.238 5.136 4.541.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.118.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351zM12.012 2.002C6.49 2.002 2.01 6.48 2.01 12.003c0 1.996.586 3.864 1.602 5.438L2.001 22l4.708-1.545a9.96 9.96 0 005.303 1.548c5.522 0 10.002-4.478 10.002-10c0-5.523-4.48-10.001-10.002-10.001zm0 18.238c-1.64 0-3.176-.49-4.469-1.332l-.32-.209-2.791.916.936-2.721-.229-.338a8.214 8.214 0 01-1.358-4.551c0-4.55 3.702-8.252 8.231-8.252 4.53 0 8.232 3.702 8.232 8.252 0 4.55-3.702 8.245-8.231 8.245z"/>
            </svg>
            <span className="font-normal text-xs">+91 81590 42006</span>
          </a>
        </div>

        {/* Center-right: Nav Links (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Far right: Hire Me button + mobile menu toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: MOTION_CONFIG.duration.microFast, ease: 'easeOut' }}
            className="hidden sm:inline-flex items-center px-6 py-2 bg-cream text-navy-950 font-bold text-xs rounded-full hover:bg-white hover:shadow-lg hover:shadow-cream/20 transition-all duration-300"
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-white bg-white/5'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="https://wa.me/918159042006?text=Hello%20Souvik%21%20%F0%9F%91%8B%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20your%20video%20editing%20services.%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm text-white/80 hover:text-[#25D366] transition-colors"
              >
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.101-.475-.15-.675.15-.2.301-.776.98-.952 1.18-.175.201-.35.226-.651.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.35.452-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.493-.508-.676-.517l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.11.15.2 2.12 3.238 5.136 4.541.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.118.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351zM12.012 2.002C6.49 2.002 2.01 6.48 2.01 12.003c0 1.996.586 3.864 1.602 5.438L2.001 22l4.708-1.545a9.96 9.96 0 005.303 1.548c5.522 0 10.002-4.478 10.002-10c0-5.523-4.48-10.001-10.002-10.001zm0 18.238c-1.64 0-3.176-.49-4.469-1.332l-.32-.209-2.791.916.936-2.721-.229-.338a8.214 8.214 0 01-1.358-4.551c0-4.55 3.702-8.252 8.231-8.252 4.53 0 8.232 3.702 8.232 8.252 0 4.55-3.702 8.245-8.231 8.245z"/>
                </svg>
                +91 81590 42006
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-6 py-2.5 bg-cream text-navy-950 font-bold text-sm rounded-full"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
