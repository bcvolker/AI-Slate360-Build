/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0E13",
          900: "#0B0E13",
          800: "#111827",
          700: "#1F2937",
          600: "#1E293B",
        },
        slate: {
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          400: "#94A3B8",
          950: "#0F172A",
        },
        cyan: {
          DEFAULT: "#00F5FF",
          400: "#00F5FF",
          500: "#00E5FF",
        },
        emerald: { 500: "#10B981" },
        amber:   { 500: "#F59E0B" },
        red:     { 500: "#EF4444" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
