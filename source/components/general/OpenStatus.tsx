import { useOpenStatus } from '@/source/lib/hours'

/** Live "open now" indicator, computed in the restaurant's own time zone. */
const OpenStatus = ({ className = '' }: { className?: string }) => {
  const status = useOpenStatus()

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-live="polite">
      <span className="relative flex h-2 w-2">
        {status?.open && <span className="absolute inset-0 animate-pulse-dot rounded-full bg-sage" />}
        <span
          className={`relative h-2 w-2 rounded-full transition-colors duration-500 ${
            status ? (status.open ? 'bg-sage' : 'bg-ember') : 'bg-current opacity-30'
          }`}
        />
      </span>
      <span className={`transition-opacity duration-500 ${status ? 'opacity-100' : 'opacity-0'}`}>
        {status?.label ?? 'Checking the kitchen'}
      </span>
    </span>
  )
}

export default OpenStatus
