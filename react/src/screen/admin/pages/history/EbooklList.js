import React, { useState } from 'react';
import { NoData } from '../../../../component';
import TableApproval from '../../component/TableApproval';
import { connect } from 'react-redux';
import { ToastSuccess, ToastError } from '../../../../component';
import { getAllEbookHistory } from '../../../../redux/action/history';

function EbookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [historyEbooks, setHistoryEbooks] = React.useState(null);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
  });

  const getAllHistoryEbook = filterOptions => {
    setLoading(true);
    props
      .getAllEbookHistory(filterOptions)
      .then(res => {
        if (res) {
          setHistoryEbooks(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    getAllHistoryEbook(filterOptions);
  }, []);

  const onPaginationUpdated = pagination => {
    setFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
    });
  };

  React.useEffect(() => {
    getAllHistoryEbook(filterOptions);
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
                  onClick={() => console.log(rowData.id)}
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

  return (
    <React.Fragment>
      {historyEbooks !== null && historyEbooks.data.length !== 0 ? (
        <TableApproval
          columns={columns}
          source={historyEbooks}
          isLoading={loading}
          limit={filterOptions.limit}
          page={filterOptions.page}
          onPaginationUpdated={onPaginationUpdated}
        />
      ) : (
        <NoData msg="Belum ada request Dari user!" />
      )}
    </React.Fragment>
  );
}

export default connect(null, { getAllEbookHistory })(EbookList);
