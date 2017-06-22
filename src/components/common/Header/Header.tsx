// @flow

import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { withState } from 'recompose';

interface HeaderProps {
  activeItem: 'home' | 'messages' | 'friends' | 'logout',
  setActiveItem: (item: string) => void,
}

const Header: React.StatelessComponent<HeaderProps> = ({
  activeItem,
  setActiveItem,
}): JSX.Element => (
    <div>
      <Menu borderless color={'black'} inverted attached>
        <Menu.Item header>siku.io</Menu.Item>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={(): void => setActiveItem('home')}
        />
        <Menu.Item
          name="messages"
          active={activeItem === 'messages'}
          onClick={(): void => setActiveItem('messages')}
        />
        <Menu.Item
          name="friends"
          active={activeItem === 'friends'}
          onClick={(): void => setActiveItem('friends')}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={(): void => setActiveItem('logout')}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

const enhance = withState('activeItem', 'setActiveItem', 'home');

export default enhance(Header);
