
/** @type {import('tailwindcss').Config} */
import react from '@vitejs/plugin-react'


export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    react(),
    require('flowbite/plugin')
  ],
}

