// @flow

import * as React from 'react';

import withQuery from './../../../services/graphql/withQuery';
import { HOCType } from 'siku-types';
import { ResultPropsType } from '../../../services/graphql/withQuery';
import HealthCheckQuery from './HealthCheckQuery.js';

type QueryResultType = {
  checkHealth: {
    healthy: boolean,
    message: string,
  },
};

interface HealthCheckProps extends ResultPropsType<QueryResultType, {}> {
  result: QueryResultType;
}

const HealthCheckComponent: React.StatelessComponent<HealthCheckProps> = (
  props: HealthCheckProps,
) => <div>{JSON.stringify(props.result && props.result.checkHealth)}</div>;

const enhance: HOCType<HealthCheckProps, {}> = withQuery(
  HealthCheckQuery,
  {},
);

const HealthCheck = enhance(HealthCheckComponent);

export default HealthCheck;
