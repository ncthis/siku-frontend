// @flow

import React from 'react';
import { graphql as _graphql, QueryRenderer } from 'react-relay';
import _environment from './environment';

export const environment = _environment;
export const graphql = _graphql;

type FunctionComponentType<A> = (props: A) => ?React$Element<any>;
type ClassComponentType<D, A, S> = Class<React$Component<D, A, S>>;
export type ComponentType<A> = FunctionComponentType<A> | ClassComponentType<any, A, any>;
type Fn1Type<A, B> = (a: A) => B;
type HocType<A, B> = Fn1Type<ComponentType<A>, ComponentType<B>>;

type ResultPropsType<Result, Variables, OwnProps> = OwnProps & {
  error: Error,
  result: Result,
  loading: boolean,
  variables: Variables,
};

function withQuery<Result, Variables, OwnProps: Object>(
  query: typeof graphql,
  variables: Variables,
): HocType<ResultPropsType<Result, Variables, OwnProps>, OwnProps> {
  return (BaseComponent: ComponentType<ResultPropsType<Result, Variables, OwnProps>>): ComponentType<OwnProps> => (
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
      }) =>
        (error || props
          ? <BaseComponent
            {...Object.assign({}, ownProps)}
            error={error}
            result={props}
            loading={!error && !props}
            variables={variables}
          />
          : <div>{'Loading'}</div>)}
    />
  );
}

export default withQuery;
