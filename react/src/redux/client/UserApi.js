import Request from '../../utils/request';

export default class UsersApi {
  static login(userData) {
    const endpoint = '/api/auth/login';
    return Request.post(endpoint, userData);
  }
}
