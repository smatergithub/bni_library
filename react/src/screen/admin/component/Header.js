import React, { useState } from 'react';

function Header({ logout, updateProfile }) {
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  return (
    <header className="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2" />
      <div className="relative w-1/2 flex justify-end">
        <button
          type="button"
          onClick={() => setShowHeaderMenu(!showHeaderMenu)}
          className=" z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          {/* <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="" /> */}
          <i className="fas fa-user text-lg text-black"></i>
        </button>
        {/* <button type="button" className="h-full w-full fixed inset-0 cursor-default" /> */}
        {showHeaderMenu ? (
          <div
            onClick={() => setShowHeaderMenu(!showHeaderMenu)}
            style={{
              zIndex: '300000',
            }}
            className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16"
          >
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
              onClick={() => updateProfile()}
            >
              Akun
            </a>

            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
              onClick={() => logout()}
            >
              Keluar
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
export default Header;
