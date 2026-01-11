/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdfbf7',
          100: '#f8f4ed',
          200: '#f0e8d9',
          300: '#e7dcc5',
          400: '#dfd0b1',
          500: '#d6c49d',
          600: '#c4ad7d',
          700: '#a38d5d',
          800: '#826e3e',
          900: '#614f1f',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#aab7aa',
          400: '#8e9f8e',
          500: '#728772',
          600: '#5b6c5b',
          700: '#445144',
          800: '#2d362d',
          900: '#161b16',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


