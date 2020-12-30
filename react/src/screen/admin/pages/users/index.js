import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getUsersListToAdmin,
  toggleUserIntoAdmin,
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
    setDetailData(detailData[0]);
    if (MakeAdmin === 'isAdmin') {
      setShowModalMakeAdmin(true);
    } else {
      setShowModalDeletion(true);
    }
  };

  const makeUserIntoAdmin = () => {
    setLoading(true);
    props
      .toggleUserIntoAdmin(detailData.id)
      .then(response => {
        retrieveDataUser();
        setLoading(false);
        setShowModalMakeAdmin(false);
      })
      .catch(err => {
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
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
        isAdmin: rowData.isAdmin ? 'Aktif' : 'Tidak Aktif',
        actions: (
          <React.Fragment>
            {!props.me ? null : props.me.superAdmin ? (
              <React.Fragment>
                <button
                  className="bg-green-400 text-white active:bg-indigo-600 text-xs   w-20 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  style={{ marginRight: '5px' }}
                  onClick={() => getDetailUser(rowData.id, 'isAdmin')}
                >
                  {rowData.isAdmin !== true ? ' Make Admin' : ' Make User'}
                </button>
                <button
                  className="bg-red-600 text-white active:bg-indigo-600 text-xs   w-16 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  onClick={() => getDetailUser(rowData.id, 'delete')}
                >
                  Delete
                </button>{' '}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ),
      };
    });
  };

  if (loading) return null;
  const { users } = props;

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
            <i className="fas fa-plus mr-3" style={{ fontSize: '18px' }} /> Export Data User
          </button>
        </div>
        {users.data !== undefined ? (
          <TableDevExtreme
            columns={[
              { name: 'nama', title: 'Nama' },
              { name: 'alamat', title: 'Alamat' },
              { name: 'email', title: 'Email' },
              { name: 'phoneNumber', title: 'Phone Number' },
              { name: 'isAdmin', title: 'Is Admin' },
              { name: 'actions', title: 'Action' },
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
        onCLose={() => {
          setDetailData({});
          setShowModalMakeAdmin(false);
        }}
        handleSubmit={makeUserIntoAdmin}
      >
        <div className="my-5">Anda yakin untuk Menjadikan User ini Admin ?</div>
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
  deleteUser,
  getMe,
  exportDataUser,
})(Ebooks);
