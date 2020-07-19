import React from 'react';
import { connect } from 'react-redux';
import { getUsersListToAdmin } from "../../../../redux/action/user";
import Table from '../../component/Table';

const Ebooks = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, seFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })


  const paginationOptions = (pagination) => {
    console.log("pagination", pagination);
  }

  const retrieveDataUser = (filterOptions) => {
    setLoading(true);
    props.getUsersListToAdmin(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    retrieveDataUser(filterOptions);
  }, []);



  if (loading) return null;
  const { users } = props;


  const columns = [
    {
      name: "nama",
      displayName: "Nama"
    },
    {
      name: "alamat",
      displayName: "Alamat"
    },
    {
      name: "email",
      displayName: "email"
    },
    {
      name: "phoneNumber",
      displayName: "Nomor Telepon"
    },
  ]

  console.log("users", users);
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Pengguna</h1>

        {users.data !== undefined ? <Table columns={columns} source={users} isLoading={loading} limit={filterOptions.limit} onPaginationUpdated={(pagination) => paginationOptions(pagination)} /> : null}
      </main>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { getUsersListToAdmin })(Ebooks);
