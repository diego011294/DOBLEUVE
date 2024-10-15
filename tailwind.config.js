/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        pontano: ['Pontano Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-three': 'linear-gradient(to right, #A989AE,#FFA07D,#FCBF80)',
      },
    },
  },
  plugins: [],
}