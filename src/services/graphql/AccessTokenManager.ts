import ServiceExchange from './../ServiceExchange';
import ServiceManager from './../ServiceManager';

class AccessTokenManager {
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

ServiceManager.bootstrap(AccessTokenManager);

export default AccessTokenManager;
