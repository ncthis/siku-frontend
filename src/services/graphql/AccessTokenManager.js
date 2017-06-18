// @flow

import ServiceExchange from './../ServiceExchange';
import ServiceManager from './../ServiceManager';
import type { IService } from './../ServiceManager';

class AccessTokenManager implements IService {
  static accessToken: string = '';

  // @t "will sub to ServiceExchange"
  //    default.init({ subscribe: spy('sub') }) ~expects spy('sub').args[0][0] === 'authenticated'
  static init(_ServiceExchange = ServiceExchange, _AccessTokenManager = AccessTokenManager): void {
    _ServiceExchange.subscribe('authenticated', ({ idToken }: { idToken: string, }) =>
      _AccessTokenManager.onAuth(idToken),
    );
  }

  /* istanbul ignore next */
  static onAuth(token: string) {
    AccessTokenManager.accessToken = token;
  }

  /* istanbul ignore next */
  static getToken(_AccessTokenManager = AccessTokenManager) {
    return _AccessTokenManager.accessToken;
  }
}

ServiceManager.bootstrap(AccessTokenManager);

export default AccessTokenManager;
