import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Dashboard from '../screen/admin/pages';
import Home from '../screen/client/pages';
import Auth from '../screen/auth';

function Routes() {
  return (
    <Router>
      <Route exact path="/:id" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/admin/:id" component={Dashboard} />
      <Route exact path="/auth/:id" component={Auth} />
    </Router>
  );
}

export default Routes;
