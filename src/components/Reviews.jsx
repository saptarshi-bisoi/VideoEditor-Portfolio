import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviewsData = [
  {
    id: 1,
    name: 'Saptarshi bisoi',
    rating: 5,
    avatarBg: 'from-blue-600 to-indigo-700',
    avatarText: 'SB',
    review:
      'Working with him was a great experience. His editing skills are excellent, and the motion graphics really made the videos stand out. He has a strong sense of pacing, clean transitions, and knows how to make content engaging without overdoing the effects. The final result looked polished and professional.',
  },
  {
    id: 2,
    name: 'Khushi Mandal',
    rating: 5,
    avatarBg: 'from-purple-600 to-pink-600',
    avatarText: 'KM',
    review:
      'One thing I really appreciated was his professionalism and punctuality. He always delivered the work on time and kept me updated throughout the project. Even with revisions, he was quick to respond and made the changes without unnecessary delays. Very reliable to work with.',
  },
  {
    id: 3,
    name: 'Suvodip Midya',
    rating: 5,
    avatarBg: 'from-emerald-600 to-teal-700',
    avatarText: 'SM',
    review:
      'Communication was smooth from start to finish. He understood the requirements clearly, asked the right questions whenever needed, and was easy to work with. He was polite, responsive, and always open to feedback, which made the entire editing process simple and stress-free.',
  },
  {
    id: 4,
    name: 'bot01',
    rating: 5,
    avatarBg: 'from-cyan-600 to-blue-700',
    avatarText: 'B1',
    review:
      'Turnaround time was exceptional and the attention to detail with audio mastering, sound design, and color grading surpassed all expectations. Every cut synced seamlessly with high-energy pacing. Truly exceptional work.',
  },
  {
    id: 5,
    name: 'bot02',
    rating: 5,
    avatarBg: 'from-amber-600 to-rose-700',
    avatarText: 'B2',
    review:
      'Superb retention hooks, dynamic motion graphics, and punchy sound design. Our short-form retention metrics jumped by over 40% immediately after integrating these edits. Highly recommended for top tier content.',
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1150) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const maxIndex = Math.max(0, reviewsData.length - itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + itemsPerPage)
  if (visibleReviews.length < itemsPerPage) {
    visibleReviews.push(...reviewsData.slice(0, itemsPerPage - visibleReviews.length))
  }

  return (
    <section
      id="reviews"
      className="relative w-full bg-navy-950 py-20 sm:py-24 lg:py-28 overflow-hidden select-none"
    >
      {/* ── Soft ambient radial glow (Background lines completely removed) ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(59, 130, 246, 0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Section Header with Scaled Watermark & Centered Title ── */}
        <div className="relative flex items-center justify-center text-center mb-12 sm:mb-14 h-[110px] sm:h-[135px] lg:h-[150px]">
          {/* Giant Scaled Background Watermark "SOCIAL PROOF" */}
          <span
            className="absolute inset-0 flex items-center justify-center font-[900] uppercase tracking-normal leading-none pointer-events-none select-none z-0 whitespace-nowrap"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(4.8rem, 14vw, 150px)',
              color: 'rgba(255, 255, 255, 0.055)',
            }}
          >
            SOCIAL PROOF
          </span>

          {/* Foreground Title "Client Stories" */}
          <h2
            className="relative z-10 font-[900] tracking-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(34px, 4.5vw, 46px)',
              lineHeight: '40px',
            }}
          >
            <span style={{ color: 'rgb(247, 238, 221)' }}>Client </span>
            <span
              style={{
                color: '#1E4A8A',
              }}
            >
              Stories
            </span>
          </h2>
        </div>

        {/* ── 3-Column Reviews Cards Carousel ── */}
        <div className="relative min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {visibleReviews.map((item) => (
                <div
                  key={`${item.id}-${currentIndex}`}
                  className="flex flex-col justify-between bg-[#081326]/90 hover:bg-[#0b1a33]/95 border border-white/[0.08] hover:border-accent/40 backdrop-blur-xl rounded-[26px] p-7 sm:p-8 transition-all duration-300 shadow-2xl hover:-translate-y-1 h-full"
                >
                  {/* Top: 5 Stars + Review Quote */}
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1.5 mb-5 text-[#EAB308]">
                      {[...Array(item.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current drop-shadow-[0_0_6px_rgba(234,179,8,0.45)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Quote text */}
                    <p
                      className="font-[400] text-[13px] leading-[21px]"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: 'rgba(247, 238, 221, 0.9)',
                      }}
                    >
                      “{item.review}”
                    </p>
                  </div>

                  {/* Bottom: Client Profile Avatar + Name (clean without dividing line) */}
                  <div className="flex items-center gap-3.5 pt-6 mt-6">
                    {/* Circle Avatar Badge */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} border border-white/20 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-md flex-shrink-0`}
                    >
                      {item.avatarText}
                    </div>

                    {/* Reviewer Name */}
                    <span
                      className="font-[700] text-[16px] leading-[24px] tracking-tight"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: 'rgb(247, 238, 221)',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation Arrows Controls (Clean < > buttons matching reference) ── */}
        <div className="flex items-center justify-center gap-3.5 mt-10 sm:mt-12">
          <button
            onClick={handlePrev}
            aria-label="Previous reviews"
            className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-accent/50 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next reviews"
            className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-accent/50 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
