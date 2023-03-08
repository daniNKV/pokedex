/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/src/img/abstract_background.jpg')",
      },
      colors: {
        background: 'rgb(var(--color-background) )'
      },
      borderColor: {
        background: '#e2dedd'
      }
    }
  },
  plugins: [],
}
