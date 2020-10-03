import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import moment from 'moment';

import { withRouter } from 'react-router-dom';
import { Modal, ToastError, NoData, FeedbackModal } from '../../../../component';
import { getBookById } from '../../../../redux/action/bookUser';
import { getEbookById } from '../../../../redux/action/ebookUser';
import {
  getBorrowedEbookItem,
  getBorrowedBookItem,
  createBookFeeback,
  createEbookFeeback,
  getMe,
} from '../../../../redux/action/user';
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
  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    props.getMe().then(res => {
      if (res.resp) {
        let userId = res.data.id;
        if (type === 'book') {
          props.getBookById(id).then(res => {
            setProcessing(false);
            if (res.resp) {
              setBooks(res.data);
            } else {
              setBooks(null);
            }
          });
          props.getBorrowedBookItem(userId, 'rating=true').then(res => {
            if (res.data.length !== 0) {
              let checkIsBorrowed = res.data.data.some(
                book => book.status === 'Dikembalikan' && !book.isGiveRating
              );
              setIsBorrowReview(checkIsBorrowed);
            } else {
              setIsBorrowReview(false);
            }
          });
        } else {
          props.getEbookById(id).then(res => {
            setProcessing(false);
            if (res.resp) {
              setEbooks(res.data);
            } else {
              setEbooks(null);
            }
          });
          props.getBorrowedEbookItem(userId, 'rating=true').then(res => {
            if (res.data.length !== 0) {
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
  }, []);
  function redirectProfile() {
    if (type === 'book') {
      props.history.push('/profile/books');
    } else {
      props.history.push('/profile/ebooks');
    }
  }
  function onOrderItem(formData) {
    if (moment(formData.startDate).valueOf() > moment(formData.endDate).valueOf()) {
      ToastError('Tanggal Pengembalian harus lebih besar daripada tanggal pinjam');
    } else {
      let { id, type } = parsed;

      if (type === 'book') {
        props.orderBook(formData).then(res => {
          if (res.resp) {
            setShowModalDeletion(true);
          }
        });
      } else if (type === 'ebook') {
        props.orderEbook(formData).then(res => {
          if (res.resp) {
            setShowModalDeletion(true);
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
        }
      });
    } else {
      props.createEbookFeeback(formData).then(res => {
        if (res.resp) {
          setIsBorrowReview(false);
        }
      });
    }
  }

  if (processing && books == null) return null;
  return (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 mt-10 bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order | Ebni</title>
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
          <Form type="ebook" data={ebooks.ebook} onOrderItem={onOrderItem} user={null} />
        )}
        {type === 'book' && books !== null && (
          <Form type="book" data={books.book} onOrderItem={onOrderItem} user={books.user} />
        )}
      </section>
      <Modal
        title="Order Berhasil"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectProfile}
      >
        <div className="my-5">Silahkan tunjukan invoice kepada admin perpustakaan </div>
      </Modal>
      <FeedbackModal
        title="Action required"
        open={isBorrowReview}
        handleSubmit={formData => onFeedbackSubmit(formData)}
      >
        <div className="my-5">Silahkan Login terlebih dahulu</div>
      </FeedbackModal>
    </div>
  );
}
export default withRouter(
  connect(null, {
    getBookById,
    getEbookById,
    orderEbook,
    orderBook,
    getBorrowedEbookItem,
    getBorrowedBookItem,
    createBookFeeback,
    createEbookFeeback,
    getMe,
  })(OrderBook)
);
