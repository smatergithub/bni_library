import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from '../../../../component/Modal';

const ModalDetailBook = (props) => {
  const IsEmptyObject = (object) =>
    !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;

  return (
    <>
      <Modal
        title={'Detail Ebook'}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingForDetail={true}
      >
        <div style={{ height: '500px', overflow: 'auto' }}>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Judul Ebook
            </label>
            <input
              name="pengarang"
              defaultValue={detailData.ebook ? detailData.ebook.judul : ''}
              disabled={true}
              className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
              defaultValue={detailData.ebook ? detailData.ebook.pengarang : ''}
              className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
              defaultValue={detailData.ebook ? detailData.ebook.tahunTerbit : ''}
              className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
              className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
                  className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
