/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#1d2926',
        paper: '#f5f1e8',
        rust: '#b85c38',
        moss: '#63735a',
        line: '#d9d1c2'
      }
    }
  },
  plugins: []
};
