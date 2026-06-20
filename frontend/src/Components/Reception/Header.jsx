import React from "react";

import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import "../../styles/Reception/header.css";

function Header() {
  return (
    <div className="header">

      {/* Left Section */}

      <div className="header-left">

        <button className="menu-btn">
          <FaBars />
        </button>

      </div>

      {/* Center Section */}

      <div className="header-center">

        <div className="date-box">
          <input
            type="date"
            className="date-input"
          />
        </div>

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by Name, UHID or Mobile Number"
            className="search-input"
          />

        </div>

      </div>

      {/* Right Section */}

      <div className="header-right">

        <div className="notification">

          <FaBell />

          <span className="notification-badge">
            3
          </span>

        </div>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <span className="profile-name">
            Receptionist
          </span>

        </div>

      </div>

    </div>
  );
}

export default Header;