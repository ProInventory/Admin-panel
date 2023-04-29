import React, { useState, useEffect } from "react";
import styled from "styled-components";

import fetchData from "../utils/fetchData";

import Popup from "../common/popup";

const AddNewPopupStyle = styled.div`
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.7em top 50%, 0 0;
		background-size: 1.3em auto, 100%;
		padding-right: 1.5em;
	}
`;

const AddNewPopup = (props) => {
	const [branches, setBranches] = useState([]);

	const { onClose, onChange, onSubmit } = props;
	const { fromBranch, toBranch, items, placedDate, status, deliveryDate } =
		props.delivery;

	useEffect(() => {
		fetchData("branches").then((response) => setBranches(response.data));
	}, []);

	return (
		<React.Fragment>
			<Popup
				title="Create Delivery"
				body={
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="fromBranch">From:</label>
							<select
								id="fromBranch"
								name="fromBranch"
								className="form-control"
								value={fromBranch}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							>
								{branches.map((branch) => (
									<option
										key={branch._id}
										value={branch.name}
									>
										{branch.name}
									</option>
								))}
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="toBranch">To:</label>

							<select
								id="toBranch"
								name="toBranch"
								className="form-control"
								value={toBranch}
								onChange={(e) =>
									onChange(e.target.name, e.target.value)
								}
							>
								{branches.map((branch) => (
									<option
										key={branch._id}
										value={branch.name}
									>
										{branch.name}
									</option>
								))}
							</select>
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
