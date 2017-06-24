import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/common/Header/Header';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Plugins from './components/Plugins/Plugins';
import ServiceManager from './services/ServiceManager';
import SubmitPlugin from './components/SubmitPlugin/SubmitPlugin';

const Application = (): JSX.Element => (
  <Router>
    <div>
      <div>
        <Header />
      </div>
      <div className="ui container">
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/plugins" component={Plugins} />
        <Route path="/submit-plugin" component={SubmitPlugin} />
      </div>
    </div>
  </Router>
);

ServiceManager.init();

export default Application;
