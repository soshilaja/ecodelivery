import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import AuthLinks from "./AuthLinks";
import SearchBar from "./ui/searchbar";
import PropTypes from "prop-types";

const DesktopDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-white hover:text-gray-300 group flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
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
            className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg 
            ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                transition-colors focus:outline-none focus:bg-gray-100"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-2 text-white text-left 
        hover:bg-gray-700 transition-colors"
        aria-expanded={isOpen}
      >
        {title}
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
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="block px-3 py-2 text-white text-sm 
                hover:bg-gray-700 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      type: "dropdown",
      title: "About",
      items: [
        { href: "/about-us", title: "About Us" },
        { href: "/about/how-it-works", title: "How It Works" },
      ],
    },
    {
      type: "dropdown",
      title: "Sustainability",
      items: [
        { href: "/sustainability/commitment", title: "Our Commitment" },
        { href: "/sustainability/offset", title: "Carbon Offset Programs" },
        { href: "/sustainability/tips", title: "Eco-Friendly Tips" },
      ],
    },
    { type: "link", href: "/business", title: "Businesses" },
    // { type: "link", href: "/support", title: "Support" },
    // { type: "link", href: "/blog", title: "Blog" },
  ];

  return (
    <nav
      className="bg-gray-800 sticky top-0 z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-white font-bold text-xl hover:text-gray-200 transition-colors"
            aria-label="EcoDelivery Home"
          >
            EcoDelivery
          </Link>

          {/* Desktop Navigation (>= 768px) */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {menuItems.map((item, index) =>
                item.type === "dropdown" ? (
                  <DesktopDropdown
                    key={index}
                    title={item.title}
                    items={item.items}
                  />
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                )
              )}
            </div>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              className="ml-4"
            />

            <AuthLinks
              isAuthenticated={!!user}
              isLoading={loading}
              handleLogout={handleLogout}
            />
          </div>

          {/* Mobile Menu Button (< 768px) */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 
            rounded-md text-gray-400 hover:text-white hover:bg-gray-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-offset-gray-800 focus:ring-white"
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (< 768px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween" }}
            className="fixed top-16 bottom-0 right-0 w-64 bg-gray-800 
            lg:hidden z-50 shadow-2xl overflow-y-auto"
          >
            <div className="pt-16 px-2 space-y-1">
              <div className="px-3 mb-4">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  className="w-full"
                />
              </div>

              {menuItems.map((item, index) =>
                item.type === "dropdown" ? (
                  <MobileDropdown
                    key={index}
                    title={item.title}
                    items={item.items}
                  />
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className="block px-3 py-2 text-white 
                    hover:bg-gray-700 transition-colors"
                  >
                    {item.title}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-gray-700">
                <AuthLinks
                  isAuthenticated={!!user}
                  isLoading={loading}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

DesktopDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

MobileDropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};


export default Navbar;