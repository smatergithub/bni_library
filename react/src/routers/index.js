import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Detail from '../pages/detail';
import Home from '../pages/home/index';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </Router>
  );
}

export default Routes;
