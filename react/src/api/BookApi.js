import Request from '../utils/request';

export default class BookApi {
  static create(body) {
    const url = '/api/admin/book/create';
    return Request.postWithAuth(url, body, false, true);
  }
  static uploadbookFile(body) {
    const url = '/api/admin/book/upload';
    return Request.postWithAuth(url, body, false, true);
  }
  static update(id, body) {
    const url = `/api/admin/book/${id}`;
    return Request.putWithAuth(url, body, false, true);
  }

  static getExampleBookFormat() {
    const url = `/api/admin/book/sample`;
    return Request.getFileWithAuth(url);
  }
  static list(body) {
    const url = `/api/admin/book`;
    return Request.postWithAuth(url, body);
  }

  static detail(id) {
    const url = `/api/admin/book/${id}`;
    return Request.getWithAuth(url);
  }

  static delete(id) {
    const url = `/api/admin/book/${id}`;
    return Request.deleteWithAuth(url);
  }
  static favorite() {
    const url = `/api/ratingBook/list`;
    return Request.get(url);
  }
}
