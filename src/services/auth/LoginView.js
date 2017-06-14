// @flow

import React from 'react';
import Auth from './Auth';
import config from '../../config';

class LoginView extends React.Component {
  componentDidMount() {
    Auth.login();
  }

  render() {
    return <span />;
  }
}

export default LoginView;
