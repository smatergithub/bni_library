import React, { useState } from 'react';
import { NoData } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import { connect } from 'react-redux';
import { getAllEbookHistory } from '../../../../redux/action/history';
import TableDevExtreme from '../../../../component/TableDevExtreme';
import Loader from '../../component/Loader';

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(9999999999);
  const [currentPage, setCurrentPage] = useState(0);

  const getAllHistoryEbook = () => {
    setLoading(true);
    // const pagination = {
    //   page: currentPage + 1,
    //   limit: pageSize,
    // };
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    props
      .getAllEbookHistory(pagination)
      .then(res => {
        if (res) {
          setTotalCount(props.historyEbooks.count);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  // React.useEffect(() => {
  //   getAllHistoryEbook();
  // }, [currentPage, totalCount, pageSize]);

  React.useEffect(() => {
    getAllHistoryEbook();
  }, []);

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        judul: rowData.ebook && rowData.ebook.judul,
        nama: rowData.user ? rowData.user.nama : '',
        npp: rowData.user ? rowData.user.npp : '',
        tahunTerbit: rowData.ebook && rowData.ebook.tahunTerbit,
        quantity: rowData.quantity,
      };
    });
  };

  if (loading) return null;
  const { historyEbooks } = props;
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
      ) : historyEbooks.data !== undefined && historyEbooks.data.length > 0 ? (
        <React.Fragment>
          <TableDevExtreme
            columns={[
              { name: 'code', title: 'Code' },
              { name: 'judul', title: 'Judul' },
              { name: 'tahunTerbit', title: 'Tahun Terbit' },
              { name: 'quantity', title: 'Jumlah ' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'npp', title: 'NPP' },
              { name: 'status', title: 'Status' },
              { name: 'actions', title: 'Action' },
            ]}
            // columnExtensions={[
            //   {
            //     columnName: 'code',
            //     width: 150,
            //     wordWrapEnabled: true,
            //   },
            //   {
            //     columnName: 'judul',
            //     width: 250,
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
            //   {
            //     columnName: 'actions',
            //     width: 300,
            //     wordWrapEnabled: true,
            //   },
            // ]}
            rows={adjustIntegrationTable(historyEbooks.data)}
            // currentPage={currentPage}
            // onCurrentPageChange={setCurrentPage}
            // pageSize={pageSize}
            // onPageSizeChange={setPageSize}
            // totalCount={totalCount}
          />
        </React.Fragment>
      ) : (
        <NoData msg="Tidak ada Transaksi Ebook" isEmpty />
      )}
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    historyEbooks: state.historys.historyEbooks,
  };
};

export default connect(mapStateToProps, { getAllEbookHistory })(EbookList);
