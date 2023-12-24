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
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};
