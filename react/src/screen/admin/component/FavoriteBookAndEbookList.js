import React from 'react';
import PropTypes from 'prop-types';
import { NoData } from '../../../component';

function FavoriteBookAndEbookList({
  isLoading,
  mockBookFavorite,
  mockEbook,
  goToEBookDetail,
  goToBookDetail,
}) {
  return (
    <div className="flex flex-wrap mt-5 px-1">
      <div className="w-full xl:w-6/12 mb-12 xl:mb-0 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">Buku Terfavorit</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-orange-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
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
            {mockBookFavorite && mockBookFavorite.length !== 0 ? (
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
                      Pengarang
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? null
                    : mockBookFavorite !== null
                    ? mockBookFavorite.map(book => {
                        return (
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                              {book.title.length > 10
                                ? book.title.substring(0, 10) + '...'
                                : book.title}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {book.tahunTerbit}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {book.pengarang}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {/* <i className="fas fa-arrow-up text-green-500 mr-4" /> */}
                              {book.rating}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <div>
                <NoData msg="Belum ada data buku favorit" isEmpty />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full xl:w-6/12 pl-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-1 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">Ebook Favorit</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-orange-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
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
          <div className="block w-full ">
            {mockEbook && mockEbook !== undefined && mockEbook.length !== 0 ? (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead className="thead-light">
                  <tr>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Judul
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Author
                    </th>
                    {/* <th
                    className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                    style={{
                      minWidth: '140px',
                    }}
                  /> */}
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? null
                    : mockEbook && mockEbook !== undefined
                    ? mockEbook.map(ebook => {
                        return (
                          <tr className="p-4">
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 whitespace-no-wrap p-2 ">
                              {ebook.judul.length > 15
                                ? ebook.judul.substring(0, 15) + '...'
                                : ebook.judul}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 whitespace-no-wrap p-2">
                              {ebook.pengarang}
                            </td>
                            {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
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
                      </td> */}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <NoData msg="Belum ada data ebook " isEmpty />
            )}
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
