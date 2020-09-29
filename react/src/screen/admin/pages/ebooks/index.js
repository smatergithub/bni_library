import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEbooks, DeleteEbookAction } from '../../../../redux/action/ebooks';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';
import Modal from '../../../../component/Modal';
import Table from '../../component/Table';
import ModalDetailEbook from "./ModalDetailEBook";

const Ebooks = props => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
    judul: '',
  });

  const mappingDataSourceEbookList = filterOptions => {
    setLoading(true);
    props
      .getEbooks(filterOptions)
      .then(res => {
        if (res) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };



  const getDetailDataEbook = data => {
    setDetailData(data);
    setShowModalDetail(true);
  };


  const getDetailDataDeleteEbook = data => {
    setDetailData(data);
    setShowModalDeletion(true);
  };

  const handleActionDeleteEbook = () => {
    setLoading(true);
    props
      .DeleteEbookAction(detailData.id)
      .then(response => {
        if (response.resp) {
          ToastSuccess(response.msg);
        } else {
          ToastError(response.msg);
        }
        mappingDataSourceEbookList(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => console.log('err', err));
  };

  React.useEffect(() => {
    mappingDataSourceEbookList(filterOptions);
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
    mappingDataSourceEbookList(filterOptions);
  }, [filterOptions]);

  if (loading) return null;
  const { ebooks } = props;

  const columns = [
    {
      name: 'judul',
      displayName: 'Judul',
      customRender: rowData => {
        let data = rowData.ebook && rowData.ebook.judul;
        return data
      },
    },
    {
      name: 'pengarang',
      displayName: 'Pengarang',
      customRender: rowData => {
        let data = rowData.ebook && rowData.ebook.pengarang;
        return data
      },
    },
    {
      name: 'tahunTerbit',
      displayName: 'Tahun Terbit',
      customRender: rowData => {
        let data = rowData.ebook && rowData.ebook.tahunTerbit;
        return data
      },
    },
    {
      name: 'status',
      displayName: 'Status',
      customRender: rowData => {
        let data = rowData.ebook && rowData.ebook.status;
        return data
      },
    },
    {
      name: 'actions',
      displayName: 'Actions',
      customRender: rowData => {
        return (
          <React.Fragment>
            <React.Fragment>
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => getDetailDataEbook(rowData)}
              >
                detail
                </button>
              <Link to={`/admin/edit-ebook?id=${rowData}`}>
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
                onClick={() => getDetailDataDeleteEbook(rowData.ebook)}
              >
                Delete
              </button>
            </React.Fragment>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Ebook</h1>
        <div className="w-2/12 absolute " style={{ right: '2em', top: '5em' }}>
          <Link to="/admin/add-new-ebook">
            <button
              type="button"
              className="w-full bg-gray-800 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            >
              <i className="fas fa-plus mr-3" /> Ebook Baru
            </button>
          </Link>
        </div>

        {ebooks.data !== undefined && ebooks.data.length !== 0 ? (
          <Table
            columns={columns}
            source={ebooks}
            isLoading={loading}
            limit={filterOptions.limit}
            page={filterOptions.page}
            onPaginationUpdated={onPaginationUpdated}
            searchDefaultValue={filterOptions.judul}
          />
        ) : (
            <NoData msg="Data belum tersedia !" />
          )}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => {
          setDetailData(null);
          setShowModalDeletion(false);
        }}
        handleSubmit={handleActionDeleteEbook}
      >
        <div className="my-5">Anda yakin untuk menghapus Ebook ini?</div>
      </Modal>
      <ModalDetailEbook
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
    ebooks: state.ebooks.ebooks,
  };
};

export default connect(mapStateToProps, { getEbooks, DeleteEbookAction })(Ebooks);
