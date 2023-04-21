import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavStyle = styled.nav`
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 250px;
		background-color: #b19cd8;
		overflow-y: auto;
	}

	.navbar__links {
		list-style: none;
		margin: 0;
		padding: 20px;
	}

	.navbar__item {
		margin-bottom: 10px;
	}

	.navbar__link {
		display: block;
		color: white;
		font-size: 20px;
		text-decoration: none;
	}

	@media only screen and (max-width: 768px) {
		.navbar {
			width: 100%;
			height: 60px;
			overflow-x: auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.navbar__links {
			display: flex;
			margin: 0;
			padding: 0;
		}

		.navbar__item {
			margin-left: 10px;
			margin-right: 10px;
		}

		.navbar__link {
			font-size: 16px;
		}
	}
`;

const Navbar = () => {
	return (
		<React.Fragment>
			<NavStyle>
				<nav className="navbar">
					<ul className="navbar__links">
						<li className="navbar__item">
							<Link to="/" className="navbar__link">
								Home
							</Link>
						</li>
						<li className="navbar__item">
							<Link to="/users" className="navbar__link">
								Users
							</Link>
						</li>
						<li className="navbar__item">
							<Link to="/branches" className="navbar__link">
								Branches
							</Link>
						</li>
						<li className="navbar__item">
							<Link to="/items" className="navbar__link">
								Items
							</Link>
						</li>
						<li className="navbar__item">
							<Link to="/deliveries" className="navbar__link">
								Deliveries
							</Link>
						</li>
					</ul>
				</nav>
			</NavStyle>
		</React.Fragment>
	);
};

export default Navbar;
