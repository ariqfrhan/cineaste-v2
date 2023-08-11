/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        header: '560px',
        rate: '400px',
      },

      fontSize:{
        h1: '2.6rem',
      },

      screens: {
        xs: '475px',
      },

      colors : {
        primary: '#13C5B4ff',
        secondary: '#0D4A44ff',
        gunmetal: '#0D2225ff',
        richblack: '#0F1219ff',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}