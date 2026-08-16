/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        boutique: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a0938e',
          600: '#8a7b76',
          700: '#6d5f5b',
          800: '#4a3f3c',
          900: '#2d2422',
          950: '#1a1413',
        },
        gold: {
          50: '#fdf9f0',
          100: '#f9f0db',
          200: '#f3e0b3',
          300: '#ebcb7a',
          400: '#e5b84f',
          500: '#d4a035',
          600: '#b8822a',
          700: '#946424',
          800: '#7a5224',
          900: '#664421',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
