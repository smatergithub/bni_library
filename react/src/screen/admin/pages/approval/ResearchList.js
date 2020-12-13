import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NoData } from '../../../../component';
import { ToastSuccess, ToastError } from '../../../../component';
import ModalDetailBook from './modalDetailBook';
import { getRepositoryApprovalList } from 'redux/action/repositorys';
import TableDevExtreme from '../../../../component/TableDevExtreme';
import ModalDetailRepository from './ModalDetailRepositories';
import ModalRepoAction from './ModalRepoAction';

function BookList(props) {
  const [loading, setLoading] = React.useState(false);
  const [detailData, setDetailData] = useState({});
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [repoConfirm, setRepoConfirm] = useState({
    status: false,
    id: null,
    type: null,
  });
  const [filterOptions, setFilterOptions] = React.useState({
    page: 0,
    limit: 5,
  });

  const mappingDataSourceRepoApproval = filterOptions => {
    setLoading(true);
    props
      .getRepositoryApprovalList(filterOptions)
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
    mappingDataSourceRepoApproval(filterOptions);
  }, []);

  // const onPaginationUpdated = pagination => {
  //   setFilterOptions({
  //     page: pagination.page,
  //     limit: pagination.limit,
  //   });
  // };

  function returnBook(id) {
    props.MakeReturnBook(id).then(res => {
      if (res.resp) {
        setLoading(false);
        mappingDataSourceRepoApproval(filterOptions);
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
    mappingDataSourceRepoApproval(filterOptions);
  }, [filterOptions]);

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        title: rowData.title,
        name: rowData.name,
        methodology: rowData.methodology,
        university: rowData.university,
        university: rowData.university,
        strata: rowData.strata,
        actions: (
          <React.Fragment>
            <button
              className="bg-orange-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() => {
                getDetailDataBook(rowData);
                setShowModalDetail(true);
              }}
            >
              Detail
            </button>
            <button
              className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() =>
                setRepoConfirm({
                  type: 'approve',
                  id: rowData.id,
                  status: true,
                })
              }
            >
              Approve
            </button>

            <button
              className="bg-red-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
              type="button"
              style={{ marginRight: '5px' }}
              onClick={() =>
                setRepoConfirm({
                  type: 'delete',
                  id: rowData.id,
                  status: true,
                })
              }
            >
              Hapus
            </button>
          </React.Fragment>
        ),
      };
    });
  };

  if (loading) return null;
  const { repositories } = props;
  return (
    <React.Fragment>
      {repositories.data !== undefined && repositories.data.length !== 0 ? (
        <TableDevExtreme
          columns={[
            { name: 'title', title: 'Judul' },
            { name: 'name', title: 'Nama' },
            { name: 'methodology', title: 'Methodology' },
            { name: 'university', title: 'University' },
            { name: 'faculty', title: 'Fakultas' },
            { name: 'strata', title: 'Strata' },
            { name: 'actions', title: 'Action' },
          ]}
          columnExtensions={[
            {
              columnName: 'title',
              width: 250,
              wordWrapEnabled: false,
            },
            {
              columnName: 'name',
              width: 150,
              wordWrapEnabled: true,
            },
            {
              columnName: 'university',
              width: 150,
              wordWrapEnabled: true,
            },
            {
              columnName: 'faculty',
              width: 150,
              wordWrapEnabled: true,
            },
            {
              columnName: 'strata',
              width: 100,
              wordWrapEnabled: true,
            },
            {
              columnName: 'methodology',
              width: 150,
              wordWrapEnabled: true,
            },
            {
              columnName: 'actions',
              width: 300,
              wordWrapEnabled: true,
            },
          ]}
          rows={adjustIntegrationTable(repositories.data)}
        />
      ) : (
        <NoData msg="Belum ada request dari user!" isEmpty />
      )}
      <ModalDetailRepository
        showModalDetail={showModalDetail}
        detailData={detailData}
        onCloseModal={() => {
          setDetailData({});
          setShowModalDetail(false);
        }}
      />
      <ModalRepoAction
        showModalDetail={repoConfirm.status}
        id={repoConfirm.id}
        type={repoConfirm.type}
        callback={() => {
          setRepoConfirm({
            type: null,
            id: null,
            status: false,
          });
          mappingDataSourceRepoApproval(filterOptions);
        }}
        onCloseModal={() => {
          setRepoConfirm({
            type: null,
            id: null,
            status: false,
          });
        }}
      />
    </React.Fragment>
  );
}

let mapStateToProps = state => {
  return {
    repositories: state.repositorys.approval,
  };
};

export default connect(mapStateToProps, { getRepositoryApprovalList })(BookList);
