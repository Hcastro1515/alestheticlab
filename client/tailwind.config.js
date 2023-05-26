/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'background': '#ffffff',
      'primaryColor': '#d6ccc2',
      'secondaryColor1': '#e3d5ca',
      'secondaryColor2': '#f5ebe0',
      'accent': '#d5bdaf',
    },
    extend: {},
  },
  plugins: [],
}

