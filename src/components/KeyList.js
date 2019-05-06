import React, { Component } from "react";

class KeyList extends Component {
	copyKey(privateKeyFilename) {}

	renderKeys() {
		const keys = this.props.keys;

		return keys.map(({ privateKeyFilename }) => {
			return (
				<li key={privateKeyFilename}>
					<div>
						<p>{privateKeyFilename}</p>
						<i class="fas fa-copy" />
					</div>
					<i class="fas fa-trash-alt" />
				</li>
			);
		});
	}

	render() {
		return <ul>{this.renderKeys()}</ul>;
	}
}

export default KeyList;
