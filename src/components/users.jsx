import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mongoose from "mongoose";
import moment from "moment";

import Navbar from "./common/navBar";
import Popup from "./common/popup";
import fetchData from "./utils/fetchData";

const UsersStyle = styled.div`
	.users {
		display: flex;
	}

	.users_content {
		margin-left: 250px;
		padding: 20px;
	}

	.buttons {
		margin: 0 5px;
	}

	@media only screen and (max-width: 768px) {
		.users {
			flex-direction: column;
		}

		.users_content {
			margin-left: 0;
		}
	}
`;

const Users = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");
	const [error, setError] = useState("");

	const [showAddNewPopup, setAddNewShowPopup] = useState(false);
	const [showEditPopup, setEditShowPopup] = useState(false);
	const [showDeletePopup, setDeleteShowPopup] = useState(false);

	const [showSuccessPopup, setSuccessShowPopup] = useState(false);
	const [showErrorPopup, setErrorShowPopup] = useState(false);

	useEffect(() => {
		fetchData("users").then((response) => setUsers(response.data));
	}, []);

	const changeSelectedUser = (_id) => {
		setSelectedUser(_id);

		const user = users.find((user) => user._id === _id);
		if (!user) return;

		setUsername(user.username);
		setEmail(user.email);
		setPassword(user.password);
		if (user.isAdmin) setIsAdmin(user.isAdmin);
	};

	const openAddNewPopup = () => {
		setAddNewShowPopup(true);
	};

	const closeAddNewPopup = () => {
		setAddNewShowPopup(false);
	};

	const openEditPopup = (_id) => {
		changeSelectedUser(_id);
		setEditShowPopup(true);
	};

	const closeEditPopup = () => {
		changeSelectedUser("");
		setEditShowPopup(false);
	};

	const openDeletePopup = (_id) => {
		changeSelectedUser(_id);
		setDeleteShowPopup(true);
	};

	const closeDeletePopup = () => {
		changeSelectedUser("");
		setDeleteShowPopup(false);
	};

	const openSuccessPopup = () => {
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

	const handleSubmitNewUser = (event) => {
		event.preventDefault();
		const username = event.target.elements.username.value;
		const email = event.target.elements.email.value;
		const password = event.target.elements.password.value;
		const isAdmin = event.target.elements.isAdmin.checked;

		const newUser = {
			username,
			email,
			password,
		};

		fetchData("users", "POST", newUser).then((response) => {
			if (response.status === 400) {
				setError(response.data);
				openErrorPopup();
			} else {
				setUsers([...users, response.data]);
				closeAddNewPopup();
				openSuccessPopup();
			}
		});
	};

	const handleSubmitEditUser = (event) => {
		event.preventDefault();
		const username = event.target.elements.username.value;
		const email = event.target.elements.email.value;
		const password = event.target.elements.password.value;
		const isAdmin = event.target.elements.isAdmin.checked;

		const editedUser = {
			username,
			email,
			password,
		};

		if (editedUser.password === "") {
			delete editedUser.password;
		}

		fetchData(`users/${selectedUser}`, "PUT", editedUser).then(
			(response) => {
				if (response.status === 400) {
					setError(response.data);
					openErrorPopup();
				} else {
					const newUsers = users.map((user) => {
						if (user._id === selectedUser) {
							return response.data;
						} else {
							return user;
						}
					});
					setUsers(newUsers);
					closeEditPopup();
					openSuccessPopup();
				}
			}
		);
	};

	const handleDelete = () => {
		fetchData(`users/${selectedUser}`, "DELETE").then((response) => {
			if (response.status === 400) {
				setError(response.data);
				openErrorPopup();
			} else {
				setUsers(users.filter((user) => user._id !== selectedUser));
				closeDeletePopup();
				openSuccessPopup();
			}
		});
	};

	const onTodoChange = (what, value) => {
		if (what === "username") {
			setUsername(value);
		} else if (what === "email") {
			setEmail(value);
		} else if (what === "password") {
			setPassword(value);
		} else if (what === "isAdmin") {
			setIsAdmin(!value);
		}

		console.log(isAdmin);
	};

	return (
		<React.Fragment>
			<UsersStyle>
				<div className="users">
					<Navbar />
					<div className="users_content">
						<button
							className="btn btn-primary mb-3"
							onClick={openAddNewPopup}
						>
							Create User
						</button>

						<table className="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th>Username</th>
									<th>Email</th>
									<th>isAdmin</th>
									<th>Created At</th>
									<th>Settings</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td>{user.isAdmin ? "Yes" : "No"}</td>
										<td>
											{moment(
												new mongoose.Types.ObjectId(
													user._id
												).getTimestamp()
											).format("DD MM YYYY, h:mm:ss a")}
										</td>
										<td>
											<button
												className="btn btn-primary buttons"
												onClick={() =>
													openEditPopup(user._id)
												}
											>
												Edit
											</button>
											<button
												className="btn btn-danger buttons"
												onClick={() =>
													openDeletePopup(user._id)
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
			</UsersStyle>
			{showAddNewPopup && (
				<Popup
					title="Create User"
					body={
						<form onSubmit={handleSubmitNewUser}>
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
								<label htmlFor="password">Password:</label>
								<input
									type="password"
									id="password"
									name="password"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="isAdmin">isAdmin:</label>
								<input
									type="checkbox"
									id="isAdmin"
									name="isAdmin"
									className="form-check-input"
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
							<button
								style={{ marginLeft: "10px" }}
								type="button"
								className="btn btn-secondary ml-3"
								onClick={closeAddNewPopup}
							>
								Cancel
							</button>
						</form>
					}
				/>
			)}
			{showEditPopup && (
				<Popup
					title="Edit User"
					body={
						<form onSubmit={handleSubmitEditUser}>
							<div className="form-group">
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									id="username"
									name="username"
									className="form-control"
									value={username}
									onChange={(e) =>
										onTodoChange("username", e.target.value)
									}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									name="email"
									className="form-control"
									value={email}
									onChange={(e) =>
										onTodoChange("email", e.target.value)
									}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="isAdmin">isAdmin:</label>
								<input
									type="checkbox"
									id="isAdmin"
									name="isAdmin"
									className="form-check-input"
									value={isAdmin}
									onChange={(e) =>
										onTodoChange(
											"isAdmin",
											e.target.checked // this need to be fixed
										)
									}
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
								Leave the password empty if you don't want to
								change it
							</div>

							<button type="submit" className="btn btn-primary">
								Submit
							</button>
							<button
								style={{ marginLeft: "10px" }}
								type="button"
								className="btn btn-secondary ml-3"
								onClick={closeEditPopup}
							>
								Cancel
							</button>
						</form>
					}
				/>
			)}
			{showDeletePopup && (
				<Popup
					title="Delete User"
					body={
						<React.Fragment>
							<p>Are you sure you want to delete this user?</p>
							<button
								type="button"
								className="btn btn-primary"
								onClick={handleDelete}
							>
								Yes
							</button>
							<button
								type="button"
								className="btn btn-secondary ml-3"
								onClick={closeDeletePopup}
							>
								No
							</button>
						</React.Fragment>
					}
				/>
			)}
			{showSuccessPopup && (
				<Popup
					title="Success"
					body={
						<React.Fragment>
							<p>Operation complete</p>
							<button
								type="button"
								className="btn btn-secondary ml-3"
								onClick={closeSuccessPopup}
							>
								Ok
							</button>
						</React.Fragment>
					}
				/>
			)}
			{showErrorPopup && (
				<Popup
					title="Error"
					body={
						<React.Fragment>
							<p>{error}</p>
							<button
								type="button"
								className="btn btn-secondary ml-3"
								onClick={closeErrorPopup}
							>
								Cancel
							</button>
						</React.Fragment>
					}
				/>
			)}
		</React.Fragment>
	);
};

export default Users;
