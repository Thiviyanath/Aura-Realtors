import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig, whatsappUrl } from '../data/siteConfig.js'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* Header */}
      <div className="bg-green-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Get in touch</p>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl">Contact Us</h1>
          <p className="text-green-300 mt-2">We'd love to hear from you. Our team is ready to help.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: info ── */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-2 flex flex-col gap-5">

            {/* Info cards */}
            {[
              { icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', label: 'Office Address', value: siteConfig.address, color: 'bg-green-100 text-green-700' },
              { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z', label: 'Phone', value: siteConfig.phone, color: 'bg-blue-100 text-blue-700', href: `tel:${siteConfig.phone}` },
              { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', label: 'Email', value: siteConfig.email, color: 'bg-purple-100 text-purple-700', href: `mailto:${siteConfig.email}` },
              { icon: 'M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83', label: 'Working Hours', value: 'Mon–Fri 8 AM–6 PM · Sat 9 AM–4 PM\nAI assistant 24/7', color: 'bg-amber-100 text-amber-700' },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp}>
                {c.href ? (
                  <a href={c.href} className="bg-white rounded-2xl shadow-card p-5 flex gap-4 items-start hover:shadow-card-hover transition-shadow block">
                    <ContactIcon d={c.icon} color={c.color}/>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{c.label}</p>
                      <p className="text-gray-800 text-sm font-medium whitespace-pre-line">{c.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="bg-white rounded-2xl shadow-card p-5 flex gap-4 items-start">
                    <ContactIcon d={c.icon} color={c.color}/>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{c.label}</p>
                      <p className="text-gray-800 text-sm font-medium whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a variants={fadeUp} href={whatsappUrl()} target="_blank" rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-2xl p-5 flex items-center gap-4 transition-colors group">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <div>
                <p className="font-bold text-white">Chat on WhatsApp</p>
                <p className="text-green-100 text-sm">Instant reply during working hours</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="ml-auto group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>

            {/* Map */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-card overflow-hidden">
              {siteConfig.mapEmbedUrl ? (
                <iframe src={siteConfig.mapEmbedUrl} width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office location"/>
              ) : (
                <div className="h-52 bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center gap-3">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="1.5" strokeLinecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div className="text-center">
                    <p className="font-semibold text-green-800 text-sm">{siteConfig.address}</p>
                    <p className="text-green-600 text-xs mt-1">Add your Google Maps embed URL in siteConfig.js</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-7">Fill out the form and we'll get back to you within 24 hours.</p>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a7a32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 leading-relaxed mb-7">Thank you for reaching out.<br/>We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name:'',phone:'',email:'',subject:'',message:'' }) }}
                    className="border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold px-6 py-2.5 rounded-xl transition-colors">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input className={inputCls} placeholder="Your name" required value={form.name} onChange={e => set('name', e.target.value)}/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input className={inputCls} type="tel" placeholder="+94 77 000 0000" required value={form.phone} onChange={e => set('phone', e.target.value)}/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input className={inputCls} type="email" placeholder="you@example.com" required value={form.email} onChange={e => set('email', e.target.value)}/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                    <select className={inputCls + ' appearance-none cursor-pointer'} value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option value="">Select a subject...</option>
                      {['General Inquiry','Buying a Property','Renting a Property','Leasing a Property','Selling / Listing Property','Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea className={inputCls + ' resize-none'} style={{ minHeight: 140 }}
                      placeholder="Tell us how we can help you..."
                      required value={form.message} onChange={e => set('message', e.target.value)}/>
                  </div>
                  <button type="submit"
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-2 text-base">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function ContactIcon({ d, color }) {
  return (
    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center shrink-0`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {d.split(' M ').map((seg, i) => <path key={i} d={i === 0 ? seg : 'M ' + seg}/>)}
      </svg>
    </div>
  )
}
