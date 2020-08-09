import { ADD_WISHLIST, REMOVE_WISHLIST } from '../type';

export const addWishlist = product => dispatch => {
  dispatch({ type: ADD_WISHLIST, payload: product });
};
export const removeWishlist = product => dispatch => {
  dispatch({ type: REMOVE_WISHLIST, payload: product });
};
