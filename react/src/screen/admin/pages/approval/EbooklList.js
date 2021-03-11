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

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(999999999);
  const [currentPage, setCurrentPage] = useState(0);

  const mappingDataSourceTransactionEbookList = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    props
      .ListTransactionEbook(pagination)
      .then(res => {
        // setTotalCount(props.transactionEbooks.count);
        setLoading(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

  const getEditTransactionEBook = data => {
    setDetailData(data);
    setShowModalEdit(true);
  };

  const getDetailDataEbook = data => {
    setDetailData(data);
    setShowModalDetail(true);
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, [showModalEdit]);

  function returnEbook(id) {
    props.MakeReturnEbook(id).then(res => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionEbookList();
        swal('Message!', res.msg, 'success');
      } else {
        setLoading(false);
        swal('Error!', res.msg, 'error');
      }
    });
  }

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      let duration = '';

      if (rowData && moment(rowData.endDate).diff(moment(), 'days') < -1) {
        duration = 'Lewat masa peminjaman';
      } else {
        duration = rowData && moment(rowData.endDate).diff(moment(), 'days') + 'hari';
      }
      return {
        ...rowData,
        judul: rowData.ebook ? rowData.ebook.judul : '',
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.ebook ? rowData.ebook.tahunTerbit : '',
        startDate: rowData && moment(rowData.startDate).format('YYYY-MM-DD'),
        endDate: rowData && moment(rowData.endDate).format('YYYY-MM-DD'),
        duration: duration,
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
                onClick={() => returnEbook(rowData.id)}
                disabled={rowData.status === 'Dikembalikan' ? true : false}
              >
                Return Ebook
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
            {
              columnName: 'duration',
              width: 200,
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
          rows={adjustIntegrationTable(transactionEbooks.data)}
          // currentPage={currentPage}
          // onCurrentPageChange={setCurrentPage}
          // pageSize={pageSize}
          // onPageSizeChange={setPageSize}
          // totalCount={totalCount}
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
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    transactionEbooks: state.transactions.transactionEbooks,
  };
};

export default connect(mapStateToProps, { ListTransactionEbook, MakeReturnEbook })(EbookList);
