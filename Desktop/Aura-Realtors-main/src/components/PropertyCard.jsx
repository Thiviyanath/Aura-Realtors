import { motion } from 'framer-motion'

const listingColors = {
  Buy:   'bg-green-100 text-green-800',
  Rent:  'bg-blue-100 text-blue-800',
  Lease: 'bg-amber-100 text-amber-800',
}

export default function PropertyCard({ property: p, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.13)' }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img src={p.images[0]} alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
        {p.featured && (
          <span className="absolute top-3 left-3 bg-green-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            Featured
          </span>
        )}
        <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${listingColors[p.listing]}`}>
          {p.listing}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xl font-bold text-green-700 font-display mb-1">{p.priceLabel}</div>
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-1">{p.title}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {p.location}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {p.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedIcon/>{p.bedrooms}
              </span>
            )}
            {p.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <BathIcon/>{p.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <SizeIcon/>{p.size}
            </span>
          </div>
          <span className="text-[11px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{p.type}</span>
        </div>
      </div>
    </motion.div>
  )
}

const BedIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
const BathIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
const SizeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
