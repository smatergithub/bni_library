import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import TableDevExtreme from '../../../../component/TableDevExtreme';
import { IsEmptyObject } from '../../component/IsEmptyObject';

import { getAllBookHistory } from '../../../../redux/action/history';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const getAllHistoryBook = () => {
    setLoading(true);
    const pagination = {
      page: currentPage + 1,
      limit: pageSize,
    };
    props
      .getAllBookHistory(pagination)
      .then(res => {
        setTotalCount(props.historyBooks.count);
        setLoading(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    getAllHistoryBook();
  }, [currentPage, totalCount, pageSize]);

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        judul: rowData.book && rowData.book.judul,
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.book && rowData.book.tahunTerbit,
        quantity: rowData.quantity,
      };
    });
  };

  if (loading) return null;
  const { historyBooks } = props;
  return (
    <React.Fragment>
      {!IsEmptyObject(historyBooks) &&
      historyBooks.data !== undefined &&
      historyBooks.data.length !== 0 ? (
        <TableDevExtreme
          columns={[
            { name: 'code', title: 'Code' },
            { name: 'judul', title: 'Judul' },
            { name: 'tahunTerbit', title: 'Tahun Terbit' },
            { name: 'quantity', title: 'Jumlah' },
            { name: 'nama', title: 'Peminjam' },
            { name: 'npp', title: 'NPP' },
            { name: 'status', title: 'Status' },
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
              columnName: 'quantity',
              width: 100,
              wordWrapEnabled: true,
            },
            {
              columnName: 'status',
              width: 150,
              wordWrapEnabled: true,
            },
          ]}
          rows={adjustIntegrationTable(historyBooks.data)}
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalCount={totalCount}
        />
      ) : (
        <NoData msg="Belum transaksi buku!" isEmpty />
      )}
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    historyBooks: state.historys.historyBooks,
  };
};

export default connect(mapStateToProps, { getAllBookHistory })(BookList);
