import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookAPI from '../../../../api/BookApi';
import { UploadBookFIle } from '../../../../redux/action/books';
import { Button } from 'antd';
import swal from 'sweetalert';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';
import { NoData } from '../../../../component';
import Modal from '../../../../component/Modal';
import ModalDetailBook from './modalDetailBook';
import Loader from '../../component/Loader';

const Books = props => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(99999999);
  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBooks] = useState([]);
  let exportFile = React.useRef(null);

  const mappingDataSourceBookList = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    BookAPI.list(pagination)
      .then(res => {
        // setTotalCount(props.books.count);
        setBooks(res.data);
        setLoading(false);
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
    BookAPI.delete(detailData.id)
      .then(response => {
        swal('Message!', 'Buku Berhasil di hapus', 'success');
        mappingDataSourceBookList();
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => {
        swal('Error!', 'Buku Gagal di hapus', 'error');
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   mappingDataSourceBookList();
  // }, [currentPage, totalCount, pageSize]);

  useEffect(() => {
    mappingDataSourceBookList();
  }, []);

  const ExportExampleBook = () => {
    setLoading(true);
    BookAPI.getExampleBookFormat()
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
        swal('Error!', 'Gagal Download Example File', 'error');
      });
  };

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        judul: rowData.judul,
        pengarang: rowData.pengarang,
        tahunTerbit: rowData.tahunTerbit,
        status: rowData.status,
        stockBuku: rowData.stockBuku,
        actions: (
          <React.Fragment>
            <React.Fragment>
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => getDetailDataBook(rowData)}
              >
                Detail
              </button>
              <Link to={`/admin/edit-book?id=${rowData.id}`}>
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
                onClick={() => getDetailDataDeleteBook(rowData)}
              >
                Delete
              </button>
            </React.Fragment>
          </React.Fragment>
        ),
      };
    });
  };

  const uploadPdf = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let request = {
      file: file,
    };
    setLoading(true);
    reader.onloadend = () => {
      props.UploadBookFIle(request).then(res => {
        if (res) {
          swal('Message!', 'Buku Berhasil di import', 'success');
          mappingDataSourceBookList();
          setLoading(false);
        } else {
          swal('Error!', 'Buku Gagal Import', 'error');
        }
      });
      // setSourceLink(file);
    };

    reader.readAsDataURL(file);
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
              Daftar Buku
            </p>
          </div>
          <div>
            <Link to="/admin/add-new-book">
              <Button
                type="primary"
                size={'large'}
                disabled={loading}
                style={{ borderRadius: '8px', marginRight: '24px' }}
              >
                Buat Buku Baru
              </Button>
            </Link>
            <Button
              onClick={() => exportFile.current.click()}
              disabled={loading}
              size={'large'}
              style={{ borderRadius: '8px', marginRight: '24px' }}
            >
              Import Buku
            </Button>

            <Button
              onClick={() => ExportExampleBook()}
              type="link"
              disabled={loading}
              size={'large'}
              style={{ color: '#ED8935' }}
            >
              Contoh Import Buku
            </Button>

            <input
              onChange={e => uploadPdf(e)}
              type="file"
              style={{
                display: 'none',
              }}
              ref={exportFile}
              className=""
              // accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
        ) : books.data !== undefined && books.data.length > 0 ? (
          <React.Fragment>
            <TableDevExtreme
              columns={[
                { name: 'judul', title: 'Judul' },
                { name: 'pengarang', title: 'Pengarang' },
                { name: 'tahunTerbit', title: 'Tahun Terbit' },
                { name: 'stockBuku', title: 'Stock Buku' },
                { name: 'actions', title: 'Action' },
              ]}
              // columnExtensions={[
              //   {
              //     columnName: 'judul',
              //     width: 320,
              //     wordWrapEnabled: true,
              //   },
              //   {
              //     columnName: 'pengarang',
              //     width: 200,
              //     wordWrapEnabled: false,
              //   },
              //   {
              //     columnName: 'tahunTerbit',
              //     width: 150,
              //     wordWrapEnabled: true,
              //   },
              //   {
              //     columnName: 'stockBuku',
              //     width: 150,
              //     wordWrapEnabled: true,
              //   },
              //   {
              //     columnName: 'actions',
              //     width: 300,
              //     wordWrapEnabled: true,
              //   },
              // ]}
              rows={adjustIntegrationTable(books.data)}
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
  return {};
};

export default connect(mapStateToProps, { UploadBookFIle })(Books);
