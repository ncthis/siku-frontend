// @flow

declare module 'process' {
  declare var exports: {
    env: {
      NODE_ENV: 'test' | 'production' | 'development' | 'e2e',
    },
  };
}
