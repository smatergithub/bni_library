import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import { getEbooks, DeleteEbookAction } from '../../../../redux/action/ebooks';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';
import Modal from '../../../../component/Modal';
import { IsEmptyObject } from '../../component/IsEmptyObject';
import ModalDetailEbook from './ModalDetailEBook';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';

const Ebooks = props => {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDeletion, setShowModalDeletion] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(99999999);
  const [currentPage, setCurrentPage] = useState(0);

  const mappingDataSourceEbookList = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    props
      .getEbooks(pagination)
      .then(res => {
        // setTotalCount(props.ebooks.count);
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
    props
      .DeleteEbookAction(detailData.id)
      .then(response => {
        if (response.resp) {
          ToastSuccess(response.msg);
        } else {
          ToastError(response.msg);
        }
        mappingDataSourceEbookList();
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => console.log('err', err));
  };

  React.useEffect(() => {
    mappingDataSourceEbookList();
  }, []);

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        judul: rowData.ebook.judul,
        pengarang: rowData.ebook && rowData.ebook.pengarang,
        tahunTerbit: rowData.ebook && rowData.ebook.tahunTerbit,
        status: rowData.ebook && rowData.ebook.status,
        namaPeminjam: rowData.user ? rowData.user.nama : '-',
        npp: rowData.user ? (rowData.user.npp ? rowData.user.npp : '-') : '-',
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
            <Link to={`/admin/edit-ebook?id=${rowData.ebook.id}`}>
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
        ),
      };
    });
  };

  if (loading) return null;
  const { ebooks } = props;

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          className="mb-10"
        >
          <h1 className="w-full text-3xl text-black pb-6">Daftar Ebook</h1>
          <div className="w-2/12  " style={{ right: '2em', top: '5em' }}>
            <Link to="/admin/add-new-ebook">
              <button
                type="button"
                className="w-full bg-orange-500 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
              >
                <i className="fas fa-plus mr-3" /> Ebook Baru
              </button>
            </Link>
          </div>
        </div>

        {!IsEmptyObject(ebooks) && ebooks.data !== undefined && ebooks.data.length !== 0 ? (
          <TableDevExtreme
            columns={[
              { name: 'judul', title: 'Judul' },
              { name: 'pengarang', title: 'Pengarang' },
              { name: 'tahunTerbit', title: 'Tahun Terbit' },
              { name: 'npp', title: 'NPP' },
              { name: 'namaPeminjam', title: 'Nama Peminjam' },
              { name: 'actions', title: 'Action' },
            ]}
            columnExtensions={[
              {
                columnName: 'judul',
                width: 350,
                wordWrapEnabled: false,
              },
              {
                columnName: 'pengarang',
                width: 250,
                wordWrapEnabled: false,
              },
              {
                columnName: 'tahunTerbit',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'namaPeminjam',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'npp',
                width: 100,
                wordWrapEnabled: true,
              },
              {
                columnName: 'actions',
                width: 300,
                wordWrapEnabled: true,
              },
            ]}
            rows={adjustIntegrationTable(ebooks.data)}
            // currentPage={currentPage}
            // onCurrentPageChange={setCurrentPage}
            // pageSize={pageSize}
            // onPageSizeChange={setPageSize}
            // totalCount={totalCount}
          />
        ) : (
          <NoData msg="Data belum Tersedia !" />
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
