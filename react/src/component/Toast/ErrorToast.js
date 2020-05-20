import { toast, Slide } from 'react-toastify';

function showErrorToast(message) {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide,
    hideProgressBar: true,
    autoClose: 5000,
  });
}

export default showErrorToast;
