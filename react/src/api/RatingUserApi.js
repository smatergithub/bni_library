import Request from '../utils/request';

export default class RatingUserApi {
  static getListRatingBook() {
    const url = `/api/ratingBook/list`;
    return Request.getWithAuth(url);
  }
  static getListRatingEbook() {
    const url = `/api/ratingEbook/list`;
    return Request.getWithAuth(url);
  }
}
