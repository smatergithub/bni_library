import React from 'react';
import { Link } from 'react-router-dom';
const routes = [
  {
    path: '/profile/home',
    name: 'AKUN',
    params: 'home',
  },
  {
    path: '/profile/wishlist',
    name: 'WISHLIST',
    params: 'wishlist',
  },
  {
    path: '/profile/books',
    name: 'BUKU',
    params: 'books',
  },
];
const Sidebar = ({ url }) => {
  return (
    <div className="relative  h-screen w-64  sm:block">
      <nav className="text-white text-base font-semibold">
        {routes.map((rt, key) => {
          return (
            <Link to={`${rt.path}`} key={key}>
              <div
                className={
                  url === rt.params
                    ? 'flex items-center  text-white  py-4 pl-6 nav-item-profile-active nav-item-profile'
                    : 'flex items-center   text-gray-800 hover:text-white py-4 pl-6 nav-item-profile'
                }
              >
                <i className={`${rt.icon} mr-3`} />
                {rt.name}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
