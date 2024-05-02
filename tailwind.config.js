/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-dark-search':'#212121',
        'mouseFollowDiv1':'#4b1963',
        'mouseFollowDiv2':'#8762d0',
        'texthover':'#fcf0e0'
      }
    },
  },
  plugins: [],
}

