/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { deepkitType } from '@deepkit/vite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// @ts-expect-error types mismatch
export default defineConfig(({ mode }) => {
  return {
    build: {
      modulePreload: false,
      minify: false,
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
      deepkitType({
        compilerOptions: {
          sourceMap: true,
        },
        tsConfig: join(__dirname, 'tsconfig.json'),
      }),
      nxViteTsPaths(),
    ],
    test: {
      globals: true,
      environment: 'node',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.cache/vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
      'import.meta.env.NX_WORKSPACE_ROOT': JSON.stringify(
        process.env.NX_WORKSPACE_ROOT!,
      ),
      'import.meta.env.NX_PROJECT_ROOT': JSON.stringify(
        join('apps', process.env.NX_TASK_TARGET_PROJECT!),
      ),
    },
  };
});
