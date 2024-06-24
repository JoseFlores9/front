/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fruits': "url('/src/assets/images/back.png')",
      },
      colors:{
        "green-principal": "#00C94F",
        "light-green": "#E6FAED",
        "baby-pink": "#FDEAEB",
        "red-alert": "#EB2D37",
        "principal": "#2e2d1d",
        "secondary": "#0c3c01",
        "third":"#5b6d49",
        "fourth":"#a2ac82",
        "fifth":"#f1f2ed"
      },
      borderWidth: {
        '1': '1px'
      },
    },
  },
  plugins: [],
}

