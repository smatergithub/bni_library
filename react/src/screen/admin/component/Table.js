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
    </div>
  );
}
export default Table;
