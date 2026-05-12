import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig.js'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

const BLANK = {
  ownerName: '', phone: '', whatsapp: '',
  type: 'Apartment', listing: 'Buy', price: '',
  location: 'Colombo 1', bedrooms: '0', bathrooms: '0',
  size: '', description: '',
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white'
const selectCls = inputCls + ' appearance-none cursor-pointer'
const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5'

export default function ListPropertyPage({ navigate }) {
  const [form, setForm] = useState(BLANK)
  const [done, setDone] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = e => {
    e.preventDefault()
    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-card p-12 max-w-md w-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </motion.div>
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Listing Submitted!</h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          Your property has been submitted for review. Our team will contact you within 24 hours to confirm the listing.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('home')} className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Back to Home
          </button>
          <button onClick={() => { setDone(false); setForm(BLANK) }} className="border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-colors">
            List Another
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* Header */}
      <div className="bg-green-900 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Property Owners</p>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl mb-3">List Your Property</h1>
          <p className="text-green-300">Fill in the details below. We'll review and get back to you within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <motion.form onSubmit={submit} initial="hidden" animate="show" variants={stagger}
          className="flex flex-col gap-6">

          {/* ── Owner info ── */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-display font-semibold text-gray-900 text-lg mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Owner Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} placeholder="Your full name" required value={form.ownerName} onChange={e => set('ownerName', e.target.value)}/>
              </div>
              <div>
                <label className={labelCls}>Phone Number *</label>
                <input className={inputCls} type="tel" placeholder="+94 77 000 0000" required value={form.phone} onChange={e => set('phone', e.target.value)}/>
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number</label>
                <input className={inputCls} type="tel" placeholder="+94 77 000 0000" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}/>
              </div>
            </div>
          </motion.div>

          {/* ── Property details ── */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-display font-semibold text-gray-900 text-lg mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Property Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Property Title *</label>
                <input className={inputCls} placeholder="e.g. Modern 3BR Apartment in Colombo 3" required value={form.title || ''} onChange={e => set('title', e.target.value)}/>
              </div>
              <div>
                <label className={labelCls}>Property Type *</label>
                <select className={selectCls} value={form.type} onChange={e => set('type', e.target.value)}>
                  {['Apartment','House','Land','Commercial','Villa'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Listing Type *</label>
                <select className={selectCls} value={form.listing} onChange={e => set('listing', e.target.value)}>
                  {['Buy','Rent','Lease'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Location *</label>
                <select className={selectCls} value={form.location} onChange={e => set('location', e.target.value)}>
                  {siteConfig.serviceAreas.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Asking Price (LKR) *</label>
                <input className={inputCls} type="number" min="0" placeholder="e.g. 25000000" required value={form.price} onChange={e => set('price', e.target.value)}/>
              </div>
              <div>
                <label className={labelCls}>Bedrooms</label>
                <select className={selectCls} value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)}>
                  {['0','1','2','3','4','5','6+'].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Bathrooms</label>
                <select className={selectCls} value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)}>
                  {['0','1','2','3','4','5+'].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Floor / Land Size</label>
                <input className={inputCls} placeholder="e.g. 1,200 sq ft  or  15 perches" value={form.size} onChange={e => set('size', e.target.value)}/>
              </div>
            </div>
            <div className="mt-4">
              <label className={labelCls}>Description *</label>
              <textarea className={inputCls + ' resize-none'} style={{ minHeight: 120 }}
                placeholder="Describe the property — features, condition, nearby landmarks, any extras..."
                required value={form.description} onChange={e => set('description', e.target.value)}/>
            </div>
          </motion.div>

          {/* ── Image upload ── */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-display font-semibold text-gray-900 text-lg mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Property Images
            </h2>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false) }}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
                dragOver ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'
              }`}
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p className="font-semibold text-gray-700 mb-1">Drag & drop images here</p>
              <p className="text-gray-400 text-sm mb-4">or click to browse</p>
              <label className="inline-block bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-colors">
                Choose Files
                <input type="file" multiple accept="image/*" className="hidden"/>
              </label>
              <p className="text-gray-400 text-xs mt-3">JPG, PNG up to 10MB each · max 10 images</p>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            <button type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-base py-4 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              Submit Listing for Review
            </button>
            <p className="text-center text-gray-400 text-sm mt-3">Our team will review and contact you within 24 hours</p>
          </motion.div>

        </motion.form>
      </div>
    </div>
  )
}
