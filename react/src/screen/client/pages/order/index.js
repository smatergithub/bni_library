import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import moment from 'moment';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import UserAPI from '../../../../api/UserApi';
import { Modal, NoData, FeedbackModal } from '../../../../component';
import BookUserAPI from '../../../../api/BookUserApi';
import EbookUserAPI from '../../../../api/EbookUserApi';
import { createBookFeeback, createEbookFeeback, getMe } from '../../../../redux/action/user';
import { removeBookWishlist, removeEbookWishlist } from 'redux/action/wishlist';
import { orderBook, orderEbook } from '../../../../redux/action/transaction';
import Form from './form';

function OrderBook(props) {
  const parsed = queryString.parse(props.location.search);
  let { type } = parsed;

  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [borrowBookCount, setBorrowBookCount] = React.useState(null);
  let [borrowEbookCount, setBorrowEbookCount] = React.useState(null);
  let [books, setBooks] = React.useState(null);
  let [ebooks, setEbooks] = React.useState(null);
  let [isBorrowReview, setIsBorrowReview] = React.useState(false);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let [getIdUser, setGetIdUser] = React.useState('');
  let localBook = JSON.parse(localStorage.getItem('bni_book'));
  let localEbook = JSON.parse(localStorage.getItem('bni_ebook'));
  let book = localBook !== null ? localBook : [];
  let ebook = localEbook !== null ? localEbook : [];
  let wishlist = book.concat(ebook);

  function getBorrowInfo() {
    let { id } = parsed;
    props.getMe().then((res) => {
      if (res.data) {
        let userId = res.data.id;
        checkBorrowBookOrEbook(userId);
        setGetIdUser(userId);
        if (type === 'book') {
          BookUserAPI.getById(id).then((res) => {
            setProcessing(false);
            if (res.data) {
              setBooks(res.data);
            } else {
              setBooks(null);
            }
          });
          UserAPI.getBorrowedBookItem(userId, 'rating=true')
            .then((res) => {
              if (res.data.length !== 0) {
                let checkIsBorrowed = res.data.data.some(
                  (book) => book.status === 'Dikembalikan' && !book.isGiveRating
                );
                setIsBorrowReview(checkIsBorrowed);
              } else {
                setIsBorrowReview(false);
              }
            })
            .catch((err) => {});
        } else {
          EbookUserAPI.getById(id).then((res) => {
            setProcessing(false);
            if (res.data) {
              setEbooks(res.data);
            } else {
              setEbooks(null);
            }
          });
          UserAPI.getBorrowedEbookItem(userId, 'rating=true').then((res) => {
            if (res.data.length !== 0) {
              let checkIsBorrowed = res.data.data.some(
                (ebook) => ebook.status === 'Dikembalikan' && !ebook.isGiveRating
              );
              setIsBorrowReview(checkIsBorrowed);
            } else {
              setIsBorrowReview(false);
            }
          });
        }
      }
    });
  }

  function checkBorrowBookOrEbook(idUser, type) {
    UserAPI.getBorrowedBookItem(idUser, 'borrowed=true').then((res) => {
      if (res.data) {
        setBorrowBookCount(res.data.count);
      }
    });
    UserAPI.getBorrowedEbookItem(idUser, 'borrowed=true').then((res) => {
      if (res.data) {
        setBorrowEbookCount(res.data.count);
      }
    });
  }

  React.useEffect(() => {
    setProcessing(true);
    getBorrowInfo();
  }, []);

  function redirectProfile() {
    if (type === 'book') {
      props.history.push('/profile/books');
    } else {
      props.history.push('/profile/ebooks');
    }
  }

  function removeWishlist(data, isBook) {
    if (isBook === 'book') {
      props.removeBookWishlist(data);
    } else {
      props.removeEbookWishlist(data);
    }
  }

  function onOrderItem(formData) {
    setProcessing(true);
    if (moment(formData.startDate).valueOf() > moment(formData.endDate).valueOf()) {
      swal('Error!', 'Tanggal Pengembalian harus lebih besar daripada tanggal pinjam', 'error');
    } else {
      let { type } = parsed;

      if (type === 'book') {
        if (formData['quantity'] >= 2) {
          swal('Error!', 'Maksimal jumlah Peminjaman Buku Hanya 2 !', 'error');
          setProcessing(false);
        } else if (borrowBookCount === 2) {
          swal('Error!', 'Anda Sudah Meminjam 2 Buku Sebelumnya', 'error');
          setProcessing(false);
        } else {
          props.orderBook(formData).then((res) => {
            if (res.data) {
              let dataCart = wishlist.filter((item) => item.id === books.id);
              //removeWishlist(dataCart[0], dataCart[0].type === 'BorrowBook' ? 'book' : 'ebook');
              removeWishlist(dataCart[0], 'book');
              setShowModalDeletion(true);
            } else {
              setShowModalDeletion(false);
              swal('Error!', res.msg, 'error');
            }
            setProcessing(false);
          });
        }
      } else if (type === 'ebook') {
        if (borrowEbookCount === 2) {
          swal('Error!', 'Anda Sudah Meminjam 2 Ebook Sebelumnya', 'error');
          setProcessing(false);
        } else {
          props.orderEbook(formData).then((res) => {
            if (res.data) {
              let dataCart = wishlist.filter((item) => item.id === books.id);
              //removeWishlist(dataCart[0], dataCart[0].type === 'BorrowBook' ? 'book' : 'ebook');
              removeWishlist(dataCart[0], 'ebook');
              setShowModalDeletion(true);
            } else {
              setShowModalDeletion(false);
              swal('Error!', res.msg, 'error');
            }
            setProcessing(false);
          });
        }
      }
    }
  }

  function onFeedbackSubmit(formData) {
    if (type == 'book') {
      props.createBookFeeback(formData).then((res) => {
        if (res.resp) {
          setIsBorrowReview(false);
          getBorrowInfo();
        }
      });
    } else {
      props.createEbookFeeback(formData).then((res) => {
        if (res.resp) {
          setIsBorrowReview(false);
          getBorrowInfo();
        }
      });
    }
  }

  if (processing && books == null) return null;
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order | E-BNI</title>
      </Helmet>
      <section className="py-16 lg:py-24 w-full">
        <div
          className="px-10 mb-5 cursor-pointer hover:text-gray-800 text-lg"
          onClick={() => history.push('/books')}
          style={{ width: '10em' }}
        >
          {' '}
          <i className="fas fa-arrow-left"></i> Kembali
        </div>
        {books === null && type === 'book' && <NoData msg="Buku tidak di temukan" />}
        {ebooks === null && type === 'ebook' && <NoData msg="Ebook tidak di temukan" />}
        {type === 'ebook' && ebooks !== null && (
          <Form type="ebook" data={ebooks} onOrderItem={onOrderItem} loading={processing} />
        )}
        {type === 'book' && books !== null && (
          <Form type="book" data={books} onOrderItem={onOrderItem} loading={processing} />
        )}
      </section>
      <Modal
        title="Peminjaman Berhasil"
        usingForDetail={true}
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
          redirectProfile();
        }}
        // handleSubmit={redirectProfile}
      >
        <div className="my-5">
          Peminjaman Berhasil, Silahkan Tunjukan Booking Detail Untuk Pengambilan Pinjaman{' '}
        </div>
      </Modal>
      {isBorrowReview && (
        <FeedbackModal
          type={parsed}
          title="Action required"
          open={isBorrowReview}
          handleSubmit={(formData) => onFeedbackSubmit(formData)}
          labelSubmitButton="Masuk"
          userId={getIdUser}
        >
          <div className="my-5">Silahkan Masuk terlebih dahulu</div>
        </FeedbackModal>
      )}
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    // cartBook: state.wishlist.books,
    // cartEbook: state.wishlist.ebooks,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    orderEbook,
    orderBook,
    // getBorrowedEbookItem,
    // getBorrowedBookItem,
    createBookFeeback,
    createEbookFeeback,
    getMe,
    removeEbookWishlist,
    removeBookWishlist,
  })(OrderBook)
);
