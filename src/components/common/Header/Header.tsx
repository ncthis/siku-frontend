import { Menu } from 'semantic-ui-react';
import { mapProps, compose } from 'recompose';
import * as _ from 'lodash';
import * as React from 'react';
import history from '../../../services/routing/history';
import { withRouter, RouteComponentProps } from 'react-router';

interface IHeaderProps {
  activeItem: '/' | '/dashboard' | '/plugins' | '/submit-plugin' | '/logout';
  goto: (path: string) => void;
}

const Header: React.StatelessComponent<IHeaderProps> = ({
  activeItem,
  goto,
}): JSX.Element =>
  <div>
    <Menu borderless color={'black'} inverted attached>
      <Menu.Item header
        active={activeItem === '/'}
        onClick={(): void => goto('/')}>siku.io</Menu.Item>
      <Menu.Item
        name="dashboard"
        active={activeItem === '/dashboard'}
        onClick={(): void => goto('dashboard')}
      />
      <Menu.Item
        name="plugins"
        active={activeItem === '/plugins'}
        onClick={(): void => goto('plugins')}
      />
      <Menu.Item
        name="submit-plugin"
        active={activeItem === '/submit-plugin'}
        onClick={(): void => goto('submit-plugin')}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem === '/logout'}
          onClick={(): void => goto('logout')}
        />
      </Menu.Menu>
    </Menu>
  </div>;

const injectGoto = (ownProps: RouteComponentProps<{}>) => ({
  goto: (path: string): void => ownProps.history.push(path, { fromHeader: true }),
  activeItem: ownProps.location.pathname,
});

const enhance = compose(withRouter, mapProps(injectGoto));

export default enhance(Header);
