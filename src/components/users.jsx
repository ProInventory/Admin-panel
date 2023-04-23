import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mongoose from "mongoose";
import moment from "moment";

import fetchData from "./utils/fetchData";

import Navbar from "./common/navBar";
import AddNewPopup from "./users/addNewPopup";
import EditPopup from "./users/editPopup";
import DeletePopup from "./common/popups/deletePopup";
import SuccessPopup from "./common/popups/successPopup";
import ErrorPopup from "./common/popups/errorPopup";

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
	const [id, setId] = useState("");
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
		changeSelected("");
		setEditShowPopup(false);
	};

	const openDeletePopup = (_id) => {
		changeSelected(_id);
		setDeleteShowPopup(true);
	};

	const closeDeletePopup = () => {
		changeSelected("");
		setDeleteShowPopup(false);
	};

	const openSuccessPopup = () => {
		setSuccessShowPopup(true);
	};

	const closeSuccessPopup = () => {
		setSuccessShowPopup(false);
	};

	const closeErrorPopup = () => {
		setErrorShowPopup(false);
	};

	const changeSelected = (_id) => {
		setSelectedUser(_id);

		const user = users.find((user) => user._id === _id);
		if (!user) {
			setError("User not found");
			setId("");
			setUsername("");
			setEmail("");
			setPassword("");
			setIsAdmin(false);
			return;
		}

		setId(user._id);
		setUsername(user.username);
		setEmail(user.email);
		setPassword(user.password);
		setIsAdmin(user.isAdmin);
	};

	const handleAdd = (event) => {
		event.preventDefault();

		const { username, email, password, isAdmin } = event.target.elements;

		const newUser = {
			username: username.value,
			email: email.value,
			isAdmin: isAdmin.checked,
			password: password.value,
		};

		fetchData("users", "POST", newUser).then((response) => {
			if (response.status === 200) {
				closeAddNewPopup();
				openSuccessPopup();
				setUsers([...users, response.data]);
			} else {
				setError(response.data);
				setErrorShowPopup(true);
			}
		});
	};

	const handleEdit = (event) => {
		event.preventDefault();

		const { username, email, password, isAdmin } = event.target.elements;

		const editedUser = {
			username: username.value,
			email: email.value,
			isAdmin: isAdmin.checked,
			password: password.value,
		};

		if (editedUser.password === "") {
			delete editedUser.password;
		}

		fetchData(`users/${selectedUser}`, "PUT", editedUser).then(
			(response) => {
				if (response.status === 200) {
					closeEditPopup();
					openSuccessPopup();

					const newUsers = users.map((user) => {
						if (user._id === selectedUser) {
							return response.data;
						} else {
							return user;
						}
					});

					setUsers(newUsers);
				} else {
					setError(response.data);
					setErrorShowPopup(true);
				}
			}
		);
	};

	const handleDelete = () => {
		fetchData(`users/${selectedUser}`, "DELETE").then((response) => {
			if (response.status === 200) {
				closeDeletePopup();
				openSuccessPopup();
				const newUsers = users.filter(
					(user) => user._id !== selectedUser
				);
				setUsers(newUsers);
			} else {
				setError(response.data);
				setErrorShowPopup(true);
			}
		});
	};

	const handleChange = (what, value) => {
		if (what === "username") {
			setUsername(value);
		} else if (what === "email") {
			setEmail(value);
		} else if (what === "password") {
			setPassword(value);
		} else if (what === "isAdmin") {
			setIsAdmin(value);
		}
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
				<AddNewPopup onSubmit={handleAdd} onClose={closeAddNewPopup} />
			)}

			{showEditPopup && (
				<EditPopup
					onSubmit={handleEdit}
					onChange={handleChange}
					onClose={closeEditPopup}
					user={{ id, username, email, isAdmin }}
				/>
			)}

			{showDeletePopup && (
				<DeletePopup
					id={id}
					what="user"
					onDelete={handleDelete}
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

export default Users;
