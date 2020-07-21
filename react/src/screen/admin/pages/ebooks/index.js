import React from 'react';
import { connect } from 'react-redux';
import { getEbooks } from "../../../../redux/action/ebooks";
import Button from "../../component/Button";

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

  const retriveDataEbooks = (filterOptions) => {
    setLoading(true);
    props.getEbooks(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    retriveDataEbooks(filterOptions);
  }, []);



  if (loading) return null;
  const { ebooks } = props;


  const columns = [
    {
      name: "code",
      displayName: "Code"
    },
    {
      name: "title",
      displayName: "Title"
    },
    {
      name: "category",
      displayName: "Category"
    },
    {
      name: "author",
      displayName: "Author"
    },
    {
      name: "actions",
      displayName: "Actions",
      customRender: (rowData) => {
        return (
          <React.Fragment>
            <React.Fragment>
              <Button style={{ marginRight: '5px' }}>Edit</Button>
              <Button>Delete</Button>
            </React.Fragment>
          </React.Fragment>
        );
      },
    }
  ]


  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Ebook</h1>

        {ebooks.data !== undefined ? <Table columns={columns} source={ebooks} isLoading={loading} limit={filterOptions.limit} onPaginationUpdated={(pagination) => paginationOptions(pagination)} /> : null}
      </main>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    ebooks: state.ebooks.ebooks,
  };
};

export default connect(mapStateToProps, { getEbooks })(Ebooks);
