import React, { useState } from 'react';
import { Menu, Header, Image, Segment, List, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './TopNav.css';
const TopNav = (props) => {
  const [activate, setActivate] = useState('');
  const [dropdown, setdropdown] = useState(false);
  const handleItemClick = (e, { name }) => setActivate(name);
  const handleDropDown = (e) => setdropdown(true);

  const DropdownShow = () => {
    return (
      <Segment>
        <List link>
          <List.Item>
            <Link>
              <Header>Profile</Header>
            </Link>
          </List.Item>
          <Divider />
          <List.Item>
            <Link>
              <Header>Logout</Header>
            </Link>
          </List.Item>
        </List>
      </Segment>
    );
  };
  return (
    <Menu className={'top-nav'} secondary>
      <Menu.Item
        name="home"
        active={activate}
        onClick={() => setActivate('home')}
      />
      <div className={'right-items'}>
        <Menu.Item onClick={(e) => handleDropDown(e)}>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            className={'avatar-image'}
            circular
          />
          <span style={{ marginLeft: 1.5 + 'em' }}>
            <Header>Username</Header>
          </span>
        </Menu.Item>
        {dropdown === true ? <DropdownShow /> : null}
      </div>
    </Menu>
  );
};
export default TopNav;
