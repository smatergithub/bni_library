import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Activation from './activation';

const routes = [
  {
    path: '/auth/login',
    exact: true,
    main: props => <Login {...props} />,
  },
  {
    path: '/auth/register',
    exact: false,
    main: props => <Register {...props} />,
  },
  {
    path: '/auth/forgot-password',
    exact: false,
    main: props => <ForgotPassword {...props} />,
  },
  {
    path: '/auth/activation',
    exact: false,
    main: props => <Activation {...props} />,
  },

  {
    path: '/auth/reset-password',
    exact: false,
    main: props => <ResetPassword {...props} />,
  },
];

function HomeUser(props) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact}>
          {route.main}
        </Route>
      ))}
    </Switch>
  );
}
HomeUser.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default HomeUser;
