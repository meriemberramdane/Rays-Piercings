/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          soft: "#111111",
          card: "#181818",
          line: "#262626",
        },
        bone: {
          DEFAULT: "#FFFFFF",
          dim: "#A1A1AA",
          faint: "#6B6B73",
        },
        silver: {
          DEFAULT: "#C7C9CC",
          light: "#E8E9EB",
          mid: "#9A9DA3",
          deep: "#717479",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "metal-gradient":
          "linear-gradient(135deg, #717479 0%, #C7C9CC 25%, #F4F4F5 50%, #C7C9CC 75%, #717479 100%)",
        "metal-radial":
          "radial-gradient(circle at 30% 30%, #F4F4F5, #C7C9CC 45%, #717479 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(199, 201, 204, 0.15)",
        "glow-sm": "0 0 20px rgba(199, 201, 204, 0.1)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};
