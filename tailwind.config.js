/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        choice: {
          1: '#fecaca', // red-200
          2: '#fed7aa', // orange-200
          3: '#fef08a', // yellow-200
          4: '#d9f99d', // lime-200
          5: '#bbf7d0', // green-200
        },
      }
    },
  },
  plugins: [],
}
