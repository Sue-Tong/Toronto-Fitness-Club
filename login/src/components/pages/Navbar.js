import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-around">
        <Link to="/" className="navbar-brand mx-3">
          <h1>
            <strong>
              <em>Toronto Fitness Club</em>
            </strong>
          </h1>
        </Link>
        <ul className="nav navbar-nav py-3 mx-3">
          <li className="nav-item active mx-3">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active mx-3">
            <Link to="/studioList" className="nav-link">
            Studios
            </Link>
          </li>
          <li className="nav-item active mx-3">
            <Link to="/map" className="nav-link">
            Studios Map
            </Link>
          </li>
          <li className="nav-item active mx-3">
            <Link to="/studioSearchingName" className="nav-link">
            Search Studios
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/register"
              className="nav-link"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/login"
              className="nav-link"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;