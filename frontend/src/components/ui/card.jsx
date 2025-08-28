// src/components/ui/card.js
import PropTypes from "prop-types";



export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div
    className={`px-4 py-5 border-b border-gray-200 font-medium sm:px-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={`px-4 py-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);


Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

