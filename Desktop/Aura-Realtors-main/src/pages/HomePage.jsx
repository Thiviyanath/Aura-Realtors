import { useState } from 'react'
import { motion } from 'framer-motion'
import PropertyCard from '../components/PropertyCard.jsx'
import { getFeatured, getApproved } from '../data/properties.js'
import { siteConfig, whatsappUrl } from '../data/siteConfig.js'

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function HomePage({ navigate, setListingFilter }) {
  const [keyword, setKeyword] = useState('')
  const [tab, setTab]         = useState('Buy')
  const featured = getFeatured()
  const latest   = getApproved().slice(-3).reverse()

  const handleSearch = () => { setListingFilter(tab); navigate('listings') }

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80" alt="Colombo skyline"
            className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/75 to-green-900/40"/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-green-300 font-medium text-sm tracking-widest uppercase mb-4">
              Western Sri Lanka's Premier Real Estate
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
              Find Your<br/>
              <span className="text-green-300">Dream Property</span><br/>
              in Colombo
            </motion.h1>
            <motion.p variants={fadeUp} className="text-green-100 text-lg mb-10 leading-relaxed">
              Premium listings across {siteConfig.serviceArea}.<br/>
              Buy, Rent, Lease or Sell with confidence.
            </motion.p>

            {/* Search card */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 shadow-float max-w-xl">
              <div className="flex gap-2 mb-4">
                {['Buy','Rent','Lease'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      tab === t ? 'bg-green-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>{t}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={keyword} onChange={e => setKeyword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Location, area, keyword..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"/>
                <button onClick={handleSearch}
                  className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Search
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8 mt-10">
              {[['200+','Listings'],['150+','Clients'],['10+','Years']].map(([n,l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-green-300 font-display">{n}</div>
                  <div className="text-green-100 text-sm">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      </section>

      {/* ── LISTING TYPE BUTTONS ─────────────────────────── */}
      <section className="bg-green-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label:'Buy',   icon:'🏠', sub:'Find your home',    fn:()=>{setListingFilter('Buy');  navigate('listings')} },
              { label:'Rent',  icon:'🔑', sub:'Monthly rentals',    fn:()=>{setListingFilter('Rent'); navigate('listings')} },
              { label:'Lease', icon:'📋', sub:'Long-term lease',    fn:()=>{setListingFilter('Lease');navigate('listings')} },
              { label:'Sell',  icon:'💰', sub:'List & sell fast',   fn:()=> navigate('list') },
            ].map(({ label,icon,sub,fn }) => (
              <motion.button key={label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={fn} className="bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl p-4 text-white text-left transition-colors">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-bold text-base font-display">{label}</div>
                <div className="text-green-100 text-xs">{sub}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <motion.div variants={fadeUp}>
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Handpicked for you</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900">Featured Properties</h2>
            </motion.div>
            <motion.button variants={fadeUp} onClick={() => navigate('listings')}
              className="text-green-700 font-semibold text-sm hover:text-green-800 flex items-center gap-1 transition-colors">
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.button>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <motion.div key={p.id} variants={fadeUp}>
                <PropertyCard property={p} onClick={() => navigate('property', p)}/>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / SERVICE AREA ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6">
                Colombo's Most Trusted<br/>Property Marketplace
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {siteConfig.description} With over a decade of experience, we connect serious buyers, sellers, and tenants with Sri Lanka's finest properties.
              </p>
              <div className="flex items-start gap-3 mb-4 text-gray-600 text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {siteConfig.address}
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {siteConfig.serviceAreas.map(a => (
                  <span key={a} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">{a}</span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate('listings')} className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Browse Properties
                </button>
                <button onClick={() => navigate('contact')} className="border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-colors">
                  Contact Us
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
              className="relative">
              <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80" alt="Colombo"
                className="w-full rounded-2xl shadow-card-hover object-cover h-96"/>
              <div className="absolute -bottom-5 -left-5 bg-green-700 text-white rounded-2xl p-5 shadow-float">
                <div className="font-display font-bold text-2xl">10+</div>
                <div className="text-green-200 text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LATEST LISTINGS ──────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}
            className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <motion.div variants={fadeUp}>
              <p className="text-green-700 text-sm font-semibold uppercase tracking-widest mb-2">Fresh on market</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900">Latest Listings</h2>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map(p => (
              <motion.div key={p.id} variants={fadeUp}>
                <PropertyCard property={p} onClick={() => navigate('property', p)}/>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNERS ──────────────────────────────────── */}
      <section className="py-16 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* List Property */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col gap-4">
              <div className="text-3xl">🏡</div>
              <h3 className="font-display font-bold text-white text-2xl">Own a Property?</h3>
              <p className="text-green-200 leading-relaxed">List it with us and reach thousands of genuine buyers and tenants across Colombo.</p>
              <button onClick={() => navigate('list')}
                className="self-start bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
                List Your Property →
              </button>
            </motion.div>

            {/* Find Property */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.1 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col gap-4">
              <div className="text-3xl">🔍</div>
              <h3 className="font-display font-bold text-white text-2xl">Looking to Move?</h3>
              <p className="text-green-200 leading-relaxed">Explore premium properties for sale, rent and lease across Colombo 01–10.</p>
              <button onClick={() => navigate('listings')}
                className="self-start bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Find Property →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
