import { DASHBOARD } from '../../type';

const initialState = {
  dashboardSummary: {},
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD:
      return {
        ...state,
        dashboardSummary: action.payload,
      };
    default:
      return state;
  }
};

export default dashboard;
