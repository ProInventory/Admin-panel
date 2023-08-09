import React from "react";

import Popup from "../common/popup";

const AddNewPopup = (props) => {
  const { onClose, onSubmit } = props;

  return (
    <React.Fragment>
      <Popup
        title="Create Branch"
        body={
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="text" id="phone" name="phone" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="manager">Manager:</label>
              <input type="text" id="manager" name="manager" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <button style={{ marginLeft: "10px" }} type="button" className="btn btn-secondary ml-3" onClick={onClose}>
              Cancel
            </button>
          </form>
        }
      ></Popup>
    </React.Fragment>
  );
};

export default AddNewPopup;
