import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../component/Navbar';
import LandingPages from './landingPages';
import Books from './books';
import About from './about';
import Faq from './faq';
import Research from './research';
import Home from './home';

const routes = [
  {
    path: '/',
    exact: true,
    main: props => <LandingPages {...props} />,
  },
  {
    path: '/home',
    exact: false,
    main: () => <Home />,
  },
  {
    path: '/katalog',
    exact: false,
    main: () => <LandingPages />,
  },
  {
    path: '/riset',
    exact: false,
    main: () => <Research />,
  },
  {
    path: '/about',
    exact: false,
    main: () => <About />,
  },
  {
    path: '/books',
    exact: false,
    main: () => <Books />,
  },
  {
    path: '/faq',
    exact: false,
    main: () => <Faq />,
  },
];

function HomeUser(props) {
  const { history, match } = props;

  return (
    <Switch>
      <div>
        <NavBar url={match.params.id} props={props} />
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
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
