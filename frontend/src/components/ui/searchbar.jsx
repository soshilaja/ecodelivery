// SearchBar Component
import PropTypes from "prop-types";
import { useState} from "react";
import {Search} from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 
            focus:ring-white transition-all duration-200"
          placeholder="Search..."
          aria-label="Search"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 ${
              isFocused ? "text-white" : "text-gray-400"
            } transition-colors duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;