import { motion } from 'framer-motion'
import { MOTION_CONFIG } from '../config/motion'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{
        duration: MOTION_CONFIG.duration.pageReveal,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.1,
      }}
      className="fixed inset-0 z-[100] bg-navy-950 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Subtle cinematic accent line at the bottom edge of the wiping panel */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
    </motion.div>
  )
}
