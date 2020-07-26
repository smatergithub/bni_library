import { combineReducers } from 'redux';

import users from './modules/user';
import books from './modules/books';
import userBooks from './modules/bookUser';
import ebooks from './modules/ebooks';
import repositorys from './modules/repositorys';

const rootReducer = combineReducers({
  users,
  books,
  userBooks,
  ebooks,
  repositorys,
});

export default rootReducer;
