const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { addDynamicIconSelectors } = require('@iconify/tailwind');
const { join } = require('node:path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        bold: 'SpaceGrotesk-Bold',
        light: 'SpaceGrotesk-Light',
        medium: 'SpaceGrotesk-Medium',
        regular: 'SpaceGrotesk-Regular',
        'semi-bold': 'SpaceGrotesk-SemiBold'
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};
