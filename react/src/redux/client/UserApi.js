import Request from '../../utils/request';

export default class UsersApi {
  static login(userData) {
    const endpoint = '/api/login';
    return Request.post(endpoint, userData);
  }
  static register(userData) {
    const endpoint = '/api/register';
    return Request.post(endpoint, userData);
  }
}
