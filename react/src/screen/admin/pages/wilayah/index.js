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
import TableDevExtreme from "../../../../component/TableDevExtreme";
import CreateEditWilayahModal from './createEditWilayahModal';

const Wilayah = props => {
  const [loading, setLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});

  const [totalCount, setTotalCount] = React.useState(0);
  const [pageSize] =React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(0);

  let exportFile = React.useRef(null);

  const retrieveDataWilayah = () => {
    setLoading(true);
    const pagination = {
      page : currentPage + 1,
      limit : pageSize
    }
    props
      .getWilayah(pagination)
      .then(res => {
        if (res) {
           setTotalCount(props.wilayah.count);
        setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    retrieveDataWilayah();
  },[currentPage,totalCount]);

  const uploadPdf = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      props.UploadWilayahFile({ file }).then(res => {
        if (res) {
          console.log('res', res);
          ToastSuccess(res.msg);
          props.history.push('/admin/wilayah');
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
    let detailData = wilayah.data.filter(item => item.id === id);
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
      .then(response => {
        retrieveDataWilayah();
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


    const adjustIntegrationTable = (dataSource) => {
    return dataSource.map(rowData => {

      return {
        ...rowData,
        actions : (   <React.Fragment>
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
            </React.Fragment>)
      }
    })
  }


  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Wilayah</h1>
        <div className="absolute" style={{ right: '2em', top: '5em',display:'flex',flexDirection:'row',width:'392px' }}>

            <button
            style={{marginRight:'42px'}}
            type="button"
            className="w-full bg-orange-500 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            onClick={() => {
              setDetailData({});
              setShowModalDetail(true);
            }}
          >
            <i className="fas fa-plus mr-3" /> Tambah Wilayah
          </button>
          <input
                  onChange={e => uploadPdf(e)}
                  type="file"
                  style={{
                    display: 'none',
                  }}
                  ref={exportFile}
                  className=""
                  accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  aria-label="Email"
                />
          <button

            type="button"
            className="w-full white text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl  flex items-center justify-center"
            onClick={() => exportFile.current.click()}
          >
           <span style={{color:'black'}}> <i className="fas fa-plus mr-3" /> Import Wilayah</span>
          </button>
        </div>
        {wilayah.data !== undefined ? (
           <TableDevExtreme
            columns={[
              { name: 'codeWilayah', title: 'Code Wilayah' },
              { name: 'wilayah', title: 'Wilayah' },
              { name: 'alamat', title: 'Alamat' },
              { name: 'actions', title: 'Action' },
            ]}
            rows={adjustIntegrationTable(wilayah.data)}
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            totalCount={totalCount}
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
  UploadWilayahFile
})(Wilayah);
