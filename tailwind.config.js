module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'], // removed ts, tsx
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      scale: ['hover', 'focus'],
      translate: ['hover', 'focus'],
      boxShadow: ['hover', 'focus'],
    },
  },
  plugins: [],
};
