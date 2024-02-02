/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.833rem",
        base: "1rem",
        lg: "1.44rem",
        xl: "1.728rem",
        "2xl": "2.074rem",
        "3xl": "2.488rem",
        "4xl": "2.986rem",

        "md-lg": "1.266rem",
        "md-xl": "1.424rem",
        "md-2xl": "1.602rem",
        "md-3xl": "1.802rem",
        "md-4xl": "2.027rem"
      }
    }
  },
  plugins: []
};
