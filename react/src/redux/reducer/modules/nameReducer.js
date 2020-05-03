import { GET_NAMES, SELECT_NAME_BYID } from '../../type';

const initialState = {
  names: [],
  name: null,
};

const names = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAMES:
      return {
        ...state,
        names: action.payload,
      };
    case SELECT_NAME_BYID:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default names;
