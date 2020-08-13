import RepositoryApi from '../client/RepositoryApi';
import { REPOSITORYS, DETAIL_REPOSITORY } from '../type';
/**
 * note: for book creation doesn't need to dispatch //
 * any reducer type,
 * just return the response (true/false) to the UI
 */

export const CreateNewRepositoryAction = Ebook => () => {
  var formdata = new FormData();
  for (var key in Ebook) {
    formdata.append(key, Ebook[key]);
  }
  return RepositoryApi.create(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Repository Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const EditRepositoryAction = (id, Ebook) => () => {
  var formdata = new FormData();
  for (var key in Ebook) {
    formdata.append(key, Ebook[key]);
  }
  return RepositoryApi.update(id, formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Repository Berhasil di diubah',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const DeleteRepositoryAction = id => () => {
  return RepositoryApi.delete(id)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Repository Berhasil di dihapus',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const getRepositorys = param => dispatch => {
  return RepositoryApi.list(param)
    .then(res => {
      if (res) {
        dispatch({ type: REPOSITORYS, payload: res });
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

export const getDetailRepository = id => dispatch => {
  return RepositoryApi.detail(id)
    .then(res => {
      if (res) {
        dispatch({ type: DETAIL_REPOSITORY, payload: res });
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
