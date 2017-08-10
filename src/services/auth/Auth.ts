import Auth0Lock from 'auth0-lock';
import * as _ from 'lodash';
import history from '../routing/history';
import Logger from './../logging/Logger';
import loginMutation from './loginMutation';
import mutate from './../graphql/mutate';
import ServiceExchange from './../ServiceExchange';
import ServiceManager from './../ServiceManager';
import config from '../../config';

export interface ILoginUserWithAuth0LockInput_identity {
  userId: string;
  provider: string;
  connection: string;
  isSocial: boolean;
  expiresIn: number;
}

export interface ILoginUserWithAuth0LockInput {
  identity: ILoginUserWithAuth0LockInput_identity;
  access_token: string;
}

interface IStoredAuthType {
  idToken?: string;
  expiresAt?: number;
  accessToken?: string;
}

const logger = new Logger('Auth');

class Auth {
  public static lock = new Auth0Lock(
    config.AUTH0_CLIENT_ID,
    config.AUTH0_DOMAIN,
    {
      auth: {
        redirectUrl: config.WEB_ROOT,
        responseType: 'token',
        params: {
          state: history && history.location && history.location.pathname,
          scope: 'openid profile',
        },
      },
    },
  );

  public static init() {
    const auth = Auth.getAuth();

    if (auth) {
      logger.info('Locally authenticated');
      Auth.onAuthenticated(auth);
    } else {
      Auth.lock.on(
        'authenticated',
        ({
          accessToken,
          idToken,
          state,
          idTokenPayload,
        }: {
          accessToken: string;
          idToken: string;
          state: string;
          idTokenPayload: { exp: number };
        }) => {
          logger.info('Authenticated', { accessToken });
          Auth.onAuthenticated({
            accessToken,
            idToken,
            expiresAt: idTokenPayload.exp,
          });
          Auth.toStorage(idToken, accessToken, idTokenPayload.exp);
          history.push(state);
        },
      );
    }
  }

  public static onAuthenticated = (
    auth: IStoredAuthType,
    _ServiceExchange = ServiceExchange,
    _Auth = Auth,
  ): void => {
    _ServiceExchange.emit('authenticated', { idToken: auth.idToken });

    _Auth.lock.getUserInfo(auth.accessToken, (error: Error, profile) => {
      if (error) {
        logger.error(error);
      }

      logger.info('Got user info', { profile });

      const input: ILoginUserWithAuth0LockInput = {
        access_token: auth.accessToken,
        identity: _.omit(
          {
            ...profile.identities[0],
            userId: profile.identities[0].user_id,
          },
          'user_id',
        ),
      };

      _Auth.loginToGraphql(input);
    });
  }

  public static loginToGraphql: (
    input: ILoginUserWithAuth0LockInput,
  ) => Promise<any> = (input: ILoginUserWithAuth0LockInput) =>
    mutate(loginMutation, { input }).then(logger.info).catch(logger.error)

  public static toStorage = (
    idToken: string,
    accessToken: string,
    expiresAt: number,
    _JSON: typeof JSON = JSON,
    _localStorage: typeof localStorage = localStorage,
  ) =>
    _localStorage.setItem(
      'siku-auth',
      _JSON.stringify({ idToken, expiresAt, accessToken }),
    )

  public static fromStorage(
    _JSON: typeof JSON = JSON,
    _localStorage = localStorage,
  ): IStoredAuthType {
    try {
      return _JSON.parse(_localStorage.getItem('siku-auth') || '{}');
    } catch (e) {
      _localStorage.removeItem('siku-auth');
      return {};
    }
  }

  public static isAuthenticated(_Auth = Auth): boolean {
    return !!_Auth.getAuth();
  }

  public static login(lockScreen: typeof Auth.lock = Auth.lock): void {
    lockScreen.show();
  }

  private static getAuth(
    auth: IStoredAuthType = Auth.fromStorage(),
    now: number = Date.now(),
  ): IStoredAuthType | undefined {
    if (auth.idToken && Number(auth.expiresAt) > now / 1000) {
      return auth;
    }

    return undefined;
  }
}

ServiceManager.bootstrap(Auth);

export default Auth;
