import RepositoryApi from '../../api/RepositoryApi';
import { REPOSITORYS, DETAIL_REPOSITORY, REPOSITORYS_APPROVAL } from '../type';

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
        dispatch({ type: REPOSITORYS, payload: res.data });
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
export const getRepositoryApprovalList = param => dispatch => {
  return RepositoryApi.listAproval(param)
    .then(res => {
      if (res) {
        dispatch({ type: REPOSITORYS_APPROVAL, payload: res.data });
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
        dispatch({ type: DETAIL_REPOSITORY, payload: res.data });
        return {
          resp: true,
          msg: '',
          data: res.data,
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};

export const CreateNewRepositoryUserAction = research => () => {
  var formdata = new FormData();
  for (var key in research) {
    formdata.append(key, research[key]);
  }
  return RepositoryApi.createByUser(formdata)
    .then(res => {
      if (res) {
        return {
          resp: true,
          msg: 'Repository Berhasil di tambahkan',
        };
      }
    })
    .catch(err => {
      let msg = err.response.data.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getRepositorysByUser = param => () => {
  return RepositoryApi.listByUser(param)
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
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getDetailRepositoryByUser = id => () => {
  return RepositoryApi.detailResearchByUser(id)
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
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
export const getPreviewResearchByUser = (id, type) => () => {
  return RepositoryApi.getPreviewResearchByUser(id, type)
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
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
