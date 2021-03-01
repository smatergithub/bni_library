import { TRANSACTION_BOOKS, TRANSACTION_EBOOKS } from '../../type';

const initialState = {
  transactionBooks: [],
  transactionEbooks: []
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_BOOKS:
      return {
        ...state,
        transactionBooks: action.payload,
      };
    case TRANSACTION_EBOOKS:
      return {
        ...state,
        transactionEbooks: action.payload,
      };
    default:
      return state;
  }
};

export default transactions;
