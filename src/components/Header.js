import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
	position: relative;

	padding: 1rem;
	text-align: left;
	background: #00bcd4;
    font-size: 3rem;
    
    margin-bottom: 1rem;
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<Link
					to="/"
					style={{ textDecoration: "none", color: "white" }}
				>
					SSH key manager
				</Link>
			</StyledHeader>
		);
	}
}

export default Header;
