import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: '#C47B2B',
        'amber-light': '#E8A84C',
        'amber-dark': '#9A5F1E',
        emerald: '#1B7A5A',
        'emerald-light': '#2A9E74',
        carbon: '#2C3E50',
        parchment: '#FAFAF7',
        sand: '#F0EDE6',
        'soft-black': '#1A1A1A',
        'warm-gray': '#6B7280',
      },
      fontFamily: {
        lora: ['var(--font-lora)', 'serif'],
        'work-sans': ['var(--font-work-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
