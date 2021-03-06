import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import Modal from '../../../../component/Modal';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { EditTransactionBook, EditTransactionEbook } from '../../../../redux/action/transaction';

const dateFormat = 'DD-MM-YYYY';

const ModalEditApproval = props => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const { handleSubmit, register, errors } = useForm();

  const IsEmptyObject = object =>
    !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal, typeApproval } = props;

  function onSubmit(data) {
    let request = {};
    if (typeApproval === 'editTransactionBook') {
      request.id = detailData.id;
      request.startDate = startDate ? startDate : detailData.startDate;
      request.endDate = endDate ? endDate : detailData.endDate;
      props.EditTransactionBook(detailData.id, request).then(res => {
        if (res.resp) {
          swal('Message!', res.msg, 'success');
          onCloseModal();
          window.location.reload();
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    } else if (typeApproval === 'editTransactionEBook') {
      request.id = detailData.id;
      request.startDate = startDate ? startDate : detailData.startDate;
      request.endDate = endDate ? endDate : detailData.endDate;
      props.EditTransactionEbook(detailData.id, request).then(res => {
        if (res.resp) {
          swal('Message!', res.msg, 'success');
          onCloseModal();
        } else {
          swal('Error!', res.msg, 'error');
        }
      });
    }
  }

  function onChangeStartDate(date, dateString) {
    setStartDate(dateString);
  }

  function onChangeEndDate(date, dateString) {
    setEndDate(dateString);
  }

  return (
    <>
      <Modal
        title={!IsEmptyObject(detailData) ? 'Ubah Tanggal' : ''}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingAnotherButton={true}
      >
        <div className="text-yellow-800">Maksimal Peminjaman item ada 14 hari.</div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Tanggal Pinjam
          </label>
          <DatePicker
            style={{
              height: 45,
            }}
            defaultValue={detailData.startDate ? moment(detailData.startDate) : moment()}
            disabledDate={date => date < moment()}
            onChange={onChangeStartDate}
          />

          <div className="text-red-700">{errors.startDate && errors.startDate.message}</div>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            Tanggal Kembali
          </label>
          <DatePicker
            style={{
              height: 45,
            }}
            defaultValue={moment(detailData.endDate)}
            disabledDate={date =>
              date < moment(startDate ? startDate : detailData.startDate).add(1, 'days') ||
              date >
                moment(startDate ? startDate : detailData.startDate)
                  .add(14, 'days')
                  .endOf('days')
            }
            onChange={onChangeEndDate}
          />
          <div className="text-red-700">{errors.endDate && errors.endDate.message}</div>
        </div>
        <div className="flex justify-end pt-8">
          <button
            onClick={() => onCloseModal()}
            className="px-4 bg-transparent p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="modal-close px-6 bg-orange-500  rounded-sm text-white hover:bg-orange-800"
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
};

export default connect(null, {
  EditTransactionBook,
  EditTransactionEbook,
})(ModalEditApproval);
