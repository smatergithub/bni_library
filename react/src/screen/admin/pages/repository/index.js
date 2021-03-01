import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRepositorys, DeleteRepositoryAction } from '../../../../redux/action/repositorys';
import swal from 'sweetalert';
import { NoData, Modal } from '../../../../component';
import TableDevExtreme from '../../../../component/TableDevExtreme';
import moment from 'moment';
import Loader from '../../component/Loader';

const Repository = props => {
  const [loading, setLoading] = React.useState(false);
  const [selectedRepo, setSelectedRepo] = React.useState(null);
  const [showModalDeletion, setShowModalDeletion] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    page: 1,
    limit: 999999,
    judul: '',
  });

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
          swal('Message!', response.msg, 'success');
        } else {
          swal('Error!', response.msg, 'error');
        }
        retrieveDataRepository(filterOptions);
        setLoading(false);
        setShowModalDeletion(false);
      })
      .catch(err => console.log('err', err));
  };

  const { repositorys } = props;

  const adjustIntegrationTable = dataSource => {
    return dataSource.map(rowData => {
      return {
        ...rowData,
        createdAt: moment(rowData.createdAt).format('DD MMM YYYY'),
        actions: (
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
        ),
      };
    });
  };

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
                Daftar Repository
              </p>
            </div>
          </div>
          {/* <Link to="/admin/new-repository">
            <button
              style={{ width: '380px', height: '34px' }}
              type="button"
              className=" bg-orange-500 text-white font-semibold py-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-700 flex items-center justify-center"
            >
              <i className="fas fa-plus mr-3" style={{ fontSize: '18px' }} /> Repository Baru
            </button>
          </Link> */}
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
        ) : repositorys.data !== undefined && repositorys.data.length > 0 ? (
          <React.Fragment>
            <TableDevExtreme
              columns={[
                { name: 'name', title: 'Nama' },
                { name: 'university', title: 'Universitas' },
                { name: 'title', title: 'Judul' },
                { name: 'category', title: 'Kategori' },
                { name: 'methodology', title: 'Methodology' },
                { name: 'faculty', title: 'Fakultas' },
                { name: 'strata', title: 'Strata' },
                { name: 'actions', title: 'Action' },
              ]}
              rows={adjustIntegrationTable(repositorys.data)}
            />
          </React.Fragment>
        ) : (
          <NoData msg="Data Belum Tersedia !" />
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
