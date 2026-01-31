import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#6B7280",
        background: "#FFFFFF",
        "background-light": "#F9FAFB",
        "accent-positive": "#10B981",
        "accent-negative": "#EF4444",
        // Gamified color palette
        "vibrant-purple": "#7C3AED",
        "vibrant-blue": "#3B82F6",
        "vibrant-orange": "#F97316",
        "vibrant-red": "#EF4444",
        "vibrant-green": "#10B981",
        "vibrant-pink": "#EC4899",
        "vibrant-yellow": "#F59E0B",
      },
      backgroundImage: {
        // Gradient presets for gamified UI
        "gradient-purple-blue": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
        "gradient-orange-red": "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
        "gradient-green-teal": "linear-gradient(135deg, #10B981 0%, #14B8A6 100%)",
        "gradient-pink-purple": "linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)",
        "gradient-celebration": "linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #7C3AED 100%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      keyframes: {
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "scale-in": "scale-in 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in",
      },
    },
  },
  plugins: [],
};

export default config;
