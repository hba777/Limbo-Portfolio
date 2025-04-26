/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}', // scans all your pages
      './components/**/*.{js,ts,jsx,tsx}', // if you have components
      './app/**/*.{js,ts,jsx,tsx}', // just in case you use app/ folder
    ],
    theme: {
      extend: {
        colors: {
          limbo: {
            background: '#0d0d0d', // dark background color
            text: '#ffffff', // white text
            accent: '#00FFC6', // neon accent color (you can change this)
          },
        },
        fontFamily: {
          sans: ['var(--font-orbitron)', 'sans-serif'], // Orbitron globally
        },
        backgroundImage: {
          'limbo-noise': "url('/noise-texture.png')", // optional texture if you add one
        },
      },
    },
    plugins: [],
  }
  