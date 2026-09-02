/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spiritual: {
          50: '#FDF8F6',
          100: '#FBF0EB',
          200: '#F7DDD3',
          300: '#F2C1B1',
          400: '#E99B85',
          500: '#DE7358',
          600: '#C75338',
          700: '#A43F28',
          800: '#863624',
          900: '#6E2F21',
        },
        roseBlush: {
          50: '#FFF5F7',
          100: '#FFE9ED',
          200: '#FFD4DD',
          300: '#FFB1C0',
          400: '#FF7F9A',
          500: '#F44B71',
          600: '#DF2452',
          700: '#BC163E',
          800: '#9C1636',
          900: '#831732',
        },
        sacredGold: {
          50: '#FDFBF5',
          100: '#F9F5E6',
          200: '#F2E8C4',
          300: '#E8D497',
          400: '#DCBD6B',
          500: '#C8A344',
          600: '#B08832',
          700: '#8E6727',
          800: '#735223',
          900: '#5F431F',
        },
        maroon: {
          50: '#FDF4F5',
          100: '#FBE8EA',
          200: '#F7D4D7',
          300: '#EEB1B7',
          400: '#E1828D',
          500: '#CF5664',
          600: '#B53746',
          700: '#8A202D',
          800: '#6C1B24',
          900: '#4D1219',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FDFCF6',
          200: '#FAF8EB',
          300: '#F5F1D7',
          400: '#EDE4B9',
          500: '#E2D396',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        hindi: ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(222, 115, 88, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'sacred': '0 10px 30px -5px rgba(200, 163, 68, 0.15)',
        'card': '0 2px 12px rgba(164, 63, 40, 0.06)',
      },
      animation: {
        'gentle-pulse': 'gentlePulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gentlePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
};
