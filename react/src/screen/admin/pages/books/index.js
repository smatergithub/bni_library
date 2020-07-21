import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../../../redux/action/books';
import Table from '../../component/Table';
import Button from "../../component/Button";

const Books = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, seFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })


  const paginationOptions = (pagination) => {
    seFilterOptions({
      page: pagination.page,
      limit: pagination.limit,
      q: ""
    })
  }



  const retrieveDataBook = (filterOptions) => {
    setLoading(true);
    props.getBooks(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    retrieveDataBook(filterOptions)
  }, [filterOptions])

  React.useEffect(() => {
    retrieveDataBook(filterOptions);
  }, []);


  const columns = [
    {
      name: "judul",
      displayName: "Judul"
    },
    {
      name: "pengarang",
      displayName: "Pengarang"
    },
    {
      name: "tahunTerbit",
      displayName: "Tahun Terbit"
    },
    {
      name: "stockBuku",
      displayName: "Stock Buku"
    },
    {
      name: "status",
      displayName: "Status"
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

  if (loading) return null;
  const { books } = props;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Buku</h1>

        {books.data !== undefined ? <Table columns={columns} source={books} isLoading={loading} limit={filterOptions.limit} onPaginationUpdated={(pagination) => paginationOptions(pagination)} /> : null}
      </main>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    books: state.books.books,
  };
};

export default connect(mapStateToProps, { getBooks })(Books);
