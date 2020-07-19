import { combineReducers } from 'redux';

import user from './modules/user';
import books from './modules/books';
import userBooks from './modules/bookUser';

const rootReducer = combineReducers({
  user,
  books,
  userBooks,
});

export default rootReducer;
