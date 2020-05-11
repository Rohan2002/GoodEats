import React from "react";
import Upload from './Upload';
import Sidebar from "../Sidebar/sidebar";
export default class MainUpload extends React.Component {
  render() {
    return (
      <div>
          <Sidebar push={Upload}>

          </Sidebar>
      </div>
    );
  }
}
