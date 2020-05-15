import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    params: 'dashboard',
  },
  {
    path: '/admin/books',
    name: 'Daftar Buku',
    icon: 'fas fa-table',
    params: 'books',
  },
  {
    path: '/admin/ebooks',
    name: 'Daftar Ebook',
    icon: 'fas fa-table',
    params: 'ebooks',
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    icon: 'fas fa-align-left',
    params: 'analytics',
  },
];

function Sidebar({ url, createNewBook }) {
  const [selectedMenu, setSelectedMenu] = useState(url);

  return (
    <div className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
        <button
          type="button"
          onClick={() => createNewBook()}
          className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
        >
          <i className="fas fa-plus mr-3" /> Buku baru
        </button>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        {routes.map(rt => {
          return (
            <Link to={`${rt.path}`} onClick={() => setSelectedMenu(rt.params)}>
              <div
                className={
                  selectedMenu === rt.params
                    ? 'flex items-center active-nav-link text-white py-4 pl-6 nav-item'
                    : 'flex items-center  text-white py-4 pl-6 nav-item'
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
}
Sidebar.propTypes = {
  url: PropTypes.string.isRequired,
  createNewBook: PropTypes.func.isRequired,
};
export default Sidebar;
