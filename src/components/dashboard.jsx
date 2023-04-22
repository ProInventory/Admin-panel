import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Navbar from "./common/navBar";
import Box from "./dashboard/box";

import fetchData from "./utils/fetchData";

const DashStyle = styled.div`
	.dashboard {
		display: flex;
	}

	.dashboard__content {
		margin-left: 250px;
		padding: 20px;
	}

	.table td {
		width: 200px;
		height: 200px;
		padding: 25px;
	}

	@media only screen and (max-width: 768px) {
		.dashboard {
			flex-direction: column;
		}

		.dashboard__content {
			margin-left: 0;
		}
	}
`;

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [branches, setBranches] = useState([]);

	useEffect(() => {
		fetchData("users").then((response) => setUsers(response.data));
		fetchData("branches").then((response) => setBranches(response.data));
	}, []);

	return (
		<React.Fragment>
			<DashStyle>
				<div className="dashboard">
					<Navbar />
					<div className="dashboard__content">
						<h1>Welcome to your Dashboard</h1>
						<p>
							Here you can see your latest updates and messages.
						</p>
						<table className="table">
							<tbody>
								<tr>
									<td>
										<Box
											title="Users"
											body={
												<React.Fragment>
													Total : {users.length}
												</React.Fragment>
											}
											link="/users"
										/>
									</td>
									<td>
										<Box
											title="Branches"
											body={
												<React.Fragment>
													Total : {branches.length}
												</React.Fragment>
											}
										/>
									</td>
								</tr>
								<tr>
									<td>
										<Box title="Items" body="Lorem" />
									</td>
									<td>
										<Box title="Deliveries" body="Lorem" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</DashStyle>
		</React.Fragment>
	);
};

export default Dashboard;
