import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import TableDevExtreme from '../../../../component/TableDevExtreme';
import Loader from '../../component/Loader';

import { getAllBookHistory } from '../../../../redux/action/history';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(99999999);
  const [currentPage, setCurrentPage] = useState(0);

  const getAllHistoryBook = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    // const pagination = {
    //   page: currentPage + 1,
    //   limit: pageSize,
    // };
    props
      .getAllBookHistory(pagination)
      .then((res) => {
        // setTotalCount(props.historyBooks.count);
        setLoading(false);
      })
      .catch((err) => {});
  };

  // React.useEffect(() => {
  //   getAllHistoryBook();
  // }, [currentPage, totalCount, pageSize]);

  React.useEffect(() => {
    getAllHistoryBook();
  }, []);

  const adjustIntegrationTable = (dataSource) => {
    return dataSource.map((rowData) => {
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
      ) : historyBooks.data !== undefined && historyBooks.data.length > 0 ? (
        <React.Fragment>
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
            // columnExtensions={[
            //   {
            //     columnName: 'code',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'judul',
            //     width: 300,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'nama',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'npp',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'tahunTerbit',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'quantity',
            //     width: 100,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'status',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            // ]}
            rows={adjustIntegrationTable(historyBooks.data)}
            // currentPage={currentPage}
            // onCurrentPageChange={setCurrentPage}
            // pageSize={pageSize}
            // onPageSizeChange={setPageSize}
            // totalCount={totalCount}
          />
        </React.Fragment>
      ) : (
        <NoData msg="Tidak ada Transaksi Buku" isEmpty />
      )}
    </React.Fragment>
  );
}

let mapStateToProps = (state) => {
  return {
    historyBooks: state.historys.historyBooks,
  };
};

export default connect(mapStateToProps, { getAllBookHistory })(BookList);
