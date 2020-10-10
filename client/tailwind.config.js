module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      height: { "1/3vh": "33.33333vh", "1/3": "33.33333%" },
      colors: { baseBlack: "#0E121B", baseGray: "#171C26" },
      boxShadow: {
        note: "0 0 30px 0 rgba(0, 0, 0, 0.75)",
      },
      inset: {
        10: "10%",
        20: "20%",
        30: "30%",
        40: "40%",
        50: "50%",
        60: "60%",
        70: "70%",
        80: "80%",
        90: "90%",
      },
    },
  },
  variants: {},
  plugins: [],
};
