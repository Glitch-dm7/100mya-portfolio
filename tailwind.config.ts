import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        logo: `#8A6C59`,
        background: "#FFFCF2",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        nanum: ["var(--font-nanum)", "serif"],
        annie: ["var(--font-annie)", "cursive"],
        spicyrice: ["var(--font-spicy-rice)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
