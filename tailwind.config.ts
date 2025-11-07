import lineClamp from "@tailwindcss/line-clamp";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기본 배경 & 선 색상
        background: {
          DEFAULT: "#ffffff", // 기본 흰색 배경
          100: "#FFFDF4", // 연한 주황 포인트 배경
        },
        line: {
          light: "#FFCE88",
          strong: "#FF9806",
          100: "#E4E4E6",
          200: "#F6F6F9",
          300: "#A6A6A6",
          900: "#000000",
        },

        // 텍스트 관련
        gray: {
          100: "#F6F6F9",
          200: "#E4E4E6",
          300: "#A6A6A6",
          400: "#868688",
          900: "#000000",
        },
        orange: {
          100: "#fffdf4",
          200: "#ffce88",
          300: "#ff9806",
          800: "#975800",
        },

        // 경고 / 오류 관련
        warning: "#EA4335",
        red: {
          strong: "#B3261E",
          report: "#FF0000",
        },

        // 썸네일
        thumbnail: {
          100: "#FFCEB2",
          200: "#FFCE88",
        },
      },
      width: {
        layout: "1200px",
        wrapper: "1024px",
        main: "972px",
        modal: "600px",
        edit: "500px",
        big: "470px",
      },

      // 기본 레이아웃 너비
      maxWidth: {
        layout: "1200px",
        wrapper: "1024px",
        main: "972px",
        modal: "600px",
        edit: "500px",
        big: "470px",
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
