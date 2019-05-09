import React, { Component } from "react";
import styled from "styled-components";

import { withRouter } from "react-router-dom";

import { StyledButton, StyledIcon } from "../components/styled";
class AddButton extends Component {
	render() {
		return (
			<StyledButton
				style={{ margin: "1rem auto" }}
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
