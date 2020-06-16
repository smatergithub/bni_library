import { SIGN_IN, SIGN_OUT } from '../../type';

const initialState = {
  isAuth: false,
  role: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuth: true,
        role: action.payload.superAdmin ? '2' : action.payload.isAdmin ? '1' : '0',
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
