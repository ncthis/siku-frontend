import * as React from 'react';
import withQuery, { graphql } from '../graphql/withQuery';
import LoginView from './LoginView';
import { HOCType } from 'siku-types';
import * as _ from 'lodash';
import { IResultPropsType } from '../graphql/withQuery';
import withAuthenticationQuery from './withAuthenticationQuery.js';

interface IResultType {
  viewer: {
    readonly user: any;
  };
}

const enhanceWithUserQuery = withQuery(withAuthenticationQuery, {});

interface IUser {
  id: string;
}

export interface IAuthenticatedProps {
  user: IUser;
}

const userKey = 'siku-user';

const storeUser = (userObj: IUser): void => localStorage.setItem(userKey, JSON.stringify(userObj));

const getUserFromStorage = (): IUser => JSON.parse(localStorage.getItem(userKey));

type AutherProps<OwnProps> = IResultPropsType<IResultType, {}> & OwnProps;

const authComponentCreator = <OwnProps extends {}>(
  BaseComponent: React.StatelessComponent<OwnProps & IAuthenticatedProps>,
  ownProps: Readonly<OwnProps>,
): React.StatelessComponent<AutherProps<OwnProps>> => ({
  result,
}: AutherProps<OwnProps>): JSX.Element => {
  const user = _.get<IUser>(result, 'viewer.user') || getUserFromStorage();

  if (user) {
    storeUser(user);
    return <BaseComponent {...ownProps} user={user} />;
  }

  return <LoginView />;
};

const withAuthentication = <OwnProps extends {}>(): HOCType<
  OwnProps & IAuthenticatedProps,
  OwnProps
> => BaseComponent => (ownProps: OwnProps) => {
  const AuthComponent = withQuery<IResultType, {}, OwnProps>(
    withAuthenticationQuery,
    {},
  )(authComponentCreator<OwnProps>(BaseComponent, ownProps));
  return <AuthComponent />;
};

export default withAuthentication;
