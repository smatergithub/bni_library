import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from '../../../../component/Modal';

const ModalDetailBook = (props) => {
  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;

  function checkIsImageExist(str) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
  }

  let img;
  if (detailData.image !== undefined) {
    if (detailData.image !== null && checkIsImageExist(detailData.image)) {
      img = detailData.image;
    } else if (detailData.image !== null) {
      img = detailData.image + '/preview';
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
              defaultValue={detailData ? detailData.judul : ''}
              disabled={true}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Pengarang
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.pengarang : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Tahun Terbit
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.tahunTerbit : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Stock Buku
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.stockBuku : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Lokasi Perpustakaan
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.lokasiPerpustakaan : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Nomor Lemari
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.nomorLemari : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Jumlah Peminjam
            </label>
            <input
              disabled={true}
              defaultValue={detailData ? detailData.jumlahPeminjam : ''}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div>
          {/* <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Peminjam
            </label>
            <input
              disabled={true}
              defaultValue={detailData.user ? detailData.user.nama : 'Tidak Ada Peminjam'}
              className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
            />
          </div> */}
          {/* {detailData.user ? (
            <React.Fragment>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  NPP
                </label>
                <input
                  disabled={true}
                  defaultValue={detailData.user ? detailData.user.npp : 'Tidak Ada Peminjam'}
                  className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Email
                </label>
                <input
                  disabled={true}
                  defaultValue={detailData.user ? detailData.user.email : 'Tidak Ada Peminjam'}
                  className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  No Handphone
                </label>
                <input
                  disabled={true}
                  defaultValue={
                    detailData.user ? detailData.user.phoneNumber : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Tanggal Peminjam
                </label>
                <input
                  disabled={true}
                  defaultValue={
                    detailData
                      ? moment(detailData.startDate).format('DD MMMM YYYY')
                      : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="cus_email">
                  Tanggal Pengembalian
                </label>
                <input
                  disabled={true}
                  defaultValue={
                    detailData
                      ? moment(detailData.endDate).format('DD MMMM YYYY')
                      : 'Tidak Ada Peminjam'
                  }
                  className="w-full px-1  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
                  type="text"
                />
              </div>
            </React.Fragment>
          ) : null} */}
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailBook;
