/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        patternOne: "#5E548E",
        patternTwo: "#9F86C0",
        patternThree: "#BE95C4",
        patternFour: "#231942",
        patternFive: "#E0B1CB",
      },
      screens: {
        'xxs': '340px',
      },
    },
  },
  plugins: [],
};
