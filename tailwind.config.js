/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/src/img/abstract_background.jpg')",
        'ul-background': "url('/src/img/pokeball.png')"
      },
      colors: {
        background: 'rgb(var(--color-background) )'
      },
      borderColor: {
        background: '#e2dedd'
      },
      backgroundSize: {
        '80%': '80%'
      }

    }
  },
  plugins: [],
}
