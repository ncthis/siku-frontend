// @flow

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/common/Header/Header';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Plugins from './components/Plugins/Plugins';
import styles from './App.css';
import history from './services/routing/history';
import services from './services';

const App = (): React.Element<*> => (
  <Router history={history}>
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/plugins" component={Plugins} />
    </div>
  </Router>
);

services.init();

export default App;
