/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        10: '10%',
        90: '90%',
      },
    },
  },
  plugins: [],
};
