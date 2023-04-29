import React from "react";

import Popup from "../common/popup";

const AddNewPopup = (props) => {
	const { onClose, onSubmit } = props;

	return (
		<React.Fragment>
			<Popup
				title="Create Delivery"
				body={
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="fromBranch">From:</label>
							<input
								type="text"
								id="fromBranch"
								name="fromBranch"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="toBranch">To:</label>
							<input
								type="text"
								id="toBranch"
								name="toBranch"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="items">Items:</label>
							<input
								type="text"
								id="items"
								name="items"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="placedDate">Placed Date:</label>
							<input
								type="date"
								id="placedDate"
								name="placedDate"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="status">Status:</label>
							<select
								id="status"
								name="status"
								className="form-control"
							>
								<option value="Processing">Processing</option>
								<option value="Pending">Pending</option>
								<option value="OnTransit">OnTransit</option>
								<option value="Delivered">Delivered</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="deliveryDate">Delivery Date:</label>
							<input
								type="date"
								id="deliveryDate"
								name="deliveryDate"
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
							onClick={onClose}
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
