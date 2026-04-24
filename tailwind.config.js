/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'Helvetica', 'Arial', 'sans-serif'],
      sara: 'Sarala',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f63aa',
        },
        accent: '#e1201c',
      },
      screens: {
        'xxs': '320px',
        // => @media (min-width: 320px) { ... }

        'xs': '480px',
        // => @media (min-width: 480px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
     
    },
  },
  
  plugins: [],
}

