/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        green: {
          50:  '#f0faf2',
          100: '#d8f3dd',
          200: '#b4e6bc',
          300: '#7fd091',
          400: '#4bb563',
          500: '#2a9444',
          600: '#1a7a32',
          700: '#165f28',
          800: '#144d22',
          900: '#0e3318',
          950: '#071a0d',
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.14)',
        float: '0 8px 32px rgba(0,0,0,0.18)',
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      animation: {
        'fade-up': 'fadeUp .5s ease forwards',
        'pulse-dot': 'pulseDot 1.4s infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseDot: { '0%,80%,100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
