import {
  ADD_BOOK_WISHLIST,
  REMOVE_BOOK_WISHLIST,
  ADD_EBOOK_WISHLIST,
  REMOVE_EBOOK_WISHLIST,
} from '../../type';

let initialValue = {
  books: [],
  ebooks: [],
};

const Wishlist = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_BOOK_WISHLIST:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case REMOVE_BOOK_WISHLIST:
      return {
        ...state,
        books: state.books.filter(item => item.id !== action.payload.id),
      };
    case ADD_EBOOK_WISHLIST:
      return {
        ...state,
        ebooks: [...state.ebooks, action.payload],
      };
    case REMOVE_EBOOK_WISHLIST:
      return {
        ...state,
        ebooks: state.ebooks.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
export default Wishlist;
