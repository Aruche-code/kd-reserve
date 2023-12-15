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
        "kd-main-cl": "#cce1ee",
        "kd-sub-cl": "#1a4f77",
        "kd-sub2-cl": "#1b4c6a",
        "kd-button-cl": "#1facf3",
        "kd-black-cl": "#052238",
        "kd-white-cl": "#e8f7fd",
      },
      //カスタムワイド
      width: {
        "46": "11.5rem",
      },
    },
    fontSize: {
      'xxs' : '.7rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    }
  },
  plugins: [
    // formデザインの一貫性を持たせるためのカスタムスタイル
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;
