import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import EbookAPI from '../../../../api/EbookApi';
import { UploadEbookFIle } from '../../../../redux/action/ebooks';
import { NoData } from '../../../../component';
import Modal from '../../../../component/Modal';
import ModalDetailEbook from './ModalDetailEBook';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';
import Loader from '../../component/Loader';
import { Button } from 'antd';

const Ebooks = props => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [ebooks, setEbooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(99999999);
  const [currentPage, setCurrentPage] = useState(0);
  let exportFile = React.useRef(null);

  const mappingDataSourceEbookList = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    EbookAPI.list(pagination)
      .then(res => {
        // setTotalCount(props.ebooks.count);
        setEbooks(res.data);
        setLoading(false);
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
    EbookAPI.delete(detailData.id)
      .then(response => {
        swal('Message!', 'Ebook Berhasil di hapus', 'success');
        mappingDataSourceEbookList();
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => {
        swal('Error!', 'Ebook Gagal di hapus', 'error');
        setLoading(true);
      });
  };

  React.useEffect(() => {
    mappingDataSourceEbookList();
  }, []);

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        judul: rowData.judul,
        pengarang: rowData.pengarang,
        tahunTerbit: rowData.tahunTerbit,
        status: rowData.status,
        actions: (
          <React.Fragment>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getDetailDataEbook(rowData)}
            >
              Detail
            </button>
            <Link to={`/admin/edit-ebook?id=${rowData.id}`}>
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
              onClick={() => getDetailDataDeleteEbook(rowData)}
            >
              Delete
            </button>
          </React.Fragment>
        ),
      };
    });
  };

  let uploadDocument = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let request = {
      file: file,
    };
    setLoading(true);
    reader.onloadend = () => {
      props.UploadEbookFIle(request).then(res => {
        if (res.resp) {
          swal('Message!', 'Buku Berhasil di import', 'success');
          setLoading(false);
          mappingDataSourceEbookList();
        } else {
          swal('Error!', 'Buku Gagal Import', 'error');
        }
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
  };

  const ExportExampleEbook = () => {
    setLoading(true);
    EbookAPI.getExampleEbookFormat()
      .then(response => {
        var reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {
          window.open(reader.result, '_blank');
        };
        reader.onerror = function(error) {
          console.log('Error: ', error);
        };
        setLoading(false);
      })
      .catch(err => {
        let msg = err.message || 'Something Wrong, request failed !';
        return { resp: false, msg: msg };
      });
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="mb-10"
        >
          <div>
            <p style={{ fontSize: '26px' }} className="text-black">
              Daftar Ebook
            </p>
          </div>
          <div>
            <Link to="/admin/add-new-ebook">
              <Button
                type="primary"
                size={'large'}
                style={{ borderRadius: '8px', marginRight: '24px' }}
                disabled={loading}
              >
                Buat Ebook Baru
              </Button>
            </Link>
            <Button
              onClick={() => exportFile.current.click()}
              disabled={loading}
              size={'large'}
              style={{ borderRadius: '8px', marginRight: '24px' }}
            >
              Import Ebook
            </Button>
            <Button
              type="link"
              disabled={loading}
              size={'large'}
              style={{ color: '#ED8935' }}
              onClick={() => ExportExampleEbook()}
            >
              Contoh Import Ebook
            </Button>
            <input
              onChange={e => uploadDocument(e)}
              type="file"
              style={{
                display: 'none',
              }}
              ref={exportFile}
              className=""
              accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              aria-label="Email"
            />
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '600px',
              flex: '1 1 0',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        ) : ebooks.data !== undefined && ebooks.data.length > 0 ? (
          <React.Fragment>
            <TableDevExtreme
              columns={[
                { name: 'judul', title: 'Judul' },
                { name: 'pengarang', title: 'Pengarang' },
                { name: 'tahunTerbit', title: 'Tahun Terbit' },
                { name: 'actions', title: 'Action' },
              ]}
              // columnExtensions={[
              //   {
              //     columnName: 'judul',
              //     width: 350,
              //     wordWrapEnabled: false,
              //   },
              //   {
              //     columnName: 'pengarang',
              //     width: 250,
              //     wordWrapEnabled: false,
              //   },
              //   {
              //     columnName: 'tahunTerbit',
              //     width: 150,
              //     wordWrapEnabled: true,
              //   },
              //   {
              //     columnName: 'actions',
              //     width: 300,
              //     wordWrapEnabled: true,
              //   },
              // ]}
              rows={adjustIntegrationTable(ebooks.data)}
              // currentPage={currentPage}
              // onCurrentPageChange={setCurrentPage}
              // pageSize={pageSize}
              // onPageSizeChange={setPageSize}
              // totalCount={totalCount}
            />
          </React.Fragment>
        ) : (
          <NoData />
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
  return {};
};

export default connect(mapStateToProps, { UploadEbookFIle })(Ebooks);
