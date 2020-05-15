import React from 'react';
import PropTypes from 'prop-types';

const mockBookFavorite = [
  {
    title: 'Algorithm and Data structures for beginner',
    view: 2000,
    author: 'Erlanga',
    rate: 9,
  },
  {
    title: 'Coding Crack Interview',
    view: 2000,
    author: 'Google',
    rate: 9,
  },
  {
    title: 'Javascript for Babies',
    view: 2000,
    author: 'Gojek',
    rate: 9,
  },
  {
    title: 'Algorithm and Data structures for beginner',
    view: 2000,
    author: 'Erlanga',
    rate: 9,
  },
  {
    title: 'Coding Crack Interview',
    view: 2000,
    author: 'Google',
    rate: 9,
  },
];
const mockEbook = [
  {
    title: 'Data science for beginner',
    author: 'James bond',
  },
  {
    title: 'Competitive Programer',
    author: 'Grennady',
  },
  {
    title: 'Top Coder hack',
    author: 'Grennady',
  },
  {
    title: 'Web Development using Deno land',
    author: 'Grennady',
  },
  {
    title: 'Competitive Programer',
    author: 'Grennady',
  },
];
function FavoriteBookAndEbookList({ goToEBookDetail, goToBookDetail }) {
  return (
    <div className="flex flex-wrap mt-5 px-1">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">Buku Terfavorit</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-gray-800 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => goToBookDetail()}
                  style={{
                    transition: 'all .15s ease',
                  }}
                >
                  See all
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-hide">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Judul
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Tahun terbit
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    View
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockBookFavorite.map(book => {
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {book.title}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {book.view}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {book.author}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <i className="fas fa-arrow-up text-green-500 mr-4" />
                        {book.rate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-4/12 pl-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-1 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">DAFTAR EBOOK</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-gray-800 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{
                    transition: 'all .15s ease',
                  }}
                  onClick={() => goToEBookDetail()}
                >
                  See all
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light">
                <tr>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Judul
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Author
                  </th>
                  <th
                    className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    style={{
                      minWidth: '140px',
                    }}
                  />
                </tr>
              </thead>
              <tbody>
                {mockEbook.map(ebook => {
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {ebook.title}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {ebook.author}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">60%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{
                                  width: '60%',
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
FavoriteBookAndEbookList.propTypes = {
  goToEBookDetail: PropTypes.func.isRequired,
  goToBookDetail: PropTypes.func.isRequired,
};
export default FavoriteBookAndEbookList;
