module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 35s linear infinite",
        border:
          "transition linear infinite ease-in-out border-[5px] border-red-200 duration-300",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(90%)" },
          to: { transform: "translateX(-90%)" },
        },
        border: {
          from: { transform: "border-opacity-100" },
          to: { transform: "border-opacity-20" },
        },
      },
    },
  },
  plugins: [],
};
