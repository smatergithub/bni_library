import Request from '../../utils/request';

export default class DashboardApi {

  static list() {
    const url = `/api/admin/dashboard`;
    return Request.getWithAuth(url);
  }

}
