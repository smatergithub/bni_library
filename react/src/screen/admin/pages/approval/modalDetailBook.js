import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from '../../../../component/Modal';

const ModalDetailBook = (props) => {
  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;

  function checkIsImageExist(str) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
  }

  let img;
  if (detailData.book !== undefined) {
    if (detailData.book.image !== null && checkIsImageExist(detailData.book.image)) {
      img = detailData.book.image;
    } else if (detailData.book.image !== undefined) {
      img = detailData.book.image + '/preview';
    } else if (detailData.book.image !== null) {
      img = detailData.book.image + '/preview';
    } else {
      img = require('../../../../assets/NoImage.png');
    }
  }
  return (
    <>
      <Modal
        title={'Detail Buku'}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingForDetail={true}
      >
        <div style={{ height: '500px', overflow: 'auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              marginBottom: '12px',
            }}
          >
            <img src={img} style={{ width: '230px', height: '230px' }} />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Judul Buku
            </label>
            <input
              name="pengarang"
              defaultValue={detailData.book ? detailData.book.judul : ''}
              disabled={true}
              className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Pengarang
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.book ? detailData.book.pengarang : ''}
              className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Tahun Terbit
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.book ? detailData.book.tahunTerbit : ''}
              className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Stock Buku
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.book ? detailData.book.stockBuku : ''}
              className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Peminjam
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.user ? detailData.user.nama : 'Tidak Ada Peminjam'}
              className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          {detailData.user ? (
            <React.Fragment>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  NPP
                </label>
                <input
                  name="pengarang"
                  disabled={true}
                  defaultValue={detailData.user ? detailData.user.npp : 'Tidak Ada Peminjam'}
                  className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Email
                </label>
                <input
                  name="pengarang"
                  disabled={true}
                  defaultValue={detailData.user ? detailData.user.email : 'Tidak Ada Peminjam'}
                  className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  No Handphone
                </label>
                <input
                  name="pengarang"
                  disabled={true}
                  defaultValue={
                    detailData.user ? detailData.user.phoneNumber : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Tanggal Peminjam
                </label>
                <input
                  name="pengarang"
                  disabled={true}
                  defaultValue={
                    detailData
                      ? moment(detailData.startDate).format('DD MMMM YYYY')
                      : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                  aria-label="Email"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Tanggal Pengembalian
                </label>
                <input
                  name="pengarang"
                  disabled={true}
                  defaultValue={
                    detailData
                      ? moment(detailData.endDate).format('DD MMMM YYYY')
                      : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-2  py-2 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                  aria-label="Email"
                />
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailBook;
