import React, { useState } from 'react';
import { NoData } from '../../../../component';
import { connect } from 'react-redux';
import { ListTransactionEbook } from '../../../../redux/action/transaction';
import ModalDetailEbook from './ModalDetailEBook';
import TableDevExtreme from '../../../../component/TableDevExtreme/tableClient';

import moment from 'moment';
import Loader from '../../component/Loader';

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);

  const [pageSize, setPageSize] = React.useState(999999999);
  const [currentPage, setCurrentPage] = useState(0);

  const mappingDataSourceTransactionEbookList = () => {
    setLoading(true);
    const pagination = {
      page: currentPage + 1,
      limit: pageSize,
    };
    props
      .ListTransactionEbook(pagination)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

  const getDetailDataEbook = (data) => {
    setDetailData(data);
    setShowModalDetail(true);
  };

  React.useEffect(() => {
    mappingDataSourceTransactionEbookList();
  }, []);

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
        judul: rowData.ebook ? rowData.ebook.judul : '',
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.ebook ? rowData.ebook.tahunTerbit : '',
        startDate: rowData && moment(rowData.startDate).format('YYYY-MM-DD'),
        endDate: rowData && moment(rowData.endDate).format('YYYY-MM-DD'),
        period: period,
        duration: duration,
        actions: (
          <React.Fragment>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => getDetailDataEbook(rowData)}
            >
              detail
            </button>
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
    </React.Fragment>
  );
}

let mapStateToProps = (state) => {
  return {
    transactionEbooks: state.transactions.transactionEbooks,
  };
};

export default connect(mapStateToProps, { ListTransactionEbook })(EbookList);
