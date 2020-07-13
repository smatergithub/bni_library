import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Profile from './profile';
import Borrowed from './borrowed';
import Wishlist from './wishlist';

const routes = [
  {
    path: '/profile/home',
    exact: false,
    main: () => <Profile />,
  },
  {
    path: '/profile/wishlist',
    exact: false,
    main: () => <Wishlist />,
  },
  {
    path: '/profile/books',
    exact: false,
    main: () => <Borrowed />,
  },
];

function Accounts(props) {
  const { match } = props;
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-20">
      <section className="bg-gray-100 py-12 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <Sidebar url={match.params.id} />
          <div
            className="w-full flex flex-col h-screen overflow-y-hidden"
            style={{
              marginTop: -1,
            }}
          >
            <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
              <div>
                {routes.map((route, index) => (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.
                  <Route key={index} path={route.path} exact={route.exact}>
                    {route.main()}
                  </Route>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Accounts;
