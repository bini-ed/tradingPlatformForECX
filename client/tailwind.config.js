module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(90%)" },
          to: { transform: "translateX(-90%)" },
        },
      },
    },
  },
  plugins: [],
};
