import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import TableDevExtreme from "../../../../component/TableDevExtreme";

import { getAllBookHistory } from '../../../../redux/action/history';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [historyBooks, setHistoryBooks] = React.useState(null);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
  });

  const getAllHistoryBook = filterOptions => {
    setLoading(true);
    props
      .getAllBookHistory(filterOptions)
      .then(res => {
        if (res) {
          setHistoryBooks(res.data);

          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    getAllHistoryBook(filterOptions);
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
        getAllHistoryBook(filterOptions);
        ToastSuccess(res.msg);
      } else {
        setLoading(false);
        ToastError(res.msg);
      }
    });
  }

  React.useEffect(() => {
    getAllHistoryBook(filterOptions);
  }, [filterOptions]);


    const adjustIntegrationTable = (dataSource) => {
    return dataSource.map(rowData => {

      return {
        ...rowData,
        judul :rowData.book.judul,
        tahunTerbit : rowData.book.tahunTerbit,
        nama : rowData.user ? rowData.user.nama : '',
        quantity : rowData.quantity,
        actions : ( <React.Fragment>
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
  return (
    <React.Fragment>
      {historyBooks !== null && historyBooks !== undefined && historyBooks.data.length !== 0 ? (
         <TableDevExtreme
            columns={[
              { name: 'code', title: 'Judul' },
              { name: 'judul', title: 'Judul' },
              { name: 'tahunTerbit', title: 'Tahun Terbit' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'quantity', title: 'Jumlah Dipinjam' },
              { name: 'status', title: 'Status' },
              { name: 'actions', title: 'Action' },
            ]}
            rows={adjustIntegrationTable(historyBooks.data)}
            />
      ) : (
          <NoData msg="Belum ada request dari user!" />
        )}
    </React.Fragment>
  );
}

export default connect(null, { getAllBookHistory })(BookList);
