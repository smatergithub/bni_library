import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBooks, DeleteBookAction } from '../../../../redux/action/books';
import Table from '../../component/Table';
import Modal from "../../../../component/Modal"

const Books = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })

  const mappingDataSourceBookList = (filterOptions) => {
    setLoading(true);
    props.getBooks(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  const getDetailDataBook = (id) => {
    const { books } = props;
    let detailData = books.data.filter(item => item.id === id);
    setDetailData(detailData[0]);
    setShowModalDeletion(true);
  }

  const handleActionDeleteBook = () => {
    setLoading(true)
    props.DeleteBookAction(detailData.id).then(response => {
      mappingDataSourceBookList(filterOptions)
      setLoading(false)
      setShowModalDeletion(false);
    })
      .catch(err => console.log('err', err))
  }

  React.useEffect(() => {
    mappingDataSourceBookList(filterOptions);
  }, []);


  const onPaginationUpdated = (pagination) => {
    setFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
    })
  }

  React.useEffect(() => {
    mappingDataSourceBookList(filterOptions);

  }, [filterOptions])

  const columns = [
    {
      name: "judul",
      displayName: "Judul"
    },
    {
      name: "pengarang",
      displayName: "Pengarang"
    },
    {
      name: "tahunTerbit",
      displayName: "Tahun Terbit"
    },
    {
      name: "stockBuku",
      displayName: "Stock Buku"
    },
    {
      name: "status",
      displayName: "Status"
    },
    {
      name: "actions",
      displayName: "Actions",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            <React.Fragment>
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                onClick={() => getDetailDataBook(rowData.id)}
              >
                Delete
              </button>
            </React.Fragment>
          </React.Fragment>
        );
      },
    }
  ]

  if (loading) return null;
  const { books } = props;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Buku</h1>

        {books.data !== undefined ? <Table columns={columns} source={books} isLoading={loading} limit={filterOptions.limit} page={filterOptions.page} onPaginationUpdated={onPaginationUpdated} /> : null}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => {
          setDetailData({})
          setShowModalDeletion(false)
        }}
        handleSubmit={handleActionDeleteBook}
      >
        <div className="my-5">Anda yakin untuk menghapus user ini?</div>
      </Modal>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    books: state.books.books,
  };
};

export default connect(mapStateToProps, { getBooks, DeleteBookAction })(Books);
