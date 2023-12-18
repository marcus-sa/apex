/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deepkitType } from '@deepkit/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/engine',

  plugins: [
    nxViteTsPaths(),
    // @ts-expect-error types mismatch
    deepkitType({
      compilerOptions: {
        sourceMap: true,
      },
      tsConfig: join(__dirname, 'tsconfig.json'),
    }),
    /*dts({
      entryRoot: 'src',
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),*/
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/libs/engine',
    reportCompressedSize: true,
    modulePreload: false,
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'engine',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['*'],
      preserveEntrySignatures: 'strict',
      output: {
        esModule: true,
        format: 'esm',
      },
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/engine',
      provider: 'v8',
    },
  },
});
