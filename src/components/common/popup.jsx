import React from "react";
import styled from "styled-components";

const PopupStyle = styled.div`
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-content {
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 90%;
  }

  .popup-content h2 {
    margin-top: 0;
  }

  .popup-content form {
    margin-top: 20px;
  }

  .popup-content .form-group {
    margin-bottom: 10px;
  }

  .popup-content label {
    display: block;
    margin-bottom: 5px;
  }

  .popup-content input[type="text"],
  .popup-content input[type="email"],
  .popup-content input[type="password"],
  .popup-content input[type="checkbox"] {
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .popup-content button[type="submit"],
  .popup-content button[type="button"] {
    margin-top: 10px;
  }
`;

const Popup = (props) => {
  const { title, body } = props;

  return (
    <React.Fragment>
      <PopupStyle>
        <div className="popup">
          <div className="popup-content">
            <h2>{title}</h2>
            {body}
          </div>
        </div>
      </PopupStyle>
    </React.Fragment>
  );
};

export default Popup;
