export function playTing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1050, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.4)

    gain.gain.setValueAtTime(0.6, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)

    osc.onended = () => ctx.close()
  } catch (e) {
    // Audio not supported — silently skip
  }
}
