import BookApi from '../client/BookApi';
import { BOOKS, DETAIL_BOOK } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewBookAction = book => () => {
  console.log(book);
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

export const EditBookAction = (id, book) => () => {
  var formdata = new FormData();
  for (var key in book) {
    formdata.append(key, book[key]);
  }
  return BookApi.update(id, formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const DeleteBookAction = id => () => {
  return BookApi.delete(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di dihapus',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getBooks = body => dispatch => {
  return BookApi.list(body)
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

export const getDetailBook = id => dispatch => {
  return BookApi.detail(id)
    .then(res => {
      if (res) {
        dispatch({ type: DETAIL_BOOK, payload: res });
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
