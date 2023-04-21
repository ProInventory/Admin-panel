import React from "react";
import styled from "styled-components";

const LogoStyle = styled.div`
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.logo img {
		padding-top: 30px;
		padding-left: 5%;
		padding-right: 5%;
		width: 80%;
	}
`;

const Logo = () => {
	return (
		<LogoStyle>
			<div className="logo">
				<img src="logo.png" alt="Logo" />
			</div>
		</LogoStyle>
	);
};

export default Logo;
