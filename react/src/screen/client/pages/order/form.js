import React from 'react';
import { DatePicker, Space } from 'antd';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import swal from 'sweetalert';
import { checkIsImageExist } from '../../component/helper';
import { Rating } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';
import { removeBookWishlist, removeEbookWishlist } from 'redux/action/wishlist';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LoadingPreview = () => <Loader active inline="centered"></Loader>;

function FormOrder({ data, type, onOrderItem, user, loading }) {
  const parsed = queryString.parse(window.location.search);
  const { handleSubmit, register, errors } = useForm();
  let [startDate, setStartDate] = React.useState(null);
  let [endDate, setEndDate] = React.useState(null);

  function onChangeStartDate(date, dateString) {
    setStartDate(dateString);
  }
  function onChangeEndDate(date, dateString) {
    setEndDate(dateString);
  }

  function onSubmit(formData) {
    if (moment(startDate).valueOf() > moment(endDate).valueOf()) {
      swal('Error!', 'Tanggal Pengembalian harus lebih besar daripada tanggal pinjam', 'error');
    } else if (!endDate || !startDate) {
      swal('Error!', 'Tanggal Peminjaman harus di lengkapi!', 'error');
    } else {
      let { id, type } = parsed;
      formData['startDate'] = startDate;
      formData['endDate'] = endDate;
      if (type === 'book') {
        if (Number(formData.quantity) > data.stockBuku) {
          swal('Error!', 'Stock buku tidak cukup!', 'error');
        } else if (data.stockBuku == 0) {
          swal('Error!', 'Buku tidak Tersedia!', 'error');
        } else {
          formData['books'] = [
            {
              bookId: id,
              quantity: formData.quantity,
            },
          ];
          onOrderItem(formData);
        }
      } else if (type === 'ebook') {
        formData['ebooks'] = [
          {
            ebookId: id,
          },
        ];
        onOrderItem(formData);
      }
    }
  }

  let img = '';

  if (data !== null && data.image !== null && checkIsImageExist(data.image)) {
    img = data.image;
  } else if (data !== null && data.image !== null) {
    img = data.image + '/preview';
  } else {
    img = require('../../../../assets/NoImage.png');
  }

  return (
    <div class="flex  w-full">
      <div class="lg:flex w-full text-gray-700 bg-white lg:px-20 lg:py-20  m-2">
        <div className="lg:w-2/5 ">
          <div className="bg-white rounded-lg  border-gray-300">
            <img
              // src={`http://localhost:2000/img/images/${books.image.split('/').pop()}`}
              src={img}
              alt=""
              style={{
                height: 440,
                width: 300,
              }}
            />
          </div>
        </div>
        <div className="lg:w-3/5 px-5">
          <div className="text-lg font-bold">{data.judul}</div>
          <div
            className="bg-gray-400 w-full mt-2"
            style={{
              height: 1,
            }}
          ></div>
          {data.countRating !== null && (
            <div className="flex mt-3 ">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <Rating defaultRating={data.countRating} maxRating={6} icon="star" disabled />
                </div>
                <span style={{ paddingLeft: '12px' }}>{data.totalRead} Views</span>
              </div>
            </div>
          )}

          <div className="mt-3">{`By (author) ${data.pengarang}`}</div>
          <div> Paperback : {data.bahasa}</div>
          <div className="mt-3">
            {' '}
            Lokasi perpustakaan : {data.lokasiPerpustakaan ? data.lokasiPerpustakaan : '-'}
          </div>
          <div className="mt-3">
            {' '}
            Stock Buku : {data.stockBuku == null || data.stockBuku == 0 ? '-' : data.stockBuku}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            {type === 'book' && (
              <React.Fragment>
                {/* <div className="text-lg font-bold">Peminjam</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="mt-3">Peminjam : {user ? user.nama : '-'}</div>
                {user ? <div>Unit : {user ? user.unit : ''}</div> : null}
                {user ? <div>Alamat : {user ? user.alamat : ''}</div> : null} */}
                <div
                  className={`font-bold w-40 my-5 ${
                    data.stockBuku == null || data.stockBuku == 0 ? 'bg-red-600' : 'bg-green-500'
                  } text-white py-1 px-3 rounded`}
                  style={{
                    right: '2em',
                    top: '2em',
                  }}
                >
                  {data.stockBuku == null || data.stockBuku == 0 ? 'Tidak Tersedia' : 'Tersedia'}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Jumlah Buku
                  </label>
                  <input
                    disabled={loading}
                    ref={register({
                      required: 'Field tidak boleh kosong',
                    })}
                    // defaultValue={user.nama}
                    type="number"
                    name="quantity"
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm border focus:outline-none   w-full"
                    placeholder="Jumlah Buku"
                    style={{
                      transition: 'all 0.15s ease 0s',
                    }}
                  />
                  <div className="text-red-700">{errors.quantity && errors.quantity.message}</div>
                </div>
              </React.Fragment>
            )}

            <div className="text-orange-500">Maksimal durasi peminjaman adalah 14 hari</div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="cus_email">
                Dari Tanggal
              </label>
              <Space direction="vertical">
                <DatePicker
                  onChange={onChangeStartDate}
                  disabledDate={(date) => date < moment()}
                  disabled={loading}
                />
              </Space>
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="cus_email">
                Sampai Tanggal
              </label>
              <Space direction="vertical">
                <DatePicker
                  disabled={loading}
                  onChange={onChangeEndDate}
                  // disabledDate={date =>
                  //   date < moment(startDate).add(1, 'days') ||
                  //   date >
                  //     moment(startDate)
                  //       .add(14, 'days')
                  //       .endOf('days')
                  // }
                  disabledDate={(date) => date < moment()}
                />
              </Space>
            </div>
            <div className="relative w-full mb-3 mt-8">
              <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Note</label>
              <input
                disabled={loading}
                ref={register({
                  required: 'Field tidak boleh kosong',
                })}
                // defaultValue={user.nama}
                type="text"
                name="note"
                className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm border focus:outline-none   w-full"
                placeholder="note"
                style={{
                  transition: 'all 0.15s ease 0s',
                }}
              />
              <div className="text-red-700">{errors.note && errors.note.message}</div>
            </div>
            <div className="mt-6">
              <button
                disabled={loading}
                className="mobile:w-full xs:w-full md:w-full sm:w-full lg:w-64  px-14 py-2 text-white font-light tracking-wider bg-orange-500 rounded"
                type="submit"
              >
                {loading ? LoadingPreview() : 'ORDER'}
              </button>
            </div>
          </form>
        </div>
      </div>
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
    removeEbookWishlist,
    removeBookWishlist,
  })(FormOrder)
);
