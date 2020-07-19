import React from 'react';
import { connect } from 'react-redux';
import { getRepositorys } from "../../../../redux/action/repositorys";
import Table from '../../component/Table';

const Repository = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, seFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })


  const paginationOptions = (pagination) => {
    console.log("pagination", pagination);
  }

  const retrieveDataRepository = (filterOptions) => {
    setLoading(true);
    props.getRepositorys(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    retrieveDataRepository(filterOptions);
  }, []);



  if (loading) return null;
  const { repositorys } = props;


  const columns = [
    {
      name: "university",
      displayName: "University"
    },
    {
      name: "titleRepository",
      displayName: "Title Repository"
    },
    {
      name: "typeRepository",
      displayName: "Type Repository"
    },
    {
      name: "createdAt",
      displayName: "Created At"
    },
  ]


  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Repository</h1>

        {repositorys.data !== undefined ? <Table columns={columns} source={repositorys} isLoading={loading} limit={filterOptions.limit} onPaginationUpdated={(pagination) => paginationOptions(pagination)} /> : null}
      </main>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    repositorys: state.repositorys.repositorys,
  };
};

export default connect(mapStateToProps, { getRepositorys })(Repository);
