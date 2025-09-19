/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    // NEW: Center the container and give it sensible padding + breakpoints
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      }
    },
    extend: {
      colors: {
        pg: {
          primary: '#044660',
          secondary: '#0866A0',
          teal: '#02554C',
          blue: '#366FC0', // corrected
          sunset: '#FF7A3F',
        },
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.25)',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 14s ease infinite',
      },
      fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
    display: ['"Playfair Display"', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
  },
    },
    
  },
  plugins: [],
}
