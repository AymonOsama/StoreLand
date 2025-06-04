import React from "react";

export const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
    <div
      className="bg-blue-600 h-4 transition-all duration-500"
      style={{ width: `${value}%` }}
    />
  </div>
);
