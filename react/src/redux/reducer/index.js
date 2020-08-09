import { combineReducers } from 'redux';

import users from './modules/user';
import books from './modules/books';
import userBooks from './modules/bookUser';
import ebooks from './modules/ebooks';
import repositorys from './modules/repositorys';
import transactions from "./modules/transactions";
import dashboard from "./modules/dashboard";


const rootReducer = combineReducers({
  users,
  books,
  userBooks,
  ebooks,
  repositorys,
  transactions,
  dashboard
});

export default rootReducer;
