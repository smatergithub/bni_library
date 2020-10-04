import React, { useState } from 'react';
import { NoData } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import { connect } from 'react-redux';
import { ToastSuccess, ToastError } from '../../../../component';
import { MakeReturnEbook, ListTransactionEbook } from '../../../../redux/action/transaction';
import ModalDetailEbook from "./ModalDetailEBook";

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
  });
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);

  const mappingDataSourceTransactionEbookList = filterOptions => {
    setLoading(true);
    props
      .ListTransactionEbook(filterOptions)
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
    mappingDataSourceTransactionEbookList(filterOptions);
  }, []);

  const onPaginationUpdated = pagination => {
    setFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
    });
  };

  const getDetailDataEbook = data => {
    setDetailData(data);
    console.log("data", data)
    setShowModalDetail(true);
  };


  React.useEffect(() => {
    mappingDataSourceTransactionEbookList(filterOptions);
  }, [filterOptions]);
  function returnEbook(id) {
    props.MakeReturnEbook(id).then(res => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceTransactionEbookList(filterOptions);
        ToastSuccess(res.msg);
      } else {
        setLoading(false);
        ToastError(res.msg);
      }
    });
  }

  const columns = [
    {
      name: 'code',
      displayName: 'Code',
    },
    {
      name: 'judul',
      displayName: 'Judul',
      customRender: rowData => {
        return <React.Fragment>{rowData.ebook.judul}</React.Fragment>;
      },
    },
    {
      name: 'tahunTerbit',
      displayName: 'Tahun Terbit',
      customRender: rowData => {
        return <React.Fragment>{rowData.ebook.tahunTerbit}</React.Fragment>;
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
          </React.Fragment>
        );
      },
    },
  ];

  if (loading) return null;
  const { transactionEbooks } = props;

  return (
    <React.Fragment>
      {transactionEbooks.data !== undefined && transactionEbooks.data.length !== 0 ? (
        <TableApproval
          columns={columns}
          source={transactionEbooks}
          isLoading={loading}
          limit={filterOptions.limit}
          page={filterOptions.page}
          onPaginationUpdated={onPaginationUpdated}
        />
      ) : (
          <NoData msg="Belum ada request Dari user!" />
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

let mapStateToProps = state => {
  return {
    transactionEbooks: state.transactions.transactionEbooks,
  };
};

export default connect(mapStateToProps, { ListTransactionEbook, MakeReturnEbook })(EbookList);
