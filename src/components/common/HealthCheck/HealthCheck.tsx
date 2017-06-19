// @flow

import * as React from 'react';
import { graphql } from 'react-relay';

import withQuery from './../../../services/graphql/withQuery';

import type { ComponentType } from './../../../services/graphql/withQuery';

type ConnectedComponentProps<OwnProps, QueryResult, Variables> = OwnProps & {
  error: Error,
  result: QueryResult,
  loading: boolean,
  variables: Variables,
};

type ConnectedComponentType<OwnProps, QueryResult, Variables> = ComponentType<ConnectedComponentProps<OwnProps, QueryResult, Variables>>;

type QueryResultType = {
  checkHealth: {
    healthy: boolean,
    message: string,
  },
};

const HealthCheck: ConnectedComponentType<{}, QueryResultType, {}> = (
  props: ConnectedComponentProps<{}, QueryResultType, {}>,
) => <div>{JSON.stringify(props.result && props.result.checkHealth)}</div>;

const enhance = withQuery(
  graphql`
    query HealthCheckQuery {
      checkHealth {
          healthy
          message
      }
    }
  `,
  {},
);

const enhanced: ComponentType<{}> = enhance(HealthCheck);

export default enhanced;
