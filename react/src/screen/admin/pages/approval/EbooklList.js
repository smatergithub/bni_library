import React, { useState } from 'react';
import { NoData } from '../../../../component';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { MakeReturnEbook, ListTransactionEbook } from '../../../../redux/action/transaction';
import ModalDetailEbook from './ModalDetailEBook';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';
import ModalEditApproval from './ModalEditApproval';
import moment from 'moment';
import Loader from '../../component/Loader';
import Modal from '../../../../component/Modal';

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);

  const mappingDataSourceTransactionEbookList = () => {
    setLoading(true);
    const pagination = {
      page: 1,
      limit: 999999999,
    };
    props
      .ListTransactionEbook(pagination)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

  const getEditTransactionEBook = (data) => {
    setDetailData(data);
    setShowModalEdit(true);
  };

  const getDetailDataEbook = (data) => {
    setDetailData(data);
    setShowModalDetail(true);
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, [showModalEdit]);

  const getDetailDataConfirmationEbook = (data) => {
    setDetailData(data);
    setShowModalConfirmation(true);
  };

  function returnEbook() {
    props.MakeReturnEbook(detailData.id).then((res) => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionEbookList();
        swal('Message!', res.msg, 'success');
        setShowModalConfirmation(false);
      } else {
        setLoading(false);
        swal('Error!', res.msg, 'error');
      }
    });
  }

  const adjustIntegrationTable = (dataSource) => {
    return dataSource.map((rowData) => {
      let dateNow = moment().format('YYYY-MM-DD');
      let startDate = moment(rowData.startDate).format('YYYY-MM-DD');
      let endDate = moment(rowData.endDate);

      // let period = rowData && endDate.diff(startDate, 'days') + ' hari';

      // let duration;

      // if (rowData && endDate.diff(dateNow, 'days') >= 1) {
      //   duration = rowData && endDate.diff(startDate, 'days') + ' hari';
      // } else {
      //   duration = rowData && endDate.diff(dateNow, 'days') + ' hari';
      // }
      return {
        ...rowData,
        judul: rowData.ebook ? rowData.ebook.judul : '',
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.ebook ? rowData.ebook.tahunTerbit : '',
        startDate: rowData && moment(rowData.startDate).format('YYYY-MM-DD'),
        endDate: rowData && moment(rowData.endDate).format('YYYY-MM-DD'),
        // period: period,
        // duration: duration,
        actions: (
          <React.Fragment>
            <button
              className="bg-orange-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getEditTransactionEBook(rowData)}
            >
              Edit
            </button>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getDetailDataEbook(rowData)}
            >
              detail
            </button>
            {rowData.status !== 'Dikembalikan' ? (
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => {
                  getDetailDataConfirmationEbook(rowData);
                }}
                disabled={rowData.status === 'Dikembalikan' ? true : false}
              >
                Kembalikan Ebook
              </button>
            ) : (
              '-'
            )}
          </React.Fragment>
        ),
      };
    });
  };

  const { transactionEbooks } = props;

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
      ) : transactionEbooks.data !== undefined && transactionEbooks.data.length > 0 ? (
        <TableDevExtreme
          columns={[
            { name: 'code', title: 'Code' },
            { name: 'judul', title: 'Judul' },
            { name: 'tahunTerbit', title: 'Tahun Terbit' },
            { name: 'nama', title: 'Peminjam' },
            { name: 'npp', title: 'NPP' },
            { name: 'startDate', title: 'Tanggal Pinjam' },
            { name: 'endDate', title: 'Tanggal Kembali' },
            // { name: 'period', title: 'Jangka Pinjam' },
            // { name: 'duration', title: 'Sisa Durasi' },
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
              width: 250,
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
            // {
            //   columnName: 'period',
            //   width: 150,
            //   wordWrapEnabled: true,
            // },
            // {
            //   columnName: 'duration',
            //   width: 150,
            //   wordWrapEnabled: true,
            // },
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
          rows={adjustIntegrationTable(transactionEbooks.data)}
        />
      ) : (
        <NoData />
      )}

      <ModalDetailEbook
        showModalDetail={showModalDetail}
        detailData={detailData}
        onCloseModal={() => {
          setDetailData({});
          setShowModalDetail(false);
        }}
      />
      {showModalEdit && (
        <ModalEditApproval
          showModalDetail={showModalEdit}
          detailData={detailData}
          typeApproval="editTransactionEBook"
          onCloseModal={() => {
            setDetailData({});
            setShowModalEdit(false);
          }}
        />
      )}
      <Modal
        title="Konfirmasi"
        open={showModalConfirmation}
        onCLose={() => {
          setDetailData({});
          setShowModalConfirmation(false);
        }}
        handleSubmit={returnEbook}
        labelSubmitButton="submit"
      >
        <div className="my-5">Anda yakin untuk melakukan tindakan ini?</div>
      </Modal>
    </React.Fragment>
  );
}

let mapStateToProps = (state) => {
  return {
    transactionEbooks: state.transactions.transactionEbooks,
  };
};

export default connect(mapStateToProps, { ListTransactionEbook, MakeReturnEbook })(EbookList);
