import React, { useEffect } from 'react';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-custom-green-1 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p className="font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold hover:bg-custom-green-1 p-1 rounded-full"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;