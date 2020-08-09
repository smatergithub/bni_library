import DashboardApi from '../client/DashboardApi';
import { DASHBOARD } from '../type';

export const getDashboardSummary = params => dispatch => {
  return DashboardApi.list(params)
    .then(res => {
      if (res) {
        dispatch({ type: DASHBOARD, payload: res });
        return {
          resp: true,
          msg: '',
        };
      }
    })
    .catch(err => {
      let msg = err.message || 'Something Wrong, request failed !';
      return { resp: false, msg: msg };
    });
};
