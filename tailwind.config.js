/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0D2B1F',
          800: '#1B4332',
          700: '#2D6A4F',
          600: '#40916C',
          500: '#52B788',
        },
        gold: {
          600: '#B45309',
          500: '#D4A853',
          400: '#F0C060',
          100: '#FEF3C7',
        },
      },
    },
  },
  plugins: [],
}
