import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, isAdmin, getUser, logout } from "../services/auth";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const admin = isAdmin();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Stayly<span className="logo-accent">.</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {loggedIn && !admin && (
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
          )}

          {admin && (
            <>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/rooms">Rooms</Link>
              </li>
              <li>
                <Link to="/admin/bookings">Bookings</Link>
              </li>
            </>
          )}

          {loggedIn ? (
            <li className="navbar-user">
              <span className="navbar-greeting">Hi, {user?.name?.split(" ")[0]}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-nav-outline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-nav-primary">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
