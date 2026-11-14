import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { scrollToHash } from '@/source/lib/scroll'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: `#${string}` }

/** In-page link that hands scrolling to the smooth-scroll engine. */
const AnchorLink = ({ href, onClick, children, ...rest }: Props) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    scrollToHash(href)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export default AnchorLink
