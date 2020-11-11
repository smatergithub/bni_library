import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import ModalDetailBook from "./modalDetailBook";
import { ListTransactionBook, MakeReturnBook } from '../../../../redux/action/transaction';
import TableDevExtreme from "../../../../component/TableDevExtreme";
import ModalEditApproval from "./ModalEditApproval";
import {IsEmptyObject} from '../../component/IsEmptyObject';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalEdit,setShowModalEdit] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  const mappingDataSourceTransactionBookList = () => {
    setLoading(true);
    const pagination = {
      page : currentPage + 1,
      limit : pageSize
    }
    props
      .ListTransactionBook(pagination)
      .then(res => {
        setTotalCount(props.transactionBooks.count);
        setLoading(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    mappingDataSourceTransactionBookList();
  },[currentPage,totalCount]);



  function returnBook(id) {
    props.MakeReturnBook(id).then(res => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionBookList();
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

  const getEditTransactionBook = (data) => {
    setDetailData(data);
    setShowModalEdit(true);
  }



   const adjustIntegrationTable = (dataSource) => {
    return dataSource.map(rowData => {

      return {
        ...rowData,
        judul :rowData.book && rowData.book.judul,
        nama :rowData.user ? rowData.user.nama : '',
        npp :rowData.user ? rowData.user.npp : '',
        tahunTerbit :rowData.book && rowData.book.tahunTerbit,
        quantity : rowData.quantity,
        actions : (  <React.Fragment>
           <button
                className="bg-orange-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                style={{ marginRight: '5px' }}
                onClick={() => getEditTransactionBook(rowData)}
              >
                Edit
                </button>
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
                  className="bg-red-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
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
      {!IsEmptyObject(transactionBooks) && transactionBooks.data !== undefined && transactionBooks.data.length !== 0 ? (
         <TableDevExtreme
            columns={[
              { name: 'code', title: 'Code' },
              { name: 'judul', title: 'Judul' },
              { name: 'tahunTerbit', title: 'Tahun Terbit' },
              { name: 'quantity', title: 'Jumlah' },
              { name: 'nama', title: 'Peminjam' },
              { name: 'npp', title: 'NPP' },
              { name: 'status', title: 'Status' },
              { name: 'actions', title: 'Action' },
            ]}
             columnExtensions={[
              {
                columnName: "code",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "judul",
                width: 300,
                wordWrapEnabled: true
              },
              {
                columnName: "nama",
                width: 150,
                wordWrapEnabled: true
              },
               {
                columnName: "npp",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "tahunTerbit",
                width: 150,
                wordWrapEnabled: true
              },
              {
                columnName: "quantity",
                width: 100,
                wordWrapEnabled: true
              },
              {
                columnName: "status",
                width: 150,
                wordWrapEnabled: true
              },{
                columnName: "actions",
                width: 300,
                wordWrapEnabled: true
              }
               ]}

            rows={adjustIntegrationTable(transactionBooks.data)}
             currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            totalCount={totalCount}
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
      <ModalEditApproval
        showModalDetail={showModalEdit}
        detailData={detailData}
        typeApproval="editTransactionBook"
        onCloseModal={() => {
          setDetailData({});
          setShowModalEdit(false);
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
