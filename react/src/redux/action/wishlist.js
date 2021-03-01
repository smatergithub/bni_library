import {
  ADD_BOOK_WISHLIST,
  REMOVE_BOOK_WISHLIST,
  ADD_EBOOK_WISHLIST,
  REMOVE_EBOOK_WISHLIST,
} from '../type';

export const addBookWishlist = product => dispatch => {
  dispatch({ type: ADD_BOOK_WISHLIST, payload: product });
};
export const removeBookWishlist = product => dispatch => {
  dispatch({ type: REMOVE_BOOK_WISHLIST, payload: product });
};
export const addEbookWishlist = product => dispatch => {
  dispatch({ type: ADD_EBOOK_WISHLIST, payload: product });
};
export const removeEbookWishlist = product => dispatch => {
  dispatch({ type: REMOVE_EBOOK_WISHLIST, payload: product });
};
