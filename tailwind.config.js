/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        slate: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        emerald: {
          400: "#34d399",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
