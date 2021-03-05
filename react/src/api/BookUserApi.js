import Request from '../utils/request';

export default class BookUserApi {
  static get(books) {
    const url = 'api/book/list';
    return Request.postWithAuth(url, books, true);
  }
  static getById(id) {
    const url = `api/book/detail/${id}`;
    return Request.getWithAuth(url);
  }
  static getCategory() {
    const url = `api/categoryBook`;
    return Request.getWithAuth(url);
  }
}
