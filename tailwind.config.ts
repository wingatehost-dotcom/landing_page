import type { Config } from "tailwindcss";

/**
 * Colours are declared once in `src/config/theme.ts` and exposed as CSS
 * variables by the root layout. The classes below simply reference them, so no
 * colour value is duplicated anywhere in the UI.
 */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        third: "var(--color-third)",
        fourth: "var(--color-fourth)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-ethiopic)",
          "system-ui",
          "sans-serif",
        ],
        amharic: ["var(--font-ethiopic)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -24px color-mix(in srgb, var(--color-primary) 30%, transparent)",
        lift: "0 28px 70px -30px color-mix(in srgb, var(--color-primary) 42%, transparent)",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
} satisfies Config;

export default config;
