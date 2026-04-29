import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: {
          DEFAULT: "#6366f1",
          violet: "#a855f7",
          glow: "#8b5cf6",
        },
        ink: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d6d6db",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#0a0a0f",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 7vw, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.045em", fontWeight: "600" }],
        "display-xl": ["clamp(2.5rem, 5.5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "65ch",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
        "gradient-soft": "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.04) 100%)",
        "gradient-radial": "radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0) 100%)",
        "grid-pattern": "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(15, 15, 25, 0.04), 0 4px 12px rgba(15, 15, 25, 0.06)",
        "glow": "0 0 0 1px rgba(99,102,241,0.2), 0 12px 40px rgba(99,102,241,0.18)",
        "card": "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(15,15,25,0.04), 0 8px 24px rgba(15,15,25,0.06)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "blob": "blob 16s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
