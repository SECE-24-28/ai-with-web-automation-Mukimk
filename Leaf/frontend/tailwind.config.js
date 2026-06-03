/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4CAF50',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
        },
        background: '#F8FFF8',
        textMain: '#1B1B1B',
      }
    },
  },
  plugins: [],
}
