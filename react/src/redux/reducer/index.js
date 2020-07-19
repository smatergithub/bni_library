import { combineReducers } from 'redux';

import user from './modules/user';
import books from './modules/books';
import ebooks from "./modules/ebooks"

const rootReducer = combineReducers({
  user,
  books,
  ebooks
});

export default rootReducer;
