import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowDown = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const Minus = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 12h12" />
  </svg>
)

export const Plus = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 6v12M6 12h12" />
  </svg>
)

export const Check = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

/** The house mark: a sun with eight soft rays. Used as a divider glyph throughout. */
export const Sun = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <circle cx="12" cy="12" r="4.6" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x="11" y="0.5" width="2" height="4.6" rx="1" transform={`rotate(${i * 45} 12 12)`} />
    ))}
  </svg>
)
