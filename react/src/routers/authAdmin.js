import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function WithAdminAuth({ user, component: Component, ...rest }) {
  function validateRoute() {
    let role = localStorage.getItem('bni_UserRole');
    console.log(role);
    if (role === '3' || role === '2') {
      console.log('masuk sini');
      return true;
    } else {
      return false;
    }
  }
  return (
    <Route
      {...rest}
      render={props => (validateRoute() ? <Component {...props} /> : <Redirect to={'/'} />)}
    />
  );
}
WithAdminAuth.propTypes = {
  component: PropTypes.any.isRequired,
};

export default WithAdminAuth;
