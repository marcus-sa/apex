import { join } from 'path';
import { defineConfig } from 'vite';
import { deepkitType } from '@deepkit/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
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
    deepkitType({
      compilerOptions: {
        sourceMap: true,
      },
      tsConfig: join(__dirname, 'tsconfig.app.json'),
    }),
  ],
});
