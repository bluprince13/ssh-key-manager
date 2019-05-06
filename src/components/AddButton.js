import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as actions from "../actions";
const StyledIcon = styled.i``;

const StyledButton = styled.button`
	background-color: #b2ebf2;
	margin: 1rem auto;
	display: block;

	height: 3rem;
	width: 3rem;
	border-radius: 50%;

	&: hover {
		background-color: #4dd0e1;

		${StyledIcon} {
			color: red;
		}
	}

	&: focus {
		outline: none;
		border: none;
	}

	&: active {
		background-color: #0097a7;
	}
`;

class AddButton extends Component {
	render() {
		return (
			<StyledButton onClick={this.props.addKey}>
				<StyledIcon className="fas fa-plus fa-md mx-auto" />
			</StyledButton>
		);
	}
}

export default AddButton;
