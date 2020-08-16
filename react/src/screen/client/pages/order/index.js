import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { withRouter } from 'react-router-dom';
import { Modal, ToastError, NoData } from '../../../../component';
import { getBookById } from '../../../../redux/action/bookUser';
import { getEbookById } from '../../../../redux/action/ebookUser';
import { orderBook, orderEbook } from '../../../../redux/action/transaction';
let img =
  'https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=600&q=80';
function OrderBook(props) {
  const parsed = queryString.parse(props.location.search);
  let { type } = parsed;
  const { handleSubmit, register, errors } = useForm();
  let { history } = props;
  let [processing, setProcessing] = React.useState(false);
  let [books, setBooks] = React.useState(null);
  let [ebooks, setEbooks] = React.useState(null);
  let [startDate, setStartDate] = React.useState(null);
  let [endDate, setEndDate] = React.useState(null);
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
  function redirectToLogin() {
    props.history.push('/profile/books');
  }
  function onSubmit(formData) {
    if (moment(startDate).valueOf() > moment(endDate).valueOf()) {
      ToastError('Tanggal Pengembalian harus lebih besar daripada tanggal pinjam');
    } else {
      let { id, type } = parsed;
      formData['startDate'] = startDate;
      formData['endDate'] = endDate;
      if (type === 'book') {
        formData['books'] = [
          {
            bookId: id,
            quantity: formData.quantity,
          },
        ];
        props.orderBook(formData).then(res => {
          if (res.resp) {
            setShowModalDeletion(true);
          }
        });
      } else if (type === 'ebook') {
        formData['ebooks'] = [
          {
            ebookId: id,
          },
        ];
        props.orderEbook(formData).then(res => {
          if (res.resp) {
            setShowModalDeletion(true);
          }
        });
      }
    }
  }
  function onChangeStartDate(date, dateString) {
    setStartDate(dateString);
  }
  function onChangeEndDate(date, dateString) {
    setEndDate(dateString);
  }
  if (processing && books == null) return null;
  let isUserLogged = localStorage.getItem('bni_UserRole') === '1';
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
        {(type === 'book' && books !== null) ||
          (type === 'ebook' && ebooks !== null && (
            <div class="flex  w-full">
              <div class="flex w-full text-gray-700 bg-white px-20 py-20  m-2">
                <div className="w-2/5 ">
                  <div className="bg-white rounded-lg  border-gray-300">
                    <img
                      // src={`http://localhost:2000/img/images/${books.image.split('/').pop()}`}
                      src={type === 'book' ? books.image : ebooks.image}
                      alt=""
                      style={{
                        height: 440,
                        width: 300,
                      }}
                    />
                  </div>
                </div>
                <div className="w-3/5 px-5">
                  <div className="text-lg font-bold">
                    {type === 'book' ? books.judul : ebooks.judul}
                  </div>
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
                  <div> Paperback | {type === 'book' ? books.bahasa : ebooks.bahasa}</div>
                  <div>{`By (author) ${type === 'book' ? books.pengarang : ebooks.pengarang}`}</div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                    {type === 'book' && (
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                          Jumlah Buku
                        </label>
                        <input
                          ref={register()}
                          // defaultValue={user.nama}
                          type="text"
                          name="quantity"
                          className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Nama"
                          style={{
                            transition: 'all 0.15s ease 0s',
                          }}
                        />
                      </div>
                    )}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Note
                      </label>
                      <input
                        ref={register()}
                        // defaultValue={user.nama}
                        type="text"
                        name="note"
                        className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Nama"
                        style={{
                          transition: 'all 0.15s ease 0s',
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm text-gray-600" htmlFor="cus_email">
                        Dari Tanggal
                      </label>
                      <Space direction="vertical">
                        <DatePicker
                          onChange={onChangeStartDate}
                          defaultValue={moment()}
                          disabledDate={date => date < moment()}
                        />
                      </Space>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm text-gray-600" htmlFor="cus_email">
                        Sampai Tanggal
                      </label>
                      <Space direction="vertical">
                        <DatePicker
                          onChange={onChangeEndDate}
                          disabledDate={date => date < moment()}
                        />
                      </Space>
                    </div>
                    <div className="mt-6">
                      <button
                        className="w-50 px-10 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                        type="submit"
                      >
                        ORDER
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
      </section>
      <Modal
        title="Order Berhasil"
        open={showModalDeletion}
        onCLose={() => {
          setShowModalDeletion(false);
        }}
        handleSubmit={redirectToLogin}
      >
        <div className="my-5">Silahkan tunjukan invoice kepada admin perpustakaan </div>
      </Modal>
    </div>
  );
}
export default withRouter(
  connect(null, { getBookById, getEbookById, orderEbook, orderBook })(OrderBook)
);
