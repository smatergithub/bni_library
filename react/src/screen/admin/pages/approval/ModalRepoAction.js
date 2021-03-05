import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import Modal from '../../../../component/Modal';
import { ToastError, ToastSuccess } from '../../../../component';
import { connect } from 'react-redux';
import { DeleteRepositoryAction, EditRepositoryAction } from 'redux/action/repositorys';

const ModalRepositoriesComfirmation = (props) => {
  const { type, id, showModalDetail, onCloseModal, callback } = props;

  function onSubmit() {
    if (type === 'delete') {
      props.DeleteRepositoryAction(id).then((res) => {
        if (res.resp) {
          ToastSuccess(res.msg);
          callback();
        } else {
          ToastError(res.msg);
        }
      });
    } else {
      props.EditRepositoryAction(id, { isApproved: true }).then((res) => {
        if (res.resp) {
          ToastSuccess(res.msg);
          callback();
        } else {
          ToastError(res.msg);
        }
      });
    }
  }

  return (
    <>
      <Modal
        title={type === 'approve' ? 'Setujui Riset ini?' : 'Hapus Riset ini?'}
        open={showModalDetail}
        onCLose={onCloseModal}
        // handleSubmit={handleSubmitModal}
        usingAnotherButton={true}
      >
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onCloseModal()}
            className="px-4 bg-transparent p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
          >
            Close
          </button>
          <button
            onClick={() => onSubmit()}
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
  DeleteRepositoryAction,
  EditRepositoryAction,
})(ModalRepositoriesComfirmation);
