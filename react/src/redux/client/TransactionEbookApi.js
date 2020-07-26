import Request from '../../utils/request';

export default class TransactionEbookApi {
  static returnEbook(id) {
    const url = `/api/admin/transactionEbook/return/${id}`;
    return Request.postWithAuth(url, {}, true);
  }
  static getListTransactioEbook(body) {
    const url = `/api/admin/transactionEbook/`;
    return Request.postWithAuth(url, body, true);
  }
}
