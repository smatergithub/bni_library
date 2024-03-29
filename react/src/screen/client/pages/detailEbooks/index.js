import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../../component';
import EbookUserAPI from '../../../../api/EbookUserApi';
import CartUserAPI from '../../../../api/CartUserApi';
import RatingUserAPI from '../../../../api/RatingUserApi';
import { checkIsImageExist } from '../../component/helper';
import Loader from '../../component/Loader';
import swal from 'sweetalert';
import ListUlasan from '../../../../component/ListUlasan';

function DetailEbooks(props) {
  const parsed = queryString.parse(props.location.search);
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [ebooks, setEbooks] = React.useState(null);
  let [isWishlistClick, setIsWishlistClick] = React.useState(false);
  let [userLogged, setUserLogged] = React.useState(false);
  let [ulasanOpen, setUlasanOpen] = React.useState(false);
  let [showMore, setShowMore] = React.useState(false);
  let [ratings, setRatings] = React.useState([]);

  let { id } = parsed;

  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    EbookUserAPI.getById(id).then((res) => {
      setProcessing(false);
      if (res.data) {
        setEbooks(res.data);
      }
    });
  }, []);

  function getRating() {
    let { id } = parsed;
    RatingUserAPI.getListRatingEbook()
      .then((response) => {
        console.log('Asdasd', response);
        let data = response.data.filter((item) => item.ebookId === id);
        setRatings(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  React.useEffect(() => {
    if (id) {
      getRating();
    }
  }, [id]);

  function addEbookToCart(ebookId) {
    let payload = {
      userId: props.profile.id,
      ebookId: ebookId,
    };
    CartUserAPI.create(payload)
      .then((response) => {
        swal('Message!', 'Berhasil simpan ebook ke wishlist', 'success');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function deleteEbookToCart(bookId) {
    CartUserAPI.deleteEbook(bookId)
      .then((response) => {
        swal('Message!', 'Berhasil hapus ebook dari wishlist', 'success');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  function redirectToLogin() {
    props.history.push('/auth/login');
  }

  function onWishlistClick(ebook) {
    setIsWishlistClick(!isWishlistClick);

    if (isWishlistClick) {
      deleteEbookToCart(ebook.id);
    } else {
      addEbookToCart(ebook.id);
    }
  }
  // if (processing && ebooks == null) return null;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';

  let img = '';

  if (ebooks !== null && ebooks.image !== null && checkIsImageExist(ebooks.image)) {
    img = ebooks.image;
  } else if (ebooks !== null && ebooks.image !== null) {
    img = ebooks.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

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
          ebooks !== null && (
            <div class="lg:flex  w-full">
              <div class="flex w-4/6 text-gray-700 bg-white px-10 py-10  m-2">
                <div className="w-2/5 ">
                  <div className="bg-white rounded-lg  border-gray-300">
                    <img
                      src={img}
                      alt=""
                      style={{
                        height: 400,
                        width: 320,
                      }}
                    />
                  </div>
                </div>
                <div className="w-3/5 px-5">
                  <div className="text-lg font-bold">{ebooks.judul}</div>
                  <div
                    className="bg-gray-400 w-full mt-2"
                    style={{
                      height: 1,
                    }}
                  ></div>
                  <div className="flex mt-3 ">
                    <div className="flex items-center justify-between">
                      {ebooks.countRating !== null && (
                        <>
                          <Rating
                            defaultRating={Math.round(ebooks.countRating / ebooks.totalRead)}
                            maxRating={5}
                            icon="star"
                            disabled
                          />
                          <span className="ml-3">
                            {' '}
                            {ebooks.totalRead ? ebooks.totalRead : 0} Views
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div> Paperback | {ebooks.bahasa}</div>
                  <div>{`By (author) ${ebooks.pengarang}`}</div>
                  <div className="py-1 font-bold">Deskripsi:</div>

                  <div style={{ textAlign: 'justify' }}>
                    {ebooks.description !== null && ebooks.description.length > 505
                      ? ebooks.description.slice(0, showMore ? ebooks.description.length : 500)
                      : null}
                  </div>
                  {ebooks.description !== null && ebooks.description.length > 505 && (
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
                <div className="text-lg font-bold">Detail E-Book</div>
                <div
                  className="bg-gray-400 w-full mt-2 mb-2"
                  style={{
                    height: 1,
                  }}
                ></div>

                <div> Author : {ebooks.pengarang}</div>
                <div> ISBN : {ebooks.isbn}</div>
                <div> Publishers : {ebooks.penerbit}</div>
                <div> Tahun Terbit: {ebooks.tahunTerbit}</div>
                <div>
                  {' '}
                  Lokasi perpustakaan :{' '}
                  {ebooks.lokasiPerpustakaan == null || ebooks.lokasiPerpustakaan == 0
                    ? '-'
                    : ebooks.lokasiPerpustakaan}
                </div>
                <div>
                  <button
                    onClick={() => {
                      setUlasanOpen(true);
                      // if (!isUserLogged) {
                      //   setUserLogged(true);
                      // } else {
                      //   onWishlistClick(books);
                      // }
                    }}
                    className={`font-bold  border-orange-500 text-gray-800 py-1  rounded  `}
                  >
                    Check Ulasan
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!isUserLogged) {
                      setUserLogged(true);
                    } else {
                      props.history.push(`/order?id=${ebooks.id}&type=ebook`);
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
                      setUserLogged(true);
                    } else {
                      onWishlistClick(ebooks);
                    }
                  }}
                >
                  {isWishlistClick ? 'Hapus Wishlist' : 'Tambah ke Wishlist'}
                </button>
              </div>
            </div>
          )
        )}
      </section>
      <Modal
        title="Otentikasi diperlukan"
        open={userLogged}
        onCLose={() => {
          setUserLogged(false);
        }}
        handleSubmit={redirectToLogin}
        labelSubmitButton="Masuk"
      >
        <div className="my-5">Silahkan Masuk terlebih dahulu</div>
      </Modal>
      <Modal
        title="Ulasan"
        open={ulasanOpen}
        onCLose={() => {
          setUlasanOpen(false);
        }}
        usingAnotherButton={true}
      >
        <ListUlasan data={ratings} />
      </Modal>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    profile: state.users.profile,
  };
};

export default withRouter(connect(mapStateToProps)(DetailEbooks));
