import WilayahApi from '../client/wilayahApi';
import { WILAYAHS, DETAIL_WILAYAH } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewWilayahAction = (data) => () => {
  return WilayahApi.create(data)
    .then((res) => {
      if (res) {
        return {
          resp: true,
          msg: 'Wilayah Berhasil di tambahkan',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const EditWilayahAction = (id, data) => () => {
  return WilayahApi.update(id, data)
    .then((res) => {
      if (res) {
        return {
          resp: true,
          msg: 'Wilayah Berhasil di diubah',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const DeleteWilayahAction = (id) => () => {
  return WilayahApi.delete(id)
    .then((res) => {
      if (res) {
        return {
          resp: true,
          msg: 'Wilayah Berhasil di dihapus',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getWilayah = (body) => (dispatch) => {
  return WilayahApi.list(body)
    .then((res) => {
      if (res) {
        dispatch({ type: WILAYAHS, payload: res });
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

export const getDetailWilayah = (id) => (dispatch) => {
  return WilayahApi.detail(id)
    .then((res) => {
      if (res) {
        dispatch({ type: DETAIL_WILAYAH, payload: res });
        return {
          resp: true,
          msg: '',
          data: res,
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const UploadWilayahFile = (wilayah) => () => {
  var formdata = new FormData();
  for (var key in wilayah) {
    formdata.append(key, wilayah[key]);
  }

  return WilayahApi.uploadWilayahFile(formdata)
    .then((res) => {
      if (res) {
        return {
          resp: true,
          msg: 'Wilayah Berhasil di tambahkan',
        };
      }
    })
    .catch((err) => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
