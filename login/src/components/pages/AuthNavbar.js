import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {


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
              Logout
            </Link>
          </li>
          <li className="nav-item active mx-3">
            <Link to="/studioList" className="nav-link">
            Studios
            </Link>
          </li>
          <li className="nav-item active mx-3">
            <Link to="/studiosubscribe" className="nav-link">
            Subscription Plans
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link
              to="/home"
              className="nav-link"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              My account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AuthNavbar;