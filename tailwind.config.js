/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#06112A',
          900: '#0A1B38',
          850: '#0E2244',
          800: '#132B52',
          700: '#1D3B6B',
        },
        ivory: {
          DEFAULT: '#F4EFE5',
          200: '#E9E1D2',
          muted: '#B8C3D6',
        },
        amber: {
          DEFAULT: '#D8A25A',
          soft: '#E9C690',
          deep: '#8A5A1E',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Didot', '"Bodoni 72"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '84rem' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
