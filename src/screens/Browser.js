import React, { Component } from "react";
import { connect } from "react-redux";
import KeyList from "../components/KeyList";
import * as actions from "../actions";
import AddButton from "../components/AddButton";

class Browser extends Component {
	componentWillMount() {
		this.props.getKeys();
	}

	render() {
		return (
			<div className="container">
				<KeyList
					keys={this.props.keys}
					removeKey={this.props.removeKey}
				/>
				<AddButton />
			</div>
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
