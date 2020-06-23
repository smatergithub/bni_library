import Request from '../../utils/request';

export default class BookApi {
  static create(books) {
    const url = '/api/books';
    return Request.postWithAuth(url, books, true);
  }
  static getBooks(params) {
    const url = `/api/books?${params}`;
    return Request.getWithAuth(url);
  }
}
