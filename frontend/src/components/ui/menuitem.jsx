
// import PropTypes from "prop-types";
// import { Link, useLocation } from "react-router-dom";

// const MenuItem = ({ href, children, onClick, isDropdown = false }) => {
//   const location = useLocation();
//   const isActive = location.pathname.startsWith(href);
//   const baseClasses = isDropdown
//     ? "block px-4 py-2 text-sm"
//     : "px-3 py-2 rounded-md text-sm font-medium";
//   const activeClasses = isDropdown
//     ? "bg-gray-100 text-gray-900"
//     : "bg-gray-900 text-white";
//   const inactiveClasses = isDropdown
//     ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//     : "text-gray-300 hover:bg-gray-700 hover:text-white";


//   return (
//     <Link
//       to={href}
//       className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
//       onClick={onClick}
//     >
//       {children}
//     </Link>
//   );
// };

// MenuItem.propTypes = {
//   href: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func,
//   isDropdown: PropTypes.bool,
// };

// export default MenuItem;


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