import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'pixel': '0 0 0 8px rgba(0, 0, 0, 0.25), 0 0px 0 15px rgba(0, 0, 0, 0.15)',
      },
    }
  },
  plugins: [],
};
export default config;
