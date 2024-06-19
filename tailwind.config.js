/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans-serif': ['Roboto Thin', 'system-ui', 'sans-serif'],
      'mono': ['"Monaspace Neon"', 'Menlo', 'monospace']
    },
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        myorange: {
          '50': '#fff7f3',
          '100': '#ffece5',
          '200': '#ffd0bf',
          '300': '#ffb399',
          '400': '#ff8e66',
          '500': '#ff6a33',
          '600': '#ff5c26',
          '700': '#ff8859',
          '800': '#cc6a46',
          '900': '#995034'
        },
        mygrey: {
          '50': '#f9f9f9',
          '100': '#efefef',
          '200': '#dfdfdf',
          '300': '#bfbfbf',
          '400': '#9f9f9f',
          '500': '#7f7f7f',
          '600': '#5f5f5f',
          '700': '#2b2b2b',
          '800': '#1e1e1e',
          '900': '#141414'
        }
      }
    },
  },
  plugins: [],
}