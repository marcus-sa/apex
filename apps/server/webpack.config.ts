import { composePlugins, withNx } from '@nx/webpack';
import { withDeepkit } from '@deepkit-modules/nx-webpack-plugin';

// eslint-disable-next-line import/no-default-export
// @ts-ignore
export default composePlugins(withNx(), withDeepkit());
