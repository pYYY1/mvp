/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-1': '#8FB339',
        'custom-green-2': '#4B5842',
        'custom-green-3': '#C7D59F',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'lg-1220': '1220px',
      },
    },
  },
  plugins: [],
}
