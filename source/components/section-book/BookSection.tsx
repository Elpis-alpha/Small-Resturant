import emailjs from '@emailjs/browser'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import plate from '@/source/assets/plate.webp'
import { emailjsConfig } from '@/source/site'
import { Check, Minus, Plus } from '../general/Icons'
import { EASE, FadeUp, RevealLines } from '../general/Motion'

const SLOTS = ['08:30', '10:00', '12:00', '13:00', '17:30', '18:30', '19:00', '19:30', '20:00', '20:30']

const MAX_PARTY = 12

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Booking = { name: string; people: number; date: string; time: string }

const formatTime = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number)
  return `${hours % 12 === 0 ? 12 : hours % 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'pm' : 'am'}`
}

const formatDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

const toInputDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const BookSection = () => {
  const [people, setPeople] = useState(2)
  const [minDate, setMinDate] = useState<string>()
  const [status, setStatus] = useState<Status>('idle')
  const [booking, setBooking] = useState<Booking | null>(null)

  // Set on the client: a build-time "today" would go stale in static HTML.
  useEffect(() => setMinDate(toInputDate(new Date())), [])

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const plateRotate = useTransform(scrollYProgress, [0, 1], [-60, 120])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')

    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form, emailjsConfig.publicKey)
      setBooking({
        name: String(data.get('name') ?? '').trim(),
        people: Number(data.get('people') ?? people),
        date: String(data.get('date') ?? ''),
        time: String(data.get('time') ?? ''),
      })
      setStatus('sent')
    } catch (error) {
      console.error('[reservation] Could not send the request', error)
      setStatus('error')
    }
  }

  const reset = () => {
    setBooking(null)
    setPeople(2)
    setStatus('idle')
  }

  const notch = 'absolute top-0 h-7 w-7 -translate-y-1/2 rounded-full bg-rock'

  return (
    <section id="reserve" ref={sectionRef} className="relative -mt-px overflow-hidden bg-rock pb-24 pt-16 text-bone md:pb-36 md:pt-20">
      {/* A plate turning in the corner */}
      <motion.div
        aria-hidden
        style={{ rotate: plateRotate }}
        className="pointer-events-none absolute -bottom-[20vw] -left-[12vw] hidden w-[40vw] lg:block"
      >
        <Image src={plate} alt="" sizes="40vw" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(21,16,12,0.35)]" />
      </motion.div>

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pb-[13vw]">
          <FadeUp>
            <p className="label flex items-center gap-3 text-bone/70">
              <span className="text-saffron">05</span>
              <span className="h-px w-8 bg-bone/40" />
              Reservations
            </p>
          </FadeUp>
          <h2 className="mt-6 font-display text-[4rem] font-black leading-[0.86] tracking-[-0.035em] sm:text-8xl xl:text-[8.5rem]">
            <RevealLines
              lines={[
                <span key="a">Save</span>,
                <span key="b">
                  your <span className="italic text-saffron">seat</span>
                </span>,
              ]}
            />
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-bone/85">
              Tell us when you’re coming and we’ll keep a table warm. You’ll have a confirmation from the team within the hour.
            </p>
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-bone/70">
              Walk-ins are always welcome at the bar. For parties larger than twelve, give us a call and we’ll set up the terrace.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <div className="relative rounded-[1.75rem] bg-paper text-night shadow-[0_40px_80px_-30px_rgba(21,16,12,0.6)]">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' && booking ? (
                <motion.div
                  key="confirmation"
                  role="status"
                  className="px-6 py-14 text-center md:px-10 md:py-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <motion.span
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-juniper text-bone"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                  >
                    <Check className="h-8 w-8" />
                  </motion.span>
                  <h3 className="mt-8 font-display text-5xl font-black leading-[0.95] tracking-[-0.03em]">
                    See you soon,
                    <br />
                    <span className="italic text-rock">{booking.name.split(' ')[0] || 'friend'}</span>
                  </h3>
                  <p className="mx-auto mt-6 max-w-[34ch] text-night/70">
                    Table for {booking.people} on {formatDate(booking.date)} at {formatTime(booking.time)}. We’ve got your request
                    and will confirm by email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-10 inline-flex h-12 items-center rounded-full border border-night/25 px-7 font-semibold transition-colors duration-300 hover:border-night hover:bg-night hover:text-bone"
                  >
                    Book another table
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="grid gap-x-8 gap-y-7 px-6 pb-9 pt-8 sm:grid-cols-2 md:px-10 md:pt-10">
                    <div className="flex items-center justify-between sm:col-span-2">
                      <p className="label text-night/60">Table request</p>
                      <p className="label text-night/60">Admit {String(people).padStart(2, '0')}</p>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="label text-night/60">
                        Name
                      </label>
                      <input id="name" name="name" type="text" autoComplete="name" placeholder="Alice Henderson" required className="field mt-1" />
                    </div>

                    <div>
                      <label htmlFor="email" className="label text-night/60">
                        Email
                      </label>
                      <input id="email" name="email" type="email" autoComplete="email" placeholder="alice@example.com" required className="field mt-1" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="label text-night/60">
                        Phone
                      </label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(928) 555 0142" required className="field mt-1" />
                    </div>

                    <div>
                      <label htmlFor="date" className="label text-night/60">
                        Date
                      </label>
                      <input id="date" name="date" type="date" min={minDate} required className="field mt-1" />
                    </div>

                    <div>
                      <label htmlFor="people" className="label text-night/60">
                        Guests
                      </label>
                      <div className="mt-1 flex items-center justify-between border-b border-night/25 pb-1">
                        <button
                          type="button"
                          aria-label="Fewer guests"
                          disabled={people <= 1}
                          onClick={() => setPeople((value) => Math.max(1, value - 1))}
                          className="grid h-9 w-9 place-items-center rounded-full border border-night/25 transition-colors duration-300 hover:border-night hover:bg-night hover:text-bone disabled:pointer-events-none disabled:opacity-30"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          id="people"
                          name="people"
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={MAX_PARTY}
                          required
                          value={people}
                          onChange={(event) => setPeople(Math.min(MAX_PARTY, Math.max(1, Number(event.target.value) || 1)))}
                          className="no-spin w-16 border-0 bg-transparent p-0 text-center font-display text-2xl font-semibold text-night focus:outline-none focus:ring-0"
                        />
                        <button
                          type="button"
                          aria-label="More guests"
                          disabled={people >= MAX_PARTY}
                          onClick={() => setPeople((value) => Math.min(MAX_PARTY, value + 1))}
                          className="grid h-9 w-9 place-items-center rounded-full border border-night/25 transition-colors duration-300 hover:border-night hover:bg-night hover:text-bone disabled:pointer-events-none disabled:opacity-30"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <fieldset className="sm:col-span-2">
                      <legend className="label text-night/60">Time</legend>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                        {SLOTS.map((slot, index) => (
                          <label key={slot} className="relative cursor-pointer">
                            <input type="radio" name="time" value={slot} required defaultChecked={index === 6} className="peer sr-only" />
                            <span className="block rounded-full border border-night/20 py-2 text-center text-sm font-semibold transition-colors duration-300 hover:border-night peer-checked:border-night peer-checked:bg-night peer-checked:text-bone peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rock">
                              {formatTime(slot)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* Ticket stub */}
                  <div className="relative border-t-2 border-dashed border-night/25 px-6 py-7 md:px-10">
                    <span className={`${notch} -left-3.5`} aria-hidden />
                    <span className={`${notch} -right-3.5`} aria-hidden />
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="min-h-[2.5rem] max-w-[30ch] text-sm leading-snug text-night/60" aria-live="polite">
                        {status === 'error' ? (
                          <span className="font-semibold text-rock">
                            That didn’t go through. Please try again, or call us and we’ll book you in.
                          </span>
                        ) : (
                          'No card needed. We hold tables for fifteen minutes.'
                        )}
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-night px-8 font-semibold text-bone transition-colors duration-300 hover:bg-rock disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" style={{ animationDuration: '0.8s' }} />
                            Sending request
                          </>
                        ) : (
                          'Make a reservation'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

export default BookSection
