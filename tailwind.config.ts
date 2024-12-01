import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "14px",
      },
      colors: {
        foreground: "var(--foreground)",
        primary: {
          light: '#AEDFF7',  // Soft Sky Blue for hover states
          DEFAULT: '#0066d4', // Electric Blue for primary buttons and links
          dark: '#0056B3',    // Darker Electric Blue for active states
        },
        secondary: {
          light: '#FFBB66',   // Light Orange for accents
          DEFAULT: '#FF7F11', // Vibrant Orange for secondary buttons
          dark: '#CC6600',    // Darker Orange for hovers
        },
        neutral: {
          light: '#F5F5F5',   // Light Gray for backgrounds
          DEFAULT: '#3C4858', // Slate Gray for text and subtle UI elements
          dark: '#212529',    // Charcoal Black for bold text and headers
        },
        success: {
          DEFAULT: '#28A745', // Emerald Green for success messages
        },
        warning: {
          DEFAULT: '#FFC107', // Light Gold for warnings
        },
        danger: {
          DEFAULT: '#DC3545', // Red for error messages
        },
        info: {
          DEFAULT: '#17A2B8', // Teal for informational messages
        },
        background: {
          light: '#FFFFFF',   // White background for cards and sections
          DEFAULT: '#F5F5F5', // Light Gray for the main background
        },
      },
    },
  },
  plugins: [],
};
export default config;
