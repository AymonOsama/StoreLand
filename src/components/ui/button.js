import React from "react";

export const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);
