import Logger from './services/logging/Logger';
import * as _ from 'lodash';

const config: {
  GRAPHQL_ENDPOINT: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  WEB_ROOT: string;
  ENV: string;
} = _.pick(process.env, [
  'GRAPHQL_ENDPOINT',
  'AUTH0_CLIENT_ID',
  'AUTH0_DOMAIN',
  'AUTH0_AUDIENCE',
  'WEB_ROOT',
  'ENV',
]);

const logger = new Logger('config');
logger.info('config set:', config);

export default config;
