import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function WithAdminAuth({ user, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user.role === 'admin' && user.isAuth ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
}
WithAdminAuth.propTypes = {
  component: PropTypes.any.isRequired,
};

export default WithAdminAuth;
