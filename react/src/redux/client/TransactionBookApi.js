import Request from '../../utils/request';

export default class TransactionBookApi {
  static returnBook(id) {
    const url = `/api/admin/transactionBook/return/${id}`;
    return Request.postWithAuth(url, {}, true);
  }
  static getListTransactionBook(body) {
    const url = `/api/admin/transactionBook/`;
    return Request.postWithAuth(url, body, true);
  }
}
