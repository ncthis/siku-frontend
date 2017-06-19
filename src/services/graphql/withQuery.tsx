// @flow

import * as React from 'react';
import { graphql as _graphql, QueryRenderer } from 'react-relay';
import _environment from './environment';
import _ from 'lodash';

export const environment = _environment;
export const graphql = _graphql;

type ResultPropsType<Result, Variables> = {
  error: Error,
  result: Result,
  loading: boolean,
  variables: Variables,
};

// : React.Component<ResultPropsType<Result, Variables, OwnProps>, {}>

// : React.Component<OwnProps, {}>

// type Component<P, S> = React.StatelessComponent<P> | React.Component<P, S>

type HOCType<BaseProps, OwnProps> = (BaseComponent: new () => React.Component<BaseProps & OwnProps, {}>) => React.StatelessComponent<OwnProps>;

const Loading = () => <div>{'Loading'}</div>

function withQuery<Result, Variables, OwnProps>(
  query: typeof graphql,
  variables: Variables,
): HOCType<ResultPropsType<Result, Variables> & OwnProps, OwnProps> {
  return (BaseComponent) => (
    ownProps: OwnProps,
  ) => (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }: {
          error: Error,
          props: Result,
        }) => {
          const baseProps: ResultPropsType<Result, Variables> & OwnProps = _.assign({}, ownProps, {
            result: props,
            error,
            loading: !error && !props,
            variables,
          });

          return (error || props
            ? <BaseComponent {...baseProps as any} />
            : <Loading />
          )
        }}
      />
    );
}

export default withQuery;
