import { toast, Slide } from 'react-toastify';

function showSuccessToast(message) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide,
    hideProgressBar: true,
    autoClose: 5000,
  });
}

export default showSuccessToast;
