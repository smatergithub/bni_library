import React from 'react';
let categoriesMock = [
  { name: 'Sains' },
  { name: 'Matematika' },
  { name: 'Sosiologi' },
  { name: 'Komputer' },
];
function Categories() {
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Kategori Buku</h1>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="block w-full overflow-x-hide">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-gray-400 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Name
                  </th>
                  <th className="px-6 bg-gray-400 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-right">
                    <div className="flex flex-row-reverse items-center">
                      <button
                        className="bg-gray-900 text-white w-1/12 active:bg-gray-700 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-2 "
                        type="button"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      >
                        add
                      </button>
                      <input
                        type="text"
                        className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-4/12"
                        placeholder="Kategori baru"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoriesMock.map(categories => {
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {categories.name}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Categories;
