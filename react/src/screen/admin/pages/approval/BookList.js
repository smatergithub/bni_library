import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import TableApproval from '../../component/TableApproval';

import { ListTransactionBook, MakeReturnBook } from '../../../../redux/action/transaction';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
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

  React.useEffect(() => {
    mappingDataSourceTransactionBookList(filterOptions);
  }, [filterOptions]);

  const columns = [
    {
      name: 'code',
      displayName: 'Code',
    },
    {
      name: 'judul',
      displayName: 'Judul',
      customRender: rowData => {
        return <React.Fragment>{rowData.book.judul}</React.Fragment>;
      },
    },
    {
      name: 'tahunTerbit',
      displayName: 'Tahun Terbit',
      customRender: rowData => {
        return <React.Fragment>{rowData.book.tahunTerbit}</React.Fragment>;
      },
    },

    {
      name: 'nama',
      displayName: 'Peminjam',
      customRender: rowData => {
        return <React.Fragment>{rowData.user.nama}</React.Fragment>;
      },
    },
    {
      name: 'quantity',
      displayName: 'Jumlah Dipinjam',
      customRender: rowData => {
        return <React.Fragment>{rowData.quantity}</React.Fragment>;
      },
    },
    {
      name: 'status',
      displayName: 'Status',
    },
    {
      name: 'actions',
      displayName: 'Actions',
      customRender: rowData => {
        return (
          <React.Fragment>
            <React.Fragment>
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
            </React.Fragment>
          </React.Fragment>
        );
      },
    },
  ];

  if (loading) return null;
  const { transactionBooks } = props;
  console.log(transactionBooks);
  return (
    <React.Fragment>
      {transactionBooks.data !== undefined && transactionBooks.data.length !== 0 ? (
        <TableApproval
          columns={columns}
          source={transactionBooks}
          isLoading={loading}
          limit={filterOptions.limit}
          page={filterOptions.page}
          onPaginationUpdated={onPaginationUpdated}
        />
      ) : (
        <NoData msg="Belum ada request dari user!" />
      )}
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    transactionBooks: state.transactions.transactionBooks,
  };
};

export default connect(mapStateToProps, { ListTransactionBook, MakeReturnBook })(BookList);
