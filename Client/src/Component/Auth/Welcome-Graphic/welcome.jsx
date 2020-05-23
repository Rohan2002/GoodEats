import React from 'react';
import { Header } from 'semantic-ui-react';
import './welcome.css';
const welcome = (props) => {
  return (
    <div className={"graphic-left"}>
      <div className={'first-text'}>
        <Header className={"first-text-header"}>Welcome to GoodEats!</Header>
      </div>
      <div className={'second-text'}>
        <Header className={"second-text-header"}>To keep a healthy lifestyle, {props.action} and maintain your calorie consumption.</Header>
      </div>
    </div>
  );
};
export default welcome;
