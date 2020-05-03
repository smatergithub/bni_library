import { combineReducers } from 'redux';

import nameReducer from './modules/nameReducer';

const rootReducer = combineReducers({
  nameReducer,
});

export default rootReducer;
