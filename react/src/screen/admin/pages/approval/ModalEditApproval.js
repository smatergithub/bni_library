import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Space } from 'antd';
import moment from "moment"
import Modal from '../../../../component/Modal';
import { ToastError, ToastSuccess } from '../../../../component';
import { connect } from 'react-redux';
import { EditTransactionBook,EditTransactionEbook  } from '../../../../redux/action/transaction';

const ModalEditApproval = props => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const { handleSubmit, register, errors } = useForm();

  const IsEmptyObject = object =>
    !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

  const { detailData, showModalDetail, handleSubmitModal, onCloseModal,typeApproval } = props;


  function onSubmit(data) {
    if (typeApproval === "editTransactionBook") {
      console.log("data",data)
       data.id = detailData.id;
      props.EditTransactionBook(detailData.id,data).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          onCloseModal()
          window.location.reload();
        } else {
          ToastError(res.msg);
        }
      });
    } else if(typeApproval === "editTransactionEBook"){
       data.id = detailData.id;
      props.EditTransactionEbook(data.id, data).then(res => {
        if (res.resp) {
          ToastSuccess(res.msg);
          onCloseModal()
          window.location.reload();
        } else {
          ToastError(res.msg);
        }
      });
    }
  }


  //  function onChangeStartDate(date, dateString) {
  //   setStartDate(dateString);
  // }

  //   function onChangeEndDate(date, dateString) {
  //   setEndDate(dateString);
  // }
  return (
    <>
      <Modal
        title={!IsEmptyObject(detailData) ? 'Ubah Approval' : ''}
        open={showModalDetail}
        onCLose={onCloseModal}
        handleSubmit={handleSubmitModal}
        usingAnotherButton={true}
      >
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
           Start Date
          </label>
          {/* <Space direction="vertical">
                <DatePicker
                  name="startDate"
                  defaultValue={}
                  onChange={onChangeStartDate}
                />
              </Space> */}
          <input
            name="startDate"
            defaultValue={detailData ? moment(detailData.startDate).format("YYYY-MM-DD") : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="date"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.startDate && errors.startDate.message}</div>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-600" htmlFor="cus_email">
            End Date
          </label>
           {/* <Space direction="vertical">
                <DatePicker
                name="endDate"
                //defaultValue={detailData ? detailData.endDate : ''}
                onChange={onChangeEndDate}
            />
              </Space> */}
          <input
            name="endDate"
            defaultValue={detailData ? moment(detailData.endDate).format("YYYY-MM-DD") : ''}
            className="w-full px-5  py-1 text-gray-700 bg-gray-100 rounded outline-none focus:shadow-outline "
            type="date"
            ref={register({
              required: 'Field tidak boleh kosong',
            })}
          />
          <div className="text-red-700">{errors.endDate && errors.endDate.message}</div>
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
            Update
          </button>
        </div>
      </Modal>
    </>
  );
};


export default connect(null, {
  EditTransactionBook,
  EditTransactionEbook
})(ModalEditApproval);
