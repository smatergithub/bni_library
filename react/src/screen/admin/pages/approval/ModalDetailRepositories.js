import React from 'react';
import Modal from '../../../../component/Modal';

const ModalDetailBook = props => {
  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;

  return (
    <>
      <Modal
        title={'Detail Repository'}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingForDetail={true}
      >
        <div style={{ height: '500px', overflow: 'auto' }}>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Judul
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.title}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
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
              defaultValue={detailData.name}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Methodology
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.methodology}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              University
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.university}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Fakultas
            </label>
            <input
              name="pengarang"
              disabled={true}
              defaultValue={detailData.faculty}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              Description
            </label>
            <textarea
              name="pengarang"
              disabled={true}
              defaultValue={detailData.description}
              className="w-full px-2  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
              type="text"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="cus_email">
              List file document :
            </label>
          </div>
          <div className="mt-4">
            <a href={detailData.abstrack} target="__blank">
              Document Abstrack
            </a>
          </div>
          <div className="mt-2">
            <a href={detailData.document} target="__blank">
              Document Riset
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailBook;
