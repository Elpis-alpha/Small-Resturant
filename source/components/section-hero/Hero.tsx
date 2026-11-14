import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import bowl from '@/source/assets/bowl.webp'
import { site } from '@/source/site'
import AnchorLink from '../general/AnchorLink'
import { ArrowDown, Sun } from '../general/Icons'
import Marquee from '../general/Marquee'
import { EASE, Magnetic, RevealLines } from '../general/Motion'

// Sunset bands, outermost first. Each is a full disc; the stack reads as rings.
const BANDS = ['#7A2A1C', '#C9482B', '#E8792C', '#F3B43F']

const TICKER = ['Fire-grilled', 'Market-fresh', 'Slow-smoked', 'Made to order', 'Open till late']

const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bowlRotate = useTransform(scrollYProgress, [0, 1], [0, 150])
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.28])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section id="top" ref={ref} className="relative">
      <div className="hero relative h-[calc(100svh-4rem)] min-h-[540px] overflow-hidden md:h-[calc(100svh-5rem)]">
        {/* Dusk glow behind the horizon */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 70% at 50% 100%, rgba(201,72,43,0.32) 0%, rgba(122,42,28,0.14) 38%, transparent 70%)',
          }}
        />

        {/* The sun: four bands and a bowl, centred on the bottom edge */}
        <motion.div aria-hidden className="absolute inset-0" style={{ scale: sunScale, transformOrigin: '50% 100%' }}>
          {BANDS.map((color, index) => (
            <motion.div
              key={color}
              className="absolute bottom-0 left-1/2 rounded-full"
              style={{
                width: `calc(var(--d) + var(--band) * ${2 * (BANDS.length - index)})`,
                height: `calc(var(--d) + var(--band) * ${2 * (BANDS.length - index)})`,
                backgroundColor: color,
                x: '-50%',
                y: '50%',
              }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.25 + index * 0.1, ease: EASE }}
            />
          ))}

          <motion.div
            className="absolute bottom-0 left-1/2 h-[var(--d)] w-[var(--d)]"
            style={{ x: '-50%', y: '50%' }}
            initial={{ scale: 0.7, rotate: -70, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.55, ease: EASE }}
          >
            <div className="absolute inset-[4%] rounded-full bg-night/60 blur-2xl" />
            <motion.div className="relative h-full w-full" style={{ rotate: bowlRotate }}>
              <Image
                src={bowl}
                alt=""
                priority
                sizes="(max-width: 768px) 112vw, 56vh"
                className="h-full w-full animate-spin-slow object-contain motion-reduce:animate-none"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copy sits in the sky above the outermost band */}
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-center px-5 pt-16 text-center md:pt-[4.5rem]"
          style={{ bottom: 'var(--R)', y: copyY, opacity: copyOpacity }}
        >
          <h1 className="font-display text-[17.5vw] font-black leading-[0.84] tracking-[-0.035em] md:text-[min(11.5vw,15.5svh)]">
            <RevealLines
              immediate
              delay={0.35}
              lines={[
                <span key="a">Taste the</span>,
                <span key="b" className="italic text-saffron">
                  difference
                </span>,
              ]}
            />
          </h1>

          <motion.p
            className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed text-bone/75 md:mt-[2.5svh] md:max-w-none md:text-base [@media(max-height:760px)]:hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            Fire-grilled plates, market-fresh produce and a warm welcome, under the red rocks of Sedona.
          </motion.p>

          <motion.div
            className="mt-6 flex items-center gap-3 md:mt-[3svh]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.12, ease: EASE }}
          >
            <Magnetic>
              <AnchorLink
                href="#reserve"
                className="inline-flex h-12 items-center rounded-full bg-saffron px-7 text-[0.95rem] font-semibold text-night transition-colors duration-300 hover:bg-bone"
              >
                Reserve a table
              </AnchorLink>
            </Magnetic>
            <Magnetic>
              <AnchorLink
                href="#menu"
                className="inline-flex h-12 items-center rounded-full border border-bone/30 px-7 text-[0.95rem] font-semibold transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-night"
              >
                See the menu
              </AnchorLink>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Corner notes, wide screens only */}
        <motion.div
          className="label absolute inset-x-0 bottom-7 hidden justify-between px-10 text-bone/60 xl:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span>{site.address.coords}</span>
          <AnchorLink href="#story" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-bone">
            Scroll
            <ArrowDown className="h-3.5 w-3.5" />
          </AnchorLink>
        </motion.div>
      </div>

      {/* The horizon line */}
      <Marquee className="relative z-10 flex h-16 items-center bg-bone text-night md:h-20">
        {TICKER.map((item) => (
          <span key={item} className="flex items-center font-display text-2xl font-medium italic tracking-[-0.01em] md:text-4xl">
            <span className="px-6 md:px-9">{item}</span>
            <Sun className="h-5 w-5 text-rock md:h-7 md:w-7" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}

export default Hero
