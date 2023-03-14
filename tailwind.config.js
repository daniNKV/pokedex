/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/*.html"],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'main-pattern': "url('/src/img/abstract_background.jpg')",
        'ul-background': "url('/src/img/pokeball_inverted.png')"
      },

      gridTemplateRows: {
        '1/3': '1fr 3fr'
      },
      borderColor: {
        'background': '#e2dedd'
      },
      backgroundSize: {
        '50%': '50%'
      },
      fontFamily: {
        custom: ['"Press Start 2P"']
      },
      dropShadow: {
        'custom': ['0 10px 8px rgb(255 255 0 / 0.5)']
      },
    }
  },
  plugins: [],
}
