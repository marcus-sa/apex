import { join } from 'node:path';
import { defineConfig } from 'vite';
import { deepkitType } from '@deepkit/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { angular } from '@analogjs/vite-plugin-angular/src/lib/angular-vite-plugin';

export default defineConfig(({ mode }) => {
  const isTestMode = mode === 'test';
  const tsConfig = isTestMode ? join(__dirname, 'tsconfig.spec.json') : join(__dirname, 'tsconfig.app.json');

  return {
    optimizeDeps: {
      exclude: ['@deepkit/rpc'],
      esbuildOptions: {
        target: 'esnext',
      },
    },
    build: {
      target: 'esnext',
    },
    plugins: [
      nxViteTsPaths(),
      isTestMode && angular({ tsconfig: tsConfig }),
      deepkitType({
        compilerOptions: {
          sourceMap: true,
        },
        tsConfig,
      }),
    ],
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      reporters: ['default'],
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.spec.ts'],
      deps: {
        optimizer: {
          web: {
            exclude: ['rxjs', '@deepkit/rpc'],
          },
        }
      },
    },
  };
});
