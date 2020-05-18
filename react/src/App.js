import React from 'react';

import { Provider } from 'react-redux';
import Router from './routers';
import './styles/custom/index.scss';
import 'antd/dist/antd.css';
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
