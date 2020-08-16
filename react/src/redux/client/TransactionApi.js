import Request from '../../utils/request';

export default class TransactionApi {
  static returnBook(id) {
    const url = `/api/admin/transactionBook/return/${id}`;
    return Request.postWithAuth(url, {}, true);
  }
  static getListTransactionBook(body) {
    const url = `/api/admin/transactionBook/list`;
    return Request.postWithAuth(url, body, true);
  }

  static returnEbook(id) {
    const url = `/api/admin/transactionEbook/return/${id}`;
    return Request.postWithAuth(url, {}, true);
  }
  static getListTransactionEbook(body) {
    const url = `/api/admin/transactionEbook/list`;
    return Request.postWithAuth(url, body, true);
  }
  static orderBook(body) {
    const url = `/api/transactionBook/borrowBook`;
    return Request.postWithAuth(url, body, false, false);
  }
  static orderEbook(body) {
    const url = `/api/transactionEbook/borrowEbook`;
    return Request.postWithAuth(url, body, false, false);
  }
}
