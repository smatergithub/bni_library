import Request from '../../utils/request';

export default class RepositoryApi {
  static create(body) {
    const url = '/api/admin/repository';
    return Request.postWithAuth(url, body, true);
  }
  static update(id, body) {
    const url = `/api/admin/repository/${id}`;
    return Request.putWithAuth(`url`, body, true);
  }
  static list(param) {
    const url = `/api/admin/repository?offset=${param.page}&limit=${param.limit}`;
    return Request.getWithAuth(url);
  }

  static detail(id) {
    const url = `/api/admin/repository/${id}`;
    return Request.getWithAuth(url);
  }

  static delete(id) {
    const url = `/api/admin/repository/${id}`;
    return Request.deleteWithAuth(url);
  }
}
