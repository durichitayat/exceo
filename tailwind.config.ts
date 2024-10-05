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
        foreground: "var(--foreground)",
        primary: {
          light: '#4DD0E1',  // Light Teal for hover states
          DEFAULT: '#0097A7', // Teal for primary buttons and links
          dark: '#006064',    // Dark Teal for active states
        },
        secondary: {
          light: '#FFB74D',   // Light Orange for accents
          DEFAULT: '#FF9800', // Orange for secondary buttons
          dark: '#F57C00',    // Dark Orange for hovers
        },
        neutral: {
          light: '#F5F5F5',   // Light Gray for backgrounds
          DEFAULT: '#9E9E9E', // Gray for borders and subtle text
          dark: '#616161',    // Dark Gray for text
        },
        success: {
          DEFAULT: '#28A745', // Green for success messages
        },
        warning: {
          DEFAULT: '#FFC107', // Yellow for warnings
        },
        danger: {
          DEFAULT: '#DC3545', // Red for error messages
        },
        info: {
          DEFAULT: '#17A2B8', // Teal for informational messages
        },
        background: {
          light: '#FFFFFF',   // White background for cards and sections
          DEFAULT: '#F0F2F5', // Off-white for the main background
        },

      },
    },
  },
  plugins: [],
};
export default config;
