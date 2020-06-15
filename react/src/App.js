import React from 'react';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Router from './routers';
import './styles/custom/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import Loader from '../src/component/Loader';
import configureStore from './redux/store/configureStore';

const { store } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer
        style={{
          zIndex: 10000,
        }}
      />
      <Loader />
    </Provider>
  );
}

export default App;
