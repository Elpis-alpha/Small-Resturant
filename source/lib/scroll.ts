import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

/** Scroll to an in-page anchor like "#menu", smoothly when the visitor allows motion. */
export const scrollToHash = (hash: string) => {
  const target = hash === '#top' ? document.body : document.querySelector<HTMLElement>(hash)
  if (!target) return

  window.history.replaceState(null, '', hash === '#top' ? window.location.pathname : hash)

  // Sections carry their own `scroll-margin-top`, which both paths respect.
  if (lenis) {
    lenis.scrollTo(hash === '#top' ? 0 : target, { duration: 1.4 })
    return
  }

  if (hash === '#top') window.scrollTo({ top: 0 })
  else target.scrollIntoView()
}

export const lockScroll = (locked: boolean) => {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
