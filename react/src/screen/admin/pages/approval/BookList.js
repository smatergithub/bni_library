import React, { useState } from 'react';
import { Modal } from '../../../../component';
import TableApproval from "../../component/TableApproval";
import { connect } from 'react-redux';
import {
  ListTransactionBook,
  MakeReturnBook,
} from "../../../../redux/action/transaction"




function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })

  const mappingDataSourceTransactionBookList = (filterOptions) => {
    setLoading(true);
    props.ListTransactionBook(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    mappingDataSourceTransactionBookList(filterOptions);
  }, []);

  const onPaginationUpdated = (pagination) => {
    setFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
    })
  }

  React.useEffect(() => {
    mappingDataSourceTransactionBookList(filterOptions);

  }, [filterOptions])


  const columns = [
    {
      name: "code",
      displayName: "Code"
    },
    {
      name: "judul",
      displayName: "Judul",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            {rowData.book.judul}
          </React.Fragment>
        );
      },
    },
    {
      name: "tahunTerbit",
      displayName: "Tahun Terbit",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            {rowData.book.tahunTerbit}
          </React.Fragment>
        );
      },
    },

    {
      name: "nama",
      displayName: "Peminjam",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            {rowData.user.nama}
          </React.Fragment>
        );
      },
    },
    {
      name: "quantity",
      displayName: "Jumlah Dipinjam",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            {rowData.quantity}
          </React.Fragment>
        );
      },
    },
    {
      name: "status",
      displayName: "Status"
    },
    {
      name: "actions",
      displayName: "Actions",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            <React.Fragment>
              <button
                className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                disabled={rowData.status === "Returned" ? true : false}
              >
                Return Book
              </button>
            </React.Fragment>
          </React.Fragment>
        );
      },
    }
  ]


  if (loading) return null;
  const { transactionBooks } = props;

  return (
    <React.Fragment>
      {transactionBooks.data !== undefined ? <TableApproval columns={columns} source={transactionBooks} isLoading={loading} limit={filterOptions.limit} page={filterOptions.page} onPaginationUpdated={onPaginationUpdated} /> : null}
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    transactionBooks: state.transactions.transactionBooks,
  };
};

export default connect(mapStateToProps, { ListTransactionBook, MakeReturnBook })(BookList);
