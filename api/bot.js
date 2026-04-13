const BOT_TOKEN = process.env.BOT_TOKEN
const APP_URL = 'https://yashil-uyim.vercel.app'

async function sendMessage(chatId, text, replyMarkup) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  })
}

async function answerCallback(callbackQueryId, text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text, show_alert: false }),
  })
}

async function editMessageReplyMarkup(chatId, messageId) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, message_id: messageId, reply_markup: { inline_keyboard: [] } }),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true })

  const body = req.body || {}

  // ── Handle admin button callbacks ──────────────────────────
  if (body.callback_query) {
    const { id, data, message } = body.callback_query
    const [action, chatId, ticketNum] = (data || '').split('|')

    if (action === 'allow' && chatId) {
      await editMessageReplyMarkup(message.chat.id, message.message_id)
      await answerCallback(id, '✅ Allowed!')

      await sendMessage(chatId,
        `🎟 <b>Chiptangiz tasdiqlandi!</b>\n\n` +
        `🌿 <b>Yashil Uyim Ekologik Festival</b>\n` +
        `📅 25-aprel · Toshkent\n\n` +
        `🔢 Chipta №: <b>#${ticketNum}</b>\n\n` +
        `Festival kunida shu xabarni ko'rsating. Sizni kutib qolamiz! 🌱`
      )
      await sendMessage(message.chat.id, `✅ #${ticketNum} — chipta yuborildi.`)
    }

    if (action === 'fake' && chatId) {
      await editMessageReplyMarkup(message.chat.id, message.message_id)
      await answerCallback(id, '❌ Fake!')

      await sendMessage(chatId,
        `❌ <b>Your file is fake!</b>\n\n` +
        `Yuborgan chekingiz tasdiqlanmadi — hujjat soxta yoki noto'g'ri.\n\n` +
        `Iltimos, haqiqiy to'lov chekini yuboring yoki admin bilan bog'laning.`
      )
      await sendMessage(message.chat.id, `❌ #${ticketNum} — fake deb belgilandi.`)
    }

    return res.status(200).json({ ok: true })
  }

  // ── Handle /start command ───────────────────────────────────
  const { message } = body
  if (!message) return res.status(200).json({ ok: true })

  const chatId  = message.chat.id
  const text    = message.text || ''
  const firstName = message.from?.first_name || 'Mehmon'

  if (text === '/start') {
    await sendMessage(
      chatId,
      `Salom, <b>${firstName}</b>! 👋\n\nBu botda siz <b>Yashil Uyim</b> festivaliga chipta olishingiz mumkin.\n\n🌿 Festival: <b>25-aprel, Toshkent</b>\n🎟 Ro'yxatdan o'ting!`,
      {
        inline_keyboard: [[
          { text: '🌿 Ilovani ochish', web_app: { url: APP_URL } },
        ]],
      }
    )
  }

  return res.status(200).json({ ok: true })
}
