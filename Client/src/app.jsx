import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Home from './Component/Home/home';
import Upload from './Component/Upload/MainUpload';
import Login from './Component/Auth/MainLog';
import Register from './Component/Auth/MainReg';
import Auth from './auth';
const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />{' '}
        <Route exact path="/upload" component={Auth(Upload)} />{' '}
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route component={() => <h1>404</h1>} />
      </Switch>
    </Router>
  );
};
export default Routers;
