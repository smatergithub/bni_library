import React from 'react';
import { Link } from 'react-router-dom';
const routes = [
  {
    path: '/profile/home',
    name: 'AKUN',
    params: 'home',
    type: 'all',
    icon: 'fas fa-user-alt',
  },
  {
    path: '/profile/wishlist',
    name: 'WISHLIST',
    params: 'wishlist',
    type: 'user',
    icon: 'fas fa-th-list',
  },
  {
    path: '/profile/books',
    name: 'BUKU',
    params: 'books',
    type: 'user',
    icon: 'fas fa-book',
  },
  {
    path: '/profile/ebooks',
    name: 'EBOOK',
    params: 'ebooks',
    type: 'user',
    icon: 'fas fa-file-pdf',
  },
];
const Sidebar = ({ url }) => {
  let isAdmin = localStorage.getItem('bni_UserRole') !== '1';
  return (
    <div className="relative xs:h-20   md:h-screen w-64  sm:block">
      <nav className="text-white xs:flex md:block   text-base font-semibold nav-item-profile-active">
        {isAdmin &&
          routes.map((rt, key) => {
            if (rt.type !== 'user') {
              return (
                <Link to={`${rt.path}`} key={key}>
                  <div
                    className={
                      url === rt.params
                        ? 'flex items-center  text-orange-600 xs:py-4 xs:pl-6 md:py-4 md:pl-6   nav-item-profile'
                        : 'flex items-center   text-gray-800 hover:text-white   xs:py-4 xs:pl-6 md:py-4 md:pl-6'
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
                      ? 'flex items-center  text-orange-600 xs:py-4 xs:pl-6 md:py-4 md:pl-6  '
                      : 'flex items-center   text-gray-800 hover:text-orange-600 xs:py-4 xs:pl-1 md:py-4 xs:text-center md:pl-6  '
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
