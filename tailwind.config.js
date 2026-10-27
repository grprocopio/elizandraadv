/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './404.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Cores por variável: cada seção define o próprio tema (claro, escuro, bordô) em src/site.css.
        ground: { DEFAULT: 'rgb(var(--ground) / <alpha-value>)', deep: 'rgb(var(--ground-deep) / <alpha-value>)' },
        ink: { DEFAULT: 'rgb(var(--ink) / <alpha-value>)', muted: 'rgb(var(--ink-muted) / <alpha-value>)' },
        accent: { DEFAULT: 'rgb(var(--accent) / <alpha-value>)', soft: 'rgb(var(--accent-soft) / <alpha-value>)' },
        cta: { DEFAULT: 'rgb(var(--cta) / <alpha-value>)', ink: 'rgb(var(--cta-ink) / <alpha-value>)' },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '84rem' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
