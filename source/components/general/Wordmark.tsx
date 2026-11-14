/** Typographic logo: a half-risen sun over the name. */
const Wordmark = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 40 24" className="h-[1.05em] w-auto" aria-hidden>
      <path d="M2 22a18 18 0 0 1 36 0Z" fill="#7A2A1C" />
      <path d="M7 22a13 13 0 0 1 26 0Z" fill="#C9482B" />
      <path d="M12 22a8 8 0 0 1 16 0Z" fill="#E8792C" />
      <path d="M16.5 22a3.5 3.5 0 0 1 7 0Z" fill="#F3B43F" />
      <rect x="0" y="22" width="40" height="2" rx="1" fill="currentColor" />
    </svg>
    <span className="font-display text-[1.35em] font-extrabold leading-none tracking-[-0.02em]">
      Fresh Bites
    </span>
  </span>
)

export default Wordmark
