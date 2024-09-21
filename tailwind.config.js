/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins:"Poppins, sans-serif"
      },
      colors:{
        lightBlue:"#0E2F44",
        greenBg:"#0E272E"
      },
      backgroundColor: {
        'custom-gradient': 'linear-gradient(180deg, #051617 0%, #135960 100%)',
      },
    },
  },
  plugins: [],
}