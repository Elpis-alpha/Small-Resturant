import '@/styles/globals.css'
import 'lenis/dist/lenis.css'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { display, sans } from '@/source/lib/fonts'
import { setLenis } from '@/source/lib/scroll'

export default function App({ Component, pageProps }: AppProps) {
  // Inertial scrolling for wheel/trackpad; touch keeps its native feel.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1 })
    setLenis(lenis)

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className={`${display.variable} ${sans.variable} grain font-sans`}>
        <Component {...pageProps} />
      </div>
    </MotionConfig>
  )
}
