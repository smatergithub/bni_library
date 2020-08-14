import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { getBookById } from '../../../../redux/action/bookUser';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';
function DetailBooks(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [books, setBooks] = React.useState(null);
  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    props.getBookById(id).then(res => {
      setProcessing(false);
      if (res.resp) {
        setBooks(res.data);
      }
    });
  }, []);
  if (processing && books == null) return null;
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <section className="py-16 lg:py-24 w-full">
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/books')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {books !== null && (
          <div class="flex  w-full">
            <div class="flex w-4/6 text-gray-700 bg-white px-20 py-10  m-2">
              <div className="w-2/5 ">
                <div className="bg-white rounded-lg  border-gray-300">
                  <img
                    // src={`http://localhost:2000/img/images/${books.image.split('/').pop()}`}
                    src={books.image}
                    alt=""
                    style={{
                      height: 440,
                      width: 300,
                    }}
                  />
                </div>
              </div>
              <div className="w-3/5 px-5">
                <div className="text-lg font-bold">{books.judul}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="flex mt-3 ">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="fas fa-star text-yellow-700" />
                    <i className="far fa-star text-yellow-700" />
                  </div>
                  <div> 4.48 (606,907 ratings by Goodreads)</div>
                </div>
                <div> Paperback | {books.bahasa}</div>
                <div>{`By (author) ${books.pengarang}`}</div>
                <div className="py-1 font-bold">Description:</div>
                <div>{books.description}</div>
              </div>
            </div>
            <div class="w-2/6  bg-white px-10 py-10 m-2">
              <div className="text-lg font-bold">Book Details</div>
              <div
                className="bg-gray-400 w-full mt-2 mb-2"
                style={{
                  height: 1,
                }}
              ></div>

              <div> Author : {books.pengarang}</div>
              <div> ISBN : {books.isbn}</div>
              <div> Format : Hardback</div>
              <div> Publishers : {books.penerbit}</div>
              <div> Publication date : {books.tahunTerbit}</div>
              <div> Pages : 120</div>
              <div> Product dimensions : 172 x 223 x 24mm</div>
              <div> Condition : New</div>
              <button className="w-full bg-gray-800 text-white  rounded-lg my-6 py-2 px-10 shadow-lg">
                Pesan Sekarang
              </button>
              <button className="w-full  text-gray-800  rounded-lg my-1 py-2 px-10 border border-gray-600">
                Tambah Wishlist
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
export default withRouter(connect(null, { getBookById })(DetailBooks));
