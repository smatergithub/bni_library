import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks, DeleteBookAction } from '../../../../redux/action/books';
import Table from '../../component/Table';
import TableDevExtreme from "../../../../component/TableDevExtreme";
import { NoData } from '../../../../component';
import Modal from '../../../../component/Modal';
import ModalDetailBook from './modalDetailBook';

const Books = props => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 0,
    limit: 0,
    judul: '',
  });

  const mappingDataSourceBookList = filterOptions => {
    setLoading(true);
    props
      .getBooks(filterOptions)
      .then(res => {
        if (res) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const getDetailDataBook = data => {
    setDetailData(data);
    setShowModalDetail(true);
  };

  const getDetailDataDeleteBook = data => {
    setDetailData(data);
    setShowModalDeletion(true);
  };

  const handleActionDeleteBook = () => {
    setLoading(true);
    props
      .DeleteBookAction(detailData.id)
      .then(response => {
        mappingDataSourceBookList(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => console.log('err', err));
  };

  React.useEffect(() => {
    mappingDataSourceBookList(filterOptions);
  }, []);

  const onPaginationUpdated = pagination => {
    if (pagination.judul) {
      setFilterOptions({
        judul: pagination.judul,
        page: pagination.page,
        limit: pagination.limit,
      });
    } else {
      setFilterOptions({
        page: pagination.page,
        limit: pagination.limit,
        judul: '',
      });
    }
  };

  React.useEffect(() => {
    mappingDataSourceBookList(filterOptions);
  }, [filterOptions]);


  const adjustIntegrationTable = (dataSource) => {
    return dataSource.map(rowData => {

      return {
        ...rowData,
        judul :rowData.book && rowData.book.judul,
        pengarang : rowData.book && rowData.book.pengarang,
        tahunTerbit : rowData.book && rowData.book.tahunTerbit,
        status : rowData.book && rowData.book.status,
        stockBuku : rowData.book && rowData.book.stockBuku,
        nama : rowData.user && rowData.user.nama,
        npp : rowData.user && rowData.user.npp,
        actions : ( <React.Fragment>
            <React.Fragment>
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => getDetailDataBook(rowData)}
              >
                detail
              </button>
              <Link to={`/admin/edit-book?id=${rowData.book.id}`}>
                <button
                  className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  style={{ marginRight: '5px' }}
                >
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                onClick={() => getDetailDataDeleteBook(rowData.book)}
              >
                Delete
              </button>
            </React.Fragment>
          </React.Fragment>)
      }
    })
  }

  if (loading) return null;
  const { books } = props;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Buku</h1>
        <div className="w-2/12 absolute " style={{ right: '2em', top: '5em' }}>
          <Link to="/admin/add-new-book">
            <button
              type="button"
              className="w-full bg-orange-500 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            >
              <i className="fas fa-plus mr-3" /> Buku Baru
            </button>
          </Link>
        </div>
        {books.data !== undefined && books.data.length !== 0 ? (
          <TableDevExtreme
            columns={[
              { name: 'judul', title: 'Judul' },
              { name: 'pengarang', title: 'Pengarang' },
              { name: 'tahunTerbit', title: 'tahunTerbit' },
              { name: 'stockBuku', title: 'Stock Buku' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'npp', title: 'Npp' },
              { name: 'actions', title: 'Action' },
            ]}
            columnExtensions={[
              {
                columnName: "judul",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "pengarang",
                width: 250,
                wordWrapEnabled: true
              },
              {
                columnName: "tahunTerbit",
                width: 150,
                wordWrapEnabled: true
              },
               {
                columnName: "stockBuku",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "nama",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "npp",
                width: 100,
                wordWrapEnabled: true
              },
              {
                columnName: "actions",
                width: 300,
                wordWrapEnabled: true
              }
               ]}
            rows={adjustIntegrationTable(books.data)}
            // source={books}
            // isLoading={loading}
            // limit={filterOptions.limit}
            // page={filterOptions.page}
            // onPaginationUpdated={onPaginationUpdated}
            // searchDefaultValue={filterOptions.judul}
          />
        ) : (
          <NoData />
        )}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => {
          setDetailData({});
          setShowModalDeletion(false);
        }}
        handleSubmit={handleActionDeleteBook}
      >
        <div className="my-5">Anda yakin untuk menghapus Buku ini?</div>
      </Modal>
      <ModalDetailBook
        showModalDetail={showModalDetail}
        detailData={detailData}
        onCloseModal={() => {
          setDetailData({});
          setShowModalDetail(false);
        }}
      />
    </div>
  );
};

let mapStateToProps = state => {
  return {
    books: state.books.books,
  };
};

export default connect(mapStateToProps, { getBooks, DeleteBookAction })(Books);
