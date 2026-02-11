// File: tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            colors: {
                background: "var(--background-dark)",
                foreground: "var(--foreground)", // Still useful if we define a foreground color
                'neon-blue': 'var(--neon-blue)',
                'neon-pink': 'var(--neon-pink)',
                'neon-purple': 'var(--neon-purple)',
                'neon-cyan': 'var(--neon-cyan)',
                'glass-bg': 'var(--glass-bg)',
                'glass-border': 'var(--glass-border)',
                'button-bg': 'var(--button-bg)',
                'button-hover-bg': 'var(--button-hover-bg)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-medium': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', // New pulse speed
            },
            boxShadow: {
                'neon-glow': '0 0 10px var(--neon-blue), 0 0 20px var(--neon-cyan)',
                'button-glow-hover': '0 0 8px rgba(0, 229, 255, 0.4), 0 0 15px rgba(0, 229, 255, 0.2)',
                'button-equals-glow': '0 0 15px var(--neon-cyan), 0 0 30px rgba(0, 229, 255, 0.4)'
            }
        },
    },
    plugins: [],
} satisfies Config;
