import { combineReducers } from 'redux';

import users from './modules/user';
import books from './modules/books';
import historys from './modules/historys';
import userBooks from './modules/bookUser';
import userEbooks from './modules/ebookUser';
import ebooks from './modules/ebooks';
import repositorys from './modules/repositorys';
import wishlist from './modules/wishlist';
import dashboard from './modules/dashboard';
import transactions from './modules/transactions';
import wilayah from './modules/wilayah';

const rootReducer = combineReducers({
  users,
  books,
  userBooks,
  userEbooks,
  ebooks,
  repositorys,
  wishlist,
  dashboard,
  transactions,
  historys,
  wilayah,
});

export default rootReducer;
