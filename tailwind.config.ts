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
        "c-black_400": "#bdbdbd",
        "c-black_500": "#999",
        "c-black_600": "#737373",
        "c-black_700": "#4d4d4d",
        "c-black_800": "#333",
        "c-black_900": "#1a1a1a",
      },
      //カスタムワイド
      width: {
        "46": "11.5rem",
      },
      fontSize: {
        xxs: ".7rem",
      },

      height: {
        "kd-90-h": "98%",
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
