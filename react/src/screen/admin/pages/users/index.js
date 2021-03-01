import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  toggleUserIntoAdmin,
  toggleUserIntoRepoAdmin,
  deleteUser,
  getMe,
  exportDataUser,
} from '../../../../redux/action/user';
import UserAPI from '../../../../api/UserApi';
import Modal from '../../../../component/Modal';
import { NoData } from '../../../../component';
import TableDevExtreme from '../../../../component/TableDevExtreme/index';
import swal from 'sweetalert';
import { Button } from 'antd';
import Loader from '../../component/Loader';

const UsersList = props => {
  const [loading, setLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalMakeAdmin, setShowModalMakeAdmin] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(9999999999);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);

  const retrieveDataUser = () => {
    setLoading(true);
    const pagination = {
      page: currentPage,
      limit: pageSize,
    };
    UserAPI.listUserAdmin(pagination)
      .then(res => {
        // setTotalCount(res.data.count);
        setLoading(false);
        setUsers(res.data);
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
        setShowModalMakeAdmin(false);
        setLoading(false);
        swal('Message!', 'Update Berhasil', 'success');
        retrieveDataUser();
      })
      .catch(err => {
        swal('Error!', 'Tidak Bisa Akses Fitur Ini', 'error');
      });
  };
  const makeRepoAdmin = () => {
    setLoading(true);
    if (detailData && detailData.makeRisetAdmin === 1) {
      props
        .toggleUserIntoRepoAdmin(detailData.id, { isRepoAdmin: true })
        .then(response => {
          setShowModalMakeAdmin(false);
          setLoading(false);
          swal('Message!', 'Update Berhasil', 'success');
          retrieveDataUser();
        })
        .catch(err => {
          swal('Error!', 'Tidak Bisa Akses Fitur Ini', 'error');
        });
    } else {
      props
        .toggleUserIntoRepoAdmin(detailData.id, { isRepoAdmin: false })
        .then(response => {
          swal('Message!', 'Update Berhasil', 'success');
          retrieveDataUser();
          setLoading(false);
          setShowModalMakeAdmin(false);
        })
        .catch(err => {
          swal('Error!', 'Tidak Bisa Akses Fitur Ini', 'error');
        });
    }
  };

  const exportDataUser = () => {
    setLoading(true);
    props
      .exportDataUser()
      .then(response => {
        swal('Message!', 'Update Berhasil', 'success');
        window.location.reload();
      })
      .catch(err => {
        console.log('err', err);
        swal('Error!', 'Tidak Bisa Akses Fitur Ini', 'error');
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
        swal('Error!', 'Tidak Bisa Akses Fitur Ini', 'error');
      });
  };

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      console.log('aa', rowData);
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

  let checkActionIsUserRepoAdmin = detailData && detailData.makeRisetAdmin !== undefined;

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="mb-10"
        >
          <div>
            <p style={{ fontSize: '26px' }} className="text-black">
              Daftar Pengguna
            </p>
          </div>
          {/* <div>
            <Button onClick={() => exportDataUser()} disabled={loading} size={'large'}>
              Export Data Pengguna
            </Button>
          </div> */}
        </div>
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
        ) : users.data !== undefined && users.data.length > 0 ? (
          <React.Fragment>
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
          </React.Fragment>
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
    role: state.users.role,
    me: state.users.me,
  };
};

export default connect(mapStateToProps, {
  toggleUserIntoAdmin,
  toggleUserIntoRepoAdmin,
  deleteUser,
  getMe,
  exportDataUser,
})(UsersList);
