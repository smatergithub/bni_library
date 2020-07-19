import { EBOOKS } from '../../type';

const initialState = {
  ebooks: [],
};

const ebooks = (state = initialState, action) => {
  switch (action.type) {
    case EBOOKS:
      return {
        ...state,
        ebooks: action.payload,
      };
    default:
      return state;
  }
};

export default ebooks;
