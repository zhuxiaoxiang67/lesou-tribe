/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          ivory: '#FAF8F5',
          cream: '#F5F2EC',
          parchment: '#EDE8DF',
          sand: '#E8E4DB',
          tan: '#D4C4B0',
          wood: '#A08060',
          'wood-dark': '#8B7355',
          'wood-deep': '#6B5344',
          ink: '#2C2C2C',
          'ink-light': '#4A4A4A',
          'ink-muted': '#8B8680',
          vermilion: '#C04A3B',
          jade: '#4A7C59',
          gold: '#D4A84B',
        }
      },
      fontFamily: {
        kai: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', 'Microsoft YaHei', 'sans-serif'],
        title: ['"Ma Shan Zheng"', 'cursive'],
      },
      backgroundImage: {
        'ink-gradient': 'linear-gradient(135deg, #FAF8F5 0%, #EDE8DF 50%, #E8E4DB 100%)',
        'ink-gradient-deep': 'linear-gradient(160deg, #F5F2EC 0%, #EDE8DF 40%, #D4C4B0 100%)',
      },
      boxShadow: {
        'zen': '0 2px 12px rgba(107,83,68,0.08)',
        'zen-hover': '0 6px 24px rgba(107,83,68,0.15)',
        'zen-card': '0 1px 4px rgba(44,44,44,0.06), 0 1px 2px rgba(44,44,44,0.04)',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
}