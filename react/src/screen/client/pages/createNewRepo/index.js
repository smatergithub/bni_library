import React from 'react';

function CreateNewRepo() {
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
            <h1 className="w-full text-3xl text-black pb-6">Buat Repository Riset BNI</h1>
            <div className="leading-loose">
              <form className="p-10 bg-white rounded shadow-xl">
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="cus_name">
                    Nama Lengkap
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
                    Universitas
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
                    Judul Penelitian
                  </label>
                  <input
                    className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                    type="text"
                    required=""
                    aria-label="Email"
                  />
                </div>
                <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                  <button
                    className="w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  >
                    <i className="fas fa-file-pdf mx-2" />
                    Pilih file
                  </button>
                </div>
                <div className="inline-block mt-2 mx-1 pl-1 w-1/2">
                  <button
                    className="w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  >
                    <i className="fas fa-file-pdf mx-2" />
                    Pilih file
                  </button>
                </div>

                <div className="inline-block mt-5 -mx-1 pl-1 w-1/2">
                  <button
                    className="w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  >
                    <i className="fas fa-file-pdf mx-2" />
                    Pilih file
                  </button>
                </div>
                <div className="inline-block mt-5 mx-1 pl-1 w-1/2">
                  <button
                    className="w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  >
                    <i className="fas fa-file-pdf mx-2" />
                    Pilih file
                  </button>
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

export default CreateNewRepo;
