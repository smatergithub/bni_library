import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import app from '../reducer';

export default function configureStore() {
  const middleWare = compose(applyMiddleware(thunk));
  const store = createStore(app, middleWare);
  return { store };
}
