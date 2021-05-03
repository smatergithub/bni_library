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
    case ADD_BOOK_WISHLIST: {
      let newState = Object.assign({}, state);
      newState.books = [...state.books, action.payload];
      localStorage.setItem('bni_book', JSON.stringify(newState.books));
      return newState;
    }
    case REMOVE_BOOK_WISHLIST: {
      let newState = Object.assign({}, state);
      let cart = JSON.parse(localStorage.getItem('bni_book'));
      newState.books = state.books.filter((item) => item.id !== action.payload.id);
      if (cart !== null) {
        let newLocalstorageCart = cart.filter((item) => item.id !== action.payload.id);
        localStorage.setItem('bni_book', JSON.stringify(newLocalstorageCart));
      }
      return newState;
    }
    // return {
    //   ...state,
    //   books: state.books.filter(item => item.id !== action.payload.id),
    // };
    case ADD_EBOOK_WISHLIST: {
      let newState = Object.assign({}, state);
      newState.ebooks = [...state.ebooks, action.payload];
      localStorage.setItem('bni_ebook', JSON.stringify(newState.ebooks));
      return newState;
    }
    // return {
    //   ...state,
    //   ebooks: [...state.ebooks, action.payload],
    // };
    case REMOVE_EBOOK_WISHLIST: {
      let newState = Object.assign({}, state);
      newState.ebooks = state.ebooks.filter((item) => item.id !== action.payload.id);
      localStorage.removeItem('bni_ebook', newState.ebooks);
      return newState;
    }
    // return {
    //   ...state,
    //   ebooks: state.ebooks.filter(item => item.id !== action.payload.id),
    // };
    default:
      return state;
  }
};
export default Wishlist;
