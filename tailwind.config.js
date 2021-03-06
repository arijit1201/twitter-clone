module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#00ADED',
        twittered: '#ED003F'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
