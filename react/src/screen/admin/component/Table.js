import React from 'react';

const dataTable = [
  {
    no: 12,
    name: 'ADRIAN',
    npp: 123434,
    status: 'ACTIVE',
    address: 'BATAM',
  },
  {
    no: 12,
    name: 'EMMA',
    npp: 123434,
    status: 'ACTIVE',
    address: 'BATAM',
  },
  {
    no: 12,
    name: 'HENDRA',
    npp: 123434,
    status: 'ACTIVE',
    address: 'BATAM',
  },
  {
    no: 12,
    name: 'SILVA',
    npp: 123434,
    status: 'ACTIVE',
    address: 'BATAM',
  },
];
function Table() {
  return (
    <div className="bg-white overflow-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">NAMA</th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">NPP</th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
              JUDUL BUKU
            </th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">STATUS</th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">LOKASI</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {dataTable.map((item, key) => {
            return (
              <tr className={key % 2 === 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-300'}>
                <td className="w-1/6 text-left py-3 px-4">{item.no}</td>
                <td className="w-1/6 text-left py-3 px-4">{item.name}</td>
                <td className="w-1/6 text-left py-3 px-4">{item.npp}</td>
                <td className="w-1/6 text-left py-3 px-4">{item.npp}</td>
                <td className="w-1/6 text-left py-3 px-4">{item.status}</td>
                <td className="w-1/6 text-left py-3 px-4">{item.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center bg-gray-300 mt-10">
        <nav class="relative z-0 inline-flex shadow-sm">
          <a
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <div
            href="#"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700  transition ease-in-out duration-150"
          >
            1 of 9
          </div>

          <a
            href="#"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}
export default Table;
