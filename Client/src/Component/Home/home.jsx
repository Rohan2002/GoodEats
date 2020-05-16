import React from "react";
import "./home.css";
import HomeComp from "./HomeComp/HomeComp";
import Sidebar from "../Sidebar/sidebar";
class Home extends React.Component {
  // componentDidMount(){
  //   console.log(this.props.history.location);
  // }
  render() {
    return (
      <div>
          <Sidebar push={HomeComp}>

          </Sidebar>
      </div>
    );
  }
}
export default Home;
