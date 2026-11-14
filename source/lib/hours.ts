import { useEffect, useState } from 'react'

/** The grill keeps Arizona time (no daylight saving), wherever the visitor is. */
const TIME_ZONE = 'America/Phoenix'

type DayHours = { open: number; close: number }

const h = (hours: number, minutes = 0) => hours * 60 + minutes

/** Indexed like Date#getDay(): 0 is Sunday. Values are minutes from midnight. */
export const HOURS: DayHours[] = [
  { open: h(8), close: h(21) },
  { open: h(8), close: h(21) },
  { open: h(8), close: h(21) },
  { open: h(8), close: h(21) },
  { open: h(8), close: h(21) },
  { open: h(8), close: h(23) },
  { open: h(8), close: h(23) },
]

export const HOUR_GROUPS = [
  { label: 'Monday – Thursday', days: [1, 2, 3, 4], text: '8 am – 9 pm' },
  { label: 'Friday – Saturday', days: [5, 6], text: '8 am – 11 pm' },
  { label: 'Sunday', days: [0], text: '8 am – 9 pm' },
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60) % 24
  const mins = minutes % 60
  const suffix = hours >= 12 ? 'pm' : 'am'
  const twelve = hours % 12 === 0 ? 12 : hours % 12
  return mins ? `${twelve}:${String(mins).padStart(2, '0')} ${suffix}` : `${twelve} ${suffix}`
}

export type OpenStatus = { open: boolean; label: string; day: number }

export const getOpenStatus = (now: Date = new Date()): OpenStatus => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)

  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = Math.max(0, WEEKDAYS.indexOf(part('weekday')))
  const minutes = (Number(part('hour')) % 24) * 60 + Number(part('minute'))
  const today = HOURS[day]

  if (minutes >= today.open && minutes < today.close) {
    return { open: true, day, label: `Open now · until ${formatMinutes(today.close)}` }
  }

  if (minutes < today.open) {
    return { open: false, day, label: `Closed · opens ${formatMinutes(today.open)}` }
  }

  const tomorrow = HOURS[(day + 1) % 7]
  return { open: false, day, label: `Closed · opens ${formatMinutes(tomorrow.open)} tomorrow` }
}

/** Client-only (null on the server and first paint) so static HTML never goes stale. */
export const useOpenStatus = () => {
  const [status, setStatus] = useState<OpenStatus | null>(null)

  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return status
}
