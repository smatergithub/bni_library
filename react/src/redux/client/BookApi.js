import Request from '../../utils/request';

export default class BookApi {
  static create(body) {
    const url = '/api/admin/book';
    return Request.postWithAuth(url, body, true);
  }
  static update(id, body) {
    const url = `/api/admin/book/${id}`;
    return Request.putWithAuth(`url`, body, true);
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
    const url = `/api/admin/book${id}`;
    return Request.deleteWithAuth(url);
  }
}
