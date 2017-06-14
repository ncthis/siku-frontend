// @flow

// $FlowFixMe
const config = require('config'); // eslint-disable-line

type ConfigType = {
  GRAPHQL_ENDPOINT: string,
  AUTH0_CLIENT_ID: string,
  AUTH0_DOMAIN: string,
  AUTH0_AUDIENCE: string,
  WEB_ROOT: string,
  ENV: string,
};

export default (config: ConfigType);
