import React from 'react';
import { DatePicker, Space } from 'antd';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { ToastError } from '../../../../component';
import { checkIsImageExist } from '../../component/helper';
import { Rating } from 'semantic-ui-react';

function FormOrder({ data, type, onOrderItem, user }) {
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
      ToastError('Tanggal Pengembalian harus lebih besar daripada tanggal pinjam');
    } else if (!endDate || !startDate) {
      ToastError('Tanggal Peminjaman harus di lengkapi!');
    } else {
      let { id, type } = parsed;
      formData['startDate'] = startDate;
      formData['endDate'] = endDate;
      if (type === 'book') {
        if (Number(formData.quantity) > data.stockBuku) {
          ToastError('Stock buku tidak cukup!');
        } else if (data.stockBuku == 0) {
          ToastError('Buku tidak Tersedia!');
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
          <div className="flex mt-3 ">
            {/* <div className="flex items-center">
              <i className="fas fa-star text-yellow-700" />
              <i className="fas fa-star text-yellow-700" />
              <i className="fas fa-star text-yellow-700" />
              <i className="fas fa-star text-yellow-700" />
              <i className="far fa-star text-yellow-700" />
            </div>
            <div> 4.48 (606,907 ratings by Goodreads)</div> */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <Rating defaultRating={data.countRating} maxRating={6} icon="star" disabled />
              </div>
              <span style={{ paddingLeft: '12px' }}>{data.countRating} Views</span>
            </div>
          </div>
          <div> Paperback | {data.bahasa}</div>
          <div>{`By (author) ${data.pengarang}`}</div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            {type === 'book' && (
              <React.Fragment>
                <div className="text-lg font-bold">Peminjam</div>
                <div
                  className="bg-gray-400 w-full mt-2"
                  style={{
                    height: 1,
                  }}
                ></div>
                <div className="mt-3">Peminjam : {user ? user.nama : '-'}</div>
                {user ? <div>Unit : {user ? user.unit : ''}</div> : null}
                {user ? <div>Alamat : {user ? user.alamat : ''}</div> : null}
                <div
                  className={`font-bold w-32 my-5 ${
                    data.stockBuku == 0 ? 'bg-red-600' : 'bg-green-500'
                  } text-white py-1 px-3 rounded`}
                  style={{
                    right: '2em',
                    top: '2em',
                  }}
                >
                  {data.stockBuku == 0 ? 'Tidak Tersedia' : 'Tersedia'}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Jumlah Buku
                  </label>
                  <input
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
                <DatePicker onChange={onChangeStartDate} disabledDate={(date) => date < moment()} />
              </Space>
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="cus_email">
                Sampai Tanggal
              </label>
              <Space direction="vertical">
                <DatePicker
                  onChange={onChangeEndDate}
                  disabledDate={(date) =>
                    date < moment(startDate).add(1, 'days') ||
                    date > moment(startDate).add(14, 'days').endOf('days')
                  }
                />
              </Space>
            </div>
            <div className="relative w-full mb-3 mt-8">
              <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Note</label>
              <input
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
                className="mobile:w-full xs:w-full md:w-full sm:w-full lg:w-64  px-14 py-2 text-white font-light tracking-wider bg-orange-500 rounded"
                type="submit"
              >
                ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormOrder;
