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

  static exportDataBook() {
    const url = `/api/admin/transactionBook/history/export`;
    return Request.getFileWithAuth(url);
  }

  static exportDataEbook() {
    const url = `/api/admin/transactionEbook/history/export`;
    return Request.getFileWithAuth(url);
  }
}
