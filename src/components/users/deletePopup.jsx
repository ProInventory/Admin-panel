import React from "react";

import Popup from "../common/popup";

const DeletePopup = (props) => {
	const { onCloseDeletePopup, onDeleteUser } = props;

	return (
		<React.Fragment>
			<Popup
				title="Delete User"
				body={
					<React.Fragment>
						<p>Are you sure you want to delete this user?</p>

						<button
							type="button"
							className="btn btn-primary"
							onClick={onDeleteUser}
						>
							Yes
						</button>

						<button
							type="button"
							className="btn btn-secondary ml-3"
							style={{ marginLeft: "10px" }}
							onClick={onCloseDeletePopup}
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
