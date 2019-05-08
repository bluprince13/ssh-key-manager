import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

export default class Tooltip extends Component {
	render() {
		return (
			<ReactTooltip
				id={this.props.id}
				place="top"
				type="dark"
				effect="solid"
				isCapture={true}
			/>
		);
	}
}
