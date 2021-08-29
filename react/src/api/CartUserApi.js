import Request from '../utils/request';

export default class CartUserApi {
  static getList() {
    const url = `/api/cart/list`;
    return Request.getWithAuth(url);
  }
  static create(cart) {
    const url = '/api/cart/create';
    return Request.postWithAuth(url, cart, false, false);
  }
  static delete(id) {
    const url = `/api/cart/delete/${id}`;
    return Request.deleteWithAuth(url);
  }
  static deleteBook(id) {
    const url = `/api/cart/deletebook/${id}`;
    return Request.deleteWithAuth(url);
  }
  static deleteEbook(id) {
    const url = `/api/cart/deleteebook/${id}`;
    return Request.deleteWithAuth(url);
  }
}
