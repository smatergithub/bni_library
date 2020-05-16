import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from '../screen/admin/pages';
import CreateNewRepo from '../screen/client/createNewRepo';
import Login from '../screen/client/login';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/:id" component={Dashboard} />
        <Route exact path="/buat-repo-baru" component={CreateNewRepo} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Routes;
