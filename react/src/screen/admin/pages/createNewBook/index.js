import React from 'react';

function CreateNewBook() {
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Biografi Buku</h1>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/1 mt-6 pl-0 lg:pl-2">
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl">
                <p className="text-lg text-gray-800 font-medium pb-4">Informasi Buku</p>
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Judul
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline  "
                    type="text"
                    required=""
                    aria-label="Name"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Pengarang
                  </label>
                  <input
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Pernyataan tanggung jawab
                  </label>
                  <input
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="cus_email">
                    Edisi
                  </label>
                  <input
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    aria-label="Email"
                  />
                </div>
                <div className="mt-2">
                  <label className=" block text-sm text-gray-600" htmlFor="message">
                    Deskripsi
                  </label>
                  <textarea
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    rows="6"
                    required=""
                    placeholder="Masukkan informasi buku"
                    aria-label="Email"
                  />
                </div>

                <div className="mt-6">
                  <button
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateNewBook;
