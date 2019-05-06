import React, { Component } from "react";
import { connect } from "react-redux";
import KeyList from "../components/KeyList";
import * as actions from "../actions";

class Browser extends Component {
	componentWillMount() {
		this.props.getKeys();
	}

	render() {
		return (
			<div className="container">
				<KeyList keys={this.props.keys} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { keys: state.keys_reducer.keys };
}

export default connect(
	mapStateToProps,
	actions
)(Browser);
