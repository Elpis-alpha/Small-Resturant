import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

/** Fade-and-rise for blocks as they scroll into view. */
export const FadeUp = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
)

/**
 * Headline reveal: each line slides up from behind its own mask.
 * `immediate` plays on mount (hero), otherwise when scrolled into view.
 */
export const RevealLines = ({
  lines,
  delay = 0,
  immediate = false,
  className = '',
}: {
  lines: ReactNode[]
  delay?: number
  immediate?: boolean
  className?: string
}) => (
  <motion.span
    className={`block ${className}`}
    initial="hidden"
    {...(immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport: VIEWPORT })}
    transition={{ staggerChildren: 0.09, delayChildren: delay }}
  >
    {lines.map((line, index) => (
      // The padding/negative margin keeps descenders and italics inside the mask.
      <span key={index} className="-mb-[0.14em] block overflow-hidden px-[0.08em] pb-[0.14em]">
        <motion.span
          className="block"
          variants={{ hidden: { y: '115%' }, shown: { y: '0%' } }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
)

/** Buttons that lean towards the cursor. Mouse-only; touch and keyboard get the plain element. */
export const Magnetic = ({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div className="inline-block" style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

/** Counts up to `value` the first time it scrolls into view. */
export const CountUp = ({ value, className = '' }: { value: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
