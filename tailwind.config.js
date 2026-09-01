/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", "[data-theme=\"dark\"]"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "var(--white)",
          muted: "var(--surface-muted)",
          knockout: "var(--true-white)",
        },
        ink: {
          DEFAULT: "var(--gray-900)",
          deep: "var(--true-black)",
          muted: "var(--gray-700)",
          subtle: "var(--gray-500)",
        },
        primary: {
          DEFAULT: "var(--primary-color)",
          hover: "var(--primary-600)",
          active: "var(--success-color)",
        },
        spectrum: {
          red: "var(--secondary-color)",
          orange: "var(--warning-color)",
          yellow: "var(--yellow)",
          green: "var(--success-color)",
          aqua: "var(--accent-aqua)",
          blue: "var(--primary-color)",
          violet: "var(--accent-pink)",
        },
        neutral: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
      fontFamily: {
        sans: ["var(--base-font-family)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        hairline: "1px 1px 1px 0 rgba(128, 128, 128, 0.25)",
      },
    },
  },
  plugins: [],
};
