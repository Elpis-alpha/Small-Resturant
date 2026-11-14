/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './source/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Night over the desert
        night: '#15100C',
        char: '#1F1812',
        soot: '#2B2219',
        // Sandstone
        bone: '#F4EAD8',
        paper: '#EFE2CA',
        dust: '#B5A792',
        // Sunset
        saffron: '#F3B43F',
        ember: '#E8792C',
        rock: '#C9482B',
        maroon: '#7A2A1C',
        // Juniper
        juniper: '#3D5A45',
        sage: '#9DB383',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        pulseDot: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        'spin-slow': 'spin 90s linear infinite',
        'spin-badge': 'spin 22s linear infinite',
        'pulse-dot': 'pulseDot 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
