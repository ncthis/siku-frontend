import _ from 'lodash';
import Logger from './logging/Logger';

const logger = new Logger('ServiceExchange');

type EventType = 'authenticated' | 'logout';

class ServiceExchange {
  static listeners: { [eventType: string]: Array<(payload: any) => void>, } = {};

  static subscribe(eventType: string, handler: (payload: any) => void): void {
    logger.info(`Subscribed to ${eventType}`);
    ServiceExchange.listeners[eventType] = (ServiceExchange.listeners[eventType] || []).concat(handler);
  }

  static emit(eventType: EventType, payload: any): void {
    const listeners = ServiceExchange.listeners[eventType];

    if (_.isEmpty(listeners)) {
      logger.warn(`No listeners for ${eventType}`);
    } else {
      listeners.forEach((listener: (payload: any) => void) => listener(payload));
    }
  }

  // TODO: unsub
}

export default ServiceExchange;
