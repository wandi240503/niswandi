/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#C6F221',
          hover: '#D4FF00',
          dark: '#9EC217',
          glow: 'rgba(198, 242, 33, 0.25)',
        },
        dark: {
          bg: '#0a0b0e',
          surface: '#121519',
          card: '#16191f',
          cardHover: '#1c2027',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(198, 242, 33, 0.35)',
          muted: '#8E95A2',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'Syne', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}

