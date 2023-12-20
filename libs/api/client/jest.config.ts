/* eslint-disable */
export default {
  displayName: 'api-client',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/libs/api/client',
};
