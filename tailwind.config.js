/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#B7C8E6',
          100: '#9EAFCD',
          200: '#8596B4',
          300: '#6B7C9A',
          400: '#526381',
          500: '#384967',
          600: '#2B3C5A',
          700: '#1F304E',
          800: '#122341',
        },
      },
    },
  },
  plugins: [],
};
