import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../../../redux/action/books';
import Table from '../../component/Table';

const Books = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [filterOptions, seFilterOptions] = React.useState({
    page: 1,
    limit: 5
  })


  const paginationOptions = (pagination) => {
    console.log("pagination", pagination);
  }
  const retrieveDataBook = () => {
    setLoading(true);
    props.getBooks(filterOptions).then(res => {
      if (res) {
        setLoading(false);
      }
    }).catch(err => { console.log("error", err) });
  }

  React.useEffect(() => {
    retrieveDataBook();
  }, []);



  if (loading) return null;
  const { books } = props;


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
    }
  ]


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
