import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import reel1 from '../assets/project-reel-1.jpg'
import reel2 from '../assets/project-reel-2.jpg'
import reel3 from '../assets/project-reel-3.jpg'
import reel4 from '../assets/project-reel-4.jpg'

import yt1 from '../assets/project-yt-1.jpg'
import yt2 from '../assets/project-yt-2.jpg'
import yt3 from '../assets/project-yt-3.jpg'
import yt4 from '../assets/project-yt-4.jpg'
import { MOTION_CONFIG } from '../config/motion'

gsap.registerPlugin(ScrollTrigger)

const reelsData = [
  {
    id: 1,
    title: 'Talking Head Retention Reel',
    creator: 'Creator Hub',
    image: reel1,
    tag: 'Shorts / Reels',
  },
  {
    id: 2,
    title: "That Clearly Wasn't Meant For You",
    creator: 'Philosophy & 3D Art',
    image: reel2,
    tag: 'Surreal VFX',
  },
  {
    id: 3,
    title: 'Vintage Story Montage',
    creator: 'Street Art & Culture',
    image: reel3,
    tag: 'Narrative Cut',
  },
  {
    id: 4,
    title: 'Podcast Viral Hook',
    creator: 'Pro Talks Show',
    image: reel4,
    tag: 'Podcast Clip',
  },
]

const youtubeProjects = [
  {
    id: 1,
    title: "You're Ruining Your Desk Setup Without Realizing It",
    channel: 'Well Spent Tech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnail: yt1,
    duration: '14:22',
    description:
      'Focuses on sharp before-and-after visual contrasts and clean, cinematic B-roll to instantly demonstrate the impact of lighting and ergonomic changes.',
  },
  {
    id: 2,
    title: "building our dream desk setup after being jealous of everyone else's",
    channel: 'Well Spent Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnail: yt2,
    duration: '18:45',
    description:
      'Utilizes engaging time-lapses and build montages, transitioning from a messy room teardown to a highly polished final reveal of the workspace.',
  },
  {
    id: 3,
    title: 'The 7 Levels of Desk Setup Addiction Nobody Talks About',
    channel: 'Well Spent Tech',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnail: yt3,
    duration: '12:08',
    description:
      'Structured tier-list dynamic pacing with fast-paced zooms, visual sound effects, and seamless motion graphics between each setup level.',
  },
  {
    id: 4,
    title: 'Do THIS and the Algorithm Will Actually Push Your Videos',
    channel: 'Stickman Matt',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnail: yt4,
    duration: '11:42',
    description:
      'High-velocity pattern interrupts, kinetic infographics, custom sound design, and retain-focused animation to maximize average view duration.',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)

  // GSAP ScrollTrigger Watermark Drift
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 18,
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: MOTION_CONFIG.ease.framerCinematic,
        delay: 0.1 + custom * 0.1,
      },
    }),
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy-950 py-20 sm:py-28 lg:py-32 select-none"
    >
      {/* ── Background subtle ambient glows ── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Section Header with "MY WORK" Watermark & "Featured Projects" ── */}
        <div className="relative flex items-center justify-center text-center mb-14 sm:mb-20 h-[100px] sm:h-[135px] lg:h-[150px]">
          {/* Giant Scaled Background Watermark "MY WORK" */}
          <span
            ref={watermarkRef}
            className="absolute inset-0 flex items-center justify-center font-[900] uppercase tracking-normal leading-none pointer-events-none select-none z-0 whitespace-nowrap overflow-hidden will-change-transform"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(4.2rem, 15vw, 160px)',
              color: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            MY WORK
          </span>

          {/* Foreground Title "Featured Projects" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: MOTION_CONFIG.ease.framerCinematic }}
            className="relative z-10 font-[900] tracking-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              lineHeight: 'clamp(36px, 4.5vw, 42px)',
            }}
          >
            <span style={{ color: 'rgb(247, 238, 221)' }}>Featured </span>
            <span style={{ color: '#1E4A8A' }}>Projects</span>
          </motion.h2>
        </div>

        {/* ── Top Section: 9:16 Vertical Video Reels Carousel / Row ── */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="text-xs uppercase tracking-widest text-white/50 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Short-Form &amp; Viral Reels
            </span>
            <span className="text-xs text-white/40 hidden sm:inline-block">9:16 Vertical Video Edits</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {reelsData.map((reel, idx) => (
              <motion.div
                key={reel.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={idx}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-[24px] overflow-hidden bg-[#081326]/90 border border-white/10 hover:border-accent/50 shadow-2xl transition-all duration-300 aspect-[9/16]"
              >
                {/* Reel Thumbnail Image */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1A] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Play Button Overlay on Center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg shadow-accent/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white/90 px-2.5 py-1 rounded-full">
                    {reel.tag}
                  </span>
                </div>

                {/* Bottom Title & Creator */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="block text-xs font-bold text-white leading-snug line-clamp-2 mb-0.5 group-hover:text-accent transition-colors">
                    {reel.title}
                  </span>
                  <span className="block text-[10px] text-white/50">{reel.creator}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Section: YouTube Long-Form Featured Videos (2-Column Grid) ── */}
        <div>
          <div className="flex items-center justify-between mb-8 px-1">
            <span className="text-xs uppercase tracking-widest text-white/50 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Long-Form YouTube Productions
            </span>
            <span className="text-xs text-white/40 hidden sm:inline-block">16:9 High Retention Cuts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {youtubeProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group flex flex-col justify-between bg-[#081326]/90 hover:bg-[#0b1a33]/95 border border-white/10 hover:border-accent/40 backdrop-blur-xl rounded-[28px] overflow-hidden p-5 sm:p-6 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
              >
                {/* 16:9 Video Thumbnail Player Frame */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-navy-950 border border-white/10 group-hover:border-accent/30 transition-colors">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient overlay for controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                  {/* Top Bar: Channel Profile & Title */}
                  <div className="absolute top-3 left-3 right-3 flex items-center gap-3">
                    <img
                      src={project.avatar}
                      alt={project.channel}
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md object-cover"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-bold text-white truncate drop-shadow-md">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-white/70 font-medium">
                        {project.channel}
                      </span>
                    </div>
                  </div>

                  {/* Center YouTube Red Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-2xl bg-[#FF0000] group-hover:bg-[#FF0000] flex items-center justify-center text-white shadow-2xl shadow-red-900/60 transform group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <svg className="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-3">
                      {/* Share icon */}
                      <button aria-label="Share" className="p-1 hover:text-accent transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                      </button>
                      {/* Watch later clock icon */}
                      <button aria-label="Watch later" className="p-1 hover:text-accent transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* "Watch on YouTube" Pill */}
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-semibold text-white/90 group-hover:border-accent/40 transition-colors">
                      <span>Watch on</span>
                      <svg className="w-3.5 h-3.5 fill-red-500" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="font-bold">YouTube</span>
                    </div>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="pt-5 pb-1">
                  <h3 className="font-bold text-white text-base sm:text-lg lg:text-[20px] leading-snug mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/65 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
