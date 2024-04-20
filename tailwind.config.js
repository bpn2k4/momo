/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rgb: {
          50: 'rgb(50,50,50)',
          105: 'rgb(105,105,105)',
          230: 'rgb(230,230,230)',
          235: 'rgb(235,235,235)',
        },
        primary: 'rgb(235, 46, 150)',
        lightBlue: 'rgb(233, 243, 253)'
      },
    },
  },
  plugins: [],
}
