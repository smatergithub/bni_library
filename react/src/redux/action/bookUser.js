import BookUserApi from '../client/BookUserApi';
import { BOOK_USERS } from '../type';

export const getAllBook = params => dispatch => {
  return BookUserApi.get(params)
    .then(res => {
      if (res) {
        dispatch({ type: BOOK_USERS, payload: res });
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
export const getBookById = id => () => {
  return BookUserApi.getById(id)
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
export const getCategory = () => () => {
  return BookUserApi.getCategory()
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
