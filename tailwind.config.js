/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "usil-color": "#06256D",
        "light-white": "rgba(255,255,255,0.18)",
      },
    },
  },
  plugins: [],
}

