import React from "react";
import styled from "styled-components";
import Navbar from "./common/navBar";

const DashStyle = styled.div`
	.dashboard {
		display: flex;
	}

	.dashboard__content {
		margin-left: 250px;
		padding: 20px;
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
					</div>
				</div>
			</DashStyle>
		</React.Fragment>
	);
};

export default Dashboard;
