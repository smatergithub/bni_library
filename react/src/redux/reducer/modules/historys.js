import { HISTORY_TRANSACTION_BOOKS,HISTORY_TRANSACTION_EBOOKS } from '../../type';

const initialState = {
  historyBooks: {},
  historyEbooks : {}
};

const historys = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_TRANSACTION_BOOKS:
      return {
        ...state,
        historyBooks: action.payload,
      };
      case HISTORY_TRANSACTION_EBOOKS:
      return {
        ...state,
        historyEbooks: action.payload,
      };
    default:
      return state;
  }
};

export default historys;
