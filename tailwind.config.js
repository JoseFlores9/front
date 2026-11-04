/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'fruits': "url('/src/assets/images/back.png')",
      },
      colors:{
        "green-principal": "#15803D",
        "light-green": "#E7F7EC",
        "baby-pink": "#FDECEC",
        "red-alert": "#DC2626",
        "principal": "#13261C",
        "secondary": "#178A45",
        "third":"#3F6B50",
        "fourth":"#CFE6D3",
        "fifth":"#F8F6EF",
        "accent": "#FF8A3D",
        "accent-dark": "#F06B1A",
        "apple": "#8BD43F",
        "light-gray":"#DCE3DD",
        "gray":"#6B776F"
      },
      borderWidth: {
        '1': '1px'
      },
    },
  },
  plugins: [],
}
