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
          400: '#74C69D',
          300: '#95D5B2',
          200: '#B7E4C7',
          100: '#D8F3DC',
          50:  '#F0FFF4',
        },
        gold: {
          600: '#B45309',
          500: '#D4A853',
          400: '#F0C060',
          300: '#F5D080',
          100: '#FEF3C7',
          50:  '#FFFBEB',
        },
      },
    },
  },
  plugins: [],
}
