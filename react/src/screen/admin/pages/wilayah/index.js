import React from 'react';
import { connect } from 'react-redux';
import {
  getUsersListToAdmin,
  toggleUserIntoAdmin,
  deleteUser,
  getMe,
} from '../../../../redux/action/user';
import Table from '../../component/Table';
import Modal from '../../../../component/Modal';
import { NoData } from '../../../../component';
import { ToastError, ToastSuccess } from '../../../../component';

const Ebooks = props => {
  const [loading, setLoading] = React.useState(false);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [showModalMakeAdmin, setShowModalMakeAdmin] = React.useState(false);
  const [detailData, setDetailData] = React.useState({});
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 5,
    judul: '',
  });

  const retrieveDataWilayah = filterOptions => {
    setLoading(true);
    props
      .getUsersListToAdmin(filterOptions)
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
    retrieveDataWilayah(filterOptions);
  }, []);

  const onPaginationUpdated = pagination => {
    if (pagination.judul) {
      setFilterOptions({
        judul: pagination.judul,
        page: pagination.page,
        limit: pagination.limit,
      });
    } else {
      setFilterOptions({
        page: pagination.page,
        limit: pagination.limit,
        judul: '',
      });
    }
  };

  React.useEffect(() => {
    retrieveDataWilayah(filterOptions);
  }, [filterOptions]);

  function onAdminAction(data, id) {
    props.toogleIsAdmin(data, id).then(res => {
      if (res.resp) {
        retrieveDataWilayah(filterOptions);
      }
    });
  }

  const getDetailWilayah = (id, MakeAdmin) => {
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
        retrieveDataWilayah(filterOptions);
        setLoading(false);
        setShowModalMakeAdmin(false);
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
        retrieveDataWilayah(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => {
        console.log('err', err);
        ToastError('Tidak Bisa Akses Fitur Ini');
      });
  };

  if (loading) return null;
  const { users } = props;

  const columns = [
    {
      name: 'nama',
      displayName: 'Nama',
    },
    {
      name: 'alamat',
      displayName: 'Alamat',
    },
    {
      name: 'email',
      displayName: 'email',
    },
    {
      name: 'phoneNumber',
      displayName: 'Nomor Telepon',
    },
    {
      name: 'isAdmin',
      displayName: 'Admin',
      customRender: rowData => {
        return rowData.isAdmin ? 'Aktif' : 'Tidak Aktif';
      },
    },
    {
      name: 'actions',
      displayName: 'Actions',
      customRender: rowData => {
        return (
          <React.Fragment>
            {!props.me ? null : props.me.superAdmin ? (
              <React.Fragment>
                <button
                  className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  style={{ marginRight: '5px' }}
                  onClick={() => getDetailWilayah(rowData.id, 'isAdmin')}
                >
                  {rowData.isAdmin !== true ? ' Make Admin' : ' Make User'}
                </button>
                <button
                  className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  onClick={() => getDetailWilayah(rowData.id, 'delete')}
                >
                  Delete
                </button>{' '}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Pengguna</h1>

        {users.data !== undefined ? (
          <Table
            columns={columns}
            source={users}
            isLoading={loading}
            limit={filterOptions.limit}
            page={filterOptions.page}
            onPaginationUpdated={onPaginationUpdated}
            searchDefaultValue={filterOptions.judul}
          />
        ) : null}
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
})(Ebooks);