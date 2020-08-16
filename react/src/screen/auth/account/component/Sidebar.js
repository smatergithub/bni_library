import React from 'react';
import { Link } from 'react-router-dom';
const routes = [
  {
    path: '/profile/home',
    name: 'AKUN',
    params: 'home',
    type: 'all',
  },
  {
    path: '/profile/wishlist',
    name: 'WISHLIST',
    params: 'wishlist',
    type: 'user',
  },
  {
    path: '/profile/books',
    name: 'BUKU',
    params: 'books',
    type: 'user',
  },
  {
    path: '/profile/ebooks',
    name: 'EBOOK',
    params: 'ebooks',
    type: 'user',
  },
];
const Sidebar = ({ url }) => {
  let isAdmin = localStorage.getItem('bni_UserRole') !== '1';
  return (
    <div className="relative  h-screen w-64  sm:block">
      <nav className="text-white text-base font-semibold">
        {isAdmin &&
          routes.map((rt, key) => {
            if (rt.type !== 'user') {
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
            }
          })}
        {!isAdmin &&
          routes.map((rt, key) => {
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
