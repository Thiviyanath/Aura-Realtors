import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { whatsappUrl, siteConfig } from '../data/siteConfig.js'
import { getApproved } from '../data/properties.js'

const hour = new Date().getHours()
const afterHours = hour >= 17 || hour < 9

const INITIAL_MSG = afterHours
  ? "Hi! 👋 We're currently offline but I can still help you find properties. Are you looking to Buy, Rent, Lease, or Sell?"
  : "Hello! 👋 Welcome to Western Prime Properties. How can I help you today?\n\nAre you looking to:\n🏠 Buy  |  🔑 Rent  |  📋 Lease  |  💰 Sell?"

const mockReplies = {
  buy:    "Great! We have premium properties available for purchase across Colombo 01–10. 🏡\n\nWhat's your budget range and preferred area?",
  rent:   "We have great rental options from Colombo 1–10! 🔑\n\nWhat size property are you looking for?",
  lease:  "We offer flexible lease arrangements on premium commercial and residential spaces. 📋\n\nWhat type of property do you need?",
  sell:   "We'd love to help you sell your property! Our team will give you the best market value. 💰\n\nWould you like to list your property with us?",
  default:"I'll connect you with our team right away! You can also browse our latest listings below. 😊",
}

function getReply(text) {
  const t = text.toLowerCase()
  if (t.includes('buy') || t.includes('purchase'))  return mockReplies.buy
  if (t.includes('rent'))                            return mockReplies.rent
  if (t.includes('lease'))                           return mockReplies.lease
  if (t.includes('sell') || t.includes('list'))      return mockReplies.sell
  return mockReplies.default
}

export default function ChatWidget({ onClose, navigate }) {
  const [messages, setMessages] = useState([{ role: 'bot', text: INITIAL_MSG }])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const bottomRef               = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = async (text) => {
    const t = (text || input).trim()
    if (!t) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: t }])
    setTyping(true)
    await new Promise(r => setTimeout(r, 900 + Math.random() * 500))
    setTyping(false)
    setMessages(m => [...m, { role: 'bot', text: getReply(t) }])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-float border border-gray-100 flex flex-col overflow-hidden"
      style={{ maxHeight: '520px' }}
    >
      {/* Header */}
      <div className="bg-green-700 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-sm">{siteConfig.companyShort} Assistant</div>
          <div className="text-green-200 text-xs">{afterHours ? '📴 After hours – AI available' : '🟢 Online now'}</div>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === 'user'
                ? 'bg-green-700 text-white rounded-br-sm'
                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0,0.2,0.4].map((d,i) => (
                <motion.div key={i} className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [-3, 0, -3] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick replies */}
      <div className="px-3 pt-2 pb-1 flex gap-2 overflow-x-auto scrollbar-hide bg-white border-t border-gray-100">
        {['🏠 Buy','🔑 Rent','📋 Lease','💰 Sell'].map(q => (
          <button key={q} onClick={() => send(q)}
            className="shrink-0 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1.5 font-medium hover:bg-green-100 transition-colors">
            {q}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="px-3 py-2 flex gap-2 bg-white">
        <button onClick={() => navigate('listings')}
          className="flex-1 text-xs font-semibold bg-green-700 text-white rounded-lg py-2 hover:bg-green-800 transition-colors">
          View Properties
        </button>
        <a href={whatsappUrl('Hi, I need help finding a property')} target="_blank" rel="noreferrer"
          className="flex-1 text-xs font-semibold bg-[#25D366] text-white rounded-lg py-2 text-center hover:bg-[#1ebe5d] transition-colors flex items-center justify-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          WhatsApp
        </a>
      </div>

      {/* Input */}
      <div className="px-3 pb-3 bg-white flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-green-500 transition-colors bg-gray-50"
        />
        <button onClick={() => send()}
          className="w-10 h-10 bg-green-700 hover:bg-green-800 text-white rounded-xl flex items-center justify-center transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
