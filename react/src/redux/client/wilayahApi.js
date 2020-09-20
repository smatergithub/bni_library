import Request from '../../utils/request';

export default class WilayahApi {
  static create(body) {
    const url = '/api/admin/wilayah/create';
    return Request.postWithAuth(url, body, false, true);
  }
  static update(id, body) {
    const url = `/api/admin/wilayah/${id}`;
    return Request.putWithAuth(url, body, false, true);
  }
  static list(body) {
    const url = `/api/admin/wilayah`;
    return Request.postWithAuth(url, body);
  }

  static detail(id) {
    const url = `/api/admin/wilayah/${id}`;
    return Request.getWithAuth(url);
  }

  static delete(id) {
    const url = `/api/admin/wilayah/${id}`;
    return Request.deleteWithAuth(url);
  }
}
