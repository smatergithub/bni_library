import React from 'react';
import { connect } from 'react-redux';
import {
  getWilayah,
  DeleteWilayahAction,
  EditWilayahAction,
  CreateNewWilayahAction,
} from '../../../../redux/action/wilayah';
import Table from '../../component/Table';
import Modal from '../../../../component/Modal';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';
import { Link } from 'react-router-dom';
import CreateEditWilayahModal from './createEditWilayahModal';

const Wilayah = props => {
  const [loading, setLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
    judul: '',
  });

  const retrieveDataWilayah = filterOptions => {
    setLoading(true);
    props
      .getWilayah(filterOptions)
      .then(res => {
        if (res) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    retrieveDataWilayah(filterOptions);
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
    retrieveDataWilayah(filterOptions);
  }, [filterOptions]);

  const getDetailWilayah = (id, MakeAdmin) => {
    const { wilayah } = props;
    let detailData = wilayah.data.filter(item => item.id === id);
    setDetailData(detailData[0]);
    if (MakeAdmin === 'edit') {
      setShowModalDetail(true)
    } else {
      setShowModalDeletion(true);
    }
  };

  const handleDeleteWilayah = () => {
    setLoading(true);
    props
      .DeleteWilayahAction(detailData.id)
      .then(response => {
        retrieveDataWilayah(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => {
        console.log('err', err);
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  if (loading) return null;
  const { wilayah } = props;

  const columns = [
    {
      name: 'codeWilayah',
      displayName: 'Code Wilayah',
    },
    {
      name: 'wilayah',
      displayName: 'Wilayah',
    },
    {
      name: 'alamat',
      displayName: 'Alamat',
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
                onClick={() => getDetailWilayah(rowData.id, 'edit')}
              >
                edit
                </button>
              <button
                className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                onClick={() => getDetailWilayah(rowData.id, 'delete')}
              >
                Delete
                </button>{' '}
            </React.Fragment>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Wilayah</h1>
        <div className="w-2/12 absolute " style={{ right: '2em', top: '5em' }}>
          <button
            type="button"
            className="w-full bg-gray-800 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            onClick={() => {
              setDetailData({});
              setShowModalDetail(true);
            }}
          >
            <i className="fas fa-plus mr-3" /> Tambah Wilayah
          </button>
        </div>
        {wilayah.data !== undefined ? (
          <Table
            columns={columns}
            source={wilayah}
            isLoading={loading}
            limit={filterOptions.limit}
            page={filterOptions.page}
            onPaginationUpdated={onPaginationUpdated}
            searchDefaultValue={filterOptions.judul}
          />
        ) : null}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => {
          setDetailData({});
          setShowModalDeletion(false);
        }}
        handleSubmit={handleDeleteWilayah}
      >
        <div className="my-5">Anda yakin untuk menghapus wilayah ini?</div>
      </Modal>
      <CreateEditWilayahModal
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
    wilayah: state.wilayah.wilayah,
  };
};

export default connect(mapStateToProps, {
  getWilayah,
  DeleteWilayahAction,
  EditWilayahAction,
  CreateNewWilayahAction,
})(Wilayah);
