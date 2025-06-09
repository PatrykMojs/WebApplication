import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarComponent.css";
import ClockComponent from "../../Clock/ClockComponent";

const NavbarComponent = () => {
  return (
    <nav className="navbar">
      <div className="logo">🌍 API Dashboard</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Strona główna
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather" className={({ isActive }) => (isActive ? "active" : "")}>
            Pogoda
          </NavLink>
        </li>
        <li>
          <NavLink to="/curriences" className={({ isActive }) => (isActive ? "active" : "")}>
            Waluty
          </NavLink>
        </li>
      </ul>

      <div className="clock-container">
        <ClockComponent />
      </div>
    </nav>
  );
};

export default NavbarComponent;
