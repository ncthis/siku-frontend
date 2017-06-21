import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';

ReactDOM.render(
  <AppContainer>
    <Application />
  </AppContainer>,
  document.getElementById('root'),
);

declare var module: any;

if (module.hot) {
  module.hot.accept();
}
