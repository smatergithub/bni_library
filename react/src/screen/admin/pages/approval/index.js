import React, { useState } from 'react';
import { Modal } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import { connect } from 'react-redux';
import BookList from './BookList';
import EbookList from './EbooklList';
import ResearchList from './ResearchList';

function Approval(props) {
  const [activeTabs, setActiveTabs] = useState('book');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Butuh Tindakan</h1>
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
                      {/* <span
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: 'red',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          right: '0',
                          top: '-1em',
                          color: 'white',
                          borderRadius: '50%',
                        }}
                      >
                        3
                      </span> */}
                    </div>
                    <div
                      className={`font-semibold text-base  px-5 py-1 border-b-2 ${
                        activeTabs === 'repo'
                          ? 'border-gray-800 text-gray-800'
                          : 'border-gray-500 text-gray-500'
                      } cursor-pointer`}
                      onClick={() => setActiveTabs('repo')}
                    >
                      REPOSITORY
                    </div>
                  </div>
                </div>
              </div>
              {/* //table */}
              {activeTabs === 'book' && <BookList />}
              {activeTabs === 'ebook' && <EbookList />}
              {activeTabs === 'repo' && <ResearchList />}
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

export default connect(mapStateToProps, null)(Approval);
