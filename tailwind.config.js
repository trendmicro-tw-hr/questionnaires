const { nextui } = require("@nextui-org/react");
const { DefinePlugin } = require("webpack");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        0: "0 0 auto",
      },
      backgroundImage: {
        TrendMicro: "linear-gradient(180deg, #000000, #d71920)",
      },
      height: {
        "half-screen": "50vh",
      },
      backgroundPosition: {
        "top-20": "center top -5rem",
      },
      colors: {
        TrendMicro: "#d71920",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            danger: {
              DEFAULT: "#d71920",
              foreground: "#ffffff",
            },
            focus: "#d71920",
          },
        },
      },
    }),
    new DefinePlugin({
      "process.env.HASH_ROUTER": JSON.stringify(
        process.env.HASH_ROUTER || "false"
      ),
    }),
  ],
};
