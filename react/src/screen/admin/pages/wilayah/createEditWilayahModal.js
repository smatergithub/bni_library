import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Space, Checkbox } from 'antd';
import Modal from '../../../../component/Modal';
import queryString from 'query-string';
import { ToastError, ToastSuccess } from '../../../../component';

const createEditWilayahModal = props => {
  // const { handleSubmit, register, errors } = useForm();

  const IsEmptyObject = object =>
    !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;
  return (
    <>
      <Modal
        title={!IsEmptyObject(detailData) ? 'Ubah Wilayah' : 'Tambah Wilayah'}
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
            // ref={register({
            //   required: 'Field tidak boleh kosong',
            // })}
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
            // ref={register({
            //   required: 'Field tidak boleh kosong',
            // })}
            aria-label="Email"
          />
          {/* <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div> */}
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Alamat
          </label>
          <input
            name="pengarang"
            // defaultValue={ebook ? ebook.pengarang : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            // ref={register({
            //   required: 'Field tidak boleh kosong',
            // })}
            aria-label="Email"
          />
          {/* <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div> */}
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Link Google Map
          </label>
          <input
            name="pengarang"
            // defaultValue={ebook ? ebook.pengarang : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            // ref={register({
            //   required: 'Field tidak boleh kosong',
            // })}
            aria-label="Email"
          />
          {/* <div className="text-red-700">{errors.pengarang && errors.pengarang.message}</div> */}
        </div>
      </Modal>
    </>
  );
};

export default createEditWilayahModal;
