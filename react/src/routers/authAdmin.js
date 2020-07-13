import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function WithAdminAuth({ user, component: Component, ...rest }) {
  function validateRoute(role) {
    let checkAccessToken = localStorage.getItem('bni_jwtToken');

    if (checkAccessToken !== null || role === '2' || role === '1') {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        validateRoute(user.role) ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
}
WithAdminAuth.propTypes = {
  component: PropTypes.any.isRequired,
};

export default WithAdminAuth;
