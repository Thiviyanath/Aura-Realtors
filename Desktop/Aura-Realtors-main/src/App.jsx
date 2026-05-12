import { useState, useEffect } from 'react'
import Navbar      from './components/Navbar.jsx'
import Footer      from './components/Footer.jsx'
import ChatWidget  from './components/ChatWidget.jsx'
import WAButton    from './components/WAButton.jsx'
import HomePage        from './pages/HomePage.jsx'
import ListingsPage    from './pages/ListingsPage.jsx'
import PropertyDetail  from './pages/PropertyDetail.jsx'
import ListPropertyPage from './pages/ListPropertyPage.jsx'
import ContactPage     from './pages/ContactPage.jsx'

export default function App() {
  const [page,          setPage]          = useState('home')
  const [activeProp,    setActiveProp]    = useState(null)
  const [listingFilter, setListingFilter] = useState('All')
  const [chatOpen,      setChatOpen]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)

  // Auto-open chat after 5 PM
  useEffect(() => {
    const h = new Date().getHours()
    if (h >= 17 || h < 9) {
      const t = setTimeout(() => setChatOpen(true), 3500)
      return () => clearTimeout(t)
    }
  }, [])

  const navigate = (p, data = null) => {
    setPage(p)
    if (data) setActiveProp(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
  }

  const noFooterPages = []

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        page={page}
        navigate={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setListingFilter={setListingFilter}
      />

      <main className="flex-1">
        {page === 'home'     && <HomePage     navigate={navigate} setListingFilter={setListingFilter} />}
        {page === 'listings' && <ListingsPage navigate={navigate} listingFilter={listingFilter} />}
        {page === 'property' && <PropertyDetail property={activeProp} navigate={navigate} setChatOpen={setChatOpen} />}
        {page === 'list'     && <ListPropertyPage navigate={navigate} />}
        {page === 'contact'  && <ContactPage />}
      </main>

      {!noFooterPages.includes(page) && <Footer navigate={navigate} />}

      {/* Floating buttons */}
      <WAButton />
      <button
        onClick={() => setChatOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-float flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Open AI chat"
      >
        {chatOpen
          ? <XIcon />
          : <BotIcon />
        }
      </button>

      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} navigate={navigate} />}
    </div>
  )
}

const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="10" x="3" y="11" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
)
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
)
