import React from "react";
import "./SearchBox.css";

const SearchBox = ({ onSearch, query, setQuery }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        id="search-input"
        value={query}
        onChange={onSearch}
        placeholder="Start searching"
        className="search-input"
      />
      <span className="keyboard-shortcut">CTRL + /</span>
    </div>
  );
};

export default SearchBox;
