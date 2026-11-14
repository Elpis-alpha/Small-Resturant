/**
 * Sedona's skyline in two flat layers. The front layer is the same red as the
 * section below it, so the reservation block rises out of the rock.
 */
const Mesas = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 260"
    preserveAspectRatio="xMidYMax slice"
    className={`block w-full ${className}`}
    aria-hidden
  >
    <g fill="#F4EAD8" opacity="0.5">
      <circle cx="96" cy="38" r="1.4" />
      <circle cx="312" cy="72" r="1" />
      <circle cx="468" cy="22" r="1.6" />
      <circle cx="702" cy="58" r="1" />
      <circle cx="884" cy="18" r="1.3" />
      <circle cx="1068" cy="66" r="1.5" />
      <circle cx="1236" cy="30" r="1" />
      <circle cx="1392" cy="78" r="1.4" />
    </g>
    <circle cx="1010" cy="150" r="64" fill="#F3B43F" />
    <path
      fill="#7A2A1C"
      d="M0 260V168h54l14-30h82l10-22h74l16 34h58l22 32h96l18-52h16l8-42h20l6-22h26l6 24h24l10 40h54l22 44h138l22-28h82l18-32h112l16 32h76l20 32h100l16-52h26l8-26h54l10 26h40l22 38h70v94Z"
    />
    <path
      fill="#C9482B"
      d="M0 260v-52h92l20-26h152l24 30h96l20-20h120l16-26h106l20 32h160l26 22h114l20-32h152l20-26h110l26 42h154v56Z"
    />
  </svg>
)

export default Mesas
