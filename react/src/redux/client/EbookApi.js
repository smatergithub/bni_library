import Request from '../../utils/request';

export default class EbookApi {
  static create(body) {
    const url = '/api/admin/ebook/create';
    return Request.postWithAuth(url, body, false, true);
  }
  static uploadEbookFile(body) {
    const url = '/api/admin/ebook/upload';
    return Request.postWithAuth(url, body, false, true);
  }

  static uploadSingleEbookFile(body) {
    const url = '/api/admin/ebook/uploadEbook';
    return Request.postWithAuth(url, body, false, true);
  }
  static update(id, body) {
    const url = `/api/admin/ebook/${id}`;
    return Request.putWithAuth(url, body, false, true);
  }
  static list(param) {
    const url = `/api/admin/ebook`;
    return Request.postWithAuth(url, param);
  }

  static detail(id) {
    const url = `/api/admin/ebook/${id}`;
    return Request.getWithAuth(url);
  }

  static delete(id) {
    const url = `/api/admin/ebook/${id}`;
    return Request.deleteWithAuth(url);
  }
  static favorite() {
    const url = `/api/ratingEbook/list`;
    return Request.get(url);
  }
}
