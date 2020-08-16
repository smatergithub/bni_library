import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import moment from 'moment';

import { withRouter } from 'react-router-dom';
import { Modal, ToastError, NoData } from '../../../../component';
import { getBookById } from '../../../../redux/action/bookUser';
import { getEbookById } from '../../../../redux/action/ebookUser';
import { orderBook, orderEbook } from '../../../../redux/action/transaction';
import Form from './form';
function OrderBook(props) {
  const parsed = queryString.parse(props.location.search);
  let { type } = parsed;

  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [books, setBooks] = React.useState(null);
  let [ebooks, setEbooks] = React.useState(null);

  let [showModalDeletion, setShowModalDeletion] = React.useState(false);
  React.useEffect(() => {
    let { id } = parsed;
    setProcessing(true);
    if (type === 'book') {
      props.getBookById(id).then(res => {
        setProcessing(false);
        if (res.resp) {
          setBooks(res.data);
        } else {
          setBooks(null);
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
    }
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
        title="Order Berhasil"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectProfile}
      >
        <div className="my-5">Silahkan tunjukan invoice kepada admin perpustakaan </div>
      </Modal>
    </div>
  );
}
export default withRouter(
  connect(null, { getBookById, getEbookById, orderEbook, orderBook })(OrderBook)
);
