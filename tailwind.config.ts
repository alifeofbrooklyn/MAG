import type { Config } from "tailwindcss";

/**
 * สีหลักของแบรนด์ MAG CONSULTANT — แก้ที่นี่ที่เดียว ทั้งเว็บจะเปลี่ยนตาม
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", lg: "2rem" } },
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F3A", 900: "#071528", 800: "#0B1F3A", 700: "#12294A" },
        brand: { DEFAULT: "#124E78", dark: "#0E3F62" },
        accent: { DEFAULT: "#2E86AB", light: "#5BA9CB" },
        sky: { soft: "#EAF3F8" },
        ink: "#1F2933",
      },
      fontFamily: {
        sans: ['"Inter Variable"', '"Noto Sans Thai Variable"', "system-ui", "sans-serif"],
      },
      maxWidth: { "8xl": "88rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,.04), 0 8px 24px -12px rgba(11,31,58,.18)",
        lift: "0 2px 4px rgba(11,31,58,.06), 0 20px 40px -16px rgba(11,31,58,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
