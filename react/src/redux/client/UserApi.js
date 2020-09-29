import Request from '../../utils/request';

export default class UsersApi {
  static login(userData) {
    const url = '/api/login';
    return Request.post(url, userData);
  }
  static logout() {
    const url = '/api/logout';
    return Request.getWithAuth(url);
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

  static toggleUserIntoAdmin(id) {
    const url = `/api/admin/manage-user/userIntoAdmin/${id}`;
    return Request.postWithAuth(url);
  }

  static deleteUserList(id) {
    const url = `/api/admin/manage-user/delete/${id}`;
    return Request.postWithAuth(url);
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
  static getBorrowedBookItem(id) {
    const url = `/api/profile/listBorrowBook/${id}`;
    return Request.getWithAuth(url);
  }
  static getBorrowedEbookItem(id) {
    const url = `/api/profile/listBorrowEbook/${id}`;
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
