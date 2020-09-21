import React from 'react'
import Modal from '../../../../component/Modal';
import { ToastError, ToastSuccess } from '../../../../component';
import { useForm } from 'react-hook-form';
import { DatePicker, Space, Checkbox } from 'antd';

function createEditWilayahModal(props) {

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;
  return (
    <>
      <Modal
        title="Konfirmasi"
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
      >
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Code Wilayah
                  </label>
          <input
            name="pengarang"
            // defaultValue={ebook ? ebook.pengarang : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
            aria-label="Email"
          />
          {/* <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div> */}
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Wilayah
                  </label>
          <input
            name="pengarang"
            // defaultValue={ebook ? ebook.pengarang : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
            aria-label="Email"
          />
          {/* <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div> */}
        </div>

      </Modal>
    </>
  )
}

export default createEditWilayahModal
