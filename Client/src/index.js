import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Home from './Component/Home/home';
import Upload from './Component/Upload/MainUpload'
const Routers = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />{" "}
      <Route exact path="/upload" component={Upload} />{" "}
      {/* <Route exact path="/signup" component={SignUp}></Route> */}
      <Route component={()=>{return(<h1>404</h1>)}} />
    </Switch>
  </Router>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
ReactDOM.render(Routers, document.querySelector("#root"));