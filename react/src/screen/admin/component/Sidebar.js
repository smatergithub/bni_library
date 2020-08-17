import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'fas fa-home',
    params: 'dashboard',
    notif: false,
  },
  {
    path: '/admin/aproval',
    name: 'Approval',
    icon: 'fas fa-check-circle',
    params: 'aproval',
    notif: true,
  },
  {
    path: '/admin/books',
    name: 'Daftar Buku',
    icon: 'fas fa-table',
    params: 'books',
    notif: false,
  },
  {
    path: '/admin/ebooks',
    name: 'Daftar Ebook',
    icon: 'fas fa-file-pdf',
    params: 'ebooks',
    notif: false,
  },
  {
    path: '/admin/repository',
    name: 'Daftar Repository',
    icon: 'fas fa-file-pdf',
    params: 'repository',
    notif: false,
  },
  {
    path: '/admin/users',
    name: 'Daftar User',
    icon: 'fas fa-id-badge',
    params: 'users',
    notif: false,
  },
  {
    path: '/admin/history',
    name: 'History',
    icon: 'fas fa-align-left',
    params: 'history',
    notif: false,
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
                {/* {rt.notif && (
                  <span
                    style={{
                      width: 25,
                      height: 25,
                      backgroundColor: 'green',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      right: '2em',
                      borderRadius: '50%',
                    }}
                  >
                    3
                  </span>
                )} */}
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
