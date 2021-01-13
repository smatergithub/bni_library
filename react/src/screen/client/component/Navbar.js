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
          <Link to="/ebooks">
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
    name: 'BERANDA',
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
    name: 'TENTANG KAMI ',
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
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const ref = React.useRef(null);

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowMobileMenu(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  let localBook = JSON.parse(localStorage.getItem('bni_book'));
  let localEbook = JSON.parse(localStorage.getItem('bni_ebook'));
  let book = localBook !== null ? localBook : [];
  let ebook = localEbook !== null ? localEbook : [];

  let badge =
    book.length + ebook.length !== 0 ? (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          position: 'absolute',
          right: -10,
          top: -10,
          backgroundColor: 'green',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {ebook.length + book.length}
      </div>
    ) : (
      ''
    );
  return (
    <nav
      id="header"
      className={`fixed w-full z-30 top-0 text-white bg-orange-500 `}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link to="/">
            <div className="toggleColour text-gray-900 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              Digital Library BNI
            </div>
          </Link>
        </div>

        <div className="block lg:hidden relative pr-4">
          <button
            ref={ref}
            id="nav-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
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
        {showMobileMenu && (
          <div className="bg-white w-full text-right lg:hidden">
            {routes.map(rt => {
              return (
                <li className="mr-3">
                  <Link
                    to={rt.params === 'katalog' ? '' : `${rt.path}`}
                    onClick={() => setSelectedMenu(rt.params)}
                  >
                    <div
                      className={`relative inline-block text-sm ${
                        selectedMenu === rt.params ? 'text-orange-500' : 'text-gray-900'
                      } no-underline hover:text-gray-500  py-2 px-4 ${
                        selectedMenu === rt.params ? 'border-b-2 border-orange-500' : ''
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
                    </div>
                  </Link>
                </li>
              );
            })}

            <li className="mr-3">
              <Link to="/books">
                <div
                  href="#"
                  className="relative inline-block text-sm no-underline hover:text-gray-500  py-2 px-4 text-gray-900 "
                  role="menuitem"
                >
                  BUKU
                </div>
              </Link>
              <Link to="/ebooks">
                <div
                  href="#"
                  className="relative   py-2 text-sm text-sm no-underline hover:text-gray-500  py-2 px-4 text-gray-900 "
                  role="menuitem"
                >
                  EBOOK
                </div>
              </Link>
            </li>
          </div>
        )}
        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-orange-500 lg:bg-transparent text-black  lg:p-0 z-20"
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
                      className={`relative inline-block text-sm ${
                        selectedMenu === rt.params ? 'text-white' : 'text-gray-900'
                      } no-underline hover:text-white  py-2 px-4 ${
                        selectedMenu === rt.params ? 'border-b-2 border-white' : ''
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
                <React.Fragment>
                  <div
                    onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                    className="cursor-pointer relative bg-orange-500 p-2  rounded-full w-8 h-8 flex justify-center content-center"
                  >
                    <i className="fas fa-user text-lg text-white"></i>
                    {badge}
                  </div>
                  {showHeaderMenu ? (
                    <div
                      onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                      style={{
                        zIndex: '300000',
                      }}
                      className="absolute w- bg-white rounded-lg shadow-lg py-2 -ml-16"
                    >
                      <Link to="/profile/home">
                        <div
                          href="#"
                          className="block px-4 py-2 account-link hover:text-white"
                          // onClick={() => updateProfile()}
                        >
                          Akun
                        </div>
                      </Link>

                      <a
                        href="#"
                        className="block px-4 py-2 account-link hover:text-white"
                        onClick={() => props.logout()}
                      >
                        Keluar
                      </a>
                    </div>
                  ) : null}
                </React.Fragment>
              )}
              {!props.isAuth && (
                <Link to="/auth/login">
                  <button className="mx-auto lg:mx-0 hover:underline bg-white text-orange-500  rounded-sm my-2 py-2 px-5 shadow-lg">
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
    books: state.wishlist.books,
    ebooks: state.wishlist.ebooks,
  };
};

export default connect(mapStateToProps, null)(NavBar);
