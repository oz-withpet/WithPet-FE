import lineClamp from "@tailwindcss/line-clamp";
import animate from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        line: {
          "100": "#E4E4E6",
          "200": "#F6F6F9",
          "300": "#A6A6A6",
          "900": "#000000",
          light: "#FFCE88",
          strong: "#FF9806",
        },
        gray: {
          "100": "#F6F6F9",
          "200": "#E4E4E6",
          "300": "#A6A6A6",
          "400": "#868688",
          "900": "#000000",
        },
        orange: {
          "100": "#fffdf4",
          "200": "#ffce88",
          "300": "#ff9806",
          "800": "#975800",
        },
        warning: "#EA4335",
        red: {
          strong: "#B3261E",
          report: "#FF0000",
        },
        thumbnail: {
          "100": "#FFCEB2",
          "200": "#FFCE88",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
      maxWidth: {
        layout: "1200px",
        wrapper: "1024px",
        main: "972px",
        modal: "600px",
        edit: "500px",
        big: "470px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [lineClamp, animate],
};

export default config;
