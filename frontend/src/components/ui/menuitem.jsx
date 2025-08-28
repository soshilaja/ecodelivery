// MenuItem.jsx

import PropTypes from "prop-types";
import { Link} from "react-router-dom";

// MenuItem Component
const MenuItem = ({ href, children, onClick, className = "" }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-offset-gray-800 focus:ring-white ${className}`}
    role="menuitem"
  >
    {children}
  </Link>
);

MenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default MenuItem;