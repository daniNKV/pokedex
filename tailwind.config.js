/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["/*.{html,js}"],
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
        '1/3': '1fr 3fr',
        'hero': '50px repeat(2, 32px) 1fr',
        
      },

      gridTemplateColumns: {
        'about': '1fr 2fr',
        'stats': '1fr 2fr'

      },
      borderColor: {
        'background': '#e2dedd'
      },
      backgroundSize: {
        '50%': '50%',
        '25%': '25%'
      },
      fontFamily: {
        custom: ['"Press Start 2P"'],
        sans: ['"Open Sans']
      },
      dropShadow: {
        'custom': ['0 10px 8px rgb(255 255 0 / 0.5)']
      },
      spacing: {
        '104': '28rem',
      }
    }
  },
  plugins: [],
}
