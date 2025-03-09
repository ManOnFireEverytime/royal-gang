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
        background: "var(--background)",
        foreground: "var(--foreground)",
        saddleBrown: "var(--saddleBrown)",
        goldenRod: "var(--goldenRod)",
        customBlack: "var(--customBlack)",
        cardBg: "var(--cardBg)",
        muted: "var(--muted)",
        customGrey: "var(--grey)",
        customBlue: "var(--blue)",
        lightBlue: "var(--lightBlue)",
        headerBlue: "var(--headerBlue)",
      },
    },
  },
  plugins: [],
} satisfies Config;
