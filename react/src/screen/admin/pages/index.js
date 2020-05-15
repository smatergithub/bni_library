import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../component/Sidebar';
// import Header from '../component/Header';
import Dashboard from './dashboard';
import CreateNewBook from './createNewBook';
import Books from './books';
import Ebooks from './ebooks';

const routes = [
  {
    path: '/admin/dashboard',
    exact: true,
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
    path: '/admin/analytics',
    exact: false,
    main: () => <Dashboard />,
  },
  {
    path: '/admin/add-new-book',
    exact: false,
    main: props => <CreateNewBook {...props} />,
  },
];

function HomeAdmin(props) {
  const { history, match } = props;
  function createNewBook() {
    history.push('/admin/add-new-book');
  }
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <div
        style={{
          zIndex: '10000',
        }}
      >
        <Sidebar url={match.params.id} createNewBook={createNewBook} />
      </div>
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        {/* <Header /> */}
        <Switch>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route key={index} path={route.path} exact={route.exact}>
              <route.main {...props} />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  );
}
HomeAdmin.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
export default HomeAdmin;
