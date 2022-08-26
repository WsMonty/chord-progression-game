import React from 'react';
import { Link } from 'gatsby';

const navLinks = ['Play', 'About', 'Contact'];

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar_list">
        {navLinks.map((link, i) => {
          return (
            <li key={i}>
              <Link className="navbar_link" to={`/${link.toLowerCase()}`}>
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
