import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '../../../redux/action/user';

import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Dashboard from './dashboard';
import CreateNewBook from './createNewBook';
import Books from './books';
import Ebooks from './ebooks';
import CreateNewEbook from './createNewEbook';
import Repository from './repository';
import User from './users';
import Approval from './approval';

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
    path: '/admin/add-new-book',
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
];

function HomeAdmin(props) {
  const { history, match } = props;
  function createNewBook() {
    history.push('/admin/add-new-book');
  }
  function logout() {
    localStorage.clear();
    props.signOut();
  }
  return (
    <div className="bg-gray-100 font-family-karla flex modal-active">
      <div
        style={{
          zIndex: '10000',
        }}
      >
        <Sidebar url={match.params.id} createNewBook={createNewBook} />
      </div>
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Switch>
          <div>
            <Header logout={logout} />
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
export default connect(mapState, { signOut })(HomeAdmin);
