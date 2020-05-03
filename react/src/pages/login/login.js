import React, { useState } from 'react';
import './index.css';
import PopUp from '../../component/popup/index';

const Login = () => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(true);

  const loginHandler = () => {
    setShow(true);
    setLogin(true);
  };

  return (
    <div className="login-page flex justify-between px-12 py-8">
      <div>Logo</div>

      <button
        type="button"
        className="bg-transparent border border-black rounded rounded-full py-1 px-16 focus:outline-none"
        onClick={() => loginHandler()}
      >
        Sign
      </button>

      <button
        type="button"
        className="bg-gray-500 border rounded rounded-full py-2 px-16 focus:outline-none hover:border-gray-500 bottom-0 fixed my-8 "
      >
        Try now
      </button>

      <PopUp show={show} login={login} setCloseHandler={() => setShow(false)} />
    </div>
  );
};

export default Login;
