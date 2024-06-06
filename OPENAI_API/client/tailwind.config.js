/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': 'rgb(44, 44, 62)',
        'custom-border': 'rgb(26,27,41)',
        


      },
      backgroundImage: {
        'gradient-button': 'linear-gradient(327deg, rgba(214,5,175,0.2), rgba(5,31,182,0.8))',
      },
    },
  },
  plugins: [],
}