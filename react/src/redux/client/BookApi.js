import Request from '../../utils/request';

export default class BookApi {
  static create(books) {
    const endpoint = '/api/books';
    return Request.postWithAuth(endpoint, books, true);
  }
}
