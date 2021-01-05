import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getUsersListToAdmin,
  toggleUserIntoAdmin,
  toggleUserIntoRepoAdmin,
  deleteUser,
  getMe,
  exportDataUser,
} from '../../../../redux/action/user';
import Table from '../../component/Table';
import Modal from '../../../../component/Modal';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';
import TableDevExtreme from '../../../../component/TableDevExtreme/index';

const Ebooks = props => {
  const [loading, setLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalMakeAdmin, setShowModalMakeAdmin] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(9999999999);
  const [currentPage, setCurrentPage] = useState(0);

  const retrieveDataUser = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    props
      .getUsersListToAdmin(pagination)
      .then(res => {
        setTotalCount(props.users.count);
        setLoading(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  React.useEffect(() => {
    retrieveDataUser();
  }, []);

  // function onAdminAction(data, id) {
  //   props.toogleIsAdmin(data, id).then(res => {
  //     if (res.resp) {
  //       retrieveDataUser(filterOptions);
  //     }
  //   });
  // }

  const getDetailUser = (id, MakeAdmin) => {
    const { users } = props;
    let detailData = users.data.filter(item => item.id === id);
    if (MakeAdmin === 'makeRisetAdmin') {
      let updateDetailData = {
        makeRisetAdmin: 1,
        ...detailData[0],
      };
      setDetailData(updateDetailData);
      setShowModalMakeAdmin(true);
    } else if (MakeAdmin === 'makeAsUser') {
      let updateDetailData = {
        makeRisetAdmin: 2,
        ...detailData[0],
      };
      setDetailData(updateDetailData);
      setShowModalMakeAdmin(true);
    } else if (MakeAdmin === 'isAdmin') {
      setDetailData(detailData[0]);
      setShowModalMakeAdmin(true);
    } else {
      setDetailData(detailData[0]);
      setShowModalDeletion(true);
    }
  };

  const makeUserIntoAdmin = () => {
    setLoading(true);
    props
      .toggleUserIntoAdmin(detailData.id)
      .then(response => {
        ToastSuccess('Update Berhasil.');
        retrieveDataUser();
        setLoading(false);
        setShowModalMakeAdmin(false);
      })
      .catch(err => {
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };
  const makeRepoAdmin = () => {
    setLoading(true);
    if (detailData && detailData.makeRisetAdmin === 1) {
      props
        .toggleUserIntoRepoAdmin(detailData.id, { isRepoAdmin: true })
        .then(response => {
          retrieveDataUser();
          ToastSuccess('Update Berhasil.');
          setLoading(false);
          setShowModalMakeAdmin(false);
        })
        .catch(err => {
          ToastError('Tidak Bisa Akses Fitur Ini');
        });
    } else {
      props
        .toggleUserIntoRepoAdmin(detailData.id, { isRepoAdmin: false })
        .then(response => {
          ToastSuccess('Update Berhasil.');
          retrieveDataUser();
          setLoading(false);
          setShowModalMakeAdmin(false);
        })
        .catch(err => {
          ToastError('Tidak Bisa Akses Fitur Ini');
        });
    }
  };

  const exportDataUser = () => {
    setLoading(true);
    props
      .exportDataUser()
      .then(response => {
        ToastSuccess('Sukses Export User');
        window.location.reload();
      })
      .catch(err => {
        console.log('err', err);
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  const handleDeleteUser = () => {
    setLoading(true);
    props
      .deleteUser(detailData.id)
      .then(response => {
        retrieveDataUser();
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => {
        console.log('err', err);
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        isAdmin: (
          <div style={{ color: rowData.isAdmin ? 'green' : 'red' }}>
            {rowData.isAdmin ? 'Yes' : 'No'}
          </div>
        ),
        isRepoAdmin: (
          <div style={{ color: rowData.isRepoAdmin ? 'green' : 'red' }}>
            {rowData.isRepoAdmin ? 'Yes' : 'No'}
          </div>
        ),
        actions: (
          <React.Fragment>
            {props.me && props.me.id !== rowData.id && props.me.superAdmin ? (
              <React.Fragment>
                <button
                  className="bg-green-400 text-white active:bg-indigo-600 text-xs  px-2 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  style={{ marginRight: '5px' }}
                  onClick={() => getDetailUser(rowData.id, 'isAdmin')}
                >
                  {rowData.isAdmin !== true ? ' Make Admin' : ' Make User'}
                </button>
                <button
                  className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-2 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  onClick={() => getDetailUser(rowData.id, 'delete')}
                >
                  Delete
                </button>{' '}
              </React.Fragment>
            ) : null}
            {props.me && props.me.id !== rowData.id && !rowData.isAdmin ? (
              <React.Fragment>
                <button
                  className={`${
                    rowData.isRepoAdmin ? 'bg-gray-800' : 'bg-orange-600'
                  } text-white active:bg-indigo-600 text-xs  py-1 px-2 rounded outline-none focus:outline-none `}
                  type="button"
                  style={{ marginRight: '5px' }}
                  onClick={() =>
                    getDetailUser(
                      rowData.id,
                      !rowData.isRepoAdmin ? 'makeRisetAdmin' : 'makeAsUser'
                    )
                  }
                >
                  {rowData.isRepoAdmin ? ' Make as User' : 'Make Riset Admin'}
                </button>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ),
      };
    });
  };

  if (loading) return null;
  const { users } = props;
  let checkActionIsUserRepoAdmin = detailData && detailData.makeRisetAdmin !== undefined;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <h1 className="w-full text-3xl text-black ">Daftar Pengguna</h1>
          <button
            style={{ width: '380px', height: '34px' }}
            type="button"
            className=" bg-orange-500 text-white font-semibold py-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            onClick={() => exportDataUser()}
          >
            <i className="fas fa-plus mr-3" style={{ fontSize: '18px' }} /> Export Data Pengguna
          </button>
        </div>
        {users.data !== undefined ? (
          <TableDevExtreme
            columns={[
              { name: 'nama', title: 'Nama' },
              { name: 'alamat', title: 'Alamat' },
              { name: 'email', title: 'Email' },
              { name: 'phoneNumber', title: 'Phone Number' },
              { name: 'isRepoAdmin', title: 'Riset Admin' },
              { name: 'isAdmin', title: 'Admin' },
              { name: 'actions', title: 'Action' },
            ]}
            columnExtensions={[
              {
                columnName: 'actions',
                width: 300,
                wordWrapEnabled: true,
              },
            ]}
            rows={adjustIntegrationTable(users.data)}
            // currentPage={currentPage}
            // onCurrentPageChange={setCurrentPage}
            // pageSize={pageSize}
            // onPageSizeChange={setPageSize}
            // totalCount={totalCount}
          />
        ) : (
          <NoData />
        )}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        hideCloseBtn
        onCLose={() => {
          setDetailData({});
          setShowModalDeletion(false);
        }}
        handleSubmit={handleDeleteUser}
      >
        <div className="my-5">Anda yakin untuk menghapus User ini?</div>
      </Modal>
      <Modal
        title="Konfirmasi"
        open={showModalMakeAdmin}
        hideCloseBtn
        labelSubmitButton="Submit"
        onCLose={() => {
          setDetailData({});
          setShowModalMakeAdmin(false);
        }}
        handleSubmit={checkActionIsUserRepoAdmin ? makeRepoAdmin : makeUserIntoAdmin}
      >
        <div className="my-5">Anda yakin untuk mengupdate user ini ?</div>
      </Modal>
    </div>
  );
};

let mapStateToProps = state => {
  return {
    users: state.users.users,
    role: state.users.role,
    me: state.users.me,
  };
};

export default connect(mapStateToProps, {
  getUsersListToAdmin,
  toggleUserIntoAdmin,
  toggleUserIntoRepoAdmin,
  deleteUser,
  getMe,
  exportDataUser,
})(Ebooks);
