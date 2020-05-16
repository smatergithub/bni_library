import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from '../screen/admin/pages';
import CreateNewRepo from '../screen/client/createNewRepo';
import Login from '../screen/client/login';
import Register from '../screen/client/register';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/:id" component={Dashboard} />
        <Route exact path="/buat-repo-baru" component={CreateNewRepo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default Routes;
