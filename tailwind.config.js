/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9e32f7',
          100: '#fbfafe',
          200: '#f4eaff',
          300: '#eedeff',
          400: '#e6cfff',
          500: '#dcbeff',
          600: '#cea6ff',
          700: '#be85ff',
          800: '#8f25e3',
          900: '#460774',
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
