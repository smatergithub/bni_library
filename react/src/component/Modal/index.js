import React from 'react';

export default function Modal({ open, title, onCLose, handleSubmit, children }) {
  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => onCLose()}
          >
            <div className="modal-container bg-white w-11/12 md:max-w-md rounded shadow-lg  overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">{title}</p>
                  <div className="modal-close cursor-pointer z-50">
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                  </div>
                </div>
                {children}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onCLose()}
                    className="px-4 bg-transparent p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleSubmit()}
                    className="modal-close px-6 bg-gray-800  rounded-sm text-white hover:bg-indigo-400"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
