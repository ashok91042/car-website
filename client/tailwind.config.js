/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16130e',
        paper: '#f5f0e8',
        accent: '#e8462b',
        accentDark: '#c7391f',
        highlight: '#ffd23f',
        muted: '#8a8378',
        smoke: '#efe9de',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        brutal: '6px 6px 0 0 #16130e',
        'brutal-sm': '3px 3px 0 0 #16130e',
        'brutal-accent': '6px 6px 0 0 #e8462b',
      },
    },
  },
  plugins: [],
};
