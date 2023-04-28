import React, { useEffect, useState } from "react";
import styled from "styled-components";

import fetchData from "./utils/fetchData";

import Navbar from "./common/navBar";
import AddNewPopup from "./deliveries/addNewPopup";

const DeliveriesStyle = styled.div`
	.deliveries {
		display: flex;
	}

	.deliveries_content {
		margin-left: 250px;
		padding: 20px;
	}

	.buttons {
		margin: 0 5px;
	}

	@media only screen and (max-width: 768px) {
		.deliveries {
			flex-direction: column;
		}

		.deliveries_content {
			margin-left: 0;
		}
	}
`;

const Deliveries = () => {
	const [id, setId] = useState("");
	const [fromBranch, setFromBranch] = useState("");
	const [toBranch, setToBranch] = useState("");
	const [items, setItems] = useState([]);
	const [placedDate, setPlacedDate] = useState("");
	const [status, setStatus] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");

	const [deliveries, setDeliveries] = useState([]);
	const [selectedDelivery, setSelectedDelivery] = useState("");
	const [error, setError] = useState("");

	const [showAddNewPopup, setAddNewShowPopup] = useState(false);
	const [showEditPopup, setEditShowPopup] = useState(false);
	const [showDeletePopup, setDeleteShowPopup] = useState(false);

	const [showSuccessPopup, setSuccessShowPopup] = useState(false);
	const [showErrorPopup, setErrorShowPopup] = useState(false);

	const openAddNewPopup = () => {
		setAddNewShowPopup(true);
	};

	const closeAddNewPopup = () => {
		setAddNewShowPopup(false);
	};

	const openEditPopup = (_id) => {
		changeSelected(_id);
		setEditShowPopup(true);
	};

	const closeEditPopup = () => {
		setEditShowPopup(false);
	};

	const openDeletePopup = (_id) => {
		changeSelected(_id);
		setDeleteShowPopup(true);
	};

	const closeDeletePopup = () => {
		setDeleteShowPopup(false);
	};

	const openSuccessPopup = () => {
		setSuccessShowPopup(true);
	};

	const closeSuccessPopup = () => {
		setSuccessShowPopup(false);
	};

	const openErrorPopup = () => {
		setErrorShowPopup(true);
	};

	const closeErrorPopup = () => {
		setErrorShowPopup(false);
	};

	const changeSelected = (_id) => {
		setSelectedDelivery(_id);

		const delivery = deliveries.find((delivery) => delivery._id === _id);
		if (!delivery) {
			setError("Delivery not found");
			setId("");
			setFromBranch("");
			setToBranch("");
			setItems([]);
			setPlacedDate("");
			setStatus("");
			setDeliveryDate("");
			return;
		}

		setId(delivery._id);
		setFromBranch(delivery.fromBranch);
		setToBranch(delivery.toBranch);
		setItems(delivery.items);
		setPlacedDate(delivery.placedDate);
		setStatus(delivery.status);
		setDeliveryDate(delivery.deliveryDate);
	};

	const handleAdd = (event) => {
		event.preventDefault();

		const {
			fromBranch,
			toBranch,
			items,
			placedDate,
			status,
			deliveryDate,
		} = event.target.elements;

		const newDelivery = {
			fromBranch: fromBranch.value,
			toBranch: toBranch.value,
			items: items.value,
			placedDate: placedDate.value,
			status: status.value,
			deliveryDate: deliveryDate.value,
		};

		fetchData("deliveries", "POST", newDelivery).then((response) => {
			if (response.status === 200) {
				setDeliveries([...deliveries, response.data]);
				openSuccessPopup();
			} else {
				setError(response.data);
				setErrorShowPopup(true);
			}
		});
	};

	useEffect(() => {
		fetchData("deliveries").then((response) =>
			setDeliveries(response.data)
		);
	}, []);

	return (
		<React.Fragment>
			<DeliveriesStyle>
				<div className="deliveries">
					<Navbar />
					<div className="deliveries_content">
						<button
							className="btn btn-primary mb-3"
							onClick={openAddNewPopup}
						>
							Create Delivery
						</button>
						<table className="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>From</th>
									<th>To</th>
									<th>Items</th>
									<th>Placed Date</th>
									<th>Status</th>
									<th>Delivery Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{deliveries.map((delivery) => (
									<tr key={delivery._id}>
										<td>{delivery.fromBranch}</td>
										<td>{delivery.toBranch}</td>
										<td>
											{delivery.items.map((item) => (
												<p key={item._id}>
													{item.name} -{" "}
													{item.quantity}
												</p>
											))}
										</td>
										<td>{delivery.placedDate}</td>
										<td>{delivery.status}</td>
										<td>{delivery.deliveryDate}</td>
										<td>
											<button
												className="btn btn-primary btn-sm m-1"
												onClick={() =>
													openEditPopup(delivery._id)
												}
											>
												Edit
											</button>
											<button
												className="btn btn-danger btn-sm m-1"
												onClick={() =>
													openDeletePopup(
														delivery._id
													)
												}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</DeliveriesStyle>

			{showAddNewPopup && (
				<AddNewPopup onSubmit={handleAdd} onClose={closeAddNewPopup} />
			)}
		</React.Fragment>
	);
};

export default Deliveries;