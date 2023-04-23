import React from "react";

import Popup from "../common/popup";

const DeletePopup = (props) => {
	const { id, onClose, onDelete } = props;

	return (
		<React.Fragment>
			<Popup
				title="Delete User"
				body={
					<React.Fragment>
						<p>Are you sure you want to delete this user?</p>
						<p>User id: {id}</p>
						<button
							type="button"
							className="btn btn-primary"
							onClick={onDelete}
						>
							Yes
						</button>

						<button
							type="button"
							className="btn btn-secondary ml-3"
							style={{ marginLeft: "10px" }}
							onClick={onClose}
						>
							No
						</button>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	);
};

export default DeletePopup;
