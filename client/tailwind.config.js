/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // or wherever your files are
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: '#FFFFFF',
          text: '#1A1A1A',
          headline: '#111111',
          subheading: '#444444',
          divider: '#E0E0E0',
          muted: '#F4F4F4',
          linkhint: '#888888',
        },
        // Dark mode colors
        dark: {
          background: '#121212',
          text: '#F5F5F5',
          headline: '#FAFAFA',
          subheading: '#BBBBBB',
          divider: '#333333',
          muted: '#1E1E1E',
          linkhint: '#AAAAAA',
        },
      },
    },
  },
  plugins: [],
};

