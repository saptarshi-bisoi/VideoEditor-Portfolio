import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const handleScroll = () => {
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-navy-950/80 backdrop-blur-xl border-b border-white/5">
      {/* Decorative ribbon in top-left corner */}
      <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden">
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

          {/* Phone pill */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 hover:bg-white/10 transition-colors duration-300"
          >
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-normal text-xs">+91 XXXXX XXXXX</span>
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
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-6 py-2 bg-cream text-navy-950 font-bold text-xs rounded-full hover:bg-white hover:shadow-lg hover:shadow-cream/20 transition-all duration-300"
          >
            Hire Me
          </a>

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
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 px-4 py-3 text-sm text-white/80"
              >
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 XXXXX XXXXX
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
    </nav>
  )
}
