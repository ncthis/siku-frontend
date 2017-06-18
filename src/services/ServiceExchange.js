// @flow
// centralized exchange for communication between services

import _ from 'lodash';
import Logger from './logging/Logger';

const logger = new Logger('ServiceExchange');

type EventType = 'authenticated' | 'logout';

class ServiceExchange {
  static listeners: { [eventType: string]: Array<(payload: any) => void>, } = {};

  // @t "will add to listeners"
  //    default.subscribe('type1', () => {}) ~equals 1
  // @t "should add to existing listeners"
  //    default.subscribe('type2', () => {}, { listeners: { type2: [function foo() {}] } }) ~equals 2
  static subscribe(eventType: string, handler: (payload: any) => void, _ServiceExchange = ServiceExchange): number {
    logger.info(`Subscribed to ${eventType}`);
    // eslint-disable-next-line no-param-reassign
    _ServiceExchange.listeners[eventType] = (_ServiceExchange.listeners[eventType] || []).concat(handler);

    return _ServiceExchange.listeners[eventType].length;
  }

  // @t "should emit to all listeners"
  //    default.emit('type1', 'pl', {listeners: {type1: [ spy('one'), spy('two') ]}}) ~expects spy('one').calledWith('pl') && spy('two').calledWith('pl')
  // @t "should not emit to non-listeners"
  //    default.emit('type1', 'p1', {listeners: {type2: [ spy('three') ]}}) ~expects !spy('three').args[0]
  static emit(eventType: EventType, payload: any, _ServiceExchange = ServiceExchange): void {
    const listeners = _ServiceExchange.listeners[eventType];

    if (_.isEmpty(listeners)) {
      logger.warn(`No listeners for ${eventType}`);
    } else {
      listeners.forEach((listener: (payload: any) => void) => listener(payload));
    }
  }

  // TODO: unsub
}

export default ServiceExchange;
