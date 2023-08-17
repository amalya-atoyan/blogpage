import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import IMAGES from "../../images";

function Navbar() {

  return (
      <nav className="navbar">
        <ul>
        <img src={IMAGES.logo} className="logoimg"/>
          <li>
            <NavLink to={'/'}>All Post</NavLink>
          </li>
          <li>
            <NavLink to={'createpost'}>Add Post</NavLink>
          </li>
          <li>
            <NavLink to={'myposts'}>My Posts</NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default Navbar;
