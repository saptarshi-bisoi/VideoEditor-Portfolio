<div align="center">

# 🎬 SOUVIK'S VIDEO EDITING PORTFOLIO

<p align="center">
  <strong>A modern, cinematic, and high-performance portfolio website built for a professional Video Editor & Motion Designer.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.18-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
</p>

---

[✨ Live Demo](#-live-demo) • [🚀 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start) • [📁 Project Structure](#-project-structure)

---

</div>

## 🌟 Overview

This portfolio website is crafted to showcase premium video editing, visual effects, and motion design work. Designed with a **deep navy glassmorphism aesthetic**, silky-smooth **Framer Motion animations**, and a typography-driven layout tailored for high-conversion client acquisition.

---

## 🚀 Features

### 🎞️ 1. Cinematic Hero Section
- **Visual Hook:** Striking headline typography with custom dark-contrast accents.
- **Dynamic Action:** Direct CTAs for project bookings and video reel previews.
- **Floating Status Badge:** Live availability indicator ("Available for Freelance & Full-time").

### 👤 2. Storytelling About Section
- Creative backstory, editing philosophy, and key retention metrics.
- Highlighting core software mastery: **Adobe Premiere Pro**, **After Effects**, **DaVinci Resolve**, and **Blender**.

### ⚡ 3. Interactive Services Showcase
- **Interactive Card Spread:** Hover-reactive service deck showcasing 5 specialized domains:
  - 🎥 **YouTube Long-Form Editing** (Pacing, Retention & B-Roll)
  - 📱 **Short-Form Content** (Reels, Shorts & TikToks)
  - 🎙️ **Podcast Production** (Clean Multi-Cam & Audio Mastering)
  - 📺 **Commercial & Brand Ads** (High-Converting Campaigns)
  - ✨ **Motion Graphics & VFX** (Kinetic Type & Screen Replacements)

### ⭐ 4. Social Proof & Client Stories
- **Responsive Review Carousel:** Smooth slide navigation with `<` and `>` arrow controls.
- **5-Star Rating Displays:** Vivid golden rating badges with custom client testimonials.
- **Typography Matched:** Custom `Poppins` font hierarchy, high-impact background watermarks, and zero-distraction layout.

### 📬 5. Glassmorphic Contact Hub
- Direct messaging interface with validation states and submit animations.
- Quick direct links to Email, LinkedIn, X, and Instagram.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Component-based UI library |
| **Build Tool** | [Vite 6](https://vitejs.dev/) | Next-generation fast frontend tooling |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS framework |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://greensock.com/) | Smooth micro-interactions & spring physics |
| **Typography** | [Poppins](https://fonts.google.com/specimen/Poppins) | Modern, clean geometric sans-serif |
| **Icons** | Custom SVGs | Crisp, scalable inline vector graphics |

---

## 📁 Project Structure

```bash
VideoEditor-Portfolio/
├── public/                # Public static assets & favicon
├── src/
│   ├── assets/            # Video previews, software badges, and portraits
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar with scroll-spy & mobile drawer
│   │   ├── Hero.jsx           # Hero headline, action CTAs, and video showcase
│   │   ├── About.jsx          # Experience story, statistics & software stack
│   │   ├── ServicesOffer.jsx  # Interactive fanning services card deck
│   │   ├── Reviews.jsx        # Client stories carousel & 5-star testimonials
│   │   ├── Contact.jsx        # Glassmorphism contact form & social links
│   │   └── ScrollToTop.jsx    # Quick floating back-to-top button
│   ├── App.jsx            # Main application layout assembly
│   ├── index.css          # Global styles, ambient glows & design tokens
│   └── main.jsx           # Application entry point
├── package.json           # Scripts and dependencies
├── tailwind.config.js     # Custom theme colors, spacing & typography
└── vite.config.js         # Vite configuration
```

---

## ⚡ Quick Start

Follow these steps to run the portfolio locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/saptarshi-bisoi/VideoEditor-Portfolio.git
cd VideoEditor-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
> Open [http://localhost:5173](http://localhost:5173) in your browser to see the live site.

### 4. Build for production
```bash
npm run build
```

---

## 🎨 Customization Guide

- **Change Theme Colors:** Modify `tailwind.config.js` under `theme.extend.colors.navy` and `theme.extend.colors.accent`.
- **Update Testimonials:** Edit the `reviewsData` array in [`src/components/Reviews.jsx`](src/components/Reviews.jsx).
- **Update Contact Info:** Update form recipient email or social endpoints in [`src/components/Contact.jsx`](src/components/Contact.jsx).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and customize it for your personal portfolio.

<div align="center">
  <sub>Built with ❤️ and passion for cinematic storytelling.</sub>
</div>