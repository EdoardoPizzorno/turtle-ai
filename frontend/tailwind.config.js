module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "turtle-bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        "head-peek": {
          "0%,100%": { transform: "translateX(0) rotate(0deg)" },
          "50%": { transform: "translateX(2px) rotate(-5deg)" },
        },
        "tail-wag": {
          "0%,100%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(-6deg)" },
        },
        "leg-front": {
          "0%,100%": { transform: "rotate(14deg)" },
          "50%": { transform: "rotate(-10deg)" },
        },
        "leg-back": {
          "0%,100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(14deg)" },
        },
        "ground-move": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-24px)" },
        },
        "shine": {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        "turtle-bob": "turtle-bob 1.4s ease-in-out infinite",
        "head-peek": "head-peek 1.4s ease-in-out infinite",
        "tail-wag": "tail-wag 1.4s ease-in-out infinite",
        "leg-front": "leg-front 0.7s ease-in-out infinite",
        "leg-back": "leg-back 0.7s ease-in-out infinite",
        "ground-move": "ground-move 1.2s linear infinite",
        "shine": 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};
