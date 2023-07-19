/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      darkBlue: '#41197F',
      lightPurple: '#8958A3',
      darkYellow: '#FCC436',
      lightRed: '#E44343',
      lightYellow: '#FCDC36',
      typeBlack: '#1A1B1C',
      lightGray: '#B1B1B1',
      typeGray: '#797D86',
      typeGray2: '#D9D9D9',
    },
    extend: {
      width: {
        360: '360px',
      },
      height: {
        640: '640px',
      },
      backgroundImage: {
        // 'icon-Recipes': "url('./src/images/iconRecipes')",
      },
    },
  },
  plugins: [],
};
