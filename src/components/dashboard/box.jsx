import React from "react";
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
	const { title, body } = props;
	console.log(props);

	return (
		<BoxStyle>
			<div className="box">
				<h2>{title}</h2>
				<p>{body}</p>
			</div>
		</BoxStyle>
	);
};

export default Box;
