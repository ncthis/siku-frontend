// @flow

// $FlowFixMe
import config from 'config'; // eslint-disable-line
import debug from 'debug';

class Logger {
  serviceName: string;
  debug: typeof debug.IDebugger;

  constructor(serviceName: string) {
    this.serviceName = `siku:local:${serviceName}`;
    this.debug = debug(this.serviceName);
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
