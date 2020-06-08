import { SIGN_IN } from '../../type';

const initialState = {
  isAuth: false,
  role: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuth: action.payload.logged,
        role: action.payload.role,
      };

    default:
      return state;
  }
};

export default user;
