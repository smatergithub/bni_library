import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import swal from 'sweetalert';
import Modal from '../../../../component/Modal';
import ModalDetailBook from './modalDetailBook';
import { ListTransactionBook, MakeReturnBook } from '../../../../redux/action/transaction';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';
import ModalEditApproval from './ModalEditApproval';
import moment from 'moment';
import Loader from '../../component/Loader';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);

  const mappingDataSourceTransactionBookList = () => {
    setLoading(true);
    const pagination = {
      page: 1,
      limit: 999999999,
    };
    props
      .ListTransactionBook(pagination)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    mappingDataSourceTransactionBookList();
  }, []);

  React.useEffect(() => {
    mappingDataSourceTransactionBookList();
  }, [showModalEdit]);

  function returnBook() {
    props.MakeReturnBook(detailData.id).then((res) => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionBookList();
        swal('Message!', res.msg, 'success');
        setShowModalConfirmation(false);
      } else {
        setLoading(false);
        swal('Error!', res.msg, 'error');
      }
    });
  }

  const getDetailDataBook = (data) => {
    setDetailData(data);
    setShowModalDetail(true);
  };

  const getEditTransactionBook = (data) => {
    setDetailData(data);
    setShowModalEdit(true);
  };

  const getDetailDataConfirmationBook = (data) => {
    setDetailData(data);
    setShowModalConfirmation(true);
  };

  const adjustIntegrationTable = (dataSource) => {
    return dataSource.map((rowData) => {
      let dateNow = moment().format('YYYY-MM-DD');
      let startDate = moment(rowData.startDate).format('YYYY-MM-DD');
      let endDate = moment(rowData.endDate);

      let period = rowData && endDate.diff(startDate, 'days') + ' hari';

      let duration;

      if (rowData && endDate.diff(dateNow, 'days') >= 1) {
        duration = rowData && endDate.diff(startDate, 'days') + ' hari';
      } else {
        duration = rowData && endDate.diff(dateNow, 'days') + ' hari';
      }

      return {
        ...rowData,
        judul: rowData.book && rowData.book.judul,
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.book && rowData.book.tahunTerbit,
        startDate: rowData && moment(rowData.startDate).format('YYYY-MM-DD'),
        endDate: rowData && moment(rowData.endDate).format('YYYY-MM-DD'),
        quantity: rowData.quantity,
        period: period,
        duration: duration,
        actions: (
          <React.Fragment>
            <button
              className="bg-orange-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getEditTransactionBook(rowData)}
            >
              Edit
            </button>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getDetailDataBook(rowData)}
            >
              detail
            </button>
            {rowData.status !== 'Dikembalikan' ? (
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => {
                  getDetailDataConfirmationBook(rowData);
                }}
                disabled={rowData.status === 'Dikembalikan' ? true : false}
              >
                Kembalikan Buku
              </button>
            ) : (
              '-'
            )}
          </React.Fragment>
        ),
      };
    });
  };

  const { transactionBooks } = props;

  return (
    <React.Fragment>
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
      ) : transactionBooks.data !== undefined && transactionBooks.data.length > 0 ? (
        <React.Fragment>
          <TableDevExtreme
            columns={[
              { name: 'code', title: 'Code' },
              { name: 'judul', title: 'Judul' },
              { name: 'tahunTerbit', title: 'Tahun Terbit' },
              { name: 'quantity', title: 'Jumlah' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'npp', title: 'NPP' },
              { name: 'startDate', title: 'Tanggal Pinjam' },
              { name: 'endDate', title: 'Tanggal Kembali' },
              { name: 'period', title: 'Jangka Pinjam' },
              { name: 'duration', title: 'Sisa Durasi' },
              { name: 'status', title: 'Status' },
              { name: 'actions', title: 'Action' },
            ]}
            columnExtensions={[
              {
                columnName: 'code',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'judul',
                width: 300,
                wordWrapEnabled: true,
              },
              {
                columnName: 'nama',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'npp',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'tahunTerbit',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'startDate',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'endDate',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'period',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'duration',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'quantity',
                width: 100,
                wordWrapEnabled: true,
              },
              {
                columnName: 'status',
                width: 150,
                wordWrapEnabled: true,
              },
              {
                columnName: 'actions',
                width: 300,
                wordWrapEnabled: true,
              },
            ]}
            rows={adjustIntegrationTable(transactionBooks.data)}
          />
        </React.Fragment>
      ) : (
        <NoData />
      )}

      <ModalDetailBook
        showModalDetail={showModalDetail}
        detailData={detailData}
        onCloseModal={() => {
          setDetailData({});
          setShowModalDetail(false);
        }}
      />
      {showModalEdit ? (
        <ModalEditApproval
          showModalDetail={showModalEdit}
          detailData={detailData}
          typeApproval="editTransactionBook"
          onCloseModal={() => {
            setDetailData({});
            setShowModalEdit(false);
          }}
        />
      ) : null}
      <Modal
        title="Konfirmasi"
        open={showModalConfirmation}
        onCLose={() => {
          setDetailData({});
          setShowModalConfirmation(false);
        }}
        handleSubmit={returnBook}
        labelSubmitButton="submit"
      >
        <div className="my-5">Anda yakin untuk melakukan tindakan ini?</div>
      </Modal>
    </React.Fragment>
  );
}

let mapStateToProps = (state) => {
  return {
    transactionBooks: state.transactions.transactionBooks,
  };
};

export default connect(mapStateToProps, { ListTransactionBook, MakeReturnBook })(BookList);
