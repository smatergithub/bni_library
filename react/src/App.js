import React from 'react';

import { Provider } from 'react-redux';
import Router from './routers';

import configureStore from './redux/store/configureStore';

const { store } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
