/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      darkText: '#383838',
    },
    fontFamily: {
      "body": ["Roboto", "sans-serif"],
      "K2D": ["Cardo", "sans-serif"]
    },
    screens: {
      // => @media (min-width: 400px) { ... }
      'ssm': '400px',
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