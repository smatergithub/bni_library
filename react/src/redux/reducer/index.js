import { combineReducers } from 'redux';

import users from './modules/user';
import books from './modules/books';
import ebooks from "./modules/ebooks"
import repositorys from "./modules/repositorys";

const rootReducer = combineReducers({
  users,
  books,
  ebooks,
  repositorys
});

export default rootReducer;
