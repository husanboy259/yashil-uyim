import { useNavigate } from 'react-router-dom'
import { requestPhone, isTelegram } from '../lib/telegram'

export default function ContactShare() {
  const navigate = useNavigate()

  const handleShare = () => {
    requestPhone((phone) => {
      sessionStorage.setItem('tg_contacted', 'true')
      sessionStorage.setItem('tg_phone', phone)
      navigate('/')
    })

    // If user dismisses without sharing, still allow to proceed
  }

  const handleSkip = () => {
    sessionStorage.setItem('tg_contacted', 'true')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] flex flex-col items-center justify-center px-6 text-white text-center">
      <div className="text-6xl mb-6">🌿</div>
      <h1 className="text-3xl font-bold mb-3">Yashil Uyim</h1>
      <p className="text-green-200 text-lg mb-2">Ekologik Festival</p>
      <p className="text-green-300 text-sm mb-10 leading-relaxed">
        Davom etish uchun telefon raqamingizni ulashing
      </p>

      <button
        onClick={handleShare}
        className="w-full max-w-xs bg-white text-[#2D6A4F] font-bold py-4 rounded-2xl text-base hover:bg-green-50 transition-colors shadow-lg mb-4 flex items-center justify-center gap-2"
      >
        📱 Kontaktni ulashish
      </button>

      <button
        onClick={handleSkip}
        className="text-green-300 text-sm underline"
      >
        O'tkazib yuborish
      </button>
    </div>
  )
}
