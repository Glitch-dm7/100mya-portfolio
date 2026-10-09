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
        montserrat: ['Montserrat', 'sans-serif'],
        nanum: ['Nanum Myeongjo', 'serif'],
        annie: ['"Annie Use Your Telescope"', 'cursive'],
        spicyrice: ['"Spicy Rice"', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
