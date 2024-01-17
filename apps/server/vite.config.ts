/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { deepkitType } from '@deepkit/vite';
import { join } from 'node:path';

// @ts-ignore
export default defineConfig(({ mode }) => {
  const isTestMode = mode === 'test';
  const tsConfig = isTestMode ? join(__dirname, 'tsconfig.spec.json') : join(__dirname, 'tsconfig.app.json');

  return {
    build: {
      target: 'esnext',
      terserOptions: {
        ecma: 2020,
      },
      esbuildOptions: {},
      minify: mode === 'production' && 'terser',
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        output: {
          esModule: true,
          format: 'esm',
          ...(mode === 'development'
            ? {
              entryFileNames: `[name].js`,
              chunkFileNames: `[name].js`,
              assetFileNames: `[name].[ext]`,
            }
            : {}),
        },
        input: join(__dirname, 'src/main.ts')
      },
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      nxViteTsPaths(),
      deepkitType({
        compilerOptions: {
          sourceMap: true,
        },
        tsConfig,
      }),
    ],
    test: {
      environment: 'node',
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.cache/vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
