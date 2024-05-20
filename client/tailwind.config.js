/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        navBg: "#D8D8D8",
        primary: "#272838",
        secondary: "#646F58"
      },
      boxShadow: {
        modal: '2px 2px 3px rgba(39,40,56,1)'
      }
    },
  },
  plugins: [],
}

