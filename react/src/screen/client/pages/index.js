import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../component/Navbar';
import LandingPages from './landingPages';

const routes = [
  {
    path: '/welcome',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/home',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/katalog',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/riset',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/about',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/faq',
    exact: false,
    main: () => <LandingPages />,
  },
];

function HomeUser(props) {
  const { history, match } = props;
  function createNewBook() {
    history.push('/admin/add-new-book');
  }
  return (
    <Switch>
      <div>
        <NavBar />
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={false}>
            <route.main {...props} />
          </Route>
        ))}
      </div>
    </Switch>
  );
}
HomeUser.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default HomeUser;
