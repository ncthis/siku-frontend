import * as _ from 'lodash';
import Logger from './logging/Logger';

const logger = new Logger('ServiceExchange');

type EventType = 'authenticated' | 'logout';

class ServiceExchange {
  public static subscribe(
    eventType: string,
    handler: (payload: any) => void,
    _ServiceExchange = ServiceExchange,
  ): number {
    logger.info(`Subscribed to ${eventType}`);
    // eslint-disable-next-line no-param-reassign
    _ServiceExchange.listeners[eventType] = (_ServiceExchange.listeners[eventType] || []).concat(handler);

    return _ServiceExchange.listeners[eventType].length;
  }

  public static emit(eventType: EventType, payload: any, _ServiceExchange = ServiceExchange): void {
    const listeners = _ServiceExchange.listeners[eventType];

    if (_.isEmpty(listeners)) {
      logger.warn(`No listeners for ${eventType}`);
    } else {
      listeners.forEach((listener: (payload: any) => void) => listener(payload));
    }
  }

  private static listeners: { [eventType: string]: Array<(payload: any) => void> } = {};

  // TODO: unsub
}

export default ServiceExchange;
