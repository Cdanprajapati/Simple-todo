import React from 'react';

const CustomButton = ({ text, onClick, type, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md shadow-md hover:shadow-lg w-[100px] p-2 mx-auto my-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:w-[120ox] ${
        className ? className : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
