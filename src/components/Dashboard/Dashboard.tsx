/* @flow */

import * as React from 'react';
import { Header, Segment, Divider } from 'semantic-ui-react';
import HealthCheck from './../common/HealthCheck/HealthCheck';
import withAuthentication from './../../services/auth/withAuthentication';

const Dashboard = (): React.Element<*> => (
  <Segment>
    <Header size="large">Dashboard</Header>
    <Divider />
    <HealthCheck />
  </Segment>
);

const enhance = withAuthentication();

const enhancedDashboard = enhance(Dashboard);

export default enhancedDashboard;
