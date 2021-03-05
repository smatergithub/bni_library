import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Space, Checkbox } from 'antd';
import Modal from '../../../../component/Modal';
import queryString from 'query-string';
import { ToastError, ToastSuccess } from '../../../../component';
import { connect } from 'react-redux';
import { CreateNewWilayahAction, EditWilayahAction } from '../../../../redux/action/wilayah';

const CreateEditWilayahModal = (props) => {
  const { handleSubmit, register, errors } = useForm();

  const IsEmptyObject = (object) =>
    !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal } = props;

  function onSubmit(data) {
    if (!detailData.id) {
      props.CreateNewWilayahAction(data).then((res) => {
        if (res.resp) {
          ToastSuccess(res.msg);
          onCloseModal();
          window.location.reload();
        } else {
          ToastError(res.msg);
        }
      });
    } else {
      data.id = detailData.id;
      props.EditWilayahAction(data.id, data).then((res) => {
        if (res.resp) {
          ToastSuccess(res.msg);
          onCloseModal();
          window.location.reload();
        } else {
          ToastError(res.msg);
        }
      });
    }
  }

  return (
    <>
      <Modal
        title={!IsEmptyObject(detailData) ? 'Ubah Wilayah' : 'Tambah Wilayah'}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingAnotherButton={true}
      >
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Code Wilayah
          </label>
          <input
            name="codeWilayah"
            defaultValue={detailData ? detailData.codeWilayah : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.codeWilayah && errors.codeWilayah.message}</div>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Wilayah
          </label>
          <input
            name="wilayah"
            defaultValue={detailData ? detailData.wilayah : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.wilayah && errors.wilayah.message}</div>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Alamat
          </label>
          <input
            name="alamat"
            defaultValue={detailData ? detailData.alamat : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.alamat && errors.alamat.message}</div>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Link Google Map
          </label>
          <input
            name="linkGoogleMap"
            defaultValue={detailData ? detailData.linkGoogleMap : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="text"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.linkGoogleMap && errors.linkGoogleMap.message}</div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onCloseModal()}
            className="px-4 bg-transparent p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="modal-close px-6 bg-orange-500  rounded-sm text-white hover:bg-orange-800"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default connect(null, {
  CreateNewWilayahAction,
  EditWilayahAction,
})(CreateEditWilayahModal);
