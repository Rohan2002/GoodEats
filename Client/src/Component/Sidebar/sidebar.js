import React from "react";
import "./sidebar.css";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
// import HomeComp from "../Home/HomeComp/HomeComp";

const SideBar = (props) => {
  return (
    <div>
      <Sidebar.Pushable className={"sidebar-seg"} as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={true}
          width="thin"
        >
          <Icon size={"huge"} className={"offonn"} name="power" />
          <div className={"side-bar-route"}>
            <Menu.Item href={"/#/"} as="a">
              <Icon name="dashboard" />
              Home
            </Menu.Item>
            <Menu.Item href={"/#/upload"} as="a">
              <Icon name="setting" />
              Upload
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="info" />
              Information
            </Menu.Item>
          </div>
        </Sidebar>
        <Sidebar.Pusher>
          <props.push />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};
export default SideBar;
