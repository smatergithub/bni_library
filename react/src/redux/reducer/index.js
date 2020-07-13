import { combineReducers } from 'redux';

import user from './modules/user';
import books from './modules/books';

const rootReducer = combineReducers({
  user,
  books,
});

export default rootReducer;
