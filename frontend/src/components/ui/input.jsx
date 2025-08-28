
// ../components/ui/input.jsx
import PropTypes from "prop-types";
import React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
));

Input.propTypes = {
  className: PropTypes.string,
};

Input.displayName = "Input"; // Optional: Helps in debugging


