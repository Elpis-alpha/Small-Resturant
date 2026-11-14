import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '@/source/site'
import { lockScroll } from '@/source/lib/scroll'
import AnchorLink from '../general/AnchorLink'
import { ArrowUpRight } from '../general/Icons'
import { EASE, Magnetic } from '../general/Motion'
import OpenStatus from '../general/OpenStatus'
import Wordmark from '../general/Wordmark'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Tuck the bar away on the way down, bring it back on the way up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    setHidden(latest > 480 && latest > previous)
  })

  useEffect(() => {
    lockScroll(open)
    if (!open) return

    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  const close = () => {
    // Release the scroll lock before the anchor handler asks to scroll.
    lockScroll(false)
    setOpen(false)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: '-100%' }}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled && !open ? 'border-b border-bone/10 bg-night/75 backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        >
          <nav className="shell flex h-16 items-center justify-between md:h-[4.5rem]" aria-label="Primary">
            <AnchorLink href="#top" onClick={close} className="text-[0.95rem] md:text-base" aria-label={`${site.name} — home`}>
              <Wordmark />
            </AnchorLink>

            <ul className="hidden items-center gap-9 md:flex">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <AnchorLink
                    href={link.href}
                    className="group relative py-2 text-[0.95rem] text-bone/80 transition-colors duration-300 hover:text-bone"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-saffron transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                  </AnchorLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <OpenStatus className="hidden text-[0.8rem] text-bone/70 xl:inline-flex" />
              <div className="hidden sm:block">
                <Magnetic>
                  <AnchorLink
                    href="#reserve"
                    onClick={close}
                    className="inline-flex h-10 items-center rounded-full bg-bone px-5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-saffron"
                  >
                    Reserve
                  </AnchorLink>
                </Magnetic>
              </div>
              <button
                type="button"
                className="relative -mr-2 grid h-11 w-11 place-items-center md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
              >
                <span
                  className={`absolute h-0.5 w-6 rounded-full bg-bone transition-transform duration-500 ease-out ${
                    open ? 'rotate-45' : '-translate-y-[5px]'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 rounded-full bg-bone transition-transform duration-500 ease-out ${
                    open ? '-rotate-45' : 'translate-y-[5px]'
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-night px-5 pb-8 pt-24 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.2rem) 2rem)' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <motion.ul
              initial="hidden"
              animate="shown"
              transition={{ staggerChildren: 0.07, delayChildren: 0.18 }}
              className="flex flex-col"
            >
              {[...site.nav, { label: 'Reserve', href: '#reserve' } as const].map((link, index) => (
                <li key={link.href} className="overflow-hidden border-b border-bone/10">
                  <motion.div
                    variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    <AnchorLink
                      href={link.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-4 font-display text-[2.75rem] font-semibold leading-none tracking-[-0.02em]"
                    >
                      <span className={link.href === '#reserve' ? 'italic text-saffron' : ''}>{link.label}</span>
                      <span className="label text-dust">0{index + 1}</span>
                    </AnchorLink>
                  </motion.div>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 space-y-6"
            >
              <OpenStatus className="text-sm text-bone/80" />
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dust">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
