import React from "react";

import Popup from "../common/popup";

const AddNewPopup = (props) => {
	const { onClose, onChange, onSubmit } = props;
	const { fromBranch, toBranch, items, placedDate, status, deliveryDate } =
		props.delivery;

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
								value={fromBranch}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="toBranch">To:</label>
							<input
								type="text"
								id="toBranch"
								name="toBranch"
								className="form-control"
								value={toBranch}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="items">Items:</label>
							<input
								type="text"
								id="items"
								name="items"
								className="form-control"
								value={items}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="placedDate">Placed Date:</label>
							<input
								type="date"
								id="placedDate"
								name="placedDate"
								className="form-control"
								value={placedDate}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="status">Status:</label>
							<select
								id="status"
								name="status"
								className="form-control"
								value={status}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
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
								value={deliveryDate}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
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
