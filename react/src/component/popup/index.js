import React from 'react';
import './index.css';
import propTypes from 'prop-types';

function PopUp(props) {
  const { show, login } = props;
  let showClass = 'visible';
  let opacity = 'opacity-75';
  let position = 'c-popup';
  let buttonText = 'sign up';

  if (!show) {
    showClass = 'invisible';
    opacity = 'opacity-0';
    position = 'c-pre-popup';
  }

  let signUp = 'visible';
  if (login) {
    signUp = 'hidden';
    buttonText = 'login';
  }
  return (
    <div className={`transition-all ease-out duration-200 fixed ${showClass}`}>
      <div
        className={`py-8 px-8 transition-all ease-out duration-200 fixed z-20 bg-white ${position}`}
      >
        <div className="text-center font-bold mb-5">LOGO</div>

        <input
          placeholder="name"
          type="text"
          className={`w-full outline-none border-solid border-1 mb-5 rounded-md h-10 border-gray-600 ${signUp}`}
        />
        <input
          placeholder="email"
          type="text"
          className="w-full outline-none border-solid border-1 mb-5 rounded-md h-10 border-gray-600"
        />
        <input
          placeholder="password"
          type="text"
          className="w-full outline-none border-solid border-1 mb-5 rounded-md h-10 border-gray-600"
        />
        <div className="w-full text-gray-600 mb-5">Forgot Password ?</div>
        <button
          type="button"
          className="rounded-md float-right bg-gray-500 py-1 px-8 focus:outline-none"
        >
          {buttonText}
        </button>
      </div>
      <div
        onClick={() => props.setCloseHandler()}
        className={`transition-all ease-out duration-500 bg-white fixed c-popup-wrapper cover z-10 ${opacity}`}
      />
    </div>
  );
}

PopUp.propTypes = {
  show: propTypes.bool.isRequired,
  login: propTypes.bool.isRequired,
  setCloseHandler: propTypes.isRequired,
};

export default PopUp;
