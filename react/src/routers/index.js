import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import Dashboard from '../screen/admin/pages'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/:id" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default Routes;
