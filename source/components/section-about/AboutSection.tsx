import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import burger from '@/source/assets/burger.jpg'
import plated from '@/source/assets/plated.jpg'
import ribs from '@/source/assets/ribs.jpg'
import Badge from '../general/Badge'
import { CountUp, FadeUp } from '../general/Motion'

const STORY: { text: string; accent?: boolean }[] = [
  ...'We believe good food should be both'.split(' ').map((text) => ({ text })),
  { text: 'delicious', accent: true },
  { text: 'and' },
  { text: 'nutritious.', accent: true },
  ...'So everything here is cooked over open flame, with produce picked that morning, and served in a room that feels like a friend’s backyard at golden hour.'
    .split(' ')
    .map((text) => ({ text })),
]

const Word = ({
  progress,
  range,
  accent,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  accent?: boolean
  children: string
}) => {
  const opacity = useTransform(progress, range, [0.14, 1])

  return (
    <motion.span style={{ opacity }} className={accent ? 'italic text-saffron' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

const AboutSection = ({ plates }: { plates: number }) => {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress: textProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.5'] })

  const collageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: collageProgress } = useScroll({ target: collageRef, offset: ['start end', 'end start'] })
  const slow = useTransform(collageProgress, [0, 1], ['6%', '-6%'])
  const fast = useTransform(collageProgress, [0, 1], ['22%', '-22%'])
  const inner = useTransform(collageProgress, [0, 1], ['-7%', '7%'])

  const stats = [
    { value: 600, suffix: '°F', label: 'Mesquite-fired grill, lit every morning at six.' },
    { value: 38, suffix: '', label: 'Growers and ranchers, all within a hundred miles.' },
    { value: plates, suffix: '', label: 'Plates on a short menu we actually stand behind.' },
  ]

  return (
    <section id="story" className="relative overflow-hidden py-28 md:py-44">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <FadeUp className="lg:col-span-3">
            <p className="label flex items-center gap-3 text-dust">
              <span className="text-saffron">01</span>
              <span className="h-px w-8 bg-dust/50" />
              Our story
            </p>
          </FadeUp>

          <div className="lg:col-span-9">
            <h2 className="sr-only">Our story</h2>
            <p
              ref={textRef}
              className="relative font-display text-[2rem] font-normal leading-[1.12] tracking-[-0.02em] sm:text-5xl md:text-[3.6rem] md:leading-[1.08] xl:text-[4.4rem]"
            >
              {STORY.map((word, index) => (
                <Word
                  key={index}
                  progress={textProgress}
                  range={[index / STORY.length, (index + 1) / STORY.length]}
                  accent={word.accent}
                >
                  {word.text}
                </Word>
              ))}
            </p>
          </div>
        </div>

        {/* Collage: three frames drifting at different speeds */}
        <div ref={collageRef} className="relative mt-24 grid grid-cols-12 items-start gap-4 md:mt-40 md:gap-8">
          <motion.figure style={{ y: slow }} className="col-span-7 md:col-span-5 md:row-start-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
              <motion.div style={{ y: inner }} className="absolute -inset-y-[9%] inset-x-0">
                <Image
                  src={ribs}
                  alt="Slow-smoked ribs on a wooden board with tomatoes and pickles"
                  fill
                  sizes="(max-width: 768px) 58vw, 40vw"
                  placeholder="blur"
                  className="object-cover object-[62%_50%]"
                />
              </motion.div>
            </div>
            <figcaption className="label mt-4 text-dust">Fig. 1 — Eighteen hours over mesquite</figcaption>
          </motion.figure>

          <motion.figure style={{ y: fast }} className="col-span-5 mt-24 md:col-span-3 md:col-start-6 md:row-start-1 md:mt-0 md:self-end md:pb-10">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                src={plated}
                alt="A plated curry with lime on a dark ceramic dish"
                fill
                sizes="(max-width: 768px) 40vw, 24vw"
                placeholder="blur"
                className="scale-125 object-cover"
              />
            </div>
            <figcaption className="label mt-4 text-dust">Fig. 2 — Plated to order</figcaption>
          </motion.figure>

          <motion.figure style={{ y: slow }} className="col-span-12 md:col-span-4 md:col-start-9 md:row-start-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] md:aspect-[4/5]">
              <motion.div style={{ y: inner }} className="absolute -inset-y-[9%] inset-x-0">
                <Image
                  src={burger}
                  alt="A stacked burger with fries and a cold beer"
                  fill
                  sizes="(max-width: 768px) 92vw, 32vw"
                  placeholder="blur"
                  className="object-cover object-[38%_50%]"
                />
              </motion.div>
            </div>
            <figcaption className="label mt-4 text-dust">Fig. 3 — The house burger, never frozen</figcaption>
          </motion.figure>

          <Badge
            text="Fire · Smoke · Good company · Since 2023 ·"
            className="absolute left-[43%] top-[6%] hidden h-36 w-36 bg-saffron text-night md:grid lg:h-40 lg:w-40"
          />
        </div>

        <dl className="mt-24 grid gap-10 border-t border-bone/15 pt-10 md:mt-36 md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <FadeUp key={stat.label} delay={index * 0.1}>
              <dt className="font-display text-7xl font-black leading-none tracking-[-0.03em] text-bone md:text-6xl lg:text-8xl">
                <CountUp value={stat.value} />
                <span className="text-saffron">{stat.suffix}</span>
              </dt>
              <dd className="mt-4 max-w-[26ch] text-dust">{stat.label}</dd>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default AboutSection
