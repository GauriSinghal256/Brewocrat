/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Golden Malt Palette
        'brewery-brown': '#6B3D2E',
        'golden-malt': '#D9A441',
        'sandstone': '#E9D7B8',
        'terracotta': '#C76B42',
        'espresso': '#292421',
        // Theme Aliases
        golden: '#D9A441',
        copper: '#C76B42',
        'burnt-orange': '#C76B42',
        'ochre-red': '#6B3D2E',
        'warm-cream': '#E9D7B8',
        gold: {
          300: '#F3D28E',
          400: '#E2B75A',
          500: '#D9A441',
          600: '#C76B42',
          700: '#6B3D2E',
        },
        dark: {
          950: '#1A1614',
          900: '#292421',
          800: '#342D29',
          700: '#453C36',
          600: '#5A4E46',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        script: ['Caveat', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        cursive: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D9A441 0%, #C76B42 50%, #6B3D2E 100%)',
        'dark-overlay': 'linear-gradient(to bottom, rgba(41, 36, 33, 0.85), rgba(41, 36, 33, 0.96))',
      }
    },
  },
  plugins: [],
}
