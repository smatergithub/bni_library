import HistoryApi from '../client/HistoryApi';
import { EBOOKS, DETAIL_EBOOK } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const getAllBookHistory = Book => () => {
  var formdata = new FormData();
  for (var key in Book) {
    formdata.append(key, Book[key]);
  }
  return HistoryApi.books(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getAllEbookHistory = EBook => () => {
  var formdata = new FormData();
  for (var key in EBook) {
    formdata.append(key, EBook[key]);
  }
  return HistoryApi.ebooks(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const exportBookHistory = () => () => {
  return HistoryApi.exportDataBook()
    .then(response => {
       const filename = "list_data_book_history";
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(response, filename);
        } else {
          let fileURL = window.URL.createObjectURL(response);
          let a = document.createElement("a");

          a.setAttribute("download", filename);
          a.href = fileURL;
          document.body.appendChild(a);
          a.click();
        }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const exportDataEbookHistory = () => () => {
  return HistoryApi.exportDataEbook()
    .then(response => {
       const filename = "list_data_ebook_history";
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(response, filename);
        } else {
          let fileURL = window.URL.createObjectURL(response);
          let a = document.createElement("a");

          a.setAttribute("download", filename);
          a.href = fileURL;
          document.body.appendChild(a);
          a.click();
        }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
