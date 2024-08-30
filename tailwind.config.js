/** @type {import('tailwindcss').Config} */
export default {
  content: ["./formkit.theme.ts"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#e6f5ff",
          100: "#d1ecff",
          200: "#acdaff",
          300: "#7bbeff",
          400: "#4792ff",
          500: "#1e64ff",
          600: "#003fff",
          700: "#0042ff",
          800: "#0039db",
          900: "#052a99",
          950: "#041962",
        },
      },
    },
  },
  plugins: [],
};
