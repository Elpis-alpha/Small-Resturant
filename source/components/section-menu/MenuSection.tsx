import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { CATEGORY_LABELS, getCategories, menuImage } from '@/source/lib/menu'
import type { MenuItem } from '@/source/lib/menu'
import { Sun } from '../general/Icons'
import { EASE, FadeUp, RevealLines } from '../general/Motion'

const ALL = 'All'

const Price = ({ value }: { value: number }) => {
  const [dollars, cents] = value.toFixed(2).split('.')

  return (
    <span className="whitespace-nowrap font-display text-2xl font-semibold tracking-[-0.01em]">
      <span className="sr-only">$</span>
      {dollars}
      <sup className="ml-0.5 text-[0.55em] font-medium">{cents}</sup>
    </span>
  )
}

const MenuSection = ({ menu }: { menu: MenuItem[] }) => {
  const categories = useMemo(() => [ALL, ...getCategories(menu)], [menu])
  const [active, setActive] = useState(ALL)
  const [hovered, setHovered] = useState<string | null>(null)
  const [finePointer, setFinePointer] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const nearby = useInView(sectionRef, { once: true, margin: '400px 0px' })

  const visible = active === ALL ? menu : menu.filter((item) => item.category === active)
  const withImages = menu.filter((item) => item.image)

  // The cursor-following preview is a mouse nicety; touch devices get inline thumbnails (via CSS) instead.
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const previewX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 })
  const previewY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 })

  const trackPointer = (event: MouseEvent) => {
    x.set(event.clientX)
    y.set(event.clientY)
    // Keep the card on screen: hang it to the left of the cursor near the right edge.
    setFlipped(event.clientX > window.innerWidth - 340)
  }

  return (
    <section id="menu" ref={sectionRef} className="relative px-2 md:px-4">
      <div className="rounded-[2rem] bg-paper py-20 text-night md:rounded-[3rem] md:py-32">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <FadeUp>
                <p className="label flex items-center gap-3 text-night/60">
                  <span className="text-rock">03</span>
                  <span className="h-px w-8 bg-night/30" />
                  Served all day
                </p>
              </FadeUp>
              <h2 className="mt-6 whitespace-nowrap font-display text-[4.6rem] font-black leading-[0.86] tracking-[-0.035em] sm:text-8xl md:text-[9rem] xl:text-[11rem]">
                <RevealLines
                  lines={[
                    <span key="a">
                      The <span className="italic text-rock">menu</span>
                    </span>,
                  ]}
                />
              </h2>
            </div>

            <FadeUp delay={0.1} className="max-w-[34ch] text-night/60 lg:pb-4 lg:text-right">
              Breakfast until eleven, the grill until close. Everything is cooked to order, so the good things take a minute.
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="mt-10 md:mt-14">
              <div
                role="tablist"
                aria-label="Menu categories"
                className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
              >
                {categories.map((category) => {
                  const selected = category === active
                  const count = category === ALL ? menu.length : menu.filter((item) => item.category === category).length

                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="menu-panel"
                      onClick={() => setActive(category)}
                      className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-300 ${
                        selected ? 'text-bone' : 'text-night/70 hover:text-night'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="menu-tab"
                          className="absolute inset-0 rounded-full bg-night"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        {CATEGORY_LABELS[category] ?? category}
                        <sup className={`ml-1 text-[0.65em] ${selected ? 'text-saffron' : 'text-night/40'}`}>{count}</sup>
                      </span>
                    </button>
                  )
                })}
              </div>
          </FadeUp>

          <div id="menu-panel" role="tabpanel" className="mt-8 md:mt-10" onMouseMove={trackPointer} onMouseLeave={() => setHovered(null)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={active}
                className="grid gap-x-16 lg:grid-cols-2 xl:gap-x-24"
                initial="hidden"
                animate="shown"
                exit="hidden"
                variants={{
                  hidden: { transition: { staggerChildren: 0.015 } },
                  shown: { transition: { staggerChildren: 0.045 } },
                }}
              >
                {visible.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 18, transition: { duration: 0.2 } },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    onMouseEnter={() => setHovered(item.image ? item.id : null)}
                    className="group flex gap-4 border-t border-night/15 py-6 md:py-7"
                  >
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={menuImage(item.image, 176, 176)}
                        alt=""
                        width={88}
                        height={88}
                        loading="lazy"
                        decoding="async"
                        className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full bg-night/10 object-cover [@media(hover:hover)_and_(pointer:fine)]:hidden"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.015em] transition-[color,transform] duration-500 ease-out group-hover:translate-x-2 group-hover:text-rock md:text-[1.7rem]">
                          {item.name}
                        </h3>
                        <span className="min-w-[1.5rem] flex-1 -translate-y-1 border-b-2 border-dotted border-night/25" aria-hidden />
                        <Price value={item.price} />
                      </div>
                      <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-night/60">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <p className="mt-10 flex items-center gap-3 border-t border-night/15 pt-8 text-sm text-night/60">
            <Sun className="h-4 w-4 shrink-0 text-rock" />
            Allergies or a special diet? Tell your server. The kitchen is happy to adapt almost anything.
          </p>
        </div>
      </div>

      {/* Dish preview that trails the cursor */}
      {finePointer && nearby && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: previewX, y: previewY }}
        >
          <motion.div
            className={`-mt-40 h-80 w-64 overflow-hidden rounded-[1.5rem] bg-char shadow-[0_30px_60px_-15px_rgba(21,16,12,0.55)] ${
              flipped ? '-ml-[18rem]' : 'ml-8'
            }`}
            initial={false}
            animate={hovered ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 0.7, rotate: 6 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {withImages.map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={menuImage(item.image as string, 512, 640)}
                alt=""
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  hovered === item.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default MenuSection
