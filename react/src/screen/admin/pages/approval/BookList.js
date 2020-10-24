import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import ModalDetailBook from "./modalDetailBook";
import { ListTransactionBook, MakeReturnBook } from '../../../../redux/action/transaction';
import TableDevExtreme from "../../../../component/TableDevExtreme";


function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
  });

  const mappingDataSourceTransactionBookList = filterOptions => {
    setLoading(true);
    props
      .ListTransactionBook(filterOptions)
      .then(res => {
        if (res) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    mappingDataSourceTransactionBookList(filterOptions);
  }, []);

  const onPaginationUpdated = pagination => {
    setFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
    });
  };
  function returnBook(id) {
    props.MakeReturnBook(id).then(res => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionBookList(filterOptions);
        ToastSuccess(res.msg);
      } else {
        setLoading(false);
        ToastError(res.msg);
      }
    });
  }


  const getDetailDataBook = data => {
    setDetailData(data);
    setShowModalDetail(true);
  };


  React.useEffect(() => {
    mappingDataSourceTransactionBookList(filterOptions);
  }, [filterOptions]);


   const adjustIntegrationTable = (dataSource) => {
    return dataSource.map(rowData => {

      return {
        ...rowData,
        judul :rowData.book.judul,
        nama :rowData.user ? rowData.user.nama : '',
        tahunTerbit : rowData.book.tahunTerbit,
        quantity : rowData.quantity,
        actions : (  <React.Fragment>
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
                  onClick={() => returnBook(rowData.id)}
                  disabled={rowData.status === 'Dikembalikan' ? true : false}
                >
                  Return Book
                </button>
              ) : (
                  '-'
                )}
            </React.Fragment>)
      }
    })
  }

  if (loading) return null;
  const { transactionBooks } = props;
  return (
    <React.Fragment>
      {transactionBooks.data !== undefined && transactionBooks.data.length !== 0 ? (
         <TableDevExtreme
            columns={[
              { name: 'code', title: 'Code' },
              { name: 'judul', title: 'Judul' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'tahunTerbit', title: 'Tanggal Peminjam' },
              { name: 'quantity', title: 'Jumlah Dipinjam' },
              { name: 'status', title: 'tahunTerbit' },
              { name: 'actions', title: 'Action' },
            ]}
            rows={adjustIntegrationTable(transactionBooks.data)}
            />
      ) : (
          <NoData msg="Belum ada request dari user!" />
        )}
      <ModalDetailBook
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

let mapStateToProps = state => {
  return {
    transactionBooks: state.transactions.transactionBooks,
  };
};

export default connect(mapStateToProps, { ListTransactionBook, MakeReturnBook })(BookList);
