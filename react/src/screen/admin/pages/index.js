import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout, getMe } from '../../../redux/action/user';

import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Dashboard from './dashboard';
import CreateNewBook from './createNewBook';
import Books from './books';
import Ebooks from './ebooks';
import CreateNewEbook from './createNewEbook';
import CreateNewRepo from './createNewRepo';
import Repository from './repository';
import User from './users';
import Wilayah from './wilayah';
import Approval from './approval';
import History from './history';

const routes = [
  {
    path: '/admin/dashboard',
    exact: false,
    main: props => <Dashboard {...props} />,
  },
  {
    path: '/admin/books',
    exact: false,
    main: () => <Books />,
  },
  {
    path: '/admin/ebooks',
    exact: false,
    main: () => <Ebooks />,
  },
  {
    path: '/admin/repository',
    exact: false,
    main: () => <Repository />,
  },
  {
    path: '/admin/new-repository',
    exact: false,
    main: props => <CreateNewRepo {...props} />,
  },
  {
    path: '/admin/edit-repository',
    exact: false,
    main: props => <CreateNewRepo {...props} />,
  },
  {
    path: '/admin/analytics',
    exact: false,
    main: () => <Dashboard />,
  },
  {
    path: '/admin/users',
    exact: false,
    main: () => <User />,
  },
  {
    path: '/admin/wilayah',
    exact: false,
    main: () => <Wilayah />,
  },
  {
    path: '/admin/add-new-book',
    exact: false,
    main: props => <CreateNewBook {...props} />,
  },
  {
    path: '/admin/edit-book',
    exact: false,
    main: props => <CreateNewBook {...props} />,
  },
  {
    path: '/admin/edit-ebook',
    exact: false,
    main: props => <CreateNewEbook {...props} />,
  },
  {
    path: '/admin/add-new-ebook',
    exact: false,
    main: props => <CreateNewEbook {...props} />,
  },
  {
    path: '/admin/aproval',
    exact: false,
    main: props => <Approval {...props} />,
  },
  {
    path: '/admin/history',
    exact: false,
    main: props => <History {...props} />,
  },
];

function HomeAdmin(props) {
  const { history, match } = props;
  function createNewBook() {
    history.push('/admin/add-new-book');
  }
  function logoutUser() {
    props.logout().then(res => {
      if (res.resp) {
        localStorage.removeItem('access_token_ebni');
        localStorage.removeItem('bni_UserRole');
        localStorage.removeItem('bni_repoAdmin')
        window.location.replace('/auth/login');
      }
    });
  }
  function updateProfile() {
    history.push('/profile/home');
  }
  React.useEffect(() => {
    props.getMe();
  });
  return (
    <div className="bg-gray-100 font-family-karla flex modal-active">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin | BNI</title>
      </Helmet>
      <div
        style={{
          zIndex: '10000',
          background: '#EC8937',
        }}
      >
        <Sidebar url={match.params.id} createNewBook={createNewBook} user={props.user} />
      </div>
      <div className="w-full flex flex-col  overflow-y-hidden">
        <Switch>
          <div>
            <Header logout={logoutUser} updateProfile={updateProfile} />
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route key={index} path={route.path} exact={route.exact}>
                <route.main {...props} />
              </Route>
            ))}
          </div>
        </Switch>
      </div>
    </div>
  );
}
let mapState = state => {
  let { user } = state;

  return { user };
};
HomeAdmin.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default connect(mapState, { logout, getMe })(HomeAdmin);
