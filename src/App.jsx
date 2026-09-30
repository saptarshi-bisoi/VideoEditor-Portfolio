import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import ServicesOffer from './components/ServicesOffer'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <>
      <PageLoader />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ServicesOffer />
      <Reviews />
      <Contact />
      <ScrollToTop />
    </>
  )
}

export default App
