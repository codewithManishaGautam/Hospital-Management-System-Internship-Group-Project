import React from "react";

function SearchBar({ value, onChange, placeholder, right }) {
  return (
    <div className="doctor-searchbar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="doctor-searchbar__input"
      />
      {right ? <div className="doctor-searchbar__right">{right}</div> : null}
    </div>
  );
}

export default SearchBar;

