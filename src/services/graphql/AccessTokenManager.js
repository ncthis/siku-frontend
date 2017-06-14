// @flow

import ServiceExchange from './../ServiceExchange';
import services from './../';
import type { IService } from './../';

// @t "inits" init({}) equals 'temptoken'
// @t "gets token" getToken({accessToken: 'temptoken'}) equals 'temptoken'
class AccessTokenManager implements IService {
  static accessToken: string = '';

  static init(_ServiceExchange = ServiceExchange, _AccessTokenManager = AccessTokenManager): void {
    _ServiceExchange.subscribe('authenticated', ({ idToken }: { idToken: string, }) =>
      _AccessTokenManager.onAuth(idToken),
    );
  }

  static onAuth(token: string) {
    AccessTokenManager.accessToken = token;
  }

  static getToken(_AccessTokenManager = AccessTokenManager) {
    return _AccessTokenManager.accessToken;
  }
}

services.bootstrapService(AccessTokenManager);

export default AccessTokenManager;
