import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRepositorys, DeleteRepositoryAction } from '../../../../redux/action/repositorys';
import Table from '../../component/Table';
import { NoData, Modal, ToastSuccess, ToastError } from '../../../../component';
import moment from 'moment';

const Repository = props => {
  const [loading, setLoading] = React.useState(false);
  const [selectedRepo, setSelectedRepo] = React.useState(null);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [filterOptions, seFilterOptions] = React.useState({
    page: 1,
    limit: 5,
  });

  const paginationOptions = pagination => {
    console.log('pagination', pagination);
  };

  const retrieveDataRepository = filterOptions => {
    setLoading(true);
    props
      .getRepositorys(filterOptions)
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
    retrieveDataRepository(filterOptions);
  }, []);
  const handleActionDeleteRepo = () => {
    props
      .DeleteRepositoryAction(selectedRepo)
      .then(response => {
        if (response.resp) {
          ToastSuccess(response.msg);
        } else {
          ToastError(response.msg);
        }
        retrieveDataRepository(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => console.log('err', err));
  };

  if (loading) return null;
  const { repositorys } = props;

  const columns = [
    {
      name: 'university',
      displayName: 'University',
    },
    {
      name: 'titleRepository',
      displayName: 'Title Repository',
    },
    {
      name: 'typeRepository',
      displayName: 'Type Repository',
    },
    {
      name: 'createdAt',
      displayName: 'Created At',
      customRender: rowData => {
        return (
          <React.Fragment>
            <span>{moment(rowData.createdAt).format('DD MMM YYYY')}</span>
          </React.Fragment>
        );
      },
    },
    {
      name: 'actions',
      displayName: 'Actions',
      customRender: rowData => {
        return (
          <React.Fragment>
            <React.Fragment>
              <Link to={`/admin/edit-repository?id=${rowData.id}`}>
                <button
                  className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                  type="button"
                  style={{ marginRight: '5px' }}
                >
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-600 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
                type="button"
                onClick={() => {
                  setSelectedRepo(rowData.id);
                  setShowModalDeletion(true);
                }}
              >
                Delete
              </button>
            </React.Fragment>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <div className="w-2/12 absolute " style={{ right: '2em', top: '5em' }}>
        <Link to="/admin/new-repository">
          <button
            type="button"
            className="w-full bg-gray-800 text-white font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
          >
            <i className="fas fa-plus mr-3" /> Repository Baru
          </button>
        </Link>
      </div>
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Repository</h1>

        {repositorys.data !== undefined && repositorys.data.length !== 0 ? (
          <Table
            columns={columns}
            source={repositorys}
            isLoading={loading}
            limit={filterOptions.limit}
            onPaginationUpdated={pagination => paginationOptions(pagination)}
          />
        ) : (
          <NoData msg="Data Belum tersedia !" />
        )}
      </main>
      <Modal
        title="Konfirmasi"
        open={showModalDeletion}
        onCLose={() => {
          setSelectedRepo(null);
          setShowModalDeletion(false);
        }}
        handleSubmit={handleActionDeleteRepo}
      >
        <div className="my-5">Anda yakin untuk menghapus Repository ini?</div>
      </Modal>
    </div>
  );
};

let mapStateToProps = state => {
  return {
    repositorys: state.repositorys.repositorys,
  };
};

export default connect(mapStateToProps, { getRepositorys, DeleteRepositoryAction })(Repository);
