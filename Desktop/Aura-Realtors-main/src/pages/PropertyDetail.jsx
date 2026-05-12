import { useState } from 'react'
import { motion } from 'framer-motion'
import { whatsappUrl } from '../data/siteConfig.js'

export default function PropertyDetail({ property: p, navigate, setChatOpen }) {
  const [img, setImg]     = useState(0)
  const [form, setForm]   = useState({ name:'', phone:'', email:'', message:'' })
  const [sent, setSent]   = useState(false)
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  if (!p) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <div className="text-5xl">🏘️</div>
      <p className="text-gray-600">Property not found.</p>
      <button className="btn-primary" onClick={() => navigate('listings')}>View All</button>
    </div>
  )

  const submit = e => { e.preventDefault(); setSent(true) }

  const listingColor = { Buy:'bg-green-100 text-green-800', Rent:'bg-blue-100 text-blue-800', Lease:'bg-amber-100 text-amber-800' }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* Breadcrumb */}
      <div className="bg-green-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm">
          <button onClick={() => navigate('home')} className="text-green-300 hover:text-white transition-colors">Home</button>
          <span className="text-green-600">/</span>
          <button onClick={() => navigate('listings')} className="text-green-300 hover:text-white transition-colors">Listings</button>
          <span className="text-green-600">/</span>
          <span className="text-white font-medium truncate">{p.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: images + details ── */}
          <div className="lg:col-span-2">

            {/* Gallery */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="mb-4 rounded-2xl overflow-hidden bg-gray-200 relative">
              <img src={p.images[img]} alt={p.title} className="w-full h-[360px] sm:h-[460px] object-cover"/>
              {p.featured && <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Featured</span>}
              <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full ${listingColor[p.listing]}`}>{p.listing}</span>
            </motion.div>

            {p.images.length > 1 && (
              <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
                {p.images.map((src,i) => (
                  <img key={i} src={src} alt="" onClick={() => setImg(i)}
                    className={`w-20 h-14 object-cover rounded-xl cursor-pointer shrink-0 transition-all ${img===i?'ring-2 ring-green-600':'opacity-60 hover:opacity-90'}`}/>
                ))}
              </div>
            )}

            {/* Title */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
              <div className="flex flex-wrap justify-between gap-4 mb-3">
                <h1 className="font-display font-bold text-gray-900 text-2xl sm:text-3xl">{p.title}</h1>
                <div className="font-display font-bold text-green-700 text-2xl sm:text-3xl">{p.priceLabel}</div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {p.location} &nbsp;·&nbsp; {p.type}
              </div>

              <div className="flex flex-wrap gap-6 py-4 border-y border-gray-100 mb-5">
                {[
                  p.bedrooms  > 0 && [p.bedrooms,  'Bedrooms'],
                  p.bathrooms > 0 && [p.bathrooms, 'Bathrooms'],
                  [p.size,    'Area'],
                  p.parking   > 0 && [p.parking,   'Parking'],
                  [p.listing, 'Listed'],
                ].filter(Boolean).map(([v,l]) => (
                  <div key={l} className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{v}</div>
                    <div className="text-gray-500 text-xs">{l}</div>
                  </div>
                ))}
              </div>

              <h2 className="font-display font-semibold text-gray-900 text-lg mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{p.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
              <h2 className="font-display font-semibold text-gray-900 text-lg mb-4">Property Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.features.map(feat => (
                  <div key={feat} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Agent */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">👤</div>
                <div>
                  <div className="font-semibold text-gray-900">{p.agent}</div>
                  <div className="text-gray-500 text-sm">Property Agent</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(i=><svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <a href={`tel:${p.agentPhone}`}
                  className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Agent
                </a>
                <a href={whatsappUrl(`Hi, I'm interested in: ${p.title}`)} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp Agent
                </a>
                <button onClick={() => setChatOpen(true)}
                  className="flex items-center justify-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-50 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
                  Ask AI About This
                </button>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Send Inquiry</h3>
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="font-semibold text-gray-900 mb-1">Inquiry Sent!</p>
                  <p className="text-gray-500 text-sm">We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-3">
                  {[['name','Your Name','text'],['phone','Phone Number','tel'],['email','Email Address','email']].map(([k,ph,t]) => (
                    <input key={k} type={t} placeholder={ph} required value={form[k]} onChange={e=>set(k,e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"/>
                  ))}
                  <textarea placeholder="Your message..." required value={form.message} onChange={e=>set('message',e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-green-500 transition-colors resize-none h-24"/>
                  <button type="submit"
                    className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
