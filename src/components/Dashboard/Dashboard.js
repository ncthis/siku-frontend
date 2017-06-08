/* @flow */

import React from 'react';
import { Header, Segment, Divider } from 'semantic-ui-react';
import HealthCheck from './../common/HealthCheck/HealthCheck';

const Dashboard = (): React.Element<*> => (
  <Segment>
    <Header size="large">Dashboard</Header>
    <Divider />
    <HealthCheck />
  </Segment>
);

export default Dashboard;
