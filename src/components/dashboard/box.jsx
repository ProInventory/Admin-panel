import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoxStyle = styled.div`
	.box {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
		padding: 20px;
	}
`;

const Box = (props) => {
	const { cardStyle, title, body, link } = props;

	return (
		<div className={`card ${cardStyle}`}>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{body}</p>
				<Link to={link} className="card-link">
					Go to {title}
				</Link>
			</div>
		</div>
	);
};

export default Box;
