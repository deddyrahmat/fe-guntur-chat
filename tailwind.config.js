/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A4DB',
          100: '#BFEAF8',
          200: '#8FD8F1',
          300: '#60C7E9',
          400: '#30B5E2',
          500: '#00A4DB',
          600: '#0083AF',
          700: '#006283',
          800: '#004258',
          900: '#00212C',
        },
        danger: {
          DEFAULT: '#FB3C3C',
          100: '#FED8D8',
          200: '#FDB1B1',
          300: '#FD8A8A',
          400: '#FC6363',
          500: '#FB3C3C',
          600: '#CC3030',
          700: '#9D2424',
          800: '#6D1818',
          900: '#3E0C0C',
        },
        gray: {
          DEFAULT: '#666666',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#666666',
          600: '#333333',
          700: '#262626',
          800: '#191919',
          900: '#0D0D0D',
        },
      },
    },
  },
  plugins: [],
};
