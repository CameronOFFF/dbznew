/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nebula": {
          900: "#0b0f1f",
          800: "#111730",
          700: "#1b2342",
          600: "#283156",
          500: "#3b4c78",
          400: "#4f67a4",
          300: "#7b93d9",
          200: "#b8c7f5"
        },
        "glow": {
          500: "#f4c95d",
          400: "#ffd27f",
          300: "#ffe3b1"
        }
      }
    }
  },
  plugins: []
};
