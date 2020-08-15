import React from 'react';
import Card from '../component/card';

function BorrowedEbook() {
  let listBook = () => {
    let books = [];
    for (var i = 0; i < 4; i++) {
      books.push(
        <>
          <Card type="borrow" />
          <div
            className="bg-gray-600 w-full"
            style={{
              height: 1,
            }}
          ></div>
        </>
      );
    }
    return books;
  };
  return (
    <React.Fragment>
      <div className="bg-gray-300 uppercase text-gray-900 text-base font-semibold py-4 pl-6">
        PINJAMAN
      </div>
      <div class="bg-white rounded-lg shadow-lg pl-10 relative">{listBook()}</div>
    </React.Fragment>
  );
}
export default BorrowedEbook;
