import React, { useState } from 'react';

import { connect } from 'react-redux';
import BookList from './BookList';
import EbookList from './EbooklList';
import { ToastError, ToastSuccess } from '../../../../component';
import { exportBookHistory,exportDataEbookHistory } from '../../../../redux/action/history';

function History(props) {
  const [activeTabs, setActiveTabs] = useState('book');
  const [loading, setLoading] = React.useState(false);


  const exportDataHistoryBook = () => {
    setLoading(true);
    props
      .exportBookHistory()
       .then(response => {
      ToastSuccess('Sukses Export History Book');
      })
      .catch(err => {
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  const exportDataHistoryEbook = () => {
    setLoading(true);
    props
      .exportDataEbookHistory()
       .then(response => {
        ToastSuccess('Sukses Export History Ebook');
      })
      .catch(err => {
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Semua Transaksi</h1>

        <div className="flex flex-wrap mt-5 px-1">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-1 py-5 max-w-full flex flex-row  flex-1">
                    <div
                      className={`font-semibold text-base  px-5 py-1 border-b-2 ${
                        activeTabs === 'book'
                          ? 'border-gray-800 text-gray-800'
                          : 'border-gray-500 text-gray-500'
                      } cursor-pointer`}
                      onClick={() => setActiveTabs('book')}
                    >
                      BUKU
                    </div>
                    <div
                      className={`relative font-semibold text-base  px-5 py-1 border-b-2 ${
                        activeTabs === 'ebook'
                          ? 'border-gray-800 text-gray-800'
                          : 'border-gray-500 text-gray-500'
                      } cursor-pointer`}
                      onClick={() => setActiveTabs('ebook')}
                    >
                      EBOOK

                    </div>
                     {activeTabs === 'book' && <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',width:'720px'}}>
                      <button
                      type="button"
                      style={{width:'300px',color:'white'}}
                        onClick={() => exportDataHistoryBook()}
                      className="bg-orange-500 text-white font-semibold  rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl"
                        >
                    <span > <i className="fas fa-plus mr-3" />Export History Buku</span>
                      </button>
                   </div>}
                    {activeTabs === 'ebook' && <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',width:'720px'}}>
                      <button
                      type="button"
                      style={{width:'300px',color:'white'}}
                        onClick={() => exportDataHistoryEbook()}
                      className="bg-orange-500 text-white font-semibold  rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl"
                        >
                    <span > <i className="fas fa-plus mr-3" />Export History Ebook</span>
                      </button>
                   </div>}

                  </div>
                </div>
              </div>

              {/* //table */}
              {activeTabs === 'book' && <BookList />}
              {activeTabs === 'ebook' && <EbookList />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

let mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {exportBookHistory, exportDataEbookHistory})(History);
