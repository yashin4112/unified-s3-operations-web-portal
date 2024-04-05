import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'blue', padding: '10px 0' }}>
      <div className="navbar-container">
        <div className="logo">Your Logo</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <style>
        {`
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .nav-links {
            list-style-type: none;
            display: flex;
            padding: 0;
          }

          .nav-links li {
            margin-right: 20px;
          }

          .nav-links li:last-child {
            margin-right: 0;
          }

          .nav-links li a {
            color: white;
            text-decoration: none;
          }

          .nav-links li a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
