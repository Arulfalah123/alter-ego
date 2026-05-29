/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ae-red':    '#E63946',
        'ae-dark':   '#080808',
        'ae-card':   '#0f0f0f',
        'ae-border': '#1a1a1a',
        'ae-gray':   '#666666',
        'ae-light':  '#aaaaaa',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
