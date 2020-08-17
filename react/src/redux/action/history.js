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
