import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", "[data-theme=\"dark\"]"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "108rem",
        "3xl": "120rem", // 1920px
        "4xl": "160rem", // 2560px
        "reading-sm": "45ch",
        "reading": "65ch",
        "reading-lg": "75ch",
        "col-sm": "var(--column-max-width-sm, 320px)",
        "col-md": "var(--column-max-width-md, 480px)",
        "col-lg": "var(--column-max-width-lg, 640px)",
        "col": "var(--column-max-width, 480px)",
      },
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
          red: "var(--spectrum-red)",
          "red-orange": "var(--spectrum-red-orange)",
          orange: "var(--spectrum-orange)",
          amber: "var(--spectrum-amber)",
          yellow: "var(--spectrum-yellow)",
          lime: "var(--spectrum-lime)",
          green: "var(--spectrum-green)",
          aqua: "var(--spectrum-aqua)",
          blue: "var(--spectrum-blue)",
          indigo: "var(--spectrum-indigo)",
          violet: "var(--spectrum-violet)",
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "var(--gray-900)",
            lineHeight: "1.6",
            "--tw-prose-body": "var(--gray-900)",
            "--tw-prose-headings": "var(--gray-900)",
            "--tw-prose-lead": "var(--gray-700)",
            "--tw-prose-links": "var(--primary-color)",
            "--tw-prose-bold": "var(--gray-900)",
            "--tw-prose-counters": "var(--gray-700)",
            "--tw-prose-bullets": "var(--gray-900)",
            "--tw-prose-hr": "var(--gray-900)",
            "--tw-prose-quotes": "var(--gray-900)",
            "--tw-prose-quote-borders": "var(--primary-color)",
            "--tw-prose-captions": "var(--gray-700)",
            "--tw-prose-code": "var(--gray-900)",
            "--tw-prose-pre-code": "var(--white)",
            "--tw-prose-pre-bg": "var(--gray-900)",
            "--tw-prose-th-borders": "var(--gray-900)",
            "--tw-prose-td-borders": "var(--gray-300)",
            h1: {
              fontWeight: "800",
              letterSpacing: "-0.03em",
            },
            h2: {
              fontWeight: "700",
              letterSpacing: "-0.02em",
            },
            h3: {
              fontWeight: "800",
            },
            code: {
              fontFamily: "var(--font-mono)",
              backgroundColor: "var(--gray-100)",
              padding: "0.15rem 0.35rem",
              borderRadius: "0px",
              border: "1px solid var(--gray-300)",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              borderRadius: "0px",
              border: "1px solid var(--gray-900)",
              fontFamily: "var(--font-mono)",
            },
            blockquote: {
              borderLeftWidth: "3px",
              borderLeftColor: "var(--primary-color)",
              borderRadius: "0px",
              fontStyle: "normal",
              backgroundColor: "var(--gray-50)",
              padding: "0.75rem 1.25rem",
            },
            table: {
              borderCollapse: "collapse",
              border: "1px solid var(--gray-900)",
            },
            th: {
              backgroundColor: "var(--gray-100)",
              padding: "0.5rem 0.75rem",
              borderBottom: "1px solid var(--gray-900)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            },
            td: {
              padding: "0.5rem 0.75rem",
              borderBottom: "1px solid var(--gray-200)",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
