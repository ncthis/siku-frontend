import * as React from 'react';
import withQuery, { graphql } from '../graphql/withQuery';
import LoginView from './LoginView';
import { HOCType } from 'siku-types';
import * as _ from 'lodash';
import { ResultPropsType } from '../graphql/withQuery';
import withAuthenticationQuery from './withAuthenticationQuery.js';

interface ResultType {
  viewer: {
    readonly user: any;
  };
};

const enhanceWithUserQuery = withQuery(withAuthenticationQuery, {});

interface IBaseProps {
  readonly user: any;
}

// const AuthByResult: React.StatelessComponent<{ result: ResultType }>
//   = ({ result }: { result: ResultType }) =>
//     _.get(result, 'viewer.user') ?
//       <BaseComponent {...ownProps} user={result.viewer.user} /> : <LoginView />

type AutherProps<OwnProps> = ResultPropsType<ResultType, {}> & OwnProps;

const authComponentCreator = <OwnProps extends {}>
  (BaseComponent: React.StatelessComponent<OwnProps & { user: any }>, ownProps: Readonly<OwnProps>): React.StatelessComponent<AutherProps<OwnProps>> =>
  ({ result }: AutherProps<OwnProps>): JSX.Element => {
    if (_.get(result, 'viewer.user')) {
      return <BaseComponent {...ownProps} user={result.viewer.user} />
    }

    return <LoginView />;
  }

function withAuthentication<OwnProps extends {}>(): HOCType<OwnProps & { user: any }, OwnProps> {
  return (BaseComponent) => (
    ownProps: OwnProps,
  ) => {
    const AuthComponent = withQuery<ResultType, {}, OwnProps>(withAuthenticationQuery, {})(authComponentCreator<OwnProps>(BaseComponent, ownProps));
    return <AuthComponent />;
  }
}

export default withAuthentication;
