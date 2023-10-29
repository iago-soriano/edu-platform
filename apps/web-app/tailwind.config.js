/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        acc: "hsl(var(--color-acc) / <alpha-value>)",
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        txt: "hsl(var(--color-txt) / <alpha-value>)",
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
