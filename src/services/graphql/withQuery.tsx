import * as React from 'react';
import { graphql as _graphql, QueryRenderer } from 'react-relay';
import _environment from './environment';
import * as _ from 'lodash';
import { HOCType } from 'siku-types';

export const environment = _environment;
export const graphql = _graphql;

export interface IResultPropsType<Result extends {}, Variables extends {}> {
  error: Error;
  result: Result;
  loading: boolean;
  variables: Variables;
}

const Loading = () => <div>{'Loading'}</div>;

function withQuery<
  Result extends {},
  Variables extends {},
  OwnProps extends {}
>(
  query: typeof graphql,
  variables: Variables,
): HOCType<IResultPropsType<Result, Variables>, OwnProps> {
  return (
    BaseComponent: React.StatelessComponent<IResultPropsType<Result, Variables>>,
  ) => (ownProps: OwnProps) =>
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }: { error: Error; props: Result }) => {
        return error || props
          ? <BaseComponent
              {...ownProps}
              result={props}
              error={error}
              loading={!error && !props}
              variables={variables}
            />
          : <Loading />;
      }}
    />;
}

export default withQuery;
