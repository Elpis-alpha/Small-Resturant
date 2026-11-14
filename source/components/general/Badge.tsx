import { useId } from 'react'
import { Sun } from './Icons'

/**
 * A slowly turning ring of text around the sun mark, like a stamp on a menu.
 * The caller positions it (pass `absolute` or `relative` plus a size and colours).
 */
const Badge = ({ text, className = '' }: { text: string; className?: string }) => {
  const id = useId()

  return (
    <div className={`grid aspect-square place-items-center rounded-full ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-badge motion-reduce:animate-none">
        <defs>
          <path id={id} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <text className="fill-current font-sans text-[9.4px] font-semibold uppercase" letterSpacing="2.6">
          <textPath href={`#${id}`} textLength="272">
            {text}
          </textPath>
        </text>
      </svg>
      <Sun className="relative h-[26%] w-[26%]" />
    </div>
  )
}

export default Badge
