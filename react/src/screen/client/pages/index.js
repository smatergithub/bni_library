import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../component/Navbar';
import LandingPages from './landingPages';
import Books from './books';
import Ebook from './ebooks';
import About from './about';
import Faq from './faq';
import Research from './research';
import Home from './home';
import Accounts from '../../auth/account';
import DetailBooks from './detailBooks';
import DetailEbooks from './detailEbooks';
import Order from './order';
import ListResearch from './listResearch';
import DetailResearch from './detailResearch';
import AddNewResearch from './createNewRepo';
import AddNewResearchSuccess from './researchSuccess';

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
    path: '/daftar-riset',
    exact: false,
    main: <ListResearch />,
  },
  {
    path: '/detail-riset',
    exact: false,
    main: <DetailResearch />,
  },
  {
    path: '/riset-sukses',
    exact: false,
    main: <AddNewResearchSuccess />,
  },
  {
    path: '/tambah-riset',
    exact: false,
    main: <AddNewResearch />,
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
    path: '/ebooks',
    exact: false,
    main: <Ebook />,
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
    path: '/order',
    exact: false,
    main: <Order />,
  },
  {
    path: '/detail-ebook',
    exact: false,
    main: <DetailEbooks />,
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
