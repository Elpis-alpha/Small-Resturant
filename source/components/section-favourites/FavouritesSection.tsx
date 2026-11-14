import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { useRef } from 'react'
import noodles from '@/source/assets/noodles.webp'
import pizza from '@/source/assets/pizza.webp'
import plate from '@/source/assets/plate.webp'
import { EASE, FadeUp, RevealLines } from '../general/Motion'

type Favourite = {
  name: string
  note: string
  price: string
  image: StaticImageData
  alt: string
  arch: string
  ink: string
  /** Width of the cut-out relative to its arch, and how far it hangs below it. */
  size: string
  spin: number
}

const FAVOURITES: Favourite[] = [
  {
    name: 'Flame-Grilled Chicken & Quinoa',
    note: 'Charred chicken breast, roast squash, black quinoa, wild rocket.',
    price: '15.50',
    image: plate,
    alt: 'Sliced grilled chicken with quinoa and rocket on a white plate',
    arch: 'bg-rock',
    ink: 'text-bone',
    size: 'w-[88%] -bottom-[9%]',
    spin: 40,
  },
  {
    name: 'Wood-Fired Supreme',
    note: 'Pepperoni, fennel sausage, peppers and red onion on a 48-hour dough.',
    price: '18.00',
    image: pizza,
    alt: 'A wood-fired pizza loaded with pepperoni, sausage and peppers',
    arch: 'bg-juniper',
    ink: 'text-bone',
    size: 'w-[118%] -bottom-[5%]',
    spin: 0,
  },
  {
    name: 'Wok-Charred Garlic Noodles',
    note: 'Hand-pulled noodles, broccoli, shiitake, crisp sprouts, cilantro.',
    price: '13.50',
    image: noodles,
    alt: 'Stir-fried noodles with vegetables and bean sprouts',
    arch: 'bg-saffron',
    ink: 'text-night',
    size: 'w-[104%] -bottom-[7%]',
    spin: 0,
  },
]

const Card = ({ item, index }: { item: Favourite; index: number }) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-item.spin, item.spin])
  const lift = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <motion.article
      ref={ref}
      className="group relative w-[78vw] max-w-[24rem] shrink-0 snap-center lg:w-auto lg:max-w-none"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, delay: index * 0.12, ease: EASE }}
    >
      <div className={`relative aspect-[4/5] rounded-t-[999px] ${item.arch} ${item.ink}`}>
        <span className="label absolute inset-x-0 top-[13%] text-center opacity-80">No. 0{index + 1}</span>
        <motion.div style={{ x: '-50%', y: lift }} className={`absolute left-1/2 ${item.size}`}>
          <motion.div style={{ rotate }}>
            <Image
              src={item.image}
              alt={item.alt}
              sizes="(max-width: 1024px) 26rem, 36vw"
              className="h-auto w-full drop-shadow-[0_28px_28px_rgba(21,16,12,0.45)] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-14 flex items-start justify-between gap-6 md:mt-16">
        <h3 className="font-display text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-3xl">{item.name}</h3>
        <p className="font-display text-2xl font-medium text-saffron">
          <span className="align-top text-sm">$</span>
          {item.price}
        </p>
      </div>
      <p className="mt-3 max-w-[32ch] text-dust">{item.note}</p>
    </motion.article>
  )
}

const FavouritesSection = () => (
  <section id="favourites" className="relative overflow-hidden pb-28 md:pb-44">
    <div className="shell">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <FadeUp>
            <p className="label flex items-center gap-3 text-dust">
              <span className="text-saffron">02</span>
              <span className="h-px w-8 bg-dust/50" />
              House favourites
            </p>
          </FadeUp>
          <h2 className="mt-6 font-display text-[3.4rem] font-black leading-[0.9] tracking-[-0.03em] sm:text-7xl md:text-8xl xl:text-[7.5rem]">
            <RevealLines
              lines={[
                <span key="a">What the</span>,
                <span key="b">
                  regulars <span className="italic text-saffron">order</span>
                </span>,
              ]}
            />
          </h2>
        </div>
        <FadeUp delay={0.15} className="max-w-[36ch] text-dust lg:pb-3 lg:text-right">
          Three plates that have never left the pass. If it’s your first time, start here.
        </FadeUp>
      </div>
    </div>

    {/* Swipeable on small screens, a three-up row on larger ones */}
    <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mt-24 md:gap-8 md:px-10 lg:mx-auto lg:grid lg:max-w-[1400px] lg:grid-cols-3 lg:overflow-visible xl:gap-14">
      {FAVOURITES.map((item, index) => (
        <Card key={item.name} item={item} index={index} />
      ))}
    </div>
  </section>
)

export default FavouritesSection
