/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    fontFamily: {
      main : ['Poppins', 'sans-serif']
    },
    extend: {
      width:{
        main : '1220px'
      },
      backgroundColor: {
        'primary': '#F5F5F5',
      },
      color: {
        'primary': 'e5e5e5',
      }
    },
  },
  plugins: [],
}

