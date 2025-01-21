import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");
const config: Config = {
  content: [
    "./node_modules/flyonui/dist/js/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors(),
  ],
  flyonui: {
    themes: ["corporate"],
  },
};
export default config;
