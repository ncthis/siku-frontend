import Auth0Lock from 'auth0-lock';

import config from '../../config';
import history from '../routing/history';
import Logger from './../logging/Logger';
import ServiceExchange from './../ServiceExchange';
import ServiceManager from './../ServiceManager';
import * as _ from 'lodash';
import loginMutation from './loginMutation';
import mutate from './../graphql/mutate';

export type LoginUserWithAuth0LockInput_identity = {
  userId: string;
  provider: string;
  connection: string;
  isSocial: boolean;
  expiresIn: number;
};

export type LoginUserWithAuth0LockInput = {
  identity: LoginUserWithAuth0LockInput_identity;
  access_token: string;
};

type StoredAuthType = {
  idToken?: string,
  expiresAt?: number,
  accessToken?: string,
};



const logger = new Logger('Auth');

class Auth {
  static lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
    auth: {
      redirectUrl: `${config.WEB_ROOT}`,
      responseType: 'token',
      params: {
        state: history && history.location && history.location.pathname,
        scope: 'openid profile',
      },
    },
  });

  static init() {
    const auth = Auth.getAuth();

    if (auth) {
      logger.info('Locally authenticated');
      Auth.onAuthenticated(auth);
    } else {
      Auth.lock.on('authenticated', ({
        accessToken,
        idToken,
        state,
        idTokenPayload,
      }: { accessToken: string, idToken: string, state: string, idTokenPayload: { exp: number, }, }) => {
        logger.info('Authenticated', { accessToken });
        Auth.onAuthenticated({ accessToken, idToken, expiresAt: idTokenPayload.exp });
        Auth.toStorage(idToken, accessToken, idTokenPayload.exp);
        history.push(state);
      });
    }
  }

  static onAuthenticated = (auth: StoredAuthType, _ServiceExchange = ServiceExchange, _Auth = Auth): void => {
    _ServiceExchange.emit('authenticated', { idToken: auth.idToken });

    _Auth.lock.getUserInfo(auth.accessToken, (error: Error, profile) => {
      if (error) {
        logger.error(error);
      }

      logger.info('Got user info', { profile });

      const input: LoginUserWithAuth0LockInput = {
        access_token: auth.accessToken,
        identity: _.omit({
          ...profile.identities[0],
          userId: profile.identities[0].user_id,
        }, 'user_id'),
      };

      _Auth.loginToGraphql(input);
    });
  };

  static loginToGraphql: (input: LoginUserWithAuth0LockInput) => Promise<any> = (input: LoginUserWithAuth0LockInput) =>
    mutate(loginMutation, { input }).then(logger.info).catch(logger.error);

  static toStorage = (idToken: string, accessToken: string, expiresAt: number, _JSON: typeof JSON = JSON, _localStorage: typeof localStorage = localStorage) =>
    _localStorage.localStorage.setItem('siku-auth', _JSON.stringify({ idToken, expiresAt, accessToken }));

  static fromStorage(_JSON: typeof JSON = JSON, _localStorage = localStorage): StoredAuthType {
    try {
      return _JSON.parse(_localStorage.getItem('siku-auth') || '{}');
    } catch (e) {
      _localStorage.removeItem('siku-auth');
      return {};
    }
  }

  static getAuth(
    auth: StoredAuthType = Auth.fromStorage(),
    now: number = Date.now(),
  ): StoredAuthType | typeof undefined {
    if (auth.idToken && Number(auth.expiresAt) > now / 1000) {
      return auth;
    }

    return undefined;
  }

  static isAuthenticated(_Auth = Auth): boolean {
    return !!_Auth.getAuth();
  }

  static login(lockScreen: typeof Auth.lock = Auth.lock): void {
    lockScreen.show();
  }
}

ServiceManager.bootstrap(Auth);

export default Auth;
