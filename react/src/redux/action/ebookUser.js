import UserEbookApi from '../client/EbookUserApi';
import { EBOOK_USERS } from '../type';

export const getAllEbooks = params => dispatch => {
  return UserEbookApi.get(params)
    .then(res => {
      if (res) {
        dispatch({ type: EBOOK_USERS, payload: res });
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
export const getEbookById = id => () => {
  return UserEbookApi.getByid(id)
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
export const getEbookPreview = id => () => {
  return UserEbookApi.getPreviewByid(id)
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
export const getEbookCategory = () => () => {
  return UserEbookApi.getCategory()
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
