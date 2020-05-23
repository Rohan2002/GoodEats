import React from 'react';
import './home.css';
import HomeComp from './HomeComp/HomeComp';
import Sidebar from '../Sidebar/sidebar';
class Home extends React.Component {
  render() {
    return (
      <div>
        <Sidebar push={HomeComp} />
      </div>
    );
  }
}
export default Home;
