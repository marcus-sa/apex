import { composePlugins, withNx } from '@nx/webpack';
import { withDeepkit } from '@deepkit-modules/nx-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';

// eslint-disable-next-line import/no-default-export
// @ts-ignore
export default composePlugins(withNx(), withDeepkit(), (config) => ({
  ...config,
  target: 'es2022',
  experiments: {
    ...config.experiments,
    outputModule: true,
    topLevelAwait: true,
  },
  externalsPresets: {
    node: true,
  },
  output: {
    ...config.output,
    filename: 'main.mjs',
    module: true,
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
  externals: nodeExternals({ type: 'module', importType: 'module' }),
}));
