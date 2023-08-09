import React from "react";

import Popup from "../popup";

const DeletePopup = (props) => {
  const { id, what, onClose, onDelete } = props;

  return (
    <React.Fragment>
      <Popup
        title={`Delete ${what}`}
        body={
          <React.Fragment>
            <p>Are you sure you want to delete this {what}?</p>
            <p>
              {what} id: {id}
            </p>
            <button type="button" className="btn btn-primary" onClick={onDelete}>
              Yes
            </button>

            <button type="button" className="btn btn-secondary ml-3" style={{ marginLeft: "10px" }} onClick={onClose}>
              No
            </button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default DeletePopup;
