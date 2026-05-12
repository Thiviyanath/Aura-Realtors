import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../data/siteConfig.js'

const links = [
  { label: 'Home',          page: 'home' },
  { label: 'Buy',           page: 'listings', filter: 'Buy' },
  { label: 'Rent',          page: 'listings', filter: 'Rent' },
  { label: 'Lease',         page: 'listings', filter: 'Lease' },
  { label: 'Contact',       page: 'contact' },
]

export default function Navbar({ page, navigate, mobileOpen, setMobileOpen, setListingFilter }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (link) => {
    if (link.filter) setListingFilter(link.filter)
    navigate(link.page)
  }

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center group-hover:bg-green-800 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-gray-900 text-sm leading-tight">{siteConfig.companyShort}</div>
              <div className="text-[10px] text-green-700 font-medium tracking-wide uppercase leading-none">Properties</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button key={l.label} onClick={() => go(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === l.page ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                }`}>
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('list')}
              className="hidden sm:flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              List Property
            </button>
            <button onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <button key={l.label} onClick={() => go(l)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                  {l.label}
                </button>
              ))}
              <button onClick={() => navigate('list')}
                className="mt-2 flex items-center justify-center gap-1.5 bg-green-700 text-white text-sm font-semibold px-4 py-3 rounded-lg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                List Property
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
