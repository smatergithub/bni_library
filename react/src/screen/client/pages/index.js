import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../component/Navbar';
import LandingPages from './landingPages';
import Books from './books';
import About from './about';
import Faq from './faq';
import Research from './research';
import Home from './home';
import Accounts from '../../auth/account';
import DetailBooks from './detailBooks';

const routes = [
  {
    path: '/',
    exact: true,
    main: <LandingPages />,
  },
  {
    path: '/home',
    exact: false,
    main: <Home />,
  },
  {
    path: '/katalog',
    exact: false,
    main: <LandingPages />,
  },
  {
    path: '/riset',
    exact: false,
    main: <Research />,
  },
  {
    path: '/about',
    exact: false,
    main: <About />,
  },
  {
    path: '/books',
    exact: false,
    main: <Books />,
  },
  {
    path: '/ebook',
    exact: false,
    main: <Books />,
  },
  {
    path: '/faq',
    exact: false,
    main: <Faq />,
  },
  {
    path: '/detail-book',
    exact: false,
    main: <DetailBooks />,
  },
  {
    path: '/profile/home',
    exact: false,
    main: <Accounts />,
  },
];

function HomeUser(props) {
  let { user } = props;
  const { match } = props;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
  return (
    <div>
      <NavBar url={match.params.id} props={props} isAuth={isUserLogged} />

      {routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact} component={() => route.main} />
      ))}
    </div>
  );
}
HomeUser.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
let mapState = state => {
  return { user: state.user };
};
export default connect(mapState)(HomeUser);
