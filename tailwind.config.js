// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#313338',
        secondary: '#2B2D31',
        tertiary: '#1E1F22',
        accent: '#0098E5',
        'text-light': '#F2F3F5',
        'text-dark': '#B5BAC1',
        'border-color': '#404249',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
