import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'

const COPIES = 4

const wrap = (min: number, max: number, value: number) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * An endless ticker that speeds up, and reverses, with the scroll.
 * `velocity` is in percent of one copy's width per second.
 */
const Marquee = ({ children, velocity = 3, className = '' }: { children: ReactNode; velocity?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduceMotion = useReducedMotion()

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)

  const x = useTransform(baseX, (value) => `${wrap(-100 / COPIES, 0, value)}%`)

  useAnimationFrame((_, delta) => {
    if (!inView || reduceMotion) return

    const factor = boost.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1

    const step = direction.current * velocity * (delta / 1000)
    baseX.set(baseX.get() + step + step * Math.abs(factor))
  })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <div key={index} className="flex shrink-0 items-center" aria-hidden={index > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
