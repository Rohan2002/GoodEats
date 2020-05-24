import React, { useState,useEffect } from 'react';
import { Menu, Header, Image, Segment, List, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TopNav.css';
import Mat from './matthew.png';
const TopNav = (props) => {
  const [activate, setActivate] = useState('');
  const [dropdown, setdropdown] = useState(false);
  const handleItemClick = (e, { name }) => setActivate(name);
  const handleDropDown = (e) => setdropdown(true);

//   const delete_cookie(name) {
//     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// };
  const logout= () =>{
    console.log(document.cookie)
  }
  logout();
  


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
            <Link onClick={logout}>
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
            src={Mat}
            className={'avatar-image'}
            circular
          />
          <span style={{ marginLeft: 1.5 + 'em' }}>
            <Header>Rohan Deshpande</Header>
          </span>
        </Menu.Item>
        {dropdown === true ? <DropdownShow /> : null}
      </div>
    </Menu>
  );
};
export default TopNav;
