/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greenish: "#59c28e",
        yellowish: "#f6ae32"
      },
    },
  },
  plugins: [],
}
