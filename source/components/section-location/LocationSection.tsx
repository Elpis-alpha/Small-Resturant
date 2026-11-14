import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import room from '@/source/assets/room.jpg'
import { HOUR_GROUPS, useOpenStatus } from '@/source/lib/hours'
import { site } from '@/source/site'
import Badge from '../general/Badge'
import { ArrowUpRight, Sun } from '../general/Icons'
import Mesas from '../general/Mesas'
import { FadeUp, RevealLines } from '../general/Motion'
import OpenStatus from '../general/OpenStatus'

const LocationSection = () => {
  const status = useOpenStatus()

  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const links = [
    { label: 'Get directions', href: site.address.maps, external: true },
    { label: 'Call the grill', href: site.contact.tel, external: false },
    { label: 'Write to us', href: site.contact.mail, external: false },
  ]

  return (
    <section id="visit" className="relative overflow-hidden pt-28 md:pt-44">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <div ref={frameRef} className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src={room}
                alt="The dining room: rattan stools along the bar, hanging plants and a vaulted ceiling"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                placeholder="blur"
                className="object-cover"
              />
            </motion.div>
          </div>
          <Badge
            text="Come hungry · Leave happy · Come hungry · Leave happy ·"
            className="absolute -bottom-8 -right-2 h-32 w-32 bg-rock text-bone md:-right-10 md:h-40 md:w-40"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <FadeUp>
            <p className="label flex items-center gap-3 text-dust">
              <span className="text-saffron">04</span>
              <span className="h-px w-8 bg-dust/50" />
              Visit
            </p>
          </FadeUp>
          <h2 className="mt-6 font-display text-[3.2rem] font-black leading-[0.9] tracking-[-0.03em] sm:text-7xl xl:text-[6.5rem]">
            <RevealLines
              lines={[
                <span key="a">Find us</span>,
                <span key="b">under the</span>,
                <span key="c" className="italic text-saffron">
                  red rocks
                </span>,
              ]}
            />
          </h2>

          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-dust">
              Our room sits in the heart of downtown Sedona, between the galleries and the trailheads. Pull up a stool at the
              bar, or take a table on the terrace and watch the cliffs turn copper.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mt-10 grid gap-10 border-t border-bone/15 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="label text-dust">Address</h3>
                <address className="mt-4 font-display text-2xl not-italic leading-snug">
                  {site.name}
                  <br />
                  {site.address.line}
                </address>
                <p className="label mt-3 text-dust">{site.address.coords}</p>
              </div>

              <div>
                <h3 className="label text-dust">Hours</h3>
                <dl className="mt-4 space-y-2">
                  {HOUR_GROUPS.map((group) => {
                    const today = status ? group.days.includes(status.day) : false

                    return (
                      <div
                        key={group.label}
                        className={`flex items-baseline justify-between gap-4 transition-colors duration-500 ${
                          today ? 'text-bone' : 'text-dust'
                        }`}
                      >
                        <dt className="flex items-center gap-2 whitespace-nowrap">
                          {today && <Sun className="h-3.5 w-3.5 text-saffron" aria-label="Today" />}
                          {group.label}
                        </dt>
                        <dd className="whitespace-nowrap tabular-nums">{group.text}</dd>
                      </div>
                    )
                  })}
                </dl>
                <OpenStatus className="mt-4 text-sm" />
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-2 border-b border-bone/30 pb-1 font-semibold transition-colors duration-300 hover:border-saffron hover:text-saffron"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      <Mesas className="mt-20 h-40 md:mt-28 md:h-64" />
    </section>
  )
}

export default LocationSection
