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

  static listUserAdmin(param) {
    const url = `/api/admin/manage-user?page=${param.page}&limit=${param.limit}`;
    return Request.getWithAuth(url);
  }

  static toggleUserIntoAdmin(id) {
    const url = `/api/admin/manage-user/${id}`;
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
}
