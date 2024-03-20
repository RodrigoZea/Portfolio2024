/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        golos: ['"Golos Text"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'purple-main': '#5622e2',
        'purple-dark': '#1c0852',
        'purple-main-dark': "#a287ec",
        'purple-subtitle-dark': "#7147e2",
        'sea-white': "#c4e1f5"
      }
    },
  },
  plugins: [],
}

