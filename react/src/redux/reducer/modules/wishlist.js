import { ADD_WISHLIST, REMOVE_WISHLIST } from '../../type';

let initialValue = {
  item: [],
};

const Wishlist = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_WISHLIST:
      return {
        ...state,
        item: [...state.item, action.payload],
      };
    case REMOVE_WISHLIST:
      return {
        ...state,
        item: state.item.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
export default Wishlist;
