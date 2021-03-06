import TransactionApi from '../../api/TransactionApi';
import { TRANSACTION_BOOKS, TRANSACTION_EBOOKS } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const EditTransactionBook = (id, data) => () => {
  return TransactionApi.editTransactionBook(id, data)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Transaksi Buku Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const EditTransactionEbook = (id, data) => () => {
  return TransactionApi.editTransactionEbook(id, data)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Transaksi Ebook Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const MakeReturnBook = id => () => {
  return TransactionApi.returnBook(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Buku Berhasil di dikembalikan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const ListTransactionBook = body => dispatch => {
  return TransactionApi.getListTransactionBook(body)
    .then(res => {
      if (res) {
        dispatch({ type: TRANSACTION_BOOKS, payload: res.data });
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

export const MakeReturnEbook = id => () => {
  return TransactionApi.returnEbook(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Ebook Berhasil di dikembalikan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const ListTransactionEbook = body => dispatch => {
  return TransactionApi.getListTransactionEbook(body)
    .then(res => {
      if (res) {
        dispatch({ type: TRANSACTION_EBOOKS, payload: res.data });
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

export const orderBook = body => () => {
  return TransactionApi.orderBook(body)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const orderEbook = body => () => {
  return TransactionApi.orderEbook(body)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
