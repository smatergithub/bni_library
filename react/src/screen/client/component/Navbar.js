import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let dropdown = (
  <React.Fragment>
    <div className="origin-top-right absolute top-20 left-0 mt-2 w-32 rounded-md shadow-lg katalog-dropdown">
      <div
        className="rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1">
          <Link to="/books">
            <div
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              Buku
            </div>
          </Link>
          <Link to="/ebook">
            <div
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              Ebook
            </div>
          </Link>
        </div>
      </div>
    </div>
  </React.Fragment>
);

const routes = [
  {
    path: '/home',
    params: 'home',
    name: 'HOME',
    dropdown: null,
  },
  {
    path: '/katalog',
    params: 'katalog',
    name: 'KATALOG',
    dropdown: dropdown,
  },
  {
    path: '/riset',
    params: 'riset',
    name: 'RISET',
    dropdown: null,
  },
  {
    path: '/about',
    params: 'about',
    name: 'ABOUT',
    dropdown: null,
  },
  {
    path: '/faq',
    params: 'faq',
    name: 'FAQ',
    dropdown: null,
  },
];

function NavBar(props) {
  let { history } = props;
  const [selectedMenu, setSelectedMenu] = useState(props.url);
  console.log(props.wishlist.length);
  let badge =
    props.wishlist.length !== 0 ? (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          position: 'absolute',
          right: -10,
          top: -10,
          backgroundColor: '#fc8181',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.wishlist.length}
      </div>
    ) : (
      ''
    );
  return (
    <nav
      id="header"
      className={`fixed w-full z-30 top-0 text-white bg-white `}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <div
            className="toggleColour text-gray-900 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            onClick={() => history.push('/')}
          >
            BNI
          </div>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center p-1 text-orange-800 hover:text-gray-900"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {routes.map(rt => {
              return (
                <li className="mr-3">
                  <Link
                    to={rt.params === 'katalog' ? '' : `${rt.path}`}
                    onClick={() => setSelectedMenu(rt.params)}
                  >
                    <div
                      className={`relative inline-block text-sm text-gray-900 no-underline hover:text-gray-500  py-2 px-4 ${
                        selectedMenu === rt.params ? 'border-b-2 border-gray-900' : ''
                      } ${rt.params === 'katalog' ? 'katalog-hover' : ''}`}
                    >
                      <div className="relative">
                        {rt.name}{' '}
                        {rt.params === 'katalog' ? (
                          <i
                            className="fas fa-caret-down absolute "
                            style={{
                              top: 6,
                              right: -17,
                            }}
                          />
                        ) : null}
                      </div>
                      {rt.dropdown}
                    </div>
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              {props.isAuth && (
                <Link to="/profile/home">
                  <div className="cursor-pointer relative bg-gray-700 p-2  rounded-full w-8 h-8 flex justify-center content-center">
                    <i className="fas fa-user text-lg text-white"></i>
                    {badge}
                  </div>
                </Link>
              )}
              {!props.isAuth && (
                <Link to="/auth/login">
                  <button className="mx-auto lg:mx-0 hover:underline bg-gray-800 text-white  rounded-sm my-2 py-2 px-5 shadow-lg">
                    Masuk
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}
let mapStateToProps = state => {
  return {
    wishlist: state.wishlist.item,
  };
};

export default connect(mapStateToProps, null)(NavBar);
