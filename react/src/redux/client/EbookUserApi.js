import Request from '../../utils/request';

export default class EbookApi {
  static get(body) {
    const url = '/api/ebook/list';
    return Request.postWithAuth(url, body, false, false);
  }
  static getPreviewByid(id) {
    const url = `/api/ebook/preview/${id}`;
    return Request.get(url);
  }
  static getByid(id) {
    const url = `/api/ebook/detail/${id}`;
    return Request.get(url);
  }
  static getCategory() {
    const url = `api/categoryEbook`;
    return Request.getWithAuth(url);
  }
}
