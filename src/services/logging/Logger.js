// @flow

import config from '../../config';
import debug from 'debug';

class Logger {
  serviceName: string;
  debug: typeof debug.IDebugger;

  constructor(serviceName: string) {
    this.serviceName = `siku:local:${serviceName}`;
    this.debug = debug(this.serviceName);
    this.info('Instantiated logger');
  }

  info = (...args: Array<any>) => {
    this.debug('info', ...args);
  };

  error = (...args: Array<any>) => {
    this.debug('error', ...args);
  };

  warn = (...args: Array<any>) => {
    this.debug('warn', ...args);
  };
}

export default Logger;
