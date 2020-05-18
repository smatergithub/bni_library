import React, { useState } from 'react';
import { Modal } from '../../../../component';
const mockBookFavorite = [
  {
    title: 'Andi',
    view: 2000,
    author: 'Erlanga',
    rate: 9,
  },
  {
    title: 'Satria',
    view: 2000,
    author: 'Google',
    rate: 9,
  },
  {
    title: 'Onni chan',
    view: 2000,
    author: 'Gojek',
    rate: 9,
  },
  {
    title: 'Ahmad',
    view: 2000,
    author: 'Erlanga',
    rate: 9,
  },
  {
    title: 'Erlangga',
    view: 2000,
    author: 'Google',
    rate: 9,
  },
];

function User() {
  let [showModal, setShowModal] = useState(false);
  let [showModalDeletion, setShowModalDeletion] = useState(false);
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <Modal title="Konfirmasi" open={showModal} onCLose={() => setShowModal(false)}>
        <div className="my-5">Anda yakin untuk menjadikan Grennady sebagai admin?</div>
      </Modal>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => setShowModalDeletion(false)}
      >
        <div className="my-5">Anda yakin untuk menghapus user ini?</div>
      </Modal>
      <main className="w-full flex-grow p-6">
        <div className="flex flex-wrap mt-5 px-1">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">USER</h3>
                  </div>
                </div>
              </div>
              <div className="block w-full ">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        nama
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        email
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Status
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        ROle
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        action
                      </th>
                      <th className="px-1 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" />
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookFavorite.map((book, key) => {
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
                            {book.author}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <button
                              onClick={() => setShowModal(true)}
                              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                              type="button"
                              style={{
                                transition: 'all .15s ease',
                              }}
                            >
                              Make as Admin
                            </button>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <div
                              className="text-red-600 cursor-pointer"
                              onClick={() => setShowModalDeletion(true)}
                            >
                              Delete
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
      </main>
    </div>
  );
}

export default User;
