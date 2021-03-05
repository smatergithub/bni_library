import HistoryApi from '../client/HistoryApi';
import { HISTORY_TRANSACTION_BOOKS, HISTORY_TRANSACTION_EBOOKS } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const getAllBookHistory = (body) => (dispatch) => {
  return HistoryApi.books(body)
    .then((res) => {
      if (res) {
        dispatch({ type: HISTORY_TRANSACTION_BOOKS, payload: res });
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getAllEbookHistory = (body) => (dispatch) => {
  return HistoryApi.ebooks(body)
    .then((res) => {
      if (res) {
        dispatch({ type: HISTORY_TRANSACTION_EBOOKS, payload: res });
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const exportBookHistory = () => () => {
  return HistoryApi.exportDataBook()
    .then((response) => {
      const filename = 'list_data_book_history';
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(response, filename);
      } else {
        let fileURL = window.URL.createObjectURL(response);
        let a = document.createElement('a');

        a.setAttribute('download', filename);
        a.href = fileURL;
        document.body.appendChild(a);
        a.click();
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const exportDataEbookHistory = () => () => {
  return HistoryApi.exportDataEbook()
    .then((response) => {
      const filename = 'list_data_ebook_history';
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(response, filename);
      } else {
        let fileURL = window.URL.createObjectURL(response);
        let a = document.createElement('a');

        a.setAttribute('download', filename);
        a.href = fileURL;
        document.body.appendChild(a);
        a.click();
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
