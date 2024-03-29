import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, isValidToken, getMe } from '../../../redux/action/user';
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
import FavoriteBooks from './favoriteBook';
import FavoriteEbooks from './favoriteEbook';
import NotFound from './notFound';

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
    path: '/not-found',
    exact: false,
    main: <NotFound />,
  },
  {
    path: '/katalog',
    exact: false,
    main: <LandingPages />,
  },
  {
    path: '/favorite-book',
    exact: false,
    main: <FavoriteBooks />,
  },
  {
    path: '/favorite-ebook',
    exact: false,
    main: <FavoriteEbooks />,
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
  const [profile, setProfile] = React.useState({});
  const { match } = props;
  function logoutUser() {
    props.logout().then((res) => {
      if (res.resp) {
        localStorage.removeItem('access_token_ebni');
        localStorage.removeItem('bni_repoAdmin');
        localStorage.removeItem('bni_UserRole');
        window.location.replace('/auth/login');
      }
    });
  }
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';

  React.useEffect(() => {
    if (isUserLogged && isUserLogged !== null) {
      props.getMe().then((res) => {
        if (res !== undefined) {
          setProfile(res.data);
        }
      });
    }
  }, [isUserLogged]);

  React.useEffect(() => {
    props.isValidToken().then((res) => {
      if (res.msg === '0') {
        localStorage.removeItem('access_token_ebni');
        localStorage.removeItem('bni_UserRole');
      }
    });
  }, []);

  return (
    <div>
      <NavBar url={match.params.id} props={props} isAuth={isUserLogged} logout={logoutUser} />

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
let mapStateToProps = (state) => {
  return { user: state.users.user, me: state.users.profile };
};
export default connect(mapStateToProps, { logout, isValidToken, getMe })(HomeUser);
