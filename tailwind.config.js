/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        klh: {
          navy: '#0b192c',
          slate: '#1e3e62',
          gold: '#d4af37',
          goldLight: '#f1c40f',
          light: '#f8fafc',
          dark: '#030712'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
