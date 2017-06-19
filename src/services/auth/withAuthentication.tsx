// @flow

import * as React from 'react';
import withQuery, { graphql } from '../graphql/withQuery';
import LoginView from './LoginView';

type ViewerType = {
  id: string,
  user: any,
};

type ResultType = {
  viewer: ViewerType,
};

const userQuery = graphql`
  query withAuthenticationQuery {
    viewer {
      id
      user {
        id
      }
    }
  }
`;

function withAuthentication<OwnProps: Object>(): HocType<OwnProps, OwnProps> {
  return (BaseComponent: ComponentType<OwnProps & { user: ViewerType, }>): ComponentType<OwnProps> => (
    ownProps: OwnProps,
  ) =>
    React.createElement(
      withQuery(userQuery, {})(
        ({ result }: { result: ResultType, }) =>
          (result && result.viewer && result.viewer.user
            ? <BaseComponent {...ownProps} user={result.viewer.user} />
            : <LoginView />),
      ),
    );
}

export default withAuthentication;
