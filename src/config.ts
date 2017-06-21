import * as process from 'process';

type ConfigType = {
  GRAPHQL_ENDPOINT: string,
  AUTH0_CLIENT_ID: string,
  AUTH0_DOMAIN: string,
  AUTH0_AUDIENCE: string,
  WEB_ROOT: string,
  ENV: string,
};

let config: ConfigType = process.env.NODE_ENV !== 'test' ? require('config') : {}; // eslint-disable-line

export default config;
