import Request from '../utils/request';
export default class HistoryApi {
  static books(body) {
    const url = '/api/admin/transactionBook/history';
    return Request.postWithAuth(url, body, false);
  }
  static ebooks(body) {
    const url = '/api/admin/transactionEbook/history';
    return Request.postWithAuth(url, body, false);
  }

  static exportDataBook(from, to) {
    const url = `/api/admin/transactionBook/history/export?startDate=${from}&endDate=${to}`;
    return Request.getFileWithAuth(url);
  }

  static exportDataEbook(from, to) {
    const url = `/api/admin/transactionEbook/history/export?startDate=${from}&endDate=${to}`;
    return Request.getFileWithAuth(url);
  }
}
