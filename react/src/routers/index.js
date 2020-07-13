import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Loader from '../component/Loader';
import Dashboard from '../screen/admin/pages';
import Home from '../screen/client/pages';
import Auth from '../screen/auth';
import Account from '../screen/auth/account';

import WithAdmin from './authAdmin';

function Routes(props) {
  return (
    <>
      <Router>
        <Route exact path="/:id" component={Home} />
        <Route exact path="/" component={Home} />
        <WithAdmin user={props.user} path="/admin/:id" component={Dashboard} />
        <Route exact path="/auth/:id" component={Auth} />
        <Route exact path="/profile/:id" component={Account} />
      </Router>
      <Loader />
    </>
  );
}
let mapState = state => {
  let { user } = state;

  return { user };
};
export default connect(mapState)(Routes);
