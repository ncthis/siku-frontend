import * as debug from 'debug';
import config from '../../config';

class Logger {
  private debug: debug.IDebugger;
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = `siku:local:${serviceName}`;
    this.debug = debug(this.serviceName);
    this.info('Instantiated logger');
  }

  public error = (...args: any[]) => {
    this.debug('error', ...args);
  }

  public info = (...args: any[]) => {
    this.debug('info', ...args);
  }

  public warn = (...args: any[]) => {
    this.debug('warn', ...args);
  }
}

export default Logger;
