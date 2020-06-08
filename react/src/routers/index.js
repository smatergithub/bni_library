import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Dashboard from '../screen/admin/pages';
import Home from '../screen/client/pages';
import Auth from '../screen/auth';

import WithAdmin from './authAdmin';

function Routes(props) {
  return (
    <Router>
      <Route exact path="/:id" component={Home} />
      <Route exact path="/" component={Home} />
      <WithAdmin user={props.user} path="/admin/:id" component={Dashboard} />
      <Route exact path="/auth/:id" component={Auth} />
    </Router>
  );
}
let mapState = state => {
  let { user } = state;

  return { user };
};
export default connect(mapState)(Routes);
