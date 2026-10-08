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
        bg: "#0a0a0f",
        surface: "#12121a",
        "surface-2": "#181824",
        border: "#1e293b",
        "text-strong": "#f8fafc",
        text: "#cbd5e1",
        "text-muted": "#94a3b8",
        accent: {
          DEFAULT: "#06b6d4",
          2: "#3b82f6",
          soft: "rgba(6, 182, 212, 0.12)",
          foreground: "#040810",
        },
        "glow-blue": "rgba(59, 130, 246, 0.15)",
        success: "#10b981",
        focus: "#22d3ee",

        // Compatibility aliases for shadcn UI components
        background: "#0a0a0f",
        foreground: "#cbd5e1",
        card: {
          DEFAULT: "#12121a",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "#12121a",
          foreground: "#f8fafc",
        },
        primary: {
          DEFAULT: "#06b6d4",
          foreground: "#040810",
        },
        secondary: {
          DEFAULT: "#181824",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#181824",
          foreground: "#94a3b8",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" },
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
