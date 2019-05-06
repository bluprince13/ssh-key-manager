import React, { Component } from "react";
import styled from "styled-components";

import ReactTooltip from "react-tooltip";
import { copyToClipboard } from "../helpers";

const StyledRow = styled.li`
	background: #e0f7fa;
`;

const StyledIcon = styled.i`
	&: hover {
		color: red;
	}
`;

class KeyList extends Component {
	customToolTip(id) {
		return (
			<ReactTooltip
				id={id}
				place="top"
				type="dark"
				effect="solid"
				isCapture={true}
			/>
		);
	}

	handleCopy(publicKeyPath) {
		copyToClipboard(publicKeyPath);

		setTimeout(() => {
			ReactTooltip.hide();
		}, 1500);
	}

	renderKeys() {
		const keys = this.props.keys;

		return keys.map(key => {
			const { privateKeyFilename, publicKeyPath } = key;
			return (
				<StyledRow
					key={privateKeyFilename}
					className="list-group-item list-group-item-action"
				>
					<div className="float-left">
						{privateKeyFilename}
						<span data-tip="Copy" data-for="copy">
							<span
								onClick={() => {
									this.handleCopy(publicKeyPath);
								}}
								data-tip="Copied"
								data-event="click"
								data-for="copied"
							>
								<StyledIcon className="fas fa-copy fa-fw" />
							</span>
						</span>
						{this.customToolTip("copy")}
						{this.customToolTip("copied")}
					</div>
					<div className="float-right">
						<span
							data-tip="Delete"
							data-for="delete"
							onClick={() => {
								this.props.removeKey(key);
							}}
						>
							<StyledIcon className="fas fa-trash-alt" />
						</span>
						{this.customToolTip("delete")}
					</div>
				</StyledRow>
			);
		});
	}

	render() {
		return <ul className="list-group">{this.renderKeys()}</ul>;
	}
}

export default KeyList;
