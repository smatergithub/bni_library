import React from 'react';

import Table from '../../component/Table';

function EBooks() {
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Ebook</h1>
        <Table />
      </main>
    </div>
  );
}

export default EBooks;
