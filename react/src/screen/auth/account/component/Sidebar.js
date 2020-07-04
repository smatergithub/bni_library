import React from 'react';
import { Link } from 'react-router-dom';
const routes = [
  {
    path: '/profile/home',
    name: 'AKUN',
    params: 'home',
    notif: false,
  },
  {
    path: '/profile/wishlist',
    name: 'WISHLIST',
    params: 'wishlist',
    notif: true,
  },
  {
    path: '/profile/pinjam',
    name: 'BUKU',
    params: 'books',
    notif: false,
  },
];
const Sidebar = ({ selectedMenu = 'home' }) => {
  return (
    <div className="relative  h-screen w-64  sm:block">
      <nav className="text-white text-base font-semibold">
        {routes.map(rt => {
          return (
            <Link to={`${rt.path}`}>
              <div
                className={
                  selectedMenu === rt.params
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
