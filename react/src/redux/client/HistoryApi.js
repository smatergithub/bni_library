import Request from '../../utils/request';

export default class HistoryApi {
  static books(body) {
    const url = '/api/admin/transactionBook/history';
    return Request.postWithAuth(url, body, true);
  }
  static ebooks(body) {
    const url = '/api/admin/transactionEbook/history';
    return Request.postWithAuth(url, body, true);
  }
}
