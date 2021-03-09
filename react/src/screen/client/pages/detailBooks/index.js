import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../component';
import BookUserAPI from '../../../../api/BookUserApi';
import { addBookWishlist, removeBookWishlist } from '../../../../redux/action/wishlist';
import { checkIsImageExist } from '../../component/helper';
import Loader from '../../component/Loader';

function DetailBooks(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [books, setBooks] = React.useState(null);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let [isWishlistClick, setIsWishlistClick] = React.useState(false);
  let [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    BookUserAPI.getById(id).then(res => {
      setProcessing(false);
      if (res.data) {
        setBooks(res.data);
      }
    });
  }, []);

  function redirectToLogin() {
    props.history.push('/auth/login');
  }

  function onWishlistClick(book) {
    setIsWishlistClick(!isWishlistClick);
    // let cloneBook = Object.assign({}, book);
    book.type = 'BorrowBook';
    if (isWishlistClick) {
      props.removeBookWishlist(book);
    } else {
      props.addBookWishlist(book);
    }
  }

  // if (processing && books == null) return null;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';

  let img = '';

  if (books !== null && books.image !== null && checkIsImageExist(books.image)) {
    img = books.image;
  } else if (books !== null && books.image !== null) {
    img = books.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <section className="py-16 lg:py-24 w-full">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Detail Buku | E-BNI</title>
        </Helmet>
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/books')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {processing ? (
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
        ) : (
          books !== null && (
            <div class="lg:flex  w-full">
              <div class="lg:flex lg:w-4/6 text-gray-700 bg-white px-10 py-10  m-2">
                <div className="lg:w-2/5 ">
                  <div className=" rounded-lg  border-gray-300">
                    <img
                      // src={`http://localhost:2000/img/images/${books.image.split('/').pop()}`}
                      //src={books.book.image}
                      src={img}
                      alt=""
                      style={{
                        height: 400,
                        width: 350,
                      }}
                    />
                  </div>
                </div>
                <div className="lg:w-3/5 px-5">
                  <div className="text-lg font-bold">{books.judul}</div>
                  <div
                    className="bg-gray-400 w-full mt-2"
                    style={{
                      height: 1,
                    }}
                  ></div>
                  <div className="flex mt-3 ">
                    <div className="flex items-center justify-between">
                      {books.countRating !== null && (
                        <>
                          <Rating
                            defaultRating={books.countRating}
                            maxRating={6}
                            icon="star"
                            disabled
                          />
                          <span className="ml-3">
                            {' '}
                            {books.totalRead ? books.totalRead : 0} Views
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div> Paperback | {books.bahasa}</div>
                  <div>{`By (author) ${books.pengarang}`}</div>
                  <div className="py-1 font-bold">Deskripsi:</div>
                  <div style={{ textAlign: 'justify' }}>
                    {books.description !== null && books.description.length > 400
                      ? books.description.slice(0, showMore ? books.description.length : 400)
                      : null}
                  </div>

                  {books.description !== null && books.description.length > 400 && (
                    <div
                      onClick={() => setShowMore(!showMore)}
                      className="text-blue-400 underline cursor-pointer"
                    >
                      {showMore ? 'Lebih sedikit..' : 'Selengkapnya..'}
                    </div>
                  )}
                </div>
              </div>
              <div class="lg:w-2/6  bg-white px-10 py-10 m-2 relative">
                <div className="text-lg font-bold">Detail Buku</div>
                <div
                  className={`font-bold absolute  ${
                    books.stockBuku == 0 ? 'bg-red-600' : 'bg-orange-500'
                  } text-white py-1 px-3 rounded`}
                  style={{
                    right: '2em',
                    top: '2em',
                  }}
                >
                  {books.stockBuku == 0 ? 'Tidak Tersedia' : 'Tersedia'}
                </div>
                <div
                  className="bg-gray-400 w-full mt-2 mb-2"
                  style={{
                    height: 1,
                  }}
                ></div>

                <div> Author : {books.pengarang}</div>
                <div> ISBN : {books.isbn}</div>
                <div> Publishers : {books.penerbit}</div>
                <div> Tahun Terbit: {books.tahunTerbit}</div>
                <div>
                  {' '}
                  Stock Buku :{' '}
                  {books.stockBuku == null || books.stockBuku == 0 ? '-' : books.stockBuku}
                </div>
                <div>
                  {' '}
                  Lokasi perpustakaan :{' '}
                  {books.lokasiPerpustakaan == null || books.lokasiPerpustakaan == 0
                    ? '-'
                    : books.lokasiPerpustakaan}
                </div>
                {/* <div className="text-lg font-bold pt-5">Peminjam</div>
                <div
                  className="bg-gray-400 w-full mt-2 mb-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div>Peminjam : {books.user ? books.user.nama : 'Tidak Ada Peminjam'}</div>
                {books.user ? <div>Unit : {books.user ? books.user.unit : ''}</div> : null}
                {books.user ? <div>Alamat : {books.user ? books.user.alamat : ''}</div> : null} */}

                {books.stockBuku != 0 && (
                  <>
                    <button
                      onClick={() => {
                        if (!isUserLogged) {
                          setShowModalDeletion(true);
                        } else {
                          props.history.push(`/order?id=${books.id}&type=book`);
                        }
                      }}
                      className="w-full bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
                    >
                      Pinjam Sekarang
                    </button>
                    <button
                      onClick={() => {
                        if (!isUserLogged) {
                          setShowModalDeletion(true);
                        } else {
                          onWishlistClick(books);
                        }
                      }}
                      className={`w-full  ${
                        isWishlistClick ? 'bg-red-700 text-white' : 'text-gray-800'
                      }  rounded-lg my-1 py-2 px-10 border ${
                        isWishlistClick ? 'border-red-600' : 'border-gray-600'
                      }`}
                    >
                      {isWishlistClick ? 'Hapus Wishlist' : 'Tambah ke Wishlist'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </section>
      <Modal
        title="Otentikasi diperlukan"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
        labelSubmitButton="Masuk"
      >
        <div className="my-5">Silahkan Masuk terlebih dahulu</div>
      </Modal>
    </div>
  );
}
export default withRouter(connect(null, { addBookWishlist, removeBookWishlist })(DetailBooks));
