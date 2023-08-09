import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "./logo";

const NavStyle = styled.nav`
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: #808080;
    overflow-y: auto;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navbar_links {
    list-style: none;
    margin: 0;
    padding: 30px;
  }

  .navbar_item {
    margin-bottom: 10px;
  }

  .navbar_link {
    display: block;
    color: white;
    font-size: 20px;
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    .navbar {
      width: 100%;
      height: 60px;
      overflow-x: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .navbar_links {
      display: flex;
      margin: 0;
      padding: 0;
    }

    .navbar_item {
      margin-left: 10px;
      margin-right: 10px;
    }

    .navbar_link {
      font-size: 16px;
    }
  }
`;

const Navbar = () => {
  return (
    <React.Fragment>
      <NavStyle>
        <nav className="navbar">
          <div className="logo">
            <Logo />
          </div>
          <ul className="navbar_links">
            <li className="navbar_item">
              <Link to="/" className="navbar_link">
                Home
              </Link>
            </li>
            <li className="navbar_item">
              <Link to="/users" className="navbar_link">
                Users
              </Link>
            </li>
            <li className="navbar_item">
              <Link to="/branches" className="navbar_link">
                Branches
              </Link>
            </li>
            <li className="navbar_item">
              <Link to="/products" className="navbar_link">
                Products
              </Link>
            </li>
            <li className="navbar_item">
              <Link to="/deliveries" className="navbar_link">
                Deliveries
              </Link>
            </li>
          </ul>
        </nav>
      </NavStyle>
    </React.Fragment>
  );
};

export default Navbar;
