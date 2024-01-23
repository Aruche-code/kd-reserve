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
        "c-black_100": "#f7f7f7",
        "c-black_200": "#ebebeb",
        "c-black_300": "#d9d9d9",
        "kd-b": "#fefefe",
        "kd-m": "#f1f5f7",
        "kd-s": "#3a5f74",
        "kd-a_100": "#38aac9",
        "kd-a_200": "#4dB8e8",
      },
      //カスタムワイド
      width: {
        "46": "11.5rem",
      },
      height: {
        "kd-90-h": "98%",
      },
      fontSize: {
        xxs: ".7rem",
      },
      spacing: {
        "100px": "100px",
      },
      boxShadow: {
        "custom-blue": "0 0 10px rgba(0, 0, 255, 0.2)",
        "custom-green": "0 0 10px rgba(0, 255, 0, 0.2)",
      },
    },
  },
  plugins: [
    // formデザインの一貫性を持たせるためのカスタムスタイル
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;
