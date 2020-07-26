import { SIGN_IN, SIGN_OUT, USERS, ME } from '../../type';

const initialState = {
  isAuth: false,
  role: '',
  users: [],
  me: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuth: true,
        role: action.payload.role,
      };
    case SIGN_OUT:
      return initialState;
    case USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ME:
      return {
        ...state,
        me: action.payload,
      };
    default:
      return state;
  }
};

export default user;
