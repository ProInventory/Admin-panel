import React, { useEffect, useState } from "react";
import styled from "styled-components";

import fetchData from "./utils/fetchData";

import Navbar from "./common/navBar";
import AddNewPopup from "./branches/addNewPopup";
import EditPopup from "./branches/editPopup";
import DeletePopup from "./branches/deletePopup";
import SuccessPopup from "./users/successPopup";
import ErrorPopup from "./users/errorPopup";

const BranchesStyle = styled.div`
	.branches {
		display: flex;
	}

	.branches_content {
		margin-left: 250px;
		padding: 20px;
	}

	.buttons {
		margin: 0 5px;
	}

	@media only screen and (max-width: 768px) {
		.branches {
			flex-direction: column;
		}

		.branches_content {
			margin-left: 0;
		}
	}
`;

const Branches = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [manager, setManager] = useState("");

	const [branches, setBranches] = useState([]);
	const [selectedBranch, setSelectedBranch] = useState("");
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
		changeSelectedBranch(_id);
		setEditShowPopup(true);
	};

	const closeEditPopup = () => {
		changeSelectedBranch("");
		setEditShowPopup(false);
	};

	const openDeletePopup = (_id) => {
		changeSelectedBranch(_id);
		setDeleteShowPopup(true);
	};

	const closeDeletePopup = () => {
		changeSelectedBranch("");
		setDeleteShowPopup(false);
	};

	const openSuccessPopup = () => {
		closeAddNewPopup();
		setSuccessShowPopup(true);
	};

	const closeSuccessPopup = () => {
		setSuccessShowPopup(false);
		window.location.reload(false);
	};

	const openErrorPopup = () => {
		setErrorShowPopup(true);
	};

	const closeErrorPopup = () => {
		setErrorShowPopup(false);
	};

	const handleSubmitNewBranch = (event) => {
		event.preventDefault();
		const name = event.target.elements.name.value;
		const address = event.target.elements.address.value;
		const phoneNumber = event.target.elements.phone.value;
		const email = event.target.elements.email.value;
		const manager = event.target.elements.manager.value;

		const newBranch = {
			name,
			address,
			phoneNumber,
			email,
			manager,
		};

		fetchData("branches", "POST", newBranch).then((response) => {
			if (response.status === 200) {
				openSuccessPopup();
				setBranches([...branches, newBranch]);
			} else {
				setErrorShowPopup(true);
				setError(response.data);
				openErrorPopup();
			}
		});
	};

	const handleSubmitEditBranch = (event) => {
		event.preventDefault();
		const name = event.target.elements.name.value;
		const address = event.target.elements.address.value;
		const phoneNumber = event.target.elements.phone.value;
		const email = event.target.elements.email.value;
		const manager = event.target.elements.manager.value;

		const newBranch = {
			name,
			address,
			phoneNumber,
			email,
			manager,
		};

		fetchData(`branches/${id}`, "PUT", newBranch).then((response) => {
			if (response.status === 200) {
				closeEditPopup();
				openSuccessPopup();
				const newBranches = branches.map((branch) => {
					if (branch._id === selectedBranch) {
						return response.data;
					} else {
						return branch;
					}
				});
				setAddress(newBranches);
			} else {
				setError(response.data);
				openErrorPopup();
			}
		});
	};

	const handleSubmitDeleteBranch = (event) => {
		event.preventDefault();
		fetchData(`branches/${id}`, "DELETE").then((response) => {
			if (response.status === 200) {
				closeDeletePopup();
				openSuccessPopup();
				const newBranches = branches.filter(
					(branch) => branch._id !== selectedBranch
				);
				setBranches(newBranches);
			} else {
				setError(response.data);
				openErrorPopup();
			}
		});
	};

	const changeSelectedBranch = (_id) => {
		setSelectedBranch(_id);

		const branch = branches.find((branch) => branch._id === _id);
		if (!branch) {
			setError("Branch not found");
			setId("");
			setName("");
			setAddress("");
			setPhone("");
			setEmail("");
			setManager("");
			return;
		}

		setId(branch._id);
		setName(branch.name);
		setAddress(branch.address);
		setPhone(branch.phoneNumber);
		setEmail(branch.email);
		setManager(branch.manager);
	};

	const handleChange = (what, value) => {
		if (what === "name") {
			setName(value);
		} else if (what === "address") {
			setAddress(value);
		} else if (what === "phone") {
			setPhone(value);
		} else if (what === "email") {
			setEmail(value);
		} else if (what === "manager") {
			setManager(value);
		}
	};

	useEffect(() => {
		fetchData("branches").then((response) => setBranches(response.data));
	}, []);

	return (
		<React.Fragment>
			<BranchesStyle>
				<div className="branches">
					<Navbar />
					<div className="branches_content">
						<button
							className="btn btn-primary mb-3"
							onClick={openAddNewPopup}
						>
							Create Branch
						</button>

						<table className="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Address</th>
									<th>Phone Number</th>
									<th>Email</th>
									<th>Manager</th>
									<th>Settings</th>
								</tr>
							</thead>
							<tbody>
								{branches.map((branch) => (
									<tr key={branch._id}>
										<td>{branch.name}</td>
										<td>{branch.address}</td>
										<td>{branch.phoneNumber}</td>
										<td>{branch.email}</td>
										<td>{branch.manager}</td>
										<td>
											<button
												className="btn btn-primary buttons"
												onClick={() =>
													openEditPopup(branch._id)
												}
											>
												Edit
											</button>
											<button
												className="btn btn-danger buttons"
												onClick={() =>
													openDeletePopup(branch._id)
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
			</BranchesStyle>
			{showAddNewPopup && (
				<AddNewPopup
					onSubmit={handleSubmitNewBranch}
					onClose={closeAddNewPopup}
				/>
			)}

			{showEditPopup && (
				<EditPopup
					branch={{
						id,
						name,
						address,
						phone,
						email,
						manager,
					}}
					onChange={handleChange}
					onSubmit={handleSubmitEditBranch}
					onClose={closeEditPopup}
				/>
			)}

			{showDeletePopup && (
				<DeletePopup
					id={id}
					onDelete={handleSubmitDeleteBranch}
					onClose={closeDeletePopup}
				/>
			)}

			{showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />}

			{showErrorPopup && (
				<ErrorPopup error={error} onClose={closeErrorPopup} />
			)}
		</React.Fragment>
	);
};

export default Branches;
