// @flow

import React from 'react';
import Auth from './Auth';
// // $FlowFixMe
import config from 'config'; // eslint-disable-line

class LoginView extends React.Component {
  componentDidMount() {
    Auth.login();
  }

  render() {
    return <span />;
  }
}

export default LoginView;
