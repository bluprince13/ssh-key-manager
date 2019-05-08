import React, { Component } from "react";
import styled from "styled-components";

import { withRouter } from "react-router-dom";

const StyledIcon = styled.i``;

const StyledButton = styled.button`
	background-color:  ${props => props.theme.light};
	margin: 1rem auto;
	display: block;

	height: 3rem;
	width: 3rem;
	border-radius: 50%;

	&: hover {
		background-color: ${props => props.theme.dark};

		${StyledIcon} {
			color:  ${props => props.theme.highlight};
		}
	}

	&: focus {
		outline: none;
		border: none;
	}

	&: active {
		background-color: ${props => props.theme.darkest};
	}
`;

class AddButton extends Component {
	render() {
		return (
			<StyledButton
				onClick={() => {
					this.props.history.push("/add");
				}}
			>
				<StyledIcon className="fas fa-plus fa-md mx-auto" />
			</StyledButton>
		);
	}
}

export default withRouter(AddButton);
