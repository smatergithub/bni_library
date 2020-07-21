import React from "react";

const Button = (props) => {
  return (
    <React.Fragment>
      <button
        onClick={props.onClick}
        className="bg-green-400 text-white active:bg-indigo-600 text-xs   px-3 py-1 rounded outline-none focus:outline-none "
        type="button"
        style={props.style}
      >
        {props.children}
      </button>
    </React.Fragment>
  )
}

export default Button;
