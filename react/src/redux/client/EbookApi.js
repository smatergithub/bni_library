import Request from '../../utils/request';

export default class EbookApi {
  static create(body) {
    const url = '/api/admin/ebook';
    return Request.postWithAuth(url, body, true);
  }
  static update(id, body) {
    const url = `/api/admin/ebook/${id}`;
    return Request.putWithAuth(`url`, body, true);
  }
  static list() {
    const url = `/api/admin/ebook`;
    return Request.getWithAuth(url);
  }

  static detail(id) {
    const url = `/api/admin/ebook/${id}`;
    return Request.getWithAuth(url);
  }

  static delete(id) {
    const url = `/api/admin/ebook/${id}`;
    return Request.deleteWithAuth(url);
  }
}
