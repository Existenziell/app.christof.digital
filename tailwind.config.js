module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Courier Prime'],
      },
      colors: {
        'brand': '#a6d1c9',
        'brand-dark': '#282b29',
        'cta': '#D6A269',
      },
      backgroundImage: {
        poly: 'url(/icons/poly.svg)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
