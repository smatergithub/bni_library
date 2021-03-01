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
  let [books, setBooks] = React.useState(null);
  let [ebooks, setEbooks] = React.useState(null);
  let [isBorrowReview, setIsBorrowReview] = React.useState(false);
  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  let [isUserhaveActiveBook, setIsUserHaveActiveBook] = React.useState(false);
  let [isUserhaveActiveEbook, setIsUserHaveActiveEbook] = React.useState(false);
  let [listborrowBook, setListBorrowBook] = React.useState([]);
  let [listborrowEbook, setListBorrowEbook] = React.useState([]);
  let localBook = JSON.parse(localStorage.getItem('bni_book'));
  let localEbook = JSON.parse(localStorage.getItem('bni_ebook'));
  let book = localBook !== null ? localBook : [];
  let ebook = localEbook !== null ? localEbook : [];
  let wishlist = book.concat(ebook);

  function getBorrowInfo() {
    let { id } = parsed;
    props.getMe().then(res => {
      if (res.data) {
        let userId = res.data.id;
        if (type === 'book') {
          BookUserAPI.getById(id).then(res => {
            setProcessing(false);
            if (res.data) {
              setBooks(res.data);
            } else {
              setBooks(null);
            }
          });
          UserAPI.getBorrowedBookItem(userId, 'rating=true')
            .then(res => {
              if (res.data.length !== 0) {
                // if (res.data.data.length > 1) {
                //   setIsUserHaveActiveBook(true);
                // }
                setListBorrowBook(res.data.data);
                let checkIsBorrowed = res.data.data.some(
                  book => book.status === 'Dikembalikan' && !book.isGiveRating
                );

                setIsBorrowReview(checkIsBorrowed);
              } else {
                setIsBorrowReview(false);
              }
            })
            .catch(err => {
              // setIsUserHaveActiveBook(true);
            });
        } else {
          EbookUserAPI.getById(id).then(res => {
            setProcessing(false);
            if (res.data) {
              setEbooks(res.data);
            } else {
              setEbooks(null);
            }
          });
          UserAPI.getBorrowedEbookItem(userId, 'rating=true').then(res => {
            if (res.data.length !== 0) {
              // if (res.data.data.length > 1) {
              //   setIsUserHaveActiveEbook(true);
              // }
              setListBorrowEbook(res.data.data);
              let checkIsBorrowed = res.data.data.some(
                ebook => ebook.status === 'Dikembalikan' && !ebook.isGiveRating
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
    if (moment(formData.startDate).valueOf() > moment(formData.endDate).valueOf()) {
      swal('Error!', 'Tanggal Pengembalian harus lebih besar daripada tanggal pinjam', 'error');
    } else {
      let { type } = parsed;

      if (type === 'book') {
        props.orderBook(formData).then(res => {
          if (res.data) {
            if (wishlist.length > 1) {
              let dataCart = wishlist.filter(item => item.id === books.id);
              removeWishlist(dataCart[0], dataCart[0].type === 'BorrowBook' ? 'book' : 'ebook');
            }
            setShowModalDeletion(true);
          } else {
            setShowModalDeletion(false);
            swal('Error!', res.msg, 'error');
          }
        });
        // if (isUserhaveActiveBook) {
        //   ToastError(
        //     'Maksimal peminjaman hanya 2 Buku ya..!,Tolong kembalikan buku sekarang atau hubungin Admin'
        //   );
        // } else {
        // }
      } else if (type === 'ebook') {
        // if (isUserhaveActiveEbook) {
        //   ToastError(
        //     'Maksimal peminjaman hanya 2 Ebook ya..!,Tolong kembalikan Ebook sekarang atau hubungin Admin'
        //   );
        // } else {
        // }
        props.orderEbook(formData).then(res => {
          if (res.data) {
            if (wishlist.length > 1) {
              let dataCart = wishlist.filter(item => item.id === books.id);
              removeWishlist(dataCart[0], dataCart[0].type === 'BorrowBook' ? 'book' : 'ebook');
            }
            setShowModalDeletion(true);
          } else {
            setShowModalDeletion(false);
            swal('Error!', res.msg, 'error');
          }
        });
      }
    }
  }
  function onFeedbackSubmit(formData) {
    if (type == 'book') {
      props.createBookFeeback(formData).then(res => {
        if (res.resp) {
          setIsBorrowReview(false);
          getBorrowInfo();
        }
      });
    } else {
      props.createEbookFeeback(formData).then(res => {
        if (res.resp) {
          setIsBorrowReview(false);
          getBorrowInfo();
        }
      });
    }
  }

  console.log('aaa', listborrowBook);

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
          <Form type="ebook" data={ebooks} onOrderItem={onOrderItem} />
        )}
        {type === 'book' && books !== null && (
          <Form type="book" data={books} onOrderItem={onOrderItem} />
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
          Peminjaman Berhasil, Silahkan Tunjukan Invoice Untuk Pengambilan Pinjaman{' '}
        </div>
      </Modal>
      <FeedbackModal
        title="Action required"
        open={isBorrowReview}
        handleSubmit={formData => onFeedbackSubmit(formData)}
        labelSubmitButton="Masuk"
        listBorrowBook={listborrowBook}
        listborrowEbook={listborrowEbook}
      >
        <div className="my-5">Silahkan Masuk terlebih dahulu</div>
      </FeedbackModal>
    </div>
  );
}

let mapStateToProps = state => {
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
