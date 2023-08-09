import React from "react";

import Popup from "../common/popup";

const EditPopup = (props) => {
  const { onClose, onChange, onSubmit } = props;
  const { id, name, address, phone, email, manager } = props.branch;

  return (
    <React.Fragment>
      <Popup
        title="Edit Branch"
        body={
          <React.Fragment>
            <p>Branch id: {id}</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" className="form-control" value={name} onChange={(e) => onChange("name", e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={address}
                  onChange={(e) => onChange("address", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => onChange("email", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="manager">Manager:</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  className="form-control"
                  value={manager}
                  onChange={(e) => onChange("manager", e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <button style={{ marginLeft: "10px" }} type="button" className="btn btn-secondary ml-3" onClick={onClose}>
                Cancel
              </button>
            </form>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default EditPopup;
