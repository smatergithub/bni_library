import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from '../screen/admin/pages';
import CreateNewRepo from '../screen/client/createNewRepo';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/:id" component={Dashboard} />
        <Route exact path="/buat-repo-baru" component={CreateNewRepo} />
      </Switch>
    </Router>
  );
}

export default Routes;
