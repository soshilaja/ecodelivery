
// ../components/ui/button.jsx
import PropTypes from "prop-types";

export const Button = ({ className, ...props }) => (
  <button
    className={`bg-green-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300 ${className}`}
    {...props}
  />
);

Button.propTypes = {
  className: PropTypes.string,
};