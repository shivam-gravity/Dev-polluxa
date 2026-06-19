/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        opensans: ["var(--font-opensans)"],
        poppins: ["var(--font-poppins)"],
        notoSansArabic: ["var(--font-notoSansArabic)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        "primary-dark-gray": "#333333",
        "secondary-blue": "#0D8AFD",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("nth-child-3", "&:nth-child(3)");
    },
  ],
};
