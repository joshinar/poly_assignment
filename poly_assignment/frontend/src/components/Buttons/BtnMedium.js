import React from 'react';

const BtnMedium = ({ text, onClick }) => {
  return (
    <button
      className='px-6 py-2 bg-blue-500 text-white font-bold rounded-sm w-fit'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BtnMedium;
