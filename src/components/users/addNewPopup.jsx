import React from "react";

import Popup from "../common/popup";

const AddNewPopup = (props) => {
	const { onCloseAddNewPopup, onSubmit } = props;

	return (
		<React.Fragment>
			<Popup
				title="Create User"
				body={
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="username">Username:</label>
							<input
								type="text"
								id="username"
								name="username"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								name="email"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="isAdmin">Admin:</label>
							<input
								type="checkbox"
								id="isAdmin"
								name="isAdmin"
								style={{ width: "20px", height: "20px" }}
								className="form-check-input"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								name="password"
								className="form-control"
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Submit
						</button>

						<button
							style={{ marginLeft: "10px" }}
							type="button"
							className="btn btn-secondary ml-3"
							onClick={onCloseAddNewPopup}
						>
							Cancel
						</button>
					</form>
				}
			></Popup>
		</React.Fragment>
	);
};

export default AddNewPopup;
