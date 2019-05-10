import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import KeyList from "../components/KeyList";
import * as actions from "../actions";
import AddButton from "../components/AddButton";

const StyledContainer = styled.div`
	margin: 1rem;
`;
class Browser extends Component {
	componentWillMount() {
		this.props.getKeys();
	}

	render() {
		return (
			<StyledContainer>
				<KeyList
					keys={this.props.keys}
					removeKey={this.props.removeKey}
					copyKey={this.props.copyKey}
				/>
				<AddButton />
			</StyledContainer>
		);
	}
}

function mapStateToProps(state) {
	return { keys: state.keys };
}

export default connect(
	mapStateToProps,
	actions
)(Browser);
