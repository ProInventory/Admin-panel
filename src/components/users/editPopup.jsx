import React from "react";

import Popup from "../common/popup";

const EditPopup = (props) => {
  const { onClose, onChange, onSubmit } = props;
  const { id, username, email, isAdmin } = props.user;

  return (
    <React.Fragment>
      <Popup
        title="Edit user"
        body={
          <React.Fragment>
            User id: {id}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => onChange("username", e.target.value)}
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
                <label htmlFor="isAdmin">Admin:</label>
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  className="form-check-input"
                  style={{ width: "20px", height: "20px" }}
                  checked={isAdmin}
                  onChange={(e) =>
                    onChange(
                      "isAdmin",
                      e.target.checked, // this need to be fixed
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="form-control" />
                Leave the password empty if you don't want to change it
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
