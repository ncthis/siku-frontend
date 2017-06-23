import ServiceExchange from './../ServiceExchange';
import ServiceManager from './../ServiceManager';

class AccessTokenManager {
  // @t "will sub to ServiceExchange"
  //    default.init({ subscribe: spy('sub') }) ~expects spy('sub').args[0][0] === 'authenticated'
  public static init(
    _ServiceExchange = ServiceExchange,
    _AccessTokenManager = AccessTokenManager,
  ): void {
    _ServiceExchange.subscribe(
      'authenticated',
      ({ idToken }: { idToken: string }) => _AccessTokenManager.onAuth(idToken),
    );
  }

  /* istanbul ignore next */
  public static onAuth(token: string) {
    AccessTokenManager.accessToken = token;
  }

  /* istanbul ignore next */
  public static getToken(_AccessTokenManager = AccessTokenManager) {
    return _AccessTokenManager.accessToken;
  }

  private static accessToken: string = '';
}

ServiceManager.bootstrap(AccessTokenManager);

export default AccessTokenManager;
