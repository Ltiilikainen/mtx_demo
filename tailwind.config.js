/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
