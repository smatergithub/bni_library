import { EBOOK_USERS } from '../../type';

const initialState = {
  ebooks: null,
};

const userEbooks = (state = initialState, action) => {
  switch (action.type) {
    case EBOOK_USERS:
      return {
        ...state,
        ebooks: action.payload,
      };
    default:
      return state;
  }
};

export default userEbooks;
