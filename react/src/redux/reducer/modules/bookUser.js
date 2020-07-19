import { BOOK_USERS } from '../../type';

const initialState = {
  books: null,
};

const userBooks = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_USERS:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default userBooks;
