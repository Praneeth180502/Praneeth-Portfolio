import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: "#000000",
        surface: "#0c0c0e",
        "surface-2": "#16161a",
        border: "#27272a",
        "border-silver": "#3f3f46",
        "text-strong": "#ffffff",
        text: "#e4e4e7",
        "text-muted": "#a1a1aa",
        accent: {
          DEFAULT: "#ffffff",
          silver: "#d4d4d8",
          2: "#a1a1aa",
          soft: "rgba(255, 255, 255, 0.08)",
          foreground: "#000000",
        },
        "glow-silver": "rgba(228, 228, 231, 0.15)",
        success: "#10b981",
        focus: "#ffffff",

        // Compatibility aliases for shadcn UI components
        background: "#000000",
        foreground: "#e4e4e7",
        card: {
          DEFAULT: "#0c0c0e",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#0c0c0e",
          foreground: "#ffffff",
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#16161a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#16161a",
          foreground: "#a1a1aa",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
