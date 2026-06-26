/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-regular": ["Inter_400Regular", "sans-serif"],
      },
      fontSize: {
        "t-12": ["12px", { lineHeight: "18px" }],
        "t-14": ["14px", { lineHeight: "20px" }],
        "t-16": ["16px", { lineHeight: "24px" }],
        "t-18": ["18px", { lineHeight: "28px" }],
        "t-24": ["24px", { lineHeight: "32px" }],
        "t-36": ["36px", { lineHeight: "48px" }],
        "t-72": ["72px", { lineHeight: "80px" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        // ── Semantic tokens — auto-switch light↔dark via CSS variables ──────
        // Use these instead of dark: prefixes. Values are injected by ThemeProvider.
        bg:           "rgb(var(--bg) / <alpha-value>)",
        surface:      "rgb(var(--surface) / <alpha-value>)",
        fg:           "rgb(var(--fg) / <alpha-value>)",
        "fg-2":       "rgb(var(--fg-2) / <alpha-value>)",
        "fg-muted":   "rgb(var(--fg-muted) / <alpha-value>)",
        "ui-border":  "rgb(var(--ui-border) / <alpha-value>)",
        "input-bg":   "rgb(var(--input-bg) / <alpha-value>)",
        "input-border": "rgb(var(--input-border) / <alpha-value>)",
        // ────────────────────────────────────────────────────────────────────

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "#00C389",
        },
        dark: {
          DEFAULT: "#0F172A",
          card: "#1E293B",
        },
        white: "#FFFFFF",
        success: "#12D18E",
        warning: "#FACC15",
        error: "#F75555",
        info: "#5546FF",
        disable: "#D8D8D8",
        black: {
          5: "#FAFAFA",
          10: "#F5F5F5",
          20: "#EEEEEE",
          30: "#E0E0E0",
          40: "#BDBDBD",
          50: "#9E9E9E",
          60: "#757575",
          70: "#616161",
          80: "#424242",
          90: "#212121",
        },
        background: {
          blue: "#F7F9FC",
          green: "#F5FAF8",
          mint: "#F2FFF1",
          lime: "#F6FDF0",
          "lime-dark": "#C8F4A1",
        },
      },
    },
  },
  plugins: [],
};