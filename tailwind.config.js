/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./source/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,

      // Site colors
      darkText: '#383838',
      lightGreen: '#00ff0014',
      slightGreen: '#00ff0009',
      linkHover: '#3ea74f',
      brightGreen: '#00C914',
      hoverBrightGreen: '#008a0e',
      inputGreen: '#38383845',
    },
    fontFamily: {
      "body": ["Roboto", "sans-serif"],
      "sans": ["Noto Serif Lao", "sans-serif"]
    },
    screens: {
      // => @media (min-width: 400px) { ... }
      'ssm': '400px',
      // => @media (min-width: 500px) { ... }
      'smm': '500px',
      // => @media (min-width: 640px) { ... }
      'sm': '640px',
      // => @media (min-width: 768px) { ... }
      'md': '768px',
      // => @media (min-width: 1024px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1280px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1536px) { ... }
      '2xl': '1536px',
    },
    extend: {
      animation: {
        opacity: 'opacity .5s ease-out 1',
      },
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}