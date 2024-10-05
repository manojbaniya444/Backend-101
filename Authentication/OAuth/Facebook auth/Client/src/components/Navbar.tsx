import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <span className="logo"></span>
      <ul className="list">
        <li className="logout">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
