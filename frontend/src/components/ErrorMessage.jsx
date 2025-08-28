
import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 px-8 text-center mb-4">{message}</p>;
};

export default ErrorMessage;
