import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../../../redux/action/books';
import Table from '../../component/Table';
// let mockBook = [
//   {
//     author: 'asas',
//     category: 'asas',
//     code: 'asas',
//     createdAt: '2020-06-22T16:44:01.000Z',
//     dateBook: '2020-06-22T16:44:01.000Z',
//     description: 'asasa',
//     id: 'bab1fec0-e3b2-4901-966d-6330ec5ca93f',
//     image:
//       '/Users/nagacoder/Documents/freelence/bni_library/server/public/images/image-1592844241421.jpg',
//     isPromotion: true,
//     statementResponsibility: 'asasa',
//     stockBook: 10,
//     title: 'asas',
//     updatedAt: '2020-06-22T16:44:01.000Z',
//   },
// ];
function Books(props) {
  let [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    props.getBooks('page=1&limit=10').then(res => {
      if (res) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null;
  let { books } = props;
  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="w-full text-3xl text-black pb-6">Daftar Buku</h1>

        <Table data={books.rows} />
      </main>
    </div>
  );
}

let mapState = state => {
  return {
    books: state.books.books,
  };
};

export default connect(mapState, { getBooks })(Books);
