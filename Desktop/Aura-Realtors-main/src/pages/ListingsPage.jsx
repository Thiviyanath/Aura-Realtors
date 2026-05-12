import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropertyCard from '../components/PropertyCard.jsx'
import { getApproved } from '../data/properties.js'
import { siteConfig } from '../data/siteConfig.js'

const fadeUp = { hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }

export default function ListingsPage({ navigate, listingFilter }) {
  const all = getApproved()
  const [f, setF] = useState({
    listing:  listingFilter || 'All',
    location: 'All',
    type:     'All',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    keyword:  '',
  })
  const [view, setView] = useState('grid')
  const upd = (k,v) => setF(p => ({ ...p, [k]:v }))

  useEffect(() => { if (listingFilter) upd('listing', listingFilter) }, [listingFilter])

  const filtered = all.filter(p => {
    if (f.listing  !== 'All' && p.listing  !== f.listing)  return false
    if (f.location !== 'All' && p.location !== f.location) return false
    if (f.type     !== 'All' && p.type     !== f.type)     return false
    if (f.minPrice && p.price < Number(f.minPrice))         return false
    if (f.maxPrice && p.price > Number(f.maxPrice))         return false
    if (f.bedrooms !== 'Any' && p.bedrooms < Number(f.bedrooms)) return false
    if (f.keyword) {
      const kw = f.keyword.toLowerCase()
      if (!p.title.toLowerCase().includes(kw) && !p.location.toLowerCase().includes(kw) && !p.type.toLowerCase().includes(kw))
        return false
    }
    return true
  })

  const selClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-500 bg-white appearance-none cursor-pointer"
  const inpClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-500 bg-white"
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-green-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">
            {siteConfig.serviceArea}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} className="font-display font-bold text-white text-3xl sm:text-4xl">
            Property Listings
          </motion.h1>
          <p className="text-green-300 mt-2 text-sm">{filtered.length} propert{filtered.length===1?'y':'ies'} found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Filter sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-gray-900">Filters</h3>
                <button onClick={() => setF({ listing:'All',location:'All',type:'All',minPrice:'',maxPrice:'',bedrooms:'Any',keyword:'' })}
                  className="text-xs text-green-700 font-semibold hover:text-green-800">Clear all</button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Listing type */}
                <div>
                  <label className={labelClass}>Listing Type</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {['All','Buy','Rent','Lease'].map(t => (
                      <button key={t} onClick={() => upd('listing', t)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                          f.listing === t ? 'bg-green-700 text-white border-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <select className={selClass} value={f.location} onChange={e => upd('location',e.target.value)}>
                    <option>All</option>
                    {siteConfig.serviceAreas.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Property Type</label>
                  <select className={selClass} value={f.type} onChange={e => upd('type',e.target.value)}>
                    {['All','Apartment','House','Land','Commercial'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Min Price (LKR)</label>
                  <input className={inpClass} type="number" placeholder="0" value={f.minPrice} onChange={e => upd('minPrice',e.target.value)}/>
                </div>

                <div>
                  <label className={labelClass}>Max Price (LKR)</label>
                  <input className={inpClass} type="number" placeholder="Any" value={f.maxPrice} onChange={e => upd('maxPrice',e.target.value)}/>
                </div>

                <div>
                  <label className={labelClass}>Min Bedrooms</label>
                  <select className={selClass} value={f.bedrooms} onChange={e => upd('bedrooms',e.target.value)}>
                    {['Any','1','2','3','4','5'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Keyword</label>
                  <input className={inpClass} placeholder="Search..." value={f.keyword} onChange={e => upd('keyword',e.target.value)}/>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Results ── */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-gray-600 text-sm font-medium">{filtered.length} result{filtered.length!==1?'s':''}</p>
              <div className="flex items-center gap-2">
                {[['grid','M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z'],['list','M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01']].map(([m,d]) => (
                  <button key={m} onClick={() => setView(m)}
                    className={`p-2 rounded-lg border transition-all ${view===m?'bg-green-700 border-green-700 text-white':'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d={d}/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-semibold text-gray-900 text-xl mb-2">No properties found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <motion.div initial="hidden" animate="show"
                className={view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'flex flex-col gap-4'
                }>
                {filtered.map((p,i) => (
                  <motion.div key={p.id} variants={fadeUp} transition={{ delay: i*0.04 }}>
                    <PropertyCard property={p} onClick={() => navigate('property',p)}/>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
