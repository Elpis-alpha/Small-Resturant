import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '@/source/site'
import { HOUR_GROUPS } from '@/source/lib/hours'
import AnchorLink from './AnchorLink'
import { ArrowUpRight } from './Icons'
import { FadeUp } from './Motion'
import OpenStatus from './OpenStatus'

const Footer = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordmarkY = useTransform(scrollYProgress, [0.3, 1], ['38%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-night pt-24 md:pt-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-6">
            <p className="label text-dust">Follow along</p>
            <ul className="mt-6">
              {site.socials.map((social) => (
                <li key={social.label} className="border-b border-bone/15 first:border-t">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-saffron"
                  >
                    <span className="font-display text-4xl font-medium tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-5xl">
                      {social.label}
                    </span>
                    <span className="flex items-center gap-4 text-sm text-dust transition-colors duration-300 group-hover:text-saffron">
                      <span className="hidden sm:inline">{social.handle}</span>
                      <ArrowUpRight className="h-6 w-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.1} className="grid grid-cols-2 gap-10 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="label text-dust">Explore</p>
              <ul className="mt-6 space-y-3 text-lg">
                {[...site.nav, { label: 'Reserve', href: '#reserve' } as const].map((link) => (
                  <li key={link.href}>
                    <AnchorLink href={link.href} className="transition-colors duration-300 hover:text-saffron">
                      {link.label}
                    </AnchorLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-dust">Hours</p>
              <ul className="mt-6 space-y-3 text-sm text-dust">
                {HOUR_GROUPS.map((group) => (
                  <li key={group.label}>
                    <span className="block text-bone">{group.label}</span>
                    {group.text}
                  </li>
                ))}
              </ul>
              <OpenStatus className="mt-5 text-sm" />
            </div>
          </FadeUp>
        </div>
      </div>

      <motion.p
        aria-hidden
        style={{ y: wordmarkY }}
        className="text-sunset mt-16 select-none whitespace-nowrap text-center font-display text-[19.6vw] font-black leading-[0.8] tracking-[-0.04em] md:mt-20"
      >
        Fresh Bites
      </motion.p>

      <div className="relative border-t border-bone/15 bg-night">
        <div className="shell flex flex-col gap-3 py-6 text-sm text-dust md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. A concept restaurant in {site.address.line.split(' 8')[0]}.
          </p>
          <p>
            Designed &amp; built by{' '}
            <a
              href={site.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone underline decoration-saffron decoration-2 underline-offset-4 transition-colors duration-300 hover:text-saffron"
            >
              {site.credit.label}
            </a>
          </p>
          <AnchorLink href="#top" className="label text-bone transition-colors duration-300 hover:text-saffron">
            Back to top ↑
          </AnchorLink>
        </div>
      </div>
    </footer>
  )
}

export default Footer
