import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../screen/admin/pages';
import CreateNewRepo from '../screen/client/createNewRepo';
import Login from '../screen/client/login';
import Register from '../screen/client/register';
import ForgotPassword from '../screen/client/forgotPassword';
import ResetPassword from '../screen/client/resetPassword';

function Routes() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="admin/dashboard" />
        <Route exact path="/admin/:id" component={Dashboard} />
        <Route exact path="/buat-repo-baru" component={CreateNewRepo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/lupa-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </Router>
  );
}

export default Routes;
