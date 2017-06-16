// @flow

import React from 'react';
import withQuery, { graphql } from '../graphql/withQuery';
import LoginView from './LoginView';

type FunctionComponentType<A> = (props: A) => ?React$Element<A>;
type ClassComponentType<D, A, S> = Class<React$Component<D, A, S>>;
export type ComponentType<A> = FunctionComponentType<A> | ClassComponentType<Object, A, Object>;
type HocType<A, B> = (Base: ComponentType<A>) => ComponentType<B>;

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
