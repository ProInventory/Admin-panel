import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mongoose from "mongoose";
import moment from "moment";

import Navbar from "./common/navBar";

import fetchData from "./utils/fetchData";

const UsersStyle = styled.div`
	.users {
		display: flex;
	}

	.users_content {
		margin-left: 250px;
		padding: 20px;
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

const PopupStyle = styled.div`
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-content {
		position: relative;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		width: 400px;
		max-width: 90%;
	}

	.popup-content h2 {
		margin-top: 0;
	}

	.popup-content form {
		margin-top: 20px;
	}

	.popup-content .form-group {
		margin-bottom: 10px;
	}

	.popup-content label {
		display: block;
		margin-bottom: 5px;
	}

	.popup-content input[type="text"],
	.popup-content input[type="email"],
	.popup-content input[type="password"],
	.popup-content input[type="checkbox"] {
		width: 100%;
		padding: 8px;
		border-radius: 3px;
		border: 1px solid #ccc;
		font-size: 16px;
	}

	.popup-content button[type="submit"],
	.popup-content button[type="button"] {
		margin-top: 10px;
	}
`;

const Users = () => {
	const [users, setUsers] = useState([]);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		fetchData("users").then((data) => setUsers(data));
	}, []);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<React.Fragment>
			<UsersStyle>
				<div className="users">
					<Navbar />
					<div className="users_content">
						<button
							className="btn btn-primary mb-3"
							onClick={openPopup}
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
									<tr key={user.username}>
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
											<button className="btn btn-primary">
												Edit
											</button>
											<button className="btn btn-danger">
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
			<PopupStyle>
				{showPopup && (
					<div className="popup">
						<div className="popup-content">
							<h2>Create User</h2>
							<form>
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
								<button
									type="submit"
									className="btn btn-primary"
								>
									Submit
								</button>
								<button
									type="button"
									className="btn btn-secondary ml-3"
									onClick={closePopup}
								>
									Cancel
								</button>
							</form>
						</div>
					</div>
				)}
			</PopupStyle>
		</React.Fragment>
	);
};

export default Users;
