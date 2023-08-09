import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./common/navBar";

const NotFoundStyle = styled.div`
  .link {
    text-decoration: none;
    color: white;
  }

  .not-found {
    display: flex;
  }

  .not-found__content {
    margin-left: 250px;
    padding: 20px;
  }

  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .not-found__content {
    text-align: center;
  }

  .not-found__title {
    font-size: 100px;
    font-weight: bold;
    color: #b19cd8;
  }

  .not-found__message {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .not-found__button {
    background-color: #b19cd8;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .not-found__button:hover {
    background-color: #2a4b7c;
  }

  @media only screen and (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }

    .dashboard__content {
      margin-left: 0;
    }
  }
`;

const NotFound = () => {
  return (
    <React.Fragment>
      <NotFoundStyle>
        <div className="dashboard">
          <Navbar />
          <div className="dashboard__content">
            <div className="not-found">
              <div className="not-found__content">
                <h1 className="not-found__title">404 Not Found</h1>
                <p className="not-found__message">The page you are looking for cannot be found. Please check the URL or try again later.</p>
                <button className="not-found__button">
                  <Link to="/" className="link">
                    Go to Home
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </NotFoundStyle>
    </React.Fragment>
  );
};

export default NotFound;
