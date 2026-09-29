import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOTION_CONFIG } from '../config/motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3, transition: { duration: MOTION_CONFIG.duration.microFast } }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/25 hover:bg-accent/90 transition-colors duration-300 cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 text-white transform group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
