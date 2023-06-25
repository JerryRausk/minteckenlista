/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      "custom-link": "RGBA(5, 99, 193, 1)",
      "custom-background": "RGBA(252, 255, 255, 1)",
      "custom-success-light": "RGBA(190, 247, 195, 1)",
      "custom-success": "#2E933C",
      "custom-inactive": "#697771",
      "custom-first": "#012A36",
      "custom-second": "#29274C",
      "custom-third": "#AC80A0",
      "custom-fourth": "#FEFFEA",
      "custom-fifth": "#CCDAD1",
    },
    width: {"40p": "40%"}
    }
  },
  plugins: [],
}

