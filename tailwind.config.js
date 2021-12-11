module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'fluffy': '#fd9143',
      'fluffy-darker': '#fd7a1c'
      }
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}