import React from "react";

import Popup from "../common/popup";

const AddNewPopup = (props) => {
	const { onClose, onSubmit } = props;

	return (
		<React.Fragment>
			<Popup
				title="Create Product"
				body={
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								id="name"
								name="name"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="category">Category:</label>
							<input
								type="text"
								id="category"
								name="category"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="price">Price:</label>
							<input
								type="number"
								id="price"
								name="price"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="quantity">Quantity:</label>
							<input
								type="number"
								id="quantity"
								name="quantity"
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="description">Description:</label>
							<input
								type="text"
								id="description"
								name="description"
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
