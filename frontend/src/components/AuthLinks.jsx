// AuthLinks.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../components/ui/notification";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Desktop Auth Dropdown Component
const AuthDesktopDropdown = ({ items, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      <button
        className="text-white hover:text-gray-300 group flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        My Account
        <ChevronDown
          className={`ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg 
            ring-1 ring-black ring-opacity-5 z-50"
          >
            {items.map((item, index) =>
              item.type === "divider" ? (
                <hr
                  key={index}
                  className="border-gray-200 my-1"
                />
              ) : (
                <Link
                  key={index}
                  to={item.href || "#"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                  transition-colors focus:outline-none focus:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    if (item.onClick) item.onClick();
                  }}
                >
                  {item.title}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Auth Dropdown Component
const AuthMobileDropdown = ({ items, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between my-auto items-center px-3 py-2 text-white text-left 
        hover:bg-gray-700 transition-colors"
      >
        My Account
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4"
          >
            {items.map((item, index) =>
              item.type === "divider" ? (
                <hr
                  key={index}
                  className="border-gray-200 my-1"
                />
              ) : (
                <Link
                  key={index}
                  to={item.href || "#"}
                  className="block px-3 py-2 text-white text-sm 
                  hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    if (item.onClick) item.onClick();
                  }}
                >
                  {item.title}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// AuthLinks Component
const AuthLinks = ({ isAuthenticated, handleLogout, isLoading }) => {
  const authItems = [
    { href: "/account/profile", title: "Profile" },
    { href: "/account/order", title: "Order" },
    { href: "/account/dashboard", title: "My Dashboard" },
    { href: "/account/impact", title: "Environmental Impact" },
    // { href: "/account/payments", title: "Payment Methods" },
    // { href: "/account/notifications", title: "Notifications" },
    { type: "divider" },
    { title: "Logout", onClick: handleLogout },
  ];

  if (isLoading) {
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return !isAuthenticated ? (
    <div className="w-full flex flex-col lg:flex-row px-3 space-y-2 lg:space-y-0 lg:space-x-4">
      <Link to="/signup" className="text-white hover:text-gray-300">
        Sign Up
      </Link>
      <Link to="/login" className="text-white hover:text-gray-300">
        Log In
      </Link>
    </div>
  ) : (
    <div className="w-full flex flex-col lg:flex-row px-0 space-y-2 lg:space-y-0 lg:space-x-4">
      <div className="block px-3 py-2 text-white hover:bg-gray-700 transition-colors">
        <NotificationBell />
      </div>
      <div className="hidden lg:block py-4">
        <AuthDesktopDropdown items={authItems} handleLogout={handleLogout} />
      </div>
      <div className="lg:hidden">
        <AuthMobileDropdown items={authItems} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

AuthDesktopDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleLogout: PropTypes.func.isRequired,
};

AuthMobileDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleLogout: PropTypes.func.isRequired,
};

AuthLinks.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default AuthLinks;
