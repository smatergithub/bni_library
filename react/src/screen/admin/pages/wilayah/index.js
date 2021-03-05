import React from 'react';
import { connect } from 'react-redux';
import {
  getWilayah,
  DeleteWilayahAction,
  EditWilayahAction,
  CreateNewWilayahAction,
  UploadWilayahFile,
} from '../../../../redux/action/wilayah';
import Modal from '../../../../component/Modal';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';
import CreateEditWilayahModal from './createEditWilayahModal';
import Loader from '../../component/Loader';

const Wilayah = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});

  // const [isFetching, setIsFetching] = React.useState(false);
  // const [totalCount, setTotalCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(99999999);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchValue, setSearchState] = React.useState('');

  let exportFile = React.useRef(null);

  const retrieveDataWilayah = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
      // q: searchValue,
    };
    props
      .getWilayah(pagination)
      .then((res) => {
        if (res) {
          // setTotalCount(props.wilayah.count);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  // const retrieveSearchDataWilayah = () => {
  //   setIsFetching(true);
  //   const pagination = {
  //     page: currentPage + 1,
  //     limit: pageSize,
  //     q: searchValue,
  //   };
  //   props
  //     .getWilayah(pagination)
  //     .then(res => {
  //       if (res) {
  //         setTotalCount(props.wilayah.count);
  //         setIsFetching(false);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //     });
  // };

  React.useEffect(() => {
    retrieveDataWilayah();
  }, []);

  // React.useEffect(() => {
  //   retrieveSearchDataWilayah();
  // }, [searchValue]);

  const uploadExcel = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    setIsLoading(true);
    reader.onloadend = () => {
      props.UploadWilayahFile({ file }).then((res) => {
        if (res) {
          ToastSuccess(res.msg);
          setIsLoading(false);
          retrieveDataWilayah();
        } else {
          ToastError(res.msg);
        }
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
  };

  const getDetailWilayah = (id, MakeAdmin) => {
    const { wilayah } = props;
    let detailData = wilayah.data.filter((item) => item.id === id);
    setDetailData(detailData[0]);
    if (MakeAdmin === 'edit') {
      setShowModalDetail(true);
    } else {
      setShowModalDeletion(true);
    }
  };

  const handleDeleteWilayah = () => {
    setLoading(true);
    props
      .DeleteWilayahAction(detailData.id)
      .then((response) => {
        retrieveDataWilayah();
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch((err) => {
        console.log('err', err);
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  if (loading) return null;
  const { wilayah } = props;

  const adjustIntegrationTable = (dataSource) => {
    return dataSource.map((rowData) => {
      return {
        ...rowData,
        actions: (
          <React.Fragment>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getDetailWilayah(rowData.id, 'edit')}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              onClick={() => getDetailWilayah(rowData.id, 'delete')}
            >
              Delete
            </button>{' '}
          </React.Fragment>
        ),
      };
    });
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        {/* <h1 className="w-full text-3xl text-black pb-6">Daftar Wilayah</h1> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <h1 className="w-full text-3xl text-black ">Daftar Wilayah</h1>
          <button
            style={{ marginRight: '42px', width: '380px', height: '34px' }}
            type="button"
            className=" bg-orange-500 text-white font-semibold py-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            onClick={() => {
              setDetailData({});
              setShowModalDetail(true);
            }}
          >
            <i className="fas fa-plus mr-3" style={{ fontSize: '18px' }} /> Tambah Wilayah
          </button>
          <input
            onChange={(e) => uploadExcel(e)}
            type="file"
            style={{
              display: 'none',
            }}
            disabled={isLoading}
            ref={exportFile}
            className=""
            accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            aria-label="Email"
          />
          <button
            type="button"
            style={{ width: '380px', height: '34px' }}
            className="w-full white text-white font-semibold py-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl  flex items-center justify-center"
            onClick={() => exportFile.current.click()}
          >
            <i className="fas fa-plus mr-3" style={{ fontSize: '18px', color: 'black' }} />{' '}
            <span style={{ color: 'black' }}>Import Wilayah</span>
          </button>
        </div>
        {isLoading ? (
          <div className="w-full lg:w-1/1 mt-32 pl-0 lg:pl-2">
            <Loader />
          </div>
        ) : (
          <React.Fragment>
            {wilayah.data !== undefined ? (
              <TableDevExtreme
                columns={[
                  { name: 'codeWilayah', title: 'Code Wilayah' },
                  { name: 'wilayah', title: 'Wilayah' },
                  { name: 'alamat', title: 'Alamat' },
                  { name: 'actions', title: 'Action' },
                ]}
                rows={adjustIntegrationTable(wilayah.data)}
                // currentPage={currentPage}
                // onCurrentPageChange={setCurrentPage}
                // pageSize={pageSize}
                // onPageSizeChange={setPageSize}
                // onValueChange={setSearchState}
                // setLoading={isFetching}
                // totalCount={totalCount}
              />
            ) : null}
          </React.Fragment>
        )}
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

let mapStateToProps = (state) => {
  return {
    wilayah: state.wilayah.wilayah,
  };
};

export default connect(mapStateToProps, {
  getWilayah,
  DeleteWilayahAction,
  EditWilayahAction,
  CreateNewWilayahAction,
  UploadWilayahFile,
})(Wilayah);
