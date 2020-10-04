import { WILAYAHS } from '../../type';

const initialState = {
  wilayah: [],
};

const wilayah = (state = initialState, action) => {
  switch (action.type) {
    case WILAYAHS:
      return {
        ...state,
        wilayah: action.payload,
      };
    default:
      return state;
  }
};

export default wilayah;
