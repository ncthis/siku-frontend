// @flow

// // $FlowFixMe
import config from 'config'; // eslint-disable-line
import Auth0Lock from 'auth0-lock';

import history from '../routing/history';
import Logger from './../logging/Logger';
import mutate, { graphql } from './../graphql/mutate';
import type { LoginUserWithAuth0LockInput_identity as MutationType } from './__generated__/AuthMutation.graphql'; // eslint-disable-line camelcase

type ProfileType = {
  clientID: string,
  created_at: string,
  email: string,
  email_verified: boolean,
  identities: {
    connection: string,
    isSocial: boolean,
    provider: 'auth0',
    user_id: string,
  },
  name: string,
  nickname: string,
  picture: string,
  sub: string,
  updated_at: string,
};

type StoredAuthType = {
  idToken?: string,
  expiresAt?: number,
  accessToken?: string,
};

const loginMutation = graphql`
  mutation AuthMutation(
    $input: LoginUserWithAuth0LockInput!
  ) {
    loginUserWithAuth0Lock(input: $input) {
      user {
        id
      }
      clientMutationId
    }
  }
`;

const logger = new Logger('Auth');

class Auth {
  static lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
    auth: {
      redirectUrl: `${config.WEB_ROOT}`,
      responseType: 'token',
      params: {
        state: history.location.pathname,
        scope: 'openid profile',
        autoParseHash: true,
      },
    },
  });

  static init = () => {
    const auth = Auth.getAuth();

    if (auth) {
      return Auth.onAuthenticated(auth);
    }

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
  };

  static onAuthenticated(
    auth: StoredAuthType,
    getUserInfo: typeof Auth.lock.getUserInfo = Auth.lock.getUserInfo,
    loginToGraphql: typeof Auth.loginToGraphql = Auth.loginToGraphql,
  ) {
    getUserInfo(auth.accessToken, (error: Error, profile: ProfileType) => {
      if (error) {
        logger.error(error);
      }

      logger.info('Got user info', { profile });

      const input: MutationType = {
        access_token: auth.accessToken,
        identity: {
          ...profile.identities[0],
          user_id: undefined,
          userId: profile.identities[0].user_id,
        },
      };

      loginToGraphql(input);
    });
  }

  static loginToGraphql: (input: MutationType) => Promise<any> = (input: MutationType) =>
    mutate(loginMutation, { input }).then(logger.info).catch(logger.error);

  static toStorage = (idToken: string, accessToken: string, expiresAt: number, global: typeof window = window) =>
    global.localStorage.setItem('siku-auth', global.JSON.stringify({ idToken, expiresAt, accessToken }));

  static fromStorage(global: typeof window = window): StoredAuthType {
    try {
      return global.JSON.parse(global.localStorage.getItem('siku-auth') || '{}');
    } catch (e) {
      global.localStorage.removeItem('siku-auth');
      return {};
    }
  }

  static getAuth(
    auth: StoredAuthType = Auth.fromStorage(),
    now: number = Date.now(),
  ): StoredAuthType | typeof undefined {
    if (auth.idToken && Number(auth.expiresAt) > now) {
      return auth;
    }

    return undefined;
  }

  static login(lockScreen: typeof Auth.lock = Auth.lock): void {
    lockScreen.show();
  }
}

// TODO: init somewhere else
Auth.init();

export default Auth;
