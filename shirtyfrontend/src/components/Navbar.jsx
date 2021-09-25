import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-4">
      <div className="container-md">
        <Link className="navbar-brand text-primary fs-2" to="/">
          Shirty.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" aria-current="page" to="/cart">
                Cart
              </Link>
            </li>
            {user && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admindashboard">
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!user && (
              <React.Fragment>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </React.Fragment>
            )}
            {user && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/signout">
                  Sign Out
                </Link>
              </li>
            )}
          </ul>

          
            <Link className="nav-link btn btn-primary ms-auto text-white" to="/cart">
              Buy now
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
