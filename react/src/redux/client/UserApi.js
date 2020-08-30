import Request from '../../utils/request';

export default class UsersApi {
  static login(userData) {
    const url = '/api/login';
    return Request.post(url, userData);
  }
  static register(userData) {
    const url = '/api/register';
    return Request.post(url, userData);
  }
  static verificationUser(userData) {
    const url = `/api/verification?${userData}`;
    return Request.post(url);
  }

  static listUserAdmin(param) {
    const url = `/api/admin/manage-user?page=${param.page}&limit=${param.limit}`;
    return Request.getWithAuth(url);
  }

  static toggleUserIntoAdmin(userData, id) {
    console.log(id);
    const url = `/api/admin/manage-user/${id}`;
    return Request.postWithAuth(url, userData, false, false);
  }

  static dataSourceListUser() {
    const url = `/api/admin/listUser`;
    return Request.getWithAuth(url);
  }
  static getMe() {
    const endpoint = '/api/profile/me';
    return Request.getWithAuth(endpoint);
  }
  static updateMe(userData) {
    const url = `/api/profile/updateProfile`;
    return Request.postWithAuth(url, userData, true);
  }
  static getBorrowedBookItem() {
    const url = `/api/profile/listBorrowBook`;
    return Request.getWithAuth(url);
  }
  static getBorrowedEbookItem() {
    const url = `/api/profile/listBorrowEbook`;
    return Request.getWithAuth(url);
  }
  static createBookFeeback(userData) {
    const url = `/api/ratingBook`;
    return Request.postWithAuth(url, userData, false, false);
  }
  static createEbookFeeback(userData) {
    const url = `/api/ratingEbook`;
    return Request.postWithAuth(url, userData, false, false);
  }
}
