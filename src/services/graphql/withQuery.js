// @flow

import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from './environment';

type FunctionComponentType<A> = (props: A) => ?React$Element<any>;
type ClassComponentType<D, A, S> = Class<React$Component<D, A, S>>;
export type ComponentType<A> = FunctionComponentType<A> | ClassComponentType<any, A, any>;
type Fn1Type<A, B> = (a: A) => B;
type HocType<A, B> = Fn1Type<ComponentType<A>, ComponentType<B>>;

type ResultPropsType<Result: {}, OwnProps: {}, Variables: {}> = OwnProps & {
  error: Error,
  result: Result,
  loading: boolean,
  variables: Variables,
};

function withQuery<Variables: {}, OwnProps: {}, Result: {}>(
  query: typeof graphql,
  variables: Variables,
): HocType<ResultPropsType<Result, OwnProps, Variables>, OwnProps> {
  return (BaseComponent: ComponentType<ResultPropsType<Result, OwnProps, Variables>>): ComponentType<OwnProps> => (
    ownProps: OwnProps,
  ) => (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({
        error,
        props,
      }: {
        error: Error,
        props: Result,
      }) => (
        <BaseComponent {...ownProps} error={error} result={props} loading={!error && !props} variables={variables} />
        )}
    />
  );
}

export default withQuery;
