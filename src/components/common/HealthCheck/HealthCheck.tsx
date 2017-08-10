import * as React from 'react';

import withQuery from './../../../services/graphql/withQuery';
import { HOCType } from 'siku-types';
import { IResultPropsType } from '../../../services/graphql/withQuery';
import HealthCheckQuery from './HealthCheckQuery.js';

interface IQueryResultType {
  checkHealth: {
    healthy: boolean;
    message: string;
  };
}

interface IHealthCheckProps extends IResultPropsType<IQueryResultType, {}> {
  result: IQueryResultType;
}

const HealthCheckComponent: React.StatelessComponent<IHealthCheckProps> = (
  props: IHealthCheckProps,
) => <div>{JSON.stringify(props.result && props.result.checkHealth)}</div>;

const enhance: HOCType<IHealthCheckProps, {}> = withQuery(
  HealthCheckQuery,
  {},
);

const HealthCheck = enhance(HealthCheckComponent);

export default HealthCheck;
