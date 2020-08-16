import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Profile from './profile';
import BorrowedBook from './borrowedBook';
import BorrowedEbook from './borrowedEbook';
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
    main: () => <BorrowedBook />,
  },
  {
    path: '/profile/ebooks',
    exact: false,
    main: () => <BorrowedEbook />,
  },
];

function Accounts(props) {
  const { match } = props;
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-5">
      <div className="pl-4 flex items-center">
        <Link to="/">
          <div className="toggleColour text-gray-900 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            BNI
          </div>
        </Link>
      </div>
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
