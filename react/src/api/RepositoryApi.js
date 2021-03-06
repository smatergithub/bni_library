import Request from '../utils/request';

export default class RepositoryApi {
  static create(body) {
    const url = '/api/admin/repository';
    return Request.postWithAuth(url, body, true);
  }
  static update(id, body) {
    const url = `/api/admin/repository/${id}`;
    return Request.putWithAuth(url, body, true);
  }
  static list(param) {
    const url = `/api/admin/repository?offset=${param.page}&limit=${param.limit}`;
    return Request.getWithAuth(url);
  }
  static listAproval(param) {
    const url = `/api/admin/repository_approval?page=${param.page}&limit=${param.limit}`;
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
  static createByUser(body) {
    const url = '/api/repository';
    return Request.postWithAuth(url, body, true);
  }
  static listByUser(param) {
    const url = `/api/repository?page=${param.page}&limit=${param.limit}&category=${param.kategori}&title=${param.title}`;
    return Request.getWithAuth(url);
  }

  static detailResearchByUser(id) {
    const url = `/api/repository/${id}`;
    return Request.getWithAuth(url);
  }
  static getPreviewResearchByUser(id, type) {
    const url = `/api/repository/preview/${id}?type=${type}`;
    return Request.getWithAuth(url);
  }
}
