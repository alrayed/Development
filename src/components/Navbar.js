import React from 'react';
import './Navbar.css';

const Navbar = ({ onCartClick,onAccountClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>🍔Burger</span>
      </div>
      <ul className="navbar-links navbar-center">
       <li><a href="#/about">About</a></li>
        <li><a href="#signup">Sign Up</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="navbar-icon" title="Cart" onClick={onCartClick}>🛒</button>
        <span className="navbar-divider"></span>
        <button className="navbar-icon" title="Account" onClick={onAccountClick}>👤</button>
      </div>
    </nav>
  );
};

export default Navbar;