// Telegram Web App helper
export const tg = window.Telegram?.WebApp

export function initTelegram() {
  if (tg) {
    tg.ready()
    tg.expand()
  }
}

// platform is 'unknown' in browser, real value in Telegram (android/ios/tdesktop/weba)
export function isTelegram() {
  const platform = window.Telegram?.WebApp?.platform
  return !!platform && platform !== 'unknown'
}

export function getTelegramUser() {
  return tg?.initDataUnsafe?.user || null
}

export function closeMiniApp() {
  try {
    window.Telegram.WebApp.close()
  } catch (e) {
    console.log('close error', e)
  }
}

// Auto-request phone — shows Telegram share popup
export function requestPhone(callback) {
  if (!tg || !tg.requestContact) return

  // Listen for the contactRequested event
  tg.onEvent('contactRequested', (data) => {
    if (data.status === 'sent') {
      const phone =
        data.contact?.phone_number ||
        data.responseUnsafe?.contact?.phone_number
      if (phone) {
        callback(phone.startsWith('+') ? phone : '+' + phone)
      }
    }
  })

  tg.requestContact()
}
