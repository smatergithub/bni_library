import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import ReactStars from 'react-rating-stars-component';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../component';
import { getEbookById } from '../../../../redux/action/ebookUser';
import { addEbookWishlist, removeEbookWishlist } from '../../../../redux/action/wishlist';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';
function DetailEbooks(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [ebooks, setEbooks] = React.useState(null);
  let [isWishlistClick, setIsWishlistClick] = React.useState(false);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let [showMore, setShowMore] = React.useState(false);
  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    props.getEbookById(id).then(res => {
      setProcessing(false);
      if (res.resp) {
        setEbooks(res.data);
      }
    });
  }, []);
  function redirectToLogin() {
    props.history.push('/auth/login');
  }
  function onWishlistClick(ebook) {
    setIsWishlistClick(!isWishlistClick);
    if (isWishlistClick) {
      props.removeEbookWishlist(ebook);
    } else {
      props.addEbookWishlist(ebook);
    }
  }
  if (processing && ebooks == null) return null;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Detail Ebook | E-BNI</title>
      </Helmet>
      <section className="py-16 lg:py-24 w-full">
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/ebooks')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {ebooks !== null && (
          <div class="flex  w-full">
            <div class="flex w-4/6 text-gray-700 bg-white px-10 py-10  m-2">
              <div className="w-2/5 ">
                <div className="bg-white rounded-lg  border-gray-300">
                  <img
                    // src={`http://localhost:2000/img/images/${ebooks.image.split('/').pop()}`}
                    src={ebooks.ebook.image}
                    alt=""
                    style={{
                      height: 400,
                      width: 320,
                    }}
                  />
                </div>
              </div>
              <div className="w-3/5 px-5">
                <div className="text-lg font-bold">{ebooks.ebook.judul}</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="flex mt-3 ">
                  <div className="flex items-center justify-between">
                    <ReactStars
                      count={6}
                      value={
                        ebooks.ebook.totalRead
                          ? ebooks.ebook.countRating
                            ? ebooks.ebook.countRating / ebooks.ebook.totalRead
                            : 0
                          : 0
                      }
                      size={20}
                      activeColor="#ffd700"
                    />
                    <span className="ml-3">
                      {' '}
                      {ebooks.ebook.totalRead ? ebooks.ebook.totalRead : 0} Views
                    </span>
                  </div>
                </div>
                <div> Paperback | {ebooks.ebook.bahasa}</div>
                <div>{`By (author) ${ebooks.ebook.pengarang}`}</div>
                <div className="py-1 font-bold">Description:</div>

                <div>
                  {ebooks.ebook.description.length > 505
                    ? ebooks.ebook.description.slice(
                        0,
                        showMore ? ebooks.ebook.description.length : 500
                      )
                    : null}
                </div>
                {ebooks.ebook.description.length > 505 && (
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-400 underline cursor-pointer"
                  >
                    {showMore ? 'Lebih sedikit..' : 'Selengkapnya..'}
                  </div>
                )}
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

              <div> Author : {ebooks.ebook.pengarang}</div>
              <div> ISBN : {ebooks.ebook.isbn}</div>
              <div> Format : Hardback</div>
              <div> Publishers : {ebooks.ebook.penerbit}</div>
              <div> Publication date : {ebooks.ebook.tahunTerbit}</div>
              <div> Pages : 120</div>
              <div> Product dimensions : 172 x 223 x 24mm</div>
              <div className="text-lg font-bold mt-5">Peminjam</div>
              <div
                className="bg-gray-400 w-full mt-2 mb-2"
                style={{
                  height: 1,
                }}
              ></div>
              <div>Peminjam : {ebooks.user ? ebooks.user.nama : 'Tidak Ada Peminjam'}</div>
              {ebooks.user ? <div>Unit : {ebooks.user ? ebooks.user.unit : ''}</div> : null}
              {ebooks.user ? <div>Alamat : {ebooks.user ? ebooks.user.alamat : ''}</div> : null}
              <button
                onClick={() => {
                  if (!isUserLogged) {
                    setShowModalDeletion(true);
                  } else {
                    props.history.push(`/order?id=${ebooks.ebook.id}&type=ebook`);
                  }
                }}
                className="w-full bg-orange-500 text-white  rounded-lg my-6 py-2 px-10 shadow-lg"
              >
                Pinjam Sekarang
              </button>
              <button
                className={`w-full  ${
                  isWishlistClick ? 'bg-red-700 text-white' : 'text-gray-800'
                }  rounded-lg my-1 py-2 px-10 border ${
                  isWishlistClick ? 'border-red-600' : 'border-gray-600'
                }`}
                onClick={() => {
                  if (!isUserLogged) {
                    setShowModalDeletion(true);
                  } else {
                    onWishlistClick(ebooks);
                  }
                }}
              >
                {isWishlistClick ? 'Hapus Wishlist' : 'Tambah Wishlist'}
              </button>
            </div>
          </div>
        )}
      </section>
      <Modal
        title="Authentication required"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
      >
        <div className="my-5">Silahkan Login terlebih dahulu</div>
      </Modal>
    </div>
  );
}
export default withRouter(
  connect(null, { getEbookById, addEbookWishlist, removeEbookWishlist })(DetailEbooks)
);
