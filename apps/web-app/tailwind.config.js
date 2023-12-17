/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        outline: "0px -2px 0px #c40 inset",
        hover: "0 0 5px #c40 inset",
      },
      colors: {
        text1: "hsl(var(--text1) / <alpha-value>)",
        text2: "hsl(var(--text2) / <alpha-value>)",
        surface1: "hsl(var(--surface1) / <alpha-value>)",
        surface2: "hsl(var(--surface2) / <alpha-value>)",
        surface3: "hsl(var(--surface3) / <alpha-value>)",
        surface4: "hsl(var(--surface4) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        error: "hsl(var(--error) / <alpha-value>)",
        clearest: "hsl(var(--clearest) / <alpha-value>)",
      },
      gridTemplateColumns: {
        // 16 column grid
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
      },
    },
  },
  plugins: [],
};
