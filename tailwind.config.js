/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'elnova-purple': '#2b1548',
        'elnova-yellow': '#ffd84d',
        'elnova-peach': '#ffd8c9',
      },
      fontFamily: {
        heading: ['Marcellus', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
