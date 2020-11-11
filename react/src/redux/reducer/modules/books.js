import { BOOKS } from '../../type';

const initialState = {
  books: {},
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default books;
