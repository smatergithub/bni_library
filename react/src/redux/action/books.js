import BookApi from '../client/BookApi';
import { BOOKS } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewBookAction = book => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }
  return BookApi.create(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getBooks = params => dispatch => {
  return BookApi.getBooks(params)
    .then(res => {
      if (res) {
        dispatch({ type: BOOKS, payload: res });
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
